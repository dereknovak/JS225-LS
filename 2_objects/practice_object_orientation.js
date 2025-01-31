function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    describe() {
      console.log(`Name: ${this.name}\n` +
                  `ID: ${this.id}\n` +
                  `Price: ${this.price}\n` +
                  `Stock: ${this.stock}`
      );
    },

    setPrice(newPrice) {
      if (newPrice < 0) {
        console.log('New price must be a non-negative value.');
        return;
      }

      return this.price = newPrice;
    },
  };
}

const scissors = createProduct(0, 'Scissors', 8, 10);
const drill = createProduct(1, 'Cordless Drill', 15, 45);
const hammer = createProduct(2, 'Soft-Mallet Hammer', 12, 30);
const binder = createProduct(3, '5-Inch Binder', 5, 35);