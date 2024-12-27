function makeList() {
  const tasks = [];

  return function(task) {
    if (tasks.includes(task)) {
      const idx = tasks.indexOf(task);
      console.log(`${task} removed!`);
      tasks.splice(idx, 1);
    } else if (task) {
      tasks.push(task);
      console.log(`${task} added!`);
    } else {
      if (!tasks.length) return console.log('The list is empty.');
      tasks.forEach(element => {
        console.log(element);
      });
    }
  }
}

let list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
//read book