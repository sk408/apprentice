import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';

// Define the threshold type for our component
interface ThresholdPoint {
  frequency: number;
  level: number;
  ear: 'left' | 'right';
  testType: 'ac' | 'bc';
}

// Define the position type
interface PointPosition {
  x: number;
  y: number;
}

interface MaskingAudiogramProps {
  rightEarThresholds: {
    ac?: {[key: number]: number},
    bc?: {[key: number]: number}
  };
  leftEarThresholds: {
    ac?: {[key: number]: number},
    bc?: {[key: number]: number}
  };
  width?: number | string;
  height?: number | string;
  highlightFrequency?: number;
  testEar?: 'left' | 'right';
}

const MaskingAudiogram: React.FC<MaskingAudiogramProps> = ({
  rightEarThresholds,
  leftEarThresholds,
  width = '100%',
  height = 350,
  highlightFrequency,
  testEar
}) => {
  const theme = useTheme();
  
  // Standard audiogram frequencies and levels
  const frequencies = [250, 500, 1000, 2000, 4000, 8000];
  const levels = [-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
  
  // Format frequency display
  const formatFrequency = (freq: number) => {
    return freq >= 1000 ? `${freq/1000}k` : freq.toString();
  };
  
  // Calculate position for a point
  const getPointPosition = (frequency: number, level: number): PointPosition | null => {
    const freqIndex = frequencies.indexOf(frequency);
    if (freqIndex === -1) {
      // Find closest frequency in our display
      const closest = frequencies.reduce((prev, curr) => {
        return (Math.abs(curr - frequency) < Math.abs(prev - frequency) ? curr : prev);
      });
      return getPointPosition(closest, level);
    }
    
    // Clamp level to our display range
    const clampedLevel = Math.max(levels[0], Math.min(levels[levels.length - 1], level));
    
    // Find the position as percentage
    const x = (freqIndex / (frequencies.length - 1)) * 100;
    const y = ((levels.indexOf(clampedLevel) !== -1 ? 
      levels.indexOf(clampedLevel) : 
      (levels.findIndex(l => l > clampedLevel) - 0.5)) / (levels.length - 1)) * 100;
    
    return { x, y };
  };
  
  // Helper to convert our threshold objects to arrays of points
  const createThresholdPoints = () => {
    const points: ThresholdPoint[] = [];
    
    // Process right ear AC
    if (rightEarThresholds.ac) {
      Object.entries(rightEarThresholds.ac).forEach(([freq, level]) => {
        points.push({
          frequency: parseInt(freq),
          level,
          ear: 'right',
          testType: 'ac'
        });
      });
    }
    
    // Process right ear BC
    if (rightEarThresholds.bc) {
      Object.entries(rightEarThresholds.bc).forEach(([freq, level]) => {
        points.push({
          frequency: parseInt(freq),
          level,
          ear: 'right',
          testType: 'bc'
        });
      });
    }
    
    // Process left ear AC
    if (leftEarThresholds.ac) {
      Object.entries(leftEarThresholds.ac).forEach(([freq, level]) => {
        points.push({
          frequency: parseInt(freq),
          level,
          ear: 'left',
          testType: 'ac'
        });
      });
    }
    
    // Process left ear BC
    if (leftEarThresholds.bc) {
      Object.entries(leftEarThresholds.bc).forEach(([freq, level]) => {
        points.push({
          frequency: parseInt(freq),
          level,
          ear: 'left',
          testType: 'bc'
        });
      });
    }
    
    return points;
  };
  
  const thresholdPoints = createThresholdPoints();
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        width,
        bgcolor: theme.palette.background.paper 
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Audiogram
        {testEar && (
          <Typography component="span" color="primary" fontWeight="bold" sx={{ ml: 1 }}>
            {testEar === 'right' ? '(Testing Right Ear)' : '(Testing Left Ear)'}
          </Typography>
        )}
      </Typography>
      
      <Box 
        sx={{ 
          position: 'relative',
          height,
          border: '1px solid',
          borderColor: 'divider',
          mt: 4, // Space for top legend
          mb: 4, // Space for bottom frequency labels
          mx: 4, // Space for side dB labels
        }}
      >
        {/* Legend */}
        <Box sx={{ position: 'absolute', top: -35, left: 0, display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'red' }} />
            <Typography variant="caption">Right Air</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: 'transparent', border: '2px solid red', borderRadius: 0 }} />
            <Typography variant="caption">Right Bone</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'blue' }} />
            <Typography variant="caption">Left Air</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: 'transparent', border: '2px solid blue', borderRadius: 0 }} />
            <Typography variant="caption">Left Bone</Typography>
          </Box>
        </Box>
        
        {/* Frequency grid lines and labels */}
        {frequencies.map((freq, index) => {
          const x = (index / (frequencies.length - 1)) * 100;
          const isHighlighted = highlightFrequency === freq;
          
          return (
            <React.Fragment key={`freq-${freq}`}>
              <Box
                sx={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  bgcolor: isHighlighted ? 'primary.main' : 'rgba(0,0,0,0.1)',
                  zIndex: 1
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  left: `${x}%`,
                  bottom: -25,
                  transform: 'translateX(-50%)',
                  fontWeight: isHighlighted ? 'bold' : 'normal',
                  color: isHighlighted ? 'primary.main' : 'text.secondary'
                }}
              >
                {formatFrequency(freq)}
              </Typography>
            </React.Fragment>
          );
        })}
        
        {/* dB level grid lines and labels */}
        {levels.map((level, index) => {
          const y = (index / (levels.length - 1)) * 100;
          
          return (
            <React.Fragment key={`level-${level}`}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${y}%`,
                  height: '1px',
                  bgcolor: 'rgba(0,0,0,0.1)',
                  zIndex: 1
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute',
                  right: -30,
                  top: `${y}%`,
                  transform: 'translateY(-50%)',
                  color: 'text.secondary'
                }}
              >
                {level}
              </Typography>
            </React.Fragment>
          );
        })}
        
        {/* Plot threshold points */}
        {thresholdPoints.map((point, index) => {
          const pos = getPointPosition(point.frequency, point.level);
          if (!pos) return null;
          
          const isHighlighted = highlightFrequency === point.frequency && 
                              (testEar ? testEar === point.ear : true);
          
          // Different symbols based on ear and test type
          const color = point.ear === 'right' ? 'red' : 'blue';
          const size = isHighlighted ? 14 : 10;
          
          if (point.testType === 'ac') {
            // Circle for air conduction
            return (
              <Box
                key={`point-${index}`}
                sx={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  bgcolor: color,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  border: isHighlighted ? `2px solid ${theme.palette.background.paper}` : 'none',
                  boxShadow: isHighlighted ? '0 0 0 1px rgba(0,0,0,0.2)' : 'none'
                }}
              />
            );
          } else {
            // Square for bone conduction
            return (
              <Box
                key={`point-${index}`}
                sx={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: size,
                  height: size,
                  bgcolor: 'transparent',
                  border: `2px solid ${color}`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  boxShadow: isHighlighted ? '0 0 0 2px rgba(255,255,255,0.8), 0 0 0 3px rgba(0,0,0,0.2)' : 'none'
                }}
              />
            );
          }
        })}
      </Box>
    </Paper>
  );
};

export default MaskingAudiogram; 