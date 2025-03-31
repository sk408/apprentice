import { v4 as uuidv4 } from 'uuid';
import { 
  TestSession, TestStep, HearingProfile, ThresholdPoint, 
  Frequency, HearingLevel, TestResult, Ear, TestType 
} from '../interfaces/AudioTypes';
import audioService from './AudioService';
import patientService from './PatientService';

/**
 * Interface for test session configuration
 */
interface TestSessionConfig {
  includeAirConduction?: boolean;
  includeBoneConduction?: boolean;
}

/**
 * TestingService - Implements the Hughson-Westlake testing protocol
 * and manages test sessions
 */
class TestingService {
  private currentSession: TestSession | null = null;
  private activeSessions: TestSession[] = [];
  private completedSessions: TestSession[] = [];
  private falsePositiveCount: number = 0;

  // Standard test frequencies in Hz (from low to high)
  // UPDATED: Using the specific frequencies required for air conduction
  private testFrequencies: Frequency[] = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
  
  // Bone conduction test frequencies (typically 250-4000 Hz)
  // UPDATED: Using the specific frequencies required for bone conduction
  private boneTestFrequencies: Frequency[] = [500, 1000, 2000, 4000];
  
  // Test types to include in sequence
  private testTypes: ('air' | 'bone')[] = ['air', 'bone'];
  
  // Default starting level in dB HL
  private defaultStartLevel: HearingLevel = 40;
  
  // Step sizes for the Hughson-Westlake procedure
  private initialStepSize: number = 10;
  private finalStepSize: number = 5;

  // Whether to include bone conduction tests
  private includeBoneConduction: boolean = true;

  // Whether to include air conduction tests
  private includeAirConduction: boolean = true;

  /**
   * Start a new test session with a patient
   * @param patient - Patient profile
   * @param config - Test configuration options
   * @returns New test session
   */
  public startSession(patient: HearingProfile, config?: TestSessionConfig): TestSession {
    // Apply configuration settings
    if (config) {
      if (config.includeAirConduction !== undefined) {
        this.includeAirConduction = config.includeAirConduction;
      }
      if (config.includeBoneConduction !== undefined) {
        this.includeBoneConduction = config.includeBoneConduction;
      }
    }
    
    // Generate test sequence based on Hughson-Westlake protocol
    const testSequence = this.generateTestSequence();
    
    // Create new session
    const newSession: TestSession = {
      id: uuidv4(),
      startTime: new Date().toISOString(),
      patientId: patient.id,
      completed: false,
      testSequence,
      currentStep: 0
    };
    
    this.currentSession = newSession;
    this.activeSessions.push(newSession);
    
    return newSession;
  }

  /**
   * Generate a test sequence based on the Hughson-Westlake protocol
   * @returns Array of test steps
   */
  private generateTestSequence(): TestStep[] {
    const sequence: TestStep[] = [];
    let stepId = 1;
    
    // Define the correct test order: first air conduction for both ears, then bone conduction for both ears
    const testSequenceOrder = [
      { ear: 'right' as Ear, testType: 'air' as TestType },
      { ear: 'left' as Ear, testType: 'air' as TestType },
      { ear: 'right' as Ear, testType: 'bone' as TestType },
      { ear: 'left' as Ear, testType: 'bone' as TestType }
    ];
    
    // For each test configuration in the sequence
    testSequenceOrder.forEach(({ ear, testType }) => {
      // Skip bone conduction if not included in test settings
      if (testType === 'bone' && !this.includeBoneConduction) {
        return;
      }
      
      // Skip air conduction if not included in test settings
      if (testType === 'air' && !this.includeAirConduction) {
        return;
      }
      
      // Select appropriate frequencies for this test type
      const rawFrequencies = testType === 'bone' ? this.boneTestFrequencies : this.testFrequencies;
      
      // Standard clinical protocol:
      // 1. Start at 1000 Hz
      // 2. Test ascending frequencies (1500 Hz+)
      // 3. Retest 1000 Hz to verify
      // 4. Test descending frequencies (750 Hz-)
      const frequencySequence: Frequency[] = [];
      
      // Find the index of 1000 Hz in the original frequency array
      const idx1000Hz = rawFrequencies.indexOf(1000);
      
      if (idx1000Hz !== -1) {
        // Step 1: Start with 1000 Hz
        frequencySequence.push(1000);
        
        // Step 2: Add ascending frequencies (after 1000 Hz)
        for (let i = idx1000Hz + 1; i < rawFrequencies.length; i++) {
          frequencySequence.push(rawFrequencies[i]);
        }
        
        // Step 3: Retest 1000 Hz
        frequencySequence.push(1000);
        
        // Step 4: Add descending frequencies (before 1000 Hz)
        for (let i = idx1000Hz - 1; i >= 0; i--) {
          frequencySequence.push(rawFrequencies[i]);
        }
      } else {
        // 1000 Hz not found, use original order as fallback
        frequencySequence.push(...rawFrequencies);
      }
      
      // For each frequency in the ordered sequence
      frequencySequence.forEach(freq => {
        // Add test step
        sequence.push({
          id: stepId++,
          frequency: freq,
          ear: ear,
          testType: testType,
          currentLevel: this.defaultStartLevel,
          completed: false,
          responses: []
        });
      });
    });
    
    return sequence;
  }

  /**
   * Get the current test step
   * @returns Current test step or null if no active session
   */
  public getCurrentStep(): TestStep | null {
    if (!this.currentSession) return null;
    
    const { currentStep, testSequence } = this.currentSession;
    if (currentStep >= testSequence.length) return null;
    
    return testSequence[currentStep];
  }

  /**
   * Play the current tone based on the current step
   * @param durationMs - Optional duration in milliseconds
   * @param isPulsed - Whether to play as a pulsed tone
   */
  public playCurrentTone(durationMs?: number, isPulsed: boolean = true): void {
    const currentStep = this.getCurrentStep();
    if (!currentStep) return;
    
    const { frequency, ear, currentLevel, testType } = currentStep;
    
    // Play the tone with the appropriate parameters
    audioService.playTone(
      frequency,
      currentLevel,
      ear,
      durationMs,
      testType, // Pass the test type to the playTone method
      isPulsed  // Use pulsed tone by default
    );
  }

  /**
   * Record patient response to the current tone
   * @param didRespond - Whether the patient responded to the tone
   * @returns Updated test step
   */
  public recordResponse(didRespond: boolean): TestStep | null {
    if (!this.currentSession) return null;
    
    const step = this.getCurrentStep();
    if (!step) return null;
    
    // Record the response
    step.responses.push({
      level: step.currentLevel,
      response: didRespond
    });
    
    // Apply Hughson-Westlake protocol to adjust the level
    this.adjustLevelPerProtocol(step, didRespond);
    
    return step;
  }

  /**
   * Record patient response without adjusting the level
   * Use this during tone presentation to prevent automatic level changes
   * @param didRespond - Whether the patient responded to the tone
   * @returns Updated test step without level adjustment
   */
  public recordResponseWithoutAdjustment(didRespond: boolean): TestStep | null {
    if (!this.currentSession) return null;
    
    const step = this.getCurrentStep();
    if (!step) return null;
    
    // Record the response without adjusting the level
    step.responses.push({
      level: step.currentLevel,
      response: didRespond
    });
    
    // Do NOT apply Hughson-Westlake protocol to adjust the level
    // This allows manual control of level adjustments
    
    return step;
  }

  /**
   * Manually set the current level without applying any protocol adjustments
   * @param level - The hearing level in dB to set
   * @returns Updated test step or null if no active session
   */
  public setCurrentLevel(level: HearingLevel): TestStep | null {
    if (!this.currentSession) return null;
    
    const step = this.getCurrentStep();
    if (!step) return null;
    
    // Set the level directly without any protocol-based adjustments
    // Store the current frequency and ear to ensure we're only updating the correct step
    const currentFrequency = step.frequency;
    const currentEar = step.ear;
    
    console.log(`TestingService: Setting level for frequency ${currentFrequency}Hz, ${currentEar} ear to ${level}dB`);
    
    // Only update the current step to prevent affecting other frequencies
    step.currentLevel = level;
    
    return step;
  }

  /**
   * Adjust the hearing level according to Hughson-Westlake protocol
   * @param step - Current test step
   * @param didRespond - Whether the patient responded
   */
  private adjustLevelPerProtocol(step: TestStep, didRespond: boolean): void {
    const { responses } = step;
    
    if (didRespond) {
      // Patient responded - ALWAYS decrease level by 10dB (make it softer)
      // This is a core principle of Hughson-Westlake: any response triggers 10 dB descent
      step.currentLevel = Math.max(-10, step.currentLevel - 10) as HearingLevel;
      console.log(`Patient responded: Decreasing by 10 dB to ${step.currentLevel} dB (Hughson-Westlake protocol)`);
    } else {
      // Patient did not respond - increase by 5 dB
      // In Hughson-Westlake, after no response during bracketing, always use 5 dB ascent
      // The only exception is during the initial phase with very large step sizes
      const isInitialPhase = responses.length < 2; 
      const stepSize = isInitialPhase ? this.initialStepSize : this.finalStepSize;
      step.currentLevel = Math.min(120, step.currentLevel + stepSize) as HearingLevel;
      console.log(`No response: Increasing by ${stepSize} dB to ${step.currentLevel} dB (${isInitialPhase ? 'Initial phase' : 'Bracketing phase'})`);
    }
    
    // Check if threshold is established per Hughson-Westlake criteria
    if (this.isThresholdEstablished(step)) {
      step.completed = true;
      this.moveToNextStep();
    }
  }

  /**
   * Determine step size based on the stage of testing
   * @param step - Current test step
   * @returns Step size in dB
   */
  private determineStepSize(step: TestStep): number {
    const { responses } = step;
    
    // In Hughson-Westlake protocol:
    // - Initial phase with no responses or very few: use 10 dB steps
    // - After first response: Always 10 dB DOWN after response, 5 dB UP after no response
    
    // Initial phase: use 10dB steps
    if (responses.length < 2) {
      return this.initialStepSize; // 10dB
    }
    
    // Once we have responses, use 5dB steps for more precision
    return this.finalStepSize; // 5dB
  }

  /**
   * Check if threshold is established according to Hughson-Westlake criteria
   * @param step - Current test step
   * @returns Whether threshold is established
   */
  private isThresholdEstablished(step: TestStep): boolean {
    const { responses } = step;
    
    // Need a minimum number of responses before we can establish a threshold
    if (responses.length < 3) return false;
    
    // Get responses at each level
    const responseCounts = new Map<HearingLevel, { total: number, heard: number }>();
    
    responses.forEach(response => {
      const level = response.level;
      const existing = responseCounts.get(level) || { total: 0, heard: 0 };
      existing.total += 1;
      if (response.response) {
        existing.heard += 1;
      }
      responseCounts.set(level, existing);
    });
    
    // Check for any level with at least 2/3 positive responses
    // Hughson-Westlake defines threshold as the lowest level with ≥50% response rate
    let isThresholdFound = false;
    let lowestThresholdLevel: HearingLevel | null = null;
    
    responseCounts.forEach((counts, level) => {
      // Check if we have at least 3 presentations and 2+ responses at this level
      if (counts.total >= 3 && counts.heard >= 2) {
        // If we haven't found a threshold yet, or this is a lower level than previously found
        if (!isThresholdFound || (lowestThresholdLevel !== null && level < lowestThresholdLevel)) {
          isThresholdFound = true;
          lowestThresholdLevel = level;
          console.log(`Threshold identified at ${level} dB with ${counts.heard}/${counts.total} responses`);
        }
      }
    });
    
    if (isThresholdFound) {
      console.log(`Final threshold established at ${lowestThresholdLevel} dB`);
    }
    
    return isThresholdFound;
  }

  /**
   * Move to the next test step
   */
  private moveToNextStep(): void {
    if (!this.currentSession) return;
    
    // Log the current step's level and status before moving
    const currentStep = this.getCurrentStep();
    if (currentStep) {
      console.log(`Completing step at level: ${currentStep.currentLevel}dB before moving to next step`);
      console.log(`Step completed status: ${currentStep.completed}, responseStatus: ${currentStep.responseStatus || 'not set'}`);
    }
    
    // Increment the step counter
    this.currentSession.currentStep += 1;
    
    // Check if we've reached the end of the sequence
    if (this.currentSession.currentStep >= this.currentSession.testSequence.length) {
      // Reset the step counter to the last valid step instead of completing the session
      this.currentSession.currentStep = this.currentSession.testSequence.length - 1;
      console.log('Reached end of test sequence. Staying on last step.');
    }
  }

  /**
   * Skip the current test step and move to the next one
   * @param markCompleted - Whether to mark the current step as completed (default: false)
   * @returns The next test step or null if test is complete
   */
  public skipCurrentStep(markCompleted: boolean = false): TestStep | null {
    console.log("=== Debug: skipCurrentStep called with markCompleted =", markCompleted);
    
    if (!this.currentSession) {
      console.log("=== Debug: skipCurrentStep - no current session");
      return null;
    }
    
    const step = this.getCurrentStep();
    if (step) {
      if (markCompleted) {
        console.log(`Marking step as completed with threshold at: ${step.currentLevel}dB`);
        step.completed = true;
        
        // If we're marking as completed, also set responseStatus if not already set
        if (!step.responseStatus) {
          step.responseStatus = 'threshold';
        }
      } else {
        console.log(`Skipping to next step without marking current step as completed`);
      }
      
      const beforeStep = this.currentSession.currentStep;
      
      // Check if this is the last step
      const isLastStep = beforeStep === this.currentSession.testSequence.length - 1;
      
      if (!isLastStep) {
        this.moveToNextStep();
      } else {
        console.log('Already at last step, not moving forward');
      }
      
      const afterStep = this.currentSession.currentStep;
      console.log(`=== Debug: skipCurrentStep - moved from step ${beforeStep} to ${afterStep}`);
      
      // If we're on the last step and it's completed, check if the entire test is complete
      if (isLastStep && step.completed) {
        const allStepsComplete = this.currentSession.testSequence.every(s => 
          s.completed && (s.responseStatus === 'threshold' || s.responseStatus === 'no_response')
        );
        
        if (allStepsComplete) {
          console.log('All steps are complete. Test can be finished.');
        }
      }
    } else {
      console.log("=== Debug: skipCurrentStep - no current step found");
    }
    
    return this.getCurrentStep();
  }

  /**
   * Complete the current test session and calculate results
   * @returns The completed test session with results
   */
  public completeSession(): TestSession | null {
    if (!this.currentSession) return null;
    
    const session = this.currentSession;
    session.completed = true;
    
    // Calculate the results - make sure patient details are included
    const patientId = session.patientId;
    const patient = patientService.getPatientById(patientId);
    
    // Calculate the results - pass the patient's actual thresholds
    const results = this.calculateResults(session, patient?.thresholds || []);
    session.results = results;
    
    // Debug log to verify results are correctly populated
    console.log('Completing test session with results:', {
      sessionId: session.id,
      userThresholds: results.userThresholds?.length || 0,
      actualThresholds: results.actualThresholds?.length || 0
    });
    
    // Move from active to completed sessions
    this.completedSessions.push(session);
    this.activeSessions = this.activeSessions.filter(s => s.id !== session.id);
    this.currentSession = null;
    
    return session;
  }

  /**
   * Calculate test results including accuracy and technical errors
   * @param session - Completed test session
   * @param actualThresholds - Patient's actual thresholds for comparison
   * @returns Test results
   */
  private calculateResults(session: TestSession, actualThresholds: ThresholdPoint[] = []): TestResult {
    const userThresholds = this.extractThresholds(session);
    
    // Calculate accuracy only for frequencies that were actually tested
    let accuracySum = 0;
    let comparedCount = 0;
    
    userThresholds.forEach(userT => {
      // Only compare thresholds that were actually tested
      if (userT.responseStatus === 'threshold') {
        const matchingActual = actualThresholds.find(
          actT => 
            actT.frequency === userT.frequency && 
            actT.ear === userT.ear && 
            actT.testType === userT.testType && 
            actT.responseStatus === 'threshold'
        );
        
        if (matchingActual) {
          const difference = Math.abs(userT.hearingLevel - matchingActual.hearingLevel);
          if (difference <= 5) {
            // Within 5dB is considered accurate
            accuracySum += 100 - (difference * 5); // 100% for exact match, 75% for 5dB difference
          } else if (difference <= 10) {
            // Within 10dB is partially accurate
            accuracySum += 50; // 50% accuracy for 6-10dB difference
          } else {
            // More than 10dB difference is considered inaccurate
            accuracySum += 25; // 25% accuracy for >10dB difference
          }
          comparedCount++;
        }
      }
    });
    
    // Calculate overall accuracy based on tested frequencies only
    const accuracy = comparedCount > 0 ? Math.round(accuracySum / comparedCount) : 0;
    
    // Calculate total unique frequencies expected
    const uniqueFreqsPerEar = {
      air: this.includeAirConduction ? 10 : 0,  // 10 frequencies for air conduction (1kHz counted once)
      bone: this.includeBoneConduction ? 4 : 0  // 4 frequencies for bone conduction (1kHz counted once)
    };
    
    const totalUniqueFreqs = (uniqueFreqsPerEar.air * 2) + (uniqueFreqsPerEar.bone * 2); // Multiply by 2 for both ears
    
    // Count tested frequencies (excluding duplicate 1kHz tests)
    const testedFrequencies = new Set(
      userThresholds
        .filter(t => t.responseStatus !== 'not_tested')
        .map(t => `${t.frequency}-${t.ear}-${t.testType}`)
    ).size;
    
    // Create the result object
    const result: TestResult = {
      patientId: session.patientId,
      timestamp: new Date().toISOString(),
      userThresholds: userThresholds,
      actualThresholds: actualThresholds,
      accuracy: accuracy,
      testDuration: this.calculateTestDuration(session),
      technicalErrors: this.identifyTechnicalErrors(session),
      falsePositives: this.falsePositiveCount,
      completionStatus: {
        totalFrequencies: totalUniqueFreqs,
        testedFrequencies: testedFrequencies,
        untestedFrequencies: totalUniqueFreqs - testedFrequencies,
        completionPercentage: Math.round((testedFrequencies / totalUniqueFreqs) * 100)
      }
    };
    
    // Reset the false positive count for the next session
    this.falsePositiveCount = 0;
    
    return result;
  }

  /**
   * Extract threshold points from a completed test session
   * @param session - Completed test session
   * @returns Array of threshold points
   */
  private extractThresholds(session: TestSession): ThresholdPoint[] {
    // First, group steps by unique frequency-ear-type combinations
    const stepGroups = new Map<string, TestStep[]>();
    session.testSequence.forEach(step => {
      const key = `${step.frequency}-${step.ear}-${step.testType}`;
      if (!stepGroups.has(key)) {
        stepGroups.set(key, []);
      }
      stepGroups.get(key)!.push(step);
    });

    const thresholds: ThresholdPoint[] = [];
    
    // Process each unique frequency-ear-type combination
    stepGroups.forEach((steps, key) => {
      // For 1kHz, find the best result among multiple tests
      if (steps[0].frequency === 1000) {
        // Find the step with the most complete data
        const completedStep = steps.find(s => s.completed && s.responseStatus === 'threshold');
        if (completedStep) {
          // Use the completed step's data
          thresholds.push({
            frequency: completedStep.frequency,
            hearingLevel: completedStep.currentLevel,
            ear: completedStep.ear,
            testType: completedStep.testType,
            responseStatus: 'threshold'
          });
        } else {
          // Find step with most responses if none are completed
          const stepWithMostResponses = steps.reduce((prev, curr) => 
            (curr.responses.length > prev.responses.length) ? curr : prev
          );
          
          if (stepWithMostResponses.responses.length > 0) {
            // Process responses to find threshold or no_response status
            const levelCounts = new Map<HearingLevel, number>();
            stepWithMostResponses.responses.forEach(response => {
              if (response.response) {
                const count = levelCounts.get(response.level) || 0;
                levelCounts.set(response.level, count + 1);
              }
            });
            
            // Find lowest level with at least 2 responses
            let thresholdLevel: HearingLevel | null = null;
            let lowestLevel = Infinity;
            
            levelCounts.forEach((count, level) => {
              if (count >= 2 && level < lowestLevel) {
                lowestLevel = level;
                thresholdLevel = level;
              }
            });
            
            if (thresholdLevel !== null) {
              thresholds.push({
                frequency: stepWithMostResponses.frequency,
                hearingLevel: thresholdLevel,
                ear: stepWithMostResponses.ear,
                testType: stepWithMostResponses.testType,
                responseStatus: 'threshold'
              });
            } else {
              // No valid threshold found, use highest tested level as 'no_response'
              const highestLevel = Math.max(...stepWithMostResponses.responses.map(r => r.level)) as HearingLevel;
              thresholds.push({
                frequency: stepWithMostResponses.frequency,
                hearingLevel: highestLevel,
                ear: stepWithMostResponses.ear,
                testType: stepWithMostResponses.testType,
                responseStatus: 'no_response'
              });
            }
          } else {
            // No responses recorded for either test
            thresholds.push({
              frequency: steps[0].frequency,
              hearingLevel: 0 as HearingLevel,
              ear: steps[0].ear,
              testType: steps[0].testType,
              responseStatus: 'not_tested'
            });
          }
        }
      } else {
        // For non-1kHz frequencies, process normally
        const step = steps[0];
        if (step.completed && step.responseStatus === 'threshold') {
          thresholds.push({
            frequency: step.frequency,
            hearingLevel: step.currentLevel,
            ear: step.ear,
            testType: step.testType,
            responseStatus: 'threshold'
          });
        } else if (step.responses.length > 0) {
          // Process responses to find threshold or no_response status
          const levelCounts = new Map<HearingLevel, number>();
          step.responses.forEach(response => {
            if (response.response) {
              const count = levelCounts.get(response.level) || 0;
              levelCounts.set(response.level, count + 1);
            }
          });
          
          // Find lowest level with at least 2 responses
          let thresholdLevel: HearingLevel | null = null;
          let lowestLevel = Infinity;
          
          levelCounts.forEach((count, level) => {
            if (count >= 2 && level < lowestLevel) {
              lowestLevel = level;
              thresholdLevel = level;
            }
          });
          
          if (thresholdLevel !== null) {
            thresholds.push({
              frequency: step.frequency,
              hearingLevel: thresholdLevel,
              ear: step.ear,
              testType: step.testType,
              responseStatus: 'threshold'
            });
          } else {
            // No valid threshold found, use highest tested level as 'no_response'
            const highestLevel = Math.max(...step.responses.map(r => r.level)) as HearingLevel;
            thresholds.push({
              frequency: step.frequency,
              hearingLevel: highestLevel,
              ear: step.ear,
              testType: step.testType,
              responseStatus: 'no_response'
            });
          }
        } else {
          // Step was not tested at all
          thresholds.push({
            frequency: step.frequency,
            hearingLevel: 0 as HearingLevel,
            ear: step.ear,
            testType: step.testType,
            responseStatus: 'not_tested'
          });
        }
      }
    });
    
    return thresholds;
  }

  /**
   * Calculate the total duration of a test session
   * @param session - Test session
   * @returns Duration in seconds
   */
  private calculateTestDuration(session: TestSession): number {
    const startTime = new Date(session.startTime).getTime();
    const endTime = new Date().getTime();
    
    return Math.round((endTime - startTime) / 1000);
  }

  /**
   * Identify technical errors made during the test
   * @param session - Test session
   * @returns Array of error descriptions
   */
  private identifyTechnicalErrors(session: TestSession): string[] {
    const errors: string[] = [];
    
    // Check if some frequencies were skipped
    const skippedSteps = session.testSequence.filter(step => !step.completed);
    if (skippedSteps.length > 0) {
      errors.push(`Skipped ${skippedSteps.length} test frequencies`);
    }
    
    // Check if sufficient responses were collected
    session.testSequence.forEach(step => {
      if (step.completed && step.responses.length < 3) {
        errors.push(`Insufficient responses for ${step.frequency} Hz in ${step.ear} ear`);
      }
    });
    
    // Check if the starting level was appropriate
    session.testSequence.forEach(step => {
      if (step.responses.length > 0 && step.responses[0].level > 60) {
        errors.push(`Starting level too high for ${step.frequency} Hz in ${step.ear} ear`);
      }
    });
    
    return errors;
  }

  /**
   * Get the current active session
   * @returns Current test session or null if none active
   */
  public getCurrentSession(): TestSession | null {
    return this.currentSession;
  }

  /**
   * Get all active test sessions
   * @returns Array of active test sessions
   */
  public getActiveSessions(): TestSession[] {
    return [...this.activeSessions];
  }

  /**
   * Get all completed test sessions
   * @returns Array of completed test sessions
   */
  public getCompletedSessions(): TestSession[] {
    return [...this.completedSessions];
  }

  /**
   * Get a session by ID
   * @param id - Session ID
   * @returns Test session or null if not found
   */
  public getSessionById(id: string): TestSession | null {
    return (
      this.activeSessions.find(s => s.id === id) ||
      this.completedSessions.find(s => s.id === id) ||
      null
    );
  }

  /**
   * Clear all test sessions (for cleaning up or testing)
   */
  public clearAllSessions(): void {
    this.activeSessions = [];
    this.completedSessions = [];
    this.currentSession = null;
  }

  /**
   * Calculate progress percentage of the current test session
   * @returns Progress as a percentage from 0-100
   */
  public calculateProgress(): number {
    if (!this.currentSession) return 0;
    
    const totalSteps = this.currentSession.testSequence.length;
    if (totalSteps === 0) return 0;
    
    // Group steps by frequency, ear, and test type
    const stepGroups = new Map<string, TestStep[]>();
    this.currentSession.testSequence.forEach(step => {
      const key = `${step.frequency}-${step.ear}-${step.testType}`;
      if (!stepGroups.has(key)) {
        stepGroups.set(key, []);
      }
      stepGroups.get(key)!.push(step);
    });

    // Count completed unique frequency-ear-type combinations
    let completedUniqueSteps = 0;
    let totalUniqueSteps = 0;

    // Calculate expected total steps:
    // Air conduction: 10 frequencies per ear (counting 1kHz once)
    // Bone conduction: 4 frequencies per ear (counting 1kHz once)
    const airConductionFreqs = this.includeAirConduction ? 20 : 0; // 10 per ear
    const boneConductionFreqs = this.includeBoneConduction ? 8 : 0; // 4 per ear
    totalUniqueSteps = airConductionFreqs + boneConductionFreqs;

    // Count completed steps
    const completedByEarType = new Map<string, Set<number>>();
    
    // Initialize sets for each ear and test type
    ['right-air', 'left-air', 'right-bone', 'left-bone'].forEach(key => {
      completedByEarType.set(key, new Set());
    });

    // Process each step
    this.currentSession.testSequence.forEach(step => {
      if (step.completed && step.responseStatus === 'threshold') {
        const key = `${step.ear}-${step.testType}`;
        completedByEarType.get(key)?.add(step.frequency);
      }
    });

    // Count unique completed frequencies for each ear and test type
    let totalCompleted = 0;
    completedByEarType.forEach((frequencies, key) => {
      const [ear, testType] = key.split('-');
      // For each ear-type combination, count unique frequencies
      totalCompleted += frequencies.size;
    });

    completedUniqueSteps = totalCompleted;
    
    // Calculate progress based on unique steps
    const progress = Math.round((completedUniqueSteps / totalUniqueSteps) * 100);
    
    // Enhanced debugging
    console.log(`Progress calculation:`, {
      totalUniqueSteps,
      completedUniqueSteps,
      progress,
      airConductionFreqs,
      boneConductionFreqs,
      completedByEarType: Array.from(completedByEarType.entries()).map(([key, freqs]) => ({
        key,
        frequencies: Array.from(freqs)
      })),
      stepGroups: Array.from(stepGroups.entries()).map(([key, steps]) => ({
        key,
        completed: steps.some(s => s.completed && s.responseStatus === 'threshold'),
        steps: steps.map(s => ({
          id: s.id,
          frequency: s.frequency,
          ear: s.ear,
          completed: s.completed,
          responseStatus: s.responseStatus
        }))
      }))
    });
    
    return progress;
  }

  /**
   * Complete the current step with the specified response status
   * @param responseStatus - The response status for the completed step
   * @returns Whether the step was completed successfully
   */
  public completeCurrentStep(responseStatus: 'threshold' | 'no_response' | 'not_tested'): boolean {
    if (!this.currentSession || this.currentSession.currentStep === undefined) {
      console.error('Cannot complete step: No current session or step');
      return false;
    }
    
    const stepIndex = this.currentSession.currentStep;
    if (stepIndex < 0 || stepIndex >= this.currentSession.testSequence.length) {
      console.error(`Invalid step index: ${stepIndex}`);
      return false;
    }
    
    // Mark the step as completed with the specified responseStatus
    this.currentSession.testSequence[stepIndex].completed = true;
    this.currentSession.testSequence[stepIndex].responseStatus = responseStatus;
    
    console.log(`Marked step ${stepIndex} as completed with responseStatus='${responseStatus}'`);
    
    return true;
  }

  /**
   * Record a false positive response (patient responded when no tone was presented)
   * This helps track patient reliability
   */
  public recordFalsePositive(): void {
    // Increment the false positive counter
    this.falsePositiveCount++;
    console.log(`False positive recorded. Total: ${this.falsePositiveCount}`);
  }
}

// Create a singleton instance
const testingService = new TestingService();
export default testingService;