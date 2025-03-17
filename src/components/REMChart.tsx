import { Box, Typography, useTheme } from '@mui/material';
import { REMCurve, REMTarget } from '../interfaces/RealEarMeasurementTypes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
  ScaleOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

interface REMChartProps {
  measurements?: REMCurve[] | null;
  measurement?: REMCurve | null; // Keep for backward compatibility
  target?: REMTarget | null;
  title?: string;
  showLegend?: boolean;
  height?: number;
  width?: number;
}

// Define colors for different measurement types
const MEASUREMENT_COLORS = {
  'REUR': '#2196F3', // Blue
  'REOR': '#FF9800', // Orange
  'REAR': '#4CAF50', // Green
  'REIG': '#9C27B0', // Purple
  'RECD': '#F44336', // Red
  'RESR': '#795548'  // Brown
};

/**
 * REMChart - Component for displaying Real Ear Measurement data
 */
const REMChart: React.FC<REMChartProps> = ({
  measurements = null,
  measurement = null, // For backward compatibility
  target,
  title = 'Real Ear Measurement',
  showLegend = true,
  height = 400,
  width = 800
}) => {
  const theme = useTheme();
  
  // Generate chart data based on measurements and target
  const getChartData = () => {
    const labels = ['125', '250', '500', '750', '1000', '1500', '2000', '3000', '4000', '6000', '8000'];
    
    const datasets = [];
    
    // Add individual measurement if provided (backward compatibility)
    if (measurement && measurement.measurementPoints.length > 0) {
      datasets.push({
        label: `${measurement.type} Measurement`,
        data: measurement.measurementPoints.map(point => point.gain),
        borderColor: MEASUREMENT_COLORS[measurement.type] || theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: MEASUREMENT_COLORS[measurement.type] || theme.palette.primary.main,
        tension: 0.3
      });
    }
    
    // Add multiple measurements if provided
    if (measurements && measurements.length > 0) {
      measurements.forEach(meas => {
        if (meas && meas.measurementPoints.length > 0) {
          datasets.push({
            label: `${meas.type} Measurement`,
            data: meas.measurementPoints.map(point => point.gain),
            borderColor: MEASUREMENT_COLORS[meas.type] || theme.palette.primary.main,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: MEASUREMENT_COLORS[meas.type] || theme.palette.primary.main,
            tension: 0.3
          });
        }
      });
    }
    
    // Add target data if available
    if (target && target.targetPoints.length > 0) {
      datasets.push({
        label: `${target.type} Target`,
        data: target.targetPoints.map(point => point.gain),
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointBackgroundColor: theme.palette.secondary.main,
        tension: 0.3
      });
    }
    
    return {
      labels,
      datasets
    };
  };
  
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Frequency (Hz)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Gain (dB)'
        },
        min: -10,
        max: 80
      }
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const
      },
      title: {
        display: !!title,
        text: title
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const index = context.dataIndex;
            const frequencyLabels = ['125', '250', '500', '750', '1000', '1500', '2000', '3000', '4000', '6000', '8000'];
            return `${context.dataset.label}: ${context.raw} dB at ${frequencyLabels[index]} Hz`;
          }
        }
      }
    }
  };
  
  return (
    <Box sx={{ height: height, width: width, maxWidth: '100%' }}>
      {(!measurement && !measurements?.length && !target) ? (
        <Typography variant="body1" align="center" sx={{ mt: 8 }}>
          No measurement data available. Complete a measurement to see results.
        </Typography>
      ) : (
        <Line data={getChartData()} options={options} />
      )}
    </Box>
  );
};

export default REMChart; 