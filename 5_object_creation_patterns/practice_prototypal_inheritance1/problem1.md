```js

let foo = {};
let bar = Object.create(foo);

foo.a = 1;

console.log(bar.a);
```

The code will log `1` to the console.

This occurs due to prototypal inheritance - when JavaScript attempts to find the property `'a'` for `bar`, it first looks within `bar`, to which none is found, then moves up the prototype chain and eventually finding it within `foo`, returning the value `1`.