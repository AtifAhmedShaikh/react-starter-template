import Image from "./image";

/**
 * Logo Image Component - Specialized for logos
 */
export const LogoImage = ({ 
  src = "logo.png", 
  alt = "Logo", 
  size = "md",
  className = "",
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  return (
    <Image
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${className}`}
      objectFit="contain"
      fallbackSrc="logo.png"
      {...props}
    />
  );
};

/**
 * Profile Image Component - Specialized for profile pictures
 */
export const ProfileImage = ({ 
  src, 
  alt = "Profile", 
  size = "md",
  className = "",
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    "2xl": "w-32 h-32"
  };

  return (
    <Image
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full ${className}`}
      objectFit="cover"
      fallbackSrc="/profile.jpg"
      {...props}
    />
  );
};

/**
 * Thumbnail Image Component - For small previews
 */
export const ThumbnailImage = ({ 
  src, 
  alt = "Thumbnail", 
  className = "",
  ...props 
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={`w-20 h-20 aspect-square ${className}`}
      objectFit="cover"
      fallbackSrc="/profile.jpg"
      {...props}
    />
  );
};

/**
 * Card Image Component - For card layouts
 */
export const CardImage = ({ 
  src, 
  alt = "Card Image", 
  className = "",
  ...props 
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={`w-full h-48 ${className}`}
      objectFit="cover"
      fallbackSrc="/profile.jpg"
      {...props}
    />
  );
};

export default Image;
