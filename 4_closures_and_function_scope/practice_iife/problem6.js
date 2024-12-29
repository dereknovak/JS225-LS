function countdown(count) {
  (function logNum(n) {
    console.log(n);

    if (!n) return console.log('Done!');
    return logNum(n - 1);
  })(count);
}

countdown(7);
