/*global sinon*/
import { logger } from '../../src/components/logger';

describe('Logger', () => {
  let sandbox;
  const stubs = ['log', 'error', 'info', 'warn'];

  before(() => {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // create some spies
    stubs.forEach(stub => sandbox.spy(console, stub));
  });

  after(() => {
    // restore environment
    sandbox.restore();
  });

  afterEach(() => {
    // reset spies
    stubs.forEach(stub => console[stub].reset());
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
