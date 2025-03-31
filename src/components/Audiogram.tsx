import { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LogarithmicScale,
  ChartOptions,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { ThresholdPoint } from '../interfaces/AudioTypes';
import { Box, Paper, Typography } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define standard audiometric frequencies
const STANDARD_FREQUENCIES = [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];

// Define major frequencies to show labels for on mobile devices
const MAJOR_FREQUENCIES = [250, 500, 1000, 2000, 4000, 8000];

// Define symbol mappings
const SYMBOL_MAPPINGS = {
  right_air: {
    symbol: 'circle',
    color: 'red',
  },
  left_air: {
    symbol: 'crossRot',
    color: 'blue',
  },
  right_bone: {
    symbol: 'triangle',
    color: 'red',
  },
  left_bone: {
    symbol: 'triangle',
    color: 'blue',
    rotation: 180,
  },
  right_air_no_response: {
    symbol: 'circle',
    color: 'red',
    withArrow: true,
  },
  left_air_no_response: {
    symbol: 'crossRot',
    color: 'blue',
    withArrow: true,
  },
  right_bone_no_response: {
    symbol: 'triangle',
    color: 'red',
    withArrow: true,
  },
  left_bone_no_response: {
    symbol: 'triangle',
    color: 'blue',
    rotation: 180,
    withArrow: true,
  },
};

interface AudiogramProps {
  thresholds: ThresholdPoint[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  title?: string;
  compareThresholds?: ThresholdPoint[]; // For comparing student results to actual thresholds
  currentFrequency?: number; // Current frequency being tested
  currentLevel?: number; // Current hearing level being tested
  toneActive?: boolean; // Whether a tone is currently being presented
  onPositionClick?: (frequency: number, level: number) => void; // Callback for when chart is clicked
  interactive?: boolean; // Whether chart should respond to clicks/touches
}

const Audiogram: React.FC<AudiogramProps> = ({
  thresholds,
  width = 600,
  height = 400,
  showLegend = true,
  title = 'Audiogram',
  compareThresholds,
  currentFrequency,
  currentLevel,
  toneActive = false,
  onPositionClick,
  interactive = false
}) => {
  const chartRef = useRef<ChartJS<'scatter'>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [reticleFlash, setReticleFlash] = useState(false);
  
  // Update dimensions when container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
      setChartDimensions({
        width: containerWidth,
        height: containerHeight
      });
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Cleanup chart instance when component unmounts
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Flash the reticle when tone is active
  useEffect(() => {
    let flashInterval: NodeJS.Timeout | null = null;
    
    if (toneActive && currentFrequency && currentLevel !== undefined) {
      // Start flashing - alternate every 200ms
      flashInterval = setInterval(() => {
        setReticleFlash(prev => !prev);
      }, 200);
    } else {
      setReticleFlash(false);
    }
    
    return () => {
      if (flashInterval) {
        clearInterval(flashInterval);
      }
    };
  }, [toneActive, currentFrequency, currentLevel]);

  // Define standard audiogram symbols and colors
  const symbols = {
    right: {
      air: { symbol: 'circle', color: 'rgb(255, 0, 0)', borderColor: 'rgb(255, 0, 0)', fillColor: 'rgb(255, 0, 0)' },
      bone: { symbol: '<', color: 'rgb(255, 0, 0)', borderColor: 'rgb(255, 0, 0)', fillColor: 'transparent' },
      masked_air: { symbol: 'triangle', color: 'rgb(255, 0, 0)', borderColor: 'rgb(255, 0, 0)', fillColor: 'transparent' },
      masked_bone: { symbol: '[', color: 'rgb(255, 0, 0)', borderColor: 'rgb(255, 0, 0)', fillColor: 'transparent' }
    },
    left: {
      air: { symbol: 'crossRot', color: 'rgb(0, 0, 255)', borderColor: 'rgb(0, 0, 255)', fillColor: 'rgb(0, 0, 255)' },
      bone: { symbol: '>', color: 'rgb(0, 0, 255)', borderColor: 'rgb(0, 0, 255)', fillColor: 'transparent' },
      masked_air: { symbol: 'rect', color: 'rgb(0, 0, 255)', borderColor: 'rgb(0, 0, 255)', fillColor: 'transparent' },
      masked_bone: { symbol: ']', color: 'rgb(0, 0, 255)', borderColor: 'rgb(0, 0, 255)', fillColor: 'transparent' }
    }
  };

  // Convert threshold data to chart format
  const prepareChartData = (): ChartData<'scatter'> => {
    // Data sets for different ear and test types
    const datasets = [];
    
    // Create separate datasets for each combination of ear and test type
    // Right ear air conduction
    datasets.push({
      label: 'Right Ear (Air)',
      data: thresholds
        .filter(point => point.ear === 'right' && point.testType === 'air')
        .map(point => ({
          x: point.frequency,
          y: point.hearingLevel,
          responseStatus: point.responseStatus
        })),
      pointStyle: 'circle',
      borderColor: 'red',
      backgroundColor: 'red',
      borderWidth: 2,
      pointRadius: 6,
      showLine: true,
      tension: 0.1
    });

    // Left ear air conduction
    datasets.push({
      label: 'Left Ear (Air)',
      data: thresholds
        .filter(point => point.ear === 'left' && point.testType === 'air')
        .map(point => ({
          x: point.frequency,
          y: point.hearingLevel,
          responseStatus: point.responseStatus
        })),
      pointStyle: 'crossRot',
      borderColor: 'blue',
      backgroundColor: 'blue',
      borderWidth: 2,
      pointRadius: 6,
      showLine: true,
      tension: 0.1
    });

    // Right ear bone conduction
    datasets.push({
      label: 'Right Ear (Bone)',
      data: thresholds
        .filter(point => point.ear === 'right' && point.testType === 'bone')
        .map(point => ({
          x: point.frequency,
          y: point.hearingLevel,
          responseStatus: point.responseStatus
        })),
      pointStyle: 'triangle',
      borderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderWidth: 2,
      pointRadius: 6,
      showLine: true,
      tension: 0.1
    });

    // Left ear bone conduction
    datasets.push({
      label: 'Left Ear (Bone)',
      data: thresholds
        .filter(point => point.ear === 'left' && point.testType === 'bone')
        .map(point => ({
          x: point.frequency,
          y: point.hearingLevel,
          responseStatus: point.responseStatus
        })),
      pointStyle: 'triangle',
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      borderWidth: 2,
      pointRadius: 6,
      showLine: true,
      tension: 0.1,
      rotation: 180
    });

    // Compare thresholds if provided
    if (compareThresholds) {
      // Additional datasets for comparison
      // Right ear air comparison
      datasets.push({
        label: 'Right Ear Air (Expected)',
        data: compareThresholds
          .filter(point => point.ear === 'right' && point.testType === 'air')
          .map(point => ({
            x: point.frequency,
            y: point.hearingLevel,
            responseStatus: point.responseStatus
          })),
        pointStyle: 'circle',
        borderColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderWidth: 1,
        pointRadius: 4,
        showLine: true,
        tension: 0.1,
        borderDash: [5, 5]
      });

      // Left ear air comparison
      datasets.push({
        label: 'Left Ear Air (Expected)',
        data: compareThresholds
          .filter(point => point.ear === 'left' && point.testType === 'air')
          .map(point => ({
            x: point.frequency,
            y: point.hearingLevel,
            responseStatus: point.responseStatus
          })),
        pointStyle: 'crossRot',
        borderColor: 'rgba(0, 0, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderWidth: 1,
        pointRadius: 4,
        showLine: true,
        tension: 0.1,
        borderDash: [5, 5]
      });

      // Right ear bone comparison
      datasets.push({
        label: 'Right Ear Bone (Expected)',
        data: compareThresholds
          .filter(point => point.ear === 'right' && point.testType === 'bone')
          .map(point => ({
            x: point.frequency,
            y: point.hearingLevel,
            responseStatus: point.responseStatus
          })),
        pointStyle: 'triangle',
        borderColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderWidth: 1,
        pointRadius: 4,
        showLine: true,
        tension: 0.1,
        borderDash: [5, 5]
      });

      // Left ear bone comparison
      datasets.push({
        label: 'Left Ear Bone (Expected)',
        data: compareThresholds
          .filter(point => point.ear === 'left' && point.testType === 'bone')
          .map(point => ({
            x: point.frequency,
            y: point.hearingLevel,
            responseStatus: point.responseStatus
          })),
        pointStyle: 'triangle',
        borderColor: 'rgba(0, 0, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        borderWidth: 1,
        pointRadius: 4,
        showLine: true,
        tension: 0.1,
        borderDash: [5, 5],
        rotation: 180
      });
    }

    // Add reticle dataset if current frequency and level are provided
    if (currentFrequency !== undefined && currentLevel !== undefined) {
      // Reticle horizontal line (frequency indicator)
      datasets.push({
        label: 'Current Frequency',
        data: [
          // Create a line at the current frequency from -10 to 120 dB
          { x: currentFrequency, y: -10 },
          { x: currentFrequency, y: 120 }
        ],
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderColor: reticleFlash ? 'rgba(255, 165, 0, 1)' : 'rgba(255, 165, 0, 0.7)',
        borderWidth: reticleFlash ? 3 : 1,
        borderDash: [5, 5],
        pointRadius: 0,
        showLine: true,
        tension: 0
      });
      
      // Reticle vertical line (level indicator)
      datasets.push({
        label: 'Current Level',
        data: [
          // Create a line at the current level across all frequencies
          { x: 125, y: currentLevel },
          { x: 8000, y: currentLevel }
        ],
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderColor: reticleFlash ? 'rgba(255, 165, 0, 1)' : 'rgba(255, 165, 0, 0.7)',
        borderWidth: reticleFlash ? 3 : 1,
        borderDash: [5, 5],
        pointRadius: 0,
        showLine: true,
        tension: 0
      });
      
      // Reticle intersection point
      datasets.push({
        label: 'Current Position',
        data: [{ x: currentFrequency, y: currentLevel }],
        backgroundColor: reticleFlash ? 'rgba(255, 165, 0, 1)' : 'rgba(255, 165, 0, 0.7)',
        borderColor: reticleFlash ? 'rgb(255, 165, 0)' : 'rgba(255, 100, 0, 0.7)',
        pointStyle: 'circle',
        pointRadius: reticleFlash ? 9 : 7,
        borderWidth: 2,
        showLine: false
      });
    }
    
    return { datasets };
  };

  // Chart options
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'logarithmic' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Frequency (Hz)'
        },
        ticks: {
          callback: function(this: any, tickValue: number | string, index: number) {
            const value = Number(tickValue);
            // Only show labels for major frequencies to avoid crowding on mobile
            if (MAJOR_FREQUENCIES.includes(value)) {
              return value.toString();
            }
            return '';
          },
          autoSkip: false,
          maxRotation: 0
        },
        min: 125,
        max: 8000,
        grid: {
          display: true,
          color: (context: any) => {
            // Still show grid lines for all standard frequencies
            if (STANDARD_FREQUENCIES.includes(context.tick.value)) {
              return 'rgba(0, 0, 0, 0.1)';
            }
            return 'rgba(0, 0, 0, 0)';
          }
        }
      },
      y: {
        type: 'linear' as const,
        reverse: true, // Invert y-axis (negative values at top)
        title: {
          display: true,
          text: 'Hearing Level (dB HL)'
        },
        min: -10,
        max: 120,
        ticks: {
          stepSize: 10,
          padding: 8,
          autoSkip: false,  // Prevent automatic tick skipping
          callback: function(this: any, tickValue: number | string, index: number) {
            const value = Number(tickValue);
            return value + ' dB';  // Add dB label to each tick
          }
        },
        grid: {
          color: (context: any) => {
            // Show all grid lines with varying intensity
            if (context.tick.value === 0) return 'rgba(0, 0, 0, 0.5)';
            if (context.tick.value % 10 === 0) return 'rgba(0, 0, 0, 0.2)';
            return 'rgba(0, 0, 0, 0.1)';
          },
          drawTicks: true,
          tickLength: 10
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the chart's built-in legend
        position: 'bottom' as const
      },
      title: {
        display: !!title,
        text: title
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const point = context.raw;
            return `${context.dataset.label}: ${point.x} Hz, ${point.y} dB HL`;
          }
        }
      }
    }
  };

  // Handle chart click events
  const handleChartClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !onPositionClick || !chartRef.current) return;
    
    // Don't allow clicks when tone is active
    if (toneActive) return;
    
    const chart = chartRef.current;
    const canvas = chart.canvas;
    
    // Get click position relative to chart
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to chart coordinates
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;
    
    if (!xScale || !yScale) return;
    
    // Get the value in data coordinates
    const frequency = xScale.getValueForPixel(x);
    const level = yScale.getValueForPixel(y);
    
    if (frequency === undefined || level === undefined) return;
    
    // Find the nearest standard frequency
    const nearestFrequency = STANDARD_FREQUENCIES.reduce((prev, curr) => {
      return (Math.abs(curr - frequency) < Math.abs(prev - frequency)) ? curr : prev;
    });
    
    // Round the level to the nearest 5
    const roundedLevel = Math.round(level / 5) * 5;
    
    // Ensure level is within valid range (-10 to 120)
    const clampedLevel = Math.max(-10, Math.min(120, roundedLevel));
    
    // Call the callback with the nearest standard frequency and rounded level
    onPositionClick(nearestFrequency, clampedLevel);
  };

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: width,
        height: height,
        position: 'relative',
        '& canvas': {
          width: '100% !important',
          height: '100% !important'
        }
      }}
    >
      {title && (
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            py: 1
          }}
        >
          {title}
        </Typography>
      )}
      
      <Scatter
        ref={chartRef}
        data={prepareChartData()}
        options={{
          ...options,
          maintainAspectRatio: false,
          responsive: true
        }}
        onClick={handleChartClick}
      />
    </Box>
  );
};

export default Audiogram; 