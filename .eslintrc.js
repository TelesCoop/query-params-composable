module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
