import { useState, ChangeEvent, SyntheticEvent } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  IconButton,
  Rating,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
  Checkbox,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputLabel,
  Switch
} from '@mui/material';
import {
  HearingOutlined,
  VolumeUp,
  Settings,
  Check,
  Help,
  ExpandMore,
  Assignment,
  EmojiPeople,
  RecordVoiceOver,
  SelfImprovement,
  QuestionAnswer,
  Build,
  EventAvailable,
  Troubleshoot,
  Tune,
  Science,
  Psychology,
  Checklist,
  ArrowUpward,
  ArrowDownward,
  PlayArrow,
  Restore,
  CompareArrows
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';

// Define data structure for troubleshooting complaints
interface AdjustmentStrategy {
  description: string; // e.g., "Reduce low-frequency gain (250-750Hz)"
  level?: 'Soft' | 'Medium' | 'Loud' | 'All'; // Input level primarily affected
  frequencyRange?: 'Low' | 'Mid' | 'High' | 'Specific'; // Frequency range primarily affected
  recommendedAdjustment?: { // Added to connect to Adjustment Explorer
    parameter: string; // e.g., "lowMedium", "highSoft"
    value: number; // Recommended value adjustment (-10 to +10)
  };
}

interface Cause {
  description: string; // e.g., "Occlusion effect"
  relatedAdjustment?: string; // Link to a common adjustment type
}

interface Complaint {
  id: string;
  name: string; // e.g., "Own Voice Too Loud / Boomy"
  category: 'Sound Quality' | 'Loudness' | 'Comfort' | 'Feedback' | 'Specific Situations' | 'Connectivity / Features' | 'Maintenance / Function';
  commonCauses: Cause[];
  adjustmentStrategies: AdjustmentStrategy[];
  featureConsiderations: string[]; // e.g., "Check occlusion management settings"
  physicalChecks: string[]; // e.g., "Verify proper venting"
  counselingPoints: string[]; // e.g., "Explain adaptation period (2-4 weeks)"
}

// Example Data (will be expanded significantly)
const troubleshootingData: Complaint[] = [
  // --- Comfort ---
  {
    id: 'occlusion',
    name: 'Own Voice Too Loud / Boomy / Echoey',
    category: 'Comfort',
    commonCauses: [
      { description: 'Occlusion effect (physical blockage of ear canal)' },
      { description: 'Excessive low-frequency gain (especially medium/loud inputs)' },
      { description: 'Insufficient venting' },
      { description: 'Deep insertion (less common)' },
    ],
    adjustmentStrategies: [
      { 
        description: 'Reduce gain for Medium/Loud inputs in low frequencies (250-750Hz)', 
        level: 'Medium', 
        frequencyRange: 'Low',
        recommendedAdjustment: {
          parameter: 'lowMedium',
          value: -6
        }
      },
      { description: 'Apply occlusion manager/compensation in software' },
    ],
    featureConsiderations: ['Check/Enable occlusion management features'],
    physicalChecks: ['Increase vent size (if possible)', 'Change to open dome/smaller dome (if hearing loss allows)', 'Ensure proper insertion depth (not too deep/shallow)', 'Check for cerumen blockage against vent'],
    counselingPoints: ['Explain adaptation period (can take weeks)', 'Practice reading aloud', 'Reassure that it often improves'],
  },
  {
    id: 'physical_discomfort',
    name: 'Physical Pain / Soreness / Irritation',
    category: 'Comfort',
    commonCauses: [
      { description: 'Incorrect dome/mold size or style' },
      { description: 'Sharp edges or poor finish on earmold' },
      { description: 'Excessive pressure from earmold/shell' },
      { description: 'Allergic reaction to material (rare)' },
      { description: 'Incorrect insertion' },
    ],
    adjustmentStrategies: [], // Primarily physical/fitting issue
    featureConsiderations: [],
    physicalChecks: [
      'Check ear for redness/irritation spots',
      'Verify dome/mold size and type',
      'Inspect earmold for sharp edges/rough spots (may need modification)',
      'Consider softer material if available',
      'Evaluate insertion technique',
    ],
    counselingPoints: ['Instruct on proper insertion/removal', 'Advise on break-in period (if minor)', 'Schedule follow-up for earmold modification if needed'],
  },
  {
    id: 'itchy_ear',
    name: 'Itchy Ear Canal',
    category: 'Comfort',
    commonCauses: [
      { description: 'Dry skin in ear canal' },
      { description: 'Trapped moisture' },
      { description: 'Mild allergic reaction or sensitivity' },
      { description: 'Early stage of external otitis' },
      { description: 'Cerumen buildup' },
    ],
    adjustmentStrategies: [],
    featureConsiderations: [],
    physicalChecks: [
      'Inspect ear canal for dryness, redness, or flaking',
      'Ensure dome/mold allows for some air circulation (venting)',
      'Check for cerumen',
    ],
    counselingPoints: [
      'Recommend using a hearing aid dryer/dehumidifier',
      'Advise against inserting objects into the ear',
      'Suggest Otoferm/Miracell for dryness (if appropriate)',
      'Refer to physician if infection is suspected',
      'Reinforce regular cleaning of aid/dome/mold',
    ],
  },
  {
      id: 'plugged_feeling',
      name: 'Feeling Plugged Up / Fullness',
      category: 'Comfort',
      commonCauses: [
          { description: 'Occlusion effect (similar to own voice boomy)' },
          { description: 'Insufficient venting' },
          { description: 'Dome/mold size too large or sealing too tightly' },
          { description: 'Eustachian tube dysfunction (unrelated to aid)' },
      ],
      adjustmentStrategies: [
          { description: 'Reduce low-frequency gain (soft/medium)', frequencyRange: 'Low' },
          { description: 'Apply occlusion manager/compensation' },
      ],
      featureConsiderations: [],
      physicalChecks: [
          'Increase vent size',
          'Switch to smaller dome or open dome',
          'Assess middle ear status (tympanometry) if concerned about Eustachian tube'
      ],
      counselingPoints: ['Explain occlusion effect', 'Discuss adaptation', 'Trial different dome/vent options'],
  },

  // --- Feedback ---
  {
    id: 'feedback',
    name: 'Hearing Aid Whistles / Feedback (General)',
    category: 'Feedback',
    commonCauses: [
        { description: 'Sound leaking from ear canal and re-entering microphone' },
        { description: 'Poor physical fit (dome/mold too small or loose)' },
        { description: 'Earwax blockage reflecting sound' },
        { description: 'Excessive gain, especially in high frequencies or near vent path' },
        { description: 'Vent too large or incorrectly placed' },
        { description: 'Crack in tubing or earmold' },
        { description: 'Feedback manager needs calibration or increased strength' },
    ],
    adjustmentStrategies: [
        { description: 'Run feedback calibration/manager in fitting software', level: 'All', frequencyRange: 'Specific' },
        { description: 'Reduce gain in the specific frequency region where feedback occurs (often 2-4kHz)', frequencyRange: 'High' },
        { description: 'Increase feedback cancellation strength' },
        { description: 'Reduce overall gain if necessary', level: 'All' },
        { description: 'Consider changing frequency response shape slightly' },
    ],
    featureConsiderations: ['Ensure feedback cancellation is active and at appropriate strength', 'Check if notch filtering for feedback is applied correctly'],
    physicalChecks: ['Check for proper insertion', 'Check for earwax in ear canal or on aid', 'Verify correct dome/mold size and fit', 'Check tubing/receiver wire for cracks', 'Inspect vent size/location'],
    counselingPoints: ['Demonstrate proper insertion technique', 'Explain importance of regular cleaning and earwax management'],
  },
   {
      id: 'feedback_situational',
      name: 'Feedback Only When Chewing / Talking / Near Objects',
      category: 'Feedback',
      commonCauses: [
          { description: 'Jaw movement changing ear canal shape/seal' },
          { description: 'Hand or object (phone, hat) near microphone causing reflection' },
          { description: 'Feedback path changes dynamically' },
      ],
      adjustmentStrategies: [
          { description: 'Run feedback calibration again, potentially while patient simulates chewing' },
          { description: 'Slightly reduce gain in feedback region' },
          { description: 'Increase feedback cancellation strength' },
      ],
      featureConsiderations: ['Ensure adaptive feedback cancellation is active'],
      physicalChecks: ['Verify fit is secure even with jaw movement', 'Consider slightly smaller dome/mold if fit is too tight initially', 'Ensure microphones are clear'],
      counselingPoints: ['Explain effect of jaw movement', 'Advise on hand placement near ear (e.g., cupping hand)', 'Counsel on phone usage positioning'],
  },

  // --- Loudness ---
  {
    id: 'too_quiet',
    name: 'Everything Sounds Too Quiet / Not Loud Enough',
    category: 'Loudness',
    commonCauses: [
        { description: 'Insufficient overall gain' },
        { description: 'Insufficient gain for medium-level inputs (speech)' },
        { description: 'Volume control set too low by user or limited range' },
        { description: 'Acclimatization manager set too low or still active' },
        { description: 'Incorrect program selected (e.g., noise program in quiet)' },
        { description: 'Blocked microphone or receiver ports' },
        { description: 'Weak battery / needs charging' },
        { description: 'Change in hearing' },
    ],
    adjustmentStrategies: [
        {
          description: 'Increase overall gain', 
          level: 'All',
          recommendedAdjustment: {
            parameter: 'allLevels',
            value: 6
          }
        },
        {
          description: 'Increase gain for Medium inputs (65dB), especially in speech frequencies', 
          level: 'Medium',
          recommendedAdjustment: {
            parameter: 'midMedium',
            value: 6
          }
        },
        { description: 'Ensure gain matches prescriptive targets (e.g., NAL-NL2, DSLv5) using REM' },
        {
          description: 'Increase gain for Soft inputs (50dB) if soft sounds are missed', 
          level: 'Soft',
          recommendedAdjustment: {
            parameter: 'lowSoft',
            value: 5
          }
        },
    ],
    featureConsiderations: ['Review/adjust acclimatization level', 'Check user volume control range/settings', 'Ensure correct program is default'],
    physicalChecks: ['Check for blocked microphone/receiver ports/wax guards', 'Check battery level/contacts', 'Perform otoscopy for wax' ],
    counselingPoints: ['Ensure patient understands volume control (if applicable)', 'Discuss acclimatization', 'Confirm program usage', 'Consider rechecking hearing threshold if persistent' ],
  },
  {
    id: 'too_loud',
    name: 'Sounds Are Too Loud / Uncomfortable (General)',
    category: 'Loudness',
    commonCauses: [
        { description: 'Excessive gain (overall or for loud inputs)' },
        { description: 'Maximum Power Output (MPO) set too high' },
        { description: 'Compression ratio too low (not enough loudness reduction for loud sounds)' },
        { description: 'Acclimatization needed (new user)' },
    ],
    adjustmentStrategies: [
        { description: 'Decrease gain for Loud inputs (80dB+)', level: 'Loud' },
        { description: 'Lower the MPO settings across frequencies', level: 'Loud' },
        { description: 'Increase compression ratios (especially for loud inputs) to limit output', level: 'Loud' },
        { description: 'Reduce overall gain slightly' },
    ],
    featureConsiderations: ['Check compression thresholds and ratios', 'Review acclimatization level'],
    physicalChecks: [],
    counselingPoints: ['Explain difference between loudness and clarity', 'Counsel on adaptation period for new users', 'Teach volume control usage if appropriate' ],
  },
  {
    id: 'loud_sudden',
    name: 'Sudden Sounds Too Loud / Startling (Doors, Clanks)',
    category: 'Loudness',
    commonCauses: [
        { description: 'Fast compression attack times reacting too quickly' },
        { description: 'MPO too high' },
        { description: 'Insufficient compression for transient sounds' },
        { description: 'User acclimatization needed' },
    ],
    adjustmentStrategies: [
        { description: 'Consider slower compression attack times' },
        { description: 'Lower MPO, especially in higher frequencies' },
        { description: 'Increase compression ratio for loud inputs' },
    ],
    featureConsiderations: ['Check transient noise reduction features if available'],
    physicalChecks: [],
    counselingPoints: ['Reassure patient that brain needs time to adapt to hearing these sounds again', 'Explain hearing aids don\'t know \'annoying\' vs \'important\' loud sounds' ],
  },
   {
    id: 'soft_sounds_loud',
    name: 'Quiet Sounds Too Loud (Hum, Ticking, Paper Rustling)',
    category: 'Loudness',
    commonCauses: [
        { description: 'Excessive gain for soft inputs (50dB)' },
        { description: 'Compression threshold set too low (amplifying very soft sounds)' },
        { description: 'Noise reduction not active or set too low' },
        { description: 'User acclimatization needed (hearing sounds previously missed)' },
    ],
    adjustmentStrategies: [
        { description: 'Decrease gain for Soft inputs (50dB), especially low frequencies for hum or high frequencies for rustling', level: 'Soft' },
        { description: 'Increase compression threshold for soft inputs (Expansion)' },
    ],
    featureConsiderations: ['Increase strength of noise reduction for steady sounds', 'Ensure expansion feature is active if available'],
    physicalChecks: [],
    counselingPoints: ['Explain that these sounds were likely inaudible before', 'Counsel on adaptation / selective listening', 'Reassure that awareness often decreases over time' ],
  },

  // --- Sound Quality ---
  {
    id: 'muffled',
    name: 'Sounds are Muffled / Unclear / Dull',
    category: 'Sound Quality',
    commonCauses: [
        { description: 'Insufficient high-frequency gain (especially medium inputs)' },
        { description: 'Earwax blockage (ear or aid)' },
        { description: 'Moisture in tubing or receiver' },
        { description: 'Incorrect program selected (e.g., noise program)' },
        { description: 'Compression settings smoothing sounds too much (slow release)' },
        { description: 'Blocked microphone ports' },
        { description: 'Frequency lowering settings too aggressive or inappropriate' },
    ],
    adjustmentStrategies: [
        { 
          description: 'Increase gain in mid-high frequencies (1500-4000Hz)', 
          level: 'Medium', 
          frequencyRange: 'Mid',
          recommendedAdjustment: {
            parameter: 'midMedium',
            value: 6
          }
        },
        { 
          description: 'Verify high-frequency audibility with REM', 
          frequencyRange: 'High',
          recommendedAdjustment: {
            parameter: 'highMedium',
            value: 8
          }
        },
        { description: 'Consider faster compression release times' },
        { 
          description: 'Increase gain for soft high-frequency inputs if soft speech is muffled', 
          level: 'Soft', 
          frequencyRange: 'High',
          recommendedAdjustment: {
            parameter: 'highSoft',
            value: 5
          }
        },
    ],
    featureConsiderations: ['Ensure appropriate program is active', 'Review frequency lowering settings', 'Check directional microphone settings (can sometimes sound muffled)' ],
    physicalChecks: ['Check for earwax blockage in ear or aid (wax guards!)', 'Check for moisture (use drying kit)', 'Inspect tubing/receiver for damage/blockage', 'Clean microphone ports' ],
    counselingPoints: ['Review program switching', 'Reinforce cleaning/drying procedures'],
  },
  {
    id: 'sharp_tinny',
    name: 'Sounds are Too Sharp / Harsh / Tinny / Metallic',
    category: 'Sound Quality',
    commonCauses: [
        { description: 'Excessive high-frequency gain (especially loud inputs)' },
        { description: 'MPO set too high in high frequencies' },
        { description: 'Insufficient low-frequency gain (lack of fullness)' },
        { description: 'Compression settings (fast attack/release) causing artifacts' },
        { description: 'Feedback cancellation artifacts' },
        { description: 'Poor fit/seal causing sound leakage' },
    ],
    adjustmentStrategies: [
        {
          description: 'Reduce gain in high frequencies (3000Hz+), especially for loud inputs', 
          level: 'Loud', 
          frequencyRange: 'High',
          recommendedAdjustment: {
            parameter: 'highLoud',
            value: -8
          }
        },
        { description: 'Lower MPO in high frequencies' },
        {
          description: 'Increase low-frequency gain slightly for fullness (if appropriate for loss)', 
          frequencyRange: 'Low',
          recommendedAdjustment: {
            parameter: 'lowMedium',
            value: 4
          }
        },
        { description: 'Consider slower compression attack/release times' },
        { description: 'Smooth the frequency response curve' },
    ],
    featureConsiderations: ['Reduce strength of feedback manager if overly aggressive', 'Check digital artifact reduction settings if available' ],
    physicalChecks: ['Check fit/seal of dome/mold', 'Ensure appropriate venting' ],
    counselingPoints: ['Counsel on adaptation to high frequencies', 'Explain trade-off between sharpness and clarity' ],
  },
  {
    id: 'distorted',
    name: 'Sounds are Distorted / Crackling / Static',
    category: 'Sound Quality',
    commonCauses: [
        { description: 'Hearing aid malfunction (receiver, microphone)' },
        { description: 'Low battery or poor battery contact' },
        { description: 'Moisture damage' },
        { description: 'Gain settings too high causing clipping / MPO too low' },
        { description: 'Poor Bluetooth connection (if streaming)' },
        { description: 'Wax blockage in receiver port' },
        { description: 'Telecoil interference' },
    ],
    adjustmentStrategies: [
        { description: 'Reduce MPO if clipping is suspected (especially for music)' },
        { description: 'Reduce loud input gain' },
    ],
    featureConsiderations: ['Disable telecoil unless needed', 'Check Bluetooth signal strength' ],
    physicalChecks: [
        'Replace battery / Fully charge aid', 
        'Clean battery contacts', 
        'Check receiver port/wax guard for blockage', 
        'Place in dryer/dehumidifier', 
        'Perform listening check with stethoscope', 
        'Inspect for physical damage'
    ],
    counselingPoints: ['Reinforce cleaning and moisture prevention', 'Explain potential need for repair if issue persists', 'Troubleshoot Bluetooth source device' ],
  },
  {
    id: 'music_quality',
    name: 'Music Sounds Poor / Distorted / Unnatural',
    category: 'Sound Quality',
    commonCauses: [
        { description: 'Standard speech processing unsuitable for music\'s dynamic range' },
        { description: 'Feedback cancellation altering tonal quality' },
        { description: 'Noise reduction suppressing music elements' },
        { description: 'MPO set too low, causing clipping of music peaks' },
        { description: 'Compression settings overly aggressive' },
        { description: 'Limited frequency response of aid/fitting' },
    ],
    adjustmentStrategies: [
        { description: 'Increase MPO significantly' },
        { description: 'Use lower compression ratios (more linear amplification)' },
        { description: 'Widen frequency response if possible' },
        { description: 'Ensure broadband gain is appropriate' },
    ],
    featureConsiderations: [
        'Create a dedicated "Music" program', 
        'Disable or minimize feedback cancellation in music program', 
        'Disable or minimize noise reduction in music program', 
        'Disable directional microphones (use Omni) in music program'
    ],
    physicalChecks: ['Ensure aid is clean and functioning correctly' ],
    counselingPoints: ['Explain difference between speech and music processing', 'Teach how to access music program', 'Manage expectations based on hearing loss and aid limitations' ],
  },
   {
      id: 'robotic_voice',
      name: 'Voices Sound Robotic / Artificial',
      category: 'Sound Quality',
      commonCauses: [
          { description: 'Aggressive noise reduction or speech enhancement artifacts' },
          { description: 'Compression settings (especially fast attack/release) altering envelope' },
          { description: 'Feedback cancellation artifacts' },
          { description: 'Digital processing delay interacting with direct sound (for open fits)' },
      ],
      adjustmentStrategies: [
          { description: 'Consider slower compression attack/release times' },
          { description: 'Smooth frequency response peaks/dips' },
      ],
      featureConsiderations: [
          'Reduce strength of noise reduction/speech enhancement', 
          'Reduce strength or change algorithm of feedback canceller',
          'Check manufacturer-specific settings related to processing speed or artifact control'
      ],
      physicalChecks: ['Ensure good fit to minimize direct sound path for open fittings if delay is suspected'],
      counselingPoints: ['Explain digital processing effects', 'Trial different feature settings'],
  },

  // --- Specific Situations ---
  {
      id: 'speech_in_noise',
      name: 'Difficulty Understanding Speech in Noise',
      category: 'Specific Situations',
      commonCauses: [
          { description: 'Poor signal-to-noise ratio (SNR)' },
          { description: 'Insufficient high-frequency gain for clarity' },
          { description: 'Noise reduction features not optimized or strong enough' },
          { description: 'Directional microphones not active/effective or wrong mode' },
          { description: 'Hearing loss severity/configuration limitations' },
          { description: 'Gain for soft speech too low' },
          { description: 'Reverberation in the environment' },
      ],
      adjustmentStrategies: [
          { description: 'Increase gain for Medium inputs in speech frequencies (1000-4000Hz)', level: 'Medium', frequencyRange: 'Mid' },
          { description: 'Verify high-frequency audibility with REM', frequencyRange: 'High' },
          { description: 'Potentially reduce low-frequency gain (soft/medium inputs) to minimize upward spread of masking', level: 'Soft', frequencyRange: 'Low' },
          { description: 'Ensure gain for soft speech sounds is adequate', level: 'Soft' },
      ],
      featureConsiderations: [
          'Ensure directional microphones are active (consider fixed directional or adaptive setting)',
          'Increase strength of noise reduction features',
          'Create dedicated "Noise" or "Restaurant" program with aggressive settings',
          'Consider frequency lowering if high frequencies are unaidable',
          'Enable reverberation reduction if available'
      ],
      physicalChecks: ['Ensure microphone ports are clean'],
      counselingPoints: [
          "Explain realistic expectations for hearing in noise (aids help, don't eliminate problem)",
          'Teach communication strategies (positioning, face speaker, reduce distance)',
          'Discuss assistive listening devices (e.g., remote microphones, Roger systems)',
          'Explain how to use dedicated noise programs'
      ],
  },
  {
      id: 'wind_noise',
      name: 'Wind Noise is Loud / Annoying',
      category: 'Specific Situations',
      commonCauses: [
          { description: 'Wind turbulence across microphone ports' },
          { description: 'Excessive low-frequency gain amplifying wind noise' },
      ],
      adjustmentStrategies: [
          { description: 'Reduce low-frequency gain (especially soft inputs)', level: 'Soft', frequencyRange: 'Low' },
      ],
      featureConsiderations: [
          'Enable/increase strength of wind noise reduction feature',
          'Consider creating an "Outdoor" program with max wind noise reduction and potentially reduced low frequencies'
      ],
      physicalChecks: ['Ensure microphone ports are clean and covers (if any) are intact'],
      counselingPoints: ['Explain that wind noise is difficult for all hearing aids', 'Suggest wearing a hat or scarf', 'Teach how to activate outdoor program' ],
  },
  {
      id: 'phone_difficulty',
      name: 'Difficulty Hearing on the Phone',
      category: 'Specific Situations',
      commonCauses: [
          { description: 'Feedback when phone is near ear' },
          { description: 'Incorrect positioning of phone receiver over hearing aid microphone' },
          { description: 'Insufficient gain in telephone frequency range (300-3000Hz)' },
          { description: 'Bluetooth streaming issues (if applicable)' },
          { description: 'Lack of dedicated phone program or telecoil' },
      ],
      adjustmentStrategies: [
          { description: 'Increase gain in mid-frequencies (1000-3000Hz) for phone program', frequencyRange: 'Mid' },
          { description: 'Reduce gain slightly if feedback is the issue during feedback test with phone' },
      ],
      featureConsiderations: [
          'Create dedicated Acoustic Phone program', 
          'Enable Autocoil or dedicated Telecoil program if available and phone is compatible',
          'Ensure Bluetooth is paired and streaming audio correctly',
          'Adjust microphone focus for phone program (e.g., slight rear focus to pick up phone speaker)'
      ],
      physicalChecks: ['Check telecoil function', 'Troubleshoot Bluetooth pairing/connection' ],
      counselingPoints: ['Teach correct phone positioning over microphone', 'Explain how to use phone program/telecoil/Bluetooth streamer', 'Discuss phone compatibility (Telecoil, MFi/ASHA)' ],
  },
   {
      id: 'tv_difficulty',
      name: 'Difficulty Hearing Television',
      category: 'Specific Situations',
      commonCauses: [
          { description: 'Distance from TV speakers' },
          { description: 'Room acoustics (reverberation)' },
          { description: 'Poor TV sound quality/mixing' },
          { description: 'Insufficient gain, especially for speech frequencies' },
          { description: 'Background noise in the room' },
      ],
      adjustmentStrategies: [
          { description: 'Increase gain in speech frequencies (1000-4000Hz)' },
          { description: 'Consider slight increase in soft/medium gain overall' },
      ],
      featureConsiderations: [
          'Create dedicated TV program (potentially with mild noise reduction)',
          'Enable reverberation reduction if available'
      ],
      physicalChecks: [],
      counselingPoints: [
          'Strongly recommend TV streaming accessory for direct audio input (best solution)',
          'Suggest improving room acoustics (rugs, curtains)',
          'Advise sitting closer to the TV',
          'Recommend using closed captions'
      ],
  },

  // --- Connectivity / Features ---
   {
      id: 'bluetooth_drops',
      name: 'Bluetooth Streaming Cuts Out / Drops',
      category: 'Connectivity / Features',
      commonCauses: [
          { description: 'Distance between hearing aids and source device' },
          { description: 'Interference from other wireless devices or environmental factors (microwaves)' },
          { description: 'Low battery on hearing aids or source device' },
          { description: 'Outdated hearing aid firmware or phone OS' },
          { description: 'Body masking (phone in back pocket)' },
          { description: 'Hardware issue with aid or source device' },
      ],
      adjustmentStrategies: [], // Primarily troubleshooting
      featureConsiderations: [],
      physicalChecks: ['Check battery levels', 'Ensure firmware is up to date' ],
      counselingPoints: [
          'Keep source device close (within 10-15 feet, avoid body blocking)',
          'Reduce number of active Bluetooth connections on source device',
          'Unpair and re-pair hearing aids',
          'Restart hearing aids and source device',
          'Update phone OS and hearing aid firmware/app',
          'Try in a different location to rule out interference'
      ],
  },
    {
      id: 'app_not_connecting',
      name: 'Smartphone App Not Connecting / Syncing',
      category: 'Connectivity / Features',
      commonCauses: [
          { description: 'Bluetooth not enabled on phone' },
          { description: 'Hearing aids not paired correctly in phone\'s Bluetooth settings AND app' },
          { description: 'App needs update or has crashed' },
          { description: 'Phone OS needs update' },
          { description: 'Hearing aids need restart' },
          { description: 'Low battery on aids or phone' },
      ],
      adjustmentStrategies: [],
      featureConsiderations: [],
      physicalChecks: ['Check battery levels'],
      counselingPoints: [
          'Ensure Bluetooth is ON',
          'Close and reopen the app',
          'Restart hearing aids (open/close battery door or hold button)',
          'Restart phone',
          'Check for app updates in app store',
          'Check phone OS updates',
          'Unpair aids from phone Bluetooth menu AND within the app, then re-pair following app instructions'
      ],
  },
    {
      id: 'program_switching_issue',
      name: 'Difficulty Switching Programs / Features',
      category: 'Connectivity / Features',
      commonCauses: [
          { description: 'User confusion about button press (short vs long)' },
          { description: 'App not synced/controlling aids correctly' },
          { description: 'Button malfunction on hearing aid' },
          { description: 'Incorrect programming of button function' },
      ],
      adjustmentStrategies: [],
      featureConsiderations: ['Review button configuration in fitting software'],
      physicalChecks: ['Test button function physically', 'Test program switching via app' ],
      counselingPoints: ['Clearly demonstrate button press required for program change', 'Explain audible beeps indicating program changes', 'Review app control for program switching', 'Ensure patient understands which program is which' ],
  },

  // --- Maintenance / Function ---
   {
      id: 'no_sound_dead',
      name: 'Hearing Aid is Dead / No Sound',
      category: 'Maintenance / Function',
      commonCauses: [
          { description: 'Dead battery / Not charged' },
          { description: 'Blocked receiver port / wax guard' },
          { description: 'Blocked microphone port' },
          { description: 'Aid turned off or in flight mode' },
          { description: 'Severe moisture damage' },
          { description: 'Internal hardware failure' },
      ],
      adjustmentStrategies: [],
      featureConsiderations: [],
      physicalChecks: [
          'Replace battery / Ensure full charge',
          'Check/replace wax guard',
          'Clean receiver port with brush',
          'Clean microphone ports with brush',
          'Ensure aid is turned on (check button/battery door)',
          'Place in dryer/dehumidifier',
          'Perform listening check with stethoscope'
      ],
      counselingPoints: ['Review regular cleaning and maintenance', 'Review battery changing/charging procedure', 'Explain wax guard replacement', 'Advise on seeking repair if basic troubleshooting fails' ],
  },
    {
      id: 'intermittent_sound',
      name: 'Sound Cutting In and Out / Intermittent',
      category: 'Maintenance / Function',
      commonCauses: [
          { description: 'Poor battery contact / Dirty contacts' },
          { description: 'Low battery voltage' },
          { description: 'Moisture in the hearing aid' },
          { description: 'Loose wire/connection (especially RIC wire)' },
          { description: 'Software glitch' },
          { description: 'Bluetooth streaming issue (if only during streaming)' },
      ],
      adjustmentStrategies: [],
      featureConsiderations: [],
      physicalChecks: [
          'Replace battery',
          'Clean battery contacts (pencil eraser)',
          'Place in dryer/dehumidifier',
          'Inspect RIC wire connection points, gently wiggle wire during listening check',
          'Restart hearing aid'
      ],
      counselingPoints: ['Reinforce cleaning/drying', 'Check RIC wire seating', 'Troubleshoot Bluetooth if applicable', 'Advise repair may be needed' ],
  },
   {
      id: 'short_battery_life',
      name: 'Battery Life Too Short / Drains Quickly',
      category: 'Maintenance / Function',
      commonCauses: [
          { description: 'Heavy Bluetooth streaming usage' },
          { description: 'Old battery (disposable or rechargeable)' },
          { description: 'Incorrect battery size/type (disposable)' },
          { description: 'Hearing aid settings requiring high power (high gain, complex features)' },
          { description: 'Environmental factors (cold weather affects rechargeables)' },
          { description: 'Hearing aid malfunction (excessive current drain)' },
          { description: 'Charger malfunction (rechargeable)' },
      ],
      adjustmentStrategies: [],
      featureConsiderations: ['Review feature usage (streaming time)'],
      physicalChecks: [
          'Verify correct battery size/type', 
          'Try a fresh pack of batteries (disposable)',
          'Check battery contacts for corrosion',
          'Assess age/health of rechargeable battery (via software if possible)',
          'Ensure charger is working correctly and contacts are clean'
      ],
      counselingPoints: [
          'Explain impact of streaming on battery life',
          'Discuss expected battery life for their aids/usage',
          'Advise on battery handling/storage (disposable)',
          'Review charging best practices (rechargeable)',
          'Consider repair/battery replacement if issue persists'
      ],
  },
];

// --- Tab Panel Helper Component --- moved outside
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`followup-tabpanel-${index}`}
      aria-labelledby={`followup-tab-${index}`}
      {...other}
    >
      {value === index && ( <Box sx={{ p: { xs: 1, sm: 2, md: 3} }}>{children}</Box> )}
    </div>
  );
}

// Helper function to group complaints by category
const getComplaintsByCategory = (data: Complaint[]) => {
  return data.reduce((acc, complaint) => {
    const category = complaint.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(complaint);
    return acc;
  }, {} as Record<Complaint['category'], Complaint[]>);
};

const FollowUpPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [satisfactionRating, setSatisfactionRating] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState(0); // State for Tabs

  // State for selected complaint in Troubleshooting Hub
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>('');

  // --- State for Adjustment Explorer ---
  const [gainSettings, setGainSettings] = useState({
    lowSoft: 0, lowMedium: 0, lowLoud: 0,
    midSoft: 0, midMedium: 0, midLoud: 0,
    highSoft: 0, highMedium: 0, highLoud: 0,
  });
  const [noiseReduction, setNoiseReduction] = useState<string>('Mild'); // Off, Mild, Moderate, Strong
  const [directionality, setDirectionality] = useState<string>('Adaptive'); // Omni, Adaptive, Fixed
  const [feedbackManagement, setFeedbackManagement] = useState<boolean>(true);

  // Demo data for the follow-up form (can be reused for Interview section)
  const [followUpData, setFollowUpData] = useState({
    wearTime: '',
    environments: '',
    hearingDifficulties: '',
    physicalComfort: '',
    soundQuality: '',
    batteryLife: '',
    feedback: '',
    // Add fields for interview prompts
    mainConcerns: '',
    successes: '',
    specificSituations: '',
  });

  // New state for interactive adjustment integration
  const [showRecommendedAdjustments, setShowRecommendedAdjustments] = useState(false);
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [originalGainSettings, setOriginalGainSettings] = useState<typeof gainSettings | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFollowUpData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleComplaintChange = (event: SelectChangeEvent<string>) => {
    const complaintId = event.target.value as string;
    setSelectedComplaintId(complaintId);
    
    // Reset recommended adjustments view when complaint changes
    setShowRecommendedAdjustments(false);
    setActiveComplaint(null);
    
    if (complaintId) {
      const selectedComplaint = troubleshootingData.find(c => c.id === complaintId);
      if (selectedComplaint) {
        setActiveComplaint(selectedComplaint);
      }
    }
  };

  // --- Handlers for Adjustment Explorer ---
  const handleGainChange = (name: keyof typeof gainSettings, value: number | number[]) => {
    setGainSettings(prev => ({ ...prev, [name]: Array.isArray(value) ? value[0] : value }));
  };

  const handleFeatureChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>, feature: 'noiseReduction' | 'directionality' | 'feedbackManagement') => {
    // Type guard to check if it's a Switch event
    if (feature === 'feedbackManagement') {
        // Switch provides checked status directly on the event target
        const switchEvent = event as React.ChangeEvent<HTMLInputElement>;
        setFeedbackManagement(switchEvent.target.checked);
    } else {
        // Otherwise, it's a Select event
        const selectEvent = event as SelectChangeEvent<string>;
        const value = selectEvent.target.value;
        if (feature === 'noiseReduction') {
            setNoiseReduction(value);
        }
        if (feature === 'directionality') {
            setDirectionality(value);
        }
    }
  };

  const getAdjustmentExplanation = (param: string): string => {
    switch (param) {
      case 'lowSoft': return "Affects loudness of quiet low-pitched sounds (e.g., fridge hum, vowels). Increase if soft sounds are missed, decrease if background noise is bothersome.";
      case 'lowMedium': return "Affects loudness of average low-pitched sounds (e.g., male voices, background noise). Crucial for speech power and fullness. Decrease if own voice is too boomy.";
      case 'lowLoud': return "Affects loudness of loud low-pitched sounds (e.g., traffic, machinery). Decrease if loud sounds are boomy or uncomfortable.";
      case 'midSoft': return "Affects loudness of quiet mid-range sounds (e.g., conversational speech). Increase for better speech audibility in quiet, decrease if speech sounds too present.";
      case 'midMedium': return "Affects loudness of average mid-range sounds (e.g., most speech sounds). Critical for speech intelligibility and naturalness. Adjust based on comfort and clarity.";
      case 'midLoud': return "Affects loudness of loud mid-range sounds (e.g., raised voices). Decrease if moderate sounds are too loud or uncomfortable.";
      case 'highSoft': return "Affects loudness of quiet high-pitched sounds (e.g., consonants like 's', 'f', rustling leaves). Increase for better soft speech clarity, decrease if environmental sounds are annoying.";
      case 'highMedium': return "Affects loudness of average high-pitched sounds (e.g., female/children's voices, speech consonants). Crucial for speech clarity in noise. Increase if speech is unclear/muffled, decrease if sounds are sharp.";
      case 'highLoud': return "Affects loudness of loud high-pitched sounds (e.g., sirens, clattering dishes). Decrease if loud sounds are sharp, tinny, or uncomfortable. Check MPO.";
      case 'noiseReduction':
        switch (noiseReduction) {
          case 'Off': return "No active reduction of steady background noise. Maximum audibility of all sounds.";
          case 'Mild': return "Light reduction of background noise. Good starting point, balances comfort and audibility.";
          case 'Moderate': return "Noticeable reduction of background noise. Improves comfort in moderately noisy places.";
          case 'Strong': return "Aggressive reduction of background noise. Maximizes comfort in loud noise, but may affect speech audibility slightly.";
          default: return "";
        }
      case 'directionality':
         switch (directionality) {
           case 'Omni': return "Microphones pick up sound from all directions. Best in quiet or when awareness of surroundings is key.";
           case 'Adaptive': return "Microphones automatically focus towards speech and reduce noise from other directions. Good for variable noise environments.";
           case 'Fixed': return "Microphones focus primarily to the front. Best for stationary noise sources (e.g., restaurant with noise behind).";
           default: return "";
         }
      case 'feedbackManagement': return feedbackManagement ? "Actively reduces or eliminates whistling (feedback). Essential for most fittings." : "Feedback system disabled. May increase risk of whistling, sometimes used for music programs.";
      default: return "Select a parameter to see its description.";
    }
  };

  // Function to apply recommended adjustments
  const applyRecommendedAdjustments = () => {
    if (!activeComplaint) return;
    
    // Store original settings to allow reverting
    setOriginalGainSettings({...gainSettings});
    
    // Create a new gain settings object
    const newGainSettings = {...gainSettings};
    
    // Apply each recommended adjustment
    activeComplaint.adjustmentStrategies.forEach(strategy => {
      if (strategy.recommendedAdjustment) {
        const { parameter, value } = strategy.recommendedAdjustment;
        
        // Special case for "allLevels" which affects all parameters
        if (parameter === 'allLevels') {
          Object.keys(newGainSettings).forEach(key => {
            newGainSettings[key as keyof typeof newGainSettings] += value;
          });
        } else if (parameter in newGainSettings) {
          newGainSettings[parameter as keyof typeof newGainSettings] = value;
        }
      }
    });
    
    // Update gain settings with recommendations
    setGainSettings(newGainSettings);
    setShowRecommendedAdjustments(true);
  };
  
  // Function to revert to original settings
  const revertAdjustments = () => {
    if (originalGainSettings) {
      setGainSettings(originalGainSettings);
      setShowRecommendedAdjustments(false);
    }
  };

  // New component for Recommended Adjustments
  const renderRecommendedAdjustments = () => {
    if (!activeComplaint) return null;
    
    // Count how many adjustments have recommendations
    const recommendationsCount = activeComplaint.adjustmentStrategies.filter(
      strategy => strategy.recommendedAdjustment
    ).length;
    
    if (recommendationsCount === 0) return null;
    
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 3, backgroundColor: showRecommendedAdjustments ? 'rgba(76, 175, 80, 0.08)' : 'rgba(33, 150, 243, 0.08)' }}>
        <Typography variant="h6" gutterBottom>
          {showRecommendedAdjustments ? "Applied Adjustments" : "Recommended Adjustments"}
        </Typography>
        
        <List dense>
          {activeComplaint.adjustmentStrategies
            .filter(strategy => strategy.recommendedAdjustment)
            .map((strategy, idx) => {
              const { parameter, value } = strategy.recommendedAdjustment!;
              let parameterName = parameter === 'allLevels' 
                ? 'All Levels' 
                : parameter
                    .replace('low', 'Low Frequency ')
                    .replace('mid', 'Mid Frequency ')
                    .replace('high', 'High Frequency ');
                
              return (
                <ListItem key={idx}>
                  <ListItemIcon>
                    {value > 0 ? 
                      <ArrowUpward color="primary" /> : 
                      <ArrowDownward color="secondary" />
                    }
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${parameterName}: ${value > 0 ? '+' : ''}${value} dB`}
                    secondary={strategy.description}
                  />
                </ListItem>
              );
            })}
        </List>
        
        {!showRecommendedAdjustments ? (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={applyRecommendedAdjustments}
            startIcon={<PlayArrow />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Apply Recommended Adjustments
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={revertAdjustments}
            startIcon={<Restore />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Revert Adjustments
          </Button>
        )}
        
        {showRecommendedAdjustments && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Adjustments applied. Check sliders in the Adjustment Explorer tab.
          </Alert>
        )}
      </Paper>
    );
  };

  const selectedComplaint = troubleshootingData.find(c => c.id === selectedComplaintId);
  const complaintsByCategory = getComplaintsByCategory(troubleshootingData);
  const categories = Object.keys(complaintsByCategory) as Complaint['category'][];

  // --- Section Components (Placeholders for now) ---

  const renderInterviewPrompts = () => (
    <Box sx={{ mt: 2 }}>
       <Typography variant="h6" gutterBottom>Patient Interview Guide</Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
            Gather subjective feedback to guide the appointment. Ask open-ended questions.
        </Alert>
          <TextField
            fullWidth multiline rows={2} label="Primary Concerns / Difficulties"
            placeholder="Ask: What are the main challenges you're facing with your hearing aids?"
            value={followUpData.mainConcerns} onChange={(e) => handleInputChange('mainConcerns', e.target.value)} sx={{ mb: 3 }}
        />
          <TextField
            fullWidth multiline rows={2} label="Successes / Positive Experiences"
            placeholder="Ask: What situations are working well? Where do you feel the aids are helping most?"
            value={followUpData.successes} onChange={(e) => handleInputChange('successes', e.target.value)} sx={{ mb: 3 }}
        />
          <TextField
            fullWidth multiline rows={2} label="Specific Listening Situations"
            placeholder="Ask: Tell me about specific environments like restaurants, watching TV, talking on the phone..."
            value={followUpData.specificSituations} onChange={(e) => handleInputChange('specificSituations', e.target.value)} sx={{ mb: 3 }}
        />
        <TextField
            fullWidth multiline rows={2} label="Daily Wear Time (hours)"
            placeholder="Ask: How many hours per day are you wearing them?"
            value={followUpData.wearTime} onChange={(e) => handleInputChange('wearTime', e.target.value)} sx={{ mb: 3 }}
        />
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Overall Satisfaction Assessment</Typography>
            <Rating name="satisfaction" value={satisfactionRating} onChange={(event, newValue) => setSatisfactionRating(newValue)}
                icon={<HearingOutlined fontSize="large" />} emptyIcon={<HearingOutlined fontSize="large" />} max={5} />
            {satisfactionRating !== null && (
              <Typography variant="body2" color="text.secondary">
                    {satisfactionRating < 3 ? 'Low Satisfaction' : satisfactionRating < 5 ? 'Moderate Satisfaction' : 'High Satisfaction'}
              </Typography>
            )}
          </Box>
        </Box>
  );

  const renderTroubleshootingHub = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Interactive Troubleshooting Hub</Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Select a common patient complaint to see potential causes, adjustment strategies, and counseling points. Some complaints have recommended adjustments you can apply.
      </Alert>
          
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="complaint-select-label">Select Complaint</InputLabel>
        <Select
          labelId="complaint-select-label"
          id="complaint-select"
          value={selectedComplaintId}
          label="Select Complaint"
          onChange={handleComplaintChange}
        >
          <MenuItem value=""><em>Select a complaint...</em></MenuItem>
          {categories.map(category => ([
            <ListSubheader key={category}>{category}</ListSubheader>,
            complaintsByCategory[category].map(complaint => (
              <MenuItem key={complaint.id} value={complaint.id}>
                {complaint.name}
                {complaint.adjustmentStrategies.some(strategy => strategy.recommendedAdjustment) && (
                  <Chip 
                    size="small" 
                    label="Has Adjustments" 
                    color="primary" 
                    sx={{ ml: 1, height: 20 }} 
                  />
                )}
              </MenuItem>
            ))
          ])).flat()}
        </Select>
      </FormControl>

      {selectedComplaint && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>{selectedComplaint.name}</Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Common Causes</Typography>
          <List dense disablePadding>
            {selectedComplaint.commonCauses.map((cause, index) => (
              <ListItem key={`cause-${index}`} disableGutters>
                <ListItemIcon sx={{ minWidth: '30px' }}><Help fontSize="small" color="action" /></ListItemIcon>
                <ListItemText primary={cause.description} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Adjustment Strategies</Typography>
           <List dense disablePadding>
            {selectedComplaint.adjustmentStrategies.map((strategy, index) => (
              <ListItem key={`strategy-${index}`} disableGutters>
                 <ListItemIcon sx={{ minWidth: '30px' }}>
                    {strategy.recommendedAdjustment ? 
                      <Tune fontSize="small" color="primary" /> : 
                      <Tune fontSize="small" color="action" />}
                 </ListItemIcon>
                <ListItemText 
                    primary={strategy.description}
                    secondary={strategy.level || strategy.frequencyRange ? `(Primarily affects: ${[strategy.level, strategy.frequencyRange].filter(Boolean).join(', ')})` : null}
                />
              </ListItem>
            ))}
          </List>

          {selectedComplaint.featureConsiderations.length > 0 && (<>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Feature Considerations</Typography>
            <List dense disablePadding>
              {selectedComplaint.featureConsiderations.map((feat, index) => (
                <ListItem key={`feat-${index}`} disableGutters>
                   <ListItemIcon sx={{ minWidth: '30px' }}><Settings fontSize="small" color="action" /></ListItemIcon>
                   <ListItemText primary={feat} />
                </ListItem>
              ))}
            </List>
          </>)}

         {selectedComplaint.physicalChecks.length > 0 && (<>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Physical Checks</Typography>
             <List dense disablePadding>
              {selectedComplaint.physicalChecks.map((check, index) => (
                <ListItem key={`check-${index}`} disableGutters>
                   <ListItemIcon sx={{ minWidth: '30px' }}><Build fontSize="small" color="action" /></ListItemIcon>
                   <ListItemText primary={check} />
                </ListItem>
              ))}
            </List>
          </>)}

          {selectedComplaint.counselingPoints.length > 0 && (<>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Counseling Points</Typography>
             <List dense disablePadding>
              {selectedComplaint.counselingPoints.map((point, index) => (
                 <ListItem key={`counsel-${index}`} disableGutters>
                    <ListItemIcon sx={{ minWidth: '30px' }}><RecordVoiceOver fontSize="small" color="secondary" /></ListItemIcon>
                    <ListItemText primary={point} />
                 </ListItem>
              ))}
            </List>
          </>)}

          {/* Add new recommended adjustments section */}
          {renderRecommendedAdjustments()}
        </Paper>
      )}
    </Box>
  );

  const renderAdjustmentExplorer = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Interactive Adjustment Explorer</Typography>
       <Alert severity="info" sx={{ mb: 3 }}>
         Explore how common hearing aid adjustments affect sound perception. Adjust the controls and read the explanations.
          </Alert>
          
        <Grid container spacing={4}>
            {/* Gain Adjustments */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>Gain (dB)</Typography>
              <Box sx={{ pl: 1 }}>
                {(['lowSoft', 'lowMedium', 'lowLoud', 'midSoft', 'midMedium', 'midLoud', 'highSoft', 'highMedium', 'highLoud'] as const).map(key => (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Typography variant="body2" gutterBottom sx={{ textTransform: 'capitalize' }}>
                        {key.replace('low', 'Low Freq ').replace('mid', 'Mid Freq ').replace('high', 'High Freq ')}
                </Typography>
                <Slider
                        aria-label={key}
                        value={gainSettings[key]}
                        onChange={(e, val) => handleGainChange(key, val)}
                        step={2} marks min={-10} max={10} valueLabelDisplay="auto"
                        sx={{ ml: 1, width: '95%' }}
                    />
                     <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 1, minHeight: '3em' }}>
                        {getAdjustmentExplanation(key)}
                </Typography>
              </Box>
                ))}
              </Box>
            </Grid>

            {/* Feature Adjustments */}
             <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>Features</Typography>

                 {/* Noise Reduction */}
                  <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="nr-select-label">Noise Reduction</InputLabel>
                      <Select
                          labelId="nr-select-label"
                          value={noiseReduction}
                          label="Noise Reduction"
                          onChange={(e) => handleFeatureChange(e, 'noiseReduction')}
                      >
                          <MenuItem value="Off">Off</MenuItem>
                          <MenuItem value="Mild">Mild</MenuItem>
                          <MenuItem value="Moderate">Moderate</MenuItem>
                          <MenuItem value="Strong">Strong</MenuItem>
                      </Select>
                       <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, minHeight: '3em' }}>
                          {getAdjustmentExplanation('noiseReduction')}
              </Typography>
                  </FormControl>

                  {/* Directionality */}
                   <FormControl fullWidth sx={{ mb: 2 }}>
                       <InputLabel id="dir-select-label">Directionality</InputLabel>
                       <Select
                           labelId="dir-select-label"
                           value={directionality}
                           label="Directionality"
                           onChange={(e) => handleFeatureChange(e, 'directionality')}
                       >
                           <MenuItem value="Omni">Omni-directional</MenuItem>
                           <MenuItem value="Adaptive">Adaptive Directional</MenuItem>
                           <MenuItem value="Fixed">Fixed Directional</MenuItem>
                       </Select>
                         <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1, minHeight: '3em' }}>
                            {getAdjustmentExplanation('directionality')}
                        </Typography>
                   </FormControl>

                   {/* Feedback Management */}
                  <FormControlLabel
                        control={<Switch checked={feedbackManagement} onChange={(e) => handleFeatureChange(e, 'feedbackManagement')} />}
                        label="Feedback Management"
                        sx={{ mb: 1 }}
                  />
                     <Typography variant="caption" display="block" color="text.secondary" sx={{ minHeight: '3em' }}>
                         {getAdjustmentExplanation('feedbackManagement')}
                    </Typography>

                </Grid>
                </Grid>
    </Box>
  );

  const renderVerificationPrinciples = () => (
     <Box sx={{ mt: 2 }}>
       <Typography variant="h6" gutterBottom>Verification Principles (REM)</Typography>
       <Alert severity="info" sx={{ mb: 3 }}>
         While adjustments are guided by patient feedback, objective verification like Real Ear Measurement (REM) is crucial to ensure audibility and appropriate output.
       </Alert>
        <Typography variant="body1" paragraph>
            REM helps verify that the hearing aid is meeting prescriptive targets (like NAL-NL2 or DSLv5) in the patient's actual ear canal.
            Key REM concepts include:
              </Typography>
              <List>
                <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Targets:" secondary="Prescribed gain/output levels based on hearing loss." />
                </ListItem>
                <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Output:" secondary="The actual sound level measured in the ear canal." />
                </ListItem>
                <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Gain:" secondary="The amount of amplification provided (Output - Input)." />
            </ListItem>
             <ListItem>
                <ListItemIcon><Check color="primary" /></ListItemIcon>
                <ListItemText primary="Speech Mapping:" secondary="Visualizing how amplified speech fits within the patient's dynamic range." />
                </ListItem>
              </List>
         <Typography variant="body1" paragraph sx={{mt: 2}}>
            Fine-tuning adjustments should ideally be confirmed with REM to ensure they don't compromise overall audibility or exceed safe loudness limits (MPO).
              </Typography>
                  </Box>
  );

 const renderCounselingCorner = () => (
        <Box sx={{ mt: 2 }}>
         <Typography variant="h6" gutterBottom>Counseling Corner</Typography>
         <Alert severity="info" sx={{ mb: 3 }}>
             Effective counseling reinforces adjustments, manages expectations, and empowers the patient.
         </Alert>
         <Grid container spacing={3}>
             <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                     <CardHeader avatar={<Build color="primary" />} title="Care & Maintenance Review" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                             • Daily cleaning routines<br/>
                             • Battery handling / Charging<br/>
                             • Wax filter changes<br/>
                             • Moisture prevention (drying kits)<br/>
                             • Safe storage
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
             <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                     <CardHeader avatar={<SelfImprovement color="primary" />} title="Usage & Acclimatization" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                             • Importance of consistent wear<br/>
                             • Gradual increase in wear time<br/>
                             • Starting in quieter environments<br/>
                             • Brain adaptation process (Acclimatization)<br/>
                             • Managing listening fatigue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
             <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                     <CardHeader avatar={<RecordVoiceOver color="primary" />} title="Communication Strategies" />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                             • Optimizing the listening environment<br/>
                             • Facing the speaker / Clear speech<br/>
                             • Reducing distance<br/>
                             • Assertiveness / Requesting clarification<br/>
                             • Informing communication partners
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
              <Grid item xs={12} md={6}>
                 <Card variant="outlined" sx={{ height: '100%' }}>
                     <CardHeader avatar={<Psychology color="primary" />} title="Managing Expectations" />
                     <CardContent>
                         <Typography variant="body2" color="text.secondary">
                             • Hearing aids help, but don't restore normal hearing<br/>
                             • Challenging situations (noise, groups) will still be difficult<br/>
                             • Importance of realistic goals<br/>
                             • Role of assistive listening devices<br/>
                             • Ongoing process of adjustment
          </Typography>
                     </CardContent>
                 </Card>
             </Grid>
         </Grid>
          </Box>
 );


 const renderPhysicalListeningChecks = () => (
     <Box sx={{ mt: 2 }}>
         <Typography variant="h6" gutterBottom>Physical & Listening Checks</Typography>
         <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                     <Typography variant="subtitle1" gutterBottom>Physical Inspection Checklist</Typography>
                     <List dense>
                         <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Check case/shell for damage" /></ListItem>
                         <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Check battery door / charging contacts" /></ListItem>
                         <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Inspect tubing/receiver wire" /></ListItem>
                         <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Check earmold/dome for wax/damage" /></ListItem>
                         <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Clean microphone ports" /></ListItem>
                          <ListItem><ListItemIcon><Check color="primary" /></ListItemIcon><ListItemText primary="Clean receiver port / wax guard" /></ListItem>
                     </List>
                      <TextField fullWidth multiline rows={2} label="Physical Comfort Notes"
                          placeholder="Document fit, comfort, irritation issues"
                          value={followUpData.physicalComfort} onChange={(e) => handleInputChange('physicalComfort', e.target.value)} sx={{ mt: 2 }}
                      />
                 </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                     <Typography variant="subtitle1" gutterBottom>Listening Check Procedure</Typography>
                      <Alert severity="info" sx={{ mb: 2 }}>Use a listening stethoscope.</Alert>
                     <List dense>
                          <ListItem><ListItemIcon><VolumeUp color="primary" /></ListItemIcon><ListItemText primary="Check for clear sound (no distortion)" secondary="Use Ling sounds (ah, ee, oo, sh, s, m) or speech" /></ListItem>
                         <ListItem><ListItemIcon><VolumeUp color="primary" /></ListItemIcon><ListItemText primary="Check for intermittency" secondary="Wiggle wires/tubing" /></ListItem>
                         <ListItem><ListItemIcon><VolumeUp color="primary" /></ListItemIcon><ListItemText primary="Listen at different volume levels" /></ListItem>
                         <ListItem><ListItemIcon><VolumeUp color="primary" /></ListItemIcon><ListItemText primary="Test program switching / feature buttons" /></ListItem>
                          <ListItem><ListItemIcon><VolumeUp color="primary" /></ListItemIcon><ListItemText primary="Listen for excessive circuit noise" /></ListItem>
                     </List>
                     <TextField fullWidth multiline rows={2} label="Sound Quality Notes"
                          placeholder="Document listening check findings (distortion, feedback, etc.)"
                          value={followUpData.soundQuality} onChange={(e) => handleInputChange('soundQuality', e.target.value)} sx={{ mt: 2 }}
                      />
                 </Paper>
              </Grid>
            </Grid>
     </Box>
 );


 const renderSummaryPlan = () => (
        <Box sx={{ mt: 2 }}>
         <>
            <Typography variant="h6" gutterBottom>Summary & Follow-Up Plan</Typography>
             <Alert severity="success" sx={{ mb: 3 }}>Session Complete (Example)</Alert>
                  <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                     <Typography variant="subtitle1">Key Findings & Adjustments (Example)</Typography>
                     <Typography variant="body2">Patient reported difficulty in noise. Increased high-frequency gain and activated stronger noise reduction. Verified with REM. Counseled on communication strategies.</Typography>
                     <Typography variant="body2" sx={{ mt: 1 }}>Satisfaction rating improved from {satisfactionRating ? satisfactionRating - 1 : '?'} to {satisfactionRating ?? '?'}/5.</Typography>
          </Paper>
          
          <Typography variant="h6" gutterBottom>Follow-Up Plan</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventAvailable color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Next Appointment</Typography>
                  </Box>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                            <FormLabel>Recommended follow-up:</FormLabel>
                            <RadioGroup row defaultValue="3months">
                      <FormControlLabel value="1month" control={<Radio />} label="1 month" />
                      <FormControlLabel value="3months" control={<Radio />} label="3 months" />
                      <FormControlLabel value="6months" control={<Radio />} label="6 months" />
                      <FormControlLabel value="1year" control={<Radio />} label="1 year" />
                    </RadioGroup>
                  </FormControl>
                        <TextField fullWidth label="Next appointment notes" multiline rows={2}
                             placeholder="Goals for next visit, specific things to check"
                             value={followUpData.feedback} onChange={(e) => handleInputChange('feedback', e.target.value)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <QuestionAnswer color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Support Between Visits</Typography>
                  </Box>
                              <Typography variant="body2">Encourage contact for: sound changes, discomfort, damage, persistent issues.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3, mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={() => { setCurrentTab(0); setSelectedComplaintId(''); setFollowUpData({ wearTime: '', environments: '', hearingDifficulties: '', physicalComfort: '', soundQuality: '', batteryLife: '', feedback: '', mainConcerns: '', successes: '', specificSituations: '' }); setSatisfactionRating(null); }}>
                    Start New Session
            </Button>
          </Box>
        </>
        </Box>
    );

  return (
    <Box>
      {/* Hero Section (Keep as is) */}
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: { xs: 4, md: 6 }, px: 2, textAlign: 'center' }}>
        <Container maxWidth="md">
          <HearingOutlined sx={{ fontSize: { xs: 40, md: 60 }, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}>
            Interactive Hearing Aid Follow-Up Guide
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }, maxWidth: '800px', mx: 'auto' }}>
            A comprehensive tool for troubleshooting, adjustment, and counseling in hearing aid follow-ups.
          </Typography>
        </Container>
      </Box>

      {/* Main Content with Tabs */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
         <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
             <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant={isMobile ? "scrollable" : "fullWidth"}
                    scrollButtons="auto"
                    aria-label="Follow-up sections"
                >
                    <Tab icon={<EmojiPeople />} iconPosition="start" label="Interview" id="followup-tab-0" aria-controls="followup-tabpanel-0" />
                    <Tab icon={<Troubleshoot />} iconPosition="start" label="Troubleshoot" id="followup-tab-1" aria-controls="followup-tabpanel-1" />
                    <Tab icon={<Tune />} iconPosition="start" label="Adjustments" id="followup-tab-2" aria-controls="followup-tabpanel-2" />
                    <Tab icon={<CompareArrows />} iconPosition="start" label="Integration" id="followup-tab-7" aria-controls="followup-tabpanel-7" />
                    <Tab icon={<Science />} iconPosition="start" label="Verification" id="followup-tab-3" aria-controls="followup-tabpanel-3" />
                    <Tab icon={<Psychology />} iconPosition="start" label="Counseling" id="followup-tab-4" aria-controls="followup-tabpanel-4" />
                    <Tab icon={<Checklist />} iconPosition="start" label="Checks" id="followup-tab-5" aria-controls="followup-tabpanel-5" />
                    <Tab icon={<EventAvailable />} iconPosition="start" label="Summary" id="followup-tab-6" aria-controls="followup-tabpanel-6" />
                </Tabs>
            </Box>

            {/* Tab Panels */}
             <TabPanel value={currentTab} index={0}>{renderInterviewPrompts()}</TabPanel>
             <TabPanel value={currentTab} index={1}>{renderTroubleshootingHub()}</TabPanel>
             <TabPanel value={currentTab} index={2}>{renderAdjustmentExplorer()}</TabPanel>
             <TabPanel value={currentTab} index={7}>
               {/* New Integration Tab */}
               <Box sx={{ mt: 2 }}>
                 <Typography variant="h6" gutterBottom>Interactive Adjustment Integration</Typography>
                 <Alert severity="info" sx={{ mb: 3 }}>
                   This tab combines troubleshooting and adjustment features. Select a complaint, apply recommended adjustments, and visualize the changes.
                 </Alert>
                 
                 <Grid container spacing={3}>
                   <Grid item xs={12} md={5}>
                     {/* Left side: Simplified Troubleshooting */}
                     <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                       <Typography variant="subtitle1" gutterBottom>Select Patient Complaint</Typography>
                       <FormControl fullWidth sx={{ mb: 2 }}>
                         <Select
                           value={selectedComplaintId}
                           onChange={handleComplaintChange}
                           displayEmpty
                         >
                           <MenuItem value=""><em>Select a complaint...</em></MenuItem>
                           {categories.map(category => ([
                             <ListSubheader key={category}>{category}</ListSubheader>,
                             complaintsByCategory[category].map(complaint => (
                               <MenuItem key={complaint.id} value={complaint.id}>
                                 {complaint.name}
                                 {complaint.adjustmentStrategies.some(strategy => strategy.recommendedAdjustment) && (
                                   <Chip 
                                     size="small" 
                                     label="Has Adjustments" 
                                     color="primary" 
                                     sx={{ ml: 1, height: 20 }} 
                                   />
                                 )}
                               </MenuItem>
                             ))
                           ])).flat()}
                         </Select>
                       </FormControl>
                       
                       {activeComplaint && (
                         <Box>
                           <Typography variant="h6" gutterBottom color="primary">
                             {activeComplaint.name}
                           </Typography>
                           <Typography variant="body2" paragraph>
                             Key causes: {activeComplaint.commonCauses.slice(0, 2).map(c => c.description).join(', ')}
                           </Typography>
                           {renderRecommendedAdjustments()}
                         </Box>
                       )}
                     </Paper>
                   </Grid>
                   
                   <Grid item xs={12} md={7}>
                     {/* Right side: Simplified Adjustment Explorer */}
                     <Paper variant="outlined" sx={{ p: 2 }}>
                       <Typography variant="subtitle1" gutterBottom>Gain Adjustments (dB)</Typography>
                       
                       {/* Sound visualization (simplified representation) */}
                       <Box sx={{ 
                         height: 80, 
                         bgcolor: 'rgba(0,0,0,0.03)', 
                         borderRadius: 1, 
                         position: 'relative',
                         mb: 3,
                         mt: 1,
                         overflow: 'hidden'
                       }}>
                         {/* Visual representation of frequency response */}
                         <Box sx={{ 
                           position: 'absolute', 
                           bottom: 0, 
                           left: 0, 
                           width: '33%', 
                           height: `${50 + (gainSettings.lowMedium * 3)}%`,
                           bgcolor: 'primary.light',
                           transition: 'height 0.5s ease-in-out',
                           opacity: 0.7
                         }} />
                         <Box sx={{ 
                           position: 'absolute', 
                           bottom: 0, 
                           left: '33%', 
                           width: '33%', 
                           height: `${50 + (gainSettings.midMedium * 3)}%`,
                           bgcolor: 'secondary.light',
                           transition: 'height 0.5s ease-in-out',
                           opacity: 0.7
                         }} />
                         <Box sx={{ 
                           position: 'absolute', 
                           bottom: 0, 
                           left: '66%', 
                           width: '34%', 
                           height: `${50 + (gainSettings.highMedium * 3)}%`,
                           bgcolor: 'info.light',
                           transition: 'height 0.5s ease-in-out',
                           opacity: 0.7
                         }} />
                         
                         {/* Frequency labels */}
                         <Typography variant="caption" sx={{ position: 'absolute', bottom: 2, left: '15%' }}>
                           Low
                         </Typography>
                         <Typography variant="caption" sx={{ position: 'absolute', bottom: 2, left: '48%' }}>
                           Mid
                         </Typography>
                         <Typography variant="caption" sx={{ position: 'absolute', bottom: 2, left: '82%' }}>
                           High
                         </Typography>
                       </Box>
                       
                       {/* Simplified gain sliders */}
                       <Typography variant="body2" gutterBottom>Low Frequencies</Typography>
                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Soft</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.lowSoft}
                             onChange={(e, val) => handleGainChange('lowSoft', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Medium</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.lowMedium}
                             onChange={(e, val) => handleGainChange('lowMedium', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Loud</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.lowLoud}
                             onChange={(e, val) => handleGainChange('lowLoud', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                       </Box>
                       
                       <Typography variant="body2" gutterBottom>Mid Frequencies</Typography>
                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Soft</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.midSoft}
                             onChange={(e, val) => handleGainChange('midSoft', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Medium</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.midMedium}
                             onChange={(e, val) => handleGainChange('midMedium', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Loud</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.midLoud}
                             onChange={(e, val) => handleGainChange('midLoud', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                       </Box>
                       
                       <Typography variant="body2" gutterBottom>High Frequencies</Typography>
                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Soft</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.highSoft}
                             onChange={(e, val) => handleGainChange('highSoft', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Medium</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.highMedium}
                             onChange={(e, val) => handleGainChange('highMedium', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                         <Box sx={{ width: '32%' }}>
                           <Typography variant="caption" display="block" align="center">Loud</Typography>
                           <Slider
                             orientation="vertical"
                             value={gainSettings.highLoud}
                             onChange={(e, val) => handleGainChange('highLoud', val)}
                             min={-10} max={10}
                             valueLabelDisplay="auto"
                             sx={{ height: 100, mx: 'auto' }}
                           />
                         </Box>
                       </Box>
                     </Paper>
                   </Grid>
                 </Grid>
                 
                 {showRecommendedAdjustments && (
                   <Paper variant="outlined" sx={{ p: 2, mt: 3, bgcolor: 'rgba(76, 175, 80, 0.08)' }}>
                     <Typography variant="h6" gutterBottom>
                       Applied Adjustments from "{activeComplaint?.name}"
                     </Typography>
                     <Typography variant="body2" paragraph>
                       The adjustments have been applied to the gain sliders. Observe the changes in the visualization above.
                     </Typography>
                     <Typography variant="body2" gutterBottom color="textSecondary">
                       Patient impact: {activeComplaint?.name.includes('Sharp') ? 
                         'Reduced harshness, increased comfort, improved sound quality' : 
                         activeComplaint?.name.includes('Muffled') ? 
                         'Improved clarity, better speech understanding, more detail' :
                         activeComplaint?.name.includes('Too Quiet') ?
                         'Improved audibility, better awareness, increased speech understanding' :
                         'Improved comfort and sound quality'}
                     </Typography>
                   </Paper>
                 )}
               </Box>
             </TabPanel>
             <TabPanel value={currentTab} index={3}>{renderVerificationPrinciples()}</TabPanel>
             <TabPanel value={currentTab} index={4}>{renderCounselingCorner()}</TabPanel>
             <TabPanel value={currentTab} index={5}>{renderPhysicalListeningChecks()}</TabPanel>
             <TabPanel value={currentTab} index={6}>{renderSummaryPlan()}</TabPanel>
           </Paper>
           
           {/* Informational Sidebar (Optional - reusing original left side structure) */}
           <Grid container spacing={4} sx={{ mt: 4 }}>
             <Grid item xs={12} md={4}>
               <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                 <Typography variant="h5" gutterBottom>Purpose of Follow-Up</Typography>
                 {/* Add concise points about goals */}
                 <Typography variant="body1">Fine-tune settings, address concerns, ensure satisfaction, reinforce counseling, check device integrity.</Typography>
               </Paper>
               <Paper elevation={2} sx={{ p: 3 }}>
                 <Typography variant="h5" gutterBottom>External Resources</Typography>
                 <List dense>
                   {/* Link to actual relevant resources if available */}
                   <ListItem component="a" href="#" target="_blank"><ListItemIcon><Assignment color="primary" /></ListItemIcon><ListItemText primary="Clinical Best Practices Guide" /></ListItem>
                   <ListItem component="a" href="#" target="_blank"><ListItemIcon><Help color="primary" /></ListItemIcon><ListItemText primary="Manufacturer Fitting Guides" /></ListItem>
                   <ListItem component="a" href="#" target="_blank"><ListItemIcon><HearingOutlined color="primary" /></ListItemIcon><ListItemText primary="Patient Counseling Resources" /></ListItem>
                 </List>
               </Paper>
             </Grid>
             <Grid item xs={12} md={8}>
               {/* The main content is now within the Tabs above */}
               <Alert severity='info'>The main interactive content is organized in the tabs above. This area can be used for additional context or notes.</Alert>
             </Grid>
           </Grid>
      </Container>
    </Box>
  );
};

export default FollowUpPage;