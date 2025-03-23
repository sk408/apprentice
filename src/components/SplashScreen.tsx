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
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Audiometry Trainer Logo"
        sx={{
          width: '95%',
          height: '95%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default SplashScreen; 