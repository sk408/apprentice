import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useThemeContext } from './ThemeContext';

const TestSettings: React.FC = () => {
  const { 
    includeAirConduction, 
    setIncludeAirConduction,
    includeBoneConduction,
    setIncludeBoneConduction
  } = useThemeContext();

  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Test Settings</Typography>
      
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Test Types</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                checked={includeAirConduction} 
                onChange={(e) => setIncludeAirConduction(e.target.checked)}
              />
            }
            label="Air Conduction"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={includeBoneConduction} 
                onChange={(e) => setIncludeBoneConduction(e.target.checked)}
              />
            }
            label="Bone Conduction"
          />
        </FormGroup>
      </FormControl>
      
      {/* Other settings can be added here */}
      
    </Box>
  );
};

export default TestSettings; 