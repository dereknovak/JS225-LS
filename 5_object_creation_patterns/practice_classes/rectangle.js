class Rectangle {
  #width;
  #length;

  constructor(w, l) {
    this.#width = w;
    this.#length = l;
  }

  getWidth() {
    return this.#width;
  }

  getLength() {
    return this.#length;
  }

  getArea() {
    return this.#width * this.#length;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25