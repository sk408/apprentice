import React from 'react';
import { Box } from '@mui/material';

// Tab panel interface
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TabPanel component
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`testing-tabpanel-${index}`}
      aria-labelledby={`testing-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Function for tab accessibility props
export function a11yProps(index: number) {
  return {
    id: `testing-tab-${index}`,
    'aria-controls': `testing-tabpanel-${index}`,
  };
}

export default TabPanel; 