/**
 * Sanitizes input to only allow lowercase letters and underscores
 * @param {Event} event - Input event
 */

export const sanitizeToLowerUnderscoreOnlyLetters = (e) => {
  const target = e.currentTarget;
  target.value = target.value
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/[^a-zA-Z_]/g, "") // Allow only letters and underscore
    .toLowerCase(); // Convert to lowercase
};

/**
 * Sanitizes input to only allow alphanumeric characters and spaces
 * @param {Event} event - Input event
 */
export const sanitizeAlphanumericWithSpaces = (event) => {
  const value = event.target.value;
  const sanitized = value.replace(/[^a-zA-Z0-9\s]/g, "");

  if (value !== sanitized) {
    event.target.value = sanitized;
  }
};

/**
 * Sanitizes input to only allow numbers
 * @param {Event} event - Input event
 */
export const sanitizeNumbersOnly = (event) => {
  const value = event.target.value;
  const sanitized = value.replace(/[^0-9]/g, "");

  if (value !== sanitized) {
    event.target.value = sanitized;
  }
};
