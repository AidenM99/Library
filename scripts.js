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
const filterButtons = document.querySelectorAll(".filter-button");
const modalButton = document.querySelector(".modal-button");


let firstLoad = true;


let myLibrary;


window.addEventListener("load", () => {
    retrieveStorage();
    updateStatistics();
    firstLoad = false;
});


function populateStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};


function retrieveStorage() {
    if (localStorage.getItem("myLibrary")) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
        myLibrary = [];
    }
    updateTable();
};


class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    };
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

    // Change 'i' value if loading from local storage
    if (firstLoad) {
        i = 0;
    } else {
        i = myLibrary.length - 1;
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

// Count amount of books with 'read' and 'not read' in library array
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
    //Target first 'td' in specified row to get book title and locate it in library array to retrieve obj index
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
        updateFilters();
    };
});


filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        updateFilters(event, button);
    })
});


function updateFilters(event, button) {
    let filter;

    // 'event' and 'button' only passed if function is called from filter buttons
    if (event) {
        filter = event.target.id;
    } else {
        for (i = 0; i < filterButtons.length; i++) {
            if (filterButtons[i].classList.contains("active")) {
                filter = filterButtons[i].id;
            }
        }
    };

    if (button) {
        for (i = 0; i < filterButtons.length; i++) {
            filterButtons[i].classList.remove("active");
        }
        button.classList.add("active");
    };

    const tableItem = document.querySelectorAll(".table-item");

    tableItem.forEach(item => {
        const readButtonText = item.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent; // Retrieve text content of read buttons
        if (filter === "all") {
            item.style.display = "table-row";
        } else if (readButtonText == filter) {
            item.style.display = "table-row";
        } else {
            item.style.display = "none";
        }
    });
};


submit.addEventListener("click", () => {
    if (bookField.value === "" || authorField.value === "") {
        return;
    };
    addBookToLibrary();
    bookField.value = "";
    authorField.value = "";
    readField.checked = false;
});


modalButton.addEventListener("click", () => {
    modal.style.display = "flex";
});


newBookButton.addEventListener("click", () => {
    modal.style.display = "flex";
});


closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal if background is clicked
document.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-content") && !event.target.classList.contains("new-book-button") && !event.target.classList.contains("modal-button")) {
        modal.style.display = "none";
    }
});

