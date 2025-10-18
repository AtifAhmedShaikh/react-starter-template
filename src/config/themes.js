// Theme configuration with multiple color schemes and light/dark modes
export const THEMES = {
  GREEN: "green",
  BLUE: "blue",
  PURPLE: "purple",
  RED: "red",
  ORANGE: "orange",
  TEAL: "teal",
  INDIGO: "indigo",
  PINK: "pink",
};

export const MODES = {
  LIGHT: "light",
  DARK: "dark",
};

// Color palette definitions for each theme
export const THEME_COLORS = {
  [THEMES.GREEN]: {
    primary: {
      light: "oklch(0.52 0.33 152)", // Green primary
      dark: "oklch(0.696 0.17 162.48)",
    },
    secondary: {
      light: "oklch(0.51 0.17 142)", // Green secondary
      dark: "oklch(0.696 0.17 162.48)",
    },
    accent: {
      light: "oklch(0.45 0.25 145)", // Darker green
      dark: "oklch(0.75 0.20 160)",
    },
  },
  [THEMES.BLUE]: {
    primary: {
      light: "oklch(0.55 0.25 250)", // Blue primary
      dark: "oklch(0.65 0.20 250)",
    },
    secondary: {
      light: "oklch(0.50 0.20 240)", // Blue secondary
      dark: "oklch(0.65 0.20 250)",
    },
    accent: {
      light: "oklch(0.40 0.30 250)", // Darker blue
      dark: "oklch(0.70 0.25 250)",
    },
  },
  [THEMES.PURPLE]: {
    primary: {
      light: "oklch(0.55 0.25 300)", // Purple primary
      dark: "oklch(0.65 0.20 300)",
    },
    secondary: {
      light: "oklch(0.50 0.20 290)", // Purple secondary
      dark: "oklch(0.65 0.20 300)",
    },
    accent: {
      light: "oklch(0.40 0.30 300)", // Darker purple
      dark: "oklch(0.70 0.25 300)",
    },
  },
  [THEMES.RED]: {
    primary: {
      light: "oklch(0.55 0.25 20)", // Red primary
      dark: "oklch(0.65 0.20 20)",
    },
    secondary: {
      light: "oklch(0.50 0.20 10)", // Red secondary
      dark: "oklch(0.65 0.20 20)",
    },
    accent: {
      light: "oklch(0.40 0.30 20)", // Darker red
      dark: "oklch(0.70 0.25 20)",
    },
  },
  [THEMES.ORANGE]: {
    primary: {
      light: "oklch(0.65 0.20 50)", // Orange primary
      dark: "oklch(0.70 0.15 50)",
    },
    secondary: {
      light: "oklch(0.60 0.15 40)", // Orange secondary
      dark: "oklch(0.70 0.15 50)",
    },
    accent: {
      light: "oklch(0.50 0.25 50)", // Darker orange
      dark: "oklch(0.75 0.20 50)",
    },
  },
  [THEMES.TEAL]: {
    primary: {
      light: "oklch(0.55 0.20 180)", // Teal primary
      dark: "oklch(0.65 0.15 180)",
    },
    secondary: {
      light: "oklch(0.50 0.15 170)", // Teal secondary
      dark: "oklch(0.65 0.15 180)",
    },
    accent: {
      light: "oklch(0.40 0.25 180)", // Darker teal
      dark: "oklch(0.70 0.20 180)",
    },
  },
  [THEMES.INDIGO]: {
    primary: {
      light: "oklch(0.50 0.20 260)", // Indigo primary
      dark: "oklch(0.60 0.15 260)",
    },
    secondary: {
      light: "oklch(0.45 0.15 250)", // Indigo secondary
      dark: "oklch(0.60 0.15 260)",
    },
    accent: {
      light: "oklch(0.35 0.25 260)", // Darker indigo
      dark: "oklch(0.65 0.20 260)",
    },
  },
  [THEMES.PINK]: {
    primary: {
      light: "oklch(0.65 0.20 330)", // Pink primary
      dark: "oklch(0.70 0.15 330)",
    },
    secondary: {
      light: "oklch(0.60 0.15 320)", // Pink secondary
      dark: "oklch(0.70 0.15 330)",
    },
    accent: {
      light: "oklch(0.50 0.25 330)", // Darker pink
      dark: "oklch(0.75 0.20 330)",
    },
  },
};

// Default theme and mode
export const DEFAULT_THEME = THEMES.GREEN;
export const DEFAULT_MODE = MODES.LIGHT;

// Theme metadata for UI display
export const THEME_METADATA = {
  [THEMES.GREEN]: { name: "Green", color: "#10b981" },
  [THEMES.BLUE]: { name: "Blue", color: "#3b82f6" },
  [THEMES.PURPLE]: { name: "Purple", color: "#8b5cf6" },
  [THEMES.RED]: { name: "Red", color: "#ef4444" },
  [THEMES.ORANGE]: { name: "Orange", color: "#f97316" },
  [THEMES.TEAL]: { name: "Teal", color: "#14b8a6" },
  [THEMES.INDIGO]: { name: "Indigo", color: "#6366f1" },
  [THEMES.PINK]: { name: "Pink", color: "#ec4899" },
};
