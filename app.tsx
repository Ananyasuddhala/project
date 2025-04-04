import React, { useState } from 'react';
import { Music, Search, Headphones, Radio, Trophy, Users } from 'lucide-react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import Dashboard from './Dashboard';
import MoodChatbot from './MoodChatbot';
import Auth from './Auth';
import Premium from './Premium';
import ThemeSelector from './themeselector';
import { MusicProvider } from '../Context/MusicContext';
import { ThemeProvider } from '../Context/ThemeContext';

function App() {
  const [currentView, setCurrentView] = useState('discover');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  const sidebarItems = [
    { icon: <Music size={20} />, label: 'Discover', id: 'discover' },
    { icon: <Search size={20} />, label: 'Search', id: 'search' },
    { icon: <Headphones size={20} />, label: 'Library', id: 'library' },
    { icon: <Radio size={20} />, label: 'Radio', id: 'radio' },
    { icon: <Trophy size={20} />, label: 'Challenges', id: 'challenges' },
    { icon: <Users size={20} />, label: 'Community', id: 'community' },
  ];

  return (
    <ThemeProvider>
      <MusicProvider>
        <div className="flex h-screen bg-gray-900 text-white">
          <Sidebar
            items={sidebarItems}
            currentView={currentView}
            setCurrentView={setCurrentView}
            onAuthClick={() => setIsAuthOpen(true)}
            onPremiumClick={() => setIsPremiumOpen(true)}
            onThemeClick={() => setIsThemeSelectorOpen(true)}
          />
          <main className="flex-1 overflow-auto">
            <Dashboard currentView={currentView} />
          </main>
          <MusicPlayer />
          <MoodChatbot />
          <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
          <Premium isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} />
          <ThemeSelector isOpen={isThemeSelectorOpen} onClose={() => setIsThemeSelectorOpen(false)} />
        </div>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
