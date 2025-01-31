let Aircraft = {
  takeOff() {
    console.log(`${this.name} is taking off!`);
  },

  land() {
    console.log(`${this.name} is landing!`);
  },
}

let cessna152 = Object.assign({}, Aircraft);

cessna152.name = 'Cessna 152';
cessna152.fuelCapacity = 24.5;
cessna152.cruisingSpeed = 111;

console.log(cessna152.name);
console.log(cessna152.fuelCapacity);
console.log(cessna152.cruisingSpeed);
cessna152.takeOff();
cessna152.land();