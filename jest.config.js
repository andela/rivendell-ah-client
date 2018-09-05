module.exports = {
  setupFiles: [
    '<rootDir>/tests/config/setup.js',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests',
    '<rootDir>/src/index.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
