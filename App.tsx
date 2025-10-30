import React, { useEffect } from 'react';
import { useAppStore } from './store';

import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import Appearance from './components/Appearance';
import Billing from './components/Billing';
import UpgradePlan from './components/UpgradePlan';

const App: React.FC = () => {
  const { view, isSignedIn, accentColor, error, setError, isDarkMode } = useAppStore(state => ({
    view: state.view,
    isSignedIn: state.isSignedIn,
    accentColor: state.accentColor,
    error: state.error,
    setError: state.setError,
    isDarkMode: state.isDarkMode,
  }));

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', accentColor);
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [accentColor, isDarkMode]);

  if (!isSignedIn) {
    return <SignIn />;
  }

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'createProject':
        return <CreateProject />;
      case 'workspace':
        return <Workspace />;
      case 'settings':
        return <Settings />;
      case 'appearance':
        return <Appearance />;
      case 'billing':
        return <Billing />;
      case 'upgradePlan':
        return <UpgradePlan />;
      default:
        return <Home />;
    }
  }

  return (
    <>
      {renderView()}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg z-50 max-w-sm border border-red-600 dark:border-red-400">
          <div className="flex justify-between items-start mb-2">
            <p className="font-bold text-base">An Error Occurred</p>
            <button onClick={() => setError(null)} className="text-2xl leading-none hover:opacity-80 transition-opacity -mt-2 -mr-1">&times;</button>
          </div>
          <p className="text-sm font-light">{error}</p>
        </div>
      )}
    </>
  );
};

export default App;