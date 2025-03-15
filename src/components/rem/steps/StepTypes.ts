import RealEarMeasurementService from '../../../services/RealEarMeasurementService';
import { 
  REMType, REMSignalType, REMLevel, ProbePosition, 
  REMCurve, REMTarget, REMSession, VentType, VirtualHearingAid
} from '../../../interfaces/RealEarMeasurementTypes';

/**
 * Props interface for all step components
 */
export interface REMStepProps {
  activeStep: number;
  remService: RealEarMeasurementService | null;
  session: REMSession | null;
  selectedPatient: string;
  setSelectedPatient: (value: string) => void;
  selectedHearingAid: string;
  setSelectedHearingAid: (value: string) => void;
  hearingAids: VirtualHearingAid[];
  selectedEar: 'left' | 'right';
  setSelectedEar: (value: 'left' | 'right') => void;
  probeTubeDepth: number;
  setProbeTubeDepth: (value: number) => void;
  probePosition: ProbePosition;
  signalType: REMSignalType;
  setSignalType: (value: REMSignalType) => void;
  inputLevel: REMLevel;
  setInputLevel: (value: REMLevel) => void;
  currentMeasurement: REMCurve | null;
  allMeasurements: REMCurve[];
  currentTarget: REMTarget | null;
  isPlaying: boolean;
  measurementType: REMType;
  setMeasurementType: (value: REMType) => void;
  prescriptionMethod: 'NAL-NL2' | 'DSL' | 'NAL-NL1' | 'custom';
  setPrescriptionMethod: (value: 'NAL-NL2' | 'DSL' | 'NAL-NL1' | 'custom') => void;
  selectedVentType: VentType;
  setSelectedVentType: (value: VentType) => void;
  adjustedREAR: REMCurve | null;
  matchAccuracy: number | null;
  adjustmentFeedback: string | null;
  isLoading: boolean;
  startNewSession: () => void;
  handlePositionProbeTube: () => void;
  performMeasurement: () => void;
  playTestSignal: () => void;
  stopTestSignal: () => void;
  generateTargets: () => void;
  adjustGainAtFrequency: (frequency: number, adjustment: number) => void;
  checkTargetMatch: () => void;
  resetAdjustments: () => void;
  setSuccess: (value: string | null) => void;
  setSession: (session: REMSession) => void;
} 