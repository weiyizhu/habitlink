module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': 0,
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0,
    'curly': 0,
    'comma-dangle': 0
  },
};
