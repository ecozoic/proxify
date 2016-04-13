/*global sinon*/
import { trapDefinitions } from '../../../src/components/utils/trapDefinitions';

describe('trapDefinitions', function trapDefinitionTestModule() {
  it('should have all available traps defined', function trapDefinitionsTest1() {
    trapDefinitions.should.exist;
    trapDefinitions.should.be.an.object;
    trapDefinitions.should.have.property('defineProperty', 'object');
    trapDefinitions.should.have.property('deleteProperty', 'key');
    trapDefinitions.should.have.property('get', 'key');
    trapDefinitions.should.have.property('getOwnPropertyDescriptor', 'key');
    trapDefinitions.should.have.property('getPrototypeOf', 'object');
    trapDefinitions.should.have.property('has', 'object');
    trapDefinitions.should.have.property('isExtensible', 'object');
    trapDefinitions.should.have.property('ownKeys', 'object');
    trapDefinitions.should.have.property('preventExtensions', 'object');
    trapDefinitions.should.have.property('set', 'key');
    trapDefinitions.should.have.property('setPrototypeOf', 'object');
    trapDefinitions.should.have.property('apply', 'function');
    trapDefinitions.should.have.property('construct', 'function');
  });

  it('should return only traps for properties', function trapDefinitionsTest2() {
    var keyTraps = trapDefinitions.getTraps('property');

    keyTraps.should.exist;
    keyTraps.should.have.length(4);
    keyTraps.should.include('deleteProperty');
    keyTraps.should.include('get');
    keyTraps.should.include('getOwnPropertyDescriptor');
    keyTraps.should.include('set');
  });

  it('should return only traps for objects', function trapDefinitionsTest3() {
    var objTraps = trapDefinitions.getTraps('object');

    objTraps.should.exist;
    objTraps.should.have.length(7);
    objTraps.should.include('defineProperty');
    objTraps.should.include('getPrototypeOf');
    objTraps.should.include('has');
    objTraps.should.include('isExtensible');
    objTraps.should.include('ownKeys');
    objTraps.should.include('preventExtensions');
    objTraps.should.include('setPrototypeOf');
  });

  it('should return only traps for functions', function trapDefinitionsTest4() {
    var fnTraps = trapDefinitions.getTraps('function');

    fnTraps.should.exist;
    fnTraps.should.have.length(2);
    fnTraps.should.include('apply');
    fnTraps.should.include('construct');
  });

  it('should return all traps for properties and objects', function trapDefinitionsTest5() {
    var objTraps = trapDefinitions.getTraps('objectAll');

    objTraps.should.exist;
    objTraps.should.have.length(11);
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
  });

  it('should return all traps for properties and functions', function trapDefinitionsTest5() {
    var fnTraps = trapDefinitions.getTraps('functionAll');

    fnTraps.should.exist;
    fnTraps.should.have.length(6);
    fnTraps.should.include('apply');
    fnTraps.should.include('construct');
    fnTraps.should.include('deleteProperty');
    fnTraps.should.include('get');
    fnTraps.should.include('getOwnPropertyDescriptor');
    fnTraps.should.include('set');
  });

  it('should return all available traps', function trapDefinitionsTest5() {
    var traps = trapDefinitions.getTraps('all');

    traps.should.exist;
    traps.should.have.length(13);
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
  });

  it('should return an empty array', function trapDefinitionsTest5() {
    var traps = trapDefinitions.getTraps('');

    traps.should.exist;
    traps.should.have.length(0);
  });
});
