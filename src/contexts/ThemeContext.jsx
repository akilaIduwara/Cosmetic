import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const savedTheme = localStorage.getItem('kevina_theme');
        const initialTheme = savedTheme || 'light';
        // Initialize immediately
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', initialTheme);
        }
        return initialTheme;
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
    return 'light';
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        localStorage.setItem('kevina_theme', theme);
        if (document.documentElement) {
          document.documentElement.setAttribute('data-theme', theme);
        }
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

