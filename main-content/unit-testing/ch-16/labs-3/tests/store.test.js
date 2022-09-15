/**
 * TODO:
 */

const store = require('../store');

describe('store', () => {
  test('should be valid type', async () => {
    await expect(store(1)).rejects.toBeInstanceOf(Error);
    await expect(store(false)).rejects.toBeInstanceOf(Error);
    await expect(store('cool')).rejects.toBeInstanceOf(Error);
    await expect(store([ 1, 2, 'a' ])).rejects.toBeInstanceOf(Error);
    await expect(store({ 'a': 'b' })).rejects.toBeInstanceOf(Error);
  });

  test('should return an object with id', (done) => {
    const testBuffer = Buffer.from('cool');

    store(testBuffer)
      .then(value => {
        expect(value).toBeInstanceOf(Object);
        expect(value.id).not.toBeUndefined();
        expect(typeof value.id).toStrictEqual('string');
        done();
      })
      .catch(error => {
        done(error);
      });
  });

  test('should return id with 4 in length', (done) => {
    const testBuffer = Buffer.from('cool');

    store(testBuffer)
      .then(value => {
        expect(value.id.length).toStrictEqual(4);
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
