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

1. **Preparation (Current Branch)**
   - Set up configuration files
   - Document dependencies to change
   - Identify potential issues

2. **Implementation**
   - Update `package.json` with new dependencies
   - Remove CRA dependencies
   - Update any environment variable references
   - Adjust import paths if necessary

3. **Testing**
   - Verify all components render properly
   - Ensure all functionality works as expected
   - Test build process and deployment

## Audiometry-Specific Considerations

- The 3D ear models using Three.js will likely benefit most from the migration
- Chart.js and Recharts visualizations should render more efficiently
- Audiogram component's complex rendering will improve with faster HMR

## References

- [Vite Documentation](https://vitejs.dev/guide/)
- [Migrating from CRA to Vite](https://vitejs.dev/guide/migration-from-cra.html)
- [React with TypeScript in Vite](https://vitejs.dev/guide/features.html#typescript) 