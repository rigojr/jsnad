/**
 * TODO:
 */

const { promisify } = require('util');

const store = require('../store');

describe('store', () => {
  test('should return an object with id', (done) => {
    store(Buffer.from(''), (err, payload) => {
      if (err !== null) {
        done(err);
      }

      expect(payload).toBeInstanceOf(Object);
      expect(typeof payload.id).toStrictEqual('string');
      expect(payload.id.length).toStrictEqual(4);
      done()
    });
  });

  test('should throw if input is not buffer', (done) => {
    store('', (err, value) => {
      if (value !== undefined) {
        done('error');
      }

      expect(err).toStrictEqual(new Error('input must be a buffer'));
      done();
    });
  });

  test('should throe if input is not buffer as promised', async () => {
    const promisifyStore = promisify(store);

    await expect(promisifyStore('')).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore(1)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore(null)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore(undefined)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore(false)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore(true)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore({ 'a': 1 })).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(promisifyStore([ 'a', 1 ])).rejects.toStrictEqual(new Error('input must be a buffer'));
  })
});