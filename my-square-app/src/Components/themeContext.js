//Not working as per expectation.But will work on it.
// ThemeContext provides a dark/light theme toggle across the application using React Context.
// It persists theme preference in localStorage and applies it globally to the body class.
// The component simplifies theme management and allows easy toggling between themes.

import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultState = {
  theme: 'dark',
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme; // You can also manipulate the body class for global theme styles
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
