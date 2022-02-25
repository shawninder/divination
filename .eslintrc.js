module.exports = {
  'env': {
    'browser': true,
    'es2022': true,
    'node': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/all'
  ],
  'parserOptions': {
    'sourceType': 'module'
  },
  globals: {
    React: 'writable'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
