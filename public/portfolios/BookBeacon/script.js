 // Popup handling
let addBtn = document.querySelector(".addbtn"),
    popUp = document.getElementById("popup"),
    errorMsg = document.querySelector(".error-msg"),
    notesDiv = document.querySelector(".books");

function scrollLock() {
    document.body.style.overflow = "hidden";
}

function unlockScrollLock() {
    document.body.style.overflow = "";
}

function showPopup() {
    popUp.style.display = "block";
    const scrollY = window.scrollY;
    popUp.style.top = `calc(50% + ${scrollY}px)`;
}

function hidePopup() {
    popUp.style.display = "none";
    unlockScrollLock();
}

// Show popup when add button is clicked
addBtn.addEventListener("click", function() {
    showPopup();
    scrollLock();
});

// Handle note add or cancel actions
let addNote = document.querySelector(".add"),
    cancelNote = document.querySelector(".cancel");

// Add Book
addNote.addEventListener("click", function() {
    addBook();
});

// Cancel Book addition
cancelNote.addEventListener("click", function() {
    clearForm();
    hidePopup();
});

// Clear form inputs
function clearForm() {
    document.querySelector(".titleinput").value = "";
    document.querySelector(".authorinput").value = "";
    document.querySelector(".descriptionarea").value = "";
    errorMsg.style.display = "none";
}

// Add new book if inputs are valid
function addBook() {
    let title = document.querySelector(".titleinput").value,
        author = document.querySelector(".authorinput").value,
        description = document.querySelector(".descriptionarea").value;

    if (!title || !author || !description) {
        showError("Please fill the following information");
    } else {
        errorMsg.style.display = "none";
        addNewBookToList(title, author, description);
        clearForm();
        hidePopup();
        saveBooksToStorage(); 
    }
}

// Display error message with animation
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    errorMsg.style.animation = "none"; 
    errorMsg.offsetHeight; 
    errorMsg.style.animation = "vibrate 0.3s ease-out"; 
}

// Add a new book to the list
function addNewBookToList(title, author, description) {
    notesDiv.innerHTML += `
        <div class='container'>
            <h2 class='heading'>${title}</h2>
            <p class='author'>${author}</p>
            <p class='content'>${description}</p>
            <button class='delete' onclick="deleteBook(event)">Delete</button>
        </div>
    `;
}

// Delete a book from the list
function deleteBook(event) {
    event.target.parentElement.remove();
    saveBooksToStorage(); 
}

// Save books to localStorage
function saveBooksToStorage() {
    const books = [];
    const bookContainers = document.querySelectorAll(".container");
    
    bookContainers.forEach(container => {
        const title = container.querySelector(".heading").textContent;
        const author = container.querySelector(".author").textContent;
        const description = container.querySelector(".content").textContent;

        books.push({ title, author, description });
    });

    localStorage.setItem("books", JSON.stringify(books));
}

// Load books from localStorage
function loadBooksFromStorage() {
    const books = JSON.parse(localStorage.getItem("books"));
    
    if (books && books.length > 0) {
        notesDiv.innerHTML = ""; 

        books.forEach(book => {
            addNewBookToList(book.title, book.author, book.description);
        });
    }
}

window.addEventListener("load", loadBooksFromStorage);
