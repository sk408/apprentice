# Constants Directory

This directory contains constants and configuration values used throughout the application.

## MediaAssets.ts

The `MediaAssets.ts` file serves as a central repository for all images, external links, and URL references used throughout the application. This makes it easier to:

1. **Maintain consistency** across the application
2. **Update links in one place** rather than searching through multiple files
3. **Track all external dependencies** in a single file

### Usage

Import the specific asset object you need in your component:

```tsx
import { OtoscopyImages, OrganizationLinks } from '../constants/MediaAssets';

// Use the assets
const imageUrl = OtoscopyImages.technique;
const ashaLink = OrganizationLinks.asha;
```

### Adding New Assets

When adding new images or links to the application, first add them to the appropriate section in `MediaAssets.ts` rather than hardcoding them in your components.

### Structure

The file is organized into logical sections:
- Logo Images
- Public Assets
- Equipment Images
- Otoscopy Images
- Documents and Resources
- Hearing Aid Brand Resources
- Platform Support Links
- QR Code Generation
- External Organization Links
- Project Links
- Other Assets
- 3D Models

### Note for package.json

Some references in files like `package.json` cannot directly import from TypeScript files. When updating links in `MediaAssets.ts` that are also used in these files, you'll need to manually synchronize the values. 