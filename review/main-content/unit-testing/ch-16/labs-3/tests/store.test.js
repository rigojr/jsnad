/**
 * TODO:
 */

/**
 * TODO:
 */

 const store = require('../store');

 describe('store', () => {
  test('should return error if input is invalid', async () => {
		await expect(store(0)).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store('a')).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store([ 'a', 1 ])).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store({ 'a': 'b' })).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store(false)).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store(true)).rejects.toStrictEqual(new Error('input must be a buffer'))
		await expect(store(undefined)).rejects.toStrictEqual(new Error('input must be a buffer'))
	});

  test('should return an object with id property defined', async () => {
		const data = await store(Buffer.from('test'));

		expect(typeof data).toStrictEqual('object');
		expect(typeof data.id).toStrictEqual('string');
		expect(data.id.length).toStrictEqual(4);
  });
 });