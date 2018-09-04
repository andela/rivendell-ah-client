/* eslint max-len:off */
module.exports = {
  setupFiles: [
    '<rootDir>/tests/config/setup.js',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests',
    '<rootDir>/src/index.js',
  ],
  testURL: 'http://localhost',
  snapshotSerializers: ['enzyme-to-json/serializer'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
