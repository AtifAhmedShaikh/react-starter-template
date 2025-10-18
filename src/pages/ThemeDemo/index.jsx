import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { THEMES, THEME_METADATA } from '@/config/themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { 
  Palette, 
  Sun, 
  Moon, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle,
  Star,
  Heart,
  Zap
} from 'lucide-react';

const ThemeDemo = () => {
  const { theme, mode, isDark, isLight } = useTheme();

  const demoComponents = [
    {
      title: 'Buttons',
      component: (
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      )
    },
    {
      title: 'Status Badges',
      component: (
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
          <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
        </div>
      )
    },
    {
      title: 'Theme-Aware Status Badges',
      component: (
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20">Primary</Badge>
          <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">Secondary</Badge>
          <Badge className="bg-accent/10 text-accent-foreground border-accent/20">Accent</Badge>
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">Destructive</Badge>
        </div>
      )
    },
    {
      title: 'Icons with Theme Colors',
      component: (
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Success</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span>Error</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            <span>Info</span>
          </div>
        </div>
      )
    },
    {
      title: 'Theme-Aware Icons',
      component: (
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            <span>Accent</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-destructive" />
            <span>Destructive</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Theme Demo</h1>
            <ThemeSwitcher />
          </div>
          <p className="text-muted-foreground">
            Current theme: <span className="font-semibold text-primary">{THEME_METADATA[theme]?.name}</span> | 
            Mode: <span className="font-semibold text-primary">{mode}</span>
          </p>
        </div>

        {/* Theme Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme Information
            </CardTitle>
            <CardDescription>
              Current theme configuration and mode settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Current Theme</h4>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{ backgroundColor: THEME_METADATA[theme]?.color }}
                  />
                  <span>{THEME_METADATA[theme]?.name}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Current Mode</h4>
                <div className="flex items-center gap-2">
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="capitalize">{mode}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Themes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Themes</CardTitle>
            <CardDescription>
              Click on any theme to switch to it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(THEME_METADATA).map(([themeKey, metadata]) => (
                <div
                  key={themeKey}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    theme === themeKey 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: metadata.color }}
                    />
                    <span className="font-medium">{metadata.name}</span>
                  </div>
                  {theme === themeKey && (
                    <div className="text-xs text-primary font-medium">Active</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Examples */}
        <div className="space-y-8">
          {demoComponents.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>
                  Examples of {section.title.toLowerCase()} with theme-aware styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                {section.component}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CSS Variables Display */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>CSS Variables</CardTitle>
            <CardDescription>
              Current CSS custom properties being used
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
{`:root {
  --primary: ${getComputedStyle(document.documentElement).getPropertyValue('--primary')};
  --primary-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground')};
  --background: ${getComputedStyle(document.documentElement).getPropertyValue('--background')};
  --foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--foreground')};
  --card: ${getComputedStyle(document.documentElement).getPropertyValue('--card')};
  --card-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--card-foreground')};
  --border: ${getComputedStyle(document.documentElement).getPropertyValue('--border')};
  --muted: ${getComputedStyle(document.documentElement).getPropertyValue('--muted')};
  --muted-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground')};
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeDemo;
