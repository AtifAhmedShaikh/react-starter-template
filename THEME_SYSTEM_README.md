# Multi-Theme System Documentation

This document explains the multi-theme system implemented in your React application, which supports both light/dark modes and multiple color themes.

## 🎨 Features

- **8 Color Themes**: Green, Blue, Purple, Red, Orange, Teal, Indigo, Pink
- **Light/Dark Modes**: Automatic theme adaptation
- **Persistent Settings**: Theme preferences saved in localStorage
- **Theme-Aware Components**: All components adapt to selected theme
- **CSS Variables**: Dynamic color switching using CSS custom properties
- **TypeScript Support**: Full type safety for theme configurations

## 📁 File Structure

```
src/
├── config/
│   └── themes.js                 # Theme configuration and color definitions
├── contexts/
│   └── ThemeContext.jsx         # React context for theme state management
├── components/
│   └── ThemeSwitcher.jsx        # Theme switching UI component
├── utils/
│   └── themeUtils.js            # Utility functions for theme-aware styling
├── pages/
│   └── ThemeDemo/
│       └── index.jsx            # Demo page showcasing theme system
└── index.css                    # CSS variables and theme definitions
```

## 🚀 Quick Start

### 1. Using the Theme Context

```jsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, mode, changeTheme, changeMode, toggleMode, isDark } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Current mode: {mode}</p>
      <button onClick={() => changeTheme('blue')}>Switch to Blue</button>
      <button onClick={toggleMode}>Toggle Dark Mode</button>
    </div>
  );
}
```

### 2. Using Theme-Aware Classes

Instead of hardcoded colors, use semantic color classes:

```jsx
// ❌ Avoid hardcoded colors
<div className="bg-green-500 text-white border-green-600">

// ✅ Use theme-aware classes
<div className="bg-primary text-primary-foreground border-primary">
```

### 3. Using Theme Utilities

```jsx
import { getThemeColor, getStatusColor, getBackgroundColor } from '@/utils/themeUtils';

// Get theme-aware color classes
const primaryBg = getThemeColor('primary', 'bg'); // 'bg-primary'
const successText = getStatusColor('success', 'text'); // 'text-green-500'
const cardBg = getBackgroundColor('secondary'); // 'bg-card'
```

## 🎯 Available Themes

| Theme | Light Primary | Dark Primary | Description |
|-------|---------------|--------------|-------------|
| Green | `oklch(0.52 0.33 152)` | `oklch(0.696 0.17 162.48)` | Default green theme |
| Blue | `oklch(0.55 0.25 250)` | `oklch(0.65 0.20 250)` | Professional blue |
| Purple | `oklch(0.55 0.25 300)` | `oklch(0.65 0.20 300)` | Creative purple |
| Red | `oklch(0.55 0.25 20)` | `oklch(0.65 0.20 20)` | Bold red |
| Orange | `oklch(0.65 0.20 50)` | `oklch(0.70 0.15 50)` | Energetic orange |
| Teal | `oklch(0.55 0.20 180)` | `oklch(0.65 0.15 180)` | Calm teal |
| Indigo | `oklch(0.50 0.20 260)` | `oklch(0.60 0.15 260)` | Deep indigo |
| Pink | `oklch(0.65 0.20 330)` | `oklch(0.70 0.15 330)` | Vibrant pink |

## 🎨 CSS Variables

The system uses CSS custom properties that automatically update based on the selected theme:

```css
:root {
  --primary: oklch(0.52 0.33 152);           /* Theme primary color */
  --primary-foreground: oklch(0.982 0.018 155.826);
  --secondary: oklch(0.51 0.17 142);         /* Theme secondary color */
  --accent: oklch(0.45 0.25 145);            /* Theme accent color */
  --background: oklch(1 0 0);                /* Background color */
  --foreground: oklch(0.141 0.005 285.823);  /* Text color */
  --card: oklch(1 0 0);                      /* Card background */
  --border: oklch(0.92 0.004 286.32);        /* Border color */
  --muted: oklch(0.967 0.001 286.375);       /* Muted background */
  --muted-foreground: oklch(0.552 0.016 285.938);
  --destructive: oklch(0.577 0.245 27.325);  /* Error color */
}
```

## 🔧 Theme Switcher Component

The `ThemeSwitcher` component provides a dropdown interface for changing themes and modes:

```jsx
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Basic usage
<ThemeSwitcher />

// With custom styling
<ThemeSwitcher 
  variant="outline" 
  size="lg" 
  className="w-full" 
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `"outline"` | Button variant |
| `size` | `string` | `"sm"` | Button size |
| `className` | `string` | `""` | Additional CSS classes |

## 🛠️ Migration Guide

### Replacing Hardcoded Colors

1. **Background Colors**:
   ```jsx
   // Before
   <div className="bg-green-500 bg-white bg-gray-100">
   
   // After
   <div className="bg-primary bg-background bg-muted">
   ```

2. **Text Colors**:
   ```jsx
   // Before
   <p className="text-gray-700 text-green-600 text-white">
   
   // After
   <p className="text-foreground text-primary text-primary-foreground">
   ```

3. **Border Colors**:
   ```jsx
   // Before
   <div className="border-gray-300 border-green-500">
   
   // After
   <div className="border-border border-primary">
   ```

4. **Status Colors**:
   ```jsx
   // Before
   <div className="bg-red-100 text-red-800 border-red-200">
   
   // After
   <div className="bg-destructive/10 text-destructive border-destructive/20">
   ```

### Component Updates

Update your components to use theme-aware classes:

```jsx
// Before
function Button({ variant = "primary" }) {
  return (
    <button className={`
      ${variant === "primary" ? "bg-green-500 text-white" : ""}
      ${variant === "secondary" ? "bg-gray-200 text-gray-800" : ""}
    `}>
      Click me
    </button>
  );
}

// After
function Button({ variant = "primary" }) {
  return (
    <button className={`
      ${variant === "primary" ? "bg-primary text-primary-foreground" : ""}
      ${variant === "secondary" ? "bg-secondary text-secondary-foreground" : ""}
    `}>
      Click me
    </button>
  );
}
```

## 🎯 Best Practices

1. **Use Semantic Classes**: Always prefer semantic color classes over hardcoded ones
2. **Test Both Modes**: Ensure your components look good in both light and dark modes
3. **Use Opacity Modifiers**: Leverage Tailwind's opacity modifiers for subtle effects
4. **Consistent Spacing**: Use the same color classes throughout your application
5. **Accessibility**: Ensure sufficient contrast ratios in all themes

## 🧪 Testing

Visit `/theme-demo` to test the theme system:

- Switch between different color themes
- Toggle between light and dark modes
- See real-time CSS variable updates
- Test component rendering in different themes

## 🔄 Adding New Themes

To add a new theme:

1. **Update `src/config/themes.js`**:
   ```javascript
   export const THEMES = {
     // ... existing themes
     CYAN: 'cyan',
   };
   
   export const THEME_COLORS = {
     // ... existing colors
     [THEMES.CYAN]: {
       primary: {
         light: 'oklch(0.55 0.20 200)',
         dark: 'oklch(0.65 0.15 200)'
       },
       // ... other color variants
     }
   };
   ```

2. **Update theme metadata**:
   ```javascript
   export const THEME_METADATA = {
     // ... existing metadata
     [THEMES.CYAN]: { name: 'Cyan', color: '#06b6d4' },
   };
   ```

## 🐛 Troubleshooting

### Theme Not Updating
- Check if `ThemeProvider` wraps your app
- Verify CSS variables are being set correctly
- Clear localStorage and try again

### Colors Not Applying
- Ensure you're using theme-aware classes
- Check if hardcoded colors are overriding theme colors
- Verify CSS specificity

### Dark Mode Issues
- Check if `.dark` class is being applied to `html` or `body`
- Verify dark mode CSS variables are defined
- Test with browser dev tools

## 📚 Additional Resources

- [Tailwind CSS Custom Properties](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [OKLCH Color Space](https://oklch.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

**Note**: This theme system is designed to work seamlessly with your existing Tailwind CSS setup and provides a solid foundation for maintaining consistent theming across your application.
