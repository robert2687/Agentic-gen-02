import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { AgentStatus } from '../types';

import Header from './Header';
import AgentCard from './AgentCard';
import AgentDetailView from './AgentDetailView';
import PreviewPanel from './PreviewPanel';
import SpinnerIcon from './icons/SpinnerIcon';

const Workspace: React.FC = () => {
    const { 
        agents, 
        projectGoal, 
        projectName, 
        isGenerating, 
        previewCode, 
        startGeneration, 
        cancelGeneration,
    } = useAppStore();

    const [selectedAgentId, setSelectedAgentId] = useState<number>(1);
    const [isZenMode, setIsZenMode] = useState(false);

    const selectedAgent = agents.find(agent => agent.id === selectedAgentId) || agents[0];
    const isComplete = !isGenerating && agents.every(a => a.status === AgentStatus.COMPLETED || a.status === AgentStatus.ERROR);
    const currentAgent = agents.find(a => a.status === AgentStatus.RUNNING);

    useEffect(() => {
        if (currentAgent) {
            setSelectedAgentId(currentAgent.id);
        }
    }, [currentAgent]);

    const handlePrimaryAction = () => {
        if (isGenerating) {
            cancelGeneration();
        } else {
            startGeneration();
        }
    };
    
    return (
        <div className="flex flex-col h-screen bg-background-dark text-text-dark font-sans">
            <Header />
            <main className={`flex-grow grid grid-cols-1 md:grid-cols-[22rem_1fr] lg:grid-cols-[22rem_1fr_1fr] overflow-hidden transition-all duration-300 ${isZenMode ? 'lg:grid-cols-[22rem_1fr_0]':''}`}>
                {/* Left Panel */}
                <aside className={`flex flex-col p-4 gap-4 border-r border-border-dark overflow-y-auto ${isZenMode ? 'hidden lg:flex' : 'flex'}`}>
                     <div className="bg-surface-dark rounded-lg p-4 flex flex-col gap-4">
                        <h2 className="font-bold text-lg text-text-dark">{projectName}</h2>
                        <div className="w-full h-24 p-2 bg-background-dark rounded-md border border-border-dark text-sm overflow-y-auto whitespace-pre-wrap text-secondary-dark">
                            {projectGoal}
                        </div>
                        <div className="flex gap-2">
                             <button
                                onClick={handlePrimaryAction}
                                disabled={!projectGoal.trim()}
                                className="flex-grow bg-primary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {isGenerating && <SpinnerIcon className="w-5 h-5"/>}
                                {isGenerating ? 'Cancel Generation' : isComplete ? 'Regenerate' : 'Start Generation'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-secondary-dark font-semibold px-2 mb-2">AGENTS</h3>
                        <div className="flex flex-col gap-2">
                            {agents.map(agent => (
                                <AgentCard 
                                    key={agent.id}
                                    agent={agent}
                                    isSelected={selectedAgentId === agent.id}
                                    isCurrent={currentAgent?.id === agent.id}
                                    onClick={() => setSelectedAgentId(agent.id)}
                                />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Center Panel */}
                <section className={`flex flex-col overflow-hidden p-4 ${isZenMode ? 'hidden lg:flex' : 'flex'}`}>
                    <AgentDetailView agent={selectedAgent} />
                </section>

                {/* Right Panel */}
                <section className="flex flex-col overflow-hidden p-4 pl-0">
                    <PreviewPanel code={previewCode} isZenMode={isZenMode} onToggleZenMode={() => setIsZenMode(!isZenMode)} />
                </section>
            </main>
        </div>
    );
};

export default Workspace;