import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MaskingAudiogram from './MaskingAudiogram';

// Define interfaces for our data structures
interface EarThresholds {
  ac250?: number;
  ac500?: number;
  ac1k?: number;
  ac2k?: number;
  ac4k?: number;
  bc250?: number;
  bc500?: number;
  bc1k?: number;
  bc2k?: number;
  bc4k?: number;
}

interface MaskingScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rightEar: EarThresholds;
  leftEar: EarThresholds;
  testEar: 'right' | 'left';
  testType: 'ac' | 'bc';
  testFrequency: 250 | 500 | 1000 | 2000 | 4000;
  transducer: 'supra-aural' | 'insert';
  interauralAttenuation: number;
  notes?: string;
}

// Define sample scenarios
const sampleScenarios: MaskingScenario[] = [
  {
    id: 'scenario-1',
    title: 'Basic Air Conduction Masking',
    description: 'Patient with asymmetric sensorineural hearing loss.',
    difficulty: 'easy',
    rightEar: {
      ac250: 20, ac500: 25, ac1k: 30, ac2k: 35, ac4k: 40,
      bc250: 20, bc500: 25, bc1k: 30, bc2k: 35, bc4k: 40
    },
    leftEar: {
      ac250: 60, ac500: 65, ac1k: 70, ac2k: 75, ac4k: 80,
      bc250: 60, bc500: 65, bc1k: 70, bc2k: 75, bc4k: 80
    },
    testEar: 'left',
    testType: 'ac',
    testFrequency: 1000,
    transducer: 'supra-aural',
    interauralAttenuation: 40
  },
  {
    id: 'scenario-2',
    title: 'Bone Conduction Masking',
    description: 'Patient with mixed hearing loss.',
    difficulty: 'medium',
    rightEar: {
      ac250: 45, ac500: 50, ac1k: 55, ac2k: 60, ac4k: 65,
      bc250: 20, bc500: 25, bc1k: 25, bc2k: 30, bc4k: 35
    },
    leftEar: {
      ac250: 30, ac500: 30, ac1k: 35, ac2k: 40, ac4k: 45,
      bc250: 15, bc500: 15, bc1k: 20, bc2k: 25, bc4k: 30
    },
    testEar: 'right',
    testType: 'bc',
    testFrequency: 500,
    transducer: 'insert',
    interauralAttenuation: 0,
    notes: 'Remember that interaural attenuation for bone conduction is assumed to be 0 dB.'
  },
  {
    id: 'scenario-3',
    title: 'Complex Masking Case',
    description: 'Patient with asymmetric conductive hearing loss.',
    difficulty: 'hard',
    rightEar: {
      ac250: 55, ac500: 55, ac1k: 60, ac2k: 60, ac4k: 65,
      bc250: 15, bc500: 15, bc1k: 20, bc2k: 20, bc4k: 25
    },
    leftEar: {
      ac250: 25, ac500: 30, ac1k: 30, ac2k: 35, ac4k: 40,
      bc250: 10, bc500: 10, bc1k: 15, bc2k: 15, bc4k: 20
    },
    testEar: 'right',
    testType: 'ac',
    testFrequency: 500,
    transducer: 'supra-aural',
    interauralAttenuation: 40,
    notes: 'Consider the air-bone gap when determining if masking is needed.'
  }
];

// Steps in the masking process
const maskingSteps = [
  'Determine if masking is needed',
  'Calculate initial masking level',
  'Establish masked threshold',
  'Find plateau (if needed)',
  'Determine final threshold'
];

const InteractiveMaskingTrainer: React.FC = () => {
  const theme = useTheme();
  
  // State variables
  const [scenarios, setScenarios] = useState<MaskingScenario[]>(sampleScenarios);
  const [currentScenario, setCurrentScenario] = useState<MaskingScenario | null>(sampleScenarios[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Function to reset the trainer
  const resetTrainer = () => {
    setCurrentScenario(scenarios[0]);
    setActiveStep(0);
    setUserAnswers({});
    setFeedback(null);
    setIsComplete(false);
  };

  // Function to change scenarios
  const changeScenario = (scenarioId: string) => {
    const newScenario = scenarios.find(s => s.id === scenarioId);
    if (newScenario) {
      setCurrentScenario(newScenario);
      setActiveStep(0);
      setUserAnswers({});
      setFeedback(null);
      setIsComplete(false);
    }
  };

  // Convert our EarThresholds format to the format needed by MaskingAudiogram
  const convertThresholdsForAudiogram = (ear: EarThresholds) => {
    const result = {
      ac: {} as {[key: number]: number},
      bc: {} as {[key: number]: number}
    };
    
    // Convert AC thresholds
    if (ear.ac250) result.ac[250] = ear.ac250;
    if (ear.ac500) result.ac[500] = ear.ac500;
    if (ear.ac1k) result.ac[1000] = ear.ac1k;
    if (ear.ac2k) result.ac[2000] = ear.ac2k;
    if (ear.ac4k) result.ac[4000] = ear.ac4k;
    
    // Convert BC thresholds
    if (ear.bc250) result.bc[250] = ear.bc250;
    if (ear.bc500) result.bc[500] = ear.bc500;
    if (ear.bc1k) result.bc[1000] = ear.bc1k;
    if (ear.bc2k) result.bc[2000] = ear.bc2k;
    if (ear.bc4k) result.bc[4000] = ear.bc4k;
    
    return result;
  };

  // Function to evaluate user answers
  const evaluateAnswer = (step: number, answer: any): boolean => {
    if (!currentScenario) return false;
    
    switch (step) {
      case 0: // Determine if masking is needed
        // AC testing masking check
        if (currentScenario.testType === 'ac') {
          const testEar = currentScenario.testEar;
          const nonTestEar = testEar === 'right' ? 'left' : 'right';
          
          // Get the correct threshold values based on frequency
          const freqKey = currentScenario.testFrequency === 1000 ? '1k' : 
                        currentScenario.testFrequency === 2000 ? '2k' : 
                        currentScenario.testFrequency === 4000 ? '4k' : 
                        `${currentScenario.testFrequency}`;
          
          const testEarAcKey = `ac${freqKey}` as keyof EarThresholds;
          const nonTestEarAcKey = `ac${freqKey}` as keyof EarThresholds;
          
          const testEarThreshold = testEar === 'right' 
            ? currentScenario.rightEar[testEarAcKey]
            : currentScenario.leftEar[testEarAcKey];
          
          const nonTestEarThreshold = nonTestEar === 'right' 
            ? currentScenario.rightEar[nonTestEarAcKey]
            : currentScenario.leftEar[nonTestEarAcKey];
          
          if (testEarThreshold === undefined || nonTestEarThreshold === undefined) {
            console.log('Missing threshold data', { testEarThreshold, nonTestEarThreshold });
            return false;
          }
          
          // Masking is needed when the non-test ear might be responding to the test signal
          // This occurs when the test ear threshold - interaural attenuation <= non-test ear threshold
          const needsMasking = (testEarThreshold - currentScenario.interauralAttenuation) <= nonTestEarThreshold;
          
          console.log('AC masking check', {
            testEar,
            testEarThreshold,
            nonTestEarThreshold,
            interauralAttenuation: currentScenario.interauralAttenuation,
            crossoverLevel: testEarThreshold - currentScenario.interauralAttenuation,
            needsMasking,
            userAnswer: answer
          });
          
          return answer === (needsMasking ? 'yes' : 'no');
        } 
        // BC testing almost always needs masking (interaural attenuation ~0 dB)
        else if (currentScenario.testType === 'bc') {
          return answer === 'yes'; // BC testing almost always requires masking
        }
        return false;
        
      case 1: // Calculate initial masking level
        {
          const nonTestEar = currentScenario.testEar === 'right' ? 'left' : 'right';
          
          // Get the correct threshold values based on frequency
          const freqKey = currentScenario.testFrequency === 1000 ? '1k' : 
                          currentScenario.testFrequency === 2000 ? '2k' : 
                          currentScenario.testFrequency === 4000 ? '4k' : 
                          `${currentScenario.testFrequency}`;
          
          const nonTestEarAcKey = `ac${freqKey}` as keyof EarThresholds;
          
          const nonTestEarThreshold = nonTestEar === 'right' 
            ? currentScenario.rightEar[nonTestEarAcKey]
            : currentScenario.leftEar[nonTestEarAcKey];
          
          if (nonTestEarThreshold === undefined) {
            console.log('Missing non-test ear threshold data');
            return false;
          }
          
          // Initial masking level is non-test ear threshold + 10-15 dB safety margin
          // (Using effective masking level = 15 dB + non-test ear threshold)
          const correctInitialLevel = nonTestEarThreshold + 15;
          
          console.log('Initial masking level check', {
            nonTestEar,
            nonTestEarThreshold,
            correctInitialLevel,
            userAnswer: answer,
            difference: Math.abs(parseInt(answer, 10) - correctInitialLevel)
          });
          
          // Allow for a margin of error (±5 dB) to account for different masking approaches
          return Math.abs(parseInt(answer, 10) - correctInitialLevel) <= 5;
        }
        
      case 2: // Establish masked threshold
        // This is more subjective, checking if they're in a reasonable range
        {
          const parsedAnswer = parseInt(answer, 10);
          return !isNaN(parsedAnswer) && parsedAnswer >= 0 && parsedAnswer <= 120;
        }
        
      case 3: // Find plateau
        // Check if they understand the plateau concept (increase by 10 dB twice)
        if (currentScenario.testType === 'ac') {
          return answer === '10dB-twice';
        } else {
          return answer === '5dB-twice';
        }
        
      case 4: // Determine final threshold
        // Subjective check - they should provide a reasonable threshold
        {
          const parsedFinalAnswer = parseInt(answer, 10);
          return !isNaN(parsedFinalAnswer) && parsedFinalAnswer >= 0 && parsedFinalAnswer <= 120;
        }
        
      default:
        return false;
    }
  };

  // Function to handle step navigation
  const handleNext = () => {
    // If no answer for current step, don't proceed
    if (!userAnswers[`step${activeStep}`]) {
      setFeedback({
        isCorrect: false,
        message: 'Please provide an answer before continuing.'
      });
      return;
    }
    
    const isAnswerCorrect = evaluateAnswer(
      activeStep, 
      userAnswers[`step${activeStep}`]
    );
    
    // Provide feedback
    if (isAnswerCorrect) {
      setFeedback({
        isCorrect: true,
        message: 'Correct! You can now proceed to the next step.'
      });
      
      // If this is the last step, mark as complete
      if (activeStep === maskingSteps.length - 1) {
        setIsComplete(true);
      } else {
        // Move to next step after a delay
        setTimeout(() => {
          setActiveStep(prevStep => prevStep + 1);
          setFeedback(null);
        }, 1500);
      }
    } else {
      // Provide feedback for incorrect answer
      let feedbackMessage = 'That\'s not quite right. Please try again.';
      
      switch (activeStep) {
        case 0:
          feedbackMessage += ' Remember to consider interaural attenuation.';
          break;
        case 1:
          feedbackMessage += ' Initial masking level is typically the non-test ear threshold + 10dB.';
          break;
        case 3:
          feedbackMessage += ' The plateau is found by increasing masking in steps until the threshold remains stable.';
          break;
        default:
          break;
      }
      
      setFeedback({
        isCorrect: false,
        message: feedbackMessage
      });
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'number' 
      ? parseInt(event.target.value, 10) 
      : event.target.value;
    
    setUserAnswers({
      ...userAnswers,
      [`step${activeStep}`]: value
    });
    
    // Clear feedback when answer changes
    setFeedback(null);
  };

  // Get help text based on current step
  const getHelpText = (step: number): string => {
    switch (step) {
      case 0:
        return 'For air conduction, masking is needed when the difference between ears exceeds interaural attenuation. For bone conduction, almost always mask.';
      case 1:
        return 'Initial masking level = Non-test ear threshold + 10 dB safety margin';
      case 2:
        return 'This is the threshold obtained while presenting the initial masking level to the non-test ear.';
      case 3:
        return 'Increase masking in steps (typically 10 dB for AC, 5 dB for BC) until the threshold remains stable for two consecutive increases.';
      case 4:
        return 'The final masked threshold is the threshold that remains stable during the plateau procedure.';
      default:
        return '';
    }
  };

  // Get step content based on active step
  const getStepContent = (step: number) => {
    if (!currentScenario) return null;
    
    const testEar = currentScenario.testEar;
    const testType = currentScenario.testType.toUpperCase();
    const frequency = currentScenario.testFrequency;
    const transducer = currentScenario.transducer;
    
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Do you need to mask the non-test ear for this scenario?
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="masking-needed"
                value={userAnswers.step0 || ''}
                onChange={handleAnswerChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes, masking is needed" />
                <FormControlLabel value="no" control={<Radio />} label="No, masking is not needed" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              What should be the initial masking level (in dB HL)?
            </Typography>
            <TextField
              type="number"
              label="Initial Masking Level"
              value={userAnswers.step1 || ''}
              onChange={handleAnswerChange}
              InputProps={{
                inputProps: { min: 0, max: 120 }
              }}
              sx={{ width: 200 }}
            />
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              What is the threshold with the initial masking level (in dB HL)?
            </Typography>
            <TextField
              type="number"
              label="Masked Threshold"
              value={userAnswers.step2 || ''}
              onChange={handleAnswerChange}
              InputProps={{
                inputProps: { min: 0, max: 120 }
              }}
              sx={{ width: 200 }}
            />
          </Box>
        );
        
      case 3:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              How would you find the plateau for this scenario?
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="plateau-finding"
                value={userAnswers.step3 || ''}
                onChange={handleAnswerChange}
              >
                <FormControlLabel 
                  value="5dB-once" 
                  control={<Radio />} 
                  label="Increase masking by 5 dB once" 
                />
                <FormControlLabel 
                  value="5dB-twice" 
                  control={<Radio />} 
                  label="Increase masking by 5 dB twice" 
                />
                <FormControlLabel 
                  value="10dB-once" 
                  control={<Radio />} 
                  label="Increase masking by 10 dB once" 
                />
                <FormControlLabel 
                  value="10dB-twice" 
                  control={<Radio />} 
                  label="Increase masking by 10 dB twice" 
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
        
      case 4:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              What is the final masked threshold (in dB HL)?
            </Typography>
            <TextField
              type="number"
              label="Final Masked Threshold"
              value={userAnswers.step4 || ''}
              onChange={handleAnswerChange}
              InputProps={{
                inputProps: { min: 0, max: 120 }
              }}
              sx={{ width: 200 }}
            />
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  if (!currentScenario) {
    return <Typography>No scenario selected</Typography>;
  }
  
  // Prepare audiogram data from the current scenario
  const rightEarThresholds = convertThresholdsForAudiogram(currentScenario.rightEar);
  const leftEarThresholds = convertThresholdsForAudiogram(currentScenario.leftEar);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: theme.palette.background.paper }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Interactive Masking Trainer
        </Typography>
        <IconButton onClick={resetTrainer} color="primary">
          <Tooltip title="Reset scenario">
            <RefreshIcon />
          </Tooltip>
        </IconButton>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {currentScenario.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {currentScenario.description}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" gutterBottom>
                Test Parameters:
              </Typography>
              <Typography variant="body2">
                <strong>Test Ear:</strong> {currentScenario.testEar === 'right' ? 'Right' : 'Left'} ear
              </Typography>
              <Typography variant="body2">
                <strong>Test Type:</strong> {currentScenario.testType.toUpperCase()} at {currentScenario.testFrequency} Hz
              </Typography>
              <Typography variant="body2">
                <strong>Transducer:</strong> {currentScenario.transducer} headphones
              </Typography>
              <Typography variant="body2">
                <strong>Interaural Attenuation:</strong> {currentScenario.interauralAttenuation} dB
              </Typography>
              {currentScenario.notes && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">{currentScenario.notes}</Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <MaskingAudiogram 
            rightEarThresholds={rightEarThresholds}
            leftEarThresholds={leftEarThresholds}
            highlightFrequency={currentScenario.testFrequency}
            testEar={currentScenario.testEar}
            height={300}
          />
          
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <FormLabel id="scenario-selection-label">Select Scenario</FormLabel>
              <RadioGroup
                row
                aria-labelledby="scenario-selection-label"
                name="scenario-selection"
                value={currentScenario.id}
                onChange={(e) => changeScenario(e.target.value)}
              >
                {scenarios.map((scenario) => (
                  <FormControlLabel 
                    key={scenario.id} 
                    value={scenario.id} 
                    control={<Radio />} 
                    label={`${scenario.title} (${scenario.difficulty})`} 
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {maskingSteps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isComplete ? (
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Congratulations!
            </Typography>
            <Typography paragraph>
              You have successfully completed the masking procedure for this scenario.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={resetTrainer}
              startIcon={<RefreshIcon />}
            >
              Try Another Scenario
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Step {activeStep + 1}: {maskingSteps[activeStep]}
              </Typography>
              <Tooltip title={getHelpText(activeStep)}>
                <IconButton size="small">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              {getStepContent(activeStep)}
            </Box>
            
            {feedback && (
              <Alert 
                severity={feedback.isCorrect ? "success" : "error"}
                icon={feedback.isCorrect ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}
                sx={{ mt: 2 }}
              >
                <Typography variant="body2">{feedback.message}</Typography>
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!userAnswers[`step${activeStep}`]}
              >
                {activeStep === maskingSteps.length - 1 ? 'Finish' : 'Check & Continue'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
      
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Tip:</strong> In real clinical situations, you would also need to consider the patient's responses and adjust your approach accordingly. This simulator provides a simplified version of the masking process.
        </Typography>
      </Alert>
    </Paper>
  );
};

export default InteractiveMaskingTrainer; 