import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Alert,
  Divider,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  VolumeUp, 
  Info,
  ArrowDownward,
  ArrowUpward
} from '@mui/icons-material';
import audiogramImage from '../../assets/audiogram_sample.png';
import audioService from '../../services/AudioService';
import { Frequency } from '../../interfaces/AudioTypes';

const AudiogramStep: React.FC = () => {
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

  // Sample audiogram symbols
  const symbols = [
    { name: 'Right Ear (Air)', symbol: 'O', color: 'rgb(255, 0, 0)' },
    { name: 'Left Ear (Air)', symbol: 'X', color: 'rgb(0, 0, 255)' },
    { name: 'Right Ear (Bone)', symbol: '<', color: 'rgb(255, 0, 0)' },
    { name: 'Left Ear (Bone)', symbol: '>', color: 'rgb(0, 0, 255)' },
    { name: 'No Response Right', symbol: '↓', color: 'rgb(255, 0, 0)' },
    { name: 'No Response Left', symbol: '↓', color: 'rgb(0, 0, 255)' },
    { name: 'Masked Right', symbol: '[O]', color: 'rgb(255, 0, 0)' },
    { name: 'Masked Left', symbol: '[X]', color: 'rgb(0, 0, 255)' },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography paragraph>
        The audiogram is the standard tool for documenting hearing thresholds. 
        Understanding how to read and interpret an audiogram is a fundamental 
        skill for audiologists and hearing healthcare professionals. This step 
        will guide you through the basics of audiogram interpretation.
      </Typography>
      
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={audiogramImage}
          alt="Sample Audiogram"
          sx={{ 
            objectFit: 'contain', 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.6) : '#f5f5f5' 
          }}
        />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Standard Audiogram Format
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The audiogram plots frequency (Hz) on the horizontal axis and hearing level (dB HL) on the vertical axis. 
            Lower numbers on the vertical axis represent better hearing. The red line indicates the right ear, 
            and the blue line indicates the left ear. Different symbols are used to represent air conduction, 
            bone conduction, and masked thresholds.
          </Typography>
        </CardContent>
      </Card>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Reading the X-Axis (Frequency)
            </Typography>
            <Typography paragraph>
              The horizontal axis represents frequency in Hertz (Hz), ranging from low frequencies (left) 
              to high frequencies (right).
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Standard Test Frequencies:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {[250, 500, 1000, 2000, 4000, 8000].map((freq) => (
                <Tooltip key={freq} title={`Play ${freq}Hz tone`}>
                  <IconButton 
                    onClick={() => handlePlayTone(freq as Frequency)}
                    size="small"
                    color={playingTone === freq ? "secondary" : "primary"}
                    sx={{ 
                      border: '1px solid',
                      borderColor: theme.palette.primary.main,
                      m: 0.5
                    }}
                  >
                    <Typography variant="caption" sx={{ mr: 0.5 }}>
                      {freq}Hz
                    </Typography>
                    <VolumeUp fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Lower frequencies (250-500 Hz) correspond to vowel sounds and are important for speech comprehension.
              Higher frequencies (2000-8000 Hz) correspond primarily to consonant sounds and are critical for speech clarity.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Reading the Y-Axis (Intensity)
            </Typography>
            <Typography paragraph>
              The vertical axis represents intensity in decibels hearing level (dB HL), 
              typically ranging from -10 to 120 dB HL.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowUpward fontSize="small" color="success" sx={{ mr: 1 }} />
                  -10 dB HL: Excellent hearing
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                  0 dB HL: Reference level (normal hearing)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowDownward fontSize="small" color="error" sx={{ mr: 1 }} />
                  120 dB HL: Profound hearing loss
                </Typography>
              </Box>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                The audiogram is "upside down" compared to most graphs – better hearing is represented by 
                points higher on the page (lower dB values).
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Audiogram Symbols
        </Typography>
        <Typography paragraph>
          Different symbols are used to represent different test conditions:
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Test Condition</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Meaning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {symbols.map((sym) => (
                <TableRow key={sym.name}>
                  <TableCell>{sym.name}</TableCell>
                  <TableCell>
                    <Typography 
                      variant="h6" 
                      component="span" 
                      sx={{ 
                        color: sym.color,
                        fontWeight: 'bold' 
                      }}
                    >
                      {sym.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {sym.name.includes('No Response') ? 
                      'Patient did not respond at maximum intensity' : 
                      sym.name.includes('Masked') ? 
                        'Testing with masking noise in non-test ear' :
                        'Standard threshold response'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Alert severity="warning">
          <Typography variant="subtitle2" gutterBottom>Important:</Typography>
          <Typography variant="body2">
            Always connect thresholds of the same ear and test type with lines to create a visual representation 
            of the patient's hearing profile. This makes the audiogram easier to interpret at a glance.
          </Typography>
        </Alert>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Interpreting Results
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Types of Hearing Loss
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Conductive Loss:</strong> Bone conduction thresholds are normal, but air conduction thresholds 
              are elevated. This indicates an issue in the outer or middle ear.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Sensorineural Loss:</strong> Both air and bone conduction thresholds are equally reduced, 
              indicating an issue in the inner ear or auditory nerve.
            </Typography>
            <Typography variant="body2">
              <strong>Mixed Loss:</strong> Both conductive and sensorineural components are present, with bone 
              conduction thresholds better than air but still below normal.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Key Indicators on Audiograms
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Air-Bone Gap:</strong> The difference between air and bone conduction thresholds at the 
              same frequency. A gap greater than 10 dB suggests conductive involvement.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Asymmetry:</strong> A significant difference between ears may indicate unilateral pathology.
            </Typography>
            <Typography variant="body2">
              <strong>Configuration:</strong> The shape of the audiogram (flat, sloping, rising, notched) 
              can suggest specific etiologies.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Common Audiogram Patterns
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Noise-Induced Hearing Loss
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: 160, 
                bgcolor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                mb: 2
              }}>
                {/* Simplified visual representation of noise-induced notch */}
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '30%',
                  width: '80%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '66%', 
                  top: '30%',
                  height: 40,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '66%', 
                  top: '70%',
                  width: '17%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '83%', 
                  top: '50%',
                  height: 40,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '83%', 
                  top: '50%',
                  width: '7%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                
                <Typography variant="caption" sx={{ position: 'absolute', left: '10%', top: '20%' }}>
                  Normal
                </Typography>
                <Typography variant="caption" sx={{ position: 'absolute', left: '70%', top: '80%' }}>
                  Notch at 4kHz
                </Typography>
              </Box>
              <Typography variant="body2">
                <strong>Characteristics:</strong> Classic "notch" at 4000 Hz with better thresholds at higher and lower frequencies.
                Typically bilateral and symmetrical. The notch may also occur at 3000 Hz or 6000 Hz, depending on the noise exposure type.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                <strong>Common causes:</strong> Excessive noise exposure, industrial work, gunfire, loud music
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Age-Related (Presbycusis)
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: 160, 
                bgcolor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                mb: 2
              }}>
                {/* Simplified visual representation of sloping loss */}
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '30%',
                  width: '20%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '30%', 
                  top: '30%',
                  height: 20,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '30%', 
                  top: '50%',
                  width: '20%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  height: 20,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '70%',
                  width: '20%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '70%', 
                  top: '70%',
                  height: 20,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '70%', 
                  top: '90%',
                  width: '20%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                
                <Typography variant="caption" sx={{ position: 'absolute', left: '10%', top: '20%' }}>
                  Normal lows
                </Typography>
                <Typography variant="caption" sx={{ position: 'absolute', left: '75%', top: '95%' }}>
                  Poor highs
                </Typography>
              </Box>
              <Typography variant="body2">
                <strong>Characteristics:</strong> Bilateral, symmetrical high-frequency sensorineural hearing loss.
                Gradually sloping configuration, typically worse at 4000-8000 Hz.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                <strong>Common causes:</strong> Aging, possibly accelerated by noise exposure over lifetime
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Conductive Hearing Loss
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: 160, 
                bgcolor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                mb: 2
              }}>
                {/* Simplified visual representation of air-bone gap */}
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '30%',
                  width: '80%',
                  height: 2,
                  bgcolor: theme.palette.secondary.main,
                  borderRadius: 5
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '60%',
                  width: '80%',
                  height: 2,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 5
                }} />
                
                <Typography variant="caption" sx={{ position: 'absolute', left: '10%', top: '20%', color: theme.palette.secondary.main }}>
                  Bone conduction (normal)
                </Typography>
                <Typography variant="caption" sx={{ position: 'absolute', left: '10%', top: '70%', color: theme.palette.primary.main }}>
                  Air conduction (reduced)
                </Typography>
                <Typography variant="caption" sx={{ position: 'absolute', left: '40%', top: '45%' }}>
                  Air-bone gap
                </Typography>
              </Box>
              <Typography variant="body2">
                <strong>Characteristics:</strong> Normal bone conduction with reduced air conduction, creating an air-bone gap.
                Often flat across frequencies.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                <strong>Common causes:</strong> Ear wax, middle ear fluid, otosclerosis, perforated eardrum, ossicular chain disruption
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Mixed Hearing Loss
              </Typography>
              <Box sx={{ 
                width: '100%', 
                height: 160, 
                bgcolor: alpha(theme.palette.background.default, 0.5),
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                mb: 2
              }}>
                {/* Simplified visual representation of mixed loss */}
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '40%',
                  width: '80%',
                  height: 2,
                  bgcolor: theme.palette.secondary.main,
                  borderRadius: 5
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '10%', 
                  top: '70%',
                  width: '80%',
                  height: 2,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 5
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '20%',
                  height: 20,
                  width: 2,
                  bgcolor: theme.palette.secondary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '40%',
                  width: '40%',
                  height: 2,
                  bgcolor: theme.palette.secondary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '50%',
                  height: 20,
                  width: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  left: '50%', 
                  top: '70%',
                  width: '40%',
                  height: 2,
                  bgcolor: theme.palette.primary.main
                }} />
                
                <Typography variant="caption" sx={{ position: 'absolute', left: '15%', top: '45%', color: theme.palette.secondary.main }}>
                  BC (reduced)
                </Typography>
                <Typography variant="caption" sx={{ position: 'absolute', left: '15%', top: '75%', color: theme.palette.primary.main }}>
                  AC (worse)
                </Typography>
              </Box>
              <Typography variant="body2">
                <strong>Characteristics:</strong> Both sensorineural and conductive components present.
                Bone conduction thresholds are reduced, and air conduction is even worse.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                <strong>Common causes:</strong> Combination of cochlear damage and middle ear pathology, as in chronic otitis media with inner ear involvement
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Clinical Practice Tip
          </Typography>
          <Typography variant="body2">
            When analyzing an audiogram, first identify the type (conductive, sensorineural, or mixed), then consider the 
            configuration (flat, sloping, rising, notched), and finally assess symmetry between ears. This structured approach 
            will help you develop differential diagnoses and appropriate treatment plans.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default AudiogramStep;