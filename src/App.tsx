import { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import ThemeContextProvider from './components/ThemeContext';
import CustomThemeProvider from './components/ThemeProvider';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import { CircularProgress, Box } from '@mui/material';

// Lazily load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const TutorialPage = lazy(() => import('./pages/TutorialPage'));
const PatientsPage = lazy(() => import('./pages/PatientsPage'));
const FollowUpPage = lazy(() => import('./pages/FollowUpPage'));
const EarAnatomyPage = lazy(() => import('./pages/EarAnatomyPage'));
const OtoscopyPage = lazy(() => import('./pages/OtoscopyPage'));
const TroubleshootingGuidePage = lazy(() => import('./pages/TroubleshootingGuidePage'));
const RealEarMeasurementPage = lazy(() => import('./pages/RealEarMeasurementPage'));
const ContourTestPage = lazy(() => import('./pages/ContourTestPage'));
const ComprehensiveExam = lazy(() => import('./components/ComprehensiveExam'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px"
    width="100%"
  >
    <CircularProgress />
  </Box>
);

function App() {
  // Add state for the splash screen
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen for 1000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContextProvider>
      <CustomThemeProvider>
        <SplashScreen show={showSplash} />
        
        {!showSplash && (
          <Router>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tutorial" element={<TutorialPage />} />
                  <Route path="/patients" element={<PatientsPage />} />
                  <Route path="/followup" element={<FollowUpPage />} />
                  <Route path="/ear-anatomy" element={<EarAnatomyPage />} />
                  <Route path="/otoscopy" element={<OtoscopyPage />} />
                  <Route path="/troubleshooting" element={<TroubleshootingGuidePage />} />
                  <Route path="/real-ear-measurement" element={<RealEarMeasurementPage />} />
                  <Route path="/contour-test" element={<ContourTestPage />} />
                  <Route path="/exam" element={<ComprehensiveExam />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        )}
      </CustomThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
