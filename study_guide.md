# JS229 'Object Oriented JavaScript' Study Guide

## Navigation

- [Objects]()
    - [Organizing Code]()
    - [Object Factories]()
- [Execution Context]()
    - [Implicit Execution Context]()
    - [Explicit Execution Context]()
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

## Reading

- JavaScript Weekly: Making Sense of Closures 
    - https://medium.com/launch-school/javascript-weekly-making-sense-of-closures-daa2e0b56f88
- JavaScript Weekly: Understanding Links on the Object Prototype Chain
    - https://medium.com/launch-school/javascript-weekly-understanding-links-on-the-object-prototype-chain-12962f05e149
- JavaScript Weekly: An Introduction to First-Class Functions
    - https://medium.com/launch-school/javascript-weekly-an-introduction-to-first-class-functions-9d069e6fb137
- JavaScript Weekly: What in the World is this?!
    - https://medium.com/launch-school/what-in-the-world-is-this-be803a85ed47

# Scope and Closures

## Higher-Order Functions

- **Higher-Order Functions** are functions that either accept a function as an argument, return an argument after invocation, or both. This is made possible by JavaScript's handling of functions as *first-class objects*, enabling functions to be passed around and referenced by variables throughout the program. Programmers can take advantage of these higher-order functions by declaring variables within the function's scope, creating a *closure* that can retain desired references and hide data from the rest of the program.

```js
function magicNumber() {
  const num = 7;

  return function() {
    return num;
  };
}

const luckyNumberSeven = magicNumber();
luckyNumberSeven();  // 7
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

