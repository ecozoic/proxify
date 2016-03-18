/*global sinon*/
describe('FunctionTrapHandler', () => {
  let handler;
  let mockLogger;

  before(() => {
    let fnInjector =
      require('inject!../../../src/components/handlers/FunctionTrapHandler');
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

    const FunctionTrapHandler = fnInjector({
      './BaseTrapHandler': {
        BaseTrapHandler
      },
      '../utils/logger': {
        logger: mockLogger
      }
    }).FunctionTrapHandler;

    handler = new FunctionTrapHandler();
  });

  afterEach(() => {
    mockLogger.log.reset();
  });

  describe('#apply', () => {
    it('handles function calls', () => {
      const target = () => true;
      const proxy = new Proxy(target, handler);

      // apply and call also trigger the get trap handler
      const results = [];
      results[0] = proxy();
      results[1] = proxy.apply(this);
      results[2] = proxy.call(this);
      results[3] = Reflect.apply(proxy, this, []);

      mockLogger.log.should.have.callCount(6);
      results.forEach(result => result.should.be.true);
    });
  });

  describe('#construct', () => {
    it('handles the new operator', () => {
      const Person = function(name) {
        this.name = name;
      };

      const ProxyPerson = new Proxy(Person, handler);
      const person = new ProxyPerson('Phil');

      mockLogger.log.should.have.been.calledOnce;
      person.name.should.equal('Phil');
    });
  });
});
