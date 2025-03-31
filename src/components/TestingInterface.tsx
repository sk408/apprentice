import { useState } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Grid,
  IconButton,
  Tooltip,
  LinearProgress,
  Typography,
  Paper,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse
} from '@mui/material';
import {
  VolumeUp,
  KeyboardTab,
  MenuBook,
  AssessmentOutlined,
  CheckCircleOutline,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { 
  TestSession, 
  HearingProfile,
  ThresholdPoint,
  TestType
} from '../interfaces/AudioTypes';
import { useTheme, alpha } from '@mui/material/styles';
import useAudioTest from '../hooks/useAudioTest';
import testingService from '../services/TestingService';

// Import our component modules
import ProgressHeader from './testing/ProgressHeader';
import CurrentGuidancePanel from './testing/CurrentGuidancePanel';
import TestControlPanel from './testing/TestControlPanel';
import AudiogramContainer from './testing/AudiogramContainer';
import GuidancePanel from './GuidancePanel';

interface TestingInterfaceProps {
  patient: HearingProfile;
  onComplete: (session: TestSession) => void;
  onCancel: () => void;
}

// Add interface for Threshold to match AudiogramContainer's requirements
interface Threshold {
  frequency: number;
  ear: 'left' | 'right';
  level: number;
  testType: TestType;
}

const RefactoredTestingInterface: React.FC<TestingInterfaceProps> = ({
  patient,
  onComplete,
  onCancel
}) => {
  // Use our audio test hook
  const {
    // Session state
    session,
    currentStep,
    testProgress,
    
    // UI state
    toneActive,
    patientResponse,
    showResponseIndicator,
    patientJustResponded,
    errorMessage,
    
    // Trainer state
    procedurePhase,
    currentGuidance,
    suggestedAction,
    lastResponseLevel,
    
    // Threshold validation
    canStoreThreshold,
    thresholds,
    
    // Event handlers
    startTone,
    stopTone,
    handlePatientResponse,
    handleAdjustLevel,
    handleAdjustFrequency,
    handleStoreThreshold,
    handleSkipStep,
    handlePreviousStep,
    handleSuggestedAction,
    handleAudiogramClick,
    validateThreshold,
    updateSession
  } = useAudioTest(patient, onComplete, onCancel);

  // Local state for guidance panel visibility
  const [showGuidanceDetails, setShowGuidanceDetails] = useState(false);
  // State for the results dialog
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  // Local error state
  const [localError, setLocalError] = useState<string | null>(null);
  
  const theme = useTheme();

  // Create a wrapper for audiogram click handler
  const handleAudiogramClickWrapper = (frequency: number, ear: 'left' | 'right', level: number) => {
    handleAudiogramClick(frequency, level);
  };

  // Toggle guidance details visibility
  const toggleGuidanceDetails = () => {
    setShowGuidanceDetails(!showGuidanceDetails);
  };

  // Debug the thresholds from useAudioTest hook
  console.log('Original thresholds from useAudioTest:', thresholds);

  // Convert ThresholdPoint[] to Threshold[]
  const convertedThresholds: Threshold[] = thresholds.map(point => {
    console.log(`Converting threshold point:`, point);
    return {
      frequency: point.frequency,
      ear: point.ear,
      level: point.hearingLevel,
      testType: point.testType
    };
  });

  // Debug the converted thresholds being passed to AudiogramContainer
  console.log('Converted thresholds for AudiogramContainer:', convertedThresholds);

  // Handler for manual completion
  const handleManualComplete = () => {
    if (!session) {
      setLocalError("Cannot complete the test: No active session found.");
      return;
    }

    // Get current progress from TestingService to ensure we have latest state
    const currentProgress = testingService.calculateProgress();
    console.log('Current test progress before completion:', currentProgress);

    // If we have a valid threshold that hasn't been stored yet, store it first
    if (canStoreThreshold) {
      handleStoreThreshold();
    }
    
    // Warn user if test is incomplete but allow them to proceed
    if (currentProgress < 100) {
      const confirmIncomplete = window.confirm(
        "Some frequencies have not been tested. Would you like to complete the test with the current results? Missing frequencies will be marked as 'not tested'."
      );
      if (!confirmIncomplete) {
        return;
      }
    }
    
    // Complete the session in TestingService to calculate results
    const completedSession = testingService.completeSession();
    
    // Always proceed with completion, even if some frequencies are untested
    if (completedSession) {
      console.log('Session completed manually with results:', completedSession.results);
      // Create a temporary session object with the completed flag and results
      const tempSession = {
        ...completedSession,
        completed: true,
        results: completedSession.results || {
          patientId: completedSession.patientId,
          timestamp: new Date().toISOString(),
          userThresholds: [],
          actualThresholds: [],
          accuracy: 0,
          testDuration: 0,
          technicalErrors: ['Incomplete test'],
          falsePositives: 0,
          completionStatus: {
            totalFrequencies: 0,
            testedFrequencies: 0,
            untestedFrequencies: 0,
            completionPercentage: 0
          }
        }
      };
      // Update the session state with the completed session
      updateSession(tempSession);
      
      // Display the results dialog
      setShowResultsDialog(true);
    } else {
      setLocalError("Failed to complete the test. Please try again.");
    }
  };

  if (!session || !currentStep) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Initializing test session...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    );
  }

  // Check if the test is complete
  const isTestComplete = testProgress === 100;

  return (
    <Box sx={{ 
      padding: { xs: 0.5, sm: 1, md: 2 }, 
      maxWidth: '100%', 
      overflowX: 'hidden'
    }}>
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
        {/* Test progress header */}
        <Grid item xs={12}>
          <ProgressHeader 
            currentStep={currentStep}
            testProgress={testProgress}
            thresholdCount={thresholds.length}
          />
        </Grid>

        {/* Audiogram display - Expanded by ~4% */}
        <Grid item xs={12}>
          <Box sx={{ height: 'calc(100% + 4%)', width: '100%' }}>
            <AudiogramContainer 
              thresholds={convertedThresholds}
              currentStep={currentStep}
              toneActive={toneActive}
              onAudiogramClick={handleAudiogramClickWrapper}
            />
          </Box>
        </Grid>

        {/* Integrated testing interface - Only show if test is not complete */}
        {!isTestComplete && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, mb: 1.5 }}>
              {/* Guidance panel with collapsible detail section */}
              <Box sx={{ mb: 1.5 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Typography variant="h6" component="div" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}>
                    <MenuBook sx={{ mr: 1, fontSize: { xs: '1.1rem', sm: '1.3rem' } }} /> Current Guidance
                  </Typography>
                  <Button 
                    size="small" 
                    endIcon={showGuidanceDetails ? <ExpandLess /> : <ExpandMore />}
                    onClick={toggleGuidanceDetails}
                  >
                    {showGuidanceDetails ? 'Hide Details' : 'Show Details'}
                  </Button>
                </Box>
                
                {/* Main guidance message */}
                <CurrentGuidancePanel 
                  currentGuidance={currentGuidance}
                  suggestedAction={suggestedAction}
                  showResponseIndicator={showResponseIndicator}
                  patientResponse={patientResponse}
                  canStoreThreshold={canStoreThreshold}
                  onStoreThreshold={handleStoreThreshold}
                  onSuggestedAction={handleSuggestedAction}
                  startTone={startTone}
                  stopTone={stopTone}
                />
                
                {/* Collapsible detailed guidance */}
                <Collapse in={showGuidanceDetails}>
                  <Box sx={{ mt: 1.5, p: 1.5, bgcolor: alpha(theme.palette.primary.light, 0.1), borderRadius: 1 }}>
                    <GuidancePanel
                      guidance={currentGuidance}
                      action={suggestedAction}
                      phase={procedurePhase}
                      onStoreThreshold={handleStoreThreshold}
                      canStoreThreshold={canStoreThreshold}
                      patientResponded={patientJustResponded}
                      onImplementSuggestion={handleSuggestedAction}
                      showResponseAlert={showResponseIndicator && Boolean(patientResponse)}
                    />
                  </Box>
                </Collapse>
              </Box>
              
              {/* Test Controls */}
              <Box sx={{ p: { xs: 0.5, sm: 1 } }}>
                <Typography variant="subtitle1" sx={{ 
                  mb: 1, 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  <VolumeUp sx={{ mr: 1, fontSize: '1.2rem' }} /> Test Controls
                </Typography>
                <TestControlPanel 
                  currentStep={currentStep}
                  toneActive={toneActive}
                  onAdjustLevel={handleAdjustLevel}
                  onAdjustFrequency={handleAdjustFrequency}
                  startTone={startTone}
                  stopTone={stopTone}
                  canStoreThreshold={canStoreThreshold}
                  onStoreThreshold={handleStoreThreshold}
                />
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Test completion result panel */}
        {isTestComplete && (
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                mb: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.palette.success.light,
                color: theme.palette.success.contrastText
              }}
            >
              <Typography variant="h5" gutterBottom>
                Audiogram Test Complete!
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                You have successfully completed the hearing test. Review the audiogram to see the patient's thresholds.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<AssessmentOutlined />}
                onClick={() => {
                  // Complete the session to get results with false positives
                  if (session && !session.completed) {
                    const completedSession = testingService.completeSession();
                    if (completedSession && completedSession.results) {
                      // Update the session with completion data for the dialog
                      Object.assign(session, {
                        completed: true,
                        results: completedSession.results
                      });
                    }
                  }
                  setShowResultsDialog(true);
                }}
                sx={{ mb: 1 }}
              >
                View Detailed Results
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => onComplete(session)}
              >
                Return to Dashboard
              </Button>
            </Paper>
          </Grid>
        )}

        {/* Complete Button */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 1.5 } }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleOutline />}
            onClick={handleManualComplete}
            sx={{ 
              mx: 'auto', 
              minWidth: { xs: '180px', sm: '200px' },
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark
              }
            }}
          >
            Complete Audiogram Test
          </Button>
        </Grid>

        {/* Back button at the bottom */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
          <Tooltip title="Go back">
            <IconButton
              onClick={onCancel}
              color="primary"
              sx={{ 
                backgroundColor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.action.active, 0.1)
                  : 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.action.active, 0.2)
                    : 'rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <KeyboardTab sx={{ transform: 'rotate(180deg)' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {/* Results Dialog */}
      <Dialog 
        open={showResultsDialog} 
        onClose={() => setShowResultsDialog(false)}
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
              
              {/* Add completion status information */}
              {session?.completed && session?.results && (
                <>
                  <Alert 
                    severity={session.results.completionStatus.completionPercentage < 100 ? "warning" : "info"} 
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="subtitle2">
                      Test Completion Status: {session.results.completionStatus.completionPercentage}%
                    </Typography>
                    <Typography variant="body2">
                      {session.results.completionStatus.testedFrequencies} out of {session.results.completionStatus.totalFrequencies} frequencies tested.
                      {session.results.completionStatus.untestedFrequencies > 0 && 
                        ` ${session.results.completionStatus.untestedFrequencies} frequencies were not tested.`}
                    </Typography>
                  </Alert>

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
                </>
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
                        <TableCell>Status</TableCell>
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
                          const diff = actualThreshold && threshold.responseStatus === 'threshold'
                            ? threshold.hearingLevel - actualThreshold.hearingLevel 
                            : null;
                          return (
                            <TableRow key={`left-${threshold.frequency}`}>
                              <TableCell>{threshold.frequency}</TableCell>
                              <TableCell>{threshold.hearingLevel}</TableCell>
                              <TableCell>
                                {threshold.responseStatus === 'threshold' ? 'Tested' :
                                 threshold.responseStatus === 'no_response' ? 'No Response' : 'Not Tested'}
                              </TableCell>
                              <TableCell>
                                {actualThreshold ? actualThreshold.hearingLevel : 'N/A'}
                              </TableCell>
                              <TableCell 
                                sx={{ 
                                  color: !diff ? 'text.secondary' :
                                    Math.abs(diff) <= 5 
                                    ? 'success.main' 
                                    : Math.abs(diff) <= 10 
                                    ? 'warning.main' 
                                    : 'error.main'
                                }}
                              >
                                {diff !== null ? (diff > 0 ? `+${diff}` : diff) : 'N/A'}
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
                        <TableCell>Status</TableCell>
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
                          const diff = actualThreshold && threshold.responseStatus === 'threshold'
                            ? threshold.hearingLevel - actualThreshold.hearingLevel 
                            : null;
                          return (
                            <TableRow key={`right-${threshold.frequency}`}>
                              <TableCell>{threshold.frequency}</TableCell>
                              <TableCell>{threshold.hearingLevel}</TableCell>
                              <TableCell>
                                {threshold.responseStatus === 'threshold' ? 'Tested' :
                                 threshold.responseStatus === 'no_response' ? 'No Response' : 'Not Tested'}
                              </TableCell>
                              <TableCell>
                                {actualThreshold ? actualThreshold.hearingLevel : 'N/A'}
                              </TableCell>
                              <TableCell 
                                sx={{ 
                                  color: !diff ? 'text.secondary' :
                                    Math.abs(diff) <= 5 
                                    ? 'success.main' 
                                    : Math.abs(diff) <= 10 
                                    ? 'warning.main' 
                                    : 'error.main'
                                }}
                              >
                                {diff !== null ? (diff > 0 ? `+${diff}` : diff) : 'N/A'}
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
          <Button onClick={() => setShowResultsDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setShowResultsDialog(false);
              
              // Only complete the session if it hasn't been completed yet
              if (session && !session.completed) {
                onComplete(session);
              } else if (session) {
                // Session is already completed, just pass it through
                onComplete(session);
              }
            }}
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error snackbar for hook errors */}
      {errorMessage && (
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}

      {/* Error snackbar for local errors */}
      {localError && (
        <Snackbar open={!!localError} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="error">
            {localError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default RefactoredTestingInterface; 