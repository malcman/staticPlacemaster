module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/prop-types": "off",
    "no-param-reassign": ["error", { "props": false }],
    "react/forbid-prop-types": "off",
    "import/no-useless-path-segments": "warn",
  },
};
