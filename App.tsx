import React, { useEffect } from 'react';
import { useAppStore } from './store';

import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateProject from './components/CreateProject';
import Workspace from './components/Workspace';
import Settings from './components/Settings';
import Appearance from './components/Appearance';

const App: React.FC = () => {
  const { view, isSignedIn, isDarkMode, accentColor, error, setError } = useAppStore(state => ({
    view: state.view,
    isSignedIn: state.isSignedIn,
    isDarkMode: state.isDarkMode,
    accentColor: state.accentColor,
    error: state.error,
    setError: state.setError,
  }));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', accentColor);
  }, [accentColor]);

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
      default:
        return <Home />;
    }
  }

  return (
    <>
      {renderView()}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold">An Error Occurred</p>
            <button onClick={() => setError(null)} className="text-xl leading-none">&times;</button>
          </div>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </>
  );
};

export default App;