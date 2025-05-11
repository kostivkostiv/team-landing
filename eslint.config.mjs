import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

// Імпортуємо плагін Prettier для ESLint
import pluginPrettier from "eslint-plugin-prettier";
// Імпортуємо конфігурацію, яка вимикає конфліктуючі правила ESLint
import configPrettier from "eslint-config-prettier";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js,
      // Додаємо плагін Prettier
      prettier: pluginPrettier,
      react: pluginReact, // Переносимо плагін React сюди для кращої організації
    },
    extends: [
      js.configs.recommended, // Базові рекомендовані правила JS
      ...tseslint.configs.recommended, // Рекомендовані правила TypeScript
      ...pluginReact.configs.flat.recommended, // Рекомендовані правила React
      // Додаємо рекомендовані правила плагіна Prettier.
      // Це додає правило, яке запускає Prettier як правило ESLint.
      pluginPrettier.configs.recommended,
      // Додаємо конфігурацію, яка вимикає всі правила ESLint, що конфліктують з Prettier.
      // Ця конфігурація повинна йти ОСТАННЬОЮ в масиві extends.
      configPrettier,
    ],
    languageOptions: {
      globals: globals.browser, // Глобальні змінні для браузерного середовища
      // Налаштування парсера для TypeScript та JSX
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true // Дозволяє парсинг JSX
        },
        ecmaVersion: "latest", // Використовуємо останню версію ECMAScript
        sourceType: "module" // Використовуємо модулі ES6
      },
    },
    settings: {
      react: {
        version: "detect", // Автоматично визначати версію React
      },
    },
    rules: {
        // Тут ви можете додати або перевизначити будь-які конкретні правила ESLint
        // Наприклад:
        // "no-unused-vars": "warn",
        // "react/react-in-jsx-scope": "off", // Вимикаємо, якщо використовуєте React 17+ з новим JSX transform
    }
  },
  // Можливо, вам знадобляться окремі налаштування для файлів поза src, наприклад, для конфігураційних файлів
  // {
  //   files: ["eslint.config.mjs", "prettier.config.js"],
  //   languageOptions: {
  //     globals: globals.node, // Глобальні змінні для Node.js середовища
  //   },
  //   rules: {
  //     "no-console": "off", // Дозволити console.log в конфігураційних файлах
  //   }
  // }
]);
