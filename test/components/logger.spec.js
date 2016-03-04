/*global describe, it*/
import logger from '../../src/components/logger';

describe('Logger', () => {
  it('should log', () => {
    logger.log('hey');
  });

  it('should log error', () => {
    logger.logError('hey');
  });

  it('should log info', () => {
    logger.logInfo('hey');
  });

  it('should log warning', () => {
    logger.logWarn('hey');
  });
});
