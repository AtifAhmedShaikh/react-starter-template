import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { THEMES, MODES, THEME_METADATA } from '@/config/themes';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Palette, 
  Sun, 
  Moon, 
  Check,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeSwitcher = ({ className, variant = "outline", size = "sm" }) => {
  const { theme, mode, changeTheme, changeMode, toggleMode, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setIsOpen(false);
  };

  const handleModeChange = (newMode) => {
    changeMode(newMode);
    setIsOpen(false);
  };

  const getModeIcon = () => {
    switch (mode) {
      case MODES.LIGHT:
        return <Sun className="h-4 w-4" />;
      case MODES.DARK:
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={cn("gap-2", className)}
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {Object.entries(THEME_METADATA).map(([themeKey, metadata]) => (
          <DropdownMenuItem
            key={themeKey}
            onClick={() => handleThemeChange(themeKey)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: metadata.color }}
              />
              <span>{metadata.name}</span>
            </div>
            {theme === themeKey && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleModeChange(MODES.LIGHT)}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </div>
            {mode === MODES.LIGHT && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleModeChange(MODES.DARK)}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </div>
            {mode === MODES.DARK && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleMode}>
          <div className="flex items-center gap-2">
            {getModeIcon()}
            <span>Toggle Mode</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
