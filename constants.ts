import type { Agent } from './types';
import { AgentStatus } from './types';

export const AGENTS_CONFIG: Omit<Agent, 'status' | 'input' | 'output'>[] = [
  {
    id: 1,
    name: 'Planner',
    role: "Based on the user's request, define the app’s purpose, core features, user flows, and technical stack. Your output must be a structured requirements document in markdown format, detailing milestones, user stories, and acceptance criteria. This will be the input for the Architect.",
  },
  {
    id: 2,
    name: 'Architect',
    role: "Using the Planner's requirements document, design the complete system architecture. Your output must be a markdown document containing a detailed architecture blueprint, text-based diagrams (component, sequence, deployment), a Firestore database schema (in YAML), and API contracts (in YAML). This will be the input for the Visual Designer and Coder.",
  },
  {
    id: 3,
    name: 'Visual Designer',
    role: "From the Architect's blueprint, create a detailed UI/UX specification. Your output must be a markdown document that includes a UI specification, design tokens (colors, typography, spacing as JSON), and component mappings. This will be the input for the Coder.",
  },
  {
    id: 4,
    name: 'Coder',
    role: "Using the Architect's blueprint and the Visual Designer's UI specification, implement the complete frontend application. Your output **must be a single, self-contained HTML file** with embedded CSS (in a `<style>` tag) and JavaScript (in a `<script>` tag). Do not include explanations or markdown formatting outside of the code. Enclose the entire response in a single ```html code block. This file will be rendered directly in a browser preview.",
  },
  {
    id: 5,
    name: 'Reviewer',
    role: "Audit the Coder's HTML file for scalability, security, performance, and best practices. Your output must be a markdown document with a list of findings, their severity, and required fixes. This will be the input for the Patcher.",
  },
  {
    id: 6,
    name: 'Patcher',
    role: "Using the Reviewer's feedback, apply all required fixes and improvements to the original HTML code. Your output must be the **complete, patched, self-contained HTML file**, enclosed in a single ```html code block. Also include a brief changelog in markdown format *after* the code block.",
  },
  {
    id: 7,
    name: 'Deployer',
    role: "The Patcher agent has produced the final, self-contained HTML file. Your task is to provide a step-by-step deployment guide for this file. Your output must be a markdown document explaining how to deploy the file using a static web host (e.g., Firebase Hosting, Netlify, or Vercel), and a final deployment report summary.",
  },
];

export const INITIAL_AGENTS: Agent[] = AGENTS_CONFIG.map(config => ({
  ...config,
  status: AgentStatus.PENDING,
  input: null,
  output: null,
}));
