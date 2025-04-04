import React from 'react';
import { Palette, Crown, Lock } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';
import { useMusicContext } from '../Context/MusicContext';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const { availableThemes, setTheme, currentTheme } = useTheme();
  const { userStats } = useMusicContext();

  if (!isOpen) return null;

  const handleThemeSelect = (theme: typeof availableThemes[0]) => {
    if (theme.isPremium && !userStats.isPremium) {
      return;
    }
    setTheme(theme);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-audrey font-bold">Choose Your Theme</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {availableThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeSelect(theme)}
              disabled={theme.isPremium && !userStats.isPremium}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                currentTheme.name === theme.name
                  ? `border-${theme.primary}-500 bg-${theme.primary}-500 bg-opacity-20`
                  : 'border-gray-700 hover:border-gray-600'
              } ${theme.isPremium && !userStats.isPremium ? 'opacity-50' : ''}`}
            >
              {theme.isPremium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Crown size={12} />
                  Premium
                </div>
              )}
              
              <div className="flex gap-2 mb-3">
                {[theme.primary, theme.secondary, theme.accent].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full bg-${color}-500 ${
                      theme.isPremium && !userStats.isPremium ? 'filter grayscale' : ''
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{theme.name}</span>
                {theme.isPremium && !userStats.isPremium && (
                  <Lock size={14} className="text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        {!userStats.isPremium && (
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">
              Unlock premium themes and more with Raagya Premium
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-yellow-600 transition-colors"
            >
              Go Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;

