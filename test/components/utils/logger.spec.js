/*global sinon*/
import { logger } from '../../../src/components/utils';

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

  describe('#logTrap', () => {
    it('logs apply', () => {
      logger.logTrap('apply');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Function call');
    });

    it('logs construct', () => {
      logger.logTrap('construct');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Constructor call');
    });

    it('logs defineProperty', () => {
      logger.logTrap('defineProperty');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property definition');
    });

    it('logs deleteProperty', () => {
      logger.logTrap('deleteProperty');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property deletion');
    });

    it('logs get', () => {
      logger.logTrap('get');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property access');
    });

    it('logs getOwnPropertyDescriptor', () => {
      logger.logTrap('getOwnPropertyDescriptor');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property descriptor access');
    });

    it('logs getPrototypeOf', () => {
      logger.logTrap('getPrototypeOf');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('[[GetPrototypeOf]]');
    });

    it('logs has', () => {
      logger.logTrap('has');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property query');
    });

    it('logs isExtensible', () => {
      logger.logTrap('isExtensible');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Extensibility check');
    });

    it('logs ownKeys', () => {
      logger.logTrap('ownKeys');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Own key enumeration');
    });

    it('logs preventExtensions', () => {
      logger.logTrap('preventExtensions');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Prevent extensions');
    });

    it('logs set', () => {
      logger.logTrap('set');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('Property write');
    });

    it('logs setPrototypeOf', () => {
      logger.logTrap('setPrototypeOf');

      console.log.should.have.been.calledOnce;
      console.log.should.have.been.calledWithMatch('setPrototypeOf called');
    });
  });
});
