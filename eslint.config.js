import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // 👇 FIXED: allow unused uppercase, _underscore, and "motion"
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]|motion" }],
      "react-refresh/only-export-components": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    // ✅ Node.js config files (like vite.config.js, eslint.config.js, etc.)
    files: ["vite.config.*", "**/*.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: "module",
    },
    rules: {
      "react-hooks/rules-of-hooks": "off", // ✅ FIXED
      "no-unused-vars": ["error", { varsIgnorePattern: "motion" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
