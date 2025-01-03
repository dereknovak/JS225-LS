```js
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```

This example will throw a `TypeError` exception.

Although the new reference of `Ninja.prototype` contains the `swingSword` method, `ninja` still inherits from the original empty prototype object. This is due to `Ninja.prototype` getting reassigned after instantiation rather than mutating the object. The empty object has no `swingSword` method, therefore `undefined` is returned, which cannot be invoked as a function.