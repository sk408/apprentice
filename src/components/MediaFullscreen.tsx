import { useState, ReactNode } from 'react';
import { Box, IconButton, Dialog, Slide } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

// Slide transition for the dialog
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MediaFullscreenProps {
  children: ReactNode;
  disabled?: boolean;
}

const MediaFullscreen: React.FC<MediaFullscreenProps> = ({ children, disabled = false }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  // If disabled, just render the children
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      
      {/* Fullscreen button */}
      <IconButton
        onClick={handleFullscreenToggle}
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)',
          },
          zIndex: 1,
        }}
        size="small"
        aria-label="fullscreen"
      >
        <FullscreenIcon fontSize="small" />
      </IconButton>

      {/* Fullscreen dialog */}
      <Dialog
        fullScreen
        open={isFullscreen}
        onClose={handleFullscreenToggle}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'black',
          }}
        >
          {/* Close button */}
          <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleFullscreenToggle}
              aria-label="close fullscreen"
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Content container */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MediaFullscreen; 