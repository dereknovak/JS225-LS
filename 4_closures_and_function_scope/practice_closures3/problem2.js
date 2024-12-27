function makeList() {
  const items = [];

  return {
    list() {
      if (!items.length) return console.log('The list is empty.');

      items.forEach(item => {
        console.log(item);
      });
    },

    add(item) {
      const idx = items.indexOf(item);

      if (idx === -1) {
        items.push(item);
        console.log(`${item} added!`);
      } else {
        console.log(`${item} already exists.`);
      }
    },

    remove(item) {
      const idx = items.indexOf(item);

      if (idx !== -1) {
        items.splice(item, 1);
        console.log(`${item} removed!`);
      } else {
        console.log(`${item} does not exist!`);
      }
    },
  };
}

let list = makeList();
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn
console.log(list.items);
// undefined