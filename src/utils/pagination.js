/**
 * Safely parses page number from URL search params
 * Handles extremely large numbers, invalid numbers, and edge cases
 * @param {string} pageStr - Page string from URL params
 * @returns {number} - Safe page number (defaults to 1 for invalid values)
 */
export const parsePageSafely = (pageStr) => {
  const parsed = parseInt(pageStr);

  // Check if the parsed number is valid and within safe limits
  if (
    !Number.isFinite(parsed) ||
    parsed > Number.MAX_SAFE_INTEGER ||
    parsed < 1
  ) {
    return 1; // Default to page 1 for invalid numbers
  }

  return parsed;
};

/**
 * Safely calculates skip value for database queries
 * Prevents Prisma 64-bit integer overflow errors
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @returns {number} - Safe skip value
 */
export const calculateSafeSkip = (page, limit = 10) => {
  const safePage = parsePageSafely(page);
  const skip = (safePage - 1) * limit;

  // Additional safety check for skip value
  if (!Number.isFinite(skip) || skip > Number.MAX_SAFE_INTEGER || skip < 0) {
    return 0; // Default to skip 0 for invalid calculations
  }

  return skip;
};
