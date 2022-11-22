// Functional approach to create prototype chain.

const wolf = {
  'howl': function() { console.log(this.name + ': awo') }
};

const dog = Object.create(wolf, {
  'woof': { 'value': function() { console.log(this.name + ': woof') } }
});

const rufus = Object.create(dog, {
  'name': { 'value': 'Rufus' }
});

// w/ function paradigm

const wolf2 = {
  'howl': function() { console.log(this.name + ' owo') }
}

const dog2 = Object.create(wolf2, {
  'woof': { 'value': function() { console.log(this.name + ' woof') }}
})

function createDog2(name) {
  return Object.create(dog2, {
    'name': { 'value': name }
  });
}

const rufus2 = createDog2('rufus');

function doSomething() {
  console.log('chaining prototypes');
  console.log('w/ functional approach');
  rufus.woof();
  rufus.howl();

  console.log('w/ function paradigm');
  rufus2.woof();
  rufus2.howl();
}

module.exports = doSomething;