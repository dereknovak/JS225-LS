# JS229 'Object Oriented JavaScript' Study Guide

## Navigation

- [Objects]()
    - [Organizing Code]()
    - [Object Factories](#object-factories)
- [Execution Context](#execution-context)
    - [this](#this)
    - [Implicit Execution Context](#implicit-context)
    - [Explicit Execution Context](#execution-context)
    - [Context Loss](#context-loss)
    - [Lexical Scope](#lexical-scope)
- [Scope and Closures](#scope-and-closures)
    - [Higher-order Functions](#higher-order-functions)
    - [Private Data](#private-data)
    - [Garbage Collection](#garbage-collection)
    - [IIFEs](#iifes)
    - [Partial Function Application](#partial-function-application)
- [Object Creation Patterns](#object-creation-patterns)
    - [Constructor Function](#constructor-functions)
        - [new keyword](#new-keyword)
    - [Pseudo-Classical Pattern](#pseudo-classical-pattern)
        - [Prototype Property](#prototype-property)
        - [Prototype](#prototype)
        - [Constructor Property](#constructor-property)
        - [Inheritance](#inheritance)
    - [Class Syntax](#class-syntax)
        - [Constructor Method](#constructor-method)
        - [Instance Methods](#instance-methods)
        - [Static Properties](#static-properties)
        - [Getters](#getters)
        - [Setters](#setters)
    - [Encapsulation](#encapsulation)
    - [Prototypal Objects]()
    - [Behavior Delegation]()
        - [Prototype Chain](#prototype-chain)
        - [Overriding Behavior](#overriding-behavior)
        - [super](#super)
- [Modules](#modules)
    - [CommonJS](#commonjs)
        - [Variables](#variables)

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

# Objects

## Object Factories

- **Object Factories**, also known as *factory functions*, are functions that return copies of an object with unique state, reducing overall redundancy in the codebase.

### Pros
- Reduces redundancy in code, especially when many similar objects are used.
- Simple and easy to understand
- Can use private data via closures

### Cons
- Cannot determine whether an object was built from an object factory
- All methods shared by the objects are copies of the original function, increasing memory usage.
- Inheritance is not straightforward

```js
function makeCar(make, model) {
  return {
    make,
    model,

    honk() {
      return 'Beep!';
    },
  }
}

const honda = makeCar('Honda', 'Civic');
const toyota = makeCar('Toyota', 'Camry');
```

# Execution Context

## this

- The reserved `this` keyword represents the *execution context*, or the object that is currently used for context, at the point of code execution.

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

- The **implicit execution context** is the context (`this`) that is set by default when a function or method is invoked without explicit context. While method invocations will typically reference the object in which the method is located, functions utilize the global object (or `undefined` in strict mode).

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

- **Explicit execution context** can be provided to a function or method invocation by using either `call`, `apply`, or `bind` to invoke it with *explicit* context. Rather than using the default context, one is provided as an argument to these methods that will override the implicit context.

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

- Scenarios
1. Invoking a function that has been removed from its original object
2. Invoking a nested function
3. Invoking a function passed as an argument
4. Invoking a constructor function with the `new` keyword

- Fixes
1. Arrow Notation
2. Assign `this` to a variable
3. Optional `thisArg` argument
4. Explicit Context Execution

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

### Arrow Notation

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

### Variable Assignment

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

### Optional thisArg

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

### Explicit Execution Context

```js
const cookieMonster = {
  name: 'Cookie Monster',
  eat(cookies) {
    const logCookies = function(cookie) {
      console.log(`${this.name} eats the ${cookie} cookie!`);
    }.bind(this);

    cookies.forEach(logCookies);
  },
};

cookieMonster.eat(['Peanut Butter', 'Chocolate Chip']);
```

## Lexical Scope

### Closures

- **Closures** retain access to relevant variables within the *lexical scope* of an object at the point of definition, allowing it to be carried alongside the object and accessed at a later time. Even after invocation of the enclosing function is complete, so long as a reference to the object with the closure remains, the closure and its references do as well.

```js
function makeSandwich() {
  const ingredients = ['Bread', 'Turkey', 'Cheese', 'Mayonaise'];

  return {
    includes(item) {
      return ingredients.includes(item);
    },
  };
}

const sandwich = makeSandwich();
sandwich.includes('Bread');   // true
sandwich.includes('Turkey');  // true
sandwich.includes('Ham');     // false
```
>Although invocation of `makeSandwich` is completed on line 11, the returned object literal from the function remains as a reference from `sandwich`. Because the `includes` method of this object relies on the `ingredients` array, it is included in the method's closure, allowing the array to be referenced at a later time.

### Arrow Functions

- Arrow functions do *not* have their own `this` binding; instead, they inherit execution context from the enclosing function where they are defined.

```js
const chad = {
  name: 'Chad',
  say() {
    const hello = () => console.log(`Hello, I'm ${this.name}.`);
    hello();
  },
}

const chuck = {
  name: 'Chuck',
}

chuck.say = chad.say;

chad.say();   // Hello, I'm Chad.
chuck.say();  // Hello, I'm Chuck.
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

- *Closures* provide the ability to hide data and functionality from a returned object.

- Hide Functionality
```js
function newQuiver() {
  let arrows = 3;

  return function() {
    if (!arrows) return console.log('Empty');

    arrows--;
    console.log(`You have ${arrows} left`);
  }
}

const fireBow1 = newQuiver();
const fireBow2 = newQuiver();

fireBow1(); // You have 2 left
fireBow1(); // You have 1 left

fireBow2(); // You have 2 left

fireBow1(); // You have 0 left
fireBow1(); // Empty
```

## Garbage Collection

- Data is eligable for **garbage-collection**, a built-in JavaScript mechanism that frees up memory space by removing obsolete information in memory, once all references to the data within the program have been severed.

- Variables that are referenced within a closure cannot be eligable for garbage-collection.

```js
function makeCounter() {
  let count = 1;  // Not garbage collected until `counter` is reassigned

  return function() {
    console.log(count++);
  }
}

const counter = makeCounter();
counter();  // 1
counter();  // 2
```
> Although the invocation of `makeCounter` is concluded on line 9, the anonymous function returned from the invocation is assigned to `counter`. Because the anonymous function relies on `count` in its scope, the variable is added to its closure and is therefore not eligable for garbage collection.

## IIFEs

- **Immediately Invoked Function Expressions** (IIFEs) are functions that are immediately invoked upon defintion, allowing an isolated scope containing variables and functions to be made and executed without polluting the global scope.
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

### Private Scope

https://launchschool.com/lessons/0b371359/assignments/f27fd52c

- IIFEs are useful in creating a *private scope* that allows for code execution that will not be affected by previous or further operations, such as object mutation/reassignment or naming collisions.

```js
// Lots of code

(function() {
  const derek = {
    name: 'Derek',
    age: 30,
  }

  console.log(`My name is ${derek.name} and I'm ${derek.age} years old.`);
})();

// More code
```
>Because an *anonymous function* is immediately invoked within the codebase, a new scope is created that contains its own version of `derek`, allowing for an isolated code execution that will not pollute nor cause any potential errors from variables with the same name.

### Private Data

https://launchschool.com/lessons/0b371359/assignments/470d67c3

- Because IIFEs immediately create and execute a new function scope, a closure can be created that forms private data, restricting access to desired information from outside of the anonymous function.

```js
const overdueBooks = (() => {
  const books = ['Moby Dick', 'Hunger Games', 'Mistborn'];

  return {
    count() {
      return books.length; 
    },

    add(bookName) {
      books.push(bookName);
    },
  }
})();

overdueBooks.count();  // 3
overdueBooks.add('Project: Hail Mary');
overdueBooks.count();  // 4
```
>Because `overdueBooks` references an IIFE, the `books` array is made private as only the returned object contains references to it via the `count` and `add` methods. The user outside of the object cannot directly reference `books`, however both methods can access the array as the `books` pointer is included in their closures.

## Partial Function Application

- **Partial Function Application** is the process in which a function is defined that calls a second function, accepting less arguments than that function expects. This is achieved through the use of pre-determined values to use as the remaining arguments upon invocation of the partial function.

- "Partial function application refers to the creation of a function that can call a second function with fewer arguments than the second function expects."
- "Partial function application requires a reduction in the number of arguments you have to provide when you call a function."

```js
function greet(greeting, person) {              // Primary
  console.log(greeting + ', ' + person);
}

function greetingGenerator(greeting) {          // Generator
  return function(person) {
    greet(greeting, person);
  }
}

let sayHello = greetingGenerator('Hello');      // Applicator
let sayGoodbye = greetingGenerator('Goodbye');

sayHello('Derek');   // Hello, Derek
sayGoodbye('Josh');  // Goodbye, Josh
```

# Object Creation Patterns

## Constructor Functions

- **Constructor Functions** are functions that are used to instantiate objects that inherit similar attributes and behaviors.

```js
function Musician(instrument) {
  this.instrument = instrument;
}

const derek = new Musician('clarinet');
```
>The constructor function `Musician` is used to instantiate the `derek` object.

### new Keyword

- While the `new` keyword used with constructor functions is not manditory, it is *highly recommended* as its absence may cause unexpected results.

- The `new` keyword instructs JavaScript to do the following:

1. Creates a new object that inherits from the constructor function's prototype property.
2. Binds the new object to the `this` keyword
3. Return the object after invocation

```js
function Musician(instrument) {
  this.instrument = instrument;
}

// Invoked with the `new` keyword

function Musician(instrument) {
  const that = Object.create(Musician.prototype);
  that.instrument = instrument;
  return that;
}
```

## Pseudo-Classical Pattern

- The **Pseudo-Classical Pattern** in JavaScript is a combination of the *Constructor Pattern* and the *Prototype Pattern* by instantiating objects via constructor functions and developing attributes and behaviors through inheritance.

```js
function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}

Musician.prototype.play = function() {
  console.log(`${this.name} is playing their ${this.instrument}!`);
}

function Clarinetist(name, model) {
  Musician.call(this, name, 'clarinet');
  this.model = model;
}

Object.setPrototypeOf(Clarinetist.prototype, Musician.prototype);

const derek = new Clarinetist('Derek', 'Buffet R13');
derek.play();  // Derek is playing their clarinet!
```

### Prototype Property

- The **prototype property** is a built-in property default with *any* JavaScript function. This property houses all shared behaviors for the constructor function, a `[[Prototype]]` property that points to its own prototype, and a `constructor` property that points back to the constructor function itself.

- Arrow function do not have a prototype property.
- Object literals do not have a prototype property

```js
function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}

Musician.prototype.play = function() {
  console.log(`${this.name} is playing their ${this.instrument}!`);
};

/*
Musician (Constructor) = {
  prototype: {
    play: [Function: play],
    [[Prototype]]: Object.prototype,
    constructor: [Function: Musician],
  },
}

Musician (instance) = {
  name: (value),
  instrument: (value),
  [[Prototype]]: Musician.prototype
}
*/
```

### [[Prototype]]

- `[[Prototype]]` is an internal slot built-in with every object in JavaScript that references the object's prototype, allowing for *prototype chaining*.
- Use `Object.getPrototypeOf` to find immediate relative on prototype chain.
- Use `Object.prototype.isPrototypeOf` to see if an object is anywhere on the prototype chain.
- Use `Object.prototype.hasOwnProperty` to determine if the origin of a property belongs to the calling object.

- Prototype references:
1. Constructor Function => Function.prototype
2. Constructor.prototype => Parent.prototype
3. Constructor Instance => Constructor.prototype

```js
function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}

Object.getPrototypeOf(Musician);                           // Function.prototype;
Object.getPrototypeOf(Musician.prototype);                 // Object.prototype;
Object.getPrototypeOf(new Musician('Derek', 'clarinet'));  // Musician.prototype;
```

### Constructor Property

- The `constructor` property is used to determine the function that builds the object.

- Constructor references:
1. Constructor Function => `[Function: Function]`
2. Constructor.prototype => Constructor Function
3. Constructor Instance => Constructor Function

```js
function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}

Musician.constructor;                           // [Function: Function]
Musician.prototype.constructor;                 // [Function: Musician]
new Musician('Derek', 'clarinet').constructor;  // [Function: Musician]
```

### Inheritance

- To inherit the attributes of a parent class, we can use the `call` function and include `this` as its context. This will invoke the desired constructor function and assign all properties of `this`.

```js
function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}

function Clarinetist(name, model) {
  Musician.call(this, name, 'clarinet');
      // this.name = name;
      // this.instrument = 'clarinet'
  this.model = model;
}
```

- To inherit the behaviors of a parent class, we must assign the prototype property of the given constructor function to the desired constructor function's prototype property.

```js
Object.setPrototypeOf(Clarinetist.prototype, Musician.prototype);

//  Clarinetist {
//    prototype: {
//      Musician.prototype: {play}
//    }
//  }
```
>Clarinetist.prototype => Musician.prototype => play()

## Class Syntax

- Because JavaScript Object Oriented Programming utilizes prototypal inheritance rather than class inheritance, the `class` keyword actually acts as *syntactic sugar* to make it more approachable to programmers more familiar with classical syntax from other languages.

```js
class Musician {
  constructor(name, instrument) {
    this.name = name;
    this.instrument = instrument;
  }

  play() {
    console.log(`${this.name} is playing their ${this.instrument}!`);
  }
}

class Clarinetist extends Musician {
  constructor(name, model) {
    super(name, 'clarinet');
    this.model = model;
  }
}

const derek = new Clarinetist('Derek', 'Buffet R13');
derek.play();  // Derek is playing their clarinet!
```

### Constructor Method

- The `constructor` method is used as syntactic sugar for calling the constructor function when instantiating a new object.

```js
class Musician {
  constructor(name, instrument) {
    this.name = name;
    this.instrument = instrument;
  }
}

// Same as

function Musician(name, instrument) {
  this.name = name;
  this.instrument = instrument;
}
```

### Instance Methods

- Rather than directly assigning methods to the constructor function's prototype property, classical syntax allows programmers to add instance methods, or methods of the prototype, directly within the class structure. Under the hood, JavaScript will automatically place these methods within the prototype property, allowing for easier read code.

- Instance methods are *not* separated by comas.

```js
class Musician {
  play() {
    console.log('Playing');
  }

  breathe() {
    console.log('Breathing');
  }
}

// Same as

Musician.prototype.play = function() {
  console.log('Playing');
};

Musician.prototype.breathe = function() {
  console.log('Breathing');
};
```

### Static Properties

- JavaScript employs **static properties** by adding attributes or behaviors *directly* to the constructor function in pseudo-classical notation or by using the keyword `static` in classical notation.

```js
// Pseudo-Classical

function Musician() {
}

Musician.tuningNote = 'A';
Musician.transpose = function(music, startKey, endKey) {
  return 'Transposing';
}

// Classical

class Musician {
  static tuningNote = 'A';
  static transpose(music, startKey, endKey) {
    return 'Transposing';
  }
}
```

### Getters

- JavaScript classical pattern allows getters to be made to more carefully access data within a class. While the getter is defined as a method inside the class structure, it can be accessed via standard property dot notation outside of it.

```js
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get name() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

const george = new Person('George', 'Washington');
george.name;  // George Washington
```

### Setters

- JavaScript classical pattern allows for setters to be made to more carefully reassign data within a class. While the setter is defined as a method inside of the class structure, it can be employed using standard property reassignment notation.

```js
class Person {
  #age;

  constructor(age) {
    this.#age = age;
  }

  set age(newAge) {
    if (newAge > 0) {
      return this.#age = newAge;
    } else {
      throw new RangeError('Age must be greater than 0');
    }
  }
}

const bob = new Person(28);
bob.age = 29;  // 29
bob.age = -2;  // RangeError: Age must be greater than 0
```

## Encapsulation

- **Encapsulation** allows us to hide the data and functionality of an object from outside its respective class, exposing only the attributes and behaviors required by the users. In JavaScript, this can be achieved through the use of `#` alongside variable names in classical notation and with *closures* in pseudo-classical notation.

- All private properties must be dictated at the top of the class.
- The exception for attempting to access a private property will be thrown at compile time.
- Using pseudo-classical notation is less memory efficient, as a copy of the getter method is created for every child of the constructor function.

```js
// Classical Notation

class Person {
  #ssn;

  constructor(name, age, fullSSN) {
    this.name = name;
    this.age = age;
    this.#ssn = fullSSN;
  }

  get ssn() {
    return 'XXX-XX-' + String(this.#ssn).slice(5);
  }
}

const derek = new Person('Derek', 30, 123456789);
derek.name;  // Derek
derek.age;   // 30
derek.ssn;   // XXX-XX-6789
derek.#ssn;  // SyntaxError: Private field '#ssn' must be declared in an enclosing class

// Pseudo-Classical Notation

function Person(name, age, ssn) {
  this.name = name;
  this.age = age;

  this.ssn = function() {
    return 'XXX-XX-' + String(ssn).slice(5);
  }
}

const derek = new Person('Derek', 30, 123456789);
derek.name;   // Derek
derek.age;    // 30
derek.ssn();  // XXX-XX-6789
derek.ssn;    // [Function: (anonymous)]
```

## Behavior Delegation

https://launchschool.com/lessons/24a4613a/assignments/7143264c

### Prototype Chain

- The **prototype chain** is a mechanism of inheritance that JavaScript uses to determine which attributes and behaviors belong to an object. Every object has a `[[Prototype]]` property that points to a different object, providing additional functionality.
- See [Prototype](#prototype) for more info and relevant methods.

### Overriding Behavior

- When a child's method shares a name with one of the parent's method, the invocation will *override* the behavior of the parent. This is due to how JavaScript handles property lookup - it finds the first occurrence within the prototypal chain.

```js
function Animal() {
}

Animal.prototype.speak = function() {
  console.log('Animal noises');
};

function Dog() {
}

Object.setPrototypeOf(Dog.prototype, Animal.prototype);

const sparky = new Dog();
sparky.speak();  // Animal noises

Dog.prototype.speak = function() {
  console.log('Woof!');
};

sparky.speak();  // Woof!
```

### super

https://launchschool.com/books/oo_javascript/read/classes

- The `super` keyword is used to invoke the same instance method from a class's superclass.
- When used in the constructor method, only `super` is required.
- When used in any other method, `super` must be appended with the respective method.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Musician extends Person {
  constructor(name, instrument) {
    super(name);
    this.instrument = instrument;
  }

  play() {
    return 'Playing';
  }
}

class Student extends Musician {
  constructor(name, instrument, grade) {
    super(name, instrument);
    this.grade = grade;
  }

  play() {
    return super.play() + ' and Learning';
  }
}

const derek = new Student('Derek', 'clarinet', 11);
console.log(derek.play());
```
# Modules

https://launchschool.com/gists/e7d0531f

## Need to Know

- The benefits of using modules.
- How to use and create CommonJS modules.
- How CommonJS modules pass exported items to the importing module.

- **Modules** allow programmers to divide functionality of a project into multiple files within a system, allowing for better abstraction of code and a more efficient building process. Because parts of the code are isolated, developers are able to maintain multiple aspects of the codebase without any fear of conflicts.

## CommonJS

- The **CommonJS Module Syntax** is one of the oldest implementations of module support within JavaScript, utilizing the `require` keyword to import functionality from one file to another.

```js
// greet.js
function greet() {
  console.log('Hello, world!');
}

module.exports = greet;

// main.js
const greet = require('./greet');
greet();  // Hello, world!
```

### Variables

- `module` => Object that represents the current module
- `exports` => Names exported by module
- `require` => Loads a module
- `__dirname` => Absolute pathname of directory that contains module
- `__filename` => Absolute pathname of file that contains module

## Mixin

- Do not need to know for assessment.

```js
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
```

