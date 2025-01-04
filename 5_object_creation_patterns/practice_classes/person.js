class Person {
  constructor(name) {
    this.name = name;
  }

  greeting(text) {
    return `Hello, I'm ${this.name}. It's very nice to meet you.`;
  }
}

class Shouter extends Person {
  greeting() {
    return super.greeting().toUpperCase();
  }
}

let person = new Person("Jane");
let shouter = new Shouter("Bob");

console.log(person.greeting()); // Hello, I'm Jane. It's very nice to meet you.
console.log(shouter.greeting()); // HELLO, I'M BOB. IT'S VERY NICE TO MEET YOU.