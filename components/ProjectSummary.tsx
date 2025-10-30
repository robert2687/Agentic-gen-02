import React from 'react';
import EyeIcon from './icons/EyeIcon';
import PlayIcon from './icons/PlayIcon';

interface ProjectSummaryProps {
  projectGoal: string;
  onStart: () => void;
  onReset: () => void;
  onPreview: () => void;
  isGenerating: boolean;
  isComplete: boolean;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ projectGoal, onStart, onReset, onPreview, isGenerating, isComplete }) => {
  
  const handlePrimaryAction = () => {
    if (isComplete) {
      onPreview();
    } else {
      onStart();
    }
  };

  const primaryButtonText = isGenerating 
    ? 'Generating...' 
    : isComplete 
    ? 'Preview Application' 
    : 'Start Generation';
  
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 flex flex-col gap-4">
      <h2 className="font-bold text-sky-400">Project Goal</h2>
      <div className="w-full h-32 p-2 bg-slate-700/50 rounded-md border border-slate-600 text-sm overflow-y-auto whitespace-pre-wrap">
        {projectGoal}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handlePrimaryAction}
          disabled={isGenerating || !projectGoal.trim()}
          className="flex-grow bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isComplete ? <EyeIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          {primaryButtonText}
        </button>
        <button
          onClick={onReset}
          className="bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-500 disabled:bg-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProjectSummary;