import React from 'react';
import { Box, LinearProgress, Typography, Paper } from '@mui/material';
import { TestStep } from '../../interfaces/AudioTypes';

interface ProgressHeaderProps {
  currentStep: TestStep;
  testProgress: number;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ currentStep, testProgress }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1 
        }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Test Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(testProgress * 100)}%
          </Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={testProgress * 100} 
          sx={{ mb: 1.5, height: 8, borderRadius: 1 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Frequency: {currentStep.frequency} Hz
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ear: {currentStep.ear === 'left' ? 'Left' : 'Right'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Level: {currentStep.currentLevel} dB HL
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProgressHeader; 