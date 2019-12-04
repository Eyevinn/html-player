require("dotenv-vars");
/* eslint-disable */
module.exports = {
  testMatch: ["**/tests/**/*.js?(x)"],
  coverageDirectory: "./coverage",
  coverageReporters: [
    "lcov"
  ],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    // Non-library folders/files
    "!**/node_modules/**",
    "!**/coverage/**",
    "!jest.config.js"
  ],
  globals: { "__VERSION__": "1.0.0" }
};
