function makeList() {
  return {
    items: [],

    list() {
      if (!this.items.length) return console.log('The list is empty.');

      this.items.forEach(item => {
        console.log(item);
      });
    },

    add(item) {
      const idx = this.items.indexOf(item);

      if (idx === -1) {
        this.items.push(item);
        console.log(`${item} added!`);
      } else {
        console.log(`${item} already exists.`);
      }
    },

    remove(item) {
      const idx = this.items.indexOf(item);

      if (idx !== -1) {
        this.items.splice(item, 1);
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