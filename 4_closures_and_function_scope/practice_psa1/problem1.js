function greet(message, name) {
  console.log(`${message[0].toUpperCase() + message.slice(1)}, ${name}!`);
}

greet('howdy', 'Joe');
greet('good morning', 'Sue');