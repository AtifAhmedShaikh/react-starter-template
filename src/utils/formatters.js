export const formatCNICInput = (value) => {
  if (!value) return "";

  let input = value.replace(/[^0-9]/g, "");
  if (input.length > 13) input = input.slice(0, 13);

  let formatted = input;
  if (input.length > 5) formatted = input.slice(0, 5) + "-" + input.slice(5);
  if (input.length > 12)
    formatted = formatted.slice(0, 13) + "-" + formatted.slice(13);

  return formatted;
};

export const formatPhoneNumberInput = (value) => {
  let input = value.replace(/[^0-9]/g, "").slice(0, 11);
  if (input.length > 4) return input.slice(0, 4) + "-" + input.slice(4);
  return input;
};

// Format character-only input (removes numbers and special characters except spaces and hyphens)
export const formatCharacterOnlyInput = (value) => {
  if (!value) return "";
  // Allow only letters, spaces, hyphens, and apostrophes
  return value.replace(/[^a-zA-Z\s\-']/g, "");
};

// Email validation function
export const isValidEmail = (email) => {
  if (!email) return true; // Allow empty emails for optional fields
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Format email input (basic formatting, keeps valid email characters)
export const formatEmailInput = (value) => {
  if (!value) return "";
  // Allow letters, numbers, and common email characters
  return value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
};

export const formatCnic = (cnic = "") => {
  const digits = cnic.replace(/[^0-9]/g, "");
  return digits.length === 13
    ? `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`
    : digits;
};

export const deformatCnic = (cnic = "") => cnic.replace(/[^0-9]/g, "");

// Format role names (e.g., "deputy_director" => "Deputy Director")
export function formatRoleName(role) {
  if (typeof role !== "string" || !role.trim()) return "";
  return role
    .trim()
    .split(/[_\s]+/) // supports underscores or extra spaces
    .map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "",
    )
    .join(" ");
}

export function formatRelativeTime(date) {
  const now = new Date();
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) return "Invalid date";

  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );

  const isFuture = diffInSeconds < 0;
  const absDiff = Math.abs(diffInSeconds);

  if (absDiff < 60) {
    return isFuture
      ? `in ${absDiff} sec${absDiff !== 1 ? "s" : ""}`
      : `${absDiff} sec${absDiff !== 1 ? "s" : ""} ago`;
  }

  const diffInMinutes = Math.floor(absDiff / 60);
  if (diffInMinutes < 60) {
    return isFuture
      ? `in ${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""}`
      : `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return isFuture
      ? `in ${diffInHours} hour${diffInHours !== 1 ? "s" : ""}`
      : `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return isFuture
      ? `in ${diffInDays} day${diffInDays !== 1 ? "s" : ""}`
      : `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 5) {
    return isFuture
      ? `in ${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""}`
      : `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return isFuture
      ? `in ${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}`
      : `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return isFuture
    ? `in ${diffInYears} year${diffInYears !== 1 ? "s" : ""}`
    : `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

export const formatDate = (dateString) => {
  if (!dateString || !dateString.length || typeof dateString !== "string")
    return "";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format Mobile Number: 923001234567 → 0300-1234567
export const formatMobileNumber = (number = "") => {
  let digits = number.replace(/[^0-9]/g, "");

  // Replace leading "92" with "0"
  if (digits.startsWith("92") && digits.length === 12) {
    digits = "0" + digits.slice(2); // e.g. 923001234567 → 03001234567
  }

  return digits.length === 11
    ? `${digits.slice(0, 4)}-${digits.slice(4)}`
    : digits;
};

// Deformat Mobile Number: 0300-1234567 or 923001234567 → 03001234567
export const deformatMobileNumber = (number = "") => {
  let digits = number.replace(/[^0-9]/g, "");
  if (digits.startsWith("92") && digits.length === 12) {
    digits = "0" + digits.slice(2);
  }
  return digits;
};
