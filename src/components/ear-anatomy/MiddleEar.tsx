import { useState } from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  alpha,
  useTheme,
} from '@mui/material';
import {
  KeyboardArrowDown,
  NavigateNext,
} from '@mui/icons-material';

// Import from MediaAssets
import { EarAnatomyImages } from '../../constants/MediaAssets';
import MediaFullscreen from '../../components/MediaFullscreen';

// Use image from MediaAssets
const middleEarImg = EarAnatomyImages.middleEar;

const MiddleEar: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography paragraph>
        The middle ear is an air-filled cavity that houses three tiny bones called ossicles. These bones form a chain 
        that transmits sound vibrations from the eardrum to the inner ear, converting acoustic energy in air to 
        mechanical energy and then to fluid-based energy.
      </Typography>
      
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ mt: 2, mb: 2 }}>
        Middle Ear Components and Their Functions
      </Typography>
      
      <Card sx={{ mb: 3 }}>
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
            image={middleEarImg}
            alt="Middle Ear Anatomy"
          />
        </MediaFullscreen>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Key Structures of the Middle Ear:
          </Typography>
          
          <Accordion 
            expanded={expanded === 'tympanic-membrane'} 
            onChange={handleAccordionChange('tympanic-membrane')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="tympanic-membrane-content"
              id="tympanic-membrane-header"
            >
              <Typography fontWeight="bold">Tympanic Membrane (Eardrum)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    The eardrum is like the head of a drum - a thin membrane that vibrates when sound hits it. 
                    It's the boundary between your outer and middle ear.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Converts sound waves (air pressure variations) into mechanical vibrations. 
                    It's approximately 17-20 times larger than the oval window, which helps amplify the force 
                    of vibrations as they travel to the inner ear.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Transformation:
                  </Typography>
                  <Typography>
                    <strong>Input:</strong> Acoustic energy (sound waves in air)<br />
                    <strong>Output:</strong> Mechanical energy (vibrations of solid structures)
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'ossicles'} 
            onChange={handleAccordionChange('ossicles')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="ossicles-content"
              id="ossicles-header"
            >
              <Typography fontWeight="bold">Ossicular Chain (Malleus, Incus, Stapes)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    Three tiny connected bones that form a bridge across the middle ear. Their names describe their shapes:
                    <ul>
                      <li><strong>Malleus (hammer)</strong> - attached to the eardrum</li>
                      <li><strong>Incus (anvil)</strong> - the middle bone</li>
                      <li><strong>Stapes (stirrup)</strong> - connects to the inner ear</li>
                    </ul>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography paragraph>
                    Acts as a lever system that amplifies force. Key points:
                    <ul>
                      <li>Creates a mechanical advantage of about 1.3x</li>
                      <li>When combined with the area difference between eardrum and oval window, produces approximately 22x pressure gain (27 dB)</li>
                      <li>Essential for "impedance matching" between air and fluid environments</li>
                    </ul>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Transformation:
                  </Typography>
                  <Typography>
                    <strong>Input:</strong> Mechanical energy from eardrum<br />
                    <strong>Output:</strong> Amplified mechanical energy to oval window
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'tympanic-cavity'} 
            onChange={handleAccordionChange('tympanic-cavity')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="tympanic-cavity-content"
              id="tympanic-cavity-header"
            >
              <Typography fontWeight="bold">Tympanic Cavity (Middle Ear Cavity)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    An air-filled space like a small room that houses the ossicles. It's separated from the 
                    outer ear by the eardrum and from the inner ear by the oval and round windows.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Maintains an air-filled environment for proper ossicle movement. Three critical aspects:
                    <ul>
                      <li>Must stay at atmospheric pressure for optimal hearing</li>
                      <li>Requires regular pressure equalization</li>
                      <li>Provides low-resistance environment for ossicle vibration</li>
                    </ul>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Relevance:
                  </Typography>
                  <Typography>
                    The air in this cavity provides low resistance to ossicle movement, allowing efficient 
                    energy transfer from the eardrum to the inner ear.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'eustachian-tube'} 
            onChange={handleAccordionChange('eustachian-tube')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="eustachian-tube-content"
              id="eustachian-tube-header"
            >
              <Typography fontWeight="bold">Eustachian Tube</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    A narrow channel that connects the middle ear to the back of the throat (nasopharynx). 
                    It's like a pressure-release valve that opens when you yawn, swallow, or chew.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Connects the middle ear to the back of the throat (nasopharynx). Three main functions:
                    <ul>
                      <li>Equalizes air pressure when you yawn, swallow, or chew</li>
                      <li>Drains fluid from the middle ear</li> 
                      <li>Protects middle ear from throat secretions and extreme sound pressure</li>
                    </ul>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Relevance:
                  </Typography>
                  <Typography>
                    When middle ear pressure differs from atmospheric pressure, the resulting eardrum tension 
                    reduces its ability to vibrate, causing temporary hearing loss (like during airplane ascent 
                    or descent).
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'oval-window'} 
            onChange={handleAccordionChange('oval-window')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="oval-window-content"
              id="oval-window-header"
            >
              <Typography fontWeight="bold">Oval Window</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    A small, membrane-covered opening between the middle and inner ear where the stapes 
                    (the final ossicle) attaches. Like a doorway from the middle ear to the inner ear.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Transmits vibrations from the stapes to the fluid (perilymph) in the cochlea. 
                    Its smaller surface area compared to the eardrum concentrates force, which 
                    is necessary to overcome the higher resistance of fluid compared to air.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Transformation:
                  </Typography>
                  <Typography>
                    <strong>Input:</strong> Mechanical energy from stapes movement<br />
                    <strong>Output:</strong> Fluid pressure waves in the inner ear
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'round-window'} 
            onChange={handleAccordionChange('round-window')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="round-window-content"
              id="round-window-header"
            >
              <Typography fontWeight="bold">Round Window</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    A second, flexible membrane-covered opening between the middle and inner ear. 
                    Works like a pressure-release valve for the inner ear.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Bulges outward into the middle ear when the stapes pushes in at the oval window, 
                    allowing fluid movement within the cochlea. Without this "release valve," the 
                    incompressible fluid in the inner ear couldn't move, and no sound would be perceived.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Relevance:
                  </Typography>
                  <Typography>
                    Allows the release of pressure energy in the inner ear system, completing the 
                    circuit of energy flow through the cochlea.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'middle-ear-muscles'} 
            onChange={handleAccordionChange('middle-ear-muscles')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="middle-ear-muscles-content"
              id="middle-ear-muscles-header"
            >
              <Typography fontWeight="bold">Middle Ear Muscles (Stapedius & Tensor Tympani)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography>
                    Two tiny muscles in the middle ear that act like shock absorbers for loud sounds.
                    The stapedius attaches to the stapes, while the tensor tympani attaches to the malleus.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Function:
                  </Typography>
                  <Typography>
                    Contract reflexively in response to loud sounds (85+ dB), reducing the transmission of 
                    vibrations to the inner ear. This acoustic reflex provides some protection against 
                    sudden loud noises and reduces the masking effect of low-frequency background noise.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Energy Relevance:
                  </Typography>
                  <Typography>
                    Attenuate (reduce) energy transmission by stiffening the ossicular chain, 
                    primarily affecting lower frequencies below 1000 Hz. This attenuation is typically 
                    10-15 dB but can reach up to 30 dB in some individuals.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
      
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ mt: 4, mb: 2 }}>
        Energy Transmission in the Middle Ear
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: alpha(theme.palette.info.main, 0.05) }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Impedance Matching: The Critical Function of the Middle Ear
        </Typography>
        
        <Typography paragraph>
          The primary role of the middle ear is to solve a critical physics problem: 
          sound waves travel easily in air but are mostly reflected when they hit fluid (like in the cochlea).
          This is called an <strong>impedance mismatch</strong>.
        </Typography>
        
        <Box sx={{ mb: 2, p: 2, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight="bold">
            The Middle Ear Solves This Problem Through:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
                <Typography fontWeight="bold" gutterBottom>Area Ratio</Typography>
                <Typography variant="body2">
                  The eardrum's surface area is about 17-20 times larger than the oval window. 
                  This concentrates the force from sound waves onto the smaller window, 
                  increasing pressure by the same factor.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
                <Typography fontWeight="bold" gutterBottom>Lever Action</Typography>
                <Typography variant="body2">
                  The ossicles form a lever system that multiplies force by approximately 1.3 times. 
                  The malleus arm is longer than the incus arm, creating this mechanical advantage.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
                <Typography fontWeight="bold" gutterBottom>Combined Effect</Typography>
                <Typography variant="body2">
                  Together, these mechanisms provide about 22x amplification (approximately 27 dB gain), 
                  enough to overcome most of the impedance mismatch between air and fluid.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
          Energy Flow Sequence:
        </Typography>
        
        <Box sx={{ p: 2, mb: 2 }}>
          <ol>
            <li><strong>Acoustic Energy</strong> (air pressure waves) strikes the tympanic membrane</li>
            <li><strong>Mechanical Energy</strong> (solid vibrations) travels through the ossicular chain</li>
            <li><strong>Hydraulic Energy</strong> (fluid waves) is created in the cochlear fluids</li>
            <li>The round window bulges outward, allowing the energy to complete its path</li>
          </ol>
        </Box>
        
        <Typography variant="h6" gutterBottom fontWeight="bold" color="warning.main" sx={{ mt: 3 }}>
          Key Takeaways:
        </Typography>
        <Box sx={{ p: 2, bgcolor: alpha(theme.palette.warning.light, 0.1), borderRadius: 1 }}>
          <ul>
            <li><strong>Size Matters:</strong> The ear uses size differences (eardrum vs. oval window) to concentrate force</li>
            <li><strong>Leverage Works:</strong> The ossicles form a lever system that multiplies force</li>
            <li><strong>Energy Must Flow:</strong> Sound energy travels from air → bone → fluid in a continuous path</li>
            <li><strong>Efficient Design:</strong> Without the middle ear's amplification, we'd lose 99.9% of sound energy at the air-fluid boundary</li>
          </ul>
        </Box>
        
        <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="warning.main" sx={{ mt: 3 }}>
          Clinical Significance:
        </Typography>
        <Typography paragraph>
          Disruptions to this energy transmission pathway result in conductive hearing loss. The better you understand 
          this energy transfer system, the better you'll be able to interpret audiometric findings and understand 
          treatment options for middle ear disorders.
        </Typography>
      </Paper>
      
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ mt: 4, mb: 2 }}>
        Middle Ear Pathologies and Their Audiometric Presentations
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Otitis Media</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Inflammation of the middle ear, often with fluid accumulation. Can be acute (short duration) or
                chronic (persistent). Common in children due to their shorter, more horizontal Eustachian tubes.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Effect on Hearing:
              </Typography>
              <Typography paragraph variant="body2">
                Fluid in the middle ear dampens ossicle movement and increases mass, reducing vibration efficiency.
                The result is reduced energy transfer to the inner ear, particularly at higher frequencies.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Mild to moderate conductive hearing loss (20-40 dB)</li>
                  <li>Air-bone gap across frequencies (bone conduction normal, air conduction reduced)</li>
                  <li>Type B tympanogram (flat, with reduced compliance)</li>
                  <li>Absent acoustic reflexes</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Otosclerosis</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Abnormal bone growth in the middle ear, typically around the stapes footplate, causing it to become 
                fixed or "frozen" in the oval window. Hereditary condition most common in Caucasian women.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Effect on Hearing:
              </Typography>
              <Typography paragraph variant="body2">
                The fixed stapes cannot efficiently transmit vibrations to the inner ear. As the condition progresses,
                it may also affect inner ear function (cochlear otosclerosis).
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Progressive conductive hearing loss, often bilateral but asymmetric</li>
                  <li>Characteristic "Carhart's notch" - bone conduction dip around 2000 Hz</li>
                  <li>Type A tympanogram (normal middle ear pressure and compliance)</li>
                  <li>Absent acoustic reflexes</li>
                  <li>Better hearing in noisy environments (paracusis willisii)</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Tympanic Membrane Perforation</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                A hole or rupture in the eardrum, caused by infections, trauma, or sudden pressure changes 
                (barotrauma). Size and location of the perforation affect hearing impact.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Effect on Hearing:
              </Typography>
              <Typography paragraph variant="body2">
                Reduces the effective surface area of the eardrum, diminishing its ability to capture sound energy.
                Also allows sound to bypass the ossicular chain, reducing the middle ear's amplification effect.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Mild to moderate conductive hearing loss (usually 20-30 dB)</li>
                  <li>Greater hearing loss at lower frequencies if perforation is large</li>
                  <li>Type B tympanogram with high physical volume measurement</li>
                  <li>Acoustic reflex absent on affected side</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: theme.palette.error.main, p: 2 }}>
              <Typography variant="h6" color="white">Ossicular Discontinuity</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph variant="body2">
                Disruption of the ossicular chain, most commonly separation of the incus from the stapes.
                Usually caused by trauma, chronic infection, or cholesteatoma.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Effect on Hearing:
              </Typography>
              <Typography paragraph variant="body2">
                Breaks the mechanical link between the tympanic membrane and the oval window, 
                preventing efficient transfer of energy to the inner ear.
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Audiometric Presentation:
              </Typography>
              <Typography variant="body2">
                <ul>
                  <li>Moderate to severe conductive hearing loss (40-60 dB)</li>
                  <li>Large air-bone gap across all frequencies</li>
                  <li>Type A tympanogram (sometimes with increased compliance)</li>
                  <li>Acoustic reflex absent</li>
                </ul>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Visual Comparison of Hearing Loss Types */}
      <Box sx={{ mb: 4, p: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold" align="center" sx={{ mb: 2 }}>
          Comparing Types of Hearing Loss
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: alpha(theme.palette.primary.light, 0.05), height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" align="center">
                Conductive Hearing Loss
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Location: Outer or middle ear" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Causes: Earwax, fluid, otosclerosis, perforations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Audiogram: Air-bone gap present" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Pattern: Often flat across frequencies" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Treatment: Often medical/surgical options" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="primary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Amplification: Excellent results with hearing aids" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, bgcolor: alpha(theme.palette.secondary.light, 0.05), height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="secondary" align="center">
                Sensorineural Hearing Loss
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Location: Inner ear or nerve" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Causes: Noise exposure, aging, ototoxicity" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Audiogram: No air-bone gap" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Pattern: Often worse in high frequencies" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Treatment: Usually non-medical (amplification)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><NavigateNext color="secondary" fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Amplification: Variable success, often with challenges" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), p: 3, borderRadius: 1, border: `1px solid ${theme.palette.warning.main}`, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Audiometric Tests for Middle Ear Function:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Pure Tone Audiometry
            </Typography>
            <Typography variant="body2">
              Measures both air conduction (AC) and bone conduction (BC) thresholds. Middle ear disorders 
              typically show an air-bone gap where AC thresholds are elevated but BC remains normal. This gap 
              represents the magnitude of conductive hearing loss.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Tympanometry
            </Typography>
            <Typography variant="body2">
              Measures eardrum mobility and middle ear pressure. Different pathologies create characteristic 
              tympanogram patterns:
              <ul>
                <li>Type A: Normal</li>
                <li>Type B: Flat (fluid, perforation)</li>
                <li>Type C: Negative pressure (Eustachian tube dysfunction)</li>
                <li>Type Ad: Hypermobile (ossicular discontinuity)</li>
                <li>Type As: Stiff (otosclerosis, adhesions)</li>
              </ul>
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Acoustic Reflex Testing
            </Typography>
            <Typography variant="body2">
              Measures the contraction of middle ear muscles in response to loud sounds. Middle ear pathologies often 
              show absent reflexes or abnormal decay patterns. Helps distinguish between conductive, sensorineural, 
              and retrocochlear disorders.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MiddleEar; 