let myNum = 1;

function foo() {
  let myArr = ['this is an array'];
  // what is eligible for GC here?
      // => Nothing is eligable yet
}

foo();

// what is eligible for GC here?
    // => `['this is an array']` is eligable as the `foo` invocation is complete, so no variable reference it

// more code