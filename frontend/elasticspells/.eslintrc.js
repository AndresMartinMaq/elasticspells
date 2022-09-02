module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    //"@vue/prettier", TODO figure out how to add this
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "max-len": [2, 150, 4, { ignoreStrings: true, ignoreUrls: true }],
    "import/no-unresolved": [0, { caseSensitive: false }],
    //'prettier/prettier': ['error', { singleQuote: true }],
    //quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    //semi: ["error", "never"],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
