import React from 'react';
import { Box, IconButton, Typography, Chip, Tooltip } from '@mui/material';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import { TestStep } from '../../interfaces/AudioTypes';

interface FrequencyControlProps {
  currentStep: TestStep;
  toneActive: boolean;
  onAdjustFrequency: (direction: number) => void;
}

const FrequencyControl: React.FC<FrequencyControlProps> = ({
  currentStep,
  toneActive,
  onAdjustFrequency
}) => {
  const isDisabled = toneActive;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
        Current Frequency
      </Typography>
      
      <Chip 
        label={`${currentStep.frequency} Hz`} 
        color="primary" 
        variant="outlined"
        size="medium"
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '1.1rem',
          width: '120px',
          height: '36px'
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Previous Frequency">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustFrequency(-1)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="large"
            >
              <NavigateBefore />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Next Frequency">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustFrequency(1)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="large"
            >
              <NavigateNext />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {currentStep.ear === 'left' ? 'Left Ear' : 'Right Ear'}
      </Typography>
    </Box>
  );
};

export default FrequencyControl; 