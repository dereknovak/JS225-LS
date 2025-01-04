```js
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());
```

Line 16 will log `ByeBye` and line 17 will log `HelloHello`.

For line 16, the *static* method `dupData` is invoked, as the method is called directly on the class. With line 17, the *instance* method is invoked, as this method is called on `thing`, which is an object that has been instantiated from the `Something` class.