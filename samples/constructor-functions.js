function Wolf(name) {
  this.name = name;
}

Wolf.prototype.howl = function() { console.log(this.name + 'owo') };

function Dog(name) {
  Wolf.call(this, name + ' The dog '); // This is the equivalent to super() in modern syntax class.
}

// To complete the inheritance from Wolf to Dog
function inherit(proto) {
  function ChainLink() {} // empty constructor function
  ChainLink.prototype = proto;
  return new ChainLink();
}

Dog.prototype = inherit(Wolf.prototype);

Dog.prototype.woof = function () { console.log(this.name + 'woof') };

const rufus = new Dog('rufus');

rufus.woof();
rufus.howl();