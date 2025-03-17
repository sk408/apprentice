# Audiometry Trainer: Migration from CRA to Vite

This branch contains the preparation for migrating the Audiometry Trainer application from Create React App (CRA) to Vite.

## Why Migrate to Vite?

1. **Performance Improvements**
   - Significantly faster development server startup
   - Faster hot module replacement (HMR)
   - Improved build times (especially important for 3D components)

2. **Development Experience**
   - Better error messages
   - More responsive feedback loop
   - No need to eject for configuration changes

3. **Future-Proofing**
   - CRA development has slowed significantly
   - Vite is actively maintained with regular updates
   - Better aligned with modern web standards

## Migration Files

The following files have been prepared for the migration:

- `vite.config.js` - Base configuration for Vite
- `index.html` - New entry point required by Vite
- `vite-dependencies.md` - List of dependency changes needed

## Migration Process

1. **Preparation (Completed)**
   - Set up configuration files
   - Document dependencies to change
   - Identify potential issues

2. **Implementation (Completed)**
   - Updated `package.json` with new dependencies
   - Removed CRA dependencies
   - Updated environment variable references from `process.env.PUBLIC_URL` to `import.meta.env.BASE_URL`
   - Created TypeScript declaration file for Vite environment variables
   - Updated TypeScript configuration for Vite
   - Created Vitest configuration for testing
   - Removed unnecessary React imports to use the automatic JSX transform

3. **Testing (Completed)**
   - Verified build process works
   - Confirmed development server runs correctly
   - Updated README with new build instructions

## Completed Migration Steps

1. ✅ Created vite.config.js
2. ✅ Created index.html in root
3. ✅ Updated package.json with new dependencies
4. ✅ Removed react-scripts
5. ✅ Updated environment variable usage (process.env.PUBLIC_URL → import.meta.env.BASE_URL)
6. ✅ Updated TypeScript configuration
7. ✅ Created Vitest configuration for testing
8. ✅ Updated README with migration information
9. ✅ Enabled automatic JSX transform and removed unnecessary React imports

## Modern JSX Transform

A significant advantage of Vite is its support for the automatic JSX transform introduced in React 17. This means:

- No need to import React in components that only use JSX
- Cleaner and more concise component files
- Only need to import specific React hooks and components that are used

We've updated our components to take advantage of this feature by:

1. Configuring Vite with `jsxRuntime: 'automatic'` in the React plugin
2. Removing unnecessary `import React from 'react'` statements throughout the codebase
3. Only importing specific hooks like `import { useState, useEffect } from 'react'`

## Audiometry-Specific Considerations

- The 3D ear models using Three.js will benefit most from the migration
- Chart.js and Recharts visualizations should render more efficiently
- Audiogram component's complex rendering will improve with faster HMR

## References

- [Vite Documentation](https://vitejs.dev/guide/)
- [Migrating from CRA to Vite](https://vitejs.dev/guide/migration-from-cra.html)
- [React with TypeScript in Vite](https://vitejs.dev/guide/features.html#typescript)
- [New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) 