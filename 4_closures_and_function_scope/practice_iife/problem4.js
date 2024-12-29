function function countdown(count) {
  (function(start) {
    for (let num = start; num >= 0; num--) {
      console.log(num);
    }

    console.log('Done!');
  })(7);
}

countdown(7);