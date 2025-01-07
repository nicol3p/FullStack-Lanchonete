import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true // Ativa suporte a JSX
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ não exige 'import React' para JSX
      "react/jsx-uses-react": "off", // Evita erro com JSX sem import React
      "react/jsx-uses-vars": "error", // Garante que as variáveis JSX sejam usadas corretamente
      "no-unused-vars": ["warn"], // Suaviza erros de variáveis não utilizadas
    }
  }
];
