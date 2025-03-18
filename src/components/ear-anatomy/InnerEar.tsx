import { useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  NavigateNext,
  KeyboardArrowDown,
} from '@mui/icons-material';

// Import from MediaAssets
import { EarAnatomyImages } from '../../constants/MediaAssets';
import MediaFullscreen from '../../components/MediaFullscreen';

// Use image from MediaAssets
const innerEarImg = EarAnatomyImages.innerEar;

const InnerEar: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography paragraph>
        The inner ear is a complex system of fluid-filled chambers and tubes. It contains the sensory organs 
        for both hearing (cochlea) and balance (vestibular system). This sophisticated structure is responsible 
        for transducing mechanical energy into electrical signals that can be interpreted by the brain.
      </Typography>
      
      <Box sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 2, border: `1px dashed ${theme.palette.info.main}` }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Inner Ear Analogy: A Biological Microphone and Motion Sensor
        </Typography>
        <Typography paragraph>
          Think of the inner ear as two amazing devices in one:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.primary.light, 0.05) }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                The Cochlea: Nature's Microphone
              </Typography>
              <Typography variant="body2">
                Like a high-tech microphone that converts sound vibrations into electrical signals, the cochlea 
                transforms mechanical energy from the middle ear into precise neural signals that your brain 
                interprets as sound. Just as a microphone has different components for different frequencies, 
                the cochlea has different regions that respond to different pitches.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.primary.light, 0.05) }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                The Vestibular System: Your Built-in Motion Sensor
              </Typography>
              <Typography variant="body2">
                Like the motion sensor in your smartphone that detects orientation and movement, your vestibular 
                system constantly monitors your head position and movement in space. This biological gyroscope 
                and accelerometer helps you maintain balance, stabilize your vision, and know which way is up.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      <Card sx={{ mb: 2 }}>
        <MediaFullscreen>
          <CardMedia
            component="img"
            sx={{ 
              height: { xs: 400, sm: 500, md: 600 },
              maxWidth: '100%',
              objectFit: 'contain', 
              p: 2, 
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.6) : '#f5f5f5' 
            }}
            image={innerEarImg}
            alt="Inner Ear Anatomy"
          />
        </MediaFullscreen>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Key Structures of the Inner Ear:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Cochlea" 
                secondary="Snail-shaped structure containing the organ of Corti, which converts fluid vibrations into electrical signals" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Organ of Corti" 
                secondary="Contains hair cells that detect movement in the cochlear fluid" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Hair Cells" 
                secondary="Specialized cells with stereocilia that convert mechanical motion to neural signals" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Vestibule" 
                secondary="Central chamber containing the utricle and saccule, which detect linear acceleration and head position" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Semicircular Canals" 
                secondary="Three loop-shaped structures that detect rotational movements of the head" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NavigateNext color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Auditory Nerve" 
                secondary="Carries electrical signals from the cochlea to the brain for processing" 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      
      <Accordion 
        expanded={expanded === 'cochlea'} 
        onChange={handleAccordionChange('cochlea')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel-cochlea-content"
          id="panel-cochlea-header"
        >
          <Typography fontWeight="bold">The Cochlea: Detailed Structure and Function</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            The cochlea is the primary auditory portion of the inner ear. This spiral-shaped structure contains 
            three fluid-filled compartments (scalae):
          </Typography>
          
          {/* In Simple Terms Box */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.success.light, 0.1), borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
              In Simple Terms: The Cochlea is Like a Tiny Piano
            </Typography>
            <Typography variant="body2" paragraph>
              Think of the cochlea as a rolled-up piano keyboard inside your head, about the size of a pea. 
              Different notes (sound frequencies) activate different keys (regions) of this piano:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 1, 
                  bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.4) : '#f9f9f9', 
                  borderRadius: 1 
                }}>
                  <Typography variant="body2" fontWeight="bold" color="error.main">
                    High Notes (High Frequency)
                  </Typography>
                  <Typography variant="body2">
                    Like the right side of a piano keyboard
                  </Typography>
                  <Typography variant="body2" fontStyle="italic" fontSize="small">
                    Near the entrance of the cochlea
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 1, 
                  bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.4) : '#f9f9f9', 
                  borderRadius: 1 
                }}>
                  <Typography variant="body2" fontWeight="bold" color="warning.main">
                    Middle Notes (Mid Frequency)
                  </Typography>
                  <Typography variant="body2">
                    Like the middle of a piano keyboard
                  </Typography>
                  <Typography variant="body2" fontStyle="italic" fontSize="small">
                    In the middle of the cochlear spiral
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 1, 
                  bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.4) : '#f9f9f9', 
                  borderRadius: 1 
                }}>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    Low Notes (Low Frequency)
                  </Typography>
                  <Typography variant="body2">
                    Like the left side of a piano keyboard
                  </Typography>
                  <Typography variant="body2" fontStyle="italic" fontSize="small">
                    At the apex (tip) of the cochlear spiral
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
            The Three Chambers of the Cochlea:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 1, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Scala Vestibuli
                </Typography>
                <Typography variant="body2">
                  • Upper chamber
                  <br />
                  • Contains perilymph fluid
                  <br />
                  • Connects to the oval window
                  <br />
                  • Receives vibrations first
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 1, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Scala Media (Cochlear Duct)
                </Typography>
                <Typography variant="body2">
                  • Middle chamber
                  <br />
                  • Contains endolymph fluid
                  <br />
                  • Houses the organ of Corti
                  <br />
                  • Where transduction occurs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 1, height: '100%' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Scala Tympani
                </Typography>
                <Typography variant="body2">
                  • Lower chamber
                  <br />
                  • Contains perilymph fluid
                  <br />
                  • Connects to the round window
                  <br />
                  • Allows pressure release
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Typography paragraph>
        The inner ear is filled with two types of fluid: perilymph and endolymph. These fluids have different 
        compositions and are separated by membranes. The movement of these fluids in response to sound vibrations 
        is essential for hearing.
      </Typography>
      
      <Accordion 
        expanded={expanded === 'fluids'} 
        onChange={handleAccordionChange('fluids')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel-fluids-content"
          id="panel-fluids-header"
        >
          <Typography fontWeight="bold">Inner Ear Fluids: Perilymph and Endolymph</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.primary.light, 0.05) }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                  Perilymph
                </Typography>
                <Typography variant="body2" paragraph>
                  Perilymph is similar in composition to extracellular fluid or cerebrospinal fluid. It fills the 
                  scala vestibuli and scala tympani.
                </Typography>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Key Characteristics:
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    <li>High in sodium (Na+), low in potassium (K+)</li>
                    <li>Similar to other extracellular fluids in the body</li>
                    <li>Surrounds the outside of the membranous labyrinth</li>
                    <li>Helps transmit pressure waves from the oval window</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.primary.light, 0.05) }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                  Endolymph
                </Typography>
                <Typography variant="body2" paragraph>
                  Endolymph has a unique ionic composition that is critical for hair cell function. It fills the 
                  scala media (cochlear duct) and the membranous labyrinth of the vestibular system.
                </Typography>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Key Characteristics:
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    <li>Low in sodium (Na+), high in potassium (K+)</li>
                    <li>Unusual compared to other body fluids</li>
                    <li>Maintained by the stria vascularis in the cochlea</li>
                    <li>Creates the electrical potential needed for hair cell function</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 2 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Clinical Significance:
            </Typography>
            <Typography variant="body2">
              The unique composition of these fluids is critical for normal hearing. Disorders that affect fluid 
              composition or circulation (like Ménière's disease) can cause significant hearing and balance problems. 
              The blood-labyrinth barrier protects these fluids, similar to how the blood-brain barrier protects 
              the brain.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Accordion 
        expanded={expanded === 'vestibular'} 
        onChange={handleAccordionChange('vestibular')}
        sx={{ mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel-vestibular-content"
          id="panel-vestibular-header"
        >
          <Typography fontWeight="bold">The Vestibular System: Balance and Spatial Orientation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            The vestibular system is the sensory system that provides the leading contribution to the sense of balance 
            and spatial orientation. It consists of two main components:
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                  Semicircular Canals
                </Typography>
                <Typography variant="body2" paragraph>
                  Three fluid-filled loops arranged at right angles to each other. Each canal detects rotational 
                  movement in a different plane.
                </Typography>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Function:
                </Typography>
                <Typography variant="body2">
                  Detect angular acceleration or rotational movements of the head. When you turn your head, the 
                  fluid inside the canals lags behind due to inertia, bending the cupula and stimulating hair cells.
                </Typography>
                <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 1 }}>
                  <Typography variant="body2" fontStyle="italic">
                    <strong>Example:</strong> When you spin around and then stop suddenly, the continued movement 
                    of fluid in your semicircular canals creates the sensation that you're still spinning.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                  Otolithic Organs (Utricle and Saccule)
                </Typography>
                <Typography variant="body2" paragraph>
                  Two sac-like structures in the vestibule that contain calcium carbonate crystals (otoconia) 
                  embedded in a gelatinous layer above hair cells.
                </Typography>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Function:
                </Typography>
                <Typography variant="body2">
                  <strong>Utricle:</strong> Detects horizontal linear acceleration and head tilt<br />
                  <strong>Saccule:</strong> Primarily detects vertical linear acceleration
                </Typography>
                <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 1 }}>
                  <Typography variant="body2" fontStyle="italic">
                    <strong>Example:</strong> When an elevator starts moving up or down, the otolithic organs 
                    detect this change in linear motion and help you maintain your balance.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ p: 2, mb: 2, bgcolor: alpha(theme.palette.warning.light, 0.1), borderRadius: 2, border: `1px dashed ${theme.palette.warning.main}` }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="warning.dark">
              Clinical Relevance: Vestibular Testing
            </Typography>
            <Typography variant="body2">
              Understanding the vestibular system is crucial for diagnosing balance disorders. Common vestibular tests include:
              <ul>
                <li><strong>Videonystagmography (VNG):</strong> Records eye movements during various maneuvers to assess vestibular function</li>
                <li><strong>Rotary Chair Testing:</strong> Evaluates the vestibulo-ocular reflex by rotating the patient in a controlled manner</li>
                <li><strong>Vestibular Evoked Myogenic Potentials (VEMP):</strong> Tests otolith function by measuring muscle responses to sound stimulation</li>
                <li><strong>Computerized Dynamic Posturography:</strong> Assesses balance control by measuring body sway under different sensory conditions</li>
              </ul>
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ mt: 4, mb: 2 }}>
        Inner Ear Disorders and Corresponding Audiometric Patterns
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Noise-Induced Hearing Loss</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Damage to hair cells from excessive noise exposure. Can be temporary or permanent, depending on 
                intensity and duration of exposure. Typically affects high frequencies first.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Pathophysiology:
              </Typography>
              <Typography paragraph variant="body2">
                Excessive noise causes metabolic exhaustion of hair cells, leading to free radical formation and 
                cell death. Outer hair cells in the basal turn of the cochlea (high frequency region) are most vulnerable.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Classic "notch" at 4000 Hz (sometimes 3000-6000 Hz)</li>
                  <li>Sensorineural hearing loss (no air-bone gap)</li>
                  <li>Often bilateral and symmetrical</li>
                  <li>May be accompanied by tinnitus at the affected frequencies</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Presbycusis (Age-Related Hearing Loss)</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Progressive, bilateral sensorineural hearing loss associated with aging. Most common type of hearing 
                loss in adults, typically beginning in the 40s-50s and gradually worsening.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Pathophysiology:
              </Typography>
              <Typography paragraph variant="body2">
                Multiple types exist, including sensory (hair cell loss), neural (auditory nerve degeneration), 
                metabolic (stria vascularis atrophy), and mechanical (basilar membrane stiffening).
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>High-frequency sloping sensorineural hearing loss</li>
                  <li>Bilateral and symmetrical</li>
                  <li>Poor speech discrimination, especially in noise</li>
                  <li>No air-bone gap</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Ménière's Disease</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Inner ear disorder characterized by episodic vertigo, fluctuating hearing loss, tinnitus, and aural 
                fullness. Caused by endolymphatic hydrops (excess fluid in the endolymphatic space).
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Pathophysiology:
              </Typography>
              <Typography paragraph variant="body2">
                Abnormal fluid homeostasis leads to distension of the endolymphatic space, affecting both cochlear 
                and vestibular function. May be related to impaired endolymph production or absorption.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Fluctuating low-frequency sensorineural hearing loss initially</li>
                  <li>Progresses to flat or downward-sloping loss over time</li>
                  <li>Usually unilateral, but can become bilateral (10-50% of cases)</li>
                  <li>Abnormal vestibular tests during acute episodes</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Ototoxicity</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Damage to inner ear structures from medications or chemicals. Common ototoxic agents include 
                aminoglycoside antibiotics, platinum-based chemotherapy drugs, loop diuretics, and certain NSAIDs.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Pathophysiology:
              </Typography>
              <Typography paragraph variant="body2">
                Mechanisms vary by agent but often involve damage to hair cells through oxidative stress, 
                interference with mitochondrial function, or disruption of ion transport. Some agents affect 
                cochlear function, others affect vestibular function, and some affect both.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Typically bilateral, high-frequency sensorineural hearing loss</li>
                  <li>Often begins at the highest frequencies (may not be detected on standard audiometry)</li>
                  <li>Can progress to lower frequencies with continued exposure</li>
                  <li>May be accompanied by tinnitus and/or vestibular symptoms</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default InnerEar; 