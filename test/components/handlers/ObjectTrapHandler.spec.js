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
    it('handles property definition', () => {
      const target = {};
      const proxy = new Proxy(target, handler);

      Object.defineProperty(proxy, 'hello', {
        configurable: false,
        enumerable: true,
        value: 'world',
        writable: true
      });

      Reflect.defineProperty(proxy, 'foo', {
        configurable: false,
        enumerable: true,
        value: 'bar',
        writable: true
      });

      mockLogger.log.should.have.been.calledTwice;
      proxy.hello.should.equal(target.hello);
      target.hello.should.equal('world');
      proxy.foo.should.equal(target.foo);
      target.foo.should.equal('bar');
    });
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

      should.equal(target.hello, undefined);
      should.equal(target.foo, undefined);
      should.equal(target.count, undefined);
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
      should.equal(target.name, undefined);
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
      values.forEach(value => {
        value.should.equal(target.hello);
        value.should.equal('world');
      });
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
      target.name.should.equal('Bob');
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
      target.hello.should.equal('world');
    });
  });

  describe('#getOwnPropertyDescriptor', () => {
    it('handles property description queries', () => {
      const target = {};

      Object.defineProperty(target, 'hello', {
        configurable: false,
        enumerable: true,
        value: 'world',
        writable: true
      });

      Reflect.defineProperty(target, 'foo', {
        configurable: false,
        enumerable: true,
        value: 'bar',
        writable: true
      });

      const proxy = new Proxy(target, handler);

      const objProp = Object.getOwnPropertyDescriptor(proxy, 'hello');
      const reflectProp = Reflect.getOwnPropertyDescriptor(proxy, 'foo');

      mockLogger.log.should.have.been.calledTwice;
      objProp.value.should.equal(Object.getOwnPropertyDescriptor(target, 'hello').value);
      reflectProp.value.should.equal(Reflect.getOwnPropertyDescriptor(target, 'foo').value);
    });
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
    it('handles property query', () => {
      const target = {
        hello: 'world'
      };

      const proxy = new Proxy(target, handler);

      const has = 'hello' in proxy;
      mockLogger.log.should.have.been.calledOnce;
      has.should.equal('hello' in target);
      has.should.be.true;
    });

    it('handles inherited property query', () => {
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

      const has = 'name' in proxy;
      mockLogger.log.should.have.been.calledOnce;
      has.should.equal('name' in target);
      has.should.be.true;
    });

    it('handles reflect has', () => {
      const target = {
        hello: 'world'
      };

      const proxy = new Proxy(target, handler);

      const has = Reflect.has(proxy, 'hello');

      mockLogger.log.should.have.been.calledOnce;
      has.should.equal(Reflect.has(target, 'hello'));
      has.should.be.true;
    });
  });

  describe('#isExtensible', () => {
    it('handles extensibility checks', () => {
      const target = {};
      const proxy = new Proxy(target, handler);

      const objExt = Object.isExtensible(proxy);
      const refExt = Reflect.isExtensible(proxy);

      mockLogger.log.should.have.been.calledTwice;
      objExt.should.equal(Object.isExtensible(target));
      refExt.should.equal(Reflect.isExtensible(target));
    });
  });

  describe('#ownKeys', () => {
    let target;
    let symbol;
    let proxy;

    before(() => {
      target = {};
      symbol = Symbol('test');

      Object.defineProperty(target, 'hello', {
        configurable: false,
        enumerable: true,
        value: 'world',
        writable: true
      });

      Object.defineProperty(target, 'foo', {
        configurable: false,
        enumerable: false,
        value: 'bar',
        writable: true
      });

      target[symbol] = 'simba';
      proxy = new Proxy(target, handler);
    });

    it('handles own string properties', () => {
      // both enumerable and non-enumerable but no symbols
      const propNames = Object.getOwnPropertyNames(proxy);

      mockLogger.log.should.have.been.calledOnce;
      propNames.should.have.length(2);
      propNames.includes('hello').should.be.true;
      propNames.includes('foo').should.be.true;
      propNames.includes(symbol).should.be.false;
    });

    it('handles own symbol properties', () => {
      // symbol props only
      const symbolProps = Object.getOwnPropertySymbols(proxy);

      mockLogger.log.should.have.been.calledOnce;
      symbolProps.should.have.length(1);
      symbolProps.includes(symbol).should.be.true;
    });

    it('handles enumerable properties', () => {
      // enumerable only (same as for-in)
      // this triggers (n+1) traps where n is the number of string properties
      // in this case: ownKeys -> property descriptor for 'hello' -> property descriptor for 'foo'
      const propNames = Object.keys(proxy);

      mockLogger.log.should.have.been.calledThrice;
      propNames.should.have.length(1);
      propNames.includes('hello').should.be.true;
    });

    it('handles own keys', () => {
      const ownKeys = Reflect.ownKeys(proxy);

      mockLogger.log.should.have.been.calledOnce;
      ownKeys.should.have.length(3);
      ownKeys.includes('hello').should.be.true;
      ownKeys.includes('foo').should.be.true;
      ownKeys.includes(symbol).should.be.true;
    });
  });

  describe('#preventExtensions', () => {
    it('handles prevent extension calls', () => {
      const target1 = {};
      const proxy1 = new Proxy(target1, handler);

      const target2 = {};
      const proxy2 = new Proxy(target2, handler);

      Object.preventExtensions(proxy1);
      Reflect.preventExtensions(proxy2);

      mockLogger.log.should.have.been.calledTwice;

      Object.isExtensible(proxy1).should.be.false;
      Object.isExtensible(target1).should.be.false;
      Reflect.isExtensible(proxy2).should.be.false;
      Reflect.isExtensible(target2).should.be.false;
    });
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
      target.hello.should.equal('friend');
      target.foo.should.equal(proxy.foo);
      target.foo.should.equal('baz');
      target.count.should.equal(proxy.count);
      target.count.should.equal(1);
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
      target.name.should.equal('Jim');
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
      target.hello.should.equal('friend');
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
