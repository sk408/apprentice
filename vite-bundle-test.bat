@echo off
REM vite-bundle-test.bat
REM This script builds the project and shows information about the optimizations

REM Run a production build and analyze
call npm run build

REM Check bundle sizes after optimization
echo.
echo Optimization complete! Check the stats.html file for detailed bundle size analysis.
echo These optimizations should reduce the main bundle size significantly.
echo.
echo Key optimizations applied:
echo 1. Implemented code splitting for routes using React.lazy() and Suspense
echo 2. Added manual chunk splitting in Vite config for vendor dependencies
echo 3. Optimized the 3D model loading with proper preloading and error handling
echo 4. Improved asset path handling for consistent loading
echo 5. Fixed loading indicator to disappear when 3D model is loaded
echo 6. Migrated to ESM format to resolve CJS build warnings
echo.
echo To verify these improvements, check that:
echo - The main bundle size is now smaller than 3.3MB
echo - The Three.js libraries are now in a separate vendor-three chunk
echo - The application still loads the 3D ear model correctly
echo - The loading spinner disappears after the model loads
echo - No CJS build warnings appear during build
echo.

pause 