```js
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
```

This example will log `true` to the console.

On line 6, a new `Ninja` object is instantiated and assigned to `ninja`. This new object contains the `swung` property, referencing `true`. On line 8, the `swingSword` function is added as a method to `Ninja.prototype`, providing all instances of `Ninja` access to this method. Because of this, when invoked on line 12, `true` is logged to the console.