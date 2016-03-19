/*global*/
import { trapDefinitions } from '../../../src/components/utils/trapDefinitions';
{
  const _trapDefintions = trapDefinitions,
    getTraps = _trapDefintions.getTraps;

  describe('trapDefinitions', function trapDefinitionTestModule() {
    it('should have all available traps defined', function trapDefinitionsTest1() {
      _trapDefintions.should.exist;
      _trapDefintions.should.be.an.object;
      _trapDefintions.should.have.property('defineProperty', 'object');
      _trapDefintions.should.have.property('deleteProperty', 'key');
      _trapDefintions.should.have.property('get', 'key');
      _trapDefintions.should.have.property('getOwnPropertyDescriptor', 'key');
      _trapDefintions.should.have.property('getPrototypeOf', 'object');
      _trapDefintions.should.have.property('has', 'object');
      _trapDefintions.should.have.property('isExtensible', 'object');
      _trapDefintions.should.have.property('ownKeys', 'object');
      _trapDefintions.should.have.property('preventExtensions', 'object');
      _trapDefintions.should.have.property('set', 'key');
      _trapDefintions.should.have.property('setPrototypeOf', 'object');
      _trapDefintions.should.have.property('apply', 'function');
      _trapDefintions.should.have.property('construct', 'function');
      _trapDefintions.should.have.property('getTraps', getTraps);
      _trapDefintions.should.have.property('propertyTraps');
      _trapDefintions.should.have.property('objectTraps');
      _trapDefintions.should.have.property('functionTraps');
      _trapDefintions.should.have.property('traps');
      _trapDefintions.getTraps.should.have.property('length', 1);
      _trapDefintions.should.have.ownPropertyDescriptor('getTraps').to.have.property('enumerable', false);
      _trapDefintions.should.have.ownPropertyDescriptor('getTraps').to.have.property('writable', false);
      _trapDefintions.should.have.ownPropertyDescriptor('getTraps').to.have.property('configurable', false);
    });

    it('should return only traps for properties', function trapDefinitionsTest2() {
      {
        const propTraps = _trapDefintions.getTraps('property');

        propTraps.should.exist;
        propTraps.should.have.lengthOf(4);
        propTraps.should.include('deleteProperty');
        propTraps.should.include('get');
        propTraps.should.include('getOwnPropertyDescriptor');
        propTraps.should.include('set');
      }
    });

    it('should return only traps for objects', function trapDefinitionsTest3() {
      {
        const objTraps = _trapDefintions.getTraps('object');

        objTraps.should.exist;
        objTraps.should.have.lengthOf(7);
        objTraps.should.include('defineProperty');
        objTraps.should.include('getPrototypeOf');
        objTraps.should.include('has');
        objTraps.should.include('isExtensible');
        objTraps.should.include('ownKeys');
        objTraps.should.include('preventExtensions');
        objTraps.should.include('setPrototypeOf');
      }
    });

    it('should return only traps for functions', function trapDefinitionsTest4() {
      {
        const fnTraps = _trapDefintions.getTraps('function');

        fnTraps.should.exist;
        fnTraps.should.have.lengthOf(2);
        fnTraps.should.include('apply');
        fnTraps.should.include('construct');
      }
    });

    it('should return all traps for properties and objects', function trapDefinitionsTest5() {
      {
        const objTraps = _trapDefintions.getTraps('objectAll');

        objTraps.should.exist;
        objTraps.should.have.lengthOf(11);
        objTraps.should.include('defineProperty');
        objTraps.should.include('getPrototypeOf');
        objTraps.should.include('isExtensible');
        objTraps.should.include('ownKeys');
        objTraps.should.include('preventExtensions');
        objTraps.should.include('setPrototypeOf');
        objTraps.should.include('has');
        objTraps.should.include('deleteProperty');
        objTraps.should.include('get');
        objTraps.should.include('getOwnPropertyDescriptor');
        objTraps.should.include('set');
      }
    });

    it('should return all traps for properties and functions', function trapDefinitionsTest6() {
      {
        const fnTraps = _trapDefintions.getTraps('functionAll');

        fnTraps.should.exist;
        fnTraps.should.have.lengthOf(6);
        fnTraps.should.include('apply');
        fnTraps.should.include('construct');
        fnTraps.should.include('deleteProperty');
        fnTraps.should.include('get');
        fnTraps.should.include('getOwnPropertyDescriptor');
        fnTraps.should.include('set');
      }
    });

    it('should return all available traps', function trapDefinitionsTest7() {
      {
        const traps = _trapDefintions.getTraps('all');

        traps.should.exist;
        traps.should.have.lengthOf(13);
        traps.should.include('defineProperty');
        traps.should.include('deleteProperty');
        traps.should.include('has');
        traps.should.include('getPrototypeOf');
        traps.should.include('isExtensible');
        traps.should.include('ownKeys');
        traps.should.include('preventExtensions');
        traps.should.include('setPrototypeOf');
        traps.should.include('get');
        traps.should.include('getOwnPropertyDescriptor');
        traps.should.include('set');
        traps.should.include('apply');
        traps.should.include('construct');
      }
    });

    it('should return all available traps', function trapDefinitionsTest8() {
      {
        const traps = _trapDefintions.getTraps('');

        traps.should.exist;
        traps.should.have.lengthOf(13);
        traps.should.include('defineProperty');
        traps.should.include('deleteProperty');
        traps.should.include('has');
        traps.should.include('getPrototypeOf');
        traps.should.include('isExtensible');
        traps.should.include('ownKeys');
        traps.should.include('preventExtensions');
        traps.should.include('setPrototypeOf');
        traps.should.include('get');
        traps.should.include('getOwnPropertyDescriptor');
        traps.should.include('set');
        traps.should.include('apply');
        traps.should.include('construct');
      }
    });

    it('should return an empty array', function trapDefinitionsTest9() {
      {
        const traps = _trapDefintions.getTraps(null);

        traps.should.exist;
        traps.should.have.lengthOf(0);
      }
    });

    it('should return all property traps', function trapDefinitionTest10() {
      {
        const traps = _trapDefintions.propertyTraps;

        traps.should.exist;
        traps.should.have.lengthOf(4);
        traps.should.include('deleteProperty');
        traps.should.include('get');
        traps.should.include('getOwnPropertyDescriptor');
        traps.should.include('set');
      }
    });

    it('should return all object traps', function trapDefinitionsTest11() {
      {
        const traps = _trapDefintions.objectTraps;

        traps.should.exist;
        traps.should.have.lengthOf(7);
        traps.should.include('defineProperty');
        traps.should.include('getPrototypeOf');
        traps.should.include('has');
        traps.should.include('isExtensible');
        traps.should.include('ownKeys');
        traps.should.include('preventExtensions');
        traps.should.include('setPrototypeOf');
      }
    });

    it('should return all function traps', function trapDefinitionsTest12() {
      {
        const traps = _trapDefintions.functionTraps;

        traps.should.exist;
        traps.should.have.lengthOf(2);
        traps.should.include('apply');
        traps.should.include('construct');
      }
    });

    it('should return same values for property traps', function trapDefinitionsTest13() {
      {
        const propTraps1 = _trapDefintions.getTraps('property'),
          propTraps2 = _trapDefintions.propertyTraps;

        propTraps1.should.exist;
        propTraps2.should.exist;
        propTraps2.should.deep.equal(propTraps1);
      }
    });

    it('should return same values for object traps', function trapDefinitionsTest14() {
      {
        const objTraps1 = _trapDefintions.getTraps('object'),
          objTraps2 = _trapDefintions.objectTraps;

        objTraps1.should.exist;
        objTraps2.should.exist;
        objTraps2.should.deep.equal(objTraps1);
      }
    });

    it('should return same values for function traps', function trapDefinitionsTest15() {
      {
        const fnTraps1 = _trapDefintions.getTraps('function'),
          fnTraps2 = _trapDefintions.functionTraps;

        fnTraps1.should.exist;
        fnTraps2.should.exist;
        fnTraps2.should.deep.equal(fnTraps1);
      }
    });

    it('should return all available traps', function trapDefinitionsTest16() {
      {
        const traps1 = _trapDefintions.traps,
          traps2 = _trapDefintions.getTraps('all');

        traps1.should.exist;
        traps2.should.exist;
        traps2.should.deep.equal(traps2);
      }
    });
  });
}
