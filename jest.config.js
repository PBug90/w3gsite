const mongoDBPreset = require('@shelf/jest-mongodb/jest-preset')
module.exports = {
  ...mongoDBPreset,
  roots: ['<rootDir>/app'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.*.test.ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom'
}
