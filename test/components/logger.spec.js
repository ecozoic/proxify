/*global sinon*/
import logger from '../../src/components/logger';

describe('Logger', () => {
  let sandbox;

  beforeEach(() => {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // create some spies
    sandbox.spy(console, 'log');
    sandbox.spy(console, 'error');
    sandbox.spy(console, 'info');
    sandbox.spy(console, 'warn');
  });

  afterEach(() => {
    // restore environment
    sandbox.restore();
  });

  describe('#log', () => {
    it('should log', () => {
      const msg = 'hey';
      logger.log(msg);

      console.log.should.have.been.calledWith(msg);
    });
  });

  describe('#logError', () => {
    it('should log error', () => {
      const msg = 'hey';
      logger.logError(msg);

      console.error.should.have.been.calledWith(msg);
    });
  });

  describe('#logInfo', () => {
    it('should log info', () => {
      const msg = 'hey';
      logger.logInfo(msg);

      console.info.should.have.been.calledWith(msg);
    });
  });

  describe('#logWarn', () => {
    it('should log warning', () => {
      const msg = 'hey';
      logger.logWarn(msg);

      console.warn.should.have.been.calledWith(msg);
    });
  });
});
