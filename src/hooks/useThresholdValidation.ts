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
    
    // Store the current level as the threshold
    const thresholdLevel = currentStep.currentLevel;
    
    console.log(`Storing threshold at current level: ${thresholdLevel}dB`);
    
    // IMPORTANT: First update TestingService state
    // This ensures the threshold is counted correctly in progress calculation
    testingService.setCurrentLevel(thresholdLevel as HearingLevel);
    testingService.completeCurrentStep('threshold');
    
    // Get the updated session from TestingService to ensure sync
    const updatedServiceSession = testingService.getCurrentSession();
    if (!updatedServiceSession) {
      console.error('Failed to get updated session from TestingService');
      setErrorMessage('Failed to store threshold: session not found.');
      return;
    }
    
    // Update React state with the TestingService state
    setSession(updatedServiceSession);
    
    // Update the current step in React state
    const updatedCurrentStep: TestStep = {
      ...currentStep,
      completed: true,
      responseStatus: 'threshold',
      currentLevel: thresholdLevel as HearingLevel
    };
    setCurrentStep(updatedCurrentStep);
    
    // Force update of test progress since we've completed a step
    const progress = testingService.calculateProgress();
    console.log(`Updated progress after storing threshold: ${progress}%`);
    
    // Add clearer feedback for successful threshold storage and navigation instructions
    setCurrentGuidance(`Threshold manually stored at ${thresholdLevel} dB! You can now use the up arrow (or press Up) to move to the next frequency, or the down arrow to go to a previous frequency.`);
    
    // Update UI to indicate threshold recorded
    setProcedurePhase('complete');
    setSuggestedAction('next');
    
    // Update the response counts map with the stored threshold
    setResponseCounts((prev: ResponseCounts) => {
      const newCounts = { ...prev };
      const level = thresholdLevel as HearingLevel;
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
        total: 1,  // Manual threshold storage
        heard: 1   // Single response
      };
      
      return newCounts;
    });
  }, [
    currentStep, 
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