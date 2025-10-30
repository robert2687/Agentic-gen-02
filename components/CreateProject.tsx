import React, { useState } from 'react';
import { useAppStore } from '../store';

const CreateProject: React.FC = () => {
  const { setView, setProjectName, setProjectGoal, resetWorkflow, startGeneration } = useAppStore(state => ({
    setView: state.setView,
    setProjectName: state.setProjectName,
    setProjectGoal: state.setProjectGoal,
    resetWorkflow: state.resetWorkflow,
    startGeneration: state.startGeneration,
  }));

  const [projectName, setLocalProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerate = () => {
      let prompt = `Project Name: ${projectName}\n`;
      prompt += `App Description: ${description}\n`;
      
      setProjectName(projectName || 'My New App');
      setProjectGoal(prompt);
      resetWorkflow();
      setView('workspace');
      startGeneration();
  }

  const handleBack = () => {
      resetWorkflow();
      setProjectGoal('');
      setView('home');
  }

  const isFormValid = projectName.trim() !== '' && description.trim() !== '';

  return (
    <div className={`relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark`}>
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <button onClick={handleBack} className="text-text-light dark:text-text-dark flex size-10 shrink-0 items-center justify-center" aria-label="Go back">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-text-light dark:text-text-dark text-lg font-bold flex-1 text-center">Create New Project</h1>
          <div className="flex size-10 shrink-0 items-center"></div>
        </header>
      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <label className="flex flex-col">
            <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">Project Name</p>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-12 placeholder:text-secondary-light dark:placeholder:text-secondary-dark px-4 text-base font-normal" 
              placeholder="e.g., Social Fitness Tracker" 
              value={projectName}
              onChange={(e) => setLocalProjectName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-light dark:text-text-dark text-base font-medium pb-2">What should your app do?</p>
            <textarea 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark min-h-36 placeholder:text-secondary-light dark:placeholder:text-secondary-dark p-4 text-base font-normal" 
              placeholder="Describe your app in detail. For example: 'An app that tracks daily workouts, allows users to add friends, and share their progress on a social feed...'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
      </main>
      <footer className="sticky bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-border-light dark:border-border-dark">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handleGenerate} 
            disabled={!isFormValid}
            className="flex h-12 w-full items-center justify-center gap-x-2 rounded-xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30 transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate App
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CreateProject;