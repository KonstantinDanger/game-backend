import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      semi: 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'none' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
