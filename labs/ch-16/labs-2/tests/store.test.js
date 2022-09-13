/**
 * TODO:
 */

const store = require('../store');
const testBuffer = Buffer.from('cool');

describe('store', () => {
  const cb = (content, completed) => (error, value) => {
    if (error !== null) {
      completed(error);
      return;
    }

    try {
      content(error, value);
      completed();
    } catch (error) {
      completed(error)
    }
  }

  test('should be valid type', () => {
    store(1, (error, _) => expect(error).toBeInstanceOf(Error));
    store(false, (error, _) => expect(error).toBeInstanceOf(Error));
    store('cool', (error, _) => expect(error).toBeInstanceOf(Error));
    store([ 1, 2, 'a'], (error, _) => expect(error).toBeInstanceOf(Error));
    store({ 'a': 'b' }, (error, _) => expect(error).toBeInstanceOf(Error));
  });

  test('should return an object with id', (done) => {
    store(testBuffer, cb((error, value) => {
      expect(error).toStrictEqual(null);
      expect(value).toBeInstanceOf(Object);
      expect(value.id).not.toBeUndefined();
      expect(typeof value.id).toStrictEqual('string');
    }, done));

    // store(testBuffer,
    //   (error, value) => {
    //     if (error !== null) {
    //       done(error);
    //       return;
    //     }

    //     try {
    //       expect(error).toStrictEqual(null);
    //       expect(value).toBeInstanceOf(Object);
    //       expect(value.id).not.toBeUndefined();
    //       expect(typeof value.id).toStrictEqual('string');
    //       done();
    //     } catch (error) {
    //       done(error);
    //     }
    //   }
    // );
  });

  test('should return id with 4 in length', (done) => {
    store(testBuffer, cb((_error, value) => {
      expect(value.id.length).toStrictEqual(4);
    }, done));

    // store(testBuffer, (error, value) => {
    //   if (error !== null) {
    //     done(error);
    //   }
    //   try {
    //     expect(value.id.length).toStrictEqual(4);
    //   } catch (error) {
    //     done(error);
    //   }
    // });
  });
});