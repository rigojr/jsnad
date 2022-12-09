/**
 * TODO:
 */

const uppercase = require('../uppercase');

describe('uppercase', () => {
  test('should return an uppercase', () => {
    expect(uppercase('test')).toStrictEqual('TEST');
  });

  test('should throw when input is invalid', () => {
    expect(() => uppercase(1)).toThrowError('input must be a string');
    expect(() => uppercase([ 'a', 1 ])).toThrowError('input must be a string');
    expect(() => uppercase(null)).toThrowError('input must be a string');
    expect(() => uppercase(undefined)).toThrowError('input must be a string');
    expect(() => uppercase(false)).toThrowError('input must be a string');
    expect(() => uppercase({ 'a': 1 })).toThrowError('input must be a string');
  });
});