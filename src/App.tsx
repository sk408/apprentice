import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import ThemeContextProvider from './components/ThemeContext';
import CustomThemeProvider from './components/ThemeProvider';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';

// Import pages
import HomePage from './pages/HomePage';
import TutorialPage from './pages/TutorialPage';
import PatientsPage from './pages/PatientsPage';
import FollowUpPage from './pages/FollowUpPage';
import EarAnatomyPage from './pages/EarAnatomyPage';
import OtoscopyPage from './pages/OtoscopyPage';
import TroubleshootingGuidePage from './pages/TroubleshootingGuidePage';
import RealEarMeasurementPage from './pages/RealEarMeasurementPage';
// import SettingsPage from './pages/SettingsPage';

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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/followup" element={<FollowUpPage />} />
                <Route path="/ear-anatomy" element={<EarAnatomyPage />} />
                <Route path="/otoscopy" element={<OtoscopyPage />} />
                <Route path="/troubleshooting" element={<TroubleshootingGuidePage />} />
                <Route path="/real-ear-measurement" element={<RealEarMeasurementPage />} />
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
              </Routes>
            </Layout>
          </Router>
        )}
      </CustomThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
