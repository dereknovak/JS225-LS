# JS229 'Object Oriented JavaScript' Study Guide

## Navigation

- [Objects]()
    - [Organizing Code]()
    - [Object Factories]()
- [Execution Context]()
    - [this](#this)
    - [Implicit Execution Context](#implicit-context)
    - [Explicit Execution Context](#execution-context)
    - [Context Loss]()
    - [Lexical Scope]()
- [Scope and Closures]()
    - [Higher-order Functions](#higher-order-functions)
    - [Private Data](#private-data)
    - [Garbage Collection]()
    - [IIFEs](#iifes)
    - [Partial Function Application](#partial-function-application)
- [Object Creation Patterns]()
    - [Constructor Function]()
    - [Pseudo-Classical Pattern]()
    - [Class syntax]()
    - [Prototypal Objects]()
    - [Behavior Delegation]()
- [Modules]()

# Study Guide

- Objects
    - Organizing code into appropriate objects
    - Object factories
- Determining/setting function execution context (this)
    - Implicit function execution context
    - Explicit function execution context
    - Dealing with context loss
    - Lexical scope
- Scope and Closures
    - Higher-order functions
    - Creating and using private data
    - Garbage collection
    - IIFEs
    - Partial Function Application
- Object creation patterns
    - class syntax
    - Constructor functions
    - Pseudo-Classical pattern
    - Prototype objects
    - Behavior delegation
- Modules

## Scott SPOT
const walkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}
// Assigning the mixin to the Cat prototype object.
Object.assign(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk()); // Cat objects can now use walk() from the mixin

## Reading

- JavaScript Weekly: Making Sense of Closures 
    - https://medium.com/launch-school/javascript-weekly-making-sense-of-closures-daa2e0b56f88
- JavaScript Weekly: Understanding Links on the Object Prototype Chain
    - https://medium.com/launch-school/javascript-weekly-understanding-links-on-the-object-prototype-chain-12962f05e149
- JavaScript Weekly: An Introduction to First-Class Functions
    - https://medium.com/launch-school/javascript-weekly-an-introduction-to-first-class-functions-9d069e6fb137
- JavaScript Weekly: What in the World is this?!
    - https://medium.com/launch-school/what-in-the-world-is-this-be803a85ed47

# Execution Context

## this

- The reserved `this` keyword represents the *execution context*, or the context of the calling object, that is used upon invocation of a method.

```js
const dog = {
  name: 'Sparky',
  bark() {
    console.log(this.name + ' says hello!');
  },
};

dog.bark();  // Sparky says hello!
```
>When invoking the `bark` method on `dog` on line 8, the execution context of `dog` is bound to the `this` keyword. Because the `dog` object contains the property `name`, the value of `Sparky` is returned, concatenated with the string, and outputting `Sparky says hello!`.

## Implicit Context

- The **implicit execution context** is, by default, the calling object of a function or method invocation. While method invocations will typically have a clear calling object, functions utilize the global object.

```js
const cat = {
  name: 'Milo',
  meow() {
    console.log(this.name + ' says hello!'); // `this` => cat object
  },
};

function meow() {
  console.log(this.name + ' says hello!'); // `this` => global object
}

cat.meow();
// Milo says hello!
meow();
// undefined says hello!
this.name;   // `this` => global object
// undefined
```

- In strict mode, the execution context for functions is `undefined`, which will throw exceptions if a property value is requested.

```js
const name = 'Bob';

function greet() {
  console.log('Hello, ' + this.name);
}

greet();  // TypeError: Cannot read properties of undefined
```

## Explicit Context

- **Explicit execution context** can be provided using either `call`, `apply`, or `bind` to invoke a method with *explicit* context. Rather than using the default implicit context, one is provided as an argument to these methods.

```js
const person = {
  name: 'Jimmy',
  age: 25,
  describe() {
    return `${this.name} is ${this.age} years old.`;
  },
  count(start, end) {
    return `${this.name} is counting from ${start}-${end}.`;
  }
}

const bobby = {
  name: 'Bobby',
  age: 32,
}

person.describe();            // Jimmy is 25 years old.
person.describe.call(bobby);  // Bobby is 32 years old.
```

- `call` uses execution context as first argument, then method arguments as the rest.
- `apply` uses execution context as first argument, then an array of method arguments as the second argument.

```js
person.count.call(bobby, 1, 5);    // Bobby is counting from 1-5.
person.count.apply(bobby, [1, 5])  // Bobby is counting from 1-5.
```

- `bind` permenantly binds an execution context to a *copy* of the original function. This method object is then returned from the `bind` invocation and can be assigned to a variable. Because it is permenantly bound, no explicit execution context methods can overwrite it.

```js
const bobbyCounts = person.count.bind(bobby);  // [Function: bound count]

bobbyCounts(1, 5);               // Bobby is counting from 1-5.
bobbyCounts.call(person, 1, 5);  // Bobby is counting from 1-5. (unchanged)
person.count(1, 5);              // Jimmy is counting from 1-5. (unaffected)
```

## Context Loss

1. Arrow Notation
2. Assign `this` to a variable
3. Pass `this` as an argument

```js
const cookieMonster = {
  name: 'Cookie Monster',
  eat(cookies) {
    cookies.forEach(function(cookie) {
      console.log(`${this.name} eats the ${cookie} cookie!`);
    });
  },
};

cookieMonster.eat(['Peanut Butter', 'Chocolate Chip']);
// undefined eats the Peanut Butter cookie!
// undefined eats the Chocolate Chip cookie!
```

### 1

```js
const cookieMonster = {
  name: 'Cookie Monster',
  eat(cookies) {
    cookies.forEach(cookie => {
      console.log(`${this.name} eats the ${cookie} cookie!`);
    });
  },
};
```

### 2

```js
const cookieMonster = {
  name: 'Cookie Monster',
  eat(cookies) {
    const self = this;
    cookies.forEach(function(cookie) {
      console.log(`${self.name} eats the ${cookie} cookie!`);
    });
  },
};
```

### 3

```js
const cookieMonster = {
  name: 'Cookie Monster',
  eat(cookies) {
    cookies.forEach(function(cookie) {
      console.log(`${this.name} eats the ${cookie} cookie!`);
    }, this);
  },
};
```

# Scope and Closures

## Higher-Order Functions

- **Higher-Order Functions** are functions that either accept a function as an argument, return an argument after invocation, or both. This is made possible by JavaScript's handling of functions as *first-class objects*, enabling functions to be passed around and referenced by variables throughout the program. Programmers can take advantage of these higher-order functions by declaring variables within the function's scope, creating a *closure* that can retain desired references and hide data from the rest of the program.

```js
function magicNumber(num) {
  return function() {
    return num;
  };
}

const luckyNumberSeven = magicNumber(7);
const luckyNumberFive = magicNumber(5);
luckyNumberSeven();  // 7
luckyNumberFive();   // 5
```
>Even after the invocation of `magicNumber` on line 9, the anonymous function returned and assigned from it still maintains a reference to `num` within the function body due to a closure. This enables its reference to remain accessible when invoking `luckyNumberSeven` on line 10.

## Private Data

- *Closures* provide the ability to hide data and functionality from a returned object

- Hide Functionality
```js
function shootArrow() {
  let arrows = 3;

  return function() {
    if (!arrows) return console.log('Empty');

    arrows--;
    console.log(`You have ${arrows} left`);
  }
}

const fireBow1 = shootArrow();
const fireBow2 = shootArrow();

fireBow1(); // You have 2 left
fireBow1(); // You have 1 left

fireBow2(); // You have 2 left

fireBow1(); // You have 0 left
fireBow1(); // Empty
```

## IIFEs

- **Immediately Invoked Function Expressions** (IIFEs) are functions that are immediately invoked upon defintion, allowing an isolated scope containing variables and functions to be made and executed without fear of polluting the global scope.
- IIFEs can only be invoked using a function expression.

```js
const generateTicket = (function() {
  let ticket = 1;

  return function() {
    return ticket++;
  };
})();

console.log(generateTicket());  // 1
console.log(generateTicket());  // 2
console.log(generateTicket());  // 3
```

## Partial Function Application

- **Partial Function Application** is the process in which a function is defined that calls a second function, accepting less arguments than that function expects. This is achieved through the use of pre-determined values to use as the remaining arguments upon invocation of the partial function.

- "Partial function application refers to the creation of a function that can call a second function with fewer arguments than the second function expects."
- "Partial function application requires a reduction in the number of arguments you have to provide when you call a function."

```js
function greet(greeting, person) {
  console.log(greeting + ', ' + person);
}

function greetingGenerator(greeting) {
  return function(person) {
    greet(greeting, person);
  }
}

let sayHello = greetingGenerator('Hello');
let sayGoodbye = greetingGenerator('Goodbye');

sayHello('Derek');   // Hello, Derek
sayGoodbye('Josh');  // Goodbye, Josh
```

