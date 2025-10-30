import React from 'react';
import { useAppStore } from '../store';

const Billing: React.FC = () => {
    const { setView } = useAppStore(state => ({
        setView: state.setView,
    }));

    const onBack = () => setView('settings');
    const onChangePlan = () => setView('upgradePlan');

    const invoices = [
        { month: 'November 2024', id: 'INV-2024-1120', amount: '$29.00' },
        { month: 'October 2024', id: 'INV-2024-1020', amount: '$29.00' },
        { month: 'September 2024', id: 'INV-2024-0920', amount: '$29.00' },
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <header className="flex shrink-0 items-center justify-between border-b border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 py-3 sticky top-0 z-10">
                <button onClick={onBack} className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight">Billing &amp; Subscription</h1>
                <div className="h-10 w-10 shrink-0"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {/* Current Plan Card */}
                <div className="mb-6">
                    <div className="flex flex-col items-stretch justify-start rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-6">
                            <p className="text-sm font-medium uppercase tracking-wider text-primary">Your Current Plan</p>
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <p className="text-2xl font-bold">Pro Plan</p>
                                <p className="text-2xl font-bold">$29<span className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">/mo</span></p>
                            </div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Your next bill for $29.00 is on Dec 20, 2024.</p>
                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                <button onClick={onChangePlan} className="flex min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:opacity-90">
                                    <span className="truncate">Change Plan</span>
                                </button>
                                <a className="flex min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/10 text-sm font-medium" href="#">
                                    <span className="truncate">Cancel Subscription</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Payment Method Section */}
                <div className="mb-6">
                    <h3 className="px-2 pb-2 pt-4 text-lg font-bold">Payment Method</h3>
                    <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark rounded-xl bg-surface-light dark:bg-surface-dark p-2 shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex min-h-14 items-center gap-4 px-4 py-2">
                            <div className="flex flex-1 items-center gap-4">
                                <img className="h-6 w-10 shrink-0 rounded" alt="Visa card logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9WUzfR2fZ6Gg3kfF50aSlfBPY054IJiGlZjSjxCSNdov_HXJ_W77cVjoe45gbbYR5SvP_mIwsqdmBlOXvy07bSNxXZSrK7pqCjf1J49ZPHV02j3s7gocat-7x1FNzxHRxZNEBCwK-kgGy79XFRwHbG1XbMKVLtazZeOMBVgIfiVkKU0E-tiuZme2bGlTdC9wlNVTJwZC5QfHTvYZMxj5EMBse8y_5clAGSkJxEXbXUDOD2zrL-LRCBaQXoIpbG_HNs0GJJz_04wk"/>
                                <div className="flex-1 truncate">
                                    <p className="text-base font-medium leading-normal">Visa ending in 4242</p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Expires 12/26</p>
                                 </div>
                            </div>
                            <div className="shrink-0">
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-gray-100 dark:bg-white/10 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-white/20 text-sm font-medium">
                                    <span className="truncate">Update</span>
                                </button>
                            </div>
                        </div>
                        <button className="flex min-h-14 cursor-pointer items-center gap-4 px-4 py-3 text-primary hover:bg-primary/10 rounded-b-lg">
                            <span className="material-symbols-outlined">add_circle</span>
                            <p className="flex-1 truncate text-base font-medium leading-normal text-left">Add New Payment Method</p>
                        </button>
                    </div>
                </div>
                {/* Invoice History Section */}
                <div>
                    <h3 className="px-2 pb-2 pt-4 text-lg font-bold">Invoice History</h3>
                    <div className="overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark">
                            {invoices.map((invoice) => (
                                <div key={invoice.id} className="flex min-h-14 flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
                                    <div className="flex-1">
                                        <p className="text-base font-medium leading-normal">{invoice.month}</p>
                                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{invoice.id}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-4">
                                        <p className="text-base font-medium">{invoice.amount}</p>
                                        <button aria-label={`Download invoice ${invoice.id}`} className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-white/10 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-white/20">
                                            <span className="material-symbols-outlined text-base">download</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Billing;