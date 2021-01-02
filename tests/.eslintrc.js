module.exports = {
  extends: '../.eslintrc.js',
  env: {
    jest: true,
  },
  globals: {
    context: 'readonly',
    getMountUtils: 'readonly',
    test: 'off', // disabling in favor of 'it'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
