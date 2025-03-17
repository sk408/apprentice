import { Box, Paper, Typography } from '@mui/material';
import { TestStep, TestType } from '../../interfaces/AudioTypes';

// Define the threshold type for clarity
interface Threshold {
  frequency: number;
  ear: 'left' | 'right';
  level: number;
  testType: TestType; // Add testType to distinguish between air and bone conduction
}

interface AudiogramContainerProps {
  thresholds: Threshold[];
  currentStep: TestStep;
  toneActive: boolean;
  onAudiogramClick?: (frequency: number, ear: 'left' | 'right', level: number) => void;
}

const AudiogramContainer: React.FC<AudiogramContainerProps> = ({
  thresholds,
  currentStep,
  toneActive,
  onAudiogramClick
}) => {
  // Debug log the thresholds
  console.log('AudiogramContainer received thresholds:', thresholds);
  
  // Constants for the audiogram - updated to include all required frequencies
  const frequencies = [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
  
  // Updated to include 5dB increments
  const levels = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110];
  
  // Define which levels should have grid lines (only 10dB increments)
  const gridLinelevels = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  const shouldShowGridLine = (level: number) => gridLinelevels.includes(level);
  
  // Define which levels should be labeled on the axis (fewer labels for better readability)
  const labeledLevels = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
  const shouldShowLabel = (level: number) => labeledLevels.includes(level);
  
  // Define which frequencies are octaves (for solid lines) vs inter-octaves (for hashed lines)
  const octaveFrequencies = [125, 250, 500, 1000, 2000, 4000, 8000];
  const isOctave = (freq: number) => octaveFrequencies.includes(freq);
  
  // Function to get the position of a point in the audiogram grid
  const getPointPosition = (frequency: number, level: number) => {
    const freqIndex = frequencies.indexOf(frequency);
    const levelIndex = levels.indexOf(level);
    
    if (freqIndex === -1 || levelIndex === -1) return null;
    
    // Calculate the position as a percentage of the grid
    const x = (freqIndex / (frequencies.length - 1)) * 100;
    const y = (levelIndex / (levels.length - 1)) * 100;
    
    return { x, y };
  };
  
  // Get the thresholds to display for each ear
  const leftThresholds = thresholds.filter(t => t.ear === 'left');
  const rightThresholds = thresholds.filter(t => t.ear === 'right');
  
  // Debug log the filtered thresholds
  console.log('Left ear thresholds to display:', leftThresholds);
  console.log('Right ear thresholds to display:', rightThresholds);
  
  // Handler for clicking on the audiogram
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onAudiogramClick) return;
    
    // Get the div's dimensions and the click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate which frequency and level were clicked
    const freqIndex = Math.round((x / rect.width) * (frequencies.length - 1));
    const levelIndex = Math.round((y / rect.height) * (levels.length - 1));
    
    const frequency = frequencies[Math.max(0, Math.min(freqIndex, frequencies.length - 1))];
    const level = levels[Math.max(0, Math.min(levelIndex, levels.length - 1))];
    
    // Call the click handler with the frequency, current ear, and level
    onAudiogramClick(frequency, currentStep.ear, level);
  };
  
  // Helper function to format frequency labels
  const formatFrequency = (freq: number) => {
    if (freq >= 1000) {
      return `${freq / 1000}k`;
    }
    return freq.toString();
  };
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        // Keep reasonable width but make it larger
        maxWidth: '85%',
        margin: '0 auto',
        paddingLeft: '60px', // Added extra padding on the left to accommodate the wider y-axis labels
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <span>Audiogram</span>
        <Typography variant="body2" color="text.secondary">
          Testing: {currentStep.frequency} Hz, {currentStep.ear === 'left' ? 'Left' : 'Right'} ear
          {currentStep.testType === 'air' ? ' (Air Conduction)' : ' (Bone Conduction)'}
        </Typography>
      </Typography>
      
      <Box 
        sx={{ 
          position: 'relative',
          // Increased height for better visibility
          height: '260px',
          border: '1px solid',
          borderColor: 'divider',
          cursor: onAudiogramClick ? 'pointer' : 'default',
          backgroundColor: 'rgba(250, 250, 250, 0.5)', // Light background for better contrast
        }}
        onClick={handleClick}
      >
        {/* Create vertical lines manually to distinguish between octave and inter-octave frequencies */}
        {frequencies.map((freq, index) => {
          const x = (index / (frequencies.length - 1)) * 100;
          return (
            <Box
              key={`line-${freq}`}
              sx={{
                position: 'absolute',
                left: `${x}%`,
                top: 0,
                height: '100%',
                width: '1px',
                // Use different styles for octave and inter-octave
                ...(isOctave(freq) 
                  ? { 
                      borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
                      backgroundColor: 'rgba(0, 0, 0, 0.08)'
                    } 
                  : { 
                      borderLeft: '1px dashed rgba(0, 0, 0, 0.2)',
                      backgroundColor: 'transparent'
                    }
                ),
                // Highlight current frequency
                ...(currentStep.frequency === freq ? {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  borderLeft: '1px solid rgba(25, 118, 210, 0.5)'
                } : {}),
                zIndex: 1
              }}
            />
          );
        })}
        
        {/* Create horizontal grid lines at 10dB increments with better visibility */}
        {gridLinelevels.map((level, index) => {
          const y = (levels.indexOf(level) / (levels.length - 1)) * 100;
          return (
            <Box
              key={`hline-${level}`}
              sx={{
                position: 'absolute',
                left: 0,
                top: `${y}%`,
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderTop: level % 20 === 0 
                  ? '1px solid rgba(0, 0, 0, 0.2)' 
                  : '1px solid rgba(0, 0, 0, 0.1)',
                ...(currentStep.currentLevel === level ? {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  borderTop: '1px solid rgba(25, 118, 210, 0.5)'
                } : {}),
                zIndex: 1
              }}
            />
          );
        })}
      
        {/* Frequency labels (x-axis) */}
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: '-30px',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* X-axis labels container */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            px: '5px',
            pt: '5px'
          }}>
            {frequencies.map(freq => (
              <Typography 
                key={freq} 
                variant="caption" 
                sx={{ 
                  transform: 'translateX(-50%)',
                  fontWeight: currentStep.frequency === freq ? 'bold' : 'normal',
                  color: currentStep.frequency === freq ? 'primary.main' : 'text.secondary',
                  fontSize: '0.7rem'
                }}
              >
                {formatFrequency(freq)}
              </Typography>
            ))}
          </Box>
          
          {/* X-axis title */}
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center', 
              mt: 1, 
              fontWeight: 'medium', 
              fontSize: '0.75rem' 
            }}
          >
            Frequency (Hz)
          </Typography>
        </Box>
        
        {/* Level labels (y-axis) - only show 10dB increments in labels */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: '-50px', // Increased from -40px to give more space
            bottom: 0,
            height: '100%',
            width: '50px', // Increased from 40px to match the left offset
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            py: '5px'
          }}
        >
          {/* Y-axis title */}
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              left: '-30px', // Adjusted from -22px to position better with wider container
              top: '50%',
              transform: 'rotate(-90deg) translateX(50%)',
              transformOrigin: 'left center',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            Hearing Level (dB HL)
          </Typography>
          
          {levels.map(level => {
            const y = (levels.indexOf(level) / (levels.length - 1)) * 100;
            
            // Only show labels for 10dB increments for better readability
            if (!shouldShowLabel(level)) return null;
            
            return (
              <Typography 
                key={level} 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  left: 0,
                  top: `${y}%`,
                  transform: 'translateY(-50%)',
                  fontWeight: currentStep.currentLevel === level ? 'bold' : 'normal',
                  color: currentStep.currentLevel === level ? 'primary.main' : 'text.secondary',
                  width: '45px', // Increased from 35px to give more space for text
                  textAlign: 'right',
                  fontSize: '0.75rem',
                  paddingRight: '5px' // Added padding to ensure text doesn't touch the grid
                }}
              >
                {level}
              </Typography>
            );
          })}
        </Box>
        
        {/* Current testing point */}
        {(() => {
          const pos = getPointPosition(currentStep.frequency, currentStep.currentLevel);
          if (!pos) return null;
          
          return (
            <Box 
              sx={{ 
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: '12px',  // Slightly smaller for the reduced grid
                height: '12px',
                borderRadius: '50%',
                backgroundColor: toneActive ? 'primary.main' : 'rgba(25, 118, 210, 0.5)',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 2px white',
                transition: 'background-color 0.3s',
                animation: toneActive ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)'
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)'
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)'
                  }
                }
              }}
            />
          );
        })()}
        
        {/* Left ear thresholds - different symbols for air vs bone conduction */}
        {leftThresholds.map(threshold => {
          const pos = getPointPosition(threshold.frequency, threshold.level);
          if (!pos) return null;
          
          // Check if there's a right ear threshold at the same position
          const hasOverlapping = rightThresholds.some(
            rt => rt.frequency === threshold.frequency && rt.level === threshold.level
          );
          
          // Apply slight offset for left ear symbols when overlapping
          const offsetX = hasOverlapping ? -1.5 : 0;
          const offsetY = hasOverlapping ? -1.5 : 0;
          
          // Air conduction for left ear = blue X
          if (threshold.testType === 'air') {
            return (
              <Box 
                key={`left-air-${threshold.frequency}`}
                sx={{ 
                  position: 'absolute',
                  left: `calc(${pos.x}% + ${offsetX}px)`,
                  top: `calc(${pos.y}% + ${offsetY}px)`,
                  width: '16px',
                  height: '16px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 4, // Higher z-index to be above circles
                  // Add a semi-transparent white background to help the X stand out
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: '2px',
                    left: '3px',
                    top: '3px',
                    zIndex: -1
                  },
                  // First line of the X
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    backgroundColor: '#2196f3',
                    display: 'block',
                    width: '16px',
                    height: '3px',
                    top: '6.5px',
                    left: '0px',
                    borderRadius: '1px',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 0 1px rgba(0,0,0,0.5)'
                  }
                }}
              >
                {/* Second line of the X as a child element for better stacking */}
                <Box
                  sx={{
                    position: 'absolute',
                    backgroundColor: '#2196f3',
                    width: '16px',
                    height: '3px',
                    top: '6.5px',
                    left: '0px',
                    borderRadius: '1px',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 0 1px rgba(0,0,0,0.5)'
                  }}
                />
              </Box>
            );
          } 
          // Bone conduction for left ear = blue ">"
          else {
            return (
              <Box 
                key={`left-bone-${threshold.frequency}`}
                sx={{ 
                  position: 'absolute',
                  left: `calc(${pos.x}% + ${offsetX}px)`,
                  top: `calc(${pos.y}% + ${offsetY}px)`,
                  width: '14px',
                  height: '14px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 4,
                  // Create a right angle bracket (>) for left ear bone conduction
                  '&:before': {
                    content: '">"',
                    position: 'absolute',
                    color: '#2196f3',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '14px',
                    top: '0px',
                    left: '0px',
                    textShadow: '0 0 3px rgba(255,255,255,0.9)'
                  }
                }}
              />
            );
          }
        })}
        
        {/* Right ear thresholds - different symbols for air vs bone conduction */}
        {rightThresholds.map(threshold => {
          const pos = getPointPosition(threshold.frequency, threshold.level);
          if (!pos) return null;
          
          // Check if there's a left ear threshold at the same position
          const hasOverlapping = leftThresholds.some(
            lt => lt.frequency === threshold.frequency && lt.level === threshold.level
          );
          
          // Apply slight offset for right ear symbols when overlapping
          const offsetX = hasOverlapping ? 1.5 : 0;
          const offsetY = hasOverlapping ? 1.5 : 0;
          
          // Air conduction for right ear = red O
          if (threshold.testType === 'air') {
            return (
              <Box 
                key={`right-air-${threshold.frequency}`}
                sx={{ 
                  position: 'absolute',
                  left: `calc(${pos.x}% + ${offsetX}px)`,
                  top: `calc(${pos.y}% + ${offsetY}px)`,
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '3px solid #f44336',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  boxShadow: '0 0 2px rgba(0,0,0,0.3)'
                }}
              />
            );
          } 
          // Bone conduction for right ear = red "<"
          else {
            return (
              <Box 
                key={`right-bone-${threshold.frequency}`}
                sx={{ 
                  position: 'absolute',
                  left: `calc(${pos.x}% + ${offsetX}px)`,
                  top: `calc(${pos.y}% + ${offsetY}px)`,
                  width: '14px',
                  height: '14px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  // Create a left angle bracket (<) for right ear bone conduction
                  '&:before': {
                    content: '"<"',
                    position: 'absolute',
                    color: '#f44336',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '14px',
                    top: '0px',
                    left: '0px',
                    textShadow: '0 0 3px rgba(255,255,255,0.9)'
                  }
                }}
              />
            );
          }
        })}
      </Box>
      
      {/* Legend - updated to include all symbols */}
      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          mt: 3
        }}
      >
        {/* Air conduction symbols */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '10px',
              height: '10px',
              position: 'relative',
              '&:before, &:after': {
                content: '""',
                position: 'absolute',
                backgroundColor: '#2196f3',
                width: '10px',
                height: '2px'
              },
              '&:before': {
                transform: 'rotate(45deg)'
              },
              '&:after': {
                transform: 'rotate(-45deg)'
              }
            }}
          />
          <Typography variant="caption">Left Ear (Air)</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '2px solid #f44336',
              backgroundColor: 'white'
            }}
          />
          <Typography variant="caption">Right Ear (Air)</Typography>
        </Box>
        
        {/* Bone conduction symbols */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#2196f3',
              fontWeight: 'bold',
              lineHeight: 1,
              fontSize: '18px'
            }}
          >
            &gt;
          </Typography>
          <Typography variant="caption">Left Ear (Bone)</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#f44336',
              fontWeight: 'bold',
              lineHeight: 1,
              fontSize: '18px'
            }}
          >
            &lt;
          </Typography>
          <Typography variant="caption">Right Ear (Bone)</Typography>
        </Box>
        
        {/* Grid lines legend */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '14px',
              height: '2px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
          />
          <Typography variant="caption">Octave</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '14px',
              height: '0px',
              borderTop: '2px dashed rgba(0, 0, 0, 0.2)'
            }}
          />
          <Typography variant="caption">Inter-octave</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AudiogramContainer; 