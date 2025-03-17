import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Box, CircularProgress, Chip, ToggleButton, ToggleButtonGroup, Typography, Paper, Alert, Button, Link, Tooltip, IconButton } from '@mui/material';
import { Group, TOUCH } from 'three';
import { useGLTF } from '@react-three/drei';
import { getModelPath } from '../constants/MediaAssets';
import * as THREE from 'three';
import InfoIcon from '@mui/icons-material/Info';

// Custom OrbitControls with reset functionality
interface OrbitControlsWithResetProps {
  enablePan?: boolean;
  enableZoom?: boolean;
  enableRotate?: boolean;
  minDistance?: number;
  maxDistance?: number;
  autoRotate?: boolean;
  touches?: {
    ONE?: TOUCH;
    TWO?: TOUCH;
  };
  rotateSpeed?: number;
  zoomSpeed?: number;
}

function OrbitControlsWithReset(props: OrbitControlsWithResetProps) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const initialPosition = useRef<[number, number, number]>([0, 0, 5]); // Store initial camera position
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'r') {
        // Reset camera position
        if (controlsRef.current) {
          camera.position.set(initialPosition.current[0], initialPosition.current[1], initialPosition.current[2]);
          controlsRef.current.reset();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera]);
  
  // Pass all props including touches
  return <OrbitControls ref={controlsRef} {...props} />;
}

// Parts of the ear that can be highlighted
const earParts = [
  { id: 'all', name: 'Full Ear', color: '#ffffff' },
  { id: 'helix', name: 'Helix', color: '#ff6b6b' },
  { id: 'antihelix', name: 'Antihelix', color: '#4ecdc4' },
  { id: 'tragus', name: 'Tragus', color: '#ffbe0b' },
  { id: 'antitragus', name: 'Antitragus', color: '#fb5607' },
  { id: 'concha', name: 'Concha', color: '#8338ec' },
  { id: 'lobule', name: 'Lobule', color: '#3a86ff' }
];

// Helper function to get the correct asset path
const getAssetPath = (assetPath: string) => {
  // Read the base URL from Vite environment variables
  const baseUrl = import.meta.env.BASE_URL || '';
  
  // If the path already starts with the base URL, return it as is
  if (assetPath.startsWith(baseUrl)) {
    return assetPath;
  }
  
  // Otherwise, join the base URL with the asset path
  return `${baseUrl}${assetPath.startsWith('/') ? '' : '/'}${assetPath}`;
};

// Preload the model to avoid waterfall loading
useGLTF.preload(getModelPath('mainEar'));

// Model component for the ear with error handling
function EarModel({ 
  modelPath, 
  activePart = 'all',
  onPartHover,
  onError 
}: { 
  modelPath: string;
  activePart?: string;
  onPartHover?: (part: string | null) => void;
  onError?: (error: any) => void;
}) {
  console.log(`Attempting to load 3D model from: ${modelPath}`);
  
  // Hooks must be at the top level, not inside conditionals
  const modelRef = useRef<Group>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<any>(null);
  
  // Use useMemo to prevent unnecessary re-renders
  const { scene: model, ...gltfResult } = useGLTF(modelPath);
  
  // Use a separate useEffect for error handling since useGLTF doesn't accept an error callback
  useEffect(() => {
    try {
      if (model) {
        console.log(`Successfully loaded 3D model:`, { scene: model, ...gltfResult });
      }
    } catch (error: unknown) {
      console.error('Error loading model:', error);
      setLoadError(error);
      if (onError) onError(error);
    }
  }, [model, gltfResult, onError]);
  
  // Automatic rotation when not interacting
  useFrame((state, delta) => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  // Highlight the active part (this would need to be adapted based on the actual model structure)
  useEffect(() => {
    if (!modelRef.current) return;
    
    // This is a placeholder for actual model part highlighting
    // In a real implementation, you would identify parts of the model by name/id and change their material
    
    // Reset all materials to default
    modelRef.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.emissive.set(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
    
    // Highlight the selected part
    if (activePart !== 'all') {
      modelRef.current.traverse((child: any) => {
        // This assumes parts have names that include the activePart string
        // Modify this logic based on your actual model structure
        if (child.isMesh && child.name.toLowerCase().includes(activePart.toLowerCase())) {
          const partInfo = earParts.find(p => p.id === activePart);
          if (partInfo) {
            child.material.emissive.set(partInfo.color);
            child.material.emissiveIntensity = 0.5;
          }
        }
      });
    }
  }, [activePart]);

  // If there was an error loading the model, render error message
  if (loadError) {
    return (
      <Html center>
        <div style={{ color: 'red', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
          Error loading 3D model
        </div>
      </Html>
    );
  }
  
  // If model loaded successfully, render it
  return (
    <group 
      ref={modelRef} 
      scale={0.15} 
      position={[0, 0, 0]}
      onPointerOver={() => setIsRotating(false)}
      onPointerOut={() => setIsRotating(true)}
    >
      <primitive 
        object={model} 
        dispose={null} 
      />
      
      {/* HTML annotation labels would go here in a real implementation */}
      {/* This is just placeholder code since we don't know the exact structure of the 3D model */}
      {activePart !== 'all' && (
        <Html position={[0, 0, 0]} distanceFactor={10}>
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '5px 10px', 
            borderRadius: '4px',
            transform: 'translate3d(-50%, -50%, 0)'
          }}>
            {earParts.find(p => p.id === activePart)?.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Create separate Canvas component to improve code splitting
const ModelCanvas = ({ 
  modelPath, 
  activePart, 
  onError,
  onLoaded,
  mobileControls = true
}: { 
  modelPath: string; 
  activePart: string;
  onError: (error: any) => void;
  onLoaded: () => void;
  mobileControls?: boolean;
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ 
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)' 
      }}
      onCreated={() => onLoaded()}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Html center><CircularProgress /></Html>}>
        <EarModel 
          modelPath={modelPath} 
          activePart={activePart} 
          onError={onError}
        />
        <Environment preset="city" />
      </Suspense>
      <OrbitControlsWithReset
        enablePan={mobileControls}
        minDistance={3} 
        maxDistance={8} 
        enableRotate={true}
        enableZoom={true}
        rotateSpeed={1.0}
        zoomSpeed={1.2}
        touches={{
          ONE: mobileControls ? TOUCH.ROTATE : TOUCH.ROTATE,
          TWO: mobileControls ? TOUCH.DOLLY_PAN : TOUCH.DOLLY_PAN
        }}
      />
    </Canvas>
  );
};

// Main 3D ear model component
const EarModel3D: React.FC<{ height?: string | number }> = ({ height = 400 }) => {
  const [loading, setLoading] = useState(true);
  const [activePart, setActivePart] = useState('all');
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [modelError, setModelError] = useState<any>(null);
  
  // Memoize the model path to prevent unnecessary recalculations
  const modelPath = useMemo(() => getModelPath('mainEar'), []);

  const handleModelError = (error: any) => {
    setModelError(error);
    setLoading(false);
  };
  
  const handleModelLoaded = () => {
    setLoading(false);
  };

  // Function to verify the model file exists
  const verifyModelExists = async () => {
    try {
      const response = await fetch(modelPath, { method: 'HEAD' });
      if (response.ok) {
        alert(`Success! Model file found at ${modelPath}\nContent-Type: ${response.headers.get('Content-Type')}\nContent-Length: ${response.headers.get('Content-Length')} bytes`);
      } else {
        alert(`Error: Could not find model at ${modelPath}\nStatus: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      alert(`Error checking model file: ${err}`);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {/* 3D viewer */}
      <Box
        sx={{
          width: '100%',
          height,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          bgcolor: 'white',
        }}
      >
        {loading && !modelError && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        
        {modelError ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">Could not load 3D ear model</Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={verifyModelExists}
              sx={{ mt: 2 }}
            >
              Check Model Availability
            </Button>
          </Box>
        ) : (
          <Suspense fallback={<CircularProgress />}>
            <ModelCanvas 
              modelPath={modelPath} 
              activePart={activePart}
              onError={handleModelError}
              onLoaded={handleModelLoaded}
              mobileControls={true}
            />
          </Suspense>
        )}
      </Box>
      
      {/* Touch controls instructions */}
      <Paper elevation={1} sx={{ p: 1, borderRadius: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
        <InfoIcon fontSize="small" color="info" sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Controls: One finger to rotate, two fingers to zoom/pan
        </Typography>
      </Paper>
    </Box>
  );
};

export default EarModel3D; 