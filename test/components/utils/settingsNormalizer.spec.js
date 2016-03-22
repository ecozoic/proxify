/*global expect*/
import { normalizeSettings } from '../../../src/components/utils/settingsNormalizer';

describe('settingsNormalizer', function snModuleCallback() {
  it('should return default values for empty settings object', function snTest1Callback() {
    var set = {};
    normalizeSettings(set, Object.getOwnPropertyNames({a:1}));
    var retSet = {
      a: {
        traps: {

        }
      },
      delegatable: false,
      trapNewProperties: false
    };
    expect(set).to.deep.equal(retSet);
  });

  it('normalizes the settings object', function settingsNormalizationTest1() {
    var settings = {
      keys: ['test1', 'test2'],
      traps: ['get'],
      logLevel: 1
    };
    normalizeSettings(settings, Object.getOwnPropertyNames({}));

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
      delegatable: false,
      trapNewProperties: false
    };
    expect(settings).to.deep.equal(retSet);
  });

  it('should create default settings due to disallowed delegation', function snTest3Callback() {
    var set = {
        keys: ['test1', 'test2'],
        traps: ['get', 'set'],
        logLevel: 2
      },
      delSet = Object.create(set);
    normalizeSettings(delSet, Object.getOwnPropertyNames({}));

    //TODO: update this test once default traps are place on the settings when undefined
    var retSet = Object.create(set);
    retSet.delegatable = false;
    retSet.trapNewProperties = false;
    expect(delSet).to.deep.equal(retSet);
  });
});
