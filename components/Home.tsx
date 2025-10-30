import React from 'react';
import { useAppStore } from '../store';

const Home: React.FC = () => {
  const { setView, signOut } = useAppStore(state => ({
    setView: state.setView,
    signOut: state.signOut,
  }));

  const handleStartNewProject = () => setView('createProject');
  const handleShowSettings = () => setView('settings');

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased">
      <div className="flex flex-col min-h-screen">
        <header className="p-4 sm:p-6 border-b border-border-light dark:border-border-dark sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
             <h1 className="text-xl font-bold text-primary">Agentic AI</h1>
            <div className="flex items-center space-x-2">
              <button aria-label="Settings" onClick={handleShowSettings} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                  settings
                </span>
              </button>
               <button aria-label="Sign Out" onClick={signOut} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                  logout
                </span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow p-4 sm:p-6 space-y-8 max-w-5xl mx-auto w-full">
          <section className="text-center py-12">
            <h2 className="text-4xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-secondary-light dark:text-secondary-dark mt-2 text-lg">Ready to build your next big idea?</p>
             <button
              onClick={handleStartNewProject}
              className="mt-8 bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-primary/30 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Start New Project</span>
            </button>
          </section>
         
          <section>
             <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
             <div className="text-center py-12 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl">
                <p className="text-secondary-light dark:text-secondary-dark">You have no recent projects.</p>
             </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Home;