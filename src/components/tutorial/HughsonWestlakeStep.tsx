import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { 
  VolumeUp, 
  AccessTime, 
  HearingOutlined,
  NavigateNext,
  Help,
  ErrorOutline,
  CheckCircleOutline
} from '@mui/icons-material';
import audioService from '../../services/AudioService';
import { Frequency } from '../../interfaces/AudioTypes';

const HughsonWestlakeStep: React.FC = () => {
  const theme = useTheme();
  const [playingTone, setPlayingTone] = useState<number | null>(null);

  // Play a sample tone
  const playSampleTone = (frequency: number) => {
    // Resume audio context on first interaction
    audioService.resumeAudioContext().then(() => {
      // Set the currently playing tone
      setPlayingTone(frequency);
      
      // Play a medium-loud tone (40 dB) in the right ear for 1 second
      audioService.playTone(frequency as Frequency, 40, 'right', 1000);
      
      // Reset playing status after tone completes
      setTimeout(() => {
        setPlayingTone(null);
      }, 1100); // Slightly longer than tone duration to ensure it completes
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography paragraph>
        The Hughson-Westlake procedure is the standard method for determining 
        hearing thresholds. It is sometimes called the "5-up, 10-down" method 
        because of its testing pattern.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Step-by-Step Procedure
            </Typography>
            <Box component="ol" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Begin at 1000 Hz</strong> in the better ear (or right ear if unknown)
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Present an audible tone</strong> (typically 40 dB HL for adults with no known hearing loss)
                </Typography>
                <Typography variant="body2" paragraph sx={{ pl: 2, fontSize: '0.9rem', color: theme.palette.text.secondary }}>
                  <strong>Clinical tip:</strong> Adjust this initial level based on case history. For patients reporting normal 
                  hearing, you might start at 30 dB HL; for those with known hearing loss, consider starting at a higher level 
                  to ensure audibility.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  If the patient responds, <strong>decrease by 10 dB</strong> and present again
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  Continue decreasing by 10 dB <strong>each time the patient responds</strong> until no response is obtained
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  When no response is obtained, <strong>increase by 5 dB</strong> and present the tone
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Threshold is established</strong> when patient responds to at least 2 out of 3 presentations 
                  at the same level (note: 2 out of 2 is also acceptable)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Test other frequencies</strong> in order: 2000, 4000, 8000, then 500, 250 Hz
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom>
              Testing Tips
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <AccessTime fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Presentation Timing
              </Typography>
              <Typography variant="body2" paragraph>
                • Present tones for 1-2 seconds<br />
                • Vary intervals between presentations (1-5 seconds)<br />
                • Avoid rhythmic patterns that patients might anticipate
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <VolumeUp fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Signal Quality
              </Typography>
              <Typography variant="body2" paragraph>
                • Ensure proper headphone/bone conductor placement<br />
                • Watch for extraneous noise or distractions<br />
                • Note any inconsistent responses for follow-up
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                <HearingOutlined fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Response Instructions
              </Typography>
              <Typography variant="body2">
                • Instruct patients to respond when they hear a tone, no matter how faint<br />
                • Accept consistent response method (finger raise, button press, etc.)<br />
                • Remind patients not to guess - only respond when they're sure
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Alert severity="warning" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Important:</strong> Always retest 1000 Hz at the end to verify test reliability. A difference of more than 5 dB suggests inconsistent responses and requires retesting.
        </Typography>
      </Alert>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Practical Demonstration: Up 5, Down 10 Procedure
      </Typography>
      <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: theme.palette.background.paper }}>
        <Typography variant="body2" paragraph>
          The interactive example below demonstrates a typical testing sequence. Remember, in actual testing, you would respond to 
          the patient's actual responses - <strong>always</strong> decreasing by 10 dB when they respond and increasing by 5 dB when they don't.
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Example Sequence (with patient responses)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 40 dB (starting level)">
                  <IconButton 
                    onClick={() => playSampleTone(1000)} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null && playingTone !== 1000}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 40 dB → <strong>Patient responds</strong> → Decrease by 10 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 30 dB">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 30, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 30 dB → <strong>Patient responds</strong> → Decrease by 10 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 20 dB">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 20, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 20 dB → <strong>Patient responds</strong> → Decrease by 10 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 10 dB">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 10, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 10 dB → <strong>Patient responds</strong> → Decrease by 10 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 0 dB (likely inaudible)">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 0, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 0 dB → <strong>No response</strong> → Increase by 5 dB</Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Threshold Determination
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 5 dB">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 5, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 5 dB → <strong>Patient responds</strong> → Decrease by 10 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at -5 dB (inaudible)">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        // For demo purposes only - in reality -5 dB would be inaudible
                        audioService.playTone(1000 as Frequency, 0, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at -5 dB → <strong>No response</strong> → Increase by 5 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 0 dB">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 0, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 0 dB → <strong>No response</strong> → Increase by 5 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 5 dB again">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 5, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 5 dB → <strong>Patient responds (1st response)</strong></Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at -5 dB again (after response)">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        // For demo purposes only - in reality -5 dB would be inaudible
                        audioService.playTone(1000 as Frequency, 0, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Decrease to -5 dB → <strong>No response</strong> → Increase by 5 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 0 dB again">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 0, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 0 dB → <strong>No response</strong> → Increase by 5 dB</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Play 1000 Hz at 5 dB final test">
                  <IconButton 
                    onClick={() => {
                      audioService.resumeAudioContext().then(() => {
                        setPlayingTone(1000);
                        audioService.playTone(1000 as Frequency, 5, 'right', 1000);
                        setTimeout(() => setPlayingTone(null), 1100);
                      });
                    }} 
                    color={playingTone === 1000 ? "secondary" : "primary"}
                    disabled={playingTone !== null}
                    size="small"
                  >
                    <VolumeUp />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2">Present at 5 dB → <strong>Patient responds (2nd response)</strong></Typography>
              </Box>
              
              <Box sx={{ bgcolor: alpha(theme.palette.success.light, 0.1), p: 1, borderRadius: 1, mt: 1, border: `1px solid ${theme.palette.success.light}` }}>
                <Typography variant="body2">
                  <strong>Result:</strong> Threshold is 5 dB at 1000 Hz. 
                  The patient has responded 2 out of 2 times at 5 dB after multiple descending/ascending sequences.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Key concept:</strong> We continued to follow the "decrease by 10 dB after a response" rule 
                  throughout testing, even during threshold determination. This ensures we've truly found the softest 
                  sound the patient can hear.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Note:</strong> While negative dB HL values (-5 to -10 dB HL) exist on audiometers, they represent better-than-average 
                  hearing and are relatively rare in clinical settings. Most normal-hearing individuals have thresholds 
                  between 0-20 dB HL.
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  This demonstration shows how the procedure may require multiple "approaches" to the threshold level. 
                  We decrease by 10 dB after every response (even during threshold testing), and increase by 5 dB after 
                  no response. This creates a "bracketing" effect that homes in on the true threshold.
                </Typography>
              </Alert>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Testing Process Flowchart
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: theme.palette.background.paper }}>
        <Box sx={{ 
          position: 'relative', 
          my: 2,
          mx: 'auto',
          maxWidth: 600,
          p: 2,
          borderRadius: 1,
          bgcolor: alpha(theme.palette.background.default, 0.4),
          border: `1px solid ${theme.palette.divider}`
        }}>
          {/* Flowchart elements */}
          <Box sx={{ 
            p: 1.5, 
            border: `2px solid ${theme.palette.primary.main}`, 
            borderRadius: 1,
            width: '70%',
            mx: 'auto',
            textAlign: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            mb: 2
          }}>
            <Typography variant="subtitle2">
              Begin at 1000 Hz
            </Typography>
            <Typography variant="body2">
              Present at clearly audible level (40 dB)
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', my: 1 }}>
            <NavigateNext sx={{ transform: 'rotate(90deg)' }} />
          </Box>
          
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}>
            <Box sx={{ textAlign: 'center', width: '30%' }}>
              <Box sx={{ 
                p: 1, 
                border: `2px solid ${theme.palette.info.main}`, 
                borderRadius: 1,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                mb: 1
              }}>
                <Typography variant="body2">
                  Response?
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', width: '70%', justifyContent: 'space-around' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Yes</Typography>
                <NavigateNext sx={{ transform: 'rotate(90deg)' }} />
                <Box sx={{ 
                  p: 1, 
                  border: `2px solid ${theme.palette.success.main}`, 
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  width: 120
                }}>
                  <Typography variant="body2">
                    Decrease by 10 dB
                  </Typography>
                </Box>
                <NavigateNext sx={{ transform: 'rotate(90deg)' }} />
                <Typography variant="body2" color="text.secondary">(loop back to "Response?")</Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">No</Typography>
                <NavigateNext sx={{ transform: 'rotate(90deg)' }} />
                <Box sx={{ 
                  p: 1, 
                  border: `2px solid ${theme.palette.warning.main}`, 
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  width: 120
                }}>
                  <Typography variant="body2">
                    Increase by 5 dB
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'center', my: 1 }}>
            <NavigateNext sx={{ transform: 'rotate(90deg)' }} />
          </Box>
          
          <Box sx={{ 
            p: 1.5, 
            border: `2px solid ${theme.palette.secondary.main}`, 
            borderRadius: 1,
            width: '70%',
            mx: 'auto',
            textAlign: 'center',
            bgcolor: alpha(theme.palette.secondary.main, 0.05)
          }}>
            <Typography variant="subtitle2">
              Present up to 3 times at same level
            </Typography>
            <Typography variant="body2">
              2+ responses = threshold (2/2 or 2/3)
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Decision Making During Testing
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.primary.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                <Help color="primary" sx={{ mr: 1 }} />
                When to Repeat Presentations
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="body2" paragraph>
                <strong>Repeat a presentation when:</strong>
              </Typography>
              <List dense disablePadding>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• External noise occurs during tone presentation</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Patient appears distracted or uncertain</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Patient responds too early (false positive)</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Patient takes unusually long to respond</Typography>
                </ListItem>
              </List>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                Always wait 2-3 seconds before repeating to avoid confusion.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.warning.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                <ErrorOutline color="warning" sx={{ mr: 1 }} />
                Managing Inconsistent Responses
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="body2" paragraph>
                <strong>When responses are inconsistent:</strong>
              </Typography>
              <List dense disablePadding>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Re-explain instructions clearly</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Try a slightly longer tone duration</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Consider testing at a different frequency and returning</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Rest the patient if they seem fatigued</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Document inconsistencies in your notes</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.success.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                <CheckCircleOutline color="success" sx={{ mr: 1 }} />
                When to Move to Next Frequency
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="body2" paragraph>
                <strong>Proceed to the next frequency when:</strong>
              </Typography>
              <List dense disablePadding>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Threshold is established (at least 2 responses, either 2/2 or 2/3)</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• You've repeated measurements for verification</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• The result is consistent with adjacent frequencies</Typography>
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <Typography variant="body2">• Result is properly documented on the audiogram</Typography>
                </ListItem>
              </List>
              <Alert severity="info" sx={{ mt: 1.5 }} variant="outlined">
                <Typography variant="body2">
                  Retest 1000 Hz after testing all frequencies to confirm reliability.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HughsonWestlakeStep; 