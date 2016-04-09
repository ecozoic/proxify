/*global sinon*/
import { normalizeConfig } from '../../../src/components/utils/configNormalizer';

var objTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];
var arrTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];
var fnTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf', 'apply', 'construct'];
var defaultLogLevel = 1;


describe('configNormalizer', function configNormalizationModule() {
  it('should return default values for empty config object', function configNormalizationTest1() {
    var set = {};
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({a:1}), objTraps);
    var retConf = {
      a: {
        traps: {
          deleteProperty: defaultLogLevel,
          get: defaultLogLevel,
          getOwnPropertyDescriptor: defaultLogLevel,
          set: defaultLogLevel
        }
      },
      objectTraps: {
        defineProperty: defaultLogLevel,
        getPrototypeOf: defaultLogLevel,
        has: defaultLogLevel,
        isExtensible: defaultLogLevel,
        ownKeys: defaultLogLevel,
        preventExtensions: defaultLogLevel,
        setPrototypeOf: defaultLogLevel
      },
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      logLevel: defaultLogLevel
    };

    conf.should.exist;
    conf.a.should.exist;
    conf.a.traps.should.exist;
    conf.a.traps.should.have.property('deleteProperty', defaultLogLevel);
    conf.a.traps.should.have.property('get',defaultLogLevel);
    conf.a.traps.should.have.property('getOwnPropertyDescriptor', defaultLogLevel);
    conf.a.traps.should.have.property('set', defaultLogLevel);
    conf.objectTraps.should.exist;
    conf.objectTraps.should.have.property('defineProperty', defaultLogLevel);
    conf.objectTraps.should.have.property('getPrototypeOf', defaultLogLevel);
    conf.objectTraps.should.have.property('has', defaultLogLevel);
    conf.objectTraps.should.have.property('isExtensible', defaultLogLevel);
    conf.objectTraps.should.have.property('ownKeys', defaultLogLevel);
    conf.objectTraps.should.have.property('preventExtensions', defaultLogLevel);
    conf.objectTraps.should.have.property('setPrototypeOf', defaultLogLevel);
    conf.should.have.property('delegatable', false);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('name', undefined);
    conf.should.have.property('logLevel', defaultLogLevel);
  });

  it('normalizes the config object', function configNormalizationTest2() {
    var settings = {
      keys: ['test1', 'test2'],
      traps: ['get'],
      logLevel: 1
    };
    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), objTraps);

    var retConf = {
      test1: {
        traps: {
          get: 1
        }
      },
      test2: {
        traps: {
          get: 1
        }
      },
      objectTraps: {},
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      logLevel: defaultLogLevel
    };

    conf.should.exist;
    conf.test1.should.exist;
    conf.test1.traps.should.exists;
    conf.test1.traps.should.have.property('get', 1);
    conf.test2.should.exist;
    conf.test2.traps.should.exist;
    conf.test2.traps.should.have.property('get', 1);
    conf.objectTraps.should.exist;
    conf.should.have.property('delegatable', false);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('name', undefined);
    conf.should.have.property('logLevel', defaultLogLevel);
  });

  it('should create default settings due to disallowed delegation', function configNormalizationTest3() {
    var set = {
        keys: ['test1', 'test2'],
        traps: ['get', 'set'],
        logLevel: 2
      },
      delSet = Object.create(set);
    var conf = normalizeConfig(delSet, Object.getOwnPropertyNames({a: 1}), objTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      a: {
        traps: {
          deleteProperty: defaultLogLevel,
          get: defaultLogLevel,
          getOwnPropertyDescriptor: defaultLogLevel,
          set: defaultLogLevel
        }
      },
      objectTraps: {
        defineProperty: defaultLogLevel,
        getPrototypeOf: defaultLogLevel,
        has: defaultLogLevel,
        isExtensible: defaultLogLevel,
        ownKeys: defaultLogLevel,
        preventExtensions: defaultLogLevel,
        setPrototypeOf: defaultLogLevel
      },
      logLevel: defaultLogLevel
    };
    conf.should.exist;
    conf.should.have.property('delegatable', false);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('name', undefined);
    conf.should.have.property('logLevel', defaultLogLevel);
    conf.a.should.exist;
    conf.a.traps.should.exist;
    conf.a.traps.should.have.property('deleteProperty', defaultLogLevel);
    conf.a.traps.should.have.property('get', defaultLogLevel);
    conf.a.traps.should.have.property('getOwnPropertyDescriptor', defaultLogLevel);
    conf.a.traps.should.have.property('set', defaultLogLevel);
    conf.objectTraps.should.exist;
    conf.objectTraps.should.have.property('defineProperty', defaultLogLevel);
    conf.objectTraps.should.have.property('getPrototypeOf', defaultLogLevel);
    conf.objectTraps.should.have.property('has', defaultLogLevel);
    conf.objectTraps.should.have.property('isExtensible', defaultLogLevel);
    conf.objectTraps.should.have.property('ownKeys', defaultLogLevel);
    conf.objectTraps.should.have.property('setPrototypeOf', defaultLogLevel);
  });

  it('should proxify an array with defaults on empty config object', function configNormalizationTest4() {
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), arrTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      a: {
        traps: {
          deleteProperty: defaultLogLevel,
          get: defaultLogLevel,
          getOwnPropertyDescriptor: defaultLogLevel,
          set: defaultLogLevel
        }
      },
      objectTraps: {
        defineProperty: defaultLogLevel,
        getPrototypeOf: defaultLogLevel,
        has: defaultLogLevel,
        isExtensible: defaultLogLevel,
        ownKeys: defaultLogLevel,
        preventExtensions: defaultLogLevel,
        setPrototypeOf: defaultLogLevel
      },
      logLevel: defaultLogLevel
    };
    expect(conf).to.deep.equal(retConf);
    expect(conf.objectTraps).to.deep.equal(retConf.objectTraps);
    expect(conf.a).to.deep.equal(retConf.a);
    expect(conf.a.traps).to.deep.equal(retConf.a.traps);
  });

  it('should normalize config with default values for a function', function configNormalizationTest5() {
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), fnTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      a: {
        traps: {
          deleteProperty: defaultLogLevel,
          get: defaultLogLevel,
          getOwnPropertyDescriptor: defaultLogLevel,
          set: defaultLogLevel
        }
      },
      objectTraps: {
        defineProperty: defaultLogLevel,
        getPrototypeOf: defaultLogLevel,
        has: defaultLogLevel,
        isExtensible: defaultLogLevel,
        ownKeys: defaultLogLevel,
        preventExtensions: defaultLogLevel,
        setPrototypeOf: defaultLogLevel,
        apply: defaultLogLevel,
        construct: defaultLogLevel
      },
      logLevel: defaultLogLevel
    };
    expect(conf).to.deep.equal(retConf);
    expect(conf.objectTraps).to.deep.equal(retConf.objectTraps);
    expect(conf.a).to.deep.equal(retConf.a);
    expect(conf.a.traps).to.deep.equal(retConf.a.traps);
  });

  it('should return a fully normalized config object', function configNormalizationTest6() {
    var settings = {
      delegatable: false,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      keys: ['key1', 'key2', 'key3'],
      traps: ['get', 'set', 'preventExtensions', 'getPrototypeOf'],
      logLevel: 3,
      key1: {
        logLevel: 2,
        traps: ['deleteProperty', 'getOwnPropertyDescriptor']
      },
      key3: {
        traps: {
          get: 4,
          set: 2
        }
      }
    };

    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), fnTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      key1: {
        traps: {
          get: 3,
          set: 3,
          deleteProperty: 2,
          getOwnPropertyDescriptor: 2
        }
      },
      key2: {
        traps: {
          get: 3,
          set: 3
        }
      },
      key3: {
        traps: {
          get: 4,
          set: 2
        }
      },
      objectTraps: {
        preventExtensions: 3,
        getPrototypeOf: 3
      },
      logLevel: 3
    };
    expect(conf).to.deep.equal(retConf);
    expect(conf.objectTraps).to.deep.equal(retConf.objectTraps);
    expect(conf.key1).to.deep.equal(retConf.key1);
    expect(conf.key1.traps).to.deep.equal(retConf.key1.traps);
    expect(conf.key2).to.deep.equal(retConf.key2);
    expect(conf.key3.traps).to.deep.equal(retConf.key3.traps);
    expect(conf.key3).to.deep.equal(retConf.key3);
    expect(conf.key3.traps).to.deep.equal(retConf.key3.traps);
  });

  it('should inherit but not overwrite config values', function configNormalizationTest7() {
    var settings = {
      delegatable: true,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      keys: ['key1', 'key2'],
      traps: ['get', 'set', 'deleteProperty'],
      logLevel: 1,
      key1: {
        logLevel: 2,
        traps: ['get', 'set', 'getOwnPropertyDescriptor']
      },
      key2: {
        traps: {
          get: 4,
          set: 2,
          getOwnPropertyDescriptor: 3
        }
      },
      logLevel: defaultLogLevel
    };

    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), fnTraps);

    var retConf = {
      delegatable: true,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      key1: {
        traps: {
          get: 2,
          set: 2,
          getOwnPropertyDescriptor: 2,
          deleteProperty: 1
        }
      },
      key2: {
        traps: {
          get: 4,
          set: 2,
          getOwnPropertyDescriptor: 3,
          deleteProperty: 1
        }
      },
      objectTraps: {},
      logLevel: defaultLogLevel
    };
    expect(conf).to.deep.equal(retConf);
    expect(conf.objectTraps).to.deep.equal(retConf.objectTraps);
    expect(conf.key1).to.deep.equal(retConf.key1);
    expect(conf.key1.traps).to.deep.equal(retConf.key1.traps);
    expect(conf.key2).to.deep.equal(retConf.key2);
    expect(conf.key2.traps).to.deep.equal(retConf.key2.traps);
  });

  it('should throw when logLevel is NaN', function configNormalizationTest8() {
    var set = {logLevel: '3'};
    var thrown = 0;
    var conf;
    try {
      conf = normalizeConfig(set, Object.getOwnPropertyNames({}), objTraps);
    }
    catch(e) {
      thrown++;
    }
    expect(thrown).to.equal(1);
    expect(conf).to.equal(undefined);
  });

  it('should throw when config props are non-configurable', function configNormalizationTest9() {
    var set = {};
    Object.defineProperties(
      set, {
        'delegatable': {
          value: true,
          writable: false,
          configurable: false,
          enumerable: true
        }
      }
    );
    var thrown = 0;
    var conf;
    try {
      conf = normalizeConfig(set, Object.getOwnPropertyNames({}), objTraps);
    }
    catch(e) {
      thrown++;
    }

    expect(thrown).to.equal(1);
    expect(conf).to.equal(undefined);
  });

  it('should not add non-available traps to config', function configNormalizationTest10() {
    var set = {
      keys: ['key1'],
      traps: ['get', 'set', 'test']
    };
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({}), objTraps);

    var retConf = {
      key1: {
        traps: {
          get: defaultLogLevel,
          set: defaultLogLevel
        }
      },
      objectTraps: {},
      name: undefined,
      delegatable: false,
      trapNewProperties: true,
      logLevel: defaultLogLevel
    };
    expect(conf).to.deep.equal(retConf);
    expect(conf.objectTraps).to.deep.equal(retConf.objectTraps);
    expect(conf.key1).to.deep.equal(retConf.key1);
    expect(conf.key1.traps).to.deep.equal(retConf.key1.traps);
  });
});
