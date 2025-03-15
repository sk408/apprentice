import React, { useState } from 'react';
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
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Person,
  VolumeUp,
  KeyboardTab,
  MenuBook
} from '@mui/icons-material';
import { 
  TestSession, 
  HearingProfile,
  ThresholdPoint 
} from '../interfaces/AudioTypes';
import { useTheme, alpha } from '@mui/material/styles';
import useAudioTest from '../hooks/useAudioTest';

// Import our component modules
import TabPanel, { a11yProps } from './testing/TabPanel';
import ProgressHeader from './testing/ProgressHeader';
import CurrentGuidancePanel from './testing/CurrentGuidancePanel';
import TestControlPanel from './testing/TestControlPanel';
import AudiogramContainer from './testing/AudiogramContainer';
import PatientResponsePanel from './testing/PatientResponsePanel';
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
    validateThreshold
  } = useAudioTest(patient, onComplete, onCancel);

  // Local state for tab selection
  const [activeTab, setActiveTab] = useState(0);
  
  // Handler for tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const theme = useTheme();

  // Create a wrapper for audiogram click handler
  const handleAudiogramClickWrapper = (frequency: number, ear: 'left' | 'right', level: number) => {
    handleAudiogramClick(frequency, level);
  };

  // Debug the thresholds from useAudioTest hook
  console.log('Original thresholds from useAudioTest:', thresholds);

  // Convert ThresholdPoint[] to Threshold[]
  const convertedThresholds: Threshold[] = thresholds.map(point => {
    console.log(`Converting threshold point:`, point);
    return {
      frequency: point.frequency,
      ear: point.ear,
      level: point.hearingLevel
    };
  });

  // Debug the converted thresholds being passed to AudiogramContainer
  console.log('Converted thresholds for AudiogramContainer:', convertedThresholds);

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

  return (
    <Box sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {/* Test progress header */}
        <Grid item xs={12}>
          <ProgressHeader 
            currentStep={currentStep}
            testProgress={testProgress}
          />
        </Grid>

        {/* Audiogram display */}
        <Grid item xs={12}>
          <AudiogramContainer 
            thresholds={convertedThresholds}
            currentStep={currentStep}
            toneActive={toneActive}
            onAudiogramClick={handleAudiogramClickWrapper}
          />
        </Grid>

        {/* Current guidance panel */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Tabbed interface */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 0, mb: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                aria-label="testing interface tabs"
                variant="fullWidth"
                sx={{ 
                  '& .MuiTab-root': { 
                    minHeight: '39px',
                    fontSize: { xs: '0.52rem', sm: '0.585rem' },
                    padding: { xs: 0.65, sm: 1.3 }
                  }
                }}
              >
                <Tab 
                  icon={<VolumeUp />} 
                  label="Testing" 
                  {...a11yProps(0)} 
                />
                <Tab 
                  icon={
                    <Badge 
                      color="success" 
                      variant="dot" 
                      invisible={!patientResponse}
                    >
                      <Person />
                    </Badge>
                  } 
                  label="Patient Response" 
                  {...a11yProps(1)} 
                />
                <Tab 
                  icon={<MenuBook />} 
                  label="Training Guide" 
                  {...a11yProps(2)} 
                />
              </Tabs>
            </Box>

            {/* Testing Tab */}
            <TabPanel value={activeTab} index={0}>
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
            </TabPanel>

            {/* Patient Response Tab */}
            <TabPanel value={activeTab} index={1}>
              <PatientResponsePanel 
                patient={patient}
                patientResponse={patientResponse}
                toneActive={toneActive}
                showResponseIndicator={showResponseIndicator}
                onPatientResponse={handlePatientResponse}
              />
            </TabPanel>

            {/* Trainer Guide Tab */}
            <TabPanel value={activeTab} index={2}>
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
            </TabPanel>
          </Paper>
        </Grid>

        {/* Back button at the bottom */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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

      {/* Error snackbar */}
      {errorMessage && (
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => {}}>
          <Alert severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default RefactoredTestingInterface; 