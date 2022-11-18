/**
 * TODO:
 */

const uppercase = require('../uppercase');

describe('uppercase', () => {
    test('should throw if invalid type is sent', () => {
        const expectedError = new Error('input must be a string');

        expect(() => uppercase(0)).toThrow(expectedError);
        expect(() => uppercase(false)).toThrow(expectedError);
        expect(() => uppercase({ 'a': 'b' })).toThrow(expectedError);
        expect(() => uppercase([ 1, 2, 'a'])).toThrow(expectedError);
        expect(() => uppercase(null)).toThrow(expectedError);
        expect(() => uppercase(undefined)).toThrow(expectedError);
        expect(() => uppercase(Symbol())).toThrow(expectedError);
    });

    test('should return string', () => {
        expect(typeof uppercase('a')).toStrictEqual('string');
    });

    test('should return an uppercase', () => {
        const subject = 'uppercase';
        const expected = 'UPPERCASE';

        expect(uppercase(subject)).toStrictEqual(expected);
    });
});