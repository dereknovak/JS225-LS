let foo = {
  a: 1,

  begetObject() {
    function F() {};
    F.prototype = this;
    return new F();
  },
};

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true