import { useCallback } from 'react';
import { TestSession, TestStep, HearingLevel, Frequency } from '../interfaces/AudioTypes';
import testingService from '../services/TestingService';

interface UseTestControlsProps {
  currentStep: TestStep | null;
  session: TestSession | null;
  setCurrentStep: (step: TestStep | null) => void;
  setSession: (session: TestSession | null) => void;
  procedurePhase: 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete';
  setProcedurePhase: (phase: 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete') => void;
  setSuggestedAction: (action: 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next') => void;
  setCurrentGuidance: (guidance: string) => void;
  setLastResponseLevel: (level: number | null) => void;
  preserveThresholds: (updatedSession: TestSession) => TestSession;
}

/**
 * Custom hook for managing level and frequency adjustments
 */
export default function useTestControls({
  currentStep,
  session,
  setCurrentStep,
  setSession,
  procedurePhase,
  setProcedurePhase,
  setSuggestedAction,
  setCurrentGuidance,
  setLastResponseLevel,
  preserveThresholds
}: UseTestControlsProps) {
  
  // Handle level adjustment
  const handleAdjustLevel = useCallback((change: number) => {
    if (!currentStep) return;
    
    try {
      // Create a proper new object without mutating the original
      const newLevel = Math.max(-10, Math.min(120, currentStep.currentLevel + change)) as HearingLevel;
      
      // Log the current frequency and ear for debugging
      console.log(`Adjusting level for frequency ${currentStep.frequency}Hz, ${currentStep.ear} ear: ${currentStep.currentLevel}dB -> ${newLevel}dB`);
      
      // Update trainer mode state based on level change
      // When manually adjusting levels, we should update the phase information to keep guidance relevant
      if (procedurePhase === 'initial' || procedurePhase === 'descending') {
        // If decreasing by 10dB, user is following descending protocol
        if (change === -10) {
          setProcedurePhase('descending');
          setSuggestedAction('present');
          setCurrentGuidance(`You've decreased by 10 dB. Now present the tone to see if the patient can still hear it at ${newLevel} dB.`);
        } else if (change === 5 || change === 10) {
          // If increasing, provide guidance but keep the phase the same
          setSuggestedAction('present');
          setCurrentGuidance(`You've increased by ${change} dB. Present the tone to check for a response at ${newLevel} dB.`);
        } else if (change === -5) {
          // Non-standard adjustment
          setSuggestedAction('present');
          setCurrentGuidance(`You've decreased by 5 dB. While Hughson-Westlake protocol uses 10 dB decrements in the descending phase, you can still present the tone at ${newLevel} dB to check for a response.`);
        }
      } else if (procedurePhase === 'ascending') {
        // If increasing by 5dB, user is following ascending protocol
        if (change === 5) {
          setSuggestedAction('present');
          setCurrentGuidance(`You've increased by 5 dB. Now present the tone to see if the patient can hear it at ${newLevel} dB.`);
        } else if (change === 10) {
          setSuggestedAction('present');
          setCurrentGuidance(`You've increased by 10 dB. While Hughson-Westlake protocol uses 5 dB increments in the ascending phase, you can still present the tone at ${newLevel} dB to check for a response.`);
        } else if (change < 0) {
          // If decreasing during ascending phase, switch to descending phase
          setProcedurePhase('descending');
          setSuggestedAction('present');
          setCurrentGuidance(`You've decreased by ${Math.abs(change)} dB, changing to the descending phase. Present the tone to check for a response at ${newLevel} dB.`);
        }
      } else if (procedurePhase === 'threshold') {
        // IMPORTANT: During threshold determination, don't reset counts when changing levels
        // Just continue using the same pattern (10dB down, 5dB up) while tracking responses at each level
        if (change === -10) {
          // User following standard protocol - decrease after a response
          setSuggestedAction('present');
          setCurrentGuidance(`You've decreased by 10 dB to ${newLevel} dB. This follows the Hughson-Westlake protocol. Present the tone to check for a response at this new level.`);
          console.log(`Threshold phase - decreased by 10dB to ${newLevel}dB`);
        } else if (change === 5) {
          // User following standard protocol - increase after no response
          setSuggestedAction('present');
          setCurrentGuidance(`You've increased by 5 dB to ${newLevel} dB. This follows the Hughson-Westlake protocol. Present the tone to check for a response at this new level.`);
          console.log(`Threshold phase - increased by 5dB to ${newLevel}dB`);
        } else {
          // Non-standard adjustment - just provide appropriate guidance
          setSuggestedAction('present');
          setCurrentGuidance(`You've changed the level to ${newLevel} dB. Present the tone to check for a response at this level.`);
          console.log(`Threshold phase - adjusted by ${change}dB to ${newLevel}dB (non-standard adjustment)`);
        }
        
        // Update UI to reflect the current level
        setLastResponseLevel(newLevel);
      } else if (procedurePhase === 'complete') {
        // Reset to threshold phase if changing level after completion
        setProcedurePhase('threshold');
        setSuggestedAction('present');
        setCurrentGuidance(`You're adjusting the level after completing threshold determination. You're now at ${newLevel} dB. Present the tone to check for a response.`);
      }
      
      // Create a new object instead of mutating the existing one
      const updatedStep = {
        ...currentStep,
        currentLevel: newLevel
      };
      
      setCurrentStep(updatedStep);
      
      // Explicitly update the testing service with the new level
      // This ensures the correct frequency+ear combination is updated
      testingService.setCurrentLevel(newLevel);
      
      // Also update the session to keep everything in sync
      if (session) {
        // Create a new session object with new references
        const updatedSession = { ...session };
        
        // Create a new test sequence array with new references
        updatedSession.testSequence = [...updatedSession.testSequence];
        
        // Update the specific step in the sequence by finding the index for the current frequency and ear
        const currentIndex = updatedSession.currentStep;
        
        // Make sure we only update the step for the current frequency and ear
        if (updatedSession.testSequence[currentIndex] &&
            updatedSession.testSequence[currentIndex].frequency === currentStep.frequency &&
            updatedSession.testSequence[currentIndex].ear === currentStep.ear) {
          
          updatedSession.testSequence[currentIndex] = {
            ...updatedSession.testSequence[currentIndex],
            currentLevel: newLevel
          };
          
          setSession(updatedSession);
        }
      }
    } catch (error) {
      console.error("Error adjusting level:", error);
    }
  }, [
    currentStep, 
    session, 
    procedurePhase,
    setCurrentStep,
    setSession,
    setProcedurePhase,
    setSuggestedAction,
    setCurrentGuidance,
    setLastResponseLevel
  ]);

  // Handle frequency adjustment
  const handleAdjustFrequency = useCallback((direction: number) => {
    if (!currentStep) return;
    
    const availableFrequencies: Frequency[] = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
    const currentFreq = currentStep.frequency;
    const currentIndex = availableFrequencies.indexOf(currentFreq);
    
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex + direction;
    
    // Ensure we stay within bounds
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= availableFrequencies.length) newIndex = availableFrequencies.length - 1;
    
    // Only update if the frequency would actually change
    if (newIndex !== currentIndex) {
      const newFrequency = availableFrequencies[newIndex];
      
      console.log(`Changing frequency from ${currentFreq}Hz to ${newFrequency}Hz`);
      
      // CRITICAL FIX: We need to find the appropriate step in the test sequence
      // that matches the target frequency and ear, then navigate to that step
      if (session) {
        // Find the step index for the target frequency and ear combination
        const targetStepIndex = session.testSequence.findIndex(
          step => step.frequency === newFrequency && 
                step.ear === currentStep.ear &&
                step.testType === currentStep.testType
        );
        
        if (targetStepIndex !== -1) {
          // Found a matching step in the sequence
          console.log(`Found matching step for ${newFrequency}Hz at index ${targetStepIndex}`);
          
          // Create a deep copy of the session to avoid mutating the original
          const updatedSession = JSON.parse(JSON.stringify(session));
          
          // Update the current step index in the session
          updatedSession.currentStep = targetStepIndex;
          
          // Get reference to the target step
          const targetStep = updatedSession.testSequence[targetStepIndex];
          
          console.log(`Navigating to step with ID ${targetStep.id}, frequency ${targetStep.frequency}Hz`);
          
          // Update session and current step states with fresh objects
          setSession(updatedSession);
          
          // Create a fresh copy of the target step to avoid reference issues
          const freshStep = JSON.parse(JSON.stringify(targetStep));
          setCurrentStep(freshStep);
          
          // CRITICAL: Also update the TestingService's internal state to match our navigation
          const currentSession = testingService.getCurrentSession();
          if (currentSession) {
            currentSession.currentStep = updatedSession.currentStep;
            console.log(`Explicitly updated TestingService step to ${updatedSession.currentStep} with frequency ${targetStep.frequency}Hz`);
          }
          
          // Reset UI state for the new frequency
          // Check if this frequency has a stored threshold already
          if (targetStep.completed && targetStep.responseStatus === 'threshold') {
            setProcedurePhase('complete');
            setSuggestedAction('next');
            setCurrentGuidance(`This frequency already has a threshold stored at ${targetStep.currentLevel} dB. You can proceed to the next frequency or adjust the level to retest.`);
          } else {
            setProcedurePhase('initial');
            setSuggestedAction('present');
            setCurrentGuidance(`Now testing at ${newFrequency} Hz. Begin at a comfortable level (30-40 dB).`);
          }
        }
      }
    }
  }, [
    currentStep, 
    session, 
    setCurrentStep, 
    setSession, 
    setProcedurePhase, 
    setSuggestedAction, 
    setCurrentGuidance
  ]);

  // Handle audiogram click for direct level/frequency selection
  const handleAudiogramClick = useCallback((frequency: number, level: number) => {
    if (!currentStep || !session) return;
    
    // Find matching frequency in availableFrequencies
    const availableFrequencies: Frequency[] = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
    const closestFrequency = availableFrequencies.reduce((prev, curr) => {
      return (Math.abs(curr - frequency) < Math.abs(prev - frequency)) ? curr : prev;
    });
    
    // First, handle frequency change if needed
    if (closestFrequency !== currentStep.frequency) {
      // Use the existing frequency adjustment logic
      const direction = availableFrequencies.indexOf(closestFrequency) - availableFrequencies.indexOf(currentStep.frequency as Frequency);
      handleAdjustFrequency(direction);
      
      // Wait for frequency change to complete, then adjust level
      // This is a simplified approach - in practice, you might want to use a more robust method
      setTimeout(() => {
        // Get current level after frequency change
        const currentLevel = testingService.getCurrentStep()?.currentLevel || 0;
        // Calculate level change
        const levelChange = level - currentLevel;
        // Adjust level if different
        if (levelChange !== 0) {
          handleAdjustLevel(levelChange);
        }
      }, 100);
    } else {
      // Just adjust level if frequency is the same
      const levelChange = level - currentStep.currentLevel;
      if (levelChange !== 0) {
        handleAdjustLevel(levelChange);
      }
    }
  }, [currentStep, session, handleAdjustFrequency, handleAdjustLevel]);

  return {
    handleAdjustLevel,
    handleAdjustFrequency,
    handleAudiogramClick
  };
} 