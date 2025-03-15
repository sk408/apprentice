import React from 'react';
import { Box, Button, Typography, LinearProgress, Tooltip } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

interface ToneControlProps {
  toneActive: boolean;
  startTone: () => void;
  stopTone: () => void;
}

const ToneControl: React.FC<ToneControlProps> = ({
  toneActive,
  startTone,
  stopTone
}) => {
  return (
    <Box sx={{ textAlign: 'center', py: 1 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2 
        }}
      >
        {/* Visual indicator that tone is being presented */}
        {toneActive && (
          <Box sx={{ width: '100%', mb: 1 }}>
            <LinearProgress 
              color="primary" 
              sx={{ 
                height: 8, 
                borderRadius: 1,
                '& .MuiLinearProgress-bar': {
                  animationDuration: '1s'
                }
              }} 
            />
          </Box>
        )}
        
        <Typography 
          variant="body2" 
          color={toneActive ? 'primary.main' : 'text.secondary'}
          fontWeight={toneActive ? 'bold' : 'normal'}
        >
          {toneActive ? 'Tone is playing...' : 'Ready to present tone'}
        </Typography>
        
        <Box>
          {!toneActive ? (
            <Tooltip title="Press spacebar to present tone">
              <Button
                variant="contained"
                color="primary"
                startIcon={<VolumeUp />}
                onClick={startTone}
                onTouchStart={startTone} // Better touch response
                onMouseDown={startTone} // Alternative for mouse
                size="large"
                sx={{ 
                  px: 3,
                  py: 1.5,
                  minWidth: '200px',
                  borderRadius: '28px'
                }}
              >
                Present Tone
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Release to stop tone">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<VolumeOff />}
                onClick={stopTone}
                onTouchEnd={stopTone} // Better touch response
                onMouseUp={stopTone} // Alternative for mouse
                size="large"
                sx={{ 
                  px: 3,
                  py: 1.5,
                  minWidth: '200px',
                  borderRadius: '28px'
                }}
              >
                Stop Tone
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ToneControl; 