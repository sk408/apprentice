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
  if (!currentStep) {
    console.log('Cannot update trainer state: currentStep is falsy');
    return {
      procedurePhase,
      suggestedAction: 'present',
      guidance: 'No current step available',
      lastResponseLevel: null,
      responseCounts
    };
  }
  
  console.log('🔍 Processing response:', didRespond, 'in phase:', procedurePhase);
  
  // Use a local copy of response counts to avoid mutation issues
  let updatedResponseCounts = { ...responseCounts };
  let newPhase = procedurePhase;
  let newAction: SuggestedAction = 'present';
  let newGuidance = '';
  let newLastResponseLevel = null;
  
  if (didRespond) {
    console.log('Patient responded - updating state');
    
    if (procedurePhase === 'initial') {
      // If patient responds on first presentation, change to descending phase
      newPhase = 'descending';
      newAction = 'decrease';
      newGuidance = 'The patient responded at this level. According to Hughson-Westlake, the next step would be to decrease by 10 dB and present the tone again.';
      console.log('Initial phase - patient responded, changing to descending phase');
    } else if (procedurePhase === 'descending') {
      // Continue descending
      newPhase = 'descending';
      newAction = 'decrease';
      newGuidance = 'The patient can still hear at this level. In the descending phase, you should continue to decrease by 10 dB intervals.';
      console.log('Descending phase - patient responded, suggesting continue decreasing');
    } else if (procedurePhase === 'ascending') {
      // If patient responds during ascending phase, we've found a potential threshold
      // This is the beginning of the bracketing pattern
      newPhase = 'threshold';
      
      // Track responses at the current level
      const currentLevel = currentStep.currentLevel;
      
      // Update response counts for this level
      const frequency = currentStep.frequency;
      const ear = currentStep.ear;
      
      // Make sure to use the proper frequency and ear for tracking responses
      if (!updatedResponseCounts[frequency]) {
        updatedResponseCounts[frequency] = {};
      }
      if (!updatedResponseCounts[frequency][ear]) {
        updatedResponseCounts[frequency][ear] = {};
      }
      if (!updatedResponseCounts[frequency][ear][currentLevel]) {
        updatedResponseCounts[frequency][ear][currentLevel] = { total: 0, heard: 0 };
      }
      
      // Set UI to show the current level we're tracking
      newLastResponseLevel = currentLevel;
      
      // After any positive response, must immediately decrease by 10 dB
      newAction = 'decrease';
      newGuidance = `You've found the potential threshold! The patient responded at ${currentLevel} dB. According to Hughson-Westlake protocol, you must immediately decrease by 10 dB and begin the bracketing pattern (10 dB down after response, 5 dB up after no response).`;
      console.log(`Ascending phase - patient responded at ${currentLevel}dB, changed to threshold phase, starting bracketing pattern`);
      
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
          if (totalCount >= 2) {
            if (heardCount >= 2) {
              // Confirmed threshold: at least 2 out of 3 responses
              console.log(`✅ Threshold CONFIRMED at ${currentLevel}dB with ${heardCount}/${totalCount} responses.`);
              newPhase = 'complete';
              newAction = 'store_threshold';
              newGuidance = `Excellent! You have established a threshold at ${currentLevel} dB. The patient has responded ${heardCount} times out of ${totalCount} at this level, which meets the criteria of "2 out of 3" responses needed to establish a threshold. You can now store this value and move to the next frequency.`;
            } else {
              // Failed threshold confirmation: less than 2 out of 3 responses
              console.log(`❌ Threshold NOT confirmed at ${currentLevel}dB with only ${heardCount}/${totalCount} responses.`);
              newAction = 'decrease';
              newGuidance = `The patient responded, but has only ${heardCount} total responses out of ${totalCount} at ${currentLevel} dB. Following Hughson-Westlake protocol, decrease by 10 dB after ANY response, then continue testing.`;
            }
          } else if (heardCount >= 2) {
            // Already have 2 positive responses, but continue for confirmation
            console.log(`👍 Already have ${heardCount} positive responses at ${currentLevel}dB, need more presentations for confirmation.`);
            newAction = 'decrease';
            newGuidance = `Good! The patient has responded ${heardCount} times at ${currentLevel} dB. Following Hughson-Westlake protocol, decrease by 10 dB after EACH response, then continue the bracketing pattern.`;
          } else if (totalCount === 2 && heardCount === 1) {
            // Have 1 out of 2 responses, need more presentations
            console.log(`⏳ Have 1 out of 2 responses at ${currentLevel}dB, continuing bracketing.`);
            newAction = 'decrease';
            newGuidance = `The patient has responded once out of ${totalCount} presentations at ${currentLevel} dB. Following Hughson-Westlake protocol, decrease by 10 dB after EACH response, then continue the bracketing pattern.`;
          } else {
            // Continue testing with the bracketing pattern
            console.log(`⏳ Starting bracketing at ${currentLevel}dB (have ${heardCount}/${totalCount}, need at least 2/3)`);
            newAction = 'decrease';
            newGuidance = `The patient has responded ${heardCount} time(s) out of ${totalCount} at ${currentLevel} dB. Following Hughson-Westlake protocol, decrease by 10 dB after EACH response, then continue the bracketing pattern.`;
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
    
    if (procedurePhase === 'initial') {
      // Initial level too low, suggest increasing
      newAction = 'increase';
      newGuidance = 'The patient did not respond to the initial presentation. This suggests the starting level was too low. Increase the level by 10-15 dB and try again.';
      console.log('Initial phase - no response, suggest increasing');
    } else if (procedurePhase === 'descending') {
      // Move to ascending phase when patient stops responding during descending
      newPhase = 'ascending';
      newAction = 'increase';
      newGuidance = 'The patient no longer responds at this level. This means we\'ve gone below their threshold. Now switch to the ascending phase: increase by 5 dB steps until the patient responds again. Note that we use smaller steps (5 dB) when ascending to more precisely determine the threshold.';
      console.log('Descending phase - no response, changing to ascending phase');
    } else if (procedurePhase === 'threshold') {
      // During threshold determination - if no response, track it and suggest increasing by 5dB
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
      // No response, so don't increment the heard count

      // Get the counts for this level
      const heardCount = updatedResponseCounts[currentStep.frequency][currentStep.ear][currentLevel].heard;
      const totalCount = updatedResponseCounts[currentStep.frequency][currentStep.ear][currentLevel].total;
      
      console.log(`🔢 Current responses at ${currentLevel}dB: ${heardCount}/${totalCount}`);
      
      // FIXED HUGHSON-WESTLAKE PROTOCOL FOR NO RESPONSE:
      // After no response, check if we already have a threshold (2/3 responses)
      // First check if we've already met threshold criteria despite this no-response
      if (totalCount >= 2 && heardCount >= 2) {
        // We already have a threshold! (2+ out of 3+ responses)
        console.log(`✅ Threshold CONFIRMED at ${currentLevel}dB with ${heardCount}/${totalCount} responses, despite this no-response.`);
        newPhase = 'complete';
        newAction = 'store_threshold';
        newGuidance = `You have established a threshold at ${currentLevel} dB. The patient has responded ${heardCount} times out of ${totalCount} at this level, which meets the criteria of "2 out of 3" responses needed to establish a threshold. You can now store this value and move to the next frequency.`;
      } else if (totalCount >= 2 && heardCount < 2) {
        // Failed to confirm threshold at this level - move up 5 dB
        console.log(`❌ Level ${currentLevel}dB is below threshold with only ${heardCount}/${totalCount} positive responses.`);
        newAction = 'increase';
        newGuidance = `The patient did not respond at ${currentLevel} dB (${heardCount}/${totalCount} responses). Following Hughson-Westlake protocol, increase by 5 dB and continue the bracketing pattern.`;
      } else if (totalCount - heardCount >= 2) {
        // Already have 2 negative responses, suggest increasing by 5 dB
        console.log(`👎 Already have ${totalCount - heardCount} negative responses at ${currentLevel}dB, suggesting to increase.`);
        newAction = 'increase';
        newGuidance = `The patient has failed to respond ${totalCount - heardCount} times out of ${totalCount} at ${currentLevel} dB. Following Hughson-Westlake protocol, increase by 5 dB and continue the bracketing pattern.`;
      } else {
        // Continue testing with bracketing pattern
        newAction = 'increase';
        newGuidance = `Patient did not respond at ${currentLevel} dB (${heardCount}/${totalCount} responses so far). Following Hughson-Westlake protocol, increase by 5 dB and continue the bracketing pattern.`;
      }
    } else if (procedurePhase === 'ascending') {
      // Continue ascending
      newPhase = 'ascending';
      newAction = 'increase';
      newGuidance = 'Patient still doesn\'t respond at this level. Continue to increase by 5 dB steps until you get a response. Remember, we use smaller 5 dB steps during the ascending phase for more precise threshold determination.';
      console.log('Ascending phase - no response, continue ascending');
    }
  }
  
  return {
    procedurePhase: newPhase,
    suggestedAction: newAction,
    guidance: newGuidance,
    lastResponseLevel: newLastResponseLevel,
    responseCounts: updatedResponseCounts
  };
}; 