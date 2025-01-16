(function() {
  const _ = function(element) {
    const u = {
      first() {
        return element[0];
      },

      last() {
        return element[element.length - 1];
      },

      without() {
        return element.filter(value => {
          return ![...arguments].includes(value);
        });
      },

      lastIndexOf(value) {
        return element.lastIndexOf(value);
      },

      sample(values) {
        if (!values) return element[0];

        const samples = [];
        for (let i = 1; i <= values; i++) {
          samples.push(element[i]);
        }

        return samples;
      },

      findWhere(obj2) {
        const singleMatches = [];

        return element.find(obj1 => {
          let matches = 0;
          
          for (let prop in obj1) {
            if (obj1[prop] === obj2[prop]) matches++;
            if (matches === 1) singleMatches.push(obj1);
            if (matches > 1) return true;
          }
        }) ?? singleMatches[0];
      },
    };

    return u;
  };

  _.range = function() {
    const array = [];

    const args = [...arguments];
    const start = (args.length === 1 ? 0 : args[0]);
    const end = (args.length === 1 ? args[0] : args[1]);

    for (let i = start; i < end; i++) {
      array.push(i);
    }

    return array;
  };

  window._ = _;
})();