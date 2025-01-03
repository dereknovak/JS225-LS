function neww(constructor, args) {
  const self = Object.create(constructor, args);
  self.constructor = constructor;

  constructor.call(self, ...args);
  console.log(self);

  return self;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);

console.log(Object.getPrototypeOf(john).prototype.hasOwnProperty('greeting'));

john.greeting;          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}

// INCOMPLETE