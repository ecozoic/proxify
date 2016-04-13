/*global sinon*/
import { normalizeConfig } from '../../../src/components/utils/configNormalizer';

var traps = ['defineProperty', 'deleteProperty', 'get', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'has', 'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf'];
var fnTraps = traps.concat('apply', 'construct');
var defaultLogLevel = 1;

describe('configNormalizer', function configNormalizationModule() {
  it('should return default values for empty config object', function configNormalizationTest1() {
    var set = {};
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({a:1}), traps);

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
    var conf = normalizeConfig(settings, Object.getOwnPropertyNames({}), traps);

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
    var conf = normalizeConfig(delSet, Object.getOwnPropertyNames({a: 1}), traps);

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
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), traps);

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
    conf.objectTraps.should.have.property('preventExtensions', defaultLogLevel);
    conf.objectTraps.should.have.property('setPrototypeOf', defaultLogLevel);
  });

  it('should normalize config with default values for a function', function configNormalizationTest5() {
    var conf = normalizeConfig({}, Object.getOwnPropertyNames({a: 1}), fnTraps);

    conf.should.exist;
    conf.should.have.property('delegatable',false);
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
    conf.objectTraps.should.have.property('preventExtensions', defaultLogLevel);
    conf.objectTraps.should.have.property('setPrototypeOf', defaultLogLevel);
    conf.objectTraps.should.have.property('apply', defaultLogLevel);
    conf.objectTraps.should.have.property('construct', defaultLogLevel);
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

    conf.should.exist;
    conf.should.have.property('delegatable', false);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('name', 'name_of_object_to_appear_in_logs');
    conf.should.have.property('logLevel', 3);
    conf.key1.should.exist;
    conf.key1.traps.should.exist;
    conf.key1.traps.should.have.property('get', 3);
    conf.key1.traps.should.have.property('set', 3);
    conf.key1.traps.should.have.property('deleteProperty', 2);
    conf.key1.traps.should.have.property('getOwnPropertyDescriptor', 2);
    conf.key2.should.exist;
    conf.key2.traps.should.exist;
    conf.key2.traps.should.have.property('get', 3);
    conf.key2.traps.should.have.property('set', 3);
    conf.key3.should.exist;
    conf.key3.traps.should.exist;
    conf.key3.traps.should.have.property('get', 4);
    conf.key3.traps.should.have.property('set', 2);
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

    conf.should.exist;
    conf.should.have.property('delegatable', true);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('name', 'name_of_object_to_appear_in_logs');
    conf.should.have.property('logLevel', defaultLogLevel);
    conf.objectTraps.should.exist;
    conf.key1.should.exist;
    conf.key1.traps.should.exist;
    conf.key1.traps.should.have.property('get', 2);
    conf.key1.traps.should.have.property('set', 2);
    conf.key1.traps.should.have.property('deleteProperty', 1);
    conf.key1.traps.should.have.property('getOwnPropertyDescriptor', 2);
    conf.key2.should.exist;
    conf.key2.traps.should.exist;
    conf.key2.traps.should.have.property('get', 4);
    conf.key2.traps.should.have.property('set', 2);
    conf.key2.traps.should.have.property('deleteProperty', 1);
    conf.key2.traps.should.have.property('getOwnPropertyDescriptor', 3);
  });

  it('should throw when logLevel is NaN', function configNormalizationTest8() {
    var set = {logLevel: '3'};
    var conf;
    (function configThrowTest() {
      conf = normalizeConfig(set, Object.getOwnPropertyNames({}), traps);
    }).should.throw('logLevel for traps is not an integer');
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
    var conf;
    (function configThrowTest2() {
      conf = normalizeConfig(set, Object.getOwnPropertyNames({}), traps);
    }).should.throw('Unable to delete properties from provided config object.');
  });

  it('should not add non-available traps to config', function configNormalizationTest10() {
    var set = {
      keys: ['key1'],
      traps: ['get', 'set', 'test']
    };
    var conf = normalizeConfig(set, Object.getOwnPropertyNames({}), traps);

    conf.should.exist;
    conf.key1.should.exist;
    conf.key1.traps.should.exist;
    conf.key1.traps.should.have.property('get', defaultLogLevel);
    conf.key1.traps.should.have.property('set', defaultLogLevel);
    conf.objectTraps.should.exist;
    conf.should.have.property('name', undefined);
    conf.should.have.property('delegatable', false);
    conf.should.have.property('trapNewProperties', true);
    conf.should.have.property('logLevel', defaultLogLevel);
  });
});
