import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  Divider,
  Alert,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import InteractiveMaskingTrainer from './InteractiveMaskingTrainer';

const MaskingStep: React.FC = () => {
  const theme = useTheme();

  // Example data for masking calculation
  const plateauExample = [
    { level: 'Initial', masking: 30, threshold: 45, notes: 'Starting masking level' },
    { level: '+10 dB', masking: 40, threshold: 45, notes: 'No change in threshold' },
    { level: '+10 dB', masking: 50, threshold: 45, notes: 'No change - plateau reached' },
    { level: '+10 dB', masking: 60, threshold: 50, notes: 'Threshold shift - possible overmasking' },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography paragraph>
        In audiometric testing, masking is a critical procedure to prevent crossover of sound 
        from the test ear to the non-test ear. Proper masking ensures that the thresholds 
        obtained reflect the true sensitivity of the ear being tested.
      </Typography>

      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2">
          <strong>For New Students:</strong> Masking is one of the most challenging concepts in audiometry. Take your time to understand these principles, as proper masking is fundamental to accurate diagnosis and appropriate intervention.
        </Typography>
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              When to Mask
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Air Conduction:</strong> When the difference between air conduction thresholds in two ears exceeds the interaural attenuation (typically 40 dB for supra-aural headphones, 60+ dB for inserts)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Bone Conduction:</strong> Almost always required due to minimal interaural attenuation (assumed to be 0 dB)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Air-Bone Gap:</strong> When an air-bone gap ≥ 10 dB exists in the test ear
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Speech Audiometry:</strong> Required when the SRT or speech stimulus presentation level might cross over to the non-test ear
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Unilateral No Response:</strong> When one ear shows no response at output limits while the other ear has measurable hearing
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Masking Process
            </Typography>
            <Box component="ol" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Determine initial masking level</strong> based on the non-test ear's threshold + 10 dB safety margin
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Present the test signal</strong> at the previously determined threshold
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  If response changes, <strong>increase masking level</strong> in 10 dB steps
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Plateau is reached</strong> when threshold remains stable despite increasing masking by 10 dB twice
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Typography variant="h6" gutterBottom>
          Interaural Attenuation Values
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" gutterBottom>
              Supra-aural Headphones
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li><Typography variant="body2">250 Hz: 40 dB</Typography></li>
              <li><Typography variant="body2">500 Hz: 40 dB</Typography></li>
              <li><Typography variant="body2">1000 Hz: 40 dB</Typography></li>
              <li><Typography variant="body2">2000 Hz: 45 dB</Typography></li>
              <li><Typography variant="body2">4000 Hz: 50 dB</Typography></li>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" gutterBottom>
              Insert Earphones
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li><Typography variant="body2">250 Hz: 60 dB</Typography></li>
              <li><Typography variant="body2">500 Hz: 60 dB</Typography></li>
              <li><Typography variant="body2">1000 Hz: 60 dB</Typography></li>
              <li><Typography variant="body2">2000 Hz: 70 dB</Typography></li>
              <li><Typography variant="body2">4000 Hz: 70 dB</Typography></li>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" gutterBottom>
              Bone Conduction
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li><Typography variant="body2">250 Hz: 0 dB</Typography></li>
              <li><Typography variant="body2">500 Hz: 0 dB</Typography></li>
              <li><Typography variant="body2">1000 Hz: 0-5 dB</Typography></li>
              <li><Typography variant="body2">2000 Hz: 0-10 dB</Typography></li>
              <li><Typography variant="body2">4000 Hz: 0-15 dB</Typography></li>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              Important: For clinical purposes, interaural attenuation in bone conduction is generally assumed to be 0 dB across all frequencies.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Headphones vs. Insert Earphones for Masking
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Supra-aural Headphones
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2" paragraph>
                  Lower interaural attenuation (40-50 dB) compared to inserts
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  More likely to require masking due to greater potential for crossover
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Can create a significant occlusion effect during bone conduction testing
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Standard in many clinical settings, but not ideal for patients with significant asymmetry
                </Typography>
              </li>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Insert Earphones
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2" paragraph>
                  Higher interaural attenuation (60-70 dB) – reduces need for masking
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Creates less occlusion effect during bone conduction testing
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Improved patient comfort during extended testing
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Preferred option</strong> when significant asymmetry exists between ears
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        The Occlusion Effect
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Typography variant="body2" paragraph>
          The occlusion effect occurs when an earphone covers the ear canal during bone conduction testing, 
          creating a closed space that artificially enhances low-frequency sounds (typically below 1000 Hz).
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(211, 47, 47, 0.05)',
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Clinical Impact of Occlusion Effect
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      Can artificially improve bone conduction thresholds by 5-20 dB in low frequencies (250-500 Hz)
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      May lead to underestimation of conductive hearing loss
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Most significant when testing patients with normal cochlear function
                    </Typography>
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)',
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Managing the Occlusion Effect
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      Use insert earphones with deeper insertion (reduces occlusion effect)
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      Apply correction factors based on Edgerton & Klodd's research:
                      <br />• 250 Hz: Add 10-15 dB to masking level
                      <br />• 500 Hz: Add 10 dB to masking level
                      <br />• 1000 Hz: Add 5 dB to masking level
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Consider alternative masking methods for difficult cases
                    </Typography>
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
          Insert Earphones and Occlusion Effect: Updated Clinical Procedures
        </Typography>
        
        <Box sx={{ 
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 1,
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
          mb: 2
        }}>
          <Typography variant="body2" paragraph>
            <strong>Depth of Insertion Matters:</strong> According to Edgerton & Klodd's research, the occlusion effect is significantly reduced with deeper insertion of insert earphones (15-16mm). The effectiveness of the insertion depth is directly correlated with the magnitude of occlusion effect reduction.
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Clinical Protocol for Insert Earphones During BC Testing:
          </Typography>
          
          <Box component="ol" sx={{ pl: 3 }}>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Proper insertion technique:</strong> Insert the foam tip so that the outer edge is flush with the entrance to the ear canal. Edgerton & Klodd found that deeper insertion significantly reduces occlusion effect magnitude.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Apply correction factors when needed:</strong> Based on updated research:
                <br />• 250 Hz: Add 5-8 dB to masking level for deep insertion
                <br />• 500 Hz: Add 3-5 dB to masking level for deep insertion
                <br />• 1000 Hz: Generally no correction needed
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Document insert depth:</strong> Note the insertion depth in your clinical documentation, as this affects the degree of occlusion effect.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Monitor for patient feedback:</strong> Ask the patient if their own voice sounds louder or "hollow" when the inserts are in place, which indicates occlusion effect is present.
              </Typography>
            </li>
          </Box>
        </Box>
        
        <Box sx={{ 
          border: `1px dashed ${theme.palette.warning.main}`,
          borderRadius: 1,
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(237, 108, 2, 0.08)' : 'rgba(237, 108, 2, 0.05)'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Important Clinical Distinction
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Why occlusion effect matters during masking:</strong> When masking the non-test ear during bone conduction testing, the masking earphone creates an occlusion effect that can artificially improve bone conduction thresholds in the masked ear. Edgerton & Klodd's research demonstrated that:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography variant="body2" paragraph>
                <strong>With supra-aural headphones:</strong> The occlusion effect is most pronounced, especially in patients with normal cochlear function. Apply the full correction factors to masking levels.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>With deeply inserted earphones:</strong> The occlusion effect is substantially reduced but not eliminated, requiring minimal correction factors.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Alternative "open ear" techniques:</strong> When precise bone conduction thresholds are critical, consider specialized techniques like "open ear" masking where the contralateral ear is masked with the insert earphone placed just at the entrance of the ear canal.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Clinical decision:</strong> When the occlusion effect cannot be controlled adequately, it may be necessary to accept some degree of measurement error. Document this limitation in your clinical notes.
              </Typography>
            </li>
          </Box>
        </Box>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Dynamic Machine Learning Masking Approach
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Typography variant="body2" paragraph>
          Recent research published in 2020 has introduced dynamic machine learning approaches to audiometric masking that can potentially simplify the masking process while maintaining accuracy.
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Benefits of Dynamic Masking
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      Automatically adjusts masking levels based on real-time patient responses
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      Reduces test time compared to traditional clinical masking procedures
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      Helps prevent crossover detection without requiring complex manual calculations
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Particularly effective for patients with asymmetric hearing loss
                    </Typography>
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Implementation Approach
                </Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Initial estimation:</strong> The system estimates the hearing threshold in both ears
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Adaptive masking:</strong> Masking noise is dynamically adjusted based on the estimated thresholds and interaural attenuation values
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Machine learning optimization:</strong> The system learns and adjusts its approach based on the patient's responses
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>Verification:</strong> Final thresholds are verified to ensure they represent true ear-specific hearing sensitivity
                    </Typography>
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Research Finding:</strong> According to the 2020 study by Heisey et al. published in the Journal of the American Academy of Audiology ("Automated Pure-Tone Audiometry Using Active Machine Learning"), dynamically masked audiograms using machine learning achieved accurate threshold estimates with reduced test time compared to conventional clinical masking procedures. The research showed a mean absolute difference of only 2.6-4.9 dB between machine learning and conventional masking methods.
          </Typography>
        </Alert>
      </Paper>
      
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Understanding Crossover
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Box sx={{ 
          position: 'relative', 
          my: 2,
          mx: 'auto',
          maxWidth: 700,
          p: 2,
        }}>
          {/* Visual diagram of crossover */}
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={5} sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                width: '100%', 
                p: 2, 
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                position: 'relative'
              }}>
                <Typography variant="subtitle1" gutterBottom>
                  Right Ear
                </Typography>
                <Typography variant="body2" paragraph>
                  Threshold: 70 dB HL
                </Typography>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.primary.main,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto'
                }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    R
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={2} sx={{ textAlign: 'center' }}>
              <Box sx={{ transform: 'rotate(10deg)', my: 2 }}>
                <ArrowForwardIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
              </Box>
              
              <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                Sound crosses over
              </Typography>
              
              <Box sx={{ transform: 'rotate(-10deg)', my: 2 }}>
                <ArrowForwardIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
              </Box>
            </Grid>
            
            <Grid item xs={5} sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                width: '100%', 
                p: 2, 
                border: `2px solid ${theme.palette.secondary.main}`,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.1)' : 'rgba(156, 39, 176, 0.05)',
                position: 'relative'
              }}>
                <Typography variant="subtitle1" gutterBottom>
                  Left Ear
                </Typography>
                <Typography variant="body2" paragraph>
                  Threshold: 20 dB HL
                </Typography>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.secondary.main,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto'
                }}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    L
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            border: `1px dashed ${theme.palette.warning.main}`, 
            p: 2, 
            mt: 3, 
            borderRadius: 1,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(237, 108, 2, 0.08)' : 'rgba(237, 108, 2, 0.05)'
          }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.warning.main }}>
              Crossover Problem Example
            </Typography>
            <Typography variant="body2" paragraph>
              When testing the right ear at 80 dB, the sound crosses over to the left ear.
            </Typography>
            <Typography variant="body2" paragraph>
              With 40 dB interaural attenuation, the left ear receives 40 dB (80 - 40 = 40 dB).
            </Typography>
            <Typography variant="body2">
              Since the left ear has better hearing (20 dB threshold), it will detect the 40 dB crossover signal, 
              leading to a false response that appears to come from the right ear.
            </Typography>
          </Box>
        </Box>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Air vs. Bone Conduction Masking
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Air Conduction Masking
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Masking Required When:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2" paragraph>
                  The difference between AC thresholds exceeds interaural attenuation
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  The AC threshold in the test ear exceeds the BC threshold of the non-test ear by more than the interaural attenuation
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  There's a large asymmetry between ears, especially when testing the poorer ear
                </Typography>
              </li>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Bone Conduction Masking
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Key Considerations:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li>
                <Typography variant="body2" paragraph>
                  Interaural attenuation for bone conduction is clinically assumed to be 0 dB
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  This means the same signal reaches both cochleas simultaneously, regardless of oscillator placement
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Always mask the non-test ear during bone conduction testing if there is any asymmetry
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Must account for occlusion effect when masking with earphones during BC testing
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Masking Calculation Example
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Typography variant="subtitle2" paragraph>
          Plateau Technique Example: Testing Right Ear, Masking Left Ear at 1000 Hz
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Frequency-Specific Considerations:</strong> Effective masking levels also depend on frequency-specific differences between ears. Lower frequencies typically require higher effective masking levels due to better bone conduction thresholds in most patients, while high-frequency asymmetries may require special attention due to potential overmasking issues. Always consider the specific frequency being tested when determining appropriate masking levels.
          </Typography>
        </Alert>
        
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)' }}>
                <TableCell>Masking Step</TableCell>
                <TableCell>Masking Level (dB)</TableCell>
                <TableCell>Right Ear Threshold (dB)</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plateauExample.map((row, index) => (
                <TableRow key={index} sx={{ 
                  bgcolor: index === 3 ? 
                    theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(211, 47, 47, 0.05)' : 
                    index === 2 ? 
                      theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)' :
                      'inherit'
                }}>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.masking}</TableCell>
                  <TableCell>{row.threshold}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Card variant="outlined" sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(46, 125, 50, 0.05)',
          border: `1px solid ${theme.palette.success.main}`
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Masking Level Calculation
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" paragraph>
              <strong>Initial masking level</strong> = Left ear threshold (25 dB) + 10 dB safety margin = 35 dB
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Minimum effective masking</strong> = Right ear threshold (45 dB) - Interaural attenuation (40 dB) + 10 dB safety = 15 dB
            </Typography>
            <Typography variant="body2">
              <strong>Maximum masking before overmasking</strong> = Left ear threshold (25 dB) + Interaural attenuation (40 dB) - 5 dB safety = 60 dB
            </Typography>
          </Box>
        </Card>
        
        <Typography variant="subtitle2" gutterBottom>
          Steps to Find the Plateau:
        </Typography>
        <Box component="ol" sx={{ pl: 3 }}>
          <li>
            <Typography variant="body2" paragraph>
              Start with <strong>initial masking level</strong> of 30 dB (rounded down from 35 dB for simplicity)
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              Test the right ear at the previously established unmasked threshold (45 dB)
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              Increase masking by 10 dB and retest until the threshold remains stable for 2 consecutive increases (plateau reached at 50 dB masking)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              When the threshold shifts (as in the last row), you've likely reached overmasking and should use the previous stable threshold
            </Typography>
          </li>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Speech Audiometry Masking
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Typography variant="body2" paragraph>
          Speech testing requires specialized masking considerations due to the broadband nature of speech signals.
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">When to Mask During Speech Testing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  When the speech presentation level minus the interaural attenuation exceeds the non-test ear's SRT or PTA (by 40 dB for supra-aural headphones, 60 dB for inserts)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  For SRT testing: When the estimated SRT in the test ear exceeds the non-test ear's SRT by more than the interaural attenuation
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  For word recognition: When presentation level exceeds the non-test ear's PTA plus interaural attenuation
                </Typography>
              </li>
            </Box>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Types of Speech Masking Noise</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" paragraph>
                  <strong>Speech Noise:</strong> Filtered to match the speech spectrum, most effective for masking speech signals
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" paragraph>
                  <strong>Speech-Shaped Noise:</strong> Closely follows the spectrum of speech, providing efficient masking without excessive noise
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Multi-talker Babble:</strong> Recordings of multiple speakers talking simultaneously, providing both energetic and informational masking
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Speech Masking Level Calculation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" paragraph>
              <strong>Initial masking level</strong> = Non-test ear SRT (or PTA) + 10 dB safety margin
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Effective masking range:</strong> The masking level should be sufficient to prevent crossover but not so high as to create overmasking. A good range is typically between:
            </Typography>
            <Box sx={{ pl: 3 }}>
              <Typography variant="body2" paragraph>
                <strong>Minimum:</strong> Non-test ear SRT + 10 dB
              </Typography>
              <Typography variant="body2">
                <strong>Maximum:</strong> Non-test ear SRT + interaural attenuation - 5 dB
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Types of Masking Noise
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2" gutterBottom>
              Narrow Band Noise
            </Typography>
            <Typography variant="body2">
              <strong>Preferred for pure tone testing.</strong> Contains energy centered around the test frequency 
              with a narrow bandwidth. Most efficient for masking pure tones without unnecessarily masking 
              adjacent frequencies.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2" gutterBottom>
              White Noise
            </Typography>
            <Typography variant="body2">
              Contains equal energy across all frequencies. Generally not used in clinical audiometry 
              because it is less efficient and may cause overmasking.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Note:</strong> Masking procedures are more complex and can be challenging for beginners. Proper masking is essential for accurate threshold determination and appropriate treatment planning.
        </Typography>
      </Alert>
      
      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Common Masking Errors:</strong> Insufficient masking leads to false better thresholds, while overmasking can lead to false worse thresholds. Always follow proper plateau technique to avoid these errors.
        </Typography>
      </Alert>

      <Alert severity="success" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Remembering when to mask during bone conduction:</strong> Clinical practice assumes 0 dB interaural attenuation for bone conduction. This means the signal essentially reaches both cochleas simultaneously regardless of placement, making masking necessary in almost all bone conduction testing where there is any asymmetry between ears.
        </Typography>
      </Alert>
      
      {/* 
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Practice Your Masking Skills
      </Typography>
      
      <InteractiveMaskingTrainer />
      */}
    </Box>
  );
};

export default MaskingStep; 