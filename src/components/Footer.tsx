import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 Stephen Kanney. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 1, sm: 2 } }}>
            <Link to="/tutorial" style={{ color: 'inherit' }}>
              Tutorial
            </Link>
            <Link to="/patients" style={{ color: 'inherit' }}>
              Practice
            </Link>
            <Link to="/followup" style={{ color: 'inherit' }}>
              Follow-Up
            </Link>
            {/* <Link to="/settings" style={{ color: 'inherit' }}>
              Settings
            </Link> */}
          </Box>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 