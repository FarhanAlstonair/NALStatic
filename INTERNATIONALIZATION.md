# Internationalization Setup with Lingo.dev

This document explains how to use the Lingo.dev internationalization features in the NAL Project.

## Features Added

✅ **Language Switcher** - Toggle between English and Kannada
✅ **Dynamic Content Translation** - Real-time translation of user-generated content
✅ **Font Support** - Proper Kannada font rendering with Noto Sans Kannada
✅ **SDK Integration** - Ready for translating property listings, descriptions, etc.
✅ **CI/CD Automation** - Automatic translation on code pushes

## Quick Start

### 1. Add Your API Key
Update `.env` file:
```
VITE_LINGO_API_KEY=your-actual-api-key-here
```

### 2. Enable Compiler (Optional)
Uncomment the Lingo.dev compiler in `vite.config.js`:
```javascript
import lingoCompiler from 'lingo.dev/compiler'
export default defineConfig(
  lingoCompiler.vite({
    sourceLocale: 'en',
    targetLocales: ['kn'], // Kannada
  })(baseConfig)
)
```

### 3. Use Dynamic Translation
```javascript
import { useTranslation } from './hooks/useTranslation'

const MyComponent = () => {
  const propertyData = {
    title: "2BHK Apartment near MG Road",
    description: "Spacious flat with modern interiors"
  }
  
  const { translatedContent, isLoading } = useTranslation(propertyData)
  
  return (
    <div>
      <h3>{translatedContent.title}</h3>
      <p>{translatedContent.description}</p>
    </div>
  )
}
```

## Components Added

- **LanguageContext** - Manages locale state and translation functions
- **LanguageSwitcher** - UI component for language selection
- **useTranslation** - Hook for easy content translation

## Files Modified

- `vite.config.js` - Lingo.dev compiler integration
- `index.html` - Kannada font support
- `src/index.css` - Font family configuration
- `src/components/Layout.jsx` - Language switcher integration
- `src/App.jsx` - Language provider wrapper

## Usage Examples

### Static UI Translation
The compiler automatically translates all text in React components when building.

### Dynamic Content Translation
```javascript
const { translateContent } = useLanguage()

const translated = await translateContent({
  title: "Property for Sale",
  location: "Bangalore, Karnataka"
}, 'kn')
```

### Language Switching
Users can switch languages using the globe icon in the header navigation.

## CI/CD Setup

The `.github/workflows/i18n.yml` file automatically translates new content on every push. Add your API key as a GitHub secret: `LINGODOTDEV_API_KEY`

## Supported Languages

- English (en) - Default
- Kannada (kn) - Added

To add more languages, update the `targetLocales` array in the configuration.