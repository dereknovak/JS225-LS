```js
let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true
```

# Solution

```js
let ninjaB = new ninjaA.constructor;
```

OR

```js
let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));
```