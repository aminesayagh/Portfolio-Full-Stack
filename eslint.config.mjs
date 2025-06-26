import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

import react from "eslint-plugin-react";
import globals from "globals";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";
import nextPlugin from "@next/eslint-plugin-next";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['eslint:recommended', 'next'],
  }),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "coverage/**",
      "build/**",
      "*.config.js",
      "*.config.mjs"
    ]
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      react,
      import: eslintPluginImport,
      "jsx-a11y": eslintPluginJsxA11y,
      sonarjs,
      security,
      promise
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    }
  }
]

export default eslintConfig