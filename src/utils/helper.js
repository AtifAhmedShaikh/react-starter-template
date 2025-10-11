import { jwtDecode } from "jwt-decode";
import { decryptValue } from "../lib/encryption";

export const verifyJwtToken = (token) => {
  try {
    if (!token) {
      return { user: null, success: false };
    }
    const decryptedToken = decryptValue(token);
    const decoded = jwtDecode(decryptedToken || "");
    return { user: decoded, success: Boolean(decoded) };
  } catch (error) {
    console.log("Hi I am from Error", error);
    return { user: null, success: false };
  }
};

// Capitalize first letter of every word in a string
export function capitalizeWords(text) {
  if (typeof text !== "string") return "";
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Get initials from a name (e.g., "John Doe" => "JD")
export function getInitialsForAvatar(name) {
  if (typeof name !== "string" || !name.trim()) return "";
  return name
    .trim()
    .split(/\s+/) // handles multiple spaces
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// Utility function to convert tailwind-like color strings to inline styles
export const parseColorStyles = (styleString = "") => {
  const style = {};
  styleString.split(" ").forEach((cls) => {
    if (cls.startsWith("bg-") || cls.startsWith("!bg-")) {
      style.backgroundColor = cls
        .match(/\[#([0-9a-fA-F]+)\]/)?.[0]
        .replace("[", "")
        .replace("]", "");
    }
    if (cls.startsWith("text-") || cls.startsWith("!text-")) {
      style.color = cls
        .match(/\[#([0-9a-fA-F]+)\]/)?.[0]
        .replace("[", "")
        .replace("]", "");
    }
    if (cls.startsWith("border-") || cls.startsWith("!border-")) {
      style.borderColor = cls
        .match(/\[#([0-9a-fA-F]+)\]/)?.[0]
        .replace("[", "")
        .replace("]", "");
    }
  });
  return style;
};

export const getStatusById = (statusId, statuses) => {
  if (!statuses || !Array.isArray(statuses) || statuses.length === 0) {
    return "";
  }
  const status = statuses.find((status) => status?.id === statusId);
  return status;
};

// not used
export const formatFileSize = (bytes) => {
  if (!bytes) return "Unknown size";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
};

export function isUrdu(text = "") {
  // Urdu Unicode range: 0600–06FF
  return /[\u0600-\u06FF]/.test(text);
}

// Extract color values from colorStyles string
export const extractColorValues = (colorStyles = "") => {
  const defaultColors = {
    bgColor: "#3b82f6",
    textColor: "#ffffff",
    borderColor: "#1d4ed8",
  };

  if (!colorStyles) return defaultColors;

  const colors = {};

  // Extract background color
  const bgMatch = colorStyles.match(/!bg-\[([^\]]+)\]/);
  if (bgMatch) {
    colors.bgColor = bgMatch[1];
  }

  // Extract text color
  const textMatch = colorStyles.match(/!text-\[([^\]]+)\]/);
  if (textMatch) {
    colors.textColor = textMatch[1];
  }

  // Extract border color
  const borderMatch = colorStyles.match(/!border-\[([^\]]+)\]/);
  if (borderMatch) {
    colors.borderColor = borderMatch[1];
  }

  return {
    bgColor: colors.bgColor || defaultColors.bgColor,
    textColor: colors.textColor || defaultColors.textColor,
    borderColor: colors.borderColor || defaultColors.borderColor,
  };
};
