function SmartPhone(brand, model, released) {
  this.brand = brand;
  this.model = model;
  this.released = released;

  this.displayBattery = function() {
    console.log(`Your ${this.brand} ${this.model}'s battery is low!`);
  };

  this.displayInfo = function() {
    console.log(`Brand: ${this.brand}\n` +
                `Model: ${this.model}\n` +
                `Year Released: ${this.released}\n`);
  };
}

let phone1 = new SmartPhone('Apple', 'iPhone 12', 2020);
let phone2 = new SmartPhone('Samsung', 'Galaxy S21', 2021);

phone1.displayBattery();
phone2.displayBattery();

phone1.displayInfo();
phone2.displayInfo();