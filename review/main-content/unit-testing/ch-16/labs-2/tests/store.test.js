/**
 * TODO:
 */

const store = require('../store');

describe('store', () => {
    test('should return error if input is invalid', () => {
        store(0, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store('a', (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store([ 'a', 1], (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store({ 'a': 'b' }, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store(null, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store(false, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store(true, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
        store(undefined, (err, _) => expect(err).toStrictEqual(Error('input must be a buffer')));
    });

    test('should return an object with id property defined', (done) => {
        store(Buffer.from('test'), (err, data) => {
            if (err !== null || data.id.length !== 4) {
                done('fail');
            }

            expect(typeof data).toStrictEqual('object');
            expect(typeof data.id).toStrictEqual('string');
            done();
        });
    });

    test('should return an id', (done) => {
        store(Buffer.from('test'), (err, data) => {
            if (err !== null || data.id.length !== 4) {
                done('fail');
                
                return;
            }

            done();
        });
    });
});