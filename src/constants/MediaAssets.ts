/**
 * MediaAssets.ts
 * 
 * Central file for managing all image paths and external links used throughout the application.
 * This makes it easier to update, manage, and maintain these assets in one place.
 */

// Logo Images
export const LogoImages = {
  app: '/logo192.png',
  appLarge: '/logo512.png',
  react: '/src/logo.svg',
};

// Public Assets
export const PublicImages = {
  favicon: '/favicon.ico',
  comfyUI: '/ComfyUI_00043_.png',
};

// Audiology Equipment Images
export const EquipmentImages = {
  otoscope: '/audiometry_trainer/assets/otoscope.jpg',
};

// Otoscopy Images
export const OtoscopyImages = {
  technique: '/audiometry_trainer/assets/otoscopy.webp',
  normalTympanicMembrane: '/audiometry_trainer/assets/TM.jpg',
  earCanal: '/audiometry_trainer/assets/ear_canal.jpg', 
  otitisMedia: '/audiometry_trainer/assets/OM.jpg',
  cerumenImpaction: '/audiometry_trainer/assets/impacted.webp',
  perforatedTM: '/audiometry_trainer/assets/perforation.webp',
};

// Documents and Resources
export const Documents = {
  followUpChecklist: '/assets/follow_up_checklist.html',
};

// Hearing Aid Brand Resources
export const HearingAidBrands = {
  jabra: {
    logo: '/audiometry_trainer/assets/jabra.png',
    manualUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
    pairingVideoUrl: 'https://www.jabra.com/supportpages/jabra-enhance-pro-20/300-pro-20-60s/video/b29dd20e-8d86-4fd8-81f9-ef68dc0e5453',
    cleaningVideoUrl: 'https://www.jabra.com/supportpages/jabra-enhance-pro-20/300-pro-20-60s/video/c05a12bd-cd74-45c3-8b3c-d07d07720ba6',
    batteryUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
    troubleshootingUrl: 'https://www.jabra.com/SupportPages/Jabra-Enhance-Pro-20#/#300-pro-20-60s',
  },
  rexton: {
    logo: '/audiometry_trainer/assets/rexton.webp',
    manualUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    pairingVideoUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    cleaningVideoUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    batteryUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
    troubleshootingUrl: 'https://www.rexton.com/en-us/support/how-to-videos/',
  },
  philips: {
    logo: '/audiometry_trainer/assets/philips.webp',
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

// Other Assets
export const OtherAssets = {
  audiogramSample: '/src/assets/audiogram_sample.png',
  earModel: '/src/assets/Main_ear_default.glb',
};

// 3D Models
export const Models = {
  mainEar: '/assets/Main_ear_default.glb',
}; 