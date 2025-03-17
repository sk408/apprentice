import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider
} from '@mui/material';

/**
 * Tutorial content for the REM procedure
 */
const REMTutorial: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Real Ear Measurement Tutorial</Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>What is Real Ear Measurement?</Typography>
      <Typography paragraph>
        Real Ear Measurement (REM) is a verification procedure used to measure the performance
        of hearing aids in an individual's ear. It helps ensure that the hearing aid is providing
        the appropriate amount of amplification across frequencies based on the patient's hearing loss.
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Types of REM Measurements</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="primary">REUR</Typography>
              <Typography variant="body2">
                Real Ear Unaided Response - Measures the natural acoustic response of the ear canal
                without a hearing aid. This shows the natural resonance of the ear canal.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="primary">REOR</Typography>
              <Typography variant="body2">
                Real Ear Occluded Response - Measures the response with the hearing aid in place
                but turned off. Shows the impact of blocking the ear canal.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="primary">REAR</Typography>
              <Typography variant="body2">
                Real Ear Aided Response - Measures the response with the hearing aid in place
                and turned on. This is the actual output of the hearing aid in the ear.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="primary">REIG</Typography>
              <Typography variant="body2">
                Real Ear Insertion Gain - The difference between REAR and REUR, showing the
                actual gain provided by the hearing aid in the patient's ear.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h6" sx={{ mt: 3 }}>REM Procedure Steps</Typography>
      <ol>
        <li>
          <Typography paragraph>
            <strong>Setup the equipment:</strong> Select the appropriate patient, hearing aid, and ear.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Position the probe tube:</strong> Insert the probe tube to the correct depth in the ear canal,
            typically 25-28mm from the tragus for an adult.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Measure REUR:</strong> Record the unaided response of the ear canal.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Insert hearing aid and measure REOR:</strong> With the hearing aid in place but turned off.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Turn on hearing aid and measure REAR:</strong> With the hearing aid providing amplification.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Calculate REIG:</strong> Compare REAR to REUR to determine insertion gain.
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Compare to targets:</strong> Compare the measurements to prescriptive targets (NAL-NL2, DSL v5.0, etc.).
          </Typography>
        </li>
        <li>
          <Typography paragraph>
            <strong>Make adjustments:</strong> Adjust the hearing aid settings to better match the targets if needed.
          </Typography>
        </li>
      </ol>

      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h6" sx={{ mt: 3 }}>How to Instruct Patients</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" color="primary" gutterBottom>Before the Procedure</Typography>
          <ul>
            <li>
              <Typography paragraph>
                <strong>Explain the purpose:</strong> "This test helps us make sure your hearing aids are providing the right amount of 
                sound specifically for your ears. It's a quick, painless procedure that will help us get the best results from your hearing aids."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Set expectations:</strong> "You'll feel me placing a thin, soft tube in your ear canal, followed by your hearing aid. 
                You'll hear different sounds during the test. You don't need to respond to these sounds - just sit still and remain quiet."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Position instructions:</strong> "Please sit facing forward and try not to move your head during the measurements. 
                This helps us get accurate readings."
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" color="primary" gutterBottom>During the Procedure</Typography>
          <ul>
            <li>
              <Typography paragraph>
                <strong>Provide ongoing guidance:</strong> "I'm going to place the tube in your ear now. You may feel a slight tickle, but it shouldn't be uncomfortable."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Reassurance:</strong> "You're doing great. The test will take just a few more minutes."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Movement reminders:</strong> "Please try to stay as still as possible while the measurement is running."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Silence during measurements:</strong> "I'll need you to remain quiet during the actual measurements. I'll let you know when each one starts and ends."
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="subtitle1" color="primary" gutterBottom>After the Procedure</Typography>
          <ul>
            <li>
              <Typography paragraph>
                <strong>Explain the results:</strong> "These graphs show how your hearing aids are performing in your ears. The dotted line shows our target, and the solid line shows what your hearing aids are actually doing."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Address adjustments:</strong> "Based on these measurements, I'm going to make some fine-tuning adjustments to your hearing aids to better match your specific needs."
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Encourage feedback:</strong> "After we make these adjustments, please let me know how things sound to you. Your subjective experience is also important."
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Typography variant="h6" sx={{ mt: 4 }}>Common Challenges and How to Overcome Them</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="primary">Challenge: Probe Tube Placement</Typography>
              <Typography variant="body2" paragraph>
                Incorrect probe tube placement is one of the most common sources of error.
              </Typography>
              <Typography variant="subtitle2">Solutions:</Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    Mark the probe tube at appropriate depths (25-28mm adults, 20-22mm children).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Use otoscopy before placement to understand individual ear canal anatomy.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Check placement with otoscopy after insertion when possible.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="primary">Challenge: Feedback</Typography>
              <Typography variant="body2" paragraph>
                Acoustic feedback during REAR measurements can disrupt results.
              </Typography>
              <Typography variant="subtitle2">Solutions:</Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    Ensure proper hearing aid fit and seal before measurements.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Temporarily reduce gain in regions causing feedback, then estimate target match.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Consider using a larger dome or custom earmold if feedback persists.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Position the probe tube so it's not touching the hearing aid receiver.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h6" sx={{ mt: 4 }}>Things to Avoid</Typography>
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Never Force the Probe Tube</Typography>
        <Typography variant="body2">
          If you encounter resistance, pull back slightly and try a different angle. Forcing can cause discomfort.
        </Typography>
      </Alert>
      
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Don't Skip Otoscopy</Typography>
        <Typography variant="body2">
          Always examine the ear canal before insertion to check for obstructions, irritation, or unusual anatomy.
        </Typography>
      </Alert>
      
      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Avoid Comparing Incompatible Measurements</Typography>
        <Typography variant="body2">
          Make sure you're comparing the correct measurement types (e.g., REAR with REAR targets, not REIG targets).
        </Typography>
      </Alert>
      
      <Alert severity="warning">
        <Typography variant="subtitle1">Don't Rely Solely on REM</Typography>
        <Typography variant="body2">
          While REM is crucial for verification, also consider patient subjective feedback to ensure comfort and satisfaction.
        </Typography>
      </Alert>
    </Box>
  );
};

export default REMTutorial; 