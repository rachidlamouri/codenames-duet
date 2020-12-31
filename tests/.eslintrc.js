module.exports = {
  extends: '../.eslintrc.js',
  env: {
    jest: true,
  },
  globals: {
    getMountUtils: 'readonly',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
