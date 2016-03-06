/*global sinon*/
describe('ObjectTrapHandler', () => {
  let handler;
  let mockLogger;

  before(() => {
    let objInjector =
      require('inject!../../../src/components/handlers/ObjectTrapHandler');
    let baseInjector =
      require('inject!../../../src/components/handlers/BaseTrapHandler');

    mockLogger = {
      log: sinon.spy()
    };

    const BaseTrapHandler = baseInjector({
      '../utils/logger': {
        logger: mockLogger
      }
    }).BaseTrapHandler;

    const ObjectTrapHandler = objInjector({
      './BaseTrapHandler': {
        BaseTrapHandler
      }
    }).ObjectTrapHandler;

    handler = new ObjectTrapHandler();
  });

  afterEach(() => {
    mockLogger.log.reset();
  });

  describe('#defineProperty', () => {
    // TODO
  });

  describe('#deleteProperty', () => {
    // TODO
  });

  describe('#get', () => {
    let target;
    let proxy;

    beforeEach(() => {
      target = {
        hello: 'world'
      };

      proxy = new Proxy(target, handler);
    });

    it('handles property access', () => {
      let values = [];
      values[0] = proxy.hello;                  // dot notation
      values[1] = proxy['hello'];               // bracket notation
      values[2] = Reflect.get(proxy, 'hello');  // reflect API

      mockLogger.log.should.have.callCount(values.length);
      values.forEach(value => value.should.equal(target.hello));
    });

    it.skip('handles inherited property access', () => {
      // TODO
    });

    it.skip('handles getters', () => {
      // TODO
    });
  });

  describe('#getOwnPropertyDescriptor', () => {
    // TODO
  });

  describe('#getPrototypeOf', () => {
    // TODO
  });

  describe('#has', () => {
    // TODO
  });

  describe('#isExtensible', () => {
    // TODO
  });

  describe('#ownKeys', () => {
    // TODO
  });

  describe('#preventExtensions', () => {
    // TODO
  });

  describe('#set', () => {
    // TODO
  });

  describe('#setPrototypeOf', () => {
    // TODO
  });
});
