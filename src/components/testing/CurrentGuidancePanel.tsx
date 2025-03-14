import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Alert,
  Chip
} from '@mui/material';
import { Check, Clear } from '@mui/icons-material';

interface CurrentGuidancePanelProps {
  currentGuidance: string;
  suggestedAction: string | null;
  showResponseIndicator: boolean;
  patientResponse: boolean | null; 
  canStoreThreshold: boolean;
  onStoreThreshold: () => void;
  onSuggestedAction: () => void;
  startTone?: () => void;
  stopTone?: () => void;
}

const CurrentGuidancePanel: React.FC<CurrentGuidancePanelProps> = ({
  currentGuidance,
  suggestedAction,
  showResponseIndicator,
  patientResponse,
  canStoreThreshold,
  onStoreThreshold,
  onSuggestedAction,
  startTone,
  stopTone
}) => {
  const handleSuggestedAction = (action: string) => {
    if (action === 'present') {
      // For 'present' action, we don't call onSuggestedAction here
      // This is now handled by separate mouse events
      return;
    } else {
      // For all other actions, execute the action
      onSuggestedAction();
    }
  };

  const handleMouseDown = () => {
    if (suggestedAction === 'present' && startTone) {
      startTone();
    }
  };

  const handleMouseUp = () => {
    if (suggestedAction === 'present' && stopTone) {
      stopTone();
      // Call onSuggestedAction after the tone is stopped
      onSuggestedAction();
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 2, 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Response Indicator */}
      {showResponseIndicator && patientResponse !== null && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            p: 1.5,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Chip
            icon={patientResponse ? <Check /> : <Clear />}
            label={patientResponse ? "Heard" : "Not Heard"}
            color={patientResponse ? "success" : "warning"}
            variant="filled"
            size="small"
          />
        </Box>
      )}
      
      {/* Guidance Content */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
          {currentGuidance}
        </Typography>
      </Box>
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {canStoreThreshold && (
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={onStoreThreshold}
            size="small"
          >
            Store Threshold
          </Button>
        )}
        
        {suggestedAction && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleSuggestedAction(suggestedAction)}
            onMouseDown={suggestedAction === 'present' ? handleMouseDown : undefined}
            onMouseUp={suggestedAction === 'present' ? handleMouseUp : undefined}
            onMouseLeave={suggestedAction === 'present' ? handleMouseUp : undefined}
            onTouchStart={suggestedAction === 'present' ? handleMouseDown : undefined}
            onTouchEnd={suggestedAction === 'present' ? handleMouseUp : undefined}
            size="small"
          >
            {getSuggestedActionLabel(suggestedAction)}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

// Helper to convert action keys to user-friendly labels
function getSuggestedActionLabel(action: string): string {
  switch (action) {
    case 'present':
      return 'Present Tone';
    case 'increase':
      return 'Increase Level';
    case 'decrease':
      return 'Decrease Level';
    case 'store_threshold':
      return 'Store Threshold';
    case 'next':
      return 'Next Frequency';
    default:
      return 'Continue';
  }
}

export default CurrentGuidancePanel; 