import React from 'react';
import { Box, Grid, Button, Typography, Paper, Divider } from '@mui/material';
import { TestStep } from '../../interfaces/AudioTypes';
import LevelControl from './LevelControl';
import FrequencyControl from './FrequencyControl';
import ToneControl from './ToneControl';
import ActionButtons from './ActionButtons';

interface TestControlPanelProps {
  currentStep: TestStep;
  toneActive: boolean;
  onAdjustLevel: (change: number) => void;
  onAdjustFrequency: (direction: number) => void;
  startTone: () => void;
  stopTone: () => void;
  canStoreThreshold: boolean;
  onStoreThreshold: () => void;
}

const TestControlPanel: React.FC<TestControlPanelProps> = ({
  currentStep,
  toneActive,
  onAdjustLevel,
  onAdjustFrequency,
  startTone,
  stopTone,
  canStoreThreshold,
  onStoreThreshold
}) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {/* Tone Control */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Tone Control
            </Typography>
            <ToneControl 
              toneActive={toneActive}
              startTone={startTone}
              stopTone={stopTone}
            />
          </Paper>
        </Grid>
        
        {/* Level Control */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Level Control
            </Typography>
            <LevelControl 
              currentStep={currentStep}
              toneActive={toneActive}
              onAdjustLevel={onAdjustLevel}
            />
          </Paper>
        </Grid>
        
        {/* Frequency Control */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Frequency Control
            </Typography>
            <FrequencyControl 
              currentStep={currentStep}
              toneActive={toneActive}
              onAdjustFrequency={onAdjustFrequency}
            />
          </Paper>
        </Grid>
        
        {/* Action Buttons */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Actions
            </Typography>
            <ActionButtons 
              canStoreThreshold={canStoreThreshold}
              onStoreThreshold={onStoreThreshold}
              toneActive={toneActive}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestControlPanel; 