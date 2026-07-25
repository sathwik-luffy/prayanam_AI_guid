import React, { useState } from 'react';
import { PrayanamLanding } from './PrayanamLanding';
import { GetStartedFlow } from './GetStartedFlow';

export default function App() {
  // Page view state: 'landing' (Prayanam Main Landing Page) or 'get-started' (Full-Page Get Started Auth & Dashboard Engine)
  const [currentView, setCurrentView] = useState<'landing' | 'get-started'>('landing');

  return (
    <div className="w-full min-h-screen bg-black select-none">
      {currentView === 'landing' ? (
        <PrayanamLanding onNavigateToGetStarted={() => setCurrentView('get-started')} />
      ) : (
        <GetStartedFlow onBackToLanding={() => setCurrentView('landing')} />
      )}
    </div>
  );
}
