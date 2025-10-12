import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Simple Reusable Image Component
 * 
 * Features:
 * - Lazy loading support
 * - Error handling with fallback to /profile.jpg
 * - Custom styling with className prop
 * - Accessibility features
 * - Performance optimizations
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.fallbackSrc - Fallback image when main image fails to load (default: /profile.jpg)
 * @param {boolean} props.lazy - Enable lazy loading (default: true)
 * @param {Function} props.onLoad - Callback when image loads successfully
 * @param {Function} props.onError - Callback when image fails to load
 * @param {Object} props.imgProps - Additional props to pass to img element
 * @param {string} props.objectFit - CSS object-fit property (cover, contain, fill, etc.)
 * @param {string} props.objectPosition - CSS object-position property
 */
const Image = forwardRef(({
  src,
  alt = "",
  className = "",
  fallbackSrc = "/profile.jpg",
  lazy = true,
  onLoad,
  onError,
  imgProps = {},
  objectFit = "cover",
  objectPosition = "center",
  ...rest
}, ref) => {


  // Handle error
  const handleError = (e) => {
    e.currentTarget.src = fallbackSrc;
    onError?.(e);
  };

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn("transition-all duration-300", className)}
      style={{
        objectFit,
        objectPosition,
      }}
      loading={lazy ? "lazy" : "eager"}
      onLoad={onLoad}
      onError={handleError}
      {...imgProps}
      {...rest}
    />
  );
});

Image.displayName = "Image";

export default Image;
