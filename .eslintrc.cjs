module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint-config-js-stack/react'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
