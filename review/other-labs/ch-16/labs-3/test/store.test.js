/**
 * TODO:
 */

const store = require('../store');

describe('store', () => {
  test('should return an object with an id', async () => {
    const expected = await store(Buffer.from('test'));

    expect(expected).toBeInstanceOf(Object);
    expect(typeof expected.id).toStrictEqual('string');
    expect(expected.id.length).toStrictEqual(4);
  });

  test('should throw when input is invalid', async () => {
    await expect(store('')).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store(1)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store(null)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store(undefined)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store(false)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store(true)).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store({ 'a': 1 })).rejects.toStrictEqual(new Error('input must be a buffer'));
    await expect(store([ 'a', 1 ])).rejects.toStrictEqual(new Error('input must be a buffer'));
  });
});
