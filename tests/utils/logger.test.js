// Mocking winston library
jest.mock('winston', () => {
  const mockFormat = jest.fn().mockReturnValue('mocked format');
  return {
    format: {
      combine: mockFormat,
      timestamp: mockFormat,
      printf: mockFormat
    },
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    }),
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

const logger = require('../../src/utils/logger'); // Update the relative path as necessary

describe('Logger utility', () => {
  // Before each test, reset all mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log info without error', () => {
    expect(() => logger.info('Info message')).not.toThrow();
  });

  it('should log error without error', () => {
    expect(() => logger.error('Error message')).not.toThrow();
  });

  it('should log warn without error', () => {
    expect(() => logger.warn('Warning message')).not.toThrow();
  });

  it('should log debug without error', () => {
    expect(() => logger.debug('Debug message')).not.toThrow();
  });

  // Add additional tests if you want to check if the logger was called with the correct parameters
});
