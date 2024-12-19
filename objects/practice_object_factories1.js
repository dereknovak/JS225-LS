function makeCar(accelRate, brakeRate) {
  return {
    speed: 0,
    accelRate,
    brakeRate,

    accelerate() {
      this.speed += this.accelRate;
    },

    brake() {
      this.speed -= this.brakeRate;
      if (this.speed < 0) this.speed = 0;
    },
  };
}

let sedan = makeCar(8, 6);
let coupe = makeCar(12, 10);
let hatchback = makeCar(9, 7);

console.log(sedan.speed);
sedan.accelerate();
console.log(sedan.speed);
sedan.brake();
console.log(sedan.speed);
sedan.brake();
console.log(sedan.speed);
