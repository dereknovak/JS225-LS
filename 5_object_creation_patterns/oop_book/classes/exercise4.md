Using the solution to the previous exercise, demonstrate that cars and boats are both instance objects of the `Vehicle` class, that cars are instance objects of the `Car` class, but boats are not instance objects of the `Car` class.

```js
console.log(car instanceof Vehicle && boat instanceof Vehicle); // true
console.log(car instanceof Car);                                // true
console.log(boat instanceof Car === false);                     // true
```