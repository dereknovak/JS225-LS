```js
let a = 1;
let foo;
let obj;

function Foo() {
  this.a = 2;
  this.bar = function() {
    console.log(this.a);
  };
  this.bar();
}

foo = new Foo();

foo.bar();
Foo();

obj = {};
Foo.call(obj);
obj.bar();

console.log(this.a);
```

This example will log `2` 6 times on separate lines.

On line 13, the `Foo` constructor function is invoked, creating a new object with properties `a` referencing `2` and method `bar`. The constructor function also logs the first `2` to the console via `this.bar()`, which will always reference `2` from the newly created object.

The second `2` comes from calling the `bar` method on the newly created `foo` object, which is an instance of `Foo` and therefore references the `bar` function that logs `2`.

The third is logged from line 16, which invokes the `Foo` constructor function using the global object as its context. This will again log `2` from the invocation on line 10 and will also reassign the global property `a` to `2`.

The fourth is from line 19, which again invokes the `Foo` constructor function, logging `2` to the console. This execution also adds properties `a` and `bar` to the `obj` object, as `obj` is used as the execution context.

The fifth `2` comes from line 20, where the `bar` method, which now exists in `obj`, logs its now existing `a` property value.

Lastly, because the global `a` was reassigned to `2`, this is what we see logged to the console for the sixth and final `2`.