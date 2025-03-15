import { VirtualHearingAid } from '../interfaces/RealEarMeasurementTypes';

// Steps for the REM procedure
export const remSteps = [
  'Setup Equipment',
  'Position Probe Tube',
  'REUR Measurement',
  'REOR Measurement',
  'REAR Measurement',
  'REIG Calculation',
  'Compare to Target',
  'Adjust Frequency Response'
];

// Sample patient data
export const SAMPLE_PATIENTS = [
  { id: 'p1', name: 'John Smith', age: 68, hearingLoss: 'Moderate-to-severe sensorineural' },
  { id: 'p2', name: 'Mary Johnson', age: 75, hearingLoss: 'Mild-to-moderate sensorineural' },
  { id: 'p3', name: 'Robert Davis', age: 52, hearingLoss: 'Moderate conductive' },
];

// Frequencies used for REM measurements
export const REM_FREQUENCIES = [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000]; 