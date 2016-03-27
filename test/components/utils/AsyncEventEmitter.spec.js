import { AsyncEventEmitter } from '../../../src/components/utils';

describe('AsyncEventEmitter', () => {
  describe('#addListener', () => {
    it('throws if listener is not a function', () => {
      const emitter = new AsyncEventEmitter();

      (function () {
        emitter.addListener('test', NaN);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', null);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', undefined);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', true);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', false);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', '');
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', 'hey');
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', 1);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', 1.3);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', -1);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', 0);
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', {});
      }).should.throw(TypeError);

      (function () {
        emitter.addListener('test', []);
      }).should.throw(TypeError);
    });

    it('adds listener for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.addListener('test', function() {});

      emitter.addListener('debug', function() {});
      emitter.addListener('debug', function() {});

      emitter.listenerCount('test').should.equal(1);
      emitter.listenerCount('debug').should.equal(2);
    });

    it('supports chaining', () => {
      const emitter = new AsyncEventEmitter();

      const ref = emitter.addListener('test', function() { });

      emitter.should.equal(ref);
    });
  });

  describe('#emit', () => {
    it('executes listeners asynchronously', (done) => {
      const emitter = new AsyncEventEmitter();

      let counter = 0;
      emitter.on('test', () => {
        counter.should.equal(1);
        done();
      });
      counter++;

      emitter.emit('test');
    });

    it('executes  multiple listeners asynchronously in order they were added', (done) => {
      const emitter = new AsyncEventEmitter();

      let counter = 0;
      emitter.on('test', () => {
        counter++;
      });
      emitter.on('test', () => {
        counter.should.equal(2);
        done();
      });
      counter++;

      emitter.emit('test');
    });

    it('passes in proper arguments to listeners', (done) => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', (count, isValid) => {
        count.should.equal(100);
        isValid.should.be.true;
        done();
      });

      emitter.emit('test', 100, true);
    });

    it('returns false if event has no listeners', () => {
      const emitter = new AsyncEventEmitter();

      const result = emitter.emit('test');

      result.should.be.false;
    });

    it('returns true if event has listeners', (done) => {
      const emitter = new AsyncEventEmitter();
      emitter.on('test', () => done());

      const result = emitter.emit('test');

      result.should.be.true;
    });
  });

  describe('#listenerCount', () => {
    it('returns number of listeners attached for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', function() { });
      emitter.on('test', function() { });
      emitter.on('test', function() { });

      emitter.on('bad', function() { });

      emitter.listenerCount('test').should.equal(3);
    });

    it('returns one if single listener attached for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', function() {});
      emitter.on('bad', function() {});

      emitter.listenerCount('test').should.equal(1);
    });

    it('returns zero if no listeners attached for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.listenerCount('test').should.equal(0);
    });
  });

  describe('#on', () => {
    it('throws if listener is not a function', () => {
      const emitter = new AsyncEventEmitter();

      (function () {
        emitter.on('test', NaN);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', null);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', undefined);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', true);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', false);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', '');
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', 'hey');
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', 1);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', 1.3);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', -1);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', 0);
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', {});
      }).should.throw(TypeError);

      (function () {
        emitter.on('test', []);
      }).should.throw(TypeError);
    });

    it('adds listener for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', function() {});

      emitter.on('debug', function() {});
      emitter.on('debug', function() {});

      emitter.listenerCount('test').should.equal(1);
      emitter.listenerCount('debug').should.equal(2);
    });

    it('supports chaining', () => {
      const emitter = new AsyncEventEmitter();

      const ref = emitter.on('test', function() { });

      emitter.should.equal(ref);
    });
  });

  describe('#once', () => {
    it('throws if listener is not a function', () => {
      const emitter = new AsyncEventEmitter();

      (function () {
        emitter.once('test', NaN);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', null);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', undefined);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', true);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', false);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', '');
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', 'hey');
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', 1);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', 1.3);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', -1);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', 0);
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', {});
      }).should.throw(TypeError);

      (function () {
        emitter.once('test', []);
      }).should.throw(TypeError);
    });

    it('adds listener for event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.once('test', function() { });

      emitter.listenerCount('test').should.equal(1);
    });

    it('removes listener after first notification', (done) => {
      const emitter = new AsyncEventEmitter();
      emitter.once('test', () => {
        emitter.listenerCount('test').should.equal(0);
        done();
      });

      emitter.listenerCount('test').should.equal(1);
      emitter.emit('test');
    });

    it('passes proper arguments to listener', (done) => {
      const emitter = new AsyncEventEmitter();

      emitter.once('test', (count, isValid) => {
        count.should.equal(100);
        isValid.should.be.true;
        done();
      });

      emitter.emit('test', 100, true);
    });

    it('supports chaining', () => {
      const emitter = new AsyncEventEmitter();

      const ref = emitter.once('test', function() { });

      emitter.should.equal(ref);
    });
  });

  describe('#removeAllListeners', () => {
    it('removes all listeners for all events if unspecified', () => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', function() { });
      emitter.on('test', function() { });
      emitter.on('debug', function() { });

      emitter.listenerCount('test').should.equal(2);
      emitter.listenerCount('debug').should.equal(1);
      emitter.removeAllListeners();

      emitter.listenerCount('test').should.equal(0);
      emitter.listenerCount('debug').should.equal(0);
    });

    it('removes all listeners for specified event', () => {
      const emitter = new AsyncEventEmitter();

      emitter.on('test', function() { });
      emitter.on('test', function() { });
      emitter.on('debug', function() { });

      emitter.listenerCount('test').should.equal(2);
      emitter.listenerCount('debug').should.equal(1);
      emitter.removeAllListeners('test');

      emitter.listenerCount('test').should.equal(0);
      emitter.listenerCount('debug').should.equal(1);
    });

    it('supports chaining', () => {
      const emitter = new AsyncEventEmitter();

      const ref1 = emitter.removeAllListeners();
      const ref2 = emitter.removeAllListeners('test');

      emitter.should.equal(ref1);
      emitter.should.equal(ref2);
    });
  });

  describe('#removeListener', () => {
    it('throws if listener is not a function', () => {
      const emitter = new AsyncEventEmitter();

      (function () {
        emitter.removeListener('test', NaN);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', null);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', undefined);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', true);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', false);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', '');
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', 'hey');
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', 1);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', 1.3);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', -1);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', 0);
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', {});
      }).should.throw(TypeError);

      (function () {
        emitter.removeListener('test', []);
      }).should.throw(TypeError);
    });

    it('removes specified listener from the specified event', () => {
      const emitter = new AsyncEventEmitter();
      const listener1 = function() { };
      const listener2 = function() { };

      emitter.on('test', listener1);
      emitter.on('test', listener2);
      emitter.on('debug', listener1);

      emitter.listenerCount('test').should.equal(2);
      emitter.listenerCount('debug').should.equal(1);

      emitter.removeListener('test', listener1);
      emitter.listenerCount('test').should.equal(1);
      emitter.removeListener('debug', listener1);
      emitter.listenerCount('debug').should.equal(0);
    });

    it('supports chaining', () => {
      const emitter = new AsyncEventEmitter();

      const ref = emitter.removeListener('test', function() { });

      emitter.should.equal(ref);
    });
  });
});
