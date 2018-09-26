module.exports = {
  collectCoverageFrom: [
    '**/*.js',
    '!**/.*.js',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/node_modules/**',
    '!**/stories/**',
    '!**/storybook-static/**',
    '!.*.js',
    '!*.config.js',
    '!config/**',
  ],
  reporters: ['default'],
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.js',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
};
