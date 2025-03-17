import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout; 