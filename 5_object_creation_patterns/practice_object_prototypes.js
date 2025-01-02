let prot = {};

let foo = Object.create(prot);

console.log(Object.getPrototypeOf(foo) === prot);
console.log(prot.isPrototypeOf(foo));

prot.isPrototypeOf(foo);
Object.prototype.isPrototypeOf(foo);

/* 
Line 8 will return `true` as `prot` is within the prototype chain of `foo`.

Line 9 will return `true` for the same reason, as all objects have `Object` within their prototype chain.
*/