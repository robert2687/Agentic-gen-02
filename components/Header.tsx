import React from 'react';
import HomeIcon from './icons/HomeIcon';
import { useAppStore } from '../store';

const Header: React.FC = () => {
  const { setView, resetWorkflow, projectName } = useAppStore(state => ({
    setView: state.setView,
    resetWorkflow: state.resetWorkflow,
    projectName: state.projectName,
  }));

  const onGoHome = () => {
    resetWorkflow();
    setView('home');
  };
  
  return (
    <header className="bg-background-light dark:bg-background-dark p-4 border-b border-border-light dark:border-border-dark flex-shrink-0">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div>
            <h1 className="text-lg font-bold text-text-light dark:text-text-dark">
              {projectName}
            </h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden sm:block">Agent Workflow</p>
        </div>
        <button
            onClick={onGoHome}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-secondary-light dark:text-text-secondary-dark"
            aria-label="Back to Home"
        >
            <HomeIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;