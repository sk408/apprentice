import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  TestSession, 
  TestStep, 
  HearingProfile, 
  ThresholdPoint, 
  HearingLevel, 
  Frequency 
} from '../interfaces/AudioTypes';
import testingService from '../services/TestingService';
import audioService from '../services/AudioService';
import { preserveThresholds, simulatePatientResponse, extractThresholds } from './useAudioTestHelpers';
import { updateTrainerState } from './useTrainerState';
import useToneControl from './useToneControl';
import useTestControls from './useTestControls';
import useThresholdValidation from './useThresholdValidation';
import useTestNavigation from './useTestNavigation';

// Define the shape of the response counts data structure
interface ResponseCounts {
  [frequency: number]: {
    [ear: string]: {
      [level: number]: { 
        total: number; 
        heard: number 
      }
    }
  }
}

// Define the procedure phases
type ProcedurePhase = 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete';

// Define suggested actions
type SuggestedAction = 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next';

// Define the hook's return type
interface UseAudioTestReturn {
  // Session state
  session: TestSession | null;
  currentStep: TestStep | null;
  testProgress: number;
  
  // UI state
  toneActive: boolean;
  patientResponse: boolean | null;
  showResponseIndicator: boolean;
  patientJustResponded: boolean;
  errorMessage: string;
  
  // Trainer state
  procedurePhase: ProcedurePhase;
  currentGuidance: string;
  suggestedAction: SuggestedAction;
  lastResponseLevel: number | null;
  
  // Threshold validation
  canStoreThreshold: boolean;
  thresholds: ThresholdPoint[];
  
  // Event handlers
  startTone: () => void;
  stopTone: () => void;
  handlePatientResponse: () => void;
  handleAdjustLevel: (change: number) => void;
  handleAdjustFrequency: (direction: number) => void;
  handleStoreThreshold: () => void;
  handleSkipStep: () => void;
  handlePreviousStep: () => void;
  handleSuggestedAction: () => void;
  handleAudiogramClick: (frequency: number, level: number) => void;
  validateThreshold: () => { isValid: boolean; message: string };
}

const useAudioTest = (
  patient: HearingProfile,
  onComplete: (session: TestSession) => void,
  onCancel: () => void
): UseAudioTestReturn => {
  // Session state
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentStep, setCurrentStep] = useState<TestStep | null>(null);
  const [testProgress, setTestProgress] = useState(0);
  
  // UI state
  const [toneActive, setToneActive] = useState(false);
  const [patientResponse, setPatientResponse] = useState<boolean | null>(null);
  const [showResponseIndicator, setShowResponseIndicator] = useState(false);
  const [patientJustResponded, setPatientJustResponded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Trainer state
  const [procedurePhase, setProcedurePhase] = useState<ProcedurePhase>('initial');
  const [currentGuidance, setCurrentGuidance] = useState<string>('Start testing at a comfortable level (30-40 dB).');
  const [suggestedAction, setSuggestedAction] = useState<SuggestedAction>('present');
  const [lastResponseLevel, setLastResponseLevel] = useState<number | null>(null);
  
  // Track responses for threshold determination
  const [responseCounts, setResponseCounts] = useState<ResponseCounts>({});
  
  // Refs for tracking presentation times
  const toneIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastPresentationTimeRef = useRef<number>(0);
  const lastProcessedPresentationRef = useRef<number>(0);
  const thresholdPhaseStartTimeRef = useRef<number | null>(null);
  
  // Assume trainer mode is always on for simplicity
  const trainerMode = true;

  // Memoize the thresholds
  const thresholds = useMemo(() => extractThresholds(session), [session]);

  // Create a wrapper for the preserveThresholds function
  const preserveSessionThresholds = useCallback(
    (updatedSession: TestSession) => preserveThresholds(updatedSession, session),
    [session]
  );

  // Create a wrapper for the updateTrainerState function
  const updateTrainerStateWrapper = useCallback((didRespond: boolean) => {
    if (!currentStep) return;

    const result = updateTrainerState(
      didRespond,
      currentStep,
      procedurePhase,
      responseCounts,
      thresholdPhaseStartTimeRef.current,
      lastPresentationTimeRef.current,
      lastProcessedPresentationRef.current
    );

    // Update state based on result
    setProcedurePhase(result.procedurePhase);
    setSuggestedAction(result.suggestedAction);
    setCurrentGuidance(result.guidance);
    if (result.lastResponseLevel !== null) {
      setLastResponseLevel(result.lastResponseLevel);
    }
    setResponseCounts(result.responseCounts);

    // Update threshold phase start time if we've entered threshold phase
    if (procedurePhase !== 'threshold' && result.procedurePhase === 'threshold') {
      thresholdPhaseStartTimeRef.current = Date.now();
      console.log(`⏰ Setting threshold phase start time to ${thresholdPhaseStartTimeRef.current}`);
    }
  }, [currentStep, procedurePhase, responseCounts]);

  // Use the tone control hook
  const { startTone, stopTone, handlePatientResponse } = useToneControl({
    currentStep,
    toneActive,
    setToneActive,
    patientResponse,
    setPatientResponse,
    setShowResponseIndicator,
    setPatientJustResponded,
    lastPresentationTimeRef,
    lastProcessedPresentationRef,
    thresholdPhaseStartTime: thresholdPhaseStartTimeRef,
    updateTrainerState: updateTrainerStateWrapper,
    patientThresholds: patient.thresholds
  });

  // Use the test controls hook
  const { 
    handleAdjustLevel, 
    handleAdjustFrequency, 
    handleAudiogramClick 
  } = useTestControls({
    currentStep,
    session,
    setCurrentStep,
    setSession,
    procedurePhase,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setLastResponseLevel,
    preserveThresholds: preserveSessionThresholds
  });

  // Use the threshold validation hook
  const {
    validateThreshold,
    canStoreThreshold: canStoreThresholdFn,
    handleStoreThreshold
  } = useThresholdValidation({
    currentStep,
    session,
    responseCounts,
    setSession,
    setCurrentStep,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setResponseCounts,
    setErrorMessage
  });

  // Get the current value of canStoreThreshold
  const canStoreThreshold = canStoreThresholdFn();

  // Use the test navigation hook
  const {
    handleSkipStep,
    handlePreviousStep,
    handleSuggestedAction: handleSuggestedActionRaw
  } = useTestNavigation({
    session,
    setSession,
    setCurrentStep,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setLastResponseLevel,
    setErrorMessage,
    setTestProgress,
    preserveThresholds: preserveSessionThresholds,
    onComplete,
    procedurePhase
  });

  // Create a wrapper for handleSuggestedAction to provide the required functions
  const handleSuggestedAction = useCallback(() => {
    handleSuggestedActionRaw(
      suggestedAction,
      validateThreshold,
      handleStoreThreshold,
      handleAdjustLevel
    );
  }, [
    suggestedAction,
    validateThreshold,
    handleStoreThreshold,
    handleAdjustLevel,
    handleSuggestedActionRaw
  ]);

  // Initialize the test session
  useEffect(() => {
    try {
      // Reset trainer mode state
      setProcedurePhase('initial');
      setLastResponseLevel(null);
      setSuggestedAction('present');
      setCurrentGuidance('Start testing at a comfortable level (30-40 dB).');
      
      // Resume audio context on first user interaction
      audioService.resumeAudioContext().then(() => {
        const newSession = testingService.startSession(patient);
        setSession(newSession);
        setCurrentStep(testingService.getCurrentStep());
        
        // Initialize progress to 0
        setTestProgress(0);
        console.log('New test session started, progress initialized to 0%');
        
        // We don't want to reset responseCounts here as it will clear any stored thresholds
        // keeping the existing responseCounts which stores thresholds per frequency/ear
      });
    } catch (error) {
      console.error("Error initializing test session:", error);
      setErrorMessage('Failed to initialize test session. Please try again.');
    }
  }, [patient]);

  // Handle mouse up event outside the component to stop tone
  useEffect(() => {
    const handleMouseUp = () => {
      if (toneActive) {
        stopTone();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [toneActive, stopTone]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (toneIntervalRef.current) {
        clearInterval(toneIntervalRef.current);
      }
      audioService.stopTone();
    };
  }, []);

  // Update test progress when current step changes
  useEffect(() => {
    if (session) {
      // Calculate and update the progress percentage
      const progress = testingService.calculateProgress();
      setTestProgress(progress);
      console.log(`Test progress updated: ${progress}%`);
    }
  }, [session, currentStep]);

  return {
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
  };
};

export default useAudioTest; 