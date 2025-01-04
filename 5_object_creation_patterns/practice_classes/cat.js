class Cat {
  constructor(n = 'Kitty') {
    this.name = n;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
  
  greet() {
    console.log(`Hello! My name is ${this.name} and I'm a cat!`);
  }

  rename(newName) {
    return this.name = newName;
  }
}

const kitty = new Cat('Winston');
kitty.greet();
kitty.rename('Oscar');
kitty.greet();
Cat.genericGreeting();
