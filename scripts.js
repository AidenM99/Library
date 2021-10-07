const bookField = document.getElementById("book");
const authorField = document.getElementById("author");
const readField = document.getElementById("read");
const submit = document.getElementById("submit");
const table = document.querySelector(".book-table")

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
    updateTable(title, author);
};

submit.addEventListener("click", () => {
    addBookToLibrary();
});

function updateTable(title, author) {
        const newRow = document.createElement("TR");
        table.append(newRow);
        for (i=myLibrary.length-1; i<=myLibrary.length; i++) {
            table.innerHTML += 
            "<tr>" + "<td>" + myLibrary[i].title  + "</td>" +
            "<td>" + myLibrary[i].author  + "</td>" +
            "<td>" + myLibrary[i].read  + "</td>" +
            "<td>" + myLibrary[i].title  + "</td>" +
            "</tr>"
        }
};



