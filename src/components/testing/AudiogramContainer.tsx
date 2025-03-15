import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { TestStep } from '../../interfaces/AudioTypes';

// Define the threshold type for clarity
interface Threshold {
  frequency: number;
  ear: 'left' | 'right';
  level: number;
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
        // Reduce size by 20% by applying an 80% width
        maxWidth: '80%',
        margin: '0 auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Audiogram
      </Typography>
      
      <Box 
        sx={{ 
          position: 'relative',
          // Reduced height by 20%
          height: '200px',
          border: '1px solid',
          borderColor: 'divider',
          cursor: onAudiogramClick ? 'pointer' : 'default',
          // No background grid lines - we'll add them manually
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
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                // Use dashed line for inter-octaves, solid for octaves
                borderLeft: isOctave(freq) 
                  ? '1px solid rgba(0, 0, 0, 0.3)' 
                  : '1px dashed rgba(0, 0, 0, 0.2)',
                zIndex: 1
              }}
            />
          );
        })}
        
        {/* Create horizontal grid lines only at 10dB increments */}
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
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 1
              }}
            />
          );
        })}
      
        {/* Frequency labels (x-axis) */}
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: '-25px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            px: '5px'
          }}
        >
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
        
        {/* Level labels (y-axis) - only show 10dB increments in labels */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: '-35px',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            py: '5px'
          }}
        >
          {gridLinelevels.map(level => {
            const y = (levels.indexOf(level) / (levels.length - 1)) * 100;
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
                  color: currentStep.currentLevel === level ? 'primary.main' : 'text.secondary'
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
        
        {/* Left ear thresholds (blue, O symbol) */}
        {leftThresholds.map(threshold => {
          const pos = getPointPosition(threshold.frequency, threshold.level);
          if (!pos) return null;
          
          return (
            <Box 
              key={`left-${threshold.frequency}`}
              sx={{ 
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: '10px',  // Slightly smaller for the reduced grid
                height: '10px',
                borderRadius: '50%',
                border: '2px solid #2196f3',
                backgroundColor: 'transparent',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            />
          );
        })}
        
        {/* Right ear thresholds (red, X symbol) */}
        {rightThresholds.map(threshold => {
          const pos = getPointPosition(threshold.frequency, threshold.level);
          if (!pos) return null;
          
          return (
            <Box 
              key={`right-${threshold.frequency}`}
              sx={{ 
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: '8px',  // Slightly smaller for the reduced grid
                height: '8px',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                zIndex: 2,
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  backgroundColor: '#f44336'
                },
                '&:before': {
                  left: '3px',
                  width: '2px',
                  height: '8px'
                },
                '&:after': {
                  top: '3px',
                  width: '8px',
                  height: '2px'
                }
              }}
            />
          );
        })}
      </Box>
      
      {/* Legend */}
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          mt: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '2px solid #2196f3',
              backgroundColor: 'transparent'
            }}
          />
          <Typography variant="caption">Left Ear</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '10px',
              height: '10px',
              position: 'relative',
              transform: 'rotate(45deg)',
              '&:before, &:after': {
                content: '""',
                position: 'absolute',
                backgroundColor: '#f44336'
              },
              '&:before': {
                left: '4px',
                width: '2px',
                height: '10px'
              },
              '&:after': {
                top: '4px',
                width: '10px',
                height: '2px'
              }
            }}
          />
          <Typography variant="caption">Right Ear</Typography>
        </Box>
        
        {/* Add legend for octave and inter-octave frequencies */}
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