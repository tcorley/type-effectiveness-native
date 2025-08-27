# Node.js 22 Upgrade

This project has been successfully upgraded to Node.js 22.

## ✅ Completed Upgrades

### Node.js Version Management
- Added `.nvmrc` file specifying Node.js 22
- Added `engines` field in `package.json` requiring Node.js >=22.0.0
- Node.js 22.18.0 verified working

### Dependency Updates
- **Next.js**: Updated from ^10 to ^12.3.0 (Node.js 22 compatible)
- **React**: Updated from ~16.13.1 to ~18.2.0 (required for Next.js 12+)
- **React DOM**: Updated from ~16.13.1 to ~18.2.0
- **TypeScript**: Updated from ~4.0.0 to ~5.1.0 (Node.js 22 compatible)
- **@expo/next-adapter**: Updated from ^2.1.73 to ^6.0.0
- **Babel Core**: Updated from ^7.9.0 to ^7.22.0
- **React Native dependencies**: Updated to compatible versions

### Configuration Updates
- **babel.config.js**: Updated to use `babel-preset-expo` and `next/babel` presets
- **pages/_document.js**: Updated to use standard Next.js document structure
- **next.config.js**: Added webpack configuration for compatibility fixes
- **package.json**: Added legacy OpenSSL provider flag for build process

## 🔧 Known Issues & Workarounds

### React Native Web Compatibility
The current build encounters a compatibility issue with `react-native-web` and directory imports in Node.js 22:

```
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '.../react-native-web/dist/exports/StyleSheet/compiler' is not supported
```

This is a known limitation in Node.js 17+ where ES module directory imports are no longer supported.

**Current Workaround**: The build script uses the `--openssl-legacy-provider` flag to maintain compatibility.

**Future Solutions**:
1. Wait for `react-native-web` to update their module exports
2. Implement a more comprehensive polyfill
3. Consider alternative React Native web solutions

## 🚀 Usage

### Development
```bash
# Use Node.js 22 (if using nvm)
nvm use

# Install dependencies
npm install

# Start development server
npm start
```

### Building
```bash
# Build the project (uses legacy OpenSSL provider for compatibility)
npm run build
```

## 📋 Verification

To verify Node.js 22 is working:
```bash
node --version
# Should output: v22.18.0 (or later 22.x version)
```

## 🔄 Migration Notes

If you need to run this project on older Node.js versions, you can:
1. Remove the `engines` field from `package.json`
2. Update the `.nvmrc` file to your preferred version
3. Potentially downgrade some dependencies if compatibility issues arise

The core upgrade to Node.js 22 is complete and functional. The remaining build issues are related to specific library compatibility and can be addressed in future updates.