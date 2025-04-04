import React from 'react';
import { Music2, LogIn, Crown, Palette } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

interface SidebarProps {
  items: Array<{
    icon: React.ReactNode;
    label: string;
    id: string;
  }>;
  currentView: string;
  setCurrentView: (view: string) => void;
  onAuthClick: () => void;
  onPremiumClick: () => void;
  onThemeClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  currentView,
  setCurrentView,
  onAuthClick,
  onPremiumClick,
  onThemeClick
}) => {
  const { currentTheme } = useTheme();

  return (
    <div className="w-64 bg-gray-800 p-6">
      <button
        onClick={() => setCurrentView('discover')}
        className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity"
      >
        <Music2 className={`h-8 w-8 text-${currentTheme.primary}-500 transform rotate-90`} />
        <span className="text-xl font-bold font-audrey tracking-wider">Raagya</span>
      </button>
      
      <nav className="space-y-8">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? `bg-${currentTheme.primary}-500 text-white`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <button
            onClick={onAuthClick}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <LogIn size={20} />
            <span>Sign In</span>
          </button>
          
          <button
            onClick={onPremiumClick}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-${currentTheme.primary}-500 to-${currentTheme.secondary}-500 text-white hover:from-${currentTheme.primary}-600 hover:to-${currentTheme.secondary}-600`}
          >
            <Crown size={20} />
            <span>Go Premium</span>
          </button>

          <button
            onClick={onThemeClick}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <Palette size={20} />
            <span>Customize Theme</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

