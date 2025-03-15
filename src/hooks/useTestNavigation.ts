import { useCallback } from 'react';
import { TestSession, TestStep } from '../interfaces/AudioTypes';
import testingService from '../services/TestingService';

interface UseTestNavigationProps {
  session: TestSession | null;
  setSession: (session: TestSession | null) => void;
  setCurrentStep: (step: TestStep | null) => void;
  setProcedurePhase: (phase: 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete') => void;
  setSuggestedAction: (action: 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next') => void;
  setCurrentGuidance: (guidance: string) => void;
  setLastResponseLevel: (level: number | null) => void;
  setErrorMessage: (message: string) => void;
  setTestProgress: (progress: number) => void;
  preserveThresholds: (updatedSession: TestSession) => TestSession;
  onComplete: (session: TestSession) => void;
  procedurePhase: 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete';
}

/**
 * Custom hook for test navigation
 */
export default function useTestNavigation({
  session,
  setSession,
  setCurrentStep,
  setProcedurePhase,
  setSuggestedAction,
  setCurrentGuidance,
  setLastResponseLevel,
  setErrorMessage,
  setTestProgress,
  preserveThresholds,
  onComplete,
  procedurePhase
}: UseTestNavigationProps) {
  
  // Handle skipping to the next step
  const handleSkipStep = useCallback(() => {
    try {
      console.log('⏭️ handleSkipStep called - skipping to next frequency');
      
      // Reset trainer mode state for the next frequency
      setProcedurePhase('initial');
      setLastResponseLevel(null);
      setSuggestedAction('present');
      setCurrentGuidance('Start testing at a comfortable level (30-40 dB).');
      console.log('Reset phase to: initial for next frequency');
      
      // Use TestingService to skip to the next step
      const nextStep = testingService.skipCurrentStep();
      console.log('Next step from TestingService:', nextStep);
      
      if (nextStep) {
        // Get updated session from TestingService
        const updatedSession = testingService.getCurrentSession();
        
        if (updatedSession) {
          // Use our helper function to ensure thresholds are preserved
          const preservedSession = preserveThresholds(updatedSession);
          setSession(preservedSession);
          
          // Get the current step with any preserved data
          const currentStepIndex = preservedSession.currentStep;
          const currentStepData = preservedSession.testSequence[currentStepIndex];
          
          if (currentStepData) {
            // Make a deep copy to ensure we don't modify by reference
            const currentStepCopy = JSON.parse(JSON.stringify(currentStepData));
            setCurrentStep(currentStepCopy);
            console.log('Moving to next frequency:', currentStepCopy.frequency);
          } else {
            console.error('Current step data not found in updated session');
            setErrorMessage('Error navigating to next frequency.');
          }
        } else {
          console.error('Failed to get updated session from TestingService');
          setErrorMessage('Failed to update session data.');
        }
      } else {
        // No more steps, complete the session
        const finalSession = testingService.completeSession();
        if (finalSession) {
          // Set progress to 100% on completion
          setTestProgress(100);
          console.log('Test completed, progress set to 100%');
          
          // Make sure we're passing a session with preserved thresholds to onComplete
          const preservedFinalSession = preserveThresholds(finalSession);
          onComplete(preservedFinalSession);
        }
      }
    } catch (error) {
      console.error("Error skipping to next step:", error);
      setErrorMessage('Failed to go to next step. Please try again.');
    }
  }, [
    preserveThresholds,
    setSession,
    setCurrentStep,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setLastResponseLevel,
    setErrorMessage,
    setTestProgress,
    onComplete
  ]);

  // Handle going to the previous step
  const handlePreviousStep = useCallback(() => {
    try {
      console.log('⏮️ handlePreviousStep called - going to previous frequency');
      
      // Reset trainer mode state for the previous frequency
      setProcedurePhase('initial');
      setLastResponseLevel(null);
      setSuggestedAction('present');
      setCurrentGuidance('Returning to the previous frequency. Begin at a comfortable level.');
      console.log('Reset phase to: initial for previous frequency');
      
      // We need to modify the session directly since TestingService may not have a specific 
      // method to go back to the previous step
      if (session) {
        console.log('📊 Before navigating back - Current step:', session.currentStep);
        // Create a deep copy of the session to avoid mutating the original
        const updatedSession = JSON.parse(JSON.stringify(session));
        
        // Only go back if we're not already at the first step
        if (updatedSession.currentStep > 0) {
          updatedSession.currentStep -= 1;
          
          // Important: Get the previous step reference
          const previousStep = updatedSession.testSequence[updatedSession.currentStep];
          if (!previousStep) {
            console.error('Previous step not found in test sequence');
            setErrorMessage('Error navigating to previous frequency.');
            return;
          }
          
          console.log('📊 Going back to step:', updatedSession.currentStep, 'with frequency:', previousStep.frequency);
          
          // Use preserveThresholds to ensure consistent threshold data
          const preservedSession = preserveThresholds(updatedSession);
          setSession(preservedSession);
          
          // Get the fresh step data from the preserved session
          const currentStepIndex = preservedSession.currentStep;
          const currentStepData = preservedSession.testSequence[currentStepIndex];
          
          if (currentStepData) {
            // Make a deep copy to ensure we don't modify by reference
            const freshStep = JSON.parse(JSON.stringify(currentStepData));
            setCurrentStep(freshStep);
          } else {
            console.error('Current step data not found in preserved session');
            setErrorMessage('Error navigating to previous frequency.');
            return;
          }

          // CRITICAL FIX: Update the TestingService's internal state to match our navigation
          // This ensures that any audio played will use the correct frequency
          const currentSession = testingService.getCurrentSession();
          if (currentSession) {
            // Store the session in a variable first to avoid TypeScript null error
            currentSession.currentStep = preservedSession.currentStep;
            console.log(`🔄 Explicitly updated TestingService step to ${preservedSession.currentStep} with frequency ${currentStepData.frequency}Hz`);
          }
          
          console.log('Moving to previous frequency:', currentStepData.frequency);
        } else {
          console.log('Already at the first frequency, cannot go back further');
          setErrorMessage('Already at the first frequency.');
        }
      } else {
        console.error('No active session found');
        setErrorMessage('No active session. Please restart the test.');
      }
    } catch (error) {
      console.error("Error going to previous step:", error);
      setErrorMessage('Failed to go to previous step. Please try again.');
    }
  }, [
    session,
    preserveThresholds,
    setSession,
    setCurrentStep,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setLastResponseLevel,
    setErrorMessage
  ]);

  // Handle implementing suggested actions
  const handleSuggestedAction = useCallback((suggestedAction: 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next', validateThreshold: () => { isValid: boolean; message: string }, handleStoreThreshold: () => void, handleAdjustLevel: (change: number) => void) => {    
    console.log('Implementing suggested action:', suggestedAction);
    
    // Save current state before making any changes to ensure thresholds are preserved
    const originalSession = session ? JSON.parse(JSON.stringify(session)) : null;
    
    switch (suggestedAction) {
      case 'increase':
        // Implement the 5 dB increase according to Hughson-Westlake
        // We always use 5 dB increments during bracketing (after no response)
        if (procedurePhase === 'initial') {
          handleAdjustLevel(10); // 10 dB for initial phase
          console.log('Remained in initial phase after increasing by 10dB');
        } else {
          // In all other phases (ascending, threshold), use 5 dB increments
          handleAdjustLevel(5); // 5 dB for ascending/threshold phase
          console.log('Adjusted by 5dB in ascending/threshold phase');
        }
        break;
      case 'decrease':
        // Always decrease by 10 dB after a response (core Hughson-Westlake principle)
        handleAdjustLevel(-10);
        console.log('Decreased by 10dB as per suggestion');
        break;
      case 'store_threshold':
        // Validate threshold before storing
        const { isValid, message } = validateThreshold();
        if (isValid) {
          // Call handleStoreThreshold which already handles setting the procedure phase
          // and other state updates correctly
          handleStoreThreshold();
          console.log('Stored threshold using suggested action');
        } else {
          // Show error for invalid threshold
          setErrorMessage(message);
          setCurrentGuidance(message + ' Continue testing to establish a valid threshold.');
        }
        break;
      case 'next':
        // First make sure we've stored all thresholds correctly
        if (procedurePhase === 'complete' && session) {
          // If we're in complete phase, check that the current step is properly marked as completed
          const { isValid } = validateThreshold();
          const currentStepIndex = session.currentStep;
          if (isValid && currentStepIndex !== undefined && 
              !session.testSequence[currentStepIndex]?.completed) {
            console.log('Current step has valid threshold but is not marked completed - calling handleStoreThreshold');
            handleStoreThreshold();
          }
        }
        
        // Now handle moving to the next step
        handleSkipStep();
        console.log('Moved to next frequency');
        break;
      case 'present':
        // No level adjustment needed, just guidance to present the tone
        if (session?.currentStep !== undefined && session?.testSequence[session.currentStep]) {
          const currentLevel = session.testSequence[session.currentStep].currentLevel;
          setCurrentGuidance(`Present the tone at ${currentLevel} dB to check for a response.`);
        }
        break;
      default:
        console.log('Unknown suggested action:', suggestedAction);
    }
    
    // For any action, ensure we preserve thresholds if the session has changed
    if (originalSession && session && JSON.stringify(originalSession) !== JSON.stringify(session)) {
      console.log('Session changed after action, ensuring thresholds are preserved...');
      // Use preserveThresholds to maintain threshold consistency
      const preservedSession = preserveThresholds(session);
      if (JSON.stringify(preservedSession) !== JSON.stringify(session)) {
        console.log('Updating session with preserved thresholds');
        setSession(preservedSession);
      }
    }
  }, [
    session,
    procedurePhase,
    handleSkipStep,
    preserveThresholds,
    setSession,
    setCurrentGuidance,
    setErrorMessage
  ]);

  return {
    handleSkipStep,
    handlePreviousStep,
    handleSuggestedAction
  };
} 