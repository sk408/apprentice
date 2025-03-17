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
  Paper,
  alpha,
  useTheme,
} from '@mui/material';
import {
  KeyboardArrowDown
} from '@mui/icons-material';

// Import from MediaAssets
import { EarAnatomyImages } from '../../constants/MediaAssets';

// Use image from MediaAssets
const outerEarImg = EarAnatomyImages.pinnaLandmarks;

const PinnaLandmarks: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography paragraph>
        Understanding the specific landmarks of the pinna (auricle) is essential for professionals 
        who fit hearing aids. These anatomical features serve as reference points for proper hearing aid 
        placement, ensuring comfort and optimal sound delivery.
      </Typography>
      
      <Typography paragraph>
        Below, we'll describe each landmark in simple everyday terms, followed by the clinical description 
        that you'll need to know professionally.
      </Typography>
      
      <Card sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ 
            height: { xs: 440, sm: 600, md: 700 },
            maxWidth: '100%',
            objectFit: 'contain', 
            p: 2, 
            bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.6) : '#f5f5f5' 
          }}
          image={outerEarImg}
          alt="Pinna Landmarks"
        />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Key Landmarks of the Pinna:
          </Typography>
          
          <Accordion 
            expanded={expanded === 'helix'} 
            onChange={handleAccordionChange('helix')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="helix-content"
              id="helix-header"
            >
              <Typography fontWeight="bold">Helix ("The Outer Rim")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The helix is the curved outer edge of your ear - like the rim of a cup. If you run your 
                    finger around the top and outer edge of your ear, you're tracing the helix.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The outermost curved margin of the ear, running from the top attachment down to the earlobe. Forms the visible rim of the auricle and provides structural support.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'antihelix'} 
            onChange={handleAccordionChange('antihelix')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="antihelix-content"
              id="antihelix-header"
            >
              <Typography fontWeight="bold">Antihelix ("The Inner Ridge")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The antihelix is the curved ridge that runs parallel to the outer rim, like a second 
                    smaller rim inside the first one. It forms a Y-shaped ridge in the middle of your ear.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    A Y-shaped cartilage ridge located in front of and roughly parallel to the helix. It separates the concha (bowl area) from the scapha and triangular fossa.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'tragus'} 
            onChange={handleAccordionChange('tragus')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="tragus-content"
              id="tragus-header"
            >
              <Typography fontWeight="bold">Tragus ("The Door Flap")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The tragus is the small flap-like projection just in front of your ear canal opening. 
                    It's the part that you push to close your ear when you don't want to hear something. 
                    Think of it as a partial "door" to your ear canal.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    A small, rounded cartilage projection in front of the ear canal opening that partially covers the entrance. Important for behind-the-ear hearing aid placement and acoustic coupling.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'antitragus'} 
            onChange={handleAccordionChange('antitragus')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="antitragus-content"
              id="antitragus-header"
            >
              <Typography fontWeight="bold">Antitragus ("The Opposite Bump")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The antitragus is a small bump on the lower part of your ear, opposite to the tragus.
                    If the tragus is the "door" to your ear canal, the antitragus is like a doorstop on the 
                    other side.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    A small cartilage bump opposite to the tragus, separated from it by the intertragic notch. It forms the lower boundary of the concha.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'concha'} 
            onChange={handleAccordionChange('concha')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="concha-content"
              id="concha-header"
            >
              <Typography fontWeight="bold">Concha ("The Bowl")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The concha is the deep bowl-shaped cavity in the center of your ear - like a seashell 
                    or soup bowl. It's the largest and deepest depression in your outer ear, funneling sound 
                    into your ear canal.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    A deep cavity in the external ear that leads to the ear canal. It's bounded by the tragus (front), antihelix (back), and antitragus (below). Critical for in-the-ear hearing aid shell design.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'lobule'} 
            onChange={handleAccordionChange('lobule')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="lobule-content"
              id="lobule-header"
            >
              <Typography fontWeight="bold">Lobule ("The Earlobe")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The lobule is simply what most people call the "earlobe" - the soft, fleshy 
                    bottom part of your ear where earrings are typically worn. Unlike the rest of the 
                    external ear, it contains no cartilage.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The soft, fleshy, non-cartilaginous portion at the bottom of the ear, composed of fatty tissue and skin. May serve as an anchor point for some hearing aid styles.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'crusofhelix'} 
            onChange={handleAccordionChange('crusofhelix')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="crusofhelix-content"
              id="crusofhelix-header"
            >
              <Typography fontWeight="bold">Crus of Helix ("The Diving Ridge")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The crus of helix is the point where the outer rim of your ear (helix) turns inward 
                    and dives into the middle of your ear, creating a horizontal ridge that divides the 
                    upper and lower parts of the bowl area.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The anterior continuation of the helix that crosses the concha horizontally, 
                    dividing it into the cymba conchae superiorly and the cavum conchae inferiorly.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'cymbaconchae'} 
            onChange={handleAccordionChange('cymbaconchae')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="cymbaconchae-content"
              id="cymbaconchae-header"
            >
              <Typography fontWeight="bold">Cymba Conchae ("The Upper Bowl")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The cymba conchae is the smaller, upper portion of the bowl-like depression in your ear. 
                    It's the upper "pool" of the ear's bowl, located above the horizontal ridge (crus of helix).
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The superior portion of the concha, above the crus of the helix, bounded by the 
                    antihelix posteriorly and the helix anteriorly. Important for receiver-in-canal 
                    hearing aid models.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'cavumconchae'} 
            onChange={handleAccordionChange('cavumconchae')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="cavumconchae-content"
              id="cavumconchae-header"
            >
              <Typography fontWeight="bold">Cavum Conchae ("The Lower Bowl")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The cavum conchae is the larger, lower portion of the bowl-like depression that leads 
                    directly to your ear canal. It's the main "funnel" part of your ear that captures 
                    sound and directs it inward.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The lower and larger portion of the concha, below the crus of the helix, that 
                    directly leads to the external auditory meatus. Critical for in-the-ear hearing 
                    aid fitting and acoustic performance.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'meatus'} 
            onChange={handleAccordionChange('meatus')}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown />}
              aria-controls="meatus-content"
              id="meatus-header"
            >
              <Typography fontWeight="bold">External Auditory Meatus ("The Ear Canal Opening")</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    In Simple Terms:
                  </Typography>
                  <Typography paragraph>
                    The external auditory meatus is simply the opening of your ear canal - the entrance 
                    where sound travels into the canal toward your eardrum. It's like the doorway that 
                    connects the outer ear to the ear canal.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Clinical Description:
                  </Typography>
                  <Typography paragraph>
                    The aperture or opening of the external auditory canal, located at the depth of 
                    the concha. It forms the boundary between the external ear and the ear canal, and 
                    serves as a reference point for many hearing aid measurements.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ mt: 4, mb: 2 }}>
        How Pinna Anatomy Affects Hearing Aid Selection and Fitting
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1) }}>
        <Typography paragraph>
          The unique anatomy of each person's pinna significantly impacts hearing aid selection, fitting, and performance.
          Understanding these relationships is crucial for successful hearing aid fitting.
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Concha Size and Depth
              </Typography>
              <Typography paragraph variant="body2">
                <strong>Clinical Impact:</strong> The dimensions of the concha (both cymba and cavum) directly determine which 
                hearing aid styles will fit comfortably.
              </Typography>
              <Typography variant="body2">
                <strong>Fitting Considerations:</strong>
                <ul>
                  <li>A small, shallow concha may not accommodate larger in-the-ear (ITE) devices</li>
                  <li>A very deep concha may require a longer canal portion for custom hearing aids</li>
                  <li>Concha depth affects the placement of directional microphones in custom devices</li>
                  <li>For receiver-in-canal (RIC) hearing aids, concha size determines dome or mold selection</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Helix and Antihelix Prominence
              </Typography>
              <Typography paragraph variant="body2">
                <strong>Clinical Impact:</strong> The prominence and shape of these cartilaginous ridges affect behind-the-ear (BTE) 
                hearing aid stability and comfort.
              </Typography>
              <Typography variant="body2">
                <strong>Fitting Considerations:</strong>
                <ul>
                  <li>A flat or minimally defined antihelix may provide less retention for BTE devices</li>
                  <li>A prominent helix creates a deeper pocket behind the ear for BTE placement</li>
                  <li>The angle between the helix and skull impacts tubing/wire routing comfort</li>
                  <li>For open-fit devices, a tight helix-to-head spacing may cause irritation from sound tubing</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Tragus Size and Position
              </Typography>
              <Typography paragraph variant="body2">
                <strong>Clinical Impact:</strong> The tragus configuration affects retention of custom devices and insertion/removal ease.
              </Typography>
              <Typography variant="body2">
                <strong>Fitting Considerations:</strong>
                <ul>
                  <li>A large, protruding tragus may interfere with insertion of larger custom devices</li>
                  <li>A small or flat tragus provides less retention for in-the-canal (ITC) devices</li>
                  <li>Tragus position relative to the ear canal opening impacts acoustic seal</li>
                  <li>For BTE aids, tragus shape impacts earmold/dome insertion angle</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                External Auditory Meatus Orientation
              </Typography>
              <Typography paragraph variant="body2">
                <strong>Clinical Impact:</strong> The angle, size, and shape of the ear canal opening dictates custom shell design and acoustic performance.
              </Typography>
              <Typography variant="body2">
                <strong>Fitting Considerations:</strong>
                <ul>
                  <li>A narrow meatus may limit the size of components in custom devices</li>
                  <li>The angle of the canal entrance affects directional microphone placement</li>
                  <li>For CIC devices, meatus orientation determines insertion/removal direction</li>
                  <li>The first bend of the canal (just past the meatus) impacts shell comfort</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Special Anatomical Considerations:
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="error">
                Exostoses and Osteomas
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                Bony growths in the ear canal that can narrow the pathway. These require special shell modifications 
                or may contraindicate deeper-fitting devices. Often seen in people with frequent cold water exposure.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="error">
                Collapsing Canals
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                Some ear canals collapse when the jaw opens or when pressure is applied. This requires modified 
                impression techniques (open-mouth impressions) and may necessitate a canal lock feature in the shell design.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="error">
                Stenotic Ear Canals
              </Typography>
              <Typography variant="body2" sx={{ flex: 1 }}>
                Abnormally narrow ear canals (congenital or acquired) may preclude the use of standard hearing aid designs 
                and require specially-engineered ultra-slim devices or bone conduction alternatives.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), p: 2, borderRadius: 1, border: `1px solid ${theme.palette.warning.main}` }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Clinical Decision-Making Process:
          </Typography>
          <Typography variant="body2">
            <ol>
              <li><strong>Evaluate Pinna Anatomy:</strong> Carefully examine and document all relevant anatomical features</li>
              <li><strong>Consider Patient Factors:</strong> Manual dexterity, vision, lifestyle needs, and cosmetic preferences</li>
              <li><strong>Match to Technology:</strong> Select appropriate hearing aid style based on anatomical compatibility and audiological needs</li>
              <li><strong>Impression Technique:</strong> Modify impression method based on anatomical variations (open jaw, tragus pressure, etc.)</li>
              <li><strong>Shell Modifications:</strong> Request specific modification to shells based on anatomical findings (e.g., pressure relief, canal locks)</li>
              <li><strong>Verification:</strong> Confirm physical fit and acoustic performance before finalizing</li>
            </ol>
          </Typography>
        </Box>
      </Paper>

      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Importance for Hearing Aid Fitting:
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
              Custom Hearing Aid Impressions
            </Typography>
            <Typography variant="body2">
              When taking ear impressions for custom hearing aids, audiologists use these landmarks as reference points. 
              The impression material should capture the concha, tragus, and antitragus accurately to ensure proper fit.
              For deep canal fittings, the second bend of the ear canal must be captured, which is located beyond the aperture
              of the external auditory meatus.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
              Behind-the-Ear (BTE) Hearing Aids
            </Typography>
            <Typography variant="body2">
              For BTE models, the hearing aid sits behind the auricle with the sound tube running over the top of the ear
              between the helix and the head, down to the concha, and into the ear canal via an earmold or dome.
              The tragus and crus of helix serve as key landmarks for proper tubing placement.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
              In-the-Ear (ITE) Hearing Aids
            </Typography>
            <Typography variant="body2">
              ITE hearing aids fill the concha and outer portion of the ear canal. Their shell is custom-made
              based on an ear impression that uses the concha, antihelix, and tragus as boundaries. The precise
              modeling of these landmarks ensures a secure fit without pressure points.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
              Completely-in-Canal (CIC) Hearing Aids
            </Typography>
            <Typography variant="body2">
              CIC devices sit deep in the ear canal, with only a small extraction handle visible in the concha.
              The external auditory meatus and cavum conchae dimensions determine how deep the aid can be placed,
              while the second bend of the canal limits insertion depth. Accurate mapping of these structures
              is essential for comfortable all-day wear.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography paragraph>
        When fitting hearing aids, professionals must evaluate the shape, size, and unique characteristics of these landmarks
        for each patient. Anatomical variations can significantly impact which hearing aid style will provide the best 
        fit, comfort, and acoustic performance for an individual.
      </Typography>
      
      <Typography paragraph sx={{ fontStyle: 'italic' }}>
        Pro Tip: A helpful way to remember these landmarks is to think of the ear as a landscape: the helix is the 
        outer mountain range, the antihelix is the inner mountain range, the concha is the valley between them, 
        the tragus and antitragus are the gatekeepers to the tunnel (ear canal), and the lobule is the soft 
        plains below.
      </Typography>
      
      {/* Key Takeaways for Ear Landmarks */}
      <Box sx={{ mt: 3, p: 3, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 2, border: `1px solid ${alpha(theme.palette.info.main, 0.3)}` }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="info.dark">
          Key Takeaways: Pinna Landmarks & Hearing Aid Fitting
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                Anatomical Understanding
              </Typography>
              <ul>
                <li>The pinna has distinct landmarks with specific names and functions</li>
                <li>Each landmark serves as a reference point for hearing aid fitting</li>
                <li>Understanding both simple and clinical terms helps communicate with patients and professionals</li>
                <li>The 3D relationships between landmarks determine hearing aid comfort and function</li>
              </ul>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, height: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="primary">
                Clinical Application
              </Typography>
              <ul>
                <li>Different hearing aid styles interact with different landmarks</li>
                <li>Individual anatomical variations significantly impact device selection</li>
                <li>Special considerations (like collapsing canals) require modified approaches</li>
                <li>Proper landmark identification is essential for optimal hearing aid performance</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PinnaLandmarks; 