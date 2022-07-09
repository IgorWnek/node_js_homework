/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // tells Jest where are our test files
  roots: ['<rootDir>/test'],

  // tells Jest to use only TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};