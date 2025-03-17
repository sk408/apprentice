import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Alert
} from '@mui/material';
import { REMStepProps } from './StepTypes';
import REMChart from '../../../components/REMChart';
import MeasurementLegend from '../MeasurementLegend';
import { REM_FREQUENCIES } from '../../../constants/REMConstants';

/**
 * Step 7: Adjust Frequency Response
 * This component allows adjusting the REAR response to match the target
 */
const AdjustmentStep: React.FC<REMStepProps> = ({
  adjustedREAR,
  allMeasurements,
  currentTarget,
  session,
  matchAccuracy,
  adjustmentFeedback,
  adjustGainAtFrequency,
  checkTargetMatch,
  resetAdjustments,
  setSuccess,
  setSession
}) => {
  // Find REIG target if available
  const reigTarget = session?.targets.find(t => t.type === 'REIG') || null;
  
  return (
    <Box>
      <Typography variant="h6">Adjust Frequency Response</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <Typography gutterBottom>
          Adjust the REAR response to match the target by using the up and down buttons for each frequency.
          These adjustments simulate the process of fine-tuning a hearing aid's frequency response.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          You should adjust the REAR response to match the REAR target (dotted line). This represents the ideal response needed to achieve the prescribed amplification for the patient.
        </Alert>
        
        <Box sx={{ mt: 3, width: '100%', overflowX: 'auto' }}>
          <REMChart 
            measurements={
              adjustedREAR 
                ? [...allMeasurements.filter(m => m.type !== 'REAR'), adjustedREAR] 
                : allMeasurements
            }
            target={reigTarget || currentTarget}
            height={300}
            width={window.innerWidth < 600 ? window.innerWidth - 50 : 700}
          />
        </Box>
        
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
          Adjust Gain at Each Frequency (dB)
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)', lg: 'repeat(11, 1fr)' }, 
            gap: 2,
            mb: 3
          }}
        >
          {REM_FREQUENCIES.map((freq) => {
            const currentGain = adjustedREAR?.measurementPoints.find(p => p.frequency === freq)?.gain || 0;
            
            return (
              <Box key={freq} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" fontWeight="bold">
                  {freq} Hz
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => adjustGainAtFrequency(freq, 1)}
                  >
                    <Box sx={{ fontSize: '1.5rem' }}>↑</Box>
                  </IconButton>
                  
                  <Typography variant="body1" fontWeight="bold">
                    {currentGain.toFixed(1)}
                  </Typography>
                  
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => adjustGainAtFrequency(freq, -1)}
                  >
                    <Box sx={{ fontSize: '1.5rem' }}>↓</Box>
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={checkTargetMatch}
            disabled={!adjustedREAR}
          >
            Check Target Match
          </Button>
          
          <Button
            variant="outlined"
            onClick={resetAdjustments}
            disabled={!adjustedREAR}
          >
            Reset Adjustments
          </Button>
          
          {matchAccuracy !== null && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setSuccess("REM procedure completed successfully!");
                if (session) {
                  // Save adjusted REAR to session and mark as completed
                  const updatedMeasurements = [...allMeasurements.filter(m => m.type !== 'REAR')];
                  if (adjustedREAR) {
                    updatedMeasurements.push(adjustedREAR);
                  }
                  
                  const updatedSession = {
                    ...session, 
                    completed: true,
                    measurements: updatedMeasurements,
                    accuracy: matchAccuracy || 0
                  };
                  setSession(updatedSession);
                }
              }}
            >
              Complete REM Procedure
            </Button>
          )}
        </Box>
        
        {adjustmentFeedback && (
          <Alert 
            severity={matchAccuracy && matchAccuracy >= 80 ? "success" : matchAccuracy && matchAccuracy >= 70 ? "info" : "warning"} 
            sx={{ mt: 3 }}
          >
            {adjustmentFeedback}
            {matchAccuracy !== null && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Accuracy score: {matchAccuracy.toFixed(1)}%
              </Typography>
            )}
          </Alert>
        )}
        
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Clinical best practices for target matching:</Typography>
          <ul>
            <li>Speech frequencies (1000-4000 Hz) should be within ±3 dB of target</li>
            <li>Low frequencies (125-750 Hz) should be within ±5 dB of target</li>
            <li>High frequencies (6000-8000 Hz) should be within ±8 dB of target</li>
            <li>Overall RMS difference should be less than 5 dB for an optimal fit</li>
          </ul>
        </Alert>
      </Paper>
    </Box>
  );
};

export default AdjustmentStep; 