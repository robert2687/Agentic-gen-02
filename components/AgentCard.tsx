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

const statusStyles: Record<AgentStatus, { border: string; bg: string; text: string }> = {
  [AgentStatus.PENDING]: { border: 'border-border-dark', bg: 'bg-surface-dark/30', text: 'text-secondary-dark' },
  [AgentStatus.RUNNING]: { border: 'border-primary', bg: 'bg-primary/10', text: 'text-primary' },
  [AgentStatus.COMPLETED]: { border: 'border-accent-green', bg: 'bg-accent-green/10', text: 'text-accent-green' },
  [AgentStatus.ERROR]: { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-400' },
};

const AgentIcon = ({ name }: { name: string }) => {
    const iconProps = { className: "w-6 h-6" };
    switch (name) {
        case 'Planner': return <PlannerIcon {...iconProps} />;
        case 'Architect': return <ArchitectIcon {...iconProps} />;
        case 'Coder': return <CoderIcon {...iconProps} />;
        case 'Reviewer': return <ReviewerIcon {...iconProps} />;
        case 'Deployer': return <DeployerIcon {...iconProps} />;
        default: return null;
    }
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, isCurrent, onClick }) => {
  const styles = statusStyles[agent.status];
  const selectedClass = isSelected ? 'ring-2 ring-offset-2 ring-offset-background-dark ring-primary' : '';
  
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border flex items-center gap-4 cursor-pointer transition-all duration-200 ${styles.border} ${styles.bg} ${selectedClass}`}
    >
      <div className={`flex-shrink-0 ${styles.text}`}>
        {agent.status === AgentStatus.RUNNING || (isCurrent && agent.status !== AgentStatus.COMPLETED) ? <SpinnerIcon className="w-6 h-6" /> : <AgentIcon name={agent.name} />}
      </div>
      <div>
        <h3 className={`font-bold ${styles.text}`}>{agent.name}</h3>
        <p className="text-xs text-secondary-dark capitalize">{agent.status}</p>
      </div>
    </div>
  );
};

export default AgentCard;