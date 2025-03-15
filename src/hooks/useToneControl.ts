import { useCallback } from 'react';
import { TestStep } from '../interfaces/AudioTypes';
import testingService from '../services/TestingService';
import audioService from '../services/AudioService';
import { simulatePatientResponse } from './useAudioTestHelpers';

interface UseToneControlProps {
  currentStep: TestStep | null;
  toneActive: boolean;
  setToneActive: (active: boolean) => void;
  patientResponse: boolean | null;
  setPatientResponse: (response: boolean | null) => void;
  setShowResponseIndicator: (show: boolean) => void;
  setPatientJustResponded: (responded: boolean) => void;
  lastPresentationTimeRef: React.MutableRefObject<number>;
  lastProcessedPresentationRef: React.MutableRefObject<number>;
  thresholdPhaseStartTime: React.MutableRefObject<number | null>;
  updateTrainerState: (didRespond: boolean) => void;
  patientThresholds: any[];
}

/**
 * Custom hook for tone control operations
 */
export default function useToneControl({
  currentStep,
  toneActive,
  setToneActive,
  patientResponse,
  setPatientResponse,
  setShowResponseIndicator,
  setPatientJustResponded,
  lastPresentationTimeRef,
  lastProcessedPresentationRef,
  thresholdPhaseStartTime,
  updateTrainerState,
  patientThresholds
}: UseToneControlProps) {
  
  // Start playing tone with pulsing pattern
  const startTone = useCallback(() => {
    if (!currentStep) return;
    
    try {
      console.log('🎵 Starting tone...');
      
      // Stop any currently playing tones to ensure a clean start
      audioService.stopTone();
      
      // Make sure TestingService has the correct level before playing
      if (currentStep) {
        // Ensure the testing service knows about our current step's frequency
        const currentFrequency = currentStep.frequency;
        console.log(`🔊 Explicit frequency check: Using ${currentFrequency}Hz for tone`);
        
        // Ensure the testing service knows about our current manually set level
        testingService.setCurrentLevel(currentStep.currentLevel);
        console.log(`🔊 Starting tone at user-set level: ${currentStep.currentLevel}dB`);
      }
      
      // Reset response states at the start of a new tone
      setPatientResponse(null);
      setPatientJustResponded(false);
      setShowResponseIndicator(false);
      console.log('🔄 Response states reset');
      
      // Set tone active state BEFORE playing tone
      setToneActive(true);
      console.log('🔊 Tone active set to true');
      
      // Play the tone with pulsing - this now happens in AudioService
      testingService.playCurrentTone();
      console.log('🎵 Pulsed tone started');
      
      // Immediate response check - show response immediately if patient can hear it
      const didRespond = simulatePatientResponse(currentStep, patientThresholds);
      console.log('👂 Immediate patient response check:', didRespond);
      
      if (didRespond) {
        setPatientResponse(didRespond);
        setShowResponseIndicator(true);
        setPatientJustResponded(true);
        console.log('👂 Patient IMMEDIATELY responded to the tone!');
        
        // Record the response in the testing service for later processing
        console.log('💾 Recording immediate response for later processing');
        testingService.recordResponseWithoutAdjustment(didRespond);
      }
      
      // Record the presentation time
      console.log('🎯 Recording tone presentation time');
      lastPresentationTimeRef.current = Date.now();
      
    } catch (error) {
      console.error("❌ Error playing tone:", error);
      
      setToneActive(false);
      audioService.stopTone();
    }
  }, [
    currentStep, 
    setToneActive, 
    setPatientResponse, 
    setShowResponseIndicator, 
    setPatientJustResponded, 
    lastPresentationTimeRef,
    patientThresholds
  ]);

  // Stop tone and check for patient response
  const stopTone = useCallback(() => {
    console.log('🛑 Stopping tone...');
    
    // Stop the pulsing tone
    audioService.stopTone();
    
    // Get current states BEFORE changing any state to avoid race conditions
    const currentToneActive = toneActive;
    const currentPatientResponse = patientResponse;
    
    // Log current state for debugging
    console.log('🛑 Stopping tone with current state:', {
      toneActive: currentToneActive,
      patientResponse: currentPatientResponse
    });
    
    // Set tone inactive
    setToneActive(false);
    
    // Record the time of this presentation to prevent duplicate responses
    const presentationStopTime = Date.now();
    lastPresentationTimeRef.current = presentationStopTime;
    
    console.log('⏱️ Presentation stopped at:', presentationStopTime);
    
    // Simulate a patient response for internal processing if one doesn't exist yet
    let effectiveResponse = currentPatientResponse;
    if (effectiveResponse === null) {
      // If we haven't determined a response yet, do so now
      const didRespond = simulatePatientResponse(currentStep, patientThresholds);
      console.log('🔊 Simulating patient response at tone stop for internal processing only:', didRespond);
      
      // Use this response for processing but don't update UI
      effectiveResponse = didRespond;
    } else {
      console.log('🔊 Using existing patient response from during tone playback:', effectiveResponse);
    }
    
    // Always process a response after stopping the tone
    if (currentStep) {
      // Make sure this is a fresh presentation that hasn't been processed yet
      if (presentationStopTime > lastProcessedPresentationRef.current) {
        console.log(`✅ Processing new presentation. Current: ${presentationStopTime}, Last processed: ${lastProcessedPresentationRef.current}`);
        
        // Process the response
        if (effectiveResponse !== null) {
          // Store the response in the testing service
          testingService.recordResponseWithoutAdjustment(Boolean(effectiveResponse));
          
          // Update trainer state IMMEDIATELY
          console.log('🔄 Immediately updating trainer state with response:', effectiveResponse);
          updateTrainerState(Boolean(effectiveResponse));
          
          // Update the last processed time
          lastProcessedPresentationRef.current = presentationStopTime;
        } else {
          // FIXED: If effectiveResponse is null but we had a previous patient response during the tone
          // that wasn't yet processed by updateTrainerState, we need to process it now
          console.log('⚠️ Checking for unprocessed patient response from during tone playback');
          if (currentPatientResponse !== null) {
            console.log('✅ Found unprocessed patient response:', currentPatientResponse);
            testingService.recordResponseWithoutAdjustment(Boolean(currentPatientResponse));
            updateTrainerState(Boolean(currentPatientResponse));
            lastProcessedPresentationRef.current = presentationStopTime;
          }
        }
      } else {
        console.log(`⚠️ Presentation already processed in stopTone! Current: ${presentationStopTime}, Last processed: ${lastProcessedPresentationRef.current}`);
      }
    }

    // MOVED: Reset patient response visuals AFTER updating trainer state
    // This fixes the issue where responses weren't being counted during bracketing
    setPatientResponse(null);
    setShowResponseIndicator(false);
    setPatientJustResponded(false);
    console.log('🔄 Patient response visuals reset AFTER updating trainer state');
    
  }, [
    toneActive, 
    patientResponse, 
    currentStep, 
    setToneActive, 
    setPatientResponse, 
    setShowResponseIndicator, 
    setPatientJustResponded, 
    lastPresentationTimeRef, 
    lastProcessedPresentationRef, 
    updateTrainerState,
    patientThresholds
  ]);

  // Handle patient response directly
  const handlePatientResponse = useCallback(() => {
    if (currentStep && toneActive) {
      setPatientResponse(true);
      updateTrainerState(true);
    }
  }, [currentStep, toneActive, setPatientResponse, updateTrainerState]);

  return {
    startTone,
    stopTone,
    handlePatientResponse
  };
} 