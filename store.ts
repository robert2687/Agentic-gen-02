import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Agent, AgentStatus } from './types';
import { INITIAL_AGENTS } from './constants';
import * as geminiService from './services/geminiService';

type View = 'home' | 'createProject' | 'workspace' | 'settings' | 'appearance';

export interface AppState {
  agents: Agent[];
  projectGoal: string;
  projectName: string;
  isGenerating: boolean;
  error: string | null;
  previewCode: string | null;
  isSignedIn: boolean;
  isDarkMode: boolean;
  view: View;
  accentColor: string;

  // Actions
  signIn: () => void;
  signOut: () => void;
  toggleTheme: () => void;
  setView: (view: View) => void;
  setProjectGoal: (goal: string) => void;
  setProjectName: (name: string) => void;
  setError: (error: string | null) => void;
  setAccentColor: (color: string) => void;
  
  resetWorkflow: () => void;
  startGeneration: () => Promise<void>;
  cancelGeneration: () => void;
  _runAgentWorkflow: (agentIndex: number, input: string) => Promise<void>;
}


export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // State
      agents: INITIAL_AGENTS,
      projectGoal: '',
      projectName: '',
      isGenerating: false,
      error: null,
      previewCode: null,
      isSignedIn: false,
      isDarkMode: true,
      view: 'home',
      accentColor: '#007AFF',

      // Actions
      signIn: () => set({ isSignedIn: true, view: 'home' }),
      signOut: () => {
        get().resetWorkflow();
        set({ isSignedIn: false, projectGoal: '', view: 'home' });
      },
      toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),
      setView: (view) => set({ view }),
      setProjectGoal: (goal) => set({ projectGoal: goal }),
      setProjectName: (name) => set({ projectName: name }),
      setError: (error) => set({ error }),
      setAccentColor: (color) => set({ accentColor: color }),

      resetWorkflow: () => {
        set({
          agents: INITIAL_AGENTS,
          error: null,
          isGenerating: false,
          previewCode: null,
        });
      },
      
      cancelGeneration: () => {
        set({ isGenerating: false });
        const currentAgents = get().agents;
        const updatedAgents = currentAgents.map(agent =>
          agent.status === AgentStatus.RUNNING ? { ...agent, status: AgentStatus.PENDING, output: (agent.output || '') + '\n\n---\nCancelled by user.' } : agent
        );
        set({ agents: updatedAgents });
      },

      _runAgentWorkflow: async (agentIndex: number, input: string) => {
        if (!get().isGenerating) {
          console.log("Generation cancelled or finished.");
          return;
        }

        if (agentIndex >= get().agents.length) {
          // Workflow finished
          const finalAgents = get().agents;
          const coderAgent = finalAgents.find(a => a.name === 'Coder');
          if (coderAgent && coderAgent.output) {
            const codeMatch = coderAgent.output.match(/```html\n([\s\S]*?)```/);
            set({ previewCode: codeMatch ? codeMatch[1] : coderAgent.output });
          }
          set({ isGenerating: false });
          return;
        }

        // Set current agent to running
        set(state => ({
          agents: state.agents.map((agent, index) => 
            index === agentIndex ? { ...agent, status: AgentStatus.RUNNING, input: input, output: '' } : agent
          )
        }));
        
        try {
          const currentAgent = get().agents[agentIndex];
          
          const onChunk = (chunk: string) => {
            if (!get().isGenerating) return; // Stop streaming if cancelled
            set(state => ({
              agents: state.agents.map((agent, index) =>
                index === agentIndex ? { ...agent, output: (agent.output || '') + chunk } : agent
              )
            }));
          };

          const finalOutput = await geminiService.runAgentStream(currentAgent, input, onChunk);

          if (!get().isGenerating) return; // Check again after await

          set(state => ({
            agents: state.agents.map((agent, index) =>
              index === agentIndex ? { ...agent, status: AgentStatus.COMPLETED, output: finalOutput } : agent
            )
          }));

          const nextInput = `As the ${currentAgent.name}, you produced this output:\n\n${finalOutput}`;
          get()._runAgentWorkflow(agentIndex + 1, nextInput);

        } catch (e) {
          if (!get().isGenerating) return;

          const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
          const agentName = get().agents[agentIndex].name;

          set(state => ({
            error: `Error at ${agentName} agent: ${errorMessage}`,
            isGenerating: false,
            agents: state.agents.map((agent, index) =>
              index === agentIndex ? { ...agent, status: AgentStatus.ERROR, output: errorMessage } : agent
            )
          }));
        }
      },

      startGeneration: async () => {
        const { projectGoal, resetWorkflow, _runAgentWorkflow } = get();
        if (!projectGoal.trim()) {
          set({ error: "Project goal is missing." });
          return;
        }

        resetWorkflow();
        set({ isGenerating: true, agents: [...INITIAL_AGENTS] });

        const initialInput = `The user wants to build an application with the following goal: "${projectGoal}".`;
        _runAgentWorkflow(0, initialInput);
      },
    }),
    {
      name: 'agentic-app-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([_key, value]) => typeof value !== 'function')
        ),
    }
  )
);