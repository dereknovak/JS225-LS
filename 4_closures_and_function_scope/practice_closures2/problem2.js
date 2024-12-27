function makeCalculator() {
  let num = 0;

  const adder = function(amount) {
    num += amount;
    console.log(num);
  };

  const subtracter = function(amount) {
    num -= amount;
    console.log(num);
  };

  return [adder, subtracter];
}

let [add, subtract] = makeCalculator();

add(1);
add(42);
subtract(39);
add(6);