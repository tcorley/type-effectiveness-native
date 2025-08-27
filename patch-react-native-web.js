#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Patching react-native-web for Node.js 22 compatibility...');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// Function to check if a directory with index.js exists
function directoryWithIndexExists(dirPath) {
  try {
    const indexPath = path.join(dirPath, 'index.js');
    return fs.statSync(dirPath).isDirectory() && fileExists(indexPath);
  } catch {
    return false;
  }
}

// Function to find all .js files in react-native-web that need patching
function findJSFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findJSFiles(fullPath, files);
    } else if (entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to patch a single file
function patchFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    const fileDir = path.dirname(filePath);
    
    // Pattern 1: import ... from './relativePath'; (where relativePath doesn't end with .js)
    content = content.replace(
      /import\s+([^'"]*)\s+from\s+['"](\.[^'"]*[^/])['"];/g,
      (match, imports, importPath) => {
        // Skip if already has .js extension
        if (importPath.endsWith('.js')) {
          return match;
        }
        
        const resolvedPath = path.resolve(fileDir, importPath);
        
        // Check if it's a directory with index.js - these should use directory import with explicit /index.js
        if (directoryWithIndexExists(resolvedPath)) {
          hasChanges = true;
          return `import ${imports} from '${importPath}/index.js';`;
        }
        
        // Check if it's a file that exists with .js extension
        if (fileExists(resolvedPath + '.js')) {
          hasChanges = true;
          return `import ${imports} from '${importPath}.js';`;
        }
        
        // If neither exists, leave it unchanged
        return match;
      }
    );
    
    // Pattern 2: export ... from './relativePath'; (where relativePath doesn't end with .js)
    content = content.replace(
      /export\s+([^'"]*)\s+from\s+['"](\.[^'"]*[^/])['"];/g,
      (match, exports, importPath) => {
        // Skip if already has .js extension
        if (importPath.endsWith('.js')) {
          return match;
        }
        
        const resolvedPath = path.resolve(fileDir, importPath);
        
        // Check if it's a directory with index.js
        if (directoryWithIndexExists(resolvedPath)) {
          hasChanges = true;
          return `export ${exports} from '${importPath}/index.js';`;
        }
        
        // Check if it's a file that exists with .js extension
        if (fileExists(resolvedPath + '.js')) {
          hasChanges = true;
          return `export ${exports} from '${importPath}.js';`;
        }
        
        // If neither exists, leave it unchanged
        return match;
      }
    );
    
    // Pattern 3: External package imports that need .js extensions (specific known cases)
    const externalImports = [
      { 
        from: "from 'inline-style-prefixer/lib/createPrefixer';", 
        to: "from 'inline-style-prefixer/lib/createPrefixer.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/staticData';", 
        to: "from 'inline-style-prefixer/lib/staticData.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/generator';", 
        to: "from 'inline-style-prefixer/lib/generator.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/backgroundClip';", 
        to: "from 'inline-style-prefixer/lib/plugins/backgroundClip.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/crossFade';", 
        to: "from 'inline-style-prefixer/lib/plugins/crossFade.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/cursor';", 
        to: "from 'inline-style-prefixer/lib/plugins/cursor.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/filter';", 
        to: "from 'inline-style-prefixer/lib/plugins/filter.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/imageSet';", 
        to: "from 'inline-style-prefixer/lib/plugins/imageSet.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/logical';", 
        to: "from 'inline-style-prefixer/lib/plugins/logical.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/position';", 
        to: "from 'inline-style-prefixer/lib/plugins/position.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/sizing';", 
        to: "from 'inline-style-prefixer/lib/plugins/sizing.js';" 
      },
      { 
        from: "from 'inline-style-prefixer/lib/plugins/transition';", 
        to: "from 'inline-style-prefixer/lib/plugins/transition.js';" 
      },
      { 
        from: "from 'styleq/transform-localize-style';", 
        to: "from 'styleq/transform-localize-style.js';" 
      },
      { 
        from: "from 'styleq';", 
        to: "from 'styleq/styleq.js';" 
      }
    ];
    
    for (const extImport of externalImports) {
      if (content.includes(extImport.from)) {
        content = content.replace(new RegExp(extImport.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), extImport.to);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Failed to patch ${filePath}:`, error.message);
    return false;
  }
}

// Main patching logic
const reactNativeWebPath = path.join(__dirname, 'node_modules/react-native-web/dist');

if (!fs.existsSync(reactNativeWebPath)) {
  console.log('⚠️  react-native-web not found, skipping patch');
  process.exit(0);
}

// First, undo any previous patches by reinstalling if marker exists
const markerPath = path.join(__dirname, 'node_modules/.react-native-web-patched');
if (fs.existsSync(markerPath)) {
  console.log('🔄 Previous patch detected, reinstalling react-native-web...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install react-native-web --force', { stdio: 'inherit' });
    fs.unlinkSync(markerPath);
  } catch (error) {
    console.error('Failed to reinstall react-native-web:', error.message);
  }
}

const jsFiles = findJSFiles(reactNativeWebPath);
let patchedCount = 0;

for (const filePath of jsFiles) {
  if (patchFile(filePath)) {
    patchedCount++;
    const relativePath = path.relative(__dirname, filePath);
    console.log(`✅ Patched ${relativePath}`);
  }
}

console.log(`✅ Successfully patched ${patchedCount} files for Node.js 22 compatibility`);

// Add a marker file to indicate patching is complete
fs.writeFileSync(markerPath, `Patched ${patchedCount} files on ${new Date().toISOString()}`);

console.log('🎉 react-native-web is now compatible with Node.js 22!');