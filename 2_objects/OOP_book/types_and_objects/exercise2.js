function Book(title, author, yearPublished) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
}

let book1 = new Book('Neuromancer', 'William Gibson', 1984);
let book2 = new Book('Doomsday Book', 'Connie Willis', 1992);

console.log(book1.title);
console.log(book1.author);
console.log(book1.yearPublished);
console.log(book2.title);
console.log(book2.author);
console.log(book2.yearPublished);