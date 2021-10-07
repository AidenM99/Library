const bookField = document.getElementById("book");
const authorField = document.getElementById("author");
const readField = document.getElementById("read");
const submit = document.getElementById("submit");

let myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
};

function addBookToLibrary() {
    const title = bookField.value;
    const author = authorField.value;
    const read = readField.value;
    const newBook = new Book(title, author, read);
    myLibrary.push(newBook);
};

myLibrary.forEach((book) => {

});

submit.addEventListener("click", () => {
    addBookToLibrary();
});



