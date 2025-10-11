import { ENCRYPTION_SECRET } from "@/config/configManager";
import { SALT_ROUNDS, SENSITIVE_FIELDS } from "@/constants";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

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

export const generateHashedValue = async (value) => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

/**
 * Encrypt and hash selected fields of an object
 * @param {Object} data - object to process
 * @returns {Promise<Object>} new object with encrypted fields
 */
export const encryptSensitiveFields = (data) => {
  const result = { ...data };

  SENSITIVE_FIELDS.forEach((field) => {
    if (result[field]) {
      result[field] = encryptValue(String(result[field]));
    }
  });
  return result;
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
