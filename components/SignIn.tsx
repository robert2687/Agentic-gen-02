import React from 'react';
import { useAppStore } from '../store';

const SignIn: React.FC = () => {
  const { signIn } = useAppStore(state => ({
    signIn: state.signIn,
  }));

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-sm w-full text-center">
            <span className="material-symbols-outlined text-5xl text-primary">
              hub
            </span>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mt-4">Agentic AI</h1>
            <p className="text-secondary-light dark:text-secondary-dark mt-1 mb-8">
              Sign in to start building with your AI team.
            </p>
          <button
            onClick={signIn}
            className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;