/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-prettier',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsConfigRootDir: __dirname,
  },
  rules: {
    'import/no-unresolved': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [''],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 80,
        trailingComma: 'es5',
      },
    ],
    'tailwindcss/no-custom-classname': [
      'off',
      {
        callees: ['fa-'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
    },
  ],
};
