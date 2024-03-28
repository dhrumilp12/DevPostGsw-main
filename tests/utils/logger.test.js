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
  
  const logger = require('../../src/utils/logger');
  
  describe('logger', () => {
    it('creates a logger without throwing an error', () => {
      expect(logger).toBeDefined();
      logger.info('Test info log');
      // Additional tests to ensure the logger's methods can be called without error
    });
  });
  