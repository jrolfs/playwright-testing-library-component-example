module.exports = {
  extends: [
    require.resolve('@hover/javascript/eslint/react'),
    require.resolve('@hover/javascript/eslint/strict'),
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json'],
  },
  rules: {
    'jest/no-standalone-expect': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': ['error', { allow: ['__testingLibraryReviver'] }],
  },
  overrides: [
    {
      files: ['playwright/**/*'],

      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
