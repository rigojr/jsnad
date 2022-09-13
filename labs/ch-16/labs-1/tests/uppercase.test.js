/**
 * TODO:
 */

const uppercase = require('../uppercase');

describe('uppercase', () => {
  test('should throw if type is not valid', () => {
    expect(() => uppercase(false)).toThrow();
    expect(() => uppercase(1)).toThrow();
    expect(() => uppercase(['x'])).toThrow();
    expect(() => uppercase({ 'a': 'b' })).toThrow();
  });

  test('should throw error if type is not valid', () => {
    expect(() => uppercase(1)).toThrow(Error('input must be a string'));
  });

  test('should return uppercase', () => {
    expect(uppercase('cool')).toStrictEqual('COOL');
  });

  test('should return typeof string', () => {
    expect(typeof uppercase('cool')).toStrictEqual('string');
  });
});