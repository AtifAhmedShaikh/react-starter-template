import CryptoJS from "crypto-js";
const ENCRYPTION_SECRET = import.meta.env.VITE_ENCRYPTION_SECRET || "";

// Ideally store this in .env and NEVER hardcode secrets for production

/**
 * Encrypt a string using AES
 * @param {string} value - plain text to encrypt
 * @returns {string} encrypted string
 */
export const encryptValue = (value = "") => {
  return CryptoJS.AES.encrypt(value, ENCRYPTION_SECRET).toString();
};

/**
 * Decrypt an encrypted string using AES
 * @param {string} encryptedValue - AES encrypted string
 * @returns {string} decrypted plain text
 */
export const decryptValue = (encryptedValue) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Encrypt selected fields of an object
 * @param {Object} data - object to process
 * @param {string[]} fieldsToEncrypt - list of fields to encrypt
 * @returns {Object} new object with encrypted fields
 */
export const encryptSensitiveFields = (data, fieldsToEncrypt) => {
  const encryptedData = { ...data };

  fieldsToEncrypt.forEach((field) => {
    if (encryptedData[field]) {
      encryptedData[field] = encryptValue(String(encryptedData[field]));
    }
  });

  return encryptedData;
};

/**
 * Decrypt selected fields of an object
 * @param {Object} data - object to process
 * @param {string[]} fieldsToDecrypt - list of fields to decrypt
 * @returns {Object} new object with decrypted fields
 */
export const decryptSensitiveFields = (data, fieldsToDecrypt) => {
  const decryptedData = { ...data };

  fieldsToDecrypt.forEach((field) => {
    if (decryptedData[field]) {
      decryptedData[field] = decryptValue(String(decryptedData[field]));
    }
  });

  return decryptedData;
};
