/*global sinon*/
import { FunctionTrapHandler } from '../../../src/components/handlers';

describe('FunctionTrapHandler', () => {
  let handler;
  let mockEmitter;

  before(() => {
    mockEmitter = {
      emit: sinon.spy()
    };

    handler = new FunctionTrapHandler(mockEmitter);
  });

  afterEach(() => {
    mockEmitter.emit.reset();
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

      mockEmitter.emit.should.have.callCount(6);
      mockEmitter.emit.should.have.been.calledWith('trap', 'get');
      mockEmitter.emit.should.have.been.calledWith('trap', 'apply');
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

      mockEmitter.emit.should.have.been.calledOnce;
      mockEmitter.emit.should.have.been.calledWith('trap', 'construct');
      person.name.should.equal('Phil');
    });
  });
});
