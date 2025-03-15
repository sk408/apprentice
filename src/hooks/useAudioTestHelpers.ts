import { TestSession, ThresholdPoint, TestStep, HearingLevel, Frequency } from '../interfaces/AudioTypes';

/**
 * Preserves thresholds when retrieving updated session data
 */
export const preserveThresholds = (
  updatedSession: TestSession, 
  currentSession: TestSession | null
): TestSession => {
  // Return early if there's no current session
  if (!currentSession) return updatedSession;
  
  // Create a deep copy to avoid mutating the input
  const sessionCopy = JSON.parse(JSON.stringify(updatedSession)) as TestSession;
  
  // Find all steps with stored thresholds in the current session
  const thresholdSteps = currentSession.testSequence.filter(
    step => step.completed && step.responseStatus === 'threshold'
  );
  
  console.log(`Preserving ${thresholdSteps.length} thresholds from current session:`, 
    thresholdSteps.map(s => `${s.frequency}Hz ${s.ear} ear at ${s.currentLevel}dB`).join(', '));
  
  // Update the new session with the stored thresholds
  if (thresholdSteps.length > 0) {
    thresholdSteps.forEach(storedStep => {
      // Find the matching step in the new session
      const matchingIndex = sessionCopy.testSequence.findIndex(
        step => step.frequency === storedStep.frequency && 
               step.ear === storedStep.ear &&
               step.testType === storedStep.testType
      );
      
      if (matchingIndex !== -1) {
        // Preserve the threshold data in the new session
        sessionCopy.testSequence[matchingIndex] = {
          ...sessionCopy.testSequence[matchingIndex],
          completed: true,
          responseStatus: 'threshold',
          currentLevel: storedStep.currentLevel
        };
      }
    });
  }
  
  return sessionCopy;
};

/**
 * Simulates a patient response based on hearing threshold
 */
export const simulatePatientResponse = (
  currentStep: TestStep | null,
  patientThresholds: ThresholdPoint[]
): boolean => {
  if (!currentStep) return false;
  
  // Find matching threshold for current frequency and ear
  const matchingThreshold = patientThresholds.find(
    t => t.frequency === currentStep.frequency && 
         t.ear === currentStep.ear && 
         t.testType === currentStep.testType
  );
  
  if (!matchingThreshold) return false;
  
  // Patient responds if the current level is at or above their threshold
  // Add some variability (±5 dB) to make it more realistic
  const variability = Math.floor(Math.random() * 10) - 5;
  
  // Ensure the effective threshold is never below 5dB
  // Even if the patient's actual threshold is lower, they should not respond below 5dB
  const rawThreshold = matchingThreshold.hearingLevel + variability;
  const effectiveThreshold = Math.max(5, rawThreshold);
  
  return currentStep.currentLevel >= effectiveThreshold;
};

/**
 * Formats frequency for display
 */
export const formatFrequency = (freq: number): string => {
  if (freq >= 1000) {
    return `${freq / 1000}k`;
  }
  return freq.toString();
};

/**
 * Gets a readable label for the test type
 */
export const getTestTypeLabel = (testType: string): string => {
  switch (testType) {
    case 'air':
      return 'Air Conduction';
    case 'bone':
      return 'Bone Conduction';
    case 'masked_air':
      return 'Masked Air Conduction';
    case 'masked_bone':
      return 'Masked Bone Conduction';
    default:
      return 'Unknown Test Type';
  }
};

/**
 * Extracts all thresholds from a session
 */
export const extractThresholds = (session: TestSession | null): ThresholdPoint[] => {
  if (!session) return [];
  
  // Filter steps with completed=true and responseStatus=threshold
  const completedSteps = session.testSequence.filter(
    step => step.completed && step.responseStatus === 'threshold'
  );
  
  console.log(`Extracting thresholds from session - found ${completedSteps.length} completed steps with thresholds`);
  console.log('Completed steps with responseStatus=threshold:', completedSteps);
  
  // Create a map to ensure we track unique thresholds per frequency/ear combination
  const uniqueThresholds = new Map<string, ThresholdPoint>();
  
  // Process all completed steps with threshold status
  completedSteps.forEach(step => {
    // Create a unique key for this frequency/ear/testType combination
    const key = `${step.frequency}-${step.ear}-${step.testType || 'air'}`;
    
    // Create the threshold point
    const thresholdPoint: ThresholdPoint = {
      frequency: step.frequency,
      hearingLevel: step.currentLevel,
      ear: step.ear,
      testType: step.testType || 'air',
      responseStatus: 'threshold'
    };
    
    console.log(`Adding threshold: ${step.frequency}Hz, ${step.ear} ear, ${step.currentLevel}dB HL, key=${key}`);
    
    // Store it in our map, which ensures we only have one threshold per frequency/ear/testType
    uniqueThresholds.set(key, thresholdPoint);
  });
  
  // Convert the map values back to an array
  const extractedThresholds = Array.from(uniqueThresholds.values());
  console.log(`Extracted ${extractedThresholds.length} unique thresholds:`, extractedThresholds);
  
  return extractedThresholds;
}; 