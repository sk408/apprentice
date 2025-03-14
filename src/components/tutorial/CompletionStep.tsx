import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  Alert
} from '@mui/material';
import { 
  ArrowForward, 
  VolumeUp, 
  BarChart, 
  School,
  Info
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface CompletionStepProps {
  onComplete: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onComplete }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Congratulations!
      </Typography>
      <Typography variant="body1" paragraph>
        You've learned the essentials of pure tone audiometry testing using the Hughson-Westlake procedure.
      </Typography>
      <Typography variant="body1" paragraph>
        Now it's time to put your knowledge into practice with virtual patients.
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 2,
          my: 3
        }}
      >
        <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: 'center', bgcolor: theme.palette.background.paper }}>
          <VolumeUp fontSize="large" color="primary" />
          <Typography variant="subtitle1" gutterBottom>
            Present Tones
          </Typography>
          <Typography variant="body2">
            Practice presenting tones at various frequencies and intensities
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: 'center', bgcolor: theme.palette.background.paper }}>
          <BarChart fontSize="large" color="primary" />
          <Typography variant="subtitle1" gutterBottom>
            Track Thresholds
          </Typography>
          <Typography variant="body2">
            Plot thresholds on an audiogram to visualize hearing sensitivity
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: 'center', bgcolor: theme.palette.background.paper }}>
          <School fontSize="large" color="primary" />
          <Typography variant="subtitle1" gutterBottom>
            Receive Feedback
          </Typography>
          <Typography variant="body2">
            Get instant feedback on your testing technique and accuracy
          </Typography>
        </Paper>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Continue Your Learning Journey
      </Typography>
      <Typography variant="body1" paragraph>
        Pure tone audiometry is just the beginning! Explore these additional topics to enhance your audiology skills:
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Ear Anatomy
              </Typography>
              <Typography variant="body2" paragraph>
                Explore detailed 3D models of the outer, middle, and inner ear structures.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/ear-anatomy" 
                color="secondary" 
                size="small"
                endIcon={<ArrowForward />}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.info.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Otoscopy
              </Typography>
              <Typography variant="body2" paragraph>
                Master otoscopic examination techniques and learn to identify common ear conditions.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/otoscopy" 
                color="info" 
                size="small"
                endIcon={<ArrowForward />}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.warning.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Hearing Aid Follow-Up
              </Typography>
              <Typography variant="body2" paragraph>
                Learn effective procedures for hearing aid follow-up appointments and patient counseling.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/followup" 
                color="warning" 
                size="small"
                endIcon={<ArrowForward />}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ height: '100%', borderLeft: `4px solid ${theme.palette.error.main}` }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Troubleshooting
              </Typography>
              <Typography variant="body2" paragraph>
                Reference guide for identifying and resolving common hearing aid issues.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/troubleshooting" 
                color="error" 
                size="small"
                endIcon={<ArrowForward />}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
        <Typography variant="subtitle2" gutterBottom>
          Advanced Topic: Real Ear Measurements
        </Typography>
        <Typography variant="body2">
          Once you've mastered the basics, dive into Real Ear Measurements (REM) to learn advanced hearing aid verification techniques for optimal patient outcomes.
          <Button 
            component={RouterLink} 
            to="/real-ear-measurement" 
            color="info" 
            size="small" 
            sx={{ ml: 1 }}
            endIcon={<ArrowForward />}
          >
            Explore REM
          </Button>
        </Typography>
      </Alert>
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={onComplete}
        sx={{ mt: 2 }}
      >
        Start Testing
      </Button>
    </Box>
  );
};

export default CompletionStep; 