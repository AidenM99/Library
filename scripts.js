const bookField = document.getElementById("book");
const authorField = document.getElementById("author");
const readField = document.getElementById("read-yet");
const submit = document.getElementById("submit");
const table = document.querySelector(".book-table");
const readButton = document.querySelector(".read-button");
const newBookButton = document.querySelector(".new-book-button");
const closeButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal-bg");
const totalBooks = document.querySelector(".total-books");
const readBooks = document.querySelector(".completed-books");
const unreadBooks = document.querySelector(".incomplete-books");
const filterButtons = document.querySelectorAll(".filter");
let firstLoad = true;


let myLibrary = [];


window.addEventListener("load", () => {
    retrieveStorage();
    updateStatistics();
    firstLoad = false;
});


function populateStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};


function retrieveStorage() {
    var retrieveObject = JSON.parse(localStorage.getItem("myLibrary"));
    myLibrary = retrieveObject;
    updateTable();
};


function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
};


function addBookToLibrary() {
    const title = bookField.value;
    const author = authorField.value;
    const read = checkRead();
    const newBook = new Book(title, author, read);
    myLibrary.push(newBook);
    updateTable();
    populateStorage();
};


function checkRead() {
    if (readField.checked) {
        return "Read";
    };
    return "Not Read";
};


function updateTable() {
    const newRow = document.createElement("TR");

    table.append(newRow);
    if (firstLoad) {
        i = 0;
    } else {
        i = myLibrary.length-1;
    };

    for (i; i < myLibrary.length; i++) {
        table.innerHTML += ` 
            <tr class="table-item"><td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td><button class="read-button button">${myLibrary[i].read}</button></td>
            <td><button class="delete-button button">Delete</button></td>
            </tr>
        `
    };
    updateStatistics();
};


function updateStatistics() {
    let completed = 0;
    let incomplete = 0;

    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === "Read") {
            completed++;
        }

        if (myLibrary[i].read === "Not Read") {
            incomplete++;
        }
    };

    totalBooks.textContent = `Total Books: ${myLibrary.length}`;
    readBooks.textContent = `Read Books: ${completed}`;
    unreadBooks.textContent = `Unread Books: ${incomplete}`;
};


table.addEventListener('click', (event) => {
    const row = event.target.parentNode.parentNode
    const titleCell = row.getElementsByTagName("td")[0].textContent;
    const bookIndex = myLibrary.findIndex(x => x.title === titleCell);

    if (event.target.classList.contains("delete-button")) {
        row.remove();
        myLibrary.splice(bookIndex, 1);
        updateStatistics();
        populateStorage();
    };

    if (event.target.classList.contains("read-button")) {
        if (event.target.textContent === "Read") {
            event.target.textContent = "Not Read";
            myLibrary[bookIndex].read = "Not Read";
        } else {
            event.target.textContent = "Read";
            myLibrary[bookIndex].read = "Read";
        }
        updateStatistics();
        populateStorage();
    };
});


filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const filter = event.target.id;
        const tableItem = document.querySelectorAll(".table-item");

        for (i = 0; i < filterButtons.length; i++) {
            filterButtons[i].classList.remove("active");
        };

        button.classList.add("active");

        tableItem.forEach(item => {
            if (filter === "all") {
                item.style.display = "table-row";
            } else if (item.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent == filter) {
                item.style.display = "table-row";
            } else {
                item.style.display = "none";
            }
        })
    })
});


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


newBookButton.addEventListener("click", () => {
    modal.style.display = "flex";
});


closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});


document.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-content") && !event.target.classList.contains("new-book-button")) {
        modal.style.display = "none";
    }
});

