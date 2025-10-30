import React from 'react';
import { useAppStore } from '../store';

const Settings: React.FC = () => {
    const { signOut, setView, isDarkMode, toggleDarkMode } = useAppStore(state => ({
        signOut: state.signOut,
        setView: state.setView,
        isDarkMode: state.isDarkMode,
        toggleDarkMode: state.toggleDarkMode,
    }));

    const onBack = () => setView('home');

    const settingsItems = [
        {
            heading: "Account Information",
            items: [
                { icon: "mail", label: "Email Address", value: "user@example.com", action: () => {} },
                { icon: "lock", label: "Change Password", action: () => {} },
            ],
        },
        {
            heading: "Preferences",
            items: [
                { icon: "notifications", label: "Notifications", action: () => {} },
                { icon: "dark_mode", label: "Dark Mode", isToggle: true },
            ],
        },
        {
            heading: "Billing",
            items: [
                { icon: "credit_card", label: "Manage Subscription", action: () => setView('billing') },
            ],
        },
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <button onClick={onBack} className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Settings</h1>
                <div className="flex size-12 shrink-0 items-center"></div>
            </header>
            <main className="flex-1 px-4 py-3 space-y-8">
                {settingsItems.map(section => (
                    <div key={section.heading} className="space-y-4">
                        <h2 className="text-text-secondary-light dark:text-gray-400 text-sm font-bold uppercase tracking-wider px-1">{section.heading}</h2>
                        <div className="bg-surface-light dark:bg-black/20 rounded-xl overflow-hidden divide-y divide-border-light dark:divide-gray-700">
                            {section.items.map(item => (
                                <div key={item.label} onClick={item.action} className={`flex items-center justify-between p-4 ${item.action ? 'hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">{item.icon}</span>
                                        <p>{item.label}</p>
                                    </div>
                                    {item.isToggle ? (
                                        <label className="switch">
                                            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                                            <span className="slider"></span>
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            {item.value && <span className="text-text-secondary-light dark:text-gray-400 text-sm">{item.value}</span>}
                                            {item.action && <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">chevron_right</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="pt-4">
                    <button onClick={signOut} className="flex h-14 w-full items-center justify-center gap-x-2 rounded-xl bg-gray-200 dark:bg-gray-800 px-6 text-base font-bold text-red-500 transition-colors hover:bg-gray-300 dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Settings;