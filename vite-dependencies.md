# Vite Migration - Dependency Changes

## Dependencies to Add
```json
{
  "dependencies": {
    // Keep all existing dependencies, but remove react-scripts
  },
  "devDependencies": {
    // Keep existing devDependencies and add:
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "@types/node": "^16.18.126", // Move from dependencies to devDependencies
    "eslint-plugin-react-refresh": "^0.4.5"
  }
}
```

## Scripts to Update
```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "test": "vitest",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build -r https://github.com/sk408/audiometry_trainer.git"
  }
}
```

## Testing Setup
If you want to maintain Jest-like testing capabilities, add:
```json
{
  "devDependencies": {
    "vitest": "^1.1.0",
    "jsdom": "^23.0.1",
    "@testing-library/react": "^16.2.0", // Keep existing version
    "@testing-library/jest-dom": "^6.6.3", // Keep existing version
    "@testing-library/user-event": "^13.5.0" // Keep existing version
  }
}
```

## Migration Steps Checklist
1. ✅ Create vite.config.js
2. ✅ Create index.html in root
3. ⬜ Update package.json with new dependencies
4. ⬜ Remove react-scripts
5. ⬜ Update environment variable usage (process.env.REACT_APP_ → import.meta.env.VITE_)
6. ⬜ Move public assets to public/ directory
7. ⬜ Test application works locally
8. ⬜ Update GitHub Actions/deployment scripts if necessary 