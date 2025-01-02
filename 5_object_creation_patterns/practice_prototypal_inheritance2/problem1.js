// Solved without hints in about 1 minute.

function getDefiningObject(object, propKey) {
  while (object) {
    if (object.hasOwnProperty(propKey)) {
      return object;
    }

    object = Object.getPrototypeOf(object);
  }

  return object;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null