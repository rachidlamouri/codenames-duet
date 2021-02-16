module.exports = {
  extends: '../../.eslintrc.js',
  globals: {
    browser: 'readonly',
    expect: 'readonly',
  },
  rules: {
    'func-names': 'off',
    'prefer-arrow-callback': 'off',
    'max-classes-per-file': 'off',
  },
};
