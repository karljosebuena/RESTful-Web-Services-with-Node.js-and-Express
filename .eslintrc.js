module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    "node": true,
    "mocha": true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'indent': 0,
    'no-unused-vars': 1
  },
};
