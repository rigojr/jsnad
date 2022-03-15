console.log('app.js');

function testingStackTraceLimit(n = 99) {
  if (n === 0) throw Error();
  testingStackTraceLimit(n - 1);
}

testingStackTraceLimit();