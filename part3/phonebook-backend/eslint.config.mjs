import globals from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);


