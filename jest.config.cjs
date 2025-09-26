/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@docusaurus/Link$': '<rootDir>/test/__mocks__/DocusaurusLinkMock.tsx',
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  testRegex: '.*\\.(test|spec)\\.(ts|tsx|js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }]
  },
};


