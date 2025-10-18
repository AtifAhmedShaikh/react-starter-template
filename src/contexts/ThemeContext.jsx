import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, MODES, DEFAULT_THEME, DEFAULT_MODE, THEME_COLORS } from '@/config/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [mode, setMode] = useState(DEFAULT_MODE);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('themeMode');
    
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      setTheme(savedTheme);
    }
    
    if (savedMode && Object.values(MODES).includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const themeColors = THEME_COLORS[theme];
    
    if (themeColors) {
      // Update primary colors
      root.style.setProperty('--primary', themeColors.primary[mode]);
      root.style.setProperty('--primary-two', themeColors.secondary[mode]);
      
      // Update accent colors
      root.style.setProperty('--accent', themeColors.accent[mode]);
      
      // Update ring color (for focus states)
      root.style.setProperty('--ring', themeColors.primary[mode]);
      
      // Update sidebar colors
      root.style.setProperty('--sidebar-primary', themeColors.primary[mode]);
      root.style.setProperty('--sidebar-primary-foreground', mode === MODES.DARK ? 'oklch(0.393 0.095 152.535)' : 'oklch(0.982 0.018 155.826)');
      root.style.setProperty('--sidebar-ring', themeColors.primary[mode]);
    }
    
    // Apply dark/light mode
    if (mode === MODES.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, mode]);

  const changeTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  const changeMode = (newMode) => {
    if (Object.values(MODES).includes(newMode)) {
      setMode(newMode);
      localStorage.setItem('themeMode', newMode);
    }
  };

  const toggleMode = () => {
    const newMode = mode === MODES.LIGHT ? MODES.DARK : MODES.LIGHT;
    changeMode(newMode);
  };

  const value = {
    theme,
    mode,
    changeTheme,
    changeMode,
    toggleMode,
    isDark: mode === MODES.DARK,
    isLight: mode === MODES.LIGHT
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
