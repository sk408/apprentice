import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface ActionButtonsProps {
  canStoreThreshold: boolean;
  onStoreThreshold: () => void;
  toneActive: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  canStoreThreshold,
  onStoreThreshold,
  toneActive
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
            fullWidth
            sx={{ 
              py: 1.5,
              fontWeight: 'medium'
            }}
          >
            Store Threshold
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
};

export default ActionButtons; 