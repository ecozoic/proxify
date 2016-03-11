/*global sinon, should*/
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
    it('handles property deletion', () => {
      const target = {
        hello: 'world',
        foo: 'bar',
        count: 0
      };
      const proxy = new Proxy(target, handler);

      delete proxy.hello;                       // dot notation
      delete proxy['foo'];                      // bracket notation
      Reflect.deleteProperty(proxy, 'count');   // reflect api

      mockLogger.log.should.have.been.calledThrice;
      should.equal(proxy.hello, target.hello);
      should.equal(proxy.foo, target.foo);
      should.equal(proxy.count, target.count);
    });

    it('handles inherited property deletion', () => {
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

      delete proxy.name;

      mockLogger.log.should.have.been.calledOnce;
      should.equal(proxy.name, target.name);
    });
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
    let Person;
    let Ninja;
    let target;
    let proxy;

    before(() => {
      Person = function(name) {
        this.name = name;
      };

      Ninja = function(name) {
        Person.call(this, name);
      };

      Ninja.prototype = Object.create(Person.prototype);
      Ninja.prototype.constructor = Ninja;

      target = new Ninja('Bob');
      proxy = new Proxy(target, handler);
    });

    it('handles getPrototypeOf calls', () => {
      const objProto = Object.getPrototypeOf(proxy);
      const reflectProto = Reflect.getPrototypeOf(proxy);

      mockLogger.log.should.have.been.calledTwice;
      objProto.should.equal(Object.getPrototypeOf(target));
      reflectProto.should.equal(Object.getPrototypeOf(target));
    });

    it('handles __proto__ access', () => {
      const proto = proxy.__proto__;

      // __proto__ access triggers two traps in this order:
      // get (access __proto__ property) -> getPrototypeOf
      mockLogger.log.should.have.been.calledTwice;
      proto.should.equal(target.__proto__);
    });

    it('handles isPrototypeOf calls', () => {
      const isProto = Ninja.prototype.isPrototypeOf(proxy);

      mockLogger.log.should.have.been.calledOnce;
      isProto.should.equal(Ninja.prototype.isPrototypeOf(target));
    });

    it('handles instanceof checks', () => {
      const isInstance = proxy instanceof Person;

      mockLogger.log.should.have.been.calledOnce;
      isInstance.should.equal(target instanceof Person);
    });
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
    it('handles property assignment', () => {
      const target = {
        hello: 'world',
        foo: 'bar',
        count: 0
      };
      const proxy = new Proxy(target, handler);

      proxy.hello = 'friend';           // dot notation
      proxy['foo'] = 'baz';             // bracket notation
      Reflect.set(proxy, 'count', 1);   // reflect api

      // property assignment actually triggers 3 trap handlers for every write
      // handlers are triggered in the following order:
      // set -> getOwnPropertyDescriptor -> defineProperty
      mockLogger.log.should.have.callCount(3 * 3);
      target.hello.should.equal(proxy.hello);
      target.foo.should.equal(proxy.foo);
      target.count.should.equal(proxy.count);
    });

    it('handles inherited property assignment', () => {
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

      proxy.name = 'Jim';

      mockLogger.log.should.have.been.calledThrice;
      target.name.should.equal(proxy.name);
    });

    it('handles setters', () => {
      const target = {
        _prop: 'world',
        get hello() {
          return this._prop;
        },
        set hello(msg) {
          this._prop = msg;
        }
      };
      const proxy = new Proxy(target, handler);

      proxy.hello = 'friend';

      // setters actually trigger a total of four traps for every write
      // traps are triggered in the following order:
      // set (on setter) -> set (on underlying property) -> getOwnPropertyDescriptor -> defineProperty
      mockLogger.log.should.have.callCount(4);
      target.hello.should.equal(proxy.hello);
    });
  });

  describe('#setPrototypeOf', () => {
    it('handles setPrototypeOf calls', () => {
      const Person = function(name) {
        this.name = name;
      };

      const Ninja = function(weapon) {
        this.weapon = weapon;
      };

      const proto = new Person('Bob');
      const target = new Ninja('nunchucks');
      const objProxy = new Proxy(target, handler);
      const reflectProxy = new Proxy(target, handler);

      Object.setPrototypeOf(objProxy, proto);
      Reflect.setPrototypeOf(reflectProxy, proto);

      mockLogger.log.should.have.been.calledTwice;
      objProxy.__proto__.should.equal(target.__proto__);
      reflectProxy.__proto__.should.equal(target.__proto__);
    });
  });
});
