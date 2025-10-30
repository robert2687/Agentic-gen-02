import React from 'react';
import type { Agent } from '../types';
import { AgentStatus } from '../types';
import PlannerIcon from './icons/PlannerIcon';
import ArchitectIcon from './icons/ArchitectIcon';
import CoderIcon from './icons/CoderIcon';
import ReviewerIcon from './icons/ReviewerIcon';
import DeployerIcon from './icons/DeployerIcon';
import SpinnerIcon from './icons/SpinnerIcon';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const VisualDesignerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

const PatcherIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

const statusStyles: Record<AgentStatus, { border: string; bg: string; text: string }> = {
  [AgentStatus.PENDING]: { border: 'border-border-light dark:border-border-dark', bg: 'bg-surface-light dark:bg-surface-dark/30', text: 'text-text-secondary-light dark:text-text-secondary-dark' },
  [AgentStatus.RUNNING]: { border: 'border-primary', bg: 'bg-primary/10', text: 'text-primary' },
  [AgentStatus.COMPLETED]: { border: 'border-green-500 dark:border-accent-green', bg: 'bg-green-500/10 dark:bg-accent-green/10', text: 'text-green-600 dark:text-accent-green' },
  [AgentStatus.ERROR]: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-500' },
};

const AgentIcon = ({ name }: { name: string }) => {
    const iconProps = { className: "w-6 h-6" };
    switch (name) {
        case 'Planner': return <PlannerIcon {...iconProps} />;
        case 'Architect': return <ArchitectIcon {...iconProps} />;
        case 'Visual Designer': return <VisualDesignerIcon {...iconProps} />;
        case 'Coder': return <CoderIcon {...iconProps} />;
        case 'Reviewer': return <ReviewerIcon {...iconProps} />;
        case 'Patcher': return <PatcherIcon {...iconProps} />;
        case 'Deployer': return <DeployerIcon {...iconProps} />;
        default: return null;
    }
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, isCurrent, onClick }) => {
  const styles = statusStyles[agent.status];
  const selectedClass = isSelected ? 'ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark ring-primary' : '';
  
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border flex items-center gap-4 cursor-pointer transition-all duration-200 ${styles.border} ${styles.bg} ${selectedClass} hover:bg-black/5 dark:hover:bg-white/5`}
    >
      <div className={`flex-shrink-0 ${styles.text}`}>
        {agent.status === AgentStatus.RUNNING || (isCurrent && agent.status !== AgentStatus.COMPLETED) ? <SpinnerIcon className="w-6 h-6" /> : <AgentIcon name={agent.name} />}
      </div>
      <div>
        <h3 className={`font-bold text-text-light dark:text-text-dark ${styles.text}`}>{agent.name}</h3>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark capitalize">{agent.status}</p>
      </div>
    </div>
  );
};

export default AgentCard;