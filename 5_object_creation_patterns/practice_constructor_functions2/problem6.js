function neww(constructor, args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);

  return typeof result === 'object' ? result : obj;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);

john.greeting();          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}