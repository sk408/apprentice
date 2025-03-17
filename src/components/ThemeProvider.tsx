import { useState, useEffect, useMemo } from 'react';
import { 
  ThemeProvider as MuiThemeProvider, 
  createTheme, 
  CssBaseline 
} from '@mui/material';

// Load settings from localStorage
export const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem('audiometryTrainerSettings');
    return savedSettings ? JSON.parse(savedSettings) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  // Load settings on mount
  useEffect(() => {
    const loadAndApplySettings = () => {
      const settings = loadSettings();
      if (settings) {
        if (settings.darkMode !== undefined) {
          setDarkMode(settings.darkMode);
        }
        if (settings.highContrastMode !== undefined) {
          setHighContrastMode(settings.highContrastMode);
        }
        if (settings.fontSize !== undefined) {
          setFontSize(settings.fontSize);
        }
      }
    };

    // Initial load
    loadAndApplySettings();
    
    // Listen for storage events (when settings are changed in another tab/component)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'audiometryTrainerSettings') {
        console.log('Settings changed in another component, reloading settings');
        loadAndApplySettings();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      console.log('Settings changed in same tab, reloading settings');
      loadAndApplySettings();
    };
    
    window.addEventListener('audiometrySettingsChanged', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('audiometrySettingsChanged', handleCustomStorageChange);
    };
  }, []);

  // Create theme based on settings
  const appTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: highContrastMode ? '#0066cc' : '#2196f3',
          },
          secondary: {
            main: highContrastMode ? '#cc0066' : '#f50057',
          },
          contrastThreshold: highContrastMode ? 4.5 : 3,
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: fontSize === 'small' ? 14 : fontSize === 'large' ? 16 : 15,
          h1: {
            fontWeight: 500,
          },
          h2: {
            fontWeight: 500,
          },
          h3: {
            fontWeight: 500,
          },
          h4: {
            fontWeight: 500,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              rounded: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [darkMode, highContrastMode, fontSize]
  );

  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default CustomThemeProvider; 