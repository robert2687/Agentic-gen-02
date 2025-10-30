import React from 'react';
import { useAppStore } from '../store';

const Settings: React.FC = () => {
    const { signOut, setView } = useAppStore(state => ({
        signOut: state.signOut,
        setView: state.setView,
    }));

    const onBack = () => setView('home');

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
             <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <button onClick={onBack} className="text-text-light dark:text-text-dark flex size-10 shrink-0 items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold flex-1 text-center">Settings</h1>
                <div className="flex size-10 shrink-0 items-center"></div>
            </header>
            <main className="flex-1 p-4 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-secondary-light dark:text-secondary-dark text-sm font-medium uppercase tracking-wider px-4">Account</h2>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl">
                        <button className="flex items-center justify-between w-full p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                            <p>user@example.com</p>
                            <span className="material-symbols-outlined text-secondary-light dark:text-secondary-dark">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-secondary-light dark:text-secondary-dark text-sm font-medium uppercase tracking-wider px-4">Preferences</h2>
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl divide-y divide-border-light dark:divide-border-dark">
                         <button onClick={() => {}} className="flex items-center justify-between w-full p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                            <p>Notifications</p>
                            <span className="material-symbols-outlined text-secondary-light dark:text-secondary-dark">chevron_right</span>
                        </button>
                        <button onClick={() => setView('appearance')} className="flex items-center justify-between w-full p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                            <p>Appearance</p>
                            <span className="material-symbols-outlined text-secondary-light dark:text-secondary-dark">chevron_right</span>
                        </button>
                    </div>
                </div>
                
                <div className="pt-4">
                    <button 
                        onClick={signOut}
                        className="w-full text-center text-sm font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Settings;