import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  alpha,
  useTheme,
  Grid,
  Paper,
} from '@mui/material';
import {
  NavigateNext,
  Hearing,
} from '@mui/icons-material';

// Import from MediaAssets
import { EarAnatomyImages } from '../../constants/MediaAssets';
import MediaFullscreen from '../../components/MediaFullscreen';

// Use image from MediaAssets
const hearingProcessImg = EarAnatomyImages.hearingProcess;

const HearingProcess: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Typography paragraph>
        Hearing is a complex process that involves all three parts of the ear working together, as well as the 
        auditory nerve and brain. Let's explore how sound waves are transformed into the perception of sound.
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <MediaFullscreen>
          <CardMedia
            component="img"
            sx={{ 
              height: { xs: 440, sm: 600, md: 700 },
              maxWidth: '100%',
              objectFit: 'contain', 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.6) : '#f5f5f5' 
            }}
            image={hearingProcessImg}
            alt="The Process of Hearing"
          />
        </MediaFullscreen>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            The Journey of Sound:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 1: Sound Collection
                </Typography>
                <Typography variant="body2">
                  Sound waves enter the ear canal and cause the eardrum (tympanic membrane) to vibrate. 
                  The shape of the pinna helps determine the direction of sounds.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 2: Mechanical Amplification
                </Typography>
                <Typography variant="body2">
                  The vibrations are transmitted through the three ossicles (malleus, incus, stapes) in the middle ear, 
                  which amplify the sound and transfer it to the oval window.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 3: Fluid Waves
                </Typography>
                <Typography variant="body2">
                  The stapes footplate pushes on the oval window, creating waves in the fluid of the cochlea. 
                  These waves cause the basilar membrane to move up and down.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 4: Mechanical to Electrical Conversion
                </Typography>
                <Typography variant="body2">
                  Hair cells on the basilar membrane bend as it moves, opening ion channels that generate 
                  electrical signals. Different frequencies activate hair cells at different locations.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 5: Neural Transmission
                </Typography>
                <Typography variant="body2">
                  The electrical signals are transmitted via the auditory nerve to the brain's auditory cortex, 
                  where they are processed and interpreted as sound.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                  Step 6: Sound Perception
                </Typography>
                <Typography variant="body2">
                  The brain analyzes the signals, determining pitch, volume, and location of the sound source, 
                  and integrates this with other sensory information and memories.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Typography paragraph>
        This entire process happens incredibly quickly - in milliseconds - allowing us to perceive sounds almost 
        instantaneously. The auditory system can detect a wide range of frequencies (20 Hz to 20,000 Hz in young, 
        healthy humans) and an enormous range of intensities.
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Key Facts About Hearing:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Hearing color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Frequency Range" 
            secondary="Humans typically hear frequencies between 20 Hz and 20,000 Hz, with highest sensitivity around 2,000-5,000 Hz (the range of most speech sounds)" 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Hearing color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Tonotopic Organization" 
            secondary="Different parts of the cochlea respond to different frequencies, with high frequencies at the base and low frequencies at the apex" 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Hearing color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Amplification" 
            secondary="The middle ear provides about 25-30 dB of amplification, essential for hearing quiet sounds" 
          />
        </ListItem>
      </List>
      
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Types of Hearing Loss: A Comparison
        </Typography>
        
        <Grid container sx={{ border: 1, borderColor: 'divider' }}>
          {/* Header Row */}
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Characteristic
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.info.light, 0.1) }}>
            <Typography variant="subtitle2" fontWeight="bold" color="info.dark">
              Conductive Hearing Loss
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.warning.light, 0.1) }}>
            <Typography variant="subtitle2" fontWeight="bold" color="warning.dark">
              Sensorineural Hearing Loss
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.error.light, 0.1) }}>
            <Typography variant="subtitle2" fontWeight="bold" color="error.dark">
              Mixed Hearing Loss
            </Typography>
          </Grid>
          
          {/* Affected Areas Row */}
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="body2" fontWeight="bold">
              Affected Areas
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              Outer ear and/or middle ear
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              Inner ear (cochlea) or auditory nerve
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              Combination of outer/middle ear AND inner ear/nerve problems
            </Typography>
          </Grid>
          
          {/* Audiometric Pattern Row */}
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="body2" fontWeight="bold">
              Audiometric Pattern
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              Air-bone gap present (bone conduction normal, air conduction reduced)
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              No air-bone gap (both air and bone conduction reduced equally)
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              Air-bone gap present AND bone conduction thresholds reduced
            </Typography>
          </Grid>
          
          {/* Common Causes Row */}
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="body2" fontWeight="bold">
              Common Causes
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              • Earwax blockage<br />
              • Ear infections<br />
              • Otosclerosis<br />
              • Perforated eardrum<br />
              • Ossicular discontinuity
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              • Noise exposure<br />
              • Aging (presbycusis)<br />
              • Ototoxic medications<br />
              • Ménière's disease<br />
              • Acoustic neuroma
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              • Chronic ear infections with inner ear damage<br />
              • Trauma affecting multiple ear structures<br />
              • Otosclerosis with cochlear involvement
            </Typography>
          </Grid>
          
          {/* Treatment Options Row */}
          <Grid item xs={3} sx={{ p: 1, borderRight: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="body2" fontWeight="bold">
              Treatment Options
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              • Medical treatment (e.g., antibiotics)<br />
              • Surgical intervention<br />
              • Hearing aids<br />
              • Bone conduction devices
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="body2">
              • Hearing aids<br />
              • Cochlear implants<br />
              • Assistive listening devices<br />
              • Communication strategies
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ p: 1 }}>
            <Typography variant="body2">
              • Combination of treatments for both types<br />
              • May require both medical/surgical and amplification approaches
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HearingProcess; 