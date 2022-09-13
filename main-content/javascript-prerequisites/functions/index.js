// Function's call method example.
function foo() { console.log(this.id); }

const objA = { id: 999 };
const objB = { id: 1 };

foo.call(objA); // 999
foo.call(objB); // 1

// Lambda function and this reference

function bar() {
  return (id) => console.log(this.id + id);
}

const obj = { id: 999 };

bar.call(obj)(1) // 1000
// or
const x = bar.call(obj);
x(1) // 1000
