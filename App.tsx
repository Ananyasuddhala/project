import React, { useState, useEffect } from "react";
import { Loader2, Music, Search, Headphones, Radio, Trophy, Users } from "lucide-react";
import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import Dashboard from "./components/Dashboard";
import MoodChatbot from "./components/MoodChatbot";
import Premium from "./components/Premium";
import ThemeSelector from "./components/themeselector";
import { MusicProvider } from "./Context/MusicContext";
import { ThemeProvider } from "./Context/ThemeContext";

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('discover');
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        // Simulate a small delay to prevent flash of content
        await new Promise(resolve => setTimeout(resolve, 500));
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        const email = localStorage.getItem("userEmail");
        setIsAuthenticated(authStatus);
        setUserEmail(email);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const sidebarItems = [
    { icon: <Music size={20} />, label: 'Discover', id: 'discover' },
    { icon: <Search size={20} />, label: 'Search', id: 'search' },
    { icon: <Headphones size={20} />, label: 'Library', id: 'library' },
    { icon: <Radio size={20} />, label: 'Radio', id: 'radio' },
    { icon: <Trophy size={20} />, label: 'Challenges', id: 'challenges' },
    { icon: <Users size={20} />, label: 'Community', id: 'community' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <main className="text-center">
          <h1 className="text-3xl font-bold mb-8">Welcome to Raagya 🎵</h1>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg transition-colors"
            aria-label="Open sign in form"
          >
            Sign In
          </button>
          <Auth
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            initialMode="login"
          />
        </main>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <MusicProvider>
        <div className="flex h-screen bg-gray-900 text-white">
          <Sidebar
            items={sidebarItems}
            currentView={currentView}
            setCurrentView={setCurrentView}
            onAuthClick={handleLogout}
            onPremiumClick={() => setIsPremiumOpen(true)}
            onThemeClick={() => setIsThemeSelectorOpen(true)}
          />
          <main className="flex-1 overflow-auto">
            <Dashboard currentView={currentView} />
          </main>
          <MusicPlayer />
          <MoodChatbot />
          <Premium isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} />
          <ThemeSelector isOpen={isThemeSelectorOpen} onClose={() => setIsThemeSelectorOpen(false)} />
        </div>
      </MusicProvider>
    </ThemeProvider>
  );
};

export default App;

