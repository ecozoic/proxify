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
    it('handles property access', () => {
      const target = {
        hello: 'world'
      };
      const proxy = new Proxy(target, handler);

      let values = [];
      values[0] = proxy.hello;                  // dot notation
      values[1] = proxy['hello'];               // bracket notation
      values[2] = Reflect.get(proxy, 'hello');  // reflect API

      mockLogger.log.should.have.callCount(values.length);
      values.forEach(value => value.should.equal(target.hello));
    });

    it('handles inherited property access', () => {
      const Person = function(name) {
        this.name = name;
      };

      const Ninja = function(name) {
        Person.call(this, name);
      };

      Ninja.prototype = Object.create(Person.prototype);
      Ninja.prototype.constructor = Ninja;

      const target = new Ninja('Bob');
      const proxy = new Proxy(target, handler);

      const name = proxy.name;

      mockLogger.log.should.have.been.calledOnce;
      name.should.equal(target.name);
    });

    it('handles getters', () => {
      const target = {
        get hello() {
          return 'world';
        }
      };
      const proxy = new Proxy(target, handler);

      const value = proxy.hello;

      mockLogger.log.should.have.been.calledOnce;
      value.should.equal(target.hello);
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
