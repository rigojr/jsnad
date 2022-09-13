// Symbol
const sym1 = Symbol();
const sym2 = Symbol('foo');
const sym3 = Symbol('foo');
const sym4 = Symbol('foo2');

// The description do not create the  same symbol
console.log(sym2 === sym3);

console.log(Symbol.keyFor(sym4)); // foo

console.log(Symbol.keyFor(Symbol.for('foo2')) === 'foo2'); // true