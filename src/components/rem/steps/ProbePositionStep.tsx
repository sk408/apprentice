import {
  Box,
  Typography,
  Paper,
  Slider,
  Button,
  Tooltip,
  IconButton,
  Alert
} from '@mui/material';
import { Info } from '@mui/icons-material';
import { REMStepProps } from './StepTypes';
import { ProbePosition } from '../../../interfaces/RealEarMeasurementTypes';

/**
 * Step 1: Position Probe Tube
 * This component allows adjusting and checking the probe tube position
 */
const ProbePositionStep: React.FC<REMStepProps> = ({
  probeTubeDepth,
  setProbeTubeDepth,
  probePosition,
  handlePositionProbeTube
}) => {
  return (
    <Box>
      <Typography variant="h6">Position Probe Tube</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <Typography gutterBottom>
          Adjust probe tube depth (mm). The correct insertion depth is between 20mm and 30mm.
        </Typography>
        <Slider
          value={probeTubeDepth}
          onChange={(e, newValue) => setProbeTubeDepth(newValue as number)}
          step={1}
          marks={[
            { value: 0, label: '0mm' },
            { value: 10, label: '10mm' },
            { value: 20, label: '20mm (min)' },
            { value: 30, label: '30mm (max)' },
            { value: 40, label: '40mm' }
          ]}
          min={0}
          max={40}
          valueLabelDisplay="on"
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePositionProbeTube}
          >
            Check Position
          </Button>
          
          <Tooltip title="Correct position is typically 25-28mm from the tragus.">
            <IconButton>
              <Info />
            </IconButton>
          </Tooltip>
        </Box>
        
        {probePosition !== ProbePosition.NOT_INSERTED && (
          <Alert 
            severity={probePosition === ProbePosition.CORRECT ? "success" : "error"}
            sx={{ mt: 2 }}
          >
            Probe position: {probePosition.replace('_', ' ')}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default ProbePositionStep; 