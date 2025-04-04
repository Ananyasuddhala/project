import React, { createContext, useContext, useState } from 'react';
import { useMusicContext } from './MusicContext';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
  isPremium?: boolean;
}

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

const defaultThemes: Theme[] = [
  {
    name: 'Default Purple',
    primary: 'purple',
    secondary: 'pink',
    accent: 'indigo'
  },
  {
    name: 'Ocean Blue',
    primary: 'blue',
    secondary: 'cyan',
    accent: 'teal'
  },
  {
    name: 'Sunset Orange',
    primary: 'orange',
    secondary: 'red',
    accent: 'yellow'
  },
  {
    name: 'Forest Green',
    primary: 'emerald',
    secondary: 'green',
    accent: 'lime'
  },
  {
    name: 'Royal Gold',
    primary: 'amber',
    secondary: 'yellow',
    accent: 'orange',
    isPremium: true
  },
  {
    name: 'Cosmic Purple',
    primary: 'violet',
    secondary: 'purple',
    accent: 'fuchsia',
    isPremium: true
  },
  {
    name: 'Electric Dreams',
    primary: 'sky',
    secondary: 'indigo',
    accent: 'blue',
    isPremium: true
  },
  {
    name: 'Rose Garden',
    primary: 'rose',
    secondary: 'pink',
    accent: 'red',
    isPremium: true
  },
  {
    name: 'Midnight Jazz',
    primary: 'slate',
    secondary: 'zinc',
    accent: 'stone',
    isPremium: true
  },
  {
    name: 'Tropical Paradise',
    primary: 'teal',
    secondary: 'emerald',
    accent: 'cyan',
    isPremium: true
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme: setCurrentTheme,
      availableThemes: defaultThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

