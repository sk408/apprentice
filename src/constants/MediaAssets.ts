/**
 * MediaAssets.ts
 * 
 * Central file for managing all image paths and external links used throughout the application.
 * This makes it easier to update, manage, and maintain these assets in one place.
 */

// Helper function to get correct asset path with Vite's base URL
const getAssetPath = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '';
  if (path.startsWith(baseUrl)) return path;
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Logo Images
export const LogoImages = {
  app: getAssetPath('/logo192.png'),
  appLarge: getAssetPath('/logo512.png'),
  react: getAssetPath('/src/logo.svg'),
};

// Public Assets
export const PublicImages = {
  favicon: getAssetPath('/favicon.ico'),
  comfyUI: getAssetPath('/ComfyUI_00043_.png'),
};

// Audiology Equipment Images
export const EquipmentImages = {
  otoscope: getAssetPath('/audiometry_trainer/assets/otoscope.jpg'),
};

// Otoscopy Images
export const OtoscopyImages = {
  technique: getAssetPath('/audiometry_trainer/assets/otoscopy.webp'),
  normalTympanicMembrane: getAssetPath('/audiometry_trainer/assets/TM.jpg'),
  earCanal: getAssetPath('/audiometry_trainer/assets/ear_canal.jpg'), 
  otitisMedia: getAssetPath('/audiometry_trainer/assets/OM.jpg'),
  cerumenImpaction: getAssetPath('/audiometry_trainer/assets/impacted.webp'),
  perforatedTM: getAssetPath('/audiometry_trainer/assets/perforation.webp'),
};

// Ear Anatomy Images
export const EarAnatomyImages = {
  outerEar: getAssetPath('/audiometry_trainer/assets/outer_ear.jpg'),
  middleEar: getAssetPath('/audiometry_trainer/assets/middle_ear.jpg'),
  innerEar: getAssetPath('/audiometry_trainer/assets/inner_ear.jpg'),
  hearingProcess: getAssetPath('/audiometry_trainer/assets/hearing_process.jpg'),
  pinnaLandmarks: getAssetPath('/audiometry_trainer/assets/outer_ear.ppm'),
};

// Documents and Resources
export const Documents = {
  followUpChecklist: getAssetPath('/assets/follow_up_checklist.html'),
};

// Hearing Aid Brand Resources
export const HearingAidBrands = {
  jabra: {
    logo: getAssetPath('/audiometry_trainer/assets/jabra.png'),
    manualUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
    pairingVideoUrl: 'https://www.jabra.com/supportpages/jabra-enhance-pro-20/300-pro-20-60s/video/b29dd20e-8d86-4fd8-81f9-ef68dc0e5453',
    cleaningVideoUrl: 'https://www.jabra.com/supportpages/jabra-enhance-pro-20/300-pro-20-60s/video/c05a12bd-cd74-45c3-8b3c-d07d07720ba6',
    batteryUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
    troubleshootingUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
  },
  rexton: {
    logo: getAssetPath('/audiometry_trainer/assets/rexton.webp'),
    manualUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    pairingVideoUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    cleaningVideoUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    batteryUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    troubleshootingUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
  },
  philips: {
    logo: getAssetPath('/audiometry_trainer/assets/philips.webp'),
    manualUrl: 'https://p3.aprimocdn.net/dgs/5340b167-6191-45dc-ab50-afc80171d787/267270US_IFU_PH_HearLink_40_MNR_T_MNR_TR_Original%20file.pdf',
    pairingVideoUrl: 'https://www.youtube.com/watch?v=D6FCjKgvQhQ',
    cleaningVideoUrl: 'https://www.youtube.com/watch?v=vP-M-bSAdOM',
    batteryUrl: 'https://www.hearingsolutions.philips.com/en-us/support/batteries-and-charging',
    troubleshootingUrl: 'https://www.hearingsolutions.philips.com/en-us/support/troubleshooting',
  },
};

// Platform Support Links
export const PlatformSupport = {
  ios: {
    url: 'https://support.apple.com/en-us/HT201466',
  },
  android: {
    url: 'https://support.google.com/android/answer/9075925?hl=en',
  },
};

// QR Code Generation
export const QRCodeGenerator = {
  baseUrl: 'https://api.qrserver.com/v1/create-qr-code/',
  defaultSize: '150x150',
};

// External Organization Links
export const OrganizationLinks = {
  asha: 'https://www.asha.org',
  aud: 'https://www.audiology.org',
};

// Project Homepage
export const ProjectLinks = {
  homepage: 'https://sk408.github.io/audiometry_trainer',
  repository: 'https://github.com/sk408/audiometry_trainer.git',
};

// 3D Models - defined separately for dynamic loading
const MODEL_PATHS = {
  mainEar: getAssetPath('/assets/Main_ear_default.glb'),
};

// Exported as a function to support dynamic imports
export const getModelPath = (modelName: keyof typeof MODEL_PATHS) => MODEL_PATHS[modelName]; 