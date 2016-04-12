/*global sinon*/
import { trapDefinitions } from '../../../src/components/utils/trapDefinitions';

describe('trapDefinitions', function trapDefinitionTestModule() {
  it('should have all available traps defined', function trapDefinitionsTest1() {
    trapDefinitions.should.exist;
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
  });

  it('should return only traps for objects', function trapDefinitionsTest3() {
    var objTraps = trapDefinitions.getTraps('object');

    objTraps.should.exist;
    objTraps.should.have.length(7);
  });

  it('should return only traps for functions', function trapDefinitionsTest4() {
    var fnTraps = trapDefinitions.getTraps('function');

    fnTraps.should.exist;
    fnTraps.should.have.length(2);
  });

  it('should return all traps for properties and objects', function trapDefinitionsTest5() {
    var objTraps = trapDefinitions.getTraps('objectAll');

    objTraps.should.exist;
    objTraps.should.have.length(11);
  });

  it('should return all traps for properties and functions', function trapDefinitionsTest5() {
    var fnTraps = trapDefinitions.getTraps('functionAll');

    fnTraps.should.exist;
    fnTraps.should.have.length(6);
  });

  it('should return all available traps', function trapDefinitionsTest5() {
    var fnTraps = trapDefinitions.getTraps('all');

    fnTraps.should.exist;
    fnTraps.should.have.length(13);
  });

  it('should return an empty array', function trapDefinitionsTest5() {
    var fnTraps = trapDefinitions.getTraps('');

    fnTraps.should.exist;
    fnTraps.should.have.length(0);
  });
});
