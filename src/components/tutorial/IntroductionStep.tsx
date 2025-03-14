import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Divider
} from '@mui/material';
import { 
  VolumeUp, 
  Info,
  Hearing,
  MusicNote,
  Settings,
  HeadsetMic,
  Room
} from '@mui/icons-material';
import audioService from '../../services/AudioService';
import { Frequency } from '../../interfaces/AudioTypes';
import audiogramImage from '../../assets/audiogram_sample.png';

const IntroductionStep: React.FC = () => {
  const theme = useTheme();
  const [playingTone, setPlayingTone] = useState<number | null>(null);

  const handlePlayTone = (frequency: Frequency) => {
    if (playingTone === frequency) {
      audioService.stopTone();
      setPlayingTone(null);
    } else {
      if (playingTone !== null) {
        audioService.stopTone();
      }
      audioService.playTone(frequency, 60, 'right', 2000);
      setPlayingTone(frequency);
      setTimeout(() => {
        setPlayingTone(null);
      }, 2000);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography paragraph>
        Pure Tone Audiometry (PTA) is the gold standard for measuring hearing sensitivity. 
        It uses pure tones of different frequencies to determine the softest sounds a person 
        can hear at each frequency. This test helps audiologists diagnose hearing loss and 
        determine appropriate interventions.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              What are Pure Tones?
            </Typography>
            <Typography paragraph>
              Pure tones are sounds with a single frequency (pitch) and no harmonics. 
              They sound like simple beeps or whistles.
            </Typography>
            <Typography paragraph>
              Try clicking the buttons below to hear different frequencies:
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              {[250, 1000, 4000, 8000].map((freq) => (
                <Tooltip key={freq} title={`${freq}Hz`}>
                  <IconButton
                    onClick={() => handlePlayTone(freq as Frequency)}
                    sx={{
                      bgcolor: playingTone === freq ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      border: `1px solid ${theme.palette.primary.main}`,
                      p: 1.5,
                    }}
                  >
                    <VolumeUp color="primary" />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {freq}Hz
                    </Typography>
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Notice how the pitch increases with higher frequencies. The standard test frequencies 
              are 250, 500, 1000, 2000, 4000, and 8000 Hz.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Hearing Loss Classification
            </Typography>
            <Typography paragraph>
              Hearing loss is classified based on the degree of hearing threshold elevation:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.success.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Normal Hearing" 
                  secondary="-10 to 20 dB HL" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.info.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Mild Hearing Loss" 
                  secondary="21 to 40 dB HL" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.warning.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Moderate Hearing Loss" 
                  secondary="41 to 55 dB HL" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.warning.dark }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Moderately Severe Hearing Loss" 
                  secondary="56 to 70 dB HL" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.error.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Severe Hearing Loss" 
                  secondary="71 to 90 dB HL" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Hearing sx={{ color: theme.palette.error.dark }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Profound Hearing Loss" 
                  secondary="91+ dB HL" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Conducting the Test
        </Typography>
        <Typography paragraph>
          Pure tone audiometry involves presenting tones across a range of frequencies and intensities 
          to determine the softest level at which a patient can hear each frequency. This is known as 
          the hearing threshold. This test is essential for fitting hearing aids as it helps determine 
          the degree and type of hearing loss.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Pro Tip:</Typography>
          <Typography variant="body2">
            Ensure the patient is seated comfortably and understands the test procedure. Explain that they 
            should press the response button whenever they hear a tone, no matter how faint it may be.
          </Typography>
        </Alert>
      </Box>

      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Test Preparation and Setup
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Room color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Testing Environment</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Sound Booth Requirements:</strong>
            </Typography>
            <List dense disablePadding>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Background noise levels below ANSI standards</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Proper lighting for patient observation</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Temperature control for patient comfort</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Minimal visual distractions</Typography>
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
              Testing without a sound booth will compromise reliability, especially at lower intensities.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HeadsetMic color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Equipment Setup</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Before Each Patient:</strong>
            </Typography>
            <List dense disablePadding>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Perform daily biological calibration check</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Clean headphones and response button</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Ensure headphone cords are untangled</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Verify transducers are functioning properly</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Set up patient forms and audiogram</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Settings color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Patient Preparation</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Patient Instructions:</strong>
            </Typography>
            <List dense disablePadding>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Explain the test procedure clearly</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Demonstrate the response method</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Instruct to respond to very faint sounds</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Position patient facing away from equipment</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Expected test duration: 20-30 minutes</Typography>
              </ListItem>
              <ListItem sx={{ py: 0.5 }}>
                <Typography variant="body2">• Ensure patient is comfortable and relaxed</Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Important Note:</strong> Always check for cerumen (earwax) blockage before testing. Excessive cerumen can cause temporary conductive hearing loss and lead to inaccurate results.
        </Typography>
      </Alert>
    </Box>
  );
};

export default IntroductionStep;