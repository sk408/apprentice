import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import { Hearing } from '@mui/icons-material';

import RealEarMeasurementService from '../services/RealEarMeasurementService';
import REMStepContent from '../components/rem/REMStepContent';
import REMTutorial from '../components/rem/REMTutorial';
import REMReference from '../components/rem/REMReference';
import { remSteps } from '../constants/REMConstants';
import {
  REMType,
  REMSignalType,
  REMLevel,
  ProbePosition,
  REMCurve,
  REMTarget,
  VirtualHearingAid,
  REMSession,
  VentType
} from '../interfaces/RealEarMeasurementTypes';

/**
 * RealEarMeasurementPage - Interactive page for practicing real ear measurements
 */
const RealEarMeasurementPage: React.FC = () => {
  // Services
  const [remService, setRemService] = useState<RealEarMeasurementService | null>(null);
  
  // Session state
  const [session, setSession] = useState<REMSession | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Measurement parameters
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedHearingAid, setSelectedHearingAid] = useState<string>('');
  const [hearingAids, setHearingAids] = useState<VirtualHearingAid[]>([]);
  const [selectedEar, setSelectedEar] = useState<'left' | 'right'>('right');
  const [probeTubeDepth, setProbeTubeDepth] = useState<number>(15); // in millimeters
  const [probePosition, setProbePosition] = useState<ProbePosition>(ProbePosition.NOT_INSERTED);
  const [signalType, setSignalType] = useState<REMSignalType>('pure_tone_sweep');
  const [inputLevel, setInputLevel] = useState<REMLevel>(65);
  const [currentMeasurement, setCurrentMeasurement] = useState<REMCurve | null>(null);
  const [allMeasurements, setAllMeasurements] = useState<REMCurve[]>([]);
  const [currentTarget, setCurrentTarget] = useState<REMTarget | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [measurementType, setMeasurementType] = useState<REMType>('REUR');
  const [prescriptionMethod, setPrescriptionMethod] = useState<'NAL-NL2' | 'DSL' | 'NAL-NL1' | 'custom'>('NAL-NL2');
  const [selectedVentType, setSelectedVentType] = useState<VentType>(VentType.OCCLUDED);
  
  // Adjustment state
  const [adjustedREAR, setAdjustedREAR] = useState<REMCurve | null>(null);
  const [matchAccuracy, setMatchAccuracy] = useState<number | null>(null);
  const [adjustmentFeedback, setAdjustmentFeedback] = useState<string | null>(null);
  
  // Initialize services
  useEffect(() => {
    const service = new RealEarMeasurementService();
    setRemService(service);
    
    // Get available hearing aids
    setHearingAids(service.getHearingAids());

    return () => {
      service.dispose();
    };
  }, []);
  
  // Initialize adjustable REAR when on adjustment step
  useEffect(() => {
    if (activeStep === 7 && !adjustedREAR) {
      initializeAdjustableREAR();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, adjustedREAR]);
  
  // Set vent type in the service
  useEffect(() => {
    if (remService && session && measurementType === 'REOR') {
      // Only update if ventType is different to avoid infinite loop
      if (session.ventType !== selectedVentType) {
        const updatedSession = { ...session, ventType: selectedVentType };
        setSession(updatedSession);
      }
    }
  }, [selectedVentType, remService, session, measurementType]);
  
  // Initialize a new session
  const startNewSession = () => {
    if (remService && selectedPatient && selectedHearingAid) {
      const newSession = remService.createSession(selectedPatient, selectedHearingAid);
      setSession(newSession);
      setActiveStep(0);
      setError(null);
      setSuccess(null);
      setProbePosition(ProbePosition.NOT_INSERTED);
      setCurrentMeasurement(null);
      setCurrentTarget(null);
      setSuccess('Session initialized. Proceed to position the probe tube.');
    } else {
      setError('Please select a patient and hearing aid to continue');
    }
  };
  
  // Handle probe tube positioning
  const handlePositionProbeTube = () => {
    if (remService) {
      try {
        const position = remService.positionProbeTube(probeTubeDepth);
        setProbePosition(position);
        
        if (position === ProbePosition.CORRECT) {
          setSuccess('Probe tube correctly positioned');
          setError(null);
        } else if (position === ProbePosition.TOO_SHALLOW) {
          setError('Probe tube is too shallow - adjust depth');
          setSuccess(null);
        } else if (position === ProbePosition.TOO_DEEP) {
          setError('Probe tube is too deep - adjust depth');
          setSuccess(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setSuccess(null);
      }
    }
  };
  
  // Perform measurement
  const performMeasurement = async () => {
    if (!remService || !session) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // For REOR measurements, make sure the vent type is set in the session
      if (measurementType === 'REOR') {
        const updatedSession = { ...session, ventType: selectedVentType };
        setSession(updatedSession);
      }
      
      // Perform the measurement
      const measurement = await remService.performMeasurement(
        measurementType,
        selectedEar,
        signalType,
        inputLevel
      );
      
      // Add the measurement to the session
      const updatedMeasurements = [...session.measurements.filter(m => m.type !== measurementType), measurement];
      
      const updatedSession = {
        ...session,
        measurements: updatedMeasurements,
        currentStep: measurementType
      };
      
      setAllMeasurements(updatedMeasurements);
      setCurrentMeasurement(measurement);
      setSession(updatedSession);
      setSuccess(`${measurementType} measurement completed successfully`);
      
      // Move to the next step if we are in the measurement steps (2, 3, 4)
      if (activeStep >= 2 && activeStep <= 4) {
        setActiveStep(activeStep + 1);
        
        // Update the measurement type for the next step
        if (activeStep === 2) { // After REUR, go to REOR
          setMeasurementType('REOR');
        } else if (activeStep === 3) { // After REOR, go to REAR
          setMeasurementType('REAR');
        } else if (activeStep === 4) { // After REAR, go to REIG
          setMeasurementType('REIG');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during measurement');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate targets
  const generateTargets = () => {
    if (remService && selectedPatient) {
      try {
        const targets = remService.generateTargets(selectedPatient, prescriptionMethod);
        if (targets.length > 0) {
          // Find target matching current measurement type
          const matchingTarget = targets.find(t => t.type === measurementType);
          if (matchingTarget) {
            setCurrentTarget(matchingTarget);
            setSuccess(`Generated ${prescriptionMethod} targets for ${measurementType}`);
          } else {
            setCurrentTarget(targets[0]);
            setSuccess(`Generated ${prescriptionMethod} targets`);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    }
  };
  
  // Play test signal
  const playTestSignal = () => {
    if (remService) {
      remService.playTestSignal(signalType, inputLevel, selectedEar);
      setIsPlaying(true);
    }
  };
  
  // Stop test signal
  const stopTestSignal = () => {
    if (remService) {
      remService.stopTestSignal();
      setIsPlaying(false);
    }
  };
  
  // Create a copy of the REAR measurement for adjustments
  const initializeAdjustableREAR = () => {
    if (allMeasurements.length > 0) {
      // Find the REAR measurement
      const rearMeasurement = allMeasurements.find(m => m.type === 'REAR');
      if (rearMeasurement) {
        // Create a copy for adjustments
        const adjustable: REMCurve = {
          ...rearMeasurement,
          type: 'REAR', // ensure it's REAR type
          timestamp: new Date().toISOString(),
          // Make a copy of measurement points to avoid modifying the original
          measurementPoints: [...rearMeasurement.measurementPoints.map(p => ({...p}))]
        };
        setAdjustedREAR(adjustable);
        return adjustable;
      }
    }
    return null;
  };
  
  // Adjust gain at a specific frequency
  const adjustGainAtFrequency = (frequency: number, adjustment: number) => {
    if (!adjustedREAR) {
      const initialized = initializeAdjustableREAR();
      if (!initialized) return;
    }
    
    setAdjustedREAR(prevAdjusted => {
      if (!prevAdjusted) return null;
      
      // Create a new adjusted measurement
      const newAdjusted: REMCurve = {
        ...prevAdjusted,
        measurementPoints: prevAdjusted.measurementPoints.map(point => {
          if (point.frequency === frequency) {
            return {
              ...point,
              gain: Math.max(0, Math.min(80, point.gain + adjustment)) // Clamp between 0-80 dB
            };
          }
          return point;
        }),
        timestamp: new Date().toISOString()
      };
      
      return newAdjusted;
    });
  };
  
  // Check if adjustments match the target
  const checkTargetMatch = () => {
    if (remService && adjustedREAR && session) {
      // Look for REIG target specifically, which is most commonly used for matching
      let targetToCompare = currentTarget;
      
      // If available, use the REIG target from session
      const reigTarget = session.targets.find(t => t.type === 'REIG');
      if (reigTarget) {
        targetToCompare = reigTarget;
      }
      
      if (targetToCompare) {
        const accuracy = remService.calculateAccuracy(adjustedREAR, targetToCompare);
        setMatchAccuracy(accuracy);
        
        // Provide feedback based on accuracy
        if (accuracy >= 90) {
          setAdjustmentFeedback("Excellent match! The adjustments are within clinical standards.");
          setSuccess("Target match successful!");
        } else if (accuracy >= 80) {
          setAdjustmentFeedback("Good match, but some frequencies could be adjusted further for optimal results.");
        } else if (accuracy >= 70) {
          setAdjustmentFeedback("Acceptable match, but consider further adjustments, especially in the speech frequencies (1000-4000 Hz).");
        } else {
          setAdjustmentFeedback("Poor match to target. Significant adjustments are needed across multiple frequencies.");
        }
      }
    }
  };
  
  // Reset adjustments
  const resetAdjustments = () => {
    initializeAdjustableREAR();
    setMatchAccuracy(null);
    setAdjustmentFeedback(null);
  };
  
  // Navigate through steps
  const handleNext = () => {
    setActiveStep((prevStep) => {
      // Auto-update measurement type based on step
      const newStep = prevStep + 1;
      if (newStep === 2) {
        setMeasurementType('REUR');
      } else if (newStep === 3) {
        setMeasurementType('REOR');
      } else if (newStep === 4) {
        setMeasurementType('REAR');
      } else if (newStep === 5) {
        setMeasurementType('REIG');
      } else if (newStep === 7) {
        // Initialize adjustable REAR when reaching the adjustment step
        setMatchAccuracy(null);
        setAdjustmentFeedback(null);
        initializeAdjustableREAR();
      }
      
      return newStep;
    });
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Change active tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2 }}>
          <Hearing sx={{ fontSize: 40, mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 }, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
            Real Ear Measurement Practice
          </Typography>
        </Box>
        
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Practice" />
          <Tab label="Tutorial" />
          <Tab label="Reference" />
        </Tabs>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        {activeTab === 0 && (
          <>
            <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 4 }}>
              <Stepper activeStep={activeStep}>
                {remSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {remSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            
            <REMStepContent 
              activeStep={activeStep}
              remService={remService}
              session={session}
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
              selectedHearingAid={selectedHearingAid}
              setSelectedHearingAid={setSelectedHearingAid}
              hearingAids={hearingAids}
              selectedEar={selectedEar}
              setSelectedEar={setSelectedEar}
              probeTubeDepth={probeTubeDepth}
              setProbeTubeDepth={setProbeTubeDepth}
              probePosition={probePosition}
              signalType={signalType}
              setSignalType={setSignalType}
              inputLevel={inputLevel}
              setInputLevel={setInputLevel}
              currentMeasurement={currentMeasurement}
              allMeasurements={allMeasurements}
              currentTarget={currentTarget}
              isPlaying={isPlaying}
              measurementType={measurementType}
              setMeasurementType={setMeasurementType}
              prescriptionMethod={prescriptionMethod}
              setPrescriptionMethod={setPrescriptionMethod}
              selectedVentType={selectedVentType}
              setSelectedVentType={setSelectedVentType}
              adjustedREAR={adjustedREAR}
              matchAccuracy={matchAccuracy}
              adjustmentFeedback={adjustmentFeedback}
              isLoading={isLoading}
              startNewSession={startNewSession}
              handlePositionProbeTube={handlePositionProbeTube}
              performMeasurement={performMeasurement}
              playTestSignal={playTestSignal}
              stopTestSignal={stopTestSignal}
              generateTargets={generateTargets}
              adjustGainAtFrequency={adjustGainAtFrequency}
              checkTargetMatch={checkTargetMatch}
              resetAdjustments={resetAdjustments}
              setSuccess={setSuccess}
              setSession={setSession}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !session) ||
                  (activeStep === 1 && probePosition !== ProbePosition.CORRECT) ||
                  isLoading
                }
              >
                {activeStep === remSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
        
        {activeTab === 1 && <REMTutorial />}
        
        {activeTab === 2 && <REMReference />}
      </Paper>
    </Container>
  );
};

export default RealEarMeasurementPage; 