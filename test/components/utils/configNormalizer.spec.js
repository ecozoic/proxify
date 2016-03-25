/*global expect*/
import { normalizeConfig } from '../../../src/components/utils/configNormalizer';

var objTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];
var arrTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];
var fnTraps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf', 'apply', 'construct'];


describe('settingsNormalizer', function configNormalizationModule() {
  it('should return default values for empty config object', function configNormalizationTest1() {
    var set = {};
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({a:1}), objTraps);
    var retSet = {
      a: {
        traps: {
          deleteProperty: 1,
          get: 1,
          getOwnPropertyDescriptor: 1,
          set: 1
        }
      },
      objectTraps: {
        defineProperty: 1,
        getPrototypeOf: 1,
        has: 1,
        isExtensible: 1,
        ownKeys: 1,
        preventExtensions: 1,
        setPrototypeOf: 1
      },
      delegatable: false,
      trapNewProperties: true,
      name: undefined
    };
    expect(conf).to.deep.equal(retSet);
  });

  it('normalizes the config object', function configNormalizationTest2() {
    var settings = {
      keys: ['test1', 'test2'],
      traps: ['get'],
      logLevel: 1
    };
    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), objTraps);

    var retSet = {
      test1: {
        traps: { get: 1 }
      },
      test2: {
        traps: { get: 1 }
      },
      objectTraps: {},
      delegatable: false,
      trapNewProperties: true,
      name: undefined
    };
    expect(conf).to.deep.equal(retSet);
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
        traps: { deleteProperty: 1, get: 1, getOwnPropertyDescriptor: 1, set: 1 }
      },
      objectTraps: { defineProperty: 1, getPrototypeOf: 1, has: 1, isExtensible: 1, ownKeys: 1, preventExtensions: 1, setPrototypeOf: 1 }
    };
    expect(conf).to.deep.equal(retConf);
  });

  it('should proxify an array with defaults on empty config object', function configNormalizationTest4() {
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), arrTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      a: {
        traps: { deleteProperty: 1, get: 1, getOwnPropertyDescriptor: 1, set: 1 }
      },
      objectTraps: { defineProperty: 1, getPrototypeOf: 1, has: 1, isExtensible: 1, ownKeys: 1, preventExtensions: 1, setPrototypeOf: 1 }
    };
    expect(conf).to.deep.equal(retConf);
  });

  it('should normalize config with default values for a function', function configNormalizationTest5() {
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), fnTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: undefined,
      a: {
         traps: { deleteProperty: 1, get: 1, getOwnPropertyDescriptor: 1, set: 1 }
      },
      objectTraps: { defineProperty: 1, getPrototypeOf: 1, has: 1, isExtensible: 1, ownKeys: 1, preventExtensions: 1, setPrototypeOf: 1, apply: 1, construct: 1 }
    };
    expect(conf).to.deep.equal(retConf);
  });

  it('should return a fully normalized config object', function configNormalizationTest6() {
    var settings = {
      delegatable: false,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      keys: ['key1', 'key2', 'key3'],
      traps: ['get', 'set', 'preventExtensions', 'getPrototypeOf'],
      logLevel: 3,
      key1: { logLevel: 2, traps: ['deleteProperty', 'getOwnPropertyDescriptor'] },
      key3: {
        traps: { get: 4, set: 2 }
      }
    };

    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), fnTraps);

    var retConf = {
      delegatable: false,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      key1: {
        traps: { get: 3, set: 3, deleteProperty: 2, getOwnPropertyDescriptor: 2 }
      },
      key2: {
        traps: { get: 3, set:3 }
      },
      key3: {
        traps: { get: 4, set: 2 }
      },
      objectTraps: { preventExtensions: 3, getPrototypeOf: 3 }
    };
    expect(conf).to.deep.equal(retConf);
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
        traps: { get: 4, set: 2, getOwnPropertyDescriptor: 3 }
      }
    };

    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), fnTraps);

    var retConf = {
      delegatable: true,
      trapNewProperties: true,
      name: 'name_of_object_to_appear_in_logs',
      key1: {
        traps: { get: 2, set: 2, getOwnPropertyDescriptor: 2, deleteProperty: 1 }
      },
      key2: {
        traps: { get: 4, set: 2, getOwnPropertyDescriptor: 3, deleteProperty: 1 }
      },
      objectTraps: {}
    };
    expect(conf).to.deep.equal(retConf);
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
  //TODO: add test to ensure throwing when cannot delete config properties
});
