const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'src', 'components', 'rem', 'steps', 'MeasurementStep.tsx');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Add REMLevel to the imports
  let fixedContent = data;
  
  // First check if REMLevel is already imported
  if (!fixedContent.includes('REMLevel') && fixedContent.includes('ProbePosition, VentType')) {
    fixedContent = fixedContent.replace(
      'import { ProbePosition, VentType } from',
      'import { ProbePosition, VentType, REMLevel } from'
    );
  }

  // Fix the handleInputLevelChange function
  const oldHandleInputLevelChange = /const handleInputLevelChange = \(event: Event, newValue: number \| number\[\]\) => \{\s+setInputLevel\(newValue as number\);\s+\};/;
  const newHandleInputLevelChange = `const handleInputLevelChange = (event: Event, newValue: number | number[]) => {
    // Cast to the closest valid REMLevel value
    const numValue = Array.isArray(newValue) ? newValue[0] : newValue;
    const validLevels: REMLevel[] = [50, 55, 60, 65, 70, 75, 80, 85, 90];
    
    // Find the closest valid level
    const closestLevel = validLevels.reduce((prev, curr) => 
      Math.abs(curr - numValue) < Math.abs(prev - numValue) ? curr : prev
    );
    
    setInputLevel(closestLevel);
  };`;

  fixedContent = fixedContent.replace(oldHandleInputLevelChange, newHandleInputLevelChange);

  // Write the fixed content back to the file
  fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Fixed MeasurementStep.tsx');
  });
}); 