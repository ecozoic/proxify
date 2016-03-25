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
      }
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
      }
    };
    expect(conf).to.deep.equal(retConf);
  });
});
