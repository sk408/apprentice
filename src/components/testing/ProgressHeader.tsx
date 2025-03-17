import { Box, LinearProgress, Typography, Paper, Chip } from '@mui/material';
import { TestStep } from '../../interfaces/AudioTypes';

interface ProgressHeaderProps {
  currentStep: TestStep;
  testProgress: number;
  thresholdCount?: number; // Optional number of thresholds stored
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ 
  currentStep, 
  testProgress,
  thresholdCount 
}) => {
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {thresholdCount !== undefined && (
              <Chip 
                label={`${thresholdCount} thresholds stored`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            )}
            <Typography variant="body2" color="text.secondary">
              {testProgress}%
            </Typography>
          </Box>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={testProgress} 
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