function subtract(a, b) {
  return a - b;
}

function makeSub() {
  return function(num) {
    return subtract(num, 5);
  };
}

const sub5 = makeSub();

console.log(sub5(10)); // 5
console.log(sub5(20)); // 15