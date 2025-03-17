#!/usr/bin/env node

/**
 * This script helps update React imports in your component files
 * to take advantage of Vite's automatic JSX transform.
 * 
 * Usage: node update-react-imports.js
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat().filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
}

async function main() {
  try {
    const files = await getFiles('./src');
    
    console.log(`Found ${files.length} files to process`);
    
    let updatedCount = 0;
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Replace "import React from 'react';" with nothing
        const updatedContent1 = content.replace(/import\s+React\s+from\s+['"]react['"];?\s*/g, '');
        
        // Replace "import React, { ... } from 'react';" with "import { ... } from 'react';"
        const updatedContent2 = updatedContent1.replace(/import\s+React,\s+({[^}]+})\s+from\s+['"]react['"];?\s*/g, 'import $1 from \'react\';\n');
        
        if (content !== updatedContent2) {
          fs.writeFileSync(file, updatedContent2, 'utf8');
          console.log(`Updated: ${file}`);
          updatedCount++;
        }
      } catch (err) {
        console.error(`Error processing ${file}: ${err.message}`);
      }
    }
    
    console.log(`\nCompleted: Updated ${updatedCount} of ${files.length} files`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main(); 