/*global sinon*/
describe('proxify', () => {
  let proxify;
  let mockFactories;

  before(() => {
    // create injector to inject mock deps
    const injector = require('inject!../src/index');

    // create spies
    mockFactories = {
      proxifyObject: sinon.spy(),
      proxifyFunction: sinon.spy(),
      proxifyArray: sinon.spy()
    };

    // inject
    proxify = injector({
      './components/factories': mockFactories
    }).proxify;
  });

  afterEach(() => {
    // reset spies
    for (let spy in mockFactories) {
      mockFactories[spy].reset();
    }
  });

  it('proxifies objects', () => {
    const obj = {};
    proxify(obj);

    mockFactories.proxifyObject.should.have.been.calledOnce;
  });

  it('proxifies functions', () => {
    const fn = function() { };
    proxify(fn);

    mockFactories.proxifyFunction.should.have.been.calledOnce;
  });

  it('proxifies arrays', () => {
    const ara = [];
    proxify(ara);

    mockFactories.proxifyArray.should.have.been.calledOnce;
  });

  it('does not proxify booleans', () => {
    proxify(true);
    proxify(false);

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  it('does not proxify null/undefined', () => {
    proxify(null);
    proxify(undefined);

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  it('does not proxify NaN/Infinity', () => {
    proxify(NaN);
    proxify(Infinity);
    proxify(-Infinity);

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  it('does not proxify strings', () => {
    proxify('');
    proxify('string');

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  it('does not proxify numbers', () => {
    proxify(0);
    proxify(1);
    proxify(-1);
    proxify(1.1);

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  it('does not proxify symbols', () => {
    proxify(Symbol());
    proxify(Symbol('foo'));

    for(let spy in mockFactories) {
      mockFactories[spy].should.not.have.been.called;
    }
  });

  //TODO: Add more tests for settings normalization
  it('normalizes the settings object', function settingsNormalizationTest1() {
    var settings = {
      keys: ['test1', 'test2'],
      traps: ['get'],
      logLevel: 1
    };
    proxify({}, settings);
    //TODO: Temporary fill-in until I talk with John
    mockFactories.proxifyObject.should.have.been.calledOnce;
  });
});
