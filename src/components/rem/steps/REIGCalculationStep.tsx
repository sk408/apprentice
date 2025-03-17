import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import { REMStepProps } from './StepTypes';
import REMChart from '../../../components/REMChart';
import MeasurementLegend from '../MeasurementLegend';

/**
 * Step 5: REIG Calculation
 * This component calculates the Real Ear Insertion Gain from REAR and REUR
 */
const REIGCalculationStep: React.FC<REMStepProps> = ({
  performMeasurement,
  isLoading,
  allMeasurements,
  currentTarget
}) => {
  return (
    <Box>
      <Typography variant="h6">REIG Calculation</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <Typography gutterBottom>
          Real Ear Insertion Gain (REIG) is calculated as the difference between REAR and REUR.
          This shows the actual gain provided by the hearing aid in the patient's ear.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={performMeasurement}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Calculating...
            </>
          ) : (
            'Calculate REIG'
          )}
        </Button>
        
        <Box sx={{ mt: 3, width: '100%', overflowX: 'auto' }}>
          <REMChart 
            measurements={allMeasurements.length > 0 ? allMeasurements : null}
            target={currentTarget}
            height={300}
            width={window.innerWidth < 600 ? window.innerWidth - 50 : 700}
          />
        </Box>
        
        {allMeasurements.length > 0 && <MeasurementLegend measurements={allMeasurements} />}
      </Paper>
    </Box>
  );
};

export default REIGCalculationStep; 