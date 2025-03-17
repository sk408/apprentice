import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from '@mui/material';
import { REMStepProps } from './StepTypes';
import { SAMPLE_PATIENTS } from '../../../constants/REMConstants';

/**
 * Step 0: Setup Equipment
 * This component allows selecting the patient, hearing aid, and ear
 */
const SetupStep: React.FC<REMStepProps> = ({
  selectedPatient,
  setSelectedPatient,
  selectedHearingAid,
  setSelectedHearingAid,
  hearingAids,
  selectedEar,
  setSelectedEar,
  startNewSession
}) => {
  
  // Handle select changes
  const handlePatientChange = (event: SelectChangeEvent) => {
    setSelectedPatient(event.target.value);
  };
  
  const handleHearingAidChange = (event: SelectChangeEvent) => {
    setSelectedHearingAid(event.target.value);
  };
  
  const handleEarChange = (event: SelectChangeEvent) => {
    setSelectedEar(event.target.value as 'left' | 'right');
  };
  
  return (
    <Box>
      <Typography variant="h6">Setup Equipment</Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Patient</InputLabel>
            <Select
              value={selectedPatient}
              onChange={handlePatientChange}
              label="Select Patient"
            >
              {SAMPLE_PATIENTS.map(patient => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.name} - {patient.age} y/o - {patient.hearingLoss}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Hearing Aid</InputLabel>
            <Select
              value={selectedHearingAid}
              onChange={handleHearingAidChange}
              label="Select Hearing Aid"
            >
              {hearingAids.map(aid => (
                <MenuItem key={aid.id} value={aid.id}>
                  {aid.manufacturer} {aid.name} ({aid.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Ear</InputLabel>
            <Select
              value={selectedEar}
              onChange={handleEarChange}
              label="Select Ear"
            >
              <MenuItem value="left">Left Ear</MenuItem>
              <MenuItem value="right">Right Ear</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={startNewSession}
            disabled={!selectedPatient || !selectedHearingAid}
          >
            Initialize Setup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetupStep; 