```js
let boo = {};
boo.myProp = 1;

let far = Object.create(boo);

// lots of code

far.myProp;       // 1
```

No, we do not know for sure that the last line is referencing the `boo` object for the return of `myProp`. A couple of things can happen that may change it.

1. The `myProp` property is overridden by an assignment within `far`.

```js
// Omitted

far.myProp = 2;
far.myProp;       // 2
```

2. The prototype of `far` may be changed.

```js
// Omitted

let differentObject = {};
Object.setPrototypeOf(far, differentObject);

far.myProp;      // undefined
```