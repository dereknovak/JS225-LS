function greet(message, name) {
  console.log(`${message[0].toUpperCase() + message.slice(1)}, ${name}!`);
}

function greetingGenerator(message) {
  return function(name) {
    greet(message, name);
  }
}

const sayHello = greetingGenerator('hello');
const sayHi = greetingGenerator('hi');

sayHello('Brandon');
sayHi('Sarah');