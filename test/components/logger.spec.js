/*global describe, it*/
import { Logger } from '../../src/components/logger';

describe('Logger', () => {
  it('should log', () => {
    const logger = new Logger();
    logger.log('hey');
  });

  it('should log error', () => {
    const logger = new Logger();
    logger.logError('hey');
  });

  it('should log info', () => {
    const logger = new Logger();
    logger.logInfo('hey');
  });

  it('should log warning', () => {
    const logger = new Logger();
    logger.logWarn('hey');
  });
});
