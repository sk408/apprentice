import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Divider,
  Avatar,
  Chip,
  Card,
  Stack
} from '@mui/material';
import { 
  VolumeUp, 
  Hearing, 
  HearingDisabled,
  Person 
} from '@mui/icons-material';
import { HearingProfile } from '../../interfaces/AudioTypes';

interface PatientResponsePanelProps {
  patient: HearingProfile;
  patientResponse: boolean | null;
  toneActive: boolean;
  showResponseIndicator: boolean;
  onPatientResponse: (response: boolean) => void;
}

const PatientResponsePanel: React.FC<PatientResponsePanelProps> = ({
  patient,
  patientResponse,
  toneActive,
  showResponseIndicator,
  onPatientResponse
}) => {
  return (
    <Box>
      <Card sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h6">{patient.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {patient.id.slice(0, 8)}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Patient Status
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip 
            icon={toneActive ? <VolumeUp /> : <HearingDisabled />} 
            label={toneActive ? "Tone Playing" : "No Tone"} 
            color={toneActive ? "primary" : "default"}
            variant={toneActive ? "filled" : "outlined"}
            size="small"
          />
          
          {showResponseIndicator && patientResponse !== null && (
            <Chip 
              icon={patientResponse ? <Hearing /> : <HearingDisabled />} 
              label={patientResponse ? "Heard" : "Not Heard"} 
              color={patientResponse ? "success" : "warning"}
              variant="filled"
              size="small"
            />
          )}
        </Stack>
      </Card>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #f5f5f5, #fff)'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Record Patient Response
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Click the appropriate button when the patient indicates whether they heard the tone
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<Hearing />}
            onClick={() => onPatientResponse(true)}
            disabled={!toneActive && !showResponseIndicator}
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Heard
          </Button>
          
          <Button
            variant="outlined"
            color="warning"
            size="large"
            startIcon={<HearingDisabled />}
            onClick={() => onPatientResponse(false)}
            disabled={!toneActive && !showResponseIndicator}
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Not Heard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientResponsePanel; 