```js
let foo = {};
let bar = Object.create(foo);

foo.a = 1;
bar.a = 2;
console.log(bar.a);
```

This example will log `2` to the console.

While `foo` is higher up on `bar`'s prototype chain, its assignment to `2` on line 6 overrides the assignment within `foo` on line 5.