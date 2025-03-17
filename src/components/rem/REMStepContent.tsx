import RealEarMeasurementService from '../../services/RealEarMeasurementService';
import { 
  REMType, REMSignalType, REMLevel, ProbePosition, 
  REMCurve, REMTarget, REMSession, VentType, VirtualHearingAid
} from '../../interfaces/RealEarMeasurementTypes';

import SetupStep from './steps/SetupStep';
import ProbePositionStep from './steps/ProbePositionStep';
import MeasurementStep from './steps/MeasurementStep';
import REIGCalculationStep from './steps/REIGCalculationStep';
import TargetComparisonStep from './steps/TargetComparisonStep';
import AdjustmentStep from './steps/AdjustmentStep';

interface REMStepContentProps {
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

/**
 * Component that renders the appropriate step based on activeStep
 */
const REMStepContent: React.FC<REMStepContentProps> = (props) => {
  const { activeStep } = props;

  // Render different steps based on activeStep
  switch (activeStep) {
    case 0: // Setup Equipment
      return <SetupStep {...props} />;
    
    case 1: // Position Probe Tube
      return <ProbePositionStep {...props} />;
    
    case 2: // REUR Measurement
    case 3: // REOR Measurement
    case 4: // REAR Measurement
      return <MeasurementStep {...props} />;
    
    case 5: // REIG Calculation
      return <REIGCalculationStep {...props} />;
    
    case 6: // Compare to Target
      return <TargetComparisonStep {...props} />;
    
    case 7: // Adjust Frequency Response
      return <AdjustmentStep {...props} />;
    
    default:
      return null;
  }
};

export default REMStepContent; 