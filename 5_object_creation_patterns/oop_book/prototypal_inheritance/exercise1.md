This exercise re-examines exercise 1 from the previous chapter. In that exercise, you wrote a class to instantiate smartphone objects. In this exercise, we'll rewrite that solution using the constructor/prototype pattern.

Using the constructor/prototype pattern, create a type that represents smartphones. Each smartphone should have a brand, model, and release year. Add methods that display the smartphone's information and check its battery level. Create objects that represent the following two smartphones:

Brand	  Model	      Release Year
Apple	  iPhone 12	  2020
Samsung	Galaxy S21	2021

```js
function Smartphone(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

Smartphone.prototype.displayInfo = function() {
  console.log(`${this.year} ${this.brand} ${this.model}`);
}

Smartphone.prototype.batteryLevel = function() {
  console.log('Battery level is Full!');
}

const iPhone = new Smartphone('Apple', 'iPhone 12', 2020);
const galaxy = new Smartphone('Samsung', 'Galaxy S21', 2021);

iPhone.displayInfo();
galaxy.displayInfo();
```