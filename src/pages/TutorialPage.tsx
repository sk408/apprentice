import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

// Import the separate tutorial step components
import IntroductionStep from '../components/tutorial/IntroductionStep';
import AudiogramStep from '../components/tutorial/AudiogramStep';
import HughsonWestlakeStep from '../components/tutorial/HughsonWestlakeStep';
import MaskingStep from '../components/tutorial/MaskingStep';
import TestingErrorsStep from '../components/tutorial/TestingErrorsStep';
import CompletionStep from '../components/tutorial/CompletionStep';

const TutorialPage: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    console.log('Tutorial completed!');
    // You can add additional logic here like redirecting to practice
  };

  // Tutorial steps for audiometric testing
  const steps = [
    {
      label: 'Introduction to Pure Tone Audiometry',
      description: `Pure tone audiometry is a behavioral test used to measure hearing sensitivity 
                   across different frequencies. This test identifies the softest sound a person can 
                   hear at each frequency tested. The results are plotted on an audiogram which 
                   provides a visual representation of a person's hearing threshold levels.`,
      content: <IntroductionStep />
    },
    {
      label: 'Understanding the Audiogram',
      description: `The audiogram is a graph used to record hearing thresholds. Frequency (Hz) is displayed 
                   on the horizontal axis and intensity (dB HL) on the vertical axis. Lower numbers 
                   on the vertical axis represent better hearing. This step will help you understand 
                   how to read and interpret an audiogram.`,
      content: <AudiogramStep />
    },
    {
      label: 'The Hughson-Westlake Procedure',
      description: `The Hughson-Westlake procedure is a standardized method for determining hearing thresholds. 
                   It uses an "up 5 dB, down 10 dB" approach to efficiently find the softest level a patient can hear. 
                   This step will guide you through the procedure with detailed instructions.`,
      content: <HughsonWestlakeStep />
    },
    {
      label: 'Masking Procedures',
      description: `Masking is used to prevent crossover of sound to the non-test ear. This is critical 
                   when there are significant differences between ears or when testing bone conduction. 
                   This step will explain when and how to use masking during audiometric testing.`,
      content: <MaskingStep />
    },
    {
      label: 'Common Testing Errors',
      description: `Being aware of common testing errors will help you improve your testing technique 
                   and produce more accurate results. Here are errors to avoid and tips to ensure 
                   accurate audiometric testing.`,
      content: <TestingErrorsStep />
    },
    {
      label: 'Ready to Practice',
      description: `You've completed the tutorial and are now ready to practice pure tone audiometry! 
                   This step will provide you with practice scenarios and tips to refine your skills.`,
      content: <CompletionStep onComplete={handleComplete} />
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, maxWidth: 1200, mx: 'auto', bgcolor: theme.palette.background.paper }}>
        <Typography variant="h4" gutterBottom align="center">
          Pure Tone Audiometry Training
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Learn the proper procedure for conducting hearing tests
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {step.description}
                </Typography>
                
                {step.content}
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? handleComplete : handleNext}
                    endIcon={index === steps.length - 1 ? undefined : <ArrowForward />}
                    color={index === steps.length - 1 ? "success" : "primary"}
                  >
                    {index === steps.length - 1 ? 'Finish Tutorial' : 'Continue'}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Container>
  );
};

export default TutorialPage;