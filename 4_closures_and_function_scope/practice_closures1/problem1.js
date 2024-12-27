// For the first attempt at this problem, I reassigned `num1` instead of using
// the separate `i` variable, which caused the reference to be carried between
// function invocations. This makes sense due to the closure containing the
// variable, as it is required by the anonymous function.

function makeCounterLogger(num1) {
  return function(num2) {
    let i = num1;
    while (i !== num2) {
      console.log(i);

      if (i < num2) {
        i++;
      } else {
        i--;
      }
    }

    console.log(i);
  };
}

const countLog = makeCounterLogger(5);
countLog(8);
countLog(2);