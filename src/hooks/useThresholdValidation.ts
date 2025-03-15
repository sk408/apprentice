import { useCallback } from 'react';
import { TestSession, TestStep, HearingLevel, ThresholdPoint } from '../interfaces/AudioTypes';
import testingService from '../services/TestingService';

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

interface UseThresholdValidationProps {
  currentStep: TestStep | null;
  session: TestSession | null;
  responseCounts: ResponseCounts;
  setSession: (session: TestSession | null) => void;
  setCurrentStep: (step: TestStep | null) => void;
  setProcedurePhase: (phase: 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete') => void;
  setSuggestedAction: (action: 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next') => void;
  setCurrentGuidance: (guidance: string) => void;
  setResponseCounts: (counts: ResponseCounts | ((prev: ResponseCounts) => ResponseCounts)) => void;
  setErrorMessage: (message: string) => void;
}

/**
 * Custom hook for threshold validation and storing
 */
export default function useThresholdValidation({
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
}: UseThresholdValidationProps) {
  
  // Validate threshold according to Hughson-Westlake protocol
  const validateThreshold = useCallback((): { isValid: boolean; message: string } => {
    if (!currentStep) {
      return { isValid: false, message: 'No current test step available.' };
    }

    const frequency = currentStep.frequency;
    const ear = currentStep.ear;
    const currentLevel = currentStep.currentLevel;

    // Check if we have response data for this frequency/ear/level
    if (responseCounts && 
        responseCounts[frequency] && 
        responseCounts[frequency][ear] && 
        responseCounts[frequency][ear][currentLevel]) {
      
      // Get response data
      const heardCount = responseCounts[frequency][ear][currentLevel].heard;
      const totalCount = responseCounts[frequency][ear][currentLevel].total;
      
      // Hughson-Westlake requires at least 2 out of 3 responses at the same level
      if (totalCount >= 2 && heardCount >= 2) {
        return { isValid: true, message: 'Valid threshold established.' };
      } else if (totalCount < 2) {
        return { 
          isValid: false, 
          message: `Need more responses at this level (${heardCount}/${totalCount} so far).` 
        };
      } else {
        return { 
          isValid: false, 
          message: 'Invalid threshold. Hughson-Westlake requires at least 2 out of 3 responses at the same level.' 
        };
      }
    } else {
      return { 
        isValid: false, 
        message: 'No response data available for this level.' 
      };
    }
  }, [currentStep, responseCounts]);

  // Helper function to determine if threshold can be stored
  const canStoreThreshold = useCallback(() => {
    return validateThreshold().isValid;
  }, [validateThreshold]);

  // Handle storing threshold and moving to next step
  const handleStoreThreshold = useCallback(() => {
    if (!currentStep) {
      console.error('Cannot store threshold: no current step');
      return;
    }
    
    // Validate the threshold first
    const validation = validateThreshold();
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      return;
    }
    
    // Find the valid threshold level from our response counts
    let validThresholdLevel: number | null = null;
    let minValidLevel = Infinity;
    
    // Check the response counts for the current frequency and ear
    const frequencyData = responseCounts[currentStep.frequency];
    const earData = frequencyData?.[currentStep.ear] || {};
    
    Object.entries(earData).forEach(([levelStr, counts]) => {
      const level = parseInt(levelStr);
      if (counts.total >= 2 && counts.heard >= 2 && level < minValidLevel) {
        validThresholdLevel = level;
        minValidLevel = level;
      }
    });
    
    if (validThresholdLevel === null) {
      setErrorMessage('Could not determine a valid threshold level.');
      return;
    }
    
    console.log(`Storing threshold at validated level: ${validThresholdLevel}dB (current level is ${currentStep.currentLevel}dB)`);
    
    // Update the TestingService with the validated threshold level
    testingService.setCurrentLevel(validThresholdLevel as HearingLevel);
    
    // Mark the current step as completed without advancing to next step
    if (session) {
      const updatedSession = { ...session };
      
      // Find the specific test step for the current frequency and ear
      // FIXED: Don't require ID match which breaks when changing frequencies
      // Instead, just rely on matching frequency, ear and testType
      const stepIndex = updatedSession.testSequence.findIndex(
        step => step.frequency === currentStep.frequency && 
               step.ear === currentStep.ear &&
               step.testType === currentStep.testType
      );
      
      if (stepIndex === -1) {
        console.error('Could not find matching test step in session for frequency:', currentStep.frequency, 'ear:', currentStep.ear);
        setErrorMessage('Failed to store threshold: test step not found.');
        return;
      }
      
      const updatedStep = updatedSession.testSequence[stepIndex];
      
      // CRITICAL FIX: Make sure we explicitly set the responseStatus property
      // Mark the step as completed and set responseStatus to 'threshold'
      updatedStep.completed = true;
      updatedStep.responseStatus = 'threshold';
      
      // Also update the currentLevel to the validated threshold level
      updatedStep.currentLevel = validThresholdLevel as HearingLevel;
      
      // Add a debug log to check what we're storing
      console.log(`DEBUG: Storing threshold for step ${stepIndex}:`, {
        id: updatedStep.id,
        frequency: updatedStep.frequency,
        ear: updatedStep.ear,
        currentLevel: updatedStep.currentLevel,
        responseStatus: updatedStep.responseStatus
      });
      
      // Update our session state to reflect this change
      setSession(updatedSession);
      
      // Also update the currentStep to show it's completed with proper type validation
      if (currentStep) {
        const updatedCurrentStep: TestStep = {
          ...currentStep,
          completed: true,
          // Explicitly set the responseStatus with the correct type
          responseStatus: 'threshold',
          // Also update the currentLevel in the current step
          currentLevel: validThresholdLevel as HearingLevel
        };
        
        setCurrentStep(updatedCurrentStep);
      }
      
      console.log(`Threshold stored at ${validThresholdLevel}dB, marked as completed but staying on current frequency`);
    }
    
    // Add clearer feedback for successful threshold storage and navigation instructions
    setCurrentGuidance(`Threshold successfully stored at ${validThresholdLevel} dB! You can now use the up arrow (or press Up) to move to the next frequency, or the down arrow to go to a previous frequency.`);
    
    // Update UI to indicate threshold recorded
    setProcedurePhase('complete');
    setSuggestedAction('next');
    
    // Update the response counts map with the stored threshold
    setResponseCounts((prev: ResponseCounts) => {
      const newCounts = { ...prev };
      // At this point validThresholdLevel is guaranteed to be non-null since we checked above
      // Use type assertion to ensure TypeScript understands this
      const level = validThresholdLevel as HearingLevel;
      const frequency = currentStep.frequency;
      const ear = currentStep.ear;
      
      console.log(`Updating response counts for threshold: ${frequency}Hz, ${ear} ear at ${level}dB`);
      
      if (!newCounts[frequency]) {
        newCounts[frequency] = {};
      }
      
      if (!newCounts[frequency][ear]) {
        newCounts[frequency][ear] = {};
      }
      
      newCounts[frequency][ear][level] = {
        total: 3,  // Standard Hughson-Westlake criteria
        heard: 2   // At least 2 out of 3
      };
      
      return newCounts;
    });
  }, [
    currentStep, 
    session, 
    responseCounts, 
    validateThreshold, 
    setErrorMessage, 
    setSession, 
    setCurrentStep, 
    setCurrentGuidance, 
    setProcedurePhase, 
    setSuggestedAction, 
    setResponseCounts
  ]);

  return {
    validateThreshold,
    canStoreThreshold,
    handleStoreThreshold
  };
}

// ... existing code ...

/**
 * Extracts all thresholds from a session
 */
export const extractThresholds = (session: TestSession | null): ThresholdPoint[] => {
  if (!session) return [];
  
  // Filter steps with completed=true and responseStatus=threshold
  const completedSteps = session.testSequence.filter(
    step => step.completed && step.responseStatus === 'threshold'
  );
  
  console.log('Extracting thresholds from session:', completedSteps.length);
  
  // Create a map to ensure we track unique thresholds per frequency/ear combination
  const uniqueThresholds = new Map<string, ThresholdPoint>();
  
  // Process all completed steps with threshold status
  completedSteps.forEach(step => {
    // Create a unique key for this frequency/ear/testType combination
    const key = `${step.frequency}-${step.ear}-${step.testType}`;
    
    // Create the threshold point
    const thresholdPoint: ThresholdPoint = {
      frequency: step.frequency,
      hearingLevel: step.currentLevel,
      ear: step.ear,
      testType: step.testType || 'air', // Default to 'air' if testType is missing
      responseStatus: 'threshold'
    };
    
    console.log(`Adding threshold: ${step.frequency}Hz, ${step.ear} ear, ${step.currentLevel}dB HL`);
    
    // Store it in our map, which ensures we only have one threshold per frequency/ear/testType
    uniqueThresholds.set(key, thresholdPoint);
  });
  
  // Convert the map values back to an array
  return Array.from(uniqueThresholds.values());
}; 