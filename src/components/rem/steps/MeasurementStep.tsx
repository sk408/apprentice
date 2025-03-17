import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Alert,
  CircularProgress,
  SelectChangeEvent
} from '@mui/material';
import { PlayArrow, Stop } from '@mui/icons-material';
import { REMStepProps } from './StepTypes';
import { ProbePosition, VentType, REMLevel } from '../../../interfaces/RealEarMeasurementTypes';
import REMChart from '../../../components/REMChart';
import MeasurementLegend from '../MeasurementLegend';

/**
 * Steps 2-4: Measurement steps (REUR, REOR, REAR)
 * This component handles all three measurement types
 */
const MeasurementStep: React.FC<REMStepProps> = ({
  activeStep,
  measurementType,
  setMeasurementType,
  signalType,
  setSignalType,
  inputLevel,
  setInputLevel,
  isPlaying,
  playTestSignal,
  stopTestSignal,
  performMeasurement,
  isLoading,
  probePosition,
  allMeasurements,
  currentTarget,
  selectedVentType,
  setSelectedVentType
}) => {
  
  // Handle changes
  const handleMeasurementTypeChange = (event: SelectChangeEvent) => {
    setMeasurementType(event.target.value as any);
  };
  
  const handleSignalTypeChange = (event: SelectChangeEvent) => {
    setSignalType(event.target.value as any);
  };
  
  const handleInputLevelChange = (event: Event, newValue: number | number[]) => {
    // Cast to the closest valid REMLevel value
    const numValue = Array.isArray(newValue) ? newValue[0] : newValue;
    const validLevels: REMLevel[] = [50, 55, 60, 65, 70, 75, 80, 85, 90];
    
    // Find the closest valid level
    const closestLevel = validLevels.reduce((prev, curr) => 
      Math.abs(curr - numValue) < Math.abs(prev - numValue) ? curr : prev
    );
    
    setInputLevel(closestLevel);
  };
  
  const handleVentTypeChange = (event: SelectChangeEvent) => {
    setSelectedVentType(event.target.value as VentType);
  };
  
  return (
    <Box>
      <Typography variant="h6">{measurementType} Measurement</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Measurement Type</InputLabel>
              <Select
                value={measurementType}
                onChange={handleMeasurementTypeChange}
                label="Measurement Type"
              >
                <MenuItem value="REUR">REUR - Real Ear Unaided Response</MenuItem>
                <MenuItem value="REOR">REOR - Real Ear Occluded Response</MenuItem>
                <MenuItem value="REAR">REAR - Real Ear Aided Response</MenuItem>
                <MenuItem value="REIG">REIG - Real Ear Insertion Gain</MenuItem>
                <MenuItem value="RECD">RECD - Real Ear to Coupler Difference</MenuItem>
                <MenuItem value="RESR">RESR - Real Ear Saturation Response</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Signal Type</InputLabel>
              <Select
                value={signalType}
                onChange={handleSignalTypeChange}
                label="Signal Type"
              >
                <MenuItem value="pure_tone_sweep">Pure Tone Sweep</MenuItem>
                <MenuItem value="speech_noise">Speech Noise</MenuItem>
                <MenuItem value="pink_noise">Pink Noise</MenuItem>
                <MenuItem value="white_noise">White Noise</MenuItem>
                <MenuItem value="ISTS_noise">ISTS Noise</MenuItem>
              </Select>
            </FormControl>
            
            <Typography gutterBottom>Input Level (dB SPL)</Typography>
            <Slider
              value={inputLevel}
              onChange={handleInputLevelChange}
              step={5}
              marks
              min={50}
              max={90}
              valueLabelDisplay="on"
            />
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={isPlaying ? <Stop /> : <PlayArrow />}
                onClick={isPlaying ? stopTestSignal : playTestSignal}
              >
                {isPlaying ? 'Stop Signal' : 'Play Signal'}
              </Button>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={performMeasurement}
                disabled={isLoading || probePosition !== ProbePosition.CORRECT}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Measuring...
                  </>
                ) : (
                  'Run Measurement'
                )}
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Information about {measurementType}
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              {measurementType === 'REUR' && (
                <>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Real Ear Unaided Response measures the natural resonance of the ear canal without a hearing aid. 
                    This is an important baseline measurement.
                  </Typography>
                  <Alert severity="info" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Tips for proper REUR response:</strong>
                    </Typography>
                    <Typography variant="body2" component="div">
                      <ul>
                        <li>The resonance peak should be around 2.7kHz-3kHz</li>
                        <li>The 6kHz response should not drop below 0 dB</li>
                        <li>Typical gain at peak should be around 10-15 dB</li>
                        <li>The response should be smooth without sharp peaks or valleys</li>
                      </ul>
                    </Typography>
                  </Alert>
                </>
              )}
              {measurementType === 'REOR' && (
                <>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Real Ear Occluded Response measures the response with the hearing aid in place but turned off. 
                    This shows the impact of blocking the ear canal.
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Dome/Earmold Vent Type</InputLabel>
                    <Select
                      value={selectedVentType}
                      onChange={handleVentTypeChange}
                      label="Dome/Earmold Vent Type"
                    >
                      <MenuItem value={VentType.OCCLUDED}>Occluded (No Vent)</MenuItem>
                      <MenuItem value={VentType.SMALL_VENT}>Small Vent</MenuItem>
                      <MenuItem value={VentType.MEDIUM_VENT}>Medium Vent</MenuItem>
                      <MenuItem value={VentType.LARGE_VENT}>Large Vent</MenuItem>
                      <MenuItem value={VentType.OPEN_DOME}>Open Dome</MenuItem>
                    </Select>
                  </FormControl>
                  <Alert severity="info">
                    <Typography variant="body2">
                      Vent size affects the sound pressure at the ear drum. More open fittings (larger vents) will 
                      result in a response closer to REUR, while more closed fittings will show greater occlusion 
                      effect at low frequencies and more high-frequency attenuation.
                    </Typography>
                  </Alert>
                </>
              )}
              {measurementType === 'REAR' && (
                <Typography variant="body2">
                  Real Ear Aided Response measures the response with the hearing aid in place and turned on. 
                  This is compared with targets to verify the fitting.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Measurement Results</Typography>
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
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

export default MeasurementStep; 