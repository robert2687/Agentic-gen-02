import React from 'react';
import { useAppStore } from '../store';

const ACCENT_COLORS = [
    '#13a4ec', // Primary Blue
    '#9013FE', // Secondary Purple
    '#39FF14', // Neon Green
    '#FF073A', // Neon Red
    '#F600FF', // Neon Pink
    '#FFFF00', // Electric Yellow
];

const Appearance: React.FC = () => {
    const {
        accentColor,
        setAccentColor,
        setView,
    } = useAppStore();

    const defaultAccentColor = '#13a4ec';

    const handleReset = () => {
        setAccentColor(defaultAccentColor);
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="relative flex h-auto min-h-screen w-full flex-col">
                <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                    <button onClick={() => setView('settings')} className="text-text-light dark:text-text-dark flex size-10 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold flex-1 text-center">Appearance</h1>
                    <div className="size-10 shrink-0"></div>
                </header>
                <main className="flex flex-col gap-4">
                    {/* Preview Section */}
                    <div>
                        <h2 className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium uppercase tracking-wider px-4 pb-2 pt-4">Preview</h2>
                        <div className="px-4">
                            <div className="flex flex-col items-stretch justify-start rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-border-light dark:border-border-dark">
                                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-cKRbzAWyiaFv3h9PPWH0ERmrgya5u0Majy1HMUOfAwlPlV2094ugz21Kf3YLp62wXZNB6tH75xST_vGFuNDm9VE82ceqkvy7jaPRT91KCNEGvOEsnn79mbdk7qzp88mQIw5G13Ys1ROzUwDSC-9EhnQv_rZ3j_BbIQA2aEd-J17MTuQadRfTxeidY8OUYWSJOz7KcqNL53DmLmX9nuMDZ99Xz_xS67vZAXs2wl9sDblxQoICd8DeBTu7Pf6oSyeFxUFJ8Sy2YX0")` }}></div>
                                <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                                    <p className="text-lg font-bold text-primary">Project Name</p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">This is how your app will look. Updated in real-time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Accent Color Section */}
                    <div>
                        <h2 className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium uppercase tracking-wider px-4 pb-2 pt-4">Accent Color</h2>
                        <div className="flex gap-4 px-4 overflow-x-auto py-2">
                           {ACCENT_COLORS.map(color => (
                                <button 
                                    key={color} 
                                    onClick={() => setAccentColor(color)}
                                    className={`relative size-10 shrink-0 rounded-full transition-all ${accentColor.toUpperCase() === color.toUpperCase() ? 'ring-2 ring-offset-2 ring-primary ring-offset-background-light dark:ring-offset-background-dark' : ''}`} 
                                    style={{ backgroundColor: color }}
                                    aria-label={`Set accent color to ${color}`}
                                >
                                    {accentColor.toUpperCase() === color.toUpperCase() && (
                                        <span className="absolute inset-0 flex items-center justify-center text-white dark:text-background-dark">
                                            <span className="material-symbols-outlined text-xl">check</span>
                                        </span>
                                    )}
                                </button>
                           ))}
                        </div>
                    </div>
                   
                    {/* Reset Button Section */}
                    <div className="px-4 pt-8 pb-12">
                        <button onClick={handleReset} className="w-full text-center text-sm font-medium text-primary">Reset to Default</button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Appearance;