import React from 'react';
import ZenOnIcon from './icons/ZenOnIcon';
import ZenOffIcon from './icons/ZenOffIcon';

interface PreviewPanelProps {
  code: string | null;
  isZenMode: boolean;
  onToggleZenMode: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ code, isZenMode, onToggleZenMode }) => {
  return (
    <div className="flex flex-col h-full bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
      <header className="flex items-center justify-between p-3 border-b border-border-light dark:border-border-dark flex-shrink-0">
        <h2 className="font-bold text-base text-text-light dark:text-text-dark">Live Application Preview</h2>
        <button
          onClick={onToggleZenMode}
          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-light dark:hover:text-white transition-colors rounded-full p-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
          {isZenMode ? <ZenOffIcon className="w-5 h-5" /> : <ZenOnIcon className="w-5 h-5" />}
        </button>
      </header>
      <div className="flex-grow bg-white rounded-b-lg overflow-hidden">
        <iframe
          srcDoc={code || '<!DOCTYPE html><html><head></head><body style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f0f2f5; font-family: sans-serif; color: #666;">Waiting for Coder agent...</body></html>'}
          title="Application Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-forms allow-modals"
        />
      </div>
    </div>
  );
};

export default PreviewPanel;