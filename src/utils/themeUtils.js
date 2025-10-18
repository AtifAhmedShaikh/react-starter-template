// Utility functions for theme-aware styling

/**
 * Get theme-aware color classes based on current theme
 * @param {string} colorType - Type of color (primary, secondary, accent, etc.)
 * @param {string} variant - Variant of the color (bg, text, border, etc.)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getThemeColor = (
  colorType = "primary",
  variant = "bg",
  opacity = "",
) => {
  const opacityClass = opacity ? `/${opacity}` : "";
  return `${variant}-${colorType}${opacityClass}`;
};

/**
 * Get status color classes that adapt to theme
 * @param {string} status - Status type (success, warning, error, info)
 * @param {string} variant - Variant of the color (bg, text, border, etc.)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getStatusColor = (status, variant = "bg", opacity = "") => {
  const statusMap = {
    success: "green",
    warning: "yellow",
    error: "red",
    info: "blue",
    destructive: "red",
  };

  const color = statusMap[status] || "gray";
  const opacityClass = opacity ? `/${opacity}` : "";
  return `${variant}-${color}${opacityClass}`;
};

/**
 * Get theme-aware background classes
 * @param {string} level - Background level (primary, secondary, muted, accent)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getBackgroundColor = (level = "primary", opacity = "") => {
  const opacityClass = opacity ? `/${opacity}` : "";

  switch (level) {
    case "primary":
      return `bg-background${opacityClass}`;
    case "secondary":
      return `bg-card${opacityClass}`;
    case "muted":
      return `bg-muted${opacityClass}`;
    case "accent":
      return `bg-accent${opacityClass}`;
    default:
      return `bg-background${opacityClass}`;
  }
};

/**
 * Get theme-aware text color classes
 * @param {string} level - Text level (primary, secondary, muted, accent)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getTextColor = (level = "primary", opacity = "") => {
  const opacityClass = opacity ? `/${opacity}` : "";

  switch (level) {
    case "primary":
      return `text-foreground${opacityClass}`;
    case "secondary":
      return `text-muted-foreground${opacityClass}`;
    case "muted":
      return `text-muted-foreground${opacityClass}`;
    case "accent":
      return `text-accent-foreground${opacityClass}`;
    default:
      return `text-foreground${opacityClass}`;
  }
};

/**
 * Get theme-aware border color classes
 * @param {string} level - Border level (primary, secondary, muted, accent)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getBorderColor = (level = "primary", opacity = "") => {
  const opacityClass = opacity ? `/${opacity}` : "";

  switch (level) {
    case "primary":
      return `border-border${opacityClass}`;
    case "secondary":
      return `border-border${opacityClass}`;
    case "muted":
      return `border-muted${opacityClass}`;
    case "accent":
      return `border-accent${opacityClass}`;
    default:
      return `border-border${opacityClass}`;
  }
};

/**
 * Create a gradient class with theme colors
 * @param {string} direction - Gradient direction (to-r, to-b, to-br, etc.)
 * @param {string} fromColor - Starting color
 * @param {string} toColor - Ending color
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getGradientClass = (
  direction = "to-r",
  fromColor = "primary",
  toColor = "primary",
  opacity = "",
) => {
  const opacityClass = opacity ? `/${opacity}` : "";
  return `bg-gradient-${direction} from-${fromColor}${opacityClass} to-${toColor}${opacityClass}`;
};

/**
 * Get hover state classes with theme colors
 * @param {string} colorType - Type of color (primary, secondary, accent, etc.)
 * @param {string} variant - Variant of the color (bg, text, border, etc.)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getHoverColor = (
  colorType = "primary",
  variant = "bg",
  opacity = "",
) => {
  const opacityClass = opacity ? `/${opacity}` : "";
  return `hover:${variant}-${colorType}${opacityClass}`;
};

/**
 * Get focus state classes with theme colors
 * @param {string} colorType - Type of color (primary, secondary, accent, etc.)
 * @param {string} variant - Variant of the color (bg, text, border, etc.)
 * @param {string} opacity - Opacity level (optional)
 * @returns {string} - Tailwind CSS class string
 */
export const getFocusColor = (
  colorType = "primary",
  variant = "bg",
  opacity = "",
) => {
  const opacityClass = opacity ? `/${opacity}` : "";
  return `focus:${variant}-${colorType}${opacityClass}`;
};
