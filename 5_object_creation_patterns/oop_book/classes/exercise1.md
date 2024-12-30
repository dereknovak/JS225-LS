This exercise re-examines exercise 2 from the previous chapter. In that exercise, you wrote an object factory to instantiate objects that represent smartphones. In this exercise, we'll rewrite that factory using a class.

Write a class that can be used to instantiate objects that represent smartphones. Each smartphone should have a brand, model, and release year. Add methods to check the battery level and to display the smartphone's information. Create objects that represent the following 2 smartphones:

Brand	  Model	      Release Year
Apple	  iPhone 12	  2020
Samsung	Galaxy S21	2021

```js
class SmartPhone {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  batteryLevel() {
    console.log('Current battery level is full');
  }

  info() {
    console.log(`This smartphone is a ${this.year} ${this.brand} ${this.model}!`);
  }
}

const apple = new SmartPhone('Apple', 'iPhone 12', 2020);
const android = new SmartPhone('Samsung', 'Galaxy S21', 2021);

apple.batteryLevel();
android.info();
```