/*global expect*/
import { normalizeConfig } from '../../../src/components/utils/configNormalizer';
import { ObjectTrapHandler, FunctionTrapHandler, ArrayTrapHandler } from '../../../src/components/handlers';


describe('settingsNormalizer', function snModuleCallback() {
  it('should return default values for empty settings object', function snTest1Callback() {
    var set = {};
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({a:1}), Object.getOwnPropertyNames(ObjectTrapHandler.prototype));
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
    expect(conf.delegatable).to.equal(false);
    expect(conf.trapNewProperties).to.equal(true);
    expect(conf.a.traps.get).to.equal(1);
    //expect(conf.objectTraps.defineProperty).to.equal(1);
    //expect(conf.objectTraps.getPrototypeOf).to.equal(1);
    //expect(conf.objectTraps.has).to.equal(1);
    //expect(conf.objectTraps.isExtensible).to.equal(1);
    //expect(conf.objectTraps.ownKeys).to.equal(1);
    //expect(conf.objectTraps.preventExtensions).to.equal(1);
    expect(conf).to.deep.equal(retSet);
  });

  it('normalizes the settings object', function settingsNormalizationTest1() {
    var settings = {
      keys: ['test1', 'test2'],
      traps: ['get'],
      logLevel: 1
    };
    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), Object.getOwnPropertyNames(ObjectTrapHandler.prototype));

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
      trapNewProperties: true
    };
    expect(conf).to.deep.equal(retSet);
  });

  it('should create default settings due to disallowed delegation', function snTest3Callback() {
    var set = {
        keys: ['test1', 'test2'],
        traps: ['get', 'set'],
        logLevel: 2
      },
      delSet = Object.create(set);
    var conf = normalizeConfig(delSet, Object.getOwnPropertyNames({a: 1}), Object.getOwnPropertyNames(ObjectTrapHandler.prototype));

    var retConf = Object.create(set);
    retConf.delegatable = false;
    retConf.trapNewProperties = true;
    retConf.a = {
      traps: {
        deleteProperty: 1,
        get: 1,
        getOwnPropertyDescriptor: 1,
        set: 1
      }
    };
    retConf.objectTraps = {
      defineProperty: 1,
        getPrototypeOf: 1,
        has: 1,
        isExtensible: 1,
        ownKeys: 1,
        preventExtensions: 1,
        setPrototypeOf: 1
    };
    expect(conf).to.deep.equal(retConf);
  });
});
