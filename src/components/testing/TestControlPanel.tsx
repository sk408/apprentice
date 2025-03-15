import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography, Paper, Divider, Tooltip } from '@mui/material';
import { TestStep } from '../../interfaces/AudioTypes';
import LevelControl from './LevelControl';
import FrequencyControl from './FrequencyControl';
import { VolumeUp, VolumeOff, CheckCircle } from '@mui/icons-material';

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
  // Add useEffect to ensure tone is stopped if component unmounts while tone is playing
  useEffect(() => {
    // Add global mouseup event listener to ensure tone stops when mouse is released anywhere on the page
    const handleGlobalMouseUp = () => {
      if (toneActive) {
        stopTone();
      }
    };
    
    // Add the global event listener
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      // Remove global event listeners on cleanup
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
      
      // Ensure tone is stopped if component unmounts while playing
      if (toneActive) {
        stopTone();
      }
    };
  }, [toneActive, stopTone]);

  // Centralized handler for tone button to prevent unexpected behavior
  const handleToneButtonMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid text selection
    startTone();
  };

  // Touch event handler
  const handleToneButtonTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    startTone();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {/* Combined Tone Controls & Store Threshold */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}>
              {/* Tone Control Button */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                flex: 1
              }}>
                <Tooltip title={toneActive ? "Release to stop tone" : "Press and hold to present tone"}>
                  <Button
                    variant={toneActive ? "outlined" : "contained"}
                    color="primary"
                    startIcon={toneActive ? <VolumeOff /> : <VolumeUp />}
                    onMouseDown={handleToneButtonMouseDown}
                    onTouchStart={handleToneButtonTouchStart}
                    size="large"
                    sx={{ 
                      px: 3,
                      py: 1.5,
                      width: '100%',
                      maxWidth: '200px',
                      borderRadius: '28px'
                    }}
                  >
                    {toneActive ? "Stop Tone" : "Present Tone"}
                  </Button>
                </Tooltip>
              </Box>

              {/* Store Threshold Button */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                flex: 1
              }}>
                <Tooltip 
                  title={
                    !canStoreThreshold 
                      ? "More responses needed to determine threshold"
                      : "Store the current level as the threshold for this frequency"
                  }
                >
                  <span> {/* Wrap in span to make disabled tooltip work */}
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={onStoreThreshold}
                      disabled={!canStoreThreshold || toneActive}
                      sx={{ 
                        py: 1.5,
                        width: '100%',
                        maxWidth: '200px',
                        fontWeight: 'medium'
                      }}
                    >
                      Store Threshold
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Level & Frequency Controls */}
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
      </Grid>
    </Box>
  );
};

export default TestControlPanel; 