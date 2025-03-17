import { useState, ReactNode, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent
} from '@mui/material';
import {
  HearingOutlined,
  Build,
  BluetoothConnected,
  BatteryAlert,
  VolumeOff,
  Settings,
  Help,
  ExpandMore,
  Print,
  SaveAlt,
  QrCode2,
  ArrowForward,
  ArrowBack,
  Assignment
} from '@mui/icons-material';
import QRCode from 'qrcode.react'; // QR code generation for videos and instructions
import { useNavigate } from 'react-router-dom';
import { HearingAidBrands, PlatformSupport, QRCodeGenerator } from '../constants/MediaAssets';

// Define type for hearing aid brand
interface HearingAidBrand {
  id: string;
  name: string;
  logo: string;
  manualUrl: string;
  pairingVideoUrl: string;
  cleaningVideoUrl: string;
  batteryUrl: string;
  troubleshootingUrl: string;
}

// Define type for platform-specific instructions
interface PlatformSpecificInstructions {
  title: string;
  steps: string[];
  url: string;
}

// Define type for troubleshooting category
interface TroubleshootingCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  steps: string[];
  platformSpecific?: {
    ios: PlatformSpecificInstructions;
    android: PlatformSpecificInstructions;
  };
}

// Define our hearing aid brands
const HEARING_AID_BRANDS: HearingAidBrand[] = [
  {
    id: 'jabra',
    name: 'Jabra Enhance Pro 20',
    logo: HearingAidBrands.jabra.logo,
    manualUrl: HearingAidBrands.jabra.manualUrl,
    pairingVideoUrl: HearingAidBrands.jabra.pairingVideoUrl,
    cleaningVideoUrl: HearingAidBrands.jabra.cleaningVideoUrl,
    batteryUrl: HearingAidBrands.jabra.batteryUrl,
    troubleshootingUrl: HearingAidBrands.jabra.troubleshootingUrl,
  },
  {
    id: 'rexton',
    name: 'Rexton Reach',
    logo: HearingAidBrands.rexton.logo,
    manualUrl: HearingAidBrands.rexton.manualUrl,
    pairingVideoUrl: HearingAidBrands.rexton.pairingVideoUrl,
    cleaningVideoUrl: HearingAidBrands.rexton.cleaningVideoUrl,
    batteryUrl: HearingAidBrands.rexton.batteryUrl,
    troubleshootingUrl: HearingAidBrands.rexton.troubleshootingUrl,
  },
  {
    id: 'philips',
    name: 'Philips 9050',
    logo: HearingAidBrands.philips.logo,
    manualUrl: HearingAidBrands.philips.manualUrl,
    pairingVideoUrl: HearingAidBrands.philips.pairingVideoUrl,
    cleaningVideoUrl: HearingAidBrands.philips.cleaningVideoUrl,
    batteryUrl: HearingAidBrands.philips.batteryUrl,
    troubleshootingUrl: HearingAidBrands.philips.troubleshootingUrl,
  }
];

// Define common troubleshooting categories
const TROUBLESHOOTING_CATEGORIES: TroubleshootingCategory[] = [
  {
    id: 'not-working',
    title: 'Hearing Aid Not Working',
    icon: <VolumeOff />,
    steps: [
      "Check if the hearing aid is turned on (open and close the battery door or check power button)",
      "Replace the battery/ensure rechargeable aid is charged",
      "Clean the hearing aid and check for wax blockage",
      "Replace wax guards if necessary",
      "If still not working, contact your hearing care provider"
    ]
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth Pairing Issues',
    icon: <BluetoothConnected />,
    steps: [
      'Ensure the hearing aid is charged and turned on.',
      'Turn Bluetooth on in your device settings.',
      'Put the hearing aid in pairing mode according to the manual.',
      'Open the hearing aid app if applicable and follow the connection steps.',
      'If pairing fails, restart both your device and the hearing aid.',
    ],
    platformSpecific: {
      ios: {
        title: 'iOS Specific Steps',
        steps: [
          'Go to Settings > Accessibility > Hearing Devices',
          'Wait for your iPhone to detect your hearing aids',
          'When your hearing aid appears, tap on it and follow the pairing request',
          'If needed, confirm the pairing request on both devices'
        ],
        url: PlatformSupport.ios.url
      },
      android: {
        title: 'Android Specific Steps',
        steps: [
          'Go to Settings > Connected Devices > Pair new device',
          'Ensure your hearing aid is in pairing mode',
          'When your hearing aid appears in the list, tap it to pair',
          'Accept any pairing requests that appear'
        ],
        url: PlatformSupport.android.url
      }
    }
  },
  {
    id: 'battery',
    title: 'Battery Issues',
    icon: <BatteryAlert />,
    steps: [
      "Make sure you're using the correct battery size",
      "Check for corrosion on battery contacts",
      "For rechargeable aids, ensure the charging contacts are clean",
      "Try a fresh pack of batteries",
      "If battery drains quickly, reduce streaming time or consult provider"
    ]
  },
  {
    id: 'feedback',
    title: 'Feedback/Whistling',
    icon: <VolumeOff />,
    steps: [
      "Ensure the hearing aid is inserted properly",
      "Check for ear wax buildup in your ear",
      "Check for cracks in tubing (if applicable)",
      "Lower the volume slightly",
      "Contact your provider for possible adjustment"
    ]
  },
  {
    id: 'physical',
    title: 'Physical Comfort Issues',
    icon: <Build />,
    steps: [
      "Make sure you're inserting the hearing aid correctly",
      "Check if the dome/earmold size is appropriate",
      "For irritation, clean the hearing aid and your ear",
      "Allow your ear time to adjust (usually 1-2 weeks)",
      "If discomfort persists, contact your provider"
    ]
  }
];

// Convert image URL to data URL for embedding in HTML
const imageToDataUrl = async (imageUrl: string): Promise<string> => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to data URL:', error);
    return imageUrl; // Fall back to original URL if conversion fails
  }
};

const generateGuideHTML = async (brand: string, selectedCategory: string | undefined = undefined): Promise<string> => {
  const brandInfo = HEARING_AID_BRANDS.find(b => b.id === brand);
  if (!brandInfo) return '';

  // Convert logo to data URL for embedding
  const logoDataUrl = await imageToDataUrl(brandInfo.logo);

  const categories = selectedCategory 
    ? TROUBLESHOOTING_CATEGORIES.filter(c => c.id === selectedCategory)
    : TROUBLESHOOTING_CATEGORIES;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hearing Aid Troubleshooting Guide - ${brandInfo.name}</title>
  <style>
    @media print {
      @page {
        size: letter;
        margin: 0.5in;
      }
      body {
        font-size: 12pt;
        margin: 0;
        padding: 0;
      }
      .no-print {
        display: none;
      }
      .page-break {
        page-break-after: always;
      }
      .qr-code {
        width: 80px;
        height: 80px;
        max-width: 100%;
      }
      .logo {
        max-width: 120px;
      }
      
      /* Control page breaks */
      .troubleshooting-section {
        page-break-inside: avoid;
      }
      
      .platform-specific {
        page-break-inside: avoid;
      }
      
      h2, h3, h4, h5 {
        page-break-after: avoid;
      }
      
      .resources {
        page-break-inside: avoid;
      }
    }
    
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #1a365d;
      border-bottom: 2px solid #3182ce;
      padding-bottom: 10px;
      font-weight: 600;
    }
    
    h2 {
      color: #2c5282;
      margin-top: 30px;
      font-weight: 600;
    }
    
    h3 {
      color: #2a4365;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 15px;
    }
    
    .logo {
      max-width: 150px;
      margin-right: 20px;
    }
    
    .troubleshooting-section {
      margin-bottom: 30px;
      border: 1px solid #e2e8f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      background-color: #fff;
    }
    
    ol {
      margin-left: 0;
      padding-left: 25px;
      margin-bottom: 20px;
      counter-reset: item;
      list-style-type: none;
    }
    
    ol li {
      position: relative;
      margin-bottom: 12px;
      padding-left: 10px;
      counter-increment: item;
      line-height: 1.5;
    }
    
    ol li:before {
      content: counter(item) ".";
      position: absolute;
      left: -25px;
      width: 22px;
      text-align: right;
      font-weight: bold;
      color: #3182ce;
    }
    
    ul {
      margin-left: 0;
      padding-left: 25px;
      margin-bottom: 20px;
      list-style-type: square;
    }
    
    ul li {
      margin-bottom: 8px;
      padding-left: 5px;
    }
    
    .resources {
      background-color: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 25px;
      border: 1px solid #e2e8f0;
    }
    
    .resources h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .qr-resources {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 10px;
    }
    
    .qr-item {
      text-align: center;
      width: 100px;
    }
    
    .qr-code {
      display: block;
      margin: 0 auto 5px;
      border: 1px solid #e2e8f0;
      padding: 3px;
      background: white;
      border-radius: 4px;
    }
    
    .qr-item p {
      margin: 0;
      font-size: 0.85em;
      line-height: 1.2;
    }
    
    .button {
      background-color: #3182ce;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      margin-top: 20px;
    }
    
    .button:hover {
      background-color: #2c5282;
    }
    
    .no-print {
      margin-top: 30px;
      text-align: center;
    }
    
    .footer {
      margin-top: 40px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
      font-size: 0.9em;
      color: #718096;
      text-align: center;
    }
    
    .section-title {
      background-color: #ebf8ff;
      padding: 10px 15px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin: -20px -20px 15px -20px;
      border-bottom: 1px solid #bee3f8;
      font-weight: 600;
      color: #2c5282;
    }
    
    .platform-specific {
      background-color: #f0fff4;
      border: 1px solid #c6f6d5;
      border-radius: 8px;
      padding: 15px;
      margin-top: 20px;
    }
    
    .platform-specific h4 {
      color: #2f855a;
      margin-top: 0;
      margin-bottom: 15px;
    }
    
    .platform-specific h5 {
      color: #276749;
      margin-bottom: 10px;
      border-bottom: 1px solid #c6f6d5;
      padding-bottom: 5px;
    }
    
    .url-text {
      font-family: monospace;
      font-size: 0.9em;
      color: #4a5568;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${logoDataUrl}" alt="${brandInfo.name} Logo" class="logo">
    <h1>Hearing Aid Troubleshooting Guide</h1>
  </div>
  
  <h2>${brandInfo.name}</h2>
  
  <div class="resources">
    <h3>Quick Resources - Scan QR Codes for Help</h3>
    <div class="qr-resources">
      <div class="qr-item">
        <img class="qr-code" src="${QRCodeGenerator.baseUrl}?size=${QRCodeGenerator.defaultSize}&data=${encodeURIComponent(brandInfo.pairingVideoUrl)}" alt="QR Code for Pairing Video">
        <p><strong>Pairing</strong></p>
      </div>
      
      <div class="qr-item">
        <img class="qr-code" src="${QRCodeGenerator.baseUrl}?size=${QRCodeGenerator.defaultSize}&data=${encodeURIComponent(brandInfo.cleaningVideoUrl)}" alt="QR Code for Cleaning Video">
        <p><strong>Cleaning</strong></p>
      </div>
      
      <div class="qr-item">
        <img class="qr-code" src="${QRCodeGenerator.baseUrl}?size=${QRCodeGenerator.defaultSize}&data=${encodeURIComponent(brandInfo.manualUrl)}" alt="QR Code for User Manual">
        <p><strong>Manual</strong></p>
      </div>
    </div>
  </div>

  ${categories.map(category => `
  <div class="troubleshooting-section">
    <div class="section-title">${category.title}</div>
    <ol>
      ${category.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
    
    ${category.id === 'bluetooth' && category.platformSpecific ? `
    <div class="platform-specific">
      <h4>Device-Specific Instructions</h4>
      
      <h5>iPhone/iPad</h5>
      <ol>
        ${category.platformSpecific.ios.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
      <p>For detailed instructions: <span class="url-text">${category.platformSpecific.ios.url}</span></p>
      
      <h5>Android Devices</h5>
      <ol>
        ${category.platformSpecific.android.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
      <p>For detailed instructions: <span class="url-text">${category.platformSpecific.android.url}</span></p>
    </div>
    ` : ''}
  </div>
  `).join('')}
  
  <div class="footer">
    <p>This guide is provided as a resource for basic troubleshooting. For persistent issues, please contact your hearing healthcare provider.</p>
    <p>© ${new Date().getFullYear()} Audiometry Trainer. All rights reserved.</p>
  </div>
  
  <div class="no-print">
    <button class="button" onclick="window.print()">Print This Guide</button>
  </div>
</body>
</html>
  `;
};

const TroubleshootingGuidePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [htmlPreviewUrl, setHtmlPreviewUrl] = useState<string | null>(null);

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenerateGuide = async () => {
    if (selectedBrand) {
      const brand = HEARING_AID_BRANDS.find(b => b.id === selectedBrand);
      const baseFilename = `${brand?.name.replace(/\s+/g, '_')}_troubleshooting_guide`;
      
      // Generate HTML guide
      const html = await generateGuideHTML(selectedBrand, selectedCategory || undefined);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Store the URL for preview
      setHtmlPreviewUrl(url);
      
      // Download the file
      const htmlFilename = `${baseFilename}.html`;
      const a = document.createElement('a');
      a.href = url;
      a.download = htmlFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Automatically open in a new browser tab
      window.open(url, '_blank');
      
      // Open the preview dialog
      setPreviewDialogOpen(true);
    }
  };

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleFinish = () => {
    setCurrentStep(0);
    setSelectedBrand('');
    setSelectedCategory('');
  };

  const findBrandById = (id: string) => HEARING_AID_BRANDS.find(brand => brand.id === id);
  const findCategoryById = (id: string) => TROUBLESHOOTING_CATEGORIES.find(cat => cat.id === id);

  // Clean up URL object when the component unmounts or when no longer needed
  useEffect(() => {
    return () => {
      if (htmlPreviewUrl) {
        URL.revokeObjectURL(htmlPreviewUrl);
      }
    };
  }, [htmlPreviewUrl]);

  return (
    <Container maxWidth="lg" sx={{ mb: 8, mt: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <HearingOutlined fontSize="large" color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Hearing Aid Troubleshooting Guide Generator
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Create personalized troubleshooting guides for your patients based on their hearing aid model. These 
          guides include step-by-step instructions, QR codes to instructional videos, and can be printed for 
          easy reference.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Stepper activeStep={currentStep} orientation={isMobile ? "vertical" : "horizontal"} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Select Hearing Aid</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Choose the specific hearing aid model your patient is using.
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="brand-select-label">Hearing Aid Brand/Model</InputLabel>
                <Select
                  labelId="brand-select-label"
                  id="brand-select"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  label="Hearing Aid Brand/Model"
                >
                  <MenuItem value="" disabled>Select a brand</MenuItem>
                  {HEARING_AID_BRANDS.map(brand => (
                    <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedBrand}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            </StepContent>
          </Step>
          
          <Step>
            <StepLabel>Choose Issue (Optional)</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Select a specific issue to focus on, or leave blank to include all troubleshooting topics.
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="category-select-label">Troubleshooting Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Troubleshooting Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {TROUBLESHOOTING_CATEGORIES.map(category => (
                    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              </Box>
            </StepContent>
          </Step>
          
          <Step>
            <StepLabel>Generate Guide</StepLabel>
            <StepContent>
              <Typography variant="body2" paragraph>
                Review your selections and generate a printable troubleshooting guide:
              </Typography>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1">Selected Hearing Aid:</Typography>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {findBrandById(selectedBrand)?.name || 'None selected'}
                </Typography>
                
                <Typography variant="subtitle1">Selected Category:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {selectedCategory 
                    ? findCategoryById(selectedCategory)?.title 
                    : 'All Categories'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleGenerateGuide}
                  startIcon={<QrCode2 />}
                >
                  Generate Guide
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        
        {currentStep === 3 && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Guide Generated Successfully!
            </Typography>
            <Typography variant="body2" paragraph>
              Your guide has been created and opened in a new browser tab. You can print it directly from the browser.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleFinish}
              >
                Create Another Guide
              </Button>
              {htmlPreviewUrl && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Print />}
                  onClick={() => window.open(htmlPreviewUrl, '_blank')}
                >
                  Open Guide Again
                </Button>
              )}
            </Box>
          </Box>
        )}
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" gutterBottom>
          Common Troubleshooting Categories
        </Typography>
        
        {TROUBLESHOOTING_CATEGORIES.map((category) => (
          <Accordion key={category.id} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {category.icon}
                </ListItemIcon>
                <Typography variant="subtitle1">{category.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Common steps to troubleshoot this issue:
              </Typography>
              <List>
                {category.steps.map((step, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{index + 1}.</Typography>
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
              
              {category.id === 'bluetooth' && category.platformSpecific && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Platform-Specific Instructions:
                  </Typography>
                  
                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>iPhone/iPad Instructions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {category.platformSpecific.ios.steps.map((step, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Typography variant="body2">{index + 1}.</Typography>
                            </ListItemIcon>
                            <ListItemText primary={step} />
                          </ListItem>
                        ))}
                      </List>
                      <Button 
                        size="small" 
                        href={category.platformSpecific.ios.url} 
                        target="_blank"
                        sx={{ mt: 1 }}
                      >
                        Apple Support Article
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion sx={{ mt: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Android Instructions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {category.platformSpecific.android.steps.map((step, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Typography variant="body2">{index + 1}.</Typography>
                            </ListItemIcon>
                            <ListItemText primary={step} />
                          </ListItem>
                        ))}
                      </List>
                      <Button 
                        size="small" 
                        href={category.platformSpecific.android.url} 
                        target="_blank"
                        sx={{ mt: 1 }}
                      >
                        Android Support Article
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        
        <Dialog
          open={previewDialogOpen}
          onClose={() => setPreviewDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Guide Preview</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" paragraph>
                Your troubleshooting guide has been generated. You can:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><SaveAlt /></ListItemIcon>
                  <ListItemText primary="Your HTML file has been downloaded to your computer" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Assignment /></ListItemIcon>
                  <ListItemText primary="The guide has been opened in a new browser tab" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Print /></ListItemIcon>
                  <ListItemText primary="Use the browser's Print option (Ctrl+P or Cmd+P) to save as PDF or print the guide" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><QrCode2 /></ListItemIcon>
                  <ListItemText primary="QR codes in the guide link to instructional videos" />
                </ListItem>
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
            {htmlPreviewUrl && (
              <Button 
                color="primary"
                onClick={() => window.open(htmlPreviewUrl, '_blank')}
              >
                Open Again in Browser
              </Button>
            )}
            <Button 
              variant="contained"
              onClick={() => {
                setPreviewDialogOpen(false);
                setCurrentStep(3);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default TroubleshootingGuidePage; 