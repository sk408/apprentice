import React from 'react';
import { Box } from '@mui/material';
import { useThemeContext } from './ThemeContext';
import logo from '../logo512.png';

interface SplashScreenProps {
  show: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ show }) => {
  const { darkMode } = useThemeContext();
  
  if (!show) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Audiometry Trainer Logo"
        sx={{
          width: '80%',
          height: '80%',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default SplashScreen; 