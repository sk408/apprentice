import React, { useState } from 'react';
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
  useTheme,
} from '@mui/material';
import { ThreeDRotation } from '@mui/icons-material';

// Import components
import EarModel3D from '../components/EarModel3D';
import Introduction from '../components/ear-anatomy/Introduction';
import OuterEar from '../components/ear-anatomy/OuterEar';
import PinnaLandmarks from '../components/ear-anatomy/PinnaLandmarks';
import MiddleEar from '../components/ear-anatomy/MiddleEar';
import InnerEar from '../components/ear-anatomy/InnerEar';
import HearingProcess from '../components/ear-anatomy/HearingProcess';
import Glossary from '../components/ear-anatomy/Glossary';
import KnowledgeCheck from '../components/ear-anatomy/KnowledgeCheck';

const EarAnatomyPage: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  
  // Glossary state
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  // Knowledge Check state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | null>>({
    'question1': null,
    'question2': null,
    'question3': null
  });
  
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({
    'question1': false,
    'question2': false,
    'question3': false
  });

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Handle revealing answer
  const handleRevealAnswer = (questionId: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Toggle glossary drawer
  const toggleGlossary = () => {
    setGlossaryOpen(!glossaryOpen);
  };

  // Tutorial steps content for ear anatomy
  const steps = [
    {
      label: 'Introduction to Ear Anatomy',
      description: <Introduction />
    },
    {
      label: 'The Outer Ear',
      description: <OuterEar />
    },
    {
      label: 'Landmarks of the Pinna for Hearing Aid Fitting',
      description: <PinnaLandmarks />
    },
    {
      label: 'The Middle Ear',
      description: <MiddleEar />
    },
    {
      label: 'The Inner Ear',
      description: <InnerEar />
    },
    {
      label: 'How We Hear: The Process of Sound Perception',
      description: <HearingProcess />
    },
    {
      label: 'Knowledge Check',
      description: <KnowledgeCheck 
        questions={[
          {
            id: 'question1',
            question: 'Which of the following is the main purpose of the middle ear?',
            options: [
              'To collect sound waves from the environment',
              'To match impedance between air and fluid media',
              'To convert mechanical vibrations to electrical signals',
              'To detect head position and movement'
            ],
            correctOption: 'b',
            explanation: 'The middle ear serves as an impedance matcher, efficiently transferring sound energy from air (low impedance) to the fluid-filled inner ear (high impedance).'
          },
          {
            id: 'question2',
            question: 'Which structure is responsible for converting sound vibrations into electrical signals?',
            options: [
              'The tympanic membrane (eardrum)',
              'The ossicles (malleus, incus, stapes)',
              'The hair cells in the cochlea',
              'The semicircular canals'
            ],
            correctOption: 'c',
            explanation: 'Hair cells in the cochlea have stereocilia that bend when the basilar membrane moves, opening ion channels and generating electrical signals.'
          },
          {
            id: 'question3',
            question: 'What type of hearing loss results from damage to the hair cells in the cochlea?',
            options: [
              'Conductive hearing loss',
              'Sensorineural hearing loss',
              'Mixed hearing loss',
              'Central hearing loss'
            ],
            correctOption: 'b',
            explanation: 'Sensorineural hearing loss occurs when there is damage to the inner ear (cochlea) or to the nerve pathways from the inner ear to the brain.'
          }
        ]}
        selectedAnswers={selectedAnswers}
        showAnswers={showAnswers}
        onAnswerSelect={handleAnswerSelect}
        onRevealAnswer={handleRevealAnswer}
      />
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          boxShadow: theme.shadows[3]
        }}
      >
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Ear Anatomy Interactive Guide
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
            Explore the structure and function of the human ear
          </Typography>
        </Box>

        {/* 3D Ear Model Section */}
        <Box mb={4}>
          <Paper sx={{ mb: 2 }}>
            <Box p={2}>
              <Box display="flex" alignItems="center" mb={1}>
                <ThreeDRotation color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Interactive 3D Ear Model
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Explore this interactive 3D model of the human ear. Click and drag to rotate, scroll to zoom.
              </Typography>
              <EarModel3D height={450} />
            </Box>
          </Paper>
        </Box>

        {/* Main stepper content */}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Box>
                  {step.description}
                  <Box sx={{ mb: 2, mt: 3 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography paragraph>All steps completed - you&apos;ve successfully learned about the ear!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Start Over
            </Button>
          </Paper>
        )}

        {/* Glossary Component */}
        <Glossary glossaryOpen={glossaryOpen} toggleGlossary={toggleGlossary} />
      </Paper>
    </Container>
  );
};

export default EarAnatomyPage; 