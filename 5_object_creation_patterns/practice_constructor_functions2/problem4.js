function createObject(obj) {
  const newObj = {};
  Object.setPrototypeOf(newObj, obj);
  return newObj;
}

let foo = {
  a: 1
};

let bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true