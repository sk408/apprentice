import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Grid
} from '@mui/material';

/**
 * Reference content for REM procedures
 */
const REMReference: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Reference Materials</Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Prescription Methods</Typography>
      <Typography paragraph>
        <strong>NAL-NL2:</strong> The National Acoustic Laboratories' nonlinear prescription, version 2.
        This formula aims to maximize speech intelligibility while maintaining comfortable loudness.
        It's widely used for adults with acquired hearing loss.
      </Typography>
      <Typography paragraph>
        <strong>DSL v5.0:</strong> Desired Sensation Level, version 5.0. This method focuses on audibility
        across a wide range of input levels and is commonly used for pediatric fittings.
      </Typography>

      <Card sx={{ mb: 4, mt: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>NAL-NL2 In-Depth</Typography>
          
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Calculation Methodology</Typography>
          <Typography variant="body2" paragraph>
            NAL-NL2 uses a complex calculation process that considers multiple variables to generate prescriptive targets:
          </Typography>
          <ol>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Loudness Normalization:</strong> The fundamental principle is to maximize speech intelligibility while maintaining comfortable loudness across frequencies. NAL-NL2 aims to equalize loudness contributions from different frequency regions with importance weighted toward speech frequencies.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Input Level Compensation:</strong> NAL-NL2 applies different gain prescriptions based on input level 
                (typically 50, 65, and 80 dB SPL). This creates a compression response that mimics normal loudness growth.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Individual Factors Adjustment:</strong> The formula includes corrections for:
                <ul>
                  <li>Gender (typically more gain for males)</li>
                  <li>Age (reduced high-frequency gain for older adults)</li>
                  <li>Experience level (gradual increase in gain for new users)</li>
                  <li>Language background (tonal vs. non-tonal languages)</li>
                </ul>
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Binaural Summation:</strong> When fitting binaurally, NAL-NL2 reduces gain by approximately 2-3 dB 
                compared to monaural fittings, accounting for binaural loudness summation.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" paragraph>
                <strong>Severe-to-Profound Adaptation:</strong> For severe and profound hearing losses, NAL-NL2 provides 
                proportionally more gain in low and mid frequencies and less in high frequencies compared to moderate losses.
              </Typography>
            </li>
          </ol>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>Comparison: NAL-NL2 vs. Manufacturer Formulas</Typography>
          
          <Typography variant="body2" paragraph>
            Manufacturer-specific fitting formulas often differ from NAL-NL2 in significant ways. Understanding these differences is crucial 
            for clinical decision-making.
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom>Key Differences</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="primary">Gain Differences</Typography>
                  <Typography variant="body2" paragraph>
                    <strong>NAL-NL2:</strong> Typically prescribes less gain, especially in low frequencies. Targets highest gain in mid-frequencies where 
                    speech information is most important.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Manufacturer Formulas:</strong> Often prescribe 3-8 dB more overall gain than NAL-NL2, particularly in low frequencies. 
                    This can make hearing aids sound "fuller" initially but may lead to issues with occlusion and user comfort.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="primary">Compression Characteristics</Typography>
                  <Typography variant="body2" paragraph>
                    <strong>NAL-NL2:</strong> Uses moderate compression ratios tailored to hearing loss severity. Focuses on maintaining speech intelligibility.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Manufacturer Formulas:</strong> May implement more aggressive compression, especially in proprietary "comfort" programs. 
                    Some formulas use frequency-specific compression ratios that differ substantially from research-based approaches.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Proper Probe Tube Placement</Typography>
      <Typography paragraph>
        For accurate measurements, the probe tube should be placed within 5-6mm of the tympanic membrane.
        For average adults, this is approximately 25-28mm from the tragus. Placement that is too shallow
        will result in inaccurate high-frequency measurements.
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Common Issues and Troubleshooting</Typography>
      <Box sx={{ mt: 1 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Feedback during measurement</Typography>
          <Typography variant="body2">
            If feedback occurs, check that the hearing aid is properly sealed in the ear canal and
            that gain settings are appropriate for the patient's hearing loss.
          </Typography>
        </Alert>
        
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Probe tube movement</Typography>
          <Typography variant="body2">
            If the probe tube moves during measurements, results will be inconsistent.
            Ensure the tube is securely placed and minimize patient movement.
          </Typography>
        </Alert>
        
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Poor match to targets</Typography>
          <Typography variant="body2">
            If measurements don't match targets despite adjustments, consider:
            <ul>
              <li>Different hearing aid style or model</li>
              <li>Acoustic modifications (vent size, dome type)</li>
              <li>Different prescription method</li>
            </ul>
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default REMReference; 