import { Box, IconButton, Typography, Chip, Tooltip } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { TestStep } from '../../interfaces/AudioTypes';

interface LevelControlProps {
  currentStep: TestStep;
  toneActive: boolean;
  onAdjustLevel: (change: number) => void;
}

const LevelControl: React.FC<LevelControlProps> = ({
  currentStep,
  toneActive,
  onAdjustLevel
}) => {
  const isDisabled = toneActive;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
        Current Level
      </Typography>
      
      <Chip 
        label={`${currentStep.currentLevel} dB HL`} 
        color="primary" 
        variant="outlined"
        size="medium"
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '1.1rem',
          width: '100px',
          height: '36px'
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Decrease Level (5dB)">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustLevel(-5)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="large"
            >
              <ArrowDownward />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Increase Level (5dB)">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustLevel(5)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="large"
            >
              <ArrowUpward />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Tooltip title="Decrease Level (10dB)">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustLevel(-10)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="small"
            >
              <ArrowDownward fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Increase Level (10dB)">
          <span>
            <IconButton 
              color="primary"
              disabled={isDisabled}
              onClick={() => onAdjustLevel(10)}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
              size="small"
            >
              <ArrowUpward fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LevelControl; 