function makeHello(names) {
  return function() {
    console.log("Hello, " + names[0] + " and " + names[1] + "!");
  };
}

let helloSteveAndEdie = makeHello(["Steve", "Edie"]);

// So long as `helloSteveAndEdie` is not reassigned, it will continue to reference
// ['Steve', 'Edie'] as the returned function includes `names` in its closure.