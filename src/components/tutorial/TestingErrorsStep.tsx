import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  Divider,
  Alert
} from '@mui/material';
import { 
  School
} from '@mui/icons-material';

const TestingErrorsStep: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography paragraph>
        Being aware of common testing errors will help you improve your testing technique 
        and produce more accurate results. Recognizing and avoiding these errors is 
        essential for obtaining reliable audiometric data.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom color="error">
              Procedural Errors
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Improper Step Sizes:</strong> Not using the 10 dB down, 5 dB up approach consistently
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Rhythmic Presentations:</strong> Creating patterns that allow patients to anticipate tones
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Threshold Definition:</strong> Not requiring 2 out of 3 responses at threshold level
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Visual Cues:</strong> Giving unintentional visual hints when presenting tones
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Skipping Frequencies:</strong> Not testing all required frequencies or ears
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: theme.palette.background.paper }}>
            <Typography variant="h6" gutterBottom color="error">
              Technical Errors
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Inadequate Masking:</strong> Not masking when necessary or using incorrect levels
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Overmasking:</strong> Using excessive masking that crosses back to test ear
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Equipment Placement:</strong> Improper headphone or bone conductor positioning
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Ambient Noise:</strong> Testing in environments with excessive background noise
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Collapsing Ear Canals:</strong> Not identifying or addressing this issue in elderly patients, which can affect both pure tone thresholds and impedance measurements
                </Typography>
              </li>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
        <Typography variant="h6" gutterBottom>
          <School fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Educational Best Practices
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Practice regularly</strong> with different types of hearing loss patterns
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Request feedback</strong> from supervisors or experienced audiologists
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Analyze your accuracy</strong> by comparing your results to known thresholds
                </Typography>
              </li>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Record test duration</strong> to monitor efficiency improvements
                </Typography>
              </li>
              <li>
                <Typography variant="body2" paragraph>
                  <strong>Review difficult cases</strong> to understand challenging testing scenarios
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  <strong>Stay updated</strong> on best practices and guidelines
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Patient-Related Challenges
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2" gutterBottom>
              Patient Reliability
            </Typography>
            <Typography variant="body2" paragraph>
              Some patients may have difficulty understanding instructions or may be inconsistent in their responses. 
              Consider using:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li><Typography variant="body2">Clear, simple instructions</Typography></li>
              <li><Typography variant="body2">Demonstrations before actual testing</Typography></li>
              <li><Typography variant="body2">Frequent reconfirmation of thresholds</Typography></li>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
            <Typography variant="subtitle2" gutterBottom>
              Special Populations
            </Typography>
            <Typography variant="body2" paragraph>
              Modify your approach for:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <li><Typography variant="body2">Children (make testing game-like)</Typography></li>
              <li><Typography variant="body2">Elderly (allow more time, check for collapsing ear canals)</Typography></li>
              <li><Typography variant="body2">Non-native speakers (use translated instructions or demonstrations)</Typography></li>
              <li><Typography variant="body2">Patients with cognitive impairments (simplify instructions, use more practice trials)</Typography></li>
              <li><Typography variant="body2">Patients with tinnitus (use pulsed tones, carefully explain distinction between tinnitus and test tones)</Typography></li>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Alert severity="success" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> Audiometric testing improves with practice. Being aware of common errors and actively working to avoid them will make you a more effective clinician over time.
        </Typography>
      </Alert>
    </Box>
  );
};

export default TestingErrorsStep; 