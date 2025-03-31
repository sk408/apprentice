import { TestStep } from '../interfaces/AudioTypes';

// Define the types needed for this function
type ProcedurePhase = 'initial' | 'descending' | 'ascending' | 'threshold' | 'complete';
type SuggestedAction = 'present' | 'increase' | 'decrease' | 'store_threshold' | 'next';

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

interface TrainerStateResult {
  procedurePhase: ProcedurePhase;
  suggestedAction: SuggestedAction;
  guidance: string;
  lastResponseLevel: number | null;
  responseCounts: ResponseCounts;
}

/**
 * Validates if a threshold has been established according to Hughson-Westlake criteria
 * @param heardCount Number of positive responses
 * @param totalCount Total number of presentations
 * @returns Object containing validation result and explanation
 */
const validateThresholdCriteria = (heardCount: number, totalCount: number): { 
  isValid: boolean; 
  reason: string;
} => {
  // Must have at least 2 presentations
  if (totalCount < 2) {
    return { 
      isValid: false, 
      reason: `Need more presentations (currently ${totalCount}, need at least 2)`
    };
  }

  // Check for 2/2 responses
  if (totalCount === 2 && heardCount === 2) {
    return {
      isValid: true,
      reason: 'Valid threshold: 2 out of 2 responses'
    };
  }

  // Check for 2/3 responses
  if (totalCount === 3 && heardCount >= 2) {
    return {
      isValid: true,
      reason: 'Valid threshold: 2 out of 3 responses'
    };
  }

  // If we have more than 3 presentations but still meet criteria
  if (totalCount > 3 && heardCount >= 2) {
    return {
      isValid: true,
      reason: `Valid threshold: ${heardCount} out of ${totalCount} responses`
    };
  }

  return {
    isValid: false,
    reason: `Invalid threshold: only ${heardCount} out of ${totalCount} responses`
  };
};

/**
 * Updates the trainer state based on patient response
 */
export const updateTrainerState = (
  didRespond: boolean,
  currentStep: TestStep | null,
  procedurePhase: ProcedurePhase,
  responseCounts: ResponseCounts,
  thresholdPhaseStartTime: number | null,
  lastPresentationTime: number,
  lastProcessedPresentation: number
): TrainerStateResult => {
  // Add detailed logging of input parameters
  console.log('🔄 updateTrainerState called with:', {
    didRespond,
    currentStep: currentStep ? {
      frequency: currentStep.frequency,
      ear: currentStep.ear,
      currentLevel: currentStep.currentLevel
    } : null,
    procedurePhase,
    thresholdPhaseStartTime,
    lastPresentationTime,
    lastProcessedPresentation
  });

  // Input validation and edge cases
  if (!currentStep) {
    console.warn('❌ Cannot update trainer state: currentStep is null');
    return {
      procedurePhase,
      suggestedAction: 'present',
      guidance: 'Error: No current test step available. Please restart the test.',
      lastResponseLevel: null,
      responseCounts
    };
  }

  // Validate timing to prevent double-counting
  if (lastPresentationTime <= lastProcessedPresentation) {
    console.warn('⚠️ Duplicate presentation detected:', {
      lastPresentationTime,
      lastProcessedPresentation,
      timeDiff: lastPresentationTime - lastProcessedPresentation
    });
    return {
      procedurePhase,
      suggestedAction: 'present',
      guidance: 'Please wait before presenting the next tone.',
      lastResponseLevel: null,
      responseCounts
    };
  }

  // Validate threshold phase timing
  if (procedurePhase === 'threshold' && (!thresholdPhaseStartTime || lastPresentationTime <= thresholdPhaseStartTime)) {
    console.warn('⚠️ Invalid threshold phase timing:', {
      thresholdPhaseStartTime,
      lastPresentationTime,
      timeDiff: lastPresentationTime - (thresholdPhaseStartTime || 0)
    });
    return {
      procedurePhase,
      suggestedAction: 'present',
      guidance: 'Please wait a moment before continuing the test.',
      lastResponseLevel: null,
      responseCounts
    };
  }

  // Use a local copy of response counts to avoid mutation issues
  let updatedResponseCounts = JSON.parse(JSON.stringify(responseCounts));
  let newPhase = procedurePhase;
  let newAction: SuggestedAction = 'present';
  let newGuidance = '';
  let newLastResponseLevel = null;

  // Extract current test parameters for easier reference
  const { frequency, ear, currentLevel } = currentStep;
  
  // Ensure response counts structure exists
  if (!updatedResponseCounts[frequency]) {
    updatedResponseCounts[frequency] = {};
  }
  if (!updatedResponseCounts[frequency][ear]) {
    updatedResponseCounts[frequency][ear] = {};
  }
  if (!updatedResponseCounts[frequency][ear][currentLevel]) {
    updatedResponseCounts[frequency][ear][currentLevel] = { total: 0, heard: 0 };
  }

  // Log current state before processing
  console.log('📊 Current state before processing:', {
    frequency,
    ear,
    currentLevel,
    currentResponses: updatedResponseCounts[frequency][ear][currentLevel],
    phase: procedurePhase
  });

  if (didRespond) {
    console.log('Patient responded - updating state');
    
    if (procedurePhase === 'initial') {
      // If patient responds on first presentation, change to descending phase
      newPhase = 'descending';
      newAction = 'decrease';
      newGuidance = `Good! The patient heard the initial tone at ${currentLevel} dB. Following Hughson-Westlake protocol, we'll now begin the descending phase. Decrease by 10 dB and present the tone again. We'll continue decreasing by 10 dB until the patient no longer responds.
      
      Note: Responses during the initial descent do not count towards threshold determination.`;
      console.log('Initial phase - patient responded, changing to descending phase');
      
      // Don't update response counts during initial phase
    } else if (procedurePhase === 'descending') {
      // Continue descending - responses during descending phase don't count towards threshold
      newPhase = 'descending';
      newAction = 'decrease';
      newGuidance = `The patient can still hear at ${currentLevel} dB. Continue the descending phase by decreasing in 10 dB steps. This helps us quickly find the approximate threshold region. Once the patient stops responding, we'll begin the more precise bracketing pattern.
      
      Note: Responses during the descending phase are only used to find the approximate threshold region and do not count towards threshold determination.`;
      console.log('Descending phase - patient responded, suggesting continue decreasing (response not counted for threshold)');
      
      // Don't update response counts during descending phase
    } else if (procedurePhase === 'ascending') {
      // If patient responds during ascending phase, we've found a potential threshold
      // but this first response doesn't count towards threshold determination
      newPhase = 'threshold';
      newLastResponseLevel = currentLevel;
      newAction = 'decrease';
      newGuidance = `You've found a potential threshold region at ${currentLevel} dB! Now we'll begin the precise bracketing pattern to determine the exact threshold. The Hughson-Westlake protocol requires:
      1. Decrease by 10 dB after EVERY response
      2. Increase by 5 dB when there's NO response
      3. Establish threshold when patient responds to 2 out of 2 or 2 out of 3 presentations at the same level
      
      Note: This first ascending response is used only to identify the threshold region and does not count towards threshold determination.
      Let's start by decreasing 10 dB.`;
      console.log(`Ascending phase - patient responded at ${currentLevel}dB, changed to threshold phase without counting response`);
      
      // Don't update response counts for this first ascending response
      // Reset the response counts for this level since we're starting fresh in threshold phase
      if (updatedResponseCounts[frequency][ear][currentLevel]) {
        updatedResponseCounts[frequency][ear][currentLevel] = { total: 0, heard: 0 };
      }
    } else if (procedurePhase === 'threshold') {
      // Continue tracking responses at the current level
      const currentLevel = currentStep.currentLevel;
      
      // Update response counts for this level
      const frequency = currentStep.frequency;
      const ear = currentStep.ear;
      
      if (!updatedResponseCounts[frequency]) {
        updatedResponseCounts[frequency] = {};
      }
      if (!updatedResponseCounts[frequency][ear]) {
        updatedResponseCounts[frequency][ear] = {};
      }
      if (!updatedResponseCounts[frequency][ear][currentLevel]) {
        updatedResponseCounts[frequency][ear][currentLevel] = { total: 0, heard: 0 };
      }
      updatedResponseCounts[frequency][ear][currentLevel].total += 1;
      updatedResponseCounts[frequency][ear][currentLevel].heard += 1;

      console.log(`Threshold phase - adding response at ${currentLevel}dB for ${frequency}Hz, ${ear} ear: ${updatedResponseCounts[frequency][ear][currentLevel].heard}/${updatedResponseCounts[frequency][ear][currentLevel].total} responses`);
      
      // Set UI to show the current level we're tracking
      newLastResponseLevel = currentLevel;
      
      // Calculate how many responses we have at this level
      const heardCount = updatedResponseCounts[frequency][ear][currentLevel].heard;
      const totalCount = updatedResponseCounts[frequency][ear][currentLevel].total;
      
      // Make sure this is a new presentation we haven't processed yet
      if (thresholdPhaseStartTime && lastPresentationTime > thresholdPhaseStartTime) {
        console.log(`🔢 Current responses at ${currentLevel}dB: ${heardCount}/${totalCount}`);
        console.log(`⏰ Presentation time: ${lastPresentationTime}, Threshold phase start: ${thresholdPhaseStartTime}`);
        
        // CRITICAL FIX: Check if this is a new presentation we haven't processed yet
        if (lastPresentationTime > lastProcessedPresentation) {
          // FIXED HUGHSON-WESTLAKE PROTOCOL:
          // 1. After ANY positive response, MUST decrease by 10 dB (mandatory)
          // 2. We need to have at least 3 presentations at this level 
          // 3. Patient must respond to at least 2 of them to confirm threshold
          
          // First, ALWAYS recommend decreasing by 10 dB after a response (core Hughson-Westlake rule)
          newAction = 'decrease';
          
          // Then check if we've already confirmed threshold
          const thresholdValidation = validateThresholdCriteria(heardCount, totalCount);
          
          if (thresholdValidation.isValid) {
            // Confirmed threshold according to Hughson-Westlake criteria
            console.log(`✅ Threshold CONFIRMED at ${currentLevel}dB - ${thresholdValidation.reason}`);
            newPhase = 'complete';
            newAction = 'store_threshold';
            newGuidance = `Excellent! You have established a valid threshold at ${currentLevel} dB. ${thresholdValidation.reason}. 
            
            This threshold was determined using proper Hughson-Westlake bracketing:
            • Started with descending 10 dB steps
            • Used 5 dB ascending steps
            • Confirmed with ${heardCount}/${totalCount} responses at this level
            
            You can now store this threshold and move to the next test frequency.`;
          } else {
            // Haven't met threshold criteria yet
            console.log(`⏳ Continuing threshold testing at ${currentLevel}dB - ${thresholdValidation.reason}`);
            newAction = 'decrease';
            newGuidance = `The patient responded at ${currentLevel} dB, but we haven't established a threshold yet. ${thresholdValidation.reason}. 
            
            Remember the Hughson-Westlake rules:
            • ALWAYS decrease by 10 dB after a response
            • Need 2 out of 2 or 2 out of 3 responses at the same level
            • Responses must be during the bracketing phase
            
            Following protocol, decrease by 10 dB and continue the bracketing pattern.`;
          }
        } else {
          console.log(`⚠️ Double counting prevented! This presentation (${lastPresentationTime}) was already processed.`);
        }
      } else {
        console.log('⚠️ Ignoring response from before threshold phase started in updateTrainerState');
        console.log(`⏰ Presentation time: ${lastPresentationTime}, Threshold phase start: ${thresholdPhaseStartTime}`);
      }
    }
  } else {
    // No response
    console.log('Patient did NOT respond - updating state');
    
    const currentLevel = currentStep.currentLevel;
    const frequency = currentStep.frequency;
    const ear = currentStep.ear;
    
    if (!updatedResponseCounts[frequency]) {
      updatedResponseCounts[frequency] = {};
    }
    if (!updatedResponseCounts[frequency][ear]) {
      updatedResponseCounts[frequency][ear] = {};
    }
    if (!updatedResponseCounts[frequency][ear][currentLevel]) {
      updatedResponseCounts[frequency][ear][currentLevel] = { total: 0, heard: 0 };
    }
    
    // Only count no-responses during the threshold phase
    if (procedurePhase === 'threshold') {
      updatedResponseCounts[frequency][ear][currentLevel].total += 1;
      // No response, so don't increment heard count
      console.log(`Threshold phase - adding no-response at ${currentLevel}dB for ${frequency}Hz, ${ear} ear: ${updatedResponseCounts[frequency][ear][currentLevel].heard}/${updatedResponseCounts[frequency][ear][currentLevel].total} responses`);
    } else {
      console.log(`${procedurePhase} phase - not counting no-response towards threshold determination`);
    }

    switch (procedurePhase) {
      case 'initial':
        // In initial phase, increase by 10dB until we get a response
        newAction = 'increase';
        newGuidance = `No response at ${currentLevel} dB. Since this is the initial presentation and we need to find a clearly audible starting level, increase by 10 dB. We'll continue increasing until we get a response, then begin the descending phase.`;
        break;
        
      case 'descending':
        // No response during descending phase means we've gone too low
        // Switch to ascending phase and start bracketing
        newPhase = 'ascending';
        newAction = 'increase';
        newGuidance = `No response at ${currentLevel} dB - this means we've descended below the threshold region. Now we'll begin the ascending phase:
        1. First, increase by 5 dB (smaller steps for more accuracy)
        2. Continue ascending until patient responds
        3. That first ascending response will mark the start of threshold determination`;
        break;
        
      case 'threshold':
        // In threshold phase, always increase by 5dB after no response
        newAction = 'increase';
        newGuidance = `No response at ${currentLevel} dB. Following Hughson-Westlake protocol, increase by 5 dB. Remember:
        • Use 5 dB steps when going up
        • Use 10 dB steps when going down
        • This bracketing pattern helps us precisely determine the threshold`;
        break;
        
      default:
        // For any other phase (like 'complete'), just maintain current state
        newAction = 'present';
        newGuidance = `No response at ${currentLevel} dB.`;
    }
  }

  return {
    procedurePhase: newPhase,
    suggestedAction: newAction,
    guidance: newGuidance,
    lastResponseLevel: newLastResponseLevel,
    responseCounts: updatedResponseCounts
  };
}