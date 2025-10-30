import React from 'react';
import HomeIcon from './icons/HomeIcon';
import { useAppStore } from '../store';

const Header: React.FC = () => {
  const { setView, resetWorkflow } = useAppStore();
  const onGoHome = () => {
    resetWorkflow();
    setView('home');
  };
  
  return (
    <header className="bg-surface-dark/70 backdrop-blur-sm p-4 border-b border-border-dark flex-shrink-0">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold text-primary">
              Agentic AI App Generator
            </h1>
            <p className="text-sm text-secondary-dark">A collaborative AI team for building applications, from concept to deployment.</p>
        </div>
        <button
            onClick={onGoHome}
            className="flex items-center gap-2 bg-border-dark px-4 py-2 rounded-lg hover:bg-border-dark/80 transition-colors text-text-dark"
            aria-label="Back to Home"
        >
            <HomeIcon className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Home</span>
        </button>
      </div>
    </header>
  );
};

export default Header;