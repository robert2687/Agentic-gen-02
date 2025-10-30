import React, { useRef, useEffect } from 'react';
import type { Agent } from '../types';
import { AgentStatus } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import SkeletonLoader from './SkeletonLoader';

interface AgentDetailViewProps {
  agent: Agent | null;
}

const AgentDetailView: React.FC<AgentDetailViewProps> = ({ agent }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && agent?.status === AgentStatus.RUNNING) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [agent?.output, agent?.status]);
  
  if (!agent) {
    return (
       <div className="flex items-center justify-center h-full bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark rounded-lg border border-border-light dark:border-border-dark">
          <p>Select an agent to see details.</p>
        </div>
    )
  }

  const renderOutputContent = () => {
    switch (agent.status) {
      case AgentStatus.RUNNING:
        if (!agent.output) {
          return <SkeletonLoader />;
        }
        return (
          <>
            <MarkdownRenderer content={agent.output} />
            <div className="inline-block animate-pulse bg-primary w-2 h-5 ml-1" aria-label="Generating more content" />
          </>
        );

      case AgentStatus.COMPLETED:
        if (!agent.output) {
          return <p className="text-text-secondary-light dark:text-text-secondary-dark">Agent completed its task without generating any output.</p>;
        }
        return <MarkdownRenderer content={agent.output} />;

      case AgentStatus.ERROR:
        return (
          <div className="text-red-500 whitespace-pre-wrap">
            <p className="font-bold">An error occurred:</p>
            {agent.output}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
      <div className="p-4 border-b border-border-light dark:border-border-dark flex-shrink-0">
        <h2 className="text-xl font-bold text-primary">{agent.name} Agent</h2>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{agent.role}</p>
      </div>
      
      <div ref={scrollContainerRef} className="flex-grow p-4 overflow-y-auto">
        {agent.status === AgentStatus.PENDING && (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Waiting for the workflow to start...</p>
          </div>
        )}

        {agent.status !== AgentStatus.PENDING && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Input</h3>
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-md text-sm text-text-light dark:text-text-dark whitespace-pre-wrap font-mono max-h-60 overflow-y-auto ring-1 ring-border-light dark:ring-border-dark">
                {agent.input || 'No input received yet.'}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Output</h3>
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-md min-h-[200px] ring-1 ring-border-light dark:ring-border-dark">
                {renderOutputContent()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetailView;