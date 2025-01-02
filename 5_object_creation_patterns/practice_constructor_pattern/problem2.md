This example will throw a `TypeError` exception.

This occurs due to the lack of the `new` keyword on line 7. Because there is no explicit returned object of `Lizard()`, `undefined` is returned and assigned to `lizzy`. There is no `scamper` method for `undefined`, and therefore the exception is thrown.

This can be fixed by simply adding `new` before `Lizard` on line 7.

```js
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?
```