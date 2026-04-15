import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const useThemeController = () => useContext(ThemeContext);