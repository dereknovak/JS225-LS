let a = [1];

function add(b) {
  a = a.concat(b); // [1] is eligable after executing this line
}

function run() {
  let c = [2];
  let d = add(c);
}

run(); // [2] is eligable after invocation of `run` is complete

// [1, 2] is only eligable after the program ends, as `a` is a global variable that references `[1, 2]` by the end of the snippet.