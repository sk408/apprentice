import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Alert
} from '@mui/material';
import { TestSession, HearingProfile, ThresholdPoint } from '../../interfaces/AudioTypes';
import testingService from '../../services/TestingService';

interface ResultsDialogProps {
  open: boolean;
  onClose: () => void;
  onFinish: (session: TestSession) => void;
  session: TestSession;
  patient: HearingProfile;
  thresholds: ThresholdPoint[];
}

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  open,
  onClose,
  onFinish,
  session,
  patient,
  thresholds
}) => {
  const handleFinish = () => {
    onClose();
    
    // Make sure the session is properly completed with results
    if (session && !session.completed) {
      // Explicitly call completeSession to ensure results are calculated
      const completedSession = testingService.completeSession();
      if (completedSession) {
        console.log('Session completed with results:', completedSession.results);
        onFinish(completedSession);
      } else {
        // Fall back to the current session if completeSession fails
        console.warn('Failed to complete session, using current session instead');
        onFinish(session);
      }
    } else {
      // Session already completed
      onFinish(session);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Patient Audiogram Results</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Patient Information
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Patient ID:</strong> {patient.id}
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {patient.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Hearing Loss Type:</strong> {patient.hearingLossType.replace('_', ' ')}
              </Typography>
              <Typography variant="body2">
                <strong>Test Date:</strong> {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Your Test Results vs. Actual Thresholds
          </Typography>
          <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
            <Typography variant="body2" paragraph>
              Below is a comparison between the thresholds you measured and the patient's actual thresholds.
              This feedback helps you improve your audiometric testing skills.
            </Typography>
            
            {/* Add false positives information - only show if test is complete */}
            {session?.completed && session?.results && (
              <Alert 
                severity={session.results.falsePositives > 5 ? "warning" : "info"} 
                sx={{ mb: 2 }}
              >
                <Typography variant="subtitle2">
                  False Positives: {session.results.falsePositives || 0}
                </Typography>
                <Typography variant="body2">
                  False positives occur when a patient indicates hearing a tone when none was presented. 
                  A high number of false positives ({'>'}5) may indicate an unreliable test subject or a need for clearer instructions.
                </Typography>
              </Alert>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Left Ear Thresholds {patient.thresholds.some(t => t.ear === 'left' && t.testType === 'bone') ? '(>)' : '(O)'}
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Frequency (Hz)</TableCell>
                      <TableCell>Your Result (dB)</TableCell>
                      <TableCell>Actual (dB)</TableCell>
                      <TableCell>Difference</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {thresholds
                      .filter(t => t.ear === 'left')
                      .map(threshold => {
                        // Find actual threshold for comparison
                        const actualThreshold = patient.thresholds.find(
                          t => t.ear === 'left' && t.frequency === threshold.frequency
                        );
                        const diff = actualThreshold 
                          ? threshold.hearingLevel - actualThreshold.hearingLevel 
                          : 0;
                        return (
                          <TableRow key={`left-${threshold.frequency}`}>
                            <TableCell>{threshold.frequency}</TableCell>
                            <TableCell>{threshold.hearingLevel}</TableCell>
                            <TableCell>
                              {actualThreshold ? actualThreshold.hearingLevel : 'N/A'}
                            </TableCell>
                            <TableCell 
                              sx={{ 
                                color: Math.abs(diff) <= 5 
                                  ? 'success.main' 
                                  : Math.abs(diff) <= 10 
                                  ? 'warning.main' 
                                  : 'error.main'
                              }}
                            >
                              {diff > 0 ? `+${diff}` : diff}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Right Ear Thresholds {patient.thresholds.some(t => t.ear === 'right' && t.testType === 'bone') ? '(<)' : '(X)'}
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Frequency (Hz)</TableCell>
                      <TableCell>Your Result (dB)</TableCell>
                      <TableCell>Actual (dB)</TableCell>
                      <TableCell>Difference</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {thresholds
                      .filter(t => t.ear === 'right')
                      .map(threshold => {
                        // Find actual threshold for comparison
                        const actualThreshold = patient.thresholds.find(
                          t => t.ear === 'right' && t.frequency === threshold.frequency
                        );
                        const diff = actualThreshold 
                          ? threshold.hearingLevel - actualThreshold.hearingLevel 
                          : 0;
                        return (
                          <TableRow key={`right-${threshold.frequency}`}>
                            <TableCell>{threshold.frequency}</TableCell>
                            <TableCell>{threshold.hearingLevel}</TableCell>
                            <TableCell>
                              {actualThreshold ? actualThreshold.hearingLevel : 'N/A'}
                            </TableCell>
                            <TableCell 
                              sx={{ 
                                color: Math.abs(diff) <= 5 
                                  ? 'success.main' 
                                  : Math.abs(diff) <= 10 
                                  ? 'warning.main' 
                                  : 'error.main'
                              }}
                            >
                              {diff > 0 ? `+${diff}` : diff}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFinish}
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 