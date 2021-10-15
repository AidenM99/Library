const bookField = document.getElementById("book");
const authorField = document.getElementById("author");
const readField = document.getElementById("read");
const submit = document.getElementById("submit");
const table = document.querySelector(".book-table");
const readButton = document.querySelector(".read-button");
const newBookButton = document.querySelector(".new-book-button");
const closeButton = document.querySelector(".close-button")
const modal = document.querySelector(".modal-bg");

let myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
};

function addBookToLibrary() {
    const title = bookField.value;
    const author = authorField.value;
    let read;
    if (readField.checked) {
        read = "Read"
    }else{
        read = "Not Read"
    }
    const newBook = new Book(title, author, read);
    myLibrary.push(newBook);
    updateTable();
};

submit.addEventListener("click", () => {
    if (bookField.value === "" || authorField.value === "") {
        alert("Please fill in both fields");
        return;
    };
    addBookToLibrary();
    bookField.value = "";
    authorField.value = "";
    readField.checked = false;
}); 

function updateTable() {
    const newRow = document.createElement("TR");
    table.append(newRow);
    for (i = myLibrary.length - 1; i < myLibrary.length; i++) {
        table.innerHTML +=
            "<tr>" + "<td>" + myLibrary[i].title + "</td>" +
            "<td>" + myLibrary[i].author + "</td>" +
            "<td>" + `<input type=button class="read-button button" value="${myLibrary[i].read}"></button>` + "</td>" +
            "<td>" + `<input type=button class="delete-button button" value="delete"></button>` + "</td>" +
            "</tr>"
    }
};

table.addEventListener('click', (event) => {
    const row = event.target.parentNode.parentNode
    const titleCell = row.getElementsByTagName("td")[0].textContent;
    const bookIndex = myLibrary.findIndex(x => x.title === titleCell);

    if (event.target.classList.contains("delete-button")) {
        row.remove();
        myLibrary.splice(bookIndex, 1);
    }

    if (event.target.classList.contains("read-button")) {
        if (event.target.value === "Read") {
            event.target.value = "Not read";
            myLibrary[bookIndex].read = "Not Read";
            return;
        }

        event.target.value = "Read"
        myLibrary[bookIndex].read = "Read";
        return;
    }
});

newBookButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-content") && !event.target.classList.contains("new-book-button")) {
        modal.style.display="none";
    }
});

