import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from '@mui/material';
import { REMStepProps } from './StepTypes';
import REMChart from '../../../components/REMChart';
import MeasurementLegend from '../MeasurementLegend';

/**
 * Step 6: Compare to Target
 * This component allows generating and comparing to prescription targets
 */
const TargetComparisonStep: React.FC<REMStepProps> = ({
  prescriptionMethod,
  setPrescriptionMethod,
  generateTargets,
  allMeasurements,
  currentTarget
}) => {
  
  // Handle prescription method change
  const handlePrescriptionMethodChange = (event: SelectChangeEvent) => {
    setPrescriptionMethod(event.target.value as 'NAL-NL2' | 'DSL' | 'NAL-NL1' | 'custom');
  };
  
  return (
    <Box>
      <Typography variant="h6">Compare to Target</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Prescription Method</InputLabel>
              <Select
                value={prescriptionMethod}
                onChange={handlePrescriptionMethodChange}
                label="Prescription Method"
              >
                <MenuItem value="NAL-NL2">NAL-NL2</MenuItem>
                <MenuItem value="DSL">DSL v5.0</MenuItem>
                <MenuItem value="NAL-NL1">NAL-NL1</MenuItem>
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="contained"
              color="primary"
              onClick={generateTargets}
              sx={{ mt: 1 }}
            >
              Generate Targets
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              About {prescriptionMethod}
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              {prescriptionMethod === 'NAL-NL2' && (
                <Typography variant="body2">
                  NAL-NL2 is the second-generation nonlinear prescription procedure from NAL. 
                  It aims to maximize speech intelligibility while maintaining comfortable loudness.
                </Typography>
              )}
              {prescriptionMethod === 'DSL' && (
                <Typography variant="body2">
                  DSL v5.0 is designed to provide audibility of speech across a wide range of inputs,
                  with special considerations for pediatric fittings.
                </Typography>
              )}
              {prescriptionMethod === 'NAL-NL1' && (
                <Typography variant="body2">
                  NAL-NL1 is the first-generation nonlinear prescription procedure from NAL.
                  It focuses on speech intelligibility with less emphasis on loudness normalization.
                </Typography>
              )}
              {prescriptionMethod === 'custom' && (
                <Typography variant="body2">
                  Custom targets allow for manual specification of desired gain at each frequency.
                  This is useful for experienced clinicians with specific fitting goals.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
        
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

export default TargetComparisonStep; 