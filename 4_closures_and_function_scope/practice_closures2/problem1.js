function makeMultipleLister(num) {
  return function() {
    for (let multiple = num; multiple < 100; multiple += num) {
      console.log(multiple);
    }
  }
}

let lister = makeMultipleLister(13);
lister();