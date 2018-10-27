module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!jest/**/*',
    '!coverage/**/*',
    '!argv.js',
    '!jest.config.js',
    '!logger.js',
    '!port.js',
    '!server.js'
  ],
  globals: {
    NODE_ENV: 'TEST'
  },
  globalSetup: '<rootDir>/jest/setup.js',
  globalTeardown: '<rootDir>/jest/teardown.js',
  testEnvironment: '<rootDir>/jest/mongo-environment.js'
};
