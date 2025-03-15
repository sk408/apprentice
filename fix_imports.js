const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'components', 'rem', 'REMStepContent.tsx');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Replace uppercase 'Steps' with lowercase 'steps' in import statements
  const fixedContent = data.replace(/from '\.\/(S|s)teps\//g, "from './steps/");

  // Write the fixed content back to the file
  fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Fixed imports in REMStepContent.tsx');
  });
}); 