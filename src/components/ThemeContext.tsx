import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadSettings } from './ThemeProvider';

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  highContrastMode: boolean;
  setHighContrastMode: (mode: boolean) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  includeAirConduction: boolean;
  setIncludeAirConduction: (include: boolean) => void;
  includeBoneConduction: boolean;
  setIncludeBoneConduction: (include: boolean) => void;
}

const defaultContext: ThemeContextProps = {
  darkMode: false,
  setDarkMode: () => {},
  highContrastMode: false,
  setHighContrastMode: () => {},
  fontSize: 'medium',
  setFontSize: () => {},
  includeAirConduction: true,
  setIncludeAirConduction: () => {},
  includeBoneConduction: true,
  setIncludeBoneConduction: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultContext);

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState(false);
  const [highContrastMode, setHighContrastModeState] = useState(false);
  const [fontSize, setFontSizeState] = useState('medium');
  const [includeAirConduction, setIncludeAirConductionState] = useState(true);
  const [includeBoneConduction, setIncludeBoneConductionState] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const settings = loadSettings();
    if (settings) {
      if (settings.darkMode !== undefined) {
        setDarkModeState(settings.darkMode);
      }
      if (settings.highContrastMode !== undefined) {
        setHighContrastModeState(settings.highContrastMode);
      }
      if (settings.fontSize !== undefined) {
        setFontSizeState(settings.fontSize);
      }
      if (settings.includeAirConduction !== undefined) {
        setIncludeAirConductionState(settings.includeAirConduction);
      }
      if (settings.includeBoneConduction !== undefined) {
        setIncludeBoneConductionState(settings.includeBoneConduction);
      }
    }
  }, []);

  // Wrapper functions to update settings in localStorage
  const setDarkMode = (mode: boolean) => {
    setDarkModeState(mode);
    updateSettings('darkMode', mode);
  };

  const setHighContrastMode = (mode: boolean) => {
    setHighContrastModeState(mode);
    updateSettings('highContrastMode', mode);
  };

  const setFontSize = (size: string) => {
    setFontSizeState(size);
    updateSettings('fontSize', size);
  };

  const setIncludeAirConduction = (include: boolean) => {
    setIncludeAirConductionState(include);
    updateSettings('includeAirConduction', include);
  };

  const setIncludeBoneConduction = (include: boolean) => {
    setIncludeBoneConductionState(include);
    updateSettings('includeBoneConduction', include);
  };

  // Helper function to update settings in localStorage
  const updateSettings = (key: string, value: any) => {
    try {
      const settings = loadSettings() || {};
      settings[key] = value;
      localStorage.setItem('audiometryTrainerSettings', JSON.stringify(settings));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('audiometrySettingsChanged'));
    } catch (error) {
      console.error(`Error saving ${key} setting:`, error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        highContrastMode,
        setHighContrastMode,
        fontSize,
        setFontSize,
        includeAirConduction,
        setIncludeAirConduction,
        includeBoneConduction,
        setIncludeBoneConduction,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider; 