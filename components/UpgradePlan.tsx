import React, { useState } from 'react';
import { useAppStore } from '../store';

const PlanCard: React.FC<{
  planName: string;
  price: string;
  pricePeriod?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'disabled';
}> = ({ planName, price, pricePeriod, description, features, isPopular, buttonText, buttonVariant }) => {
    const buttonStyles = {
        primary: 'bg-primary text-white dark:text-background-dark hover:bg-primary/90',
        secondary: 'bg-gray-200 dark:bg-white/20 text-text-light dark:text-white hover:bg-gray-300 dark:hover:bg-white/30',
        disabled: 'bg-gray-100 dark:bg-white/10 text-text-secondary-light dark:text-white cursor-not-allowed',
    };

  return (
    <div className={`relative flex flex-1 flex-col gap-5 rounded-xl border border-solid bg-surface-light dark:bg-surface-dark p-6 ${isPopular ? 'border-2 border-primary shadow-2xl shadow-primary/20' : 'border-border-light dark:border-border-dark'}`}>
      {isPopular && <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white dark:text-background-dark text-xs font-medium tracking-[0.015em] rounded-full bg-primary px-3 py-1 text-center">Most Popular</p>}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold leading-tight">{planName}</h1>
        <p className="flex items-baseline gap-1">
          <span className="text-4xl font-black leading-tight tracking-[-0.033em]">{price}</span>
          {pricePeriod && <span className="text-text-secondary-light dark:text-text-secondary-dark text-base font-medium leading-tight">{pricePeriod}</span>}
        </p>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">{description}</p>
      </div>
      <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${buttonStyles[buttonVariant]}`}>
        <span className="truncate">{buttonText}</span>
      </button>
      <div className="flex flex-col gap-3">
        {features.map((feature, index) => (
            <div key={index} className="text-[13px] font-normal leading-normal flex gap-3 items-center text-text-secondary-light dark:text-text-secondary-dark data-[active=true]:text-text-light dark:data-[active=true]:text-white" data-active={planName !== 'Starter' || index < 3}>
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                {feature}
            </div>
        ))}
      </div>
    </div>
  );
};


const UpgradePlan: React.FC = () => {
    const { setView } = useAppStore();
    const [billingCycle, setBillingCycle] = useState<'annually' | 'monthly'>('annually');
    const isAnnual = billingCycle === 'annually';

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <header className="flex items-center p-4 pb-2 justify-between">
                    <button onClick={() => setView('billing')} className="flex size-12 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Unlock Your Full Potential</h2>
                    <div className="size-12 shrink-0"></div>
                </header>

                <div className="flex px-4 py-3">
                    <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-surface-dark/60 p-1 border border-border-light dark:border-border-dark">
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:text-white dark:has-[:checked]:text-background-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold leading-normal">
                            <span className="truncate">Monthly</span>
                            <input className="invisible w-0" name="billing_cycle" type="radio" value="monthly" checked={!isAnnual} onChange={() => setBillingCycle('monthly')} />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:text-white dark:has-[:checked]:text-background-dark text-text-secondary-light dark:text-text-secondary-dark text-sm font-bold leading-normal">
                            <span className="truncate">Annually (Save 20%)</span>
                            <input className="invisible w-0" name="billing_cycle" type="radio" value="annually" checked={isAnnual} onChange={() => setBillingCycle('annually')} />
                        </label>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3">
                    <PlanCard 
                        planName="Starter"
                        price="$0"
                        description="For individuals starting out."
                        features={["5 App Builds/Month", "Basic AI Collaboration", "Community Support"]}
                        buttonText="Current Plan"
                        buttonVariant="disabled"
                    />
                    <PlanCard
                        planName="Pro"
                        price={isAnnual ? "$29" : "$35"}
                        pricePeriod="/ month"
                        description="For professionals and small teams."
                        features={["Unlimited App Builds", "Advanced AI Tools", "Priority Support", "Custom Integrations"]}
                        isPopular
                        buttonText="Upgrade to Pro"
                        buttonVariant="primary"
                    />
                     <PlanCard
                        planName="Enterprise"
                        price={isAnnual ? "$99" : "$120"}
                        pricePeriod="/ month"
                        description="For large-scale applications."
                        features={["Collaborative Workspaces", "Advanced Security", "Dedicated Support", "Custom Branding"]}
                        buttonText="Contact Sales"
                        buttonVariant="secondary"
                    />
                </div>

                <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-8">Compare Features</h3>
                <div className="px-4 pb-8">
                    <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark rounded-lg bg-surface-light dark:bg-surface-dark p-4 border border-border-light dark:border-border-dark">
                        <div className="flex justify-between gap-x-6 py-3">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Number of AI Agents</p>
                            <p className="text-sm font-medium leading-normal text-right">Basic</p>
                        </div>
                        <div className="flex justify-between gap-x-6 py-3">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Deployment Options</p>
                            <p className="text-sm font-medium leading-normal text-right">Standard</p>
                        </div>
                        <div className="flex justify-between gap-x-6 py-3">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Code Export</p>
                            <p className="text-sm font-medium leading-normal text-right">Limited</p>
                        </div>
                        <div className="flex justify-between gap-x-6 py-3">
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">API Access</p>
                            <p className="text-sm font-medium leading-normal text-right">Unavailable</p>
                        </div>
                    </div>
                </div>

                <div className="text-center py-6 px-4">
                    <a className="text-primary text-sm font-medium hover:underline" href="#">
                        Frequently Asked Questions about Billing
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UpgradePlan;