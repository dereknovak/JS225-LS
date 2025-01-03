```js
let RECTANGLE = {
  area() {
    return this.width * this.height;
  },

  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area); // NaN
console.log(rect1.perimeter); // NaN
```

This example will log `NaN` to the console twice.

When invoking the `area` and `perimeter` methods on lines 15 and 16, the execution context used for both are the `RECTANGLE` object. Because `this` within a function invocation always references the calling object, `RECTANGLE` is represented, which does not contain a `width` or `height` property, returning `undefined` for each one. Any mathematical operation using `undefined` returns `NaN`, which is what is seen.

This problem can be fixed by including the execution context of `this` when invoking the `area` and `perimeter` methods by using the `call` method.

```js
let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);
```