import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
const config = {
  overrides: [
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
        globals: globals.browser,
      },
      ...pluginJs.configs.recommended,
    },
  ],
};

export default config;
