import { Box, Typography } from '@mui/material';
import { REMCurve } from '../../interfaces/RealEarMeasurementTypes';

interface MeasurementLegendProps {
  measurements: REMCurve[];
}

/**
 * Component that displays a legend for all completed measurements
 */
const MeasurementLegend: React.FC<MeasurementLegendProps> = ({ measurements }) => (
  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="subtitle1" gutterBottom>Completed Measurements:</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {measurements.map((measurement) => (
        <Box 
          key={measurement.type} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: 'background.paper',
            p: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box 
            sx={{ 
              width: 16, 
              height: 16, 
              bgcolor: measurement.type === 'REUR' ? '#2196F3' : 
                       measurement.type === 'REOR' ? '#FF9800' : 
                       measurement.type === 'REAR' ? '#4CAF50' : 
                       measurement.type === 'REIG' ? '#9C27B0' :
                       measurement.type === 'RECD' ? '#F44336' : 
                       '#795548',
              mr: 1,
              borderRadius: '50%'
            }} 
          />
          <Typography variant="body2">{measurement.type}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default MeasurementLegend; 