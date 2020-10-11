'use strict';


function onInit() {
    renderBooks();
}


function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function (book) {
        return `
        <tr>
        <td class="book-id">${book.id}</td>
        <td>${book.name}</td>
        <td>$${book.price}</td>
        <td>
        <button class="btn-read" onclick="onBookDetails('${book.id}')">Read</button>
        <button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn-delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>
        `
    });
    document.querySelector('.books-container tbody').innerHTML = strHTML.join('');
}



function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}


function onAddBook() {
    var elBookName = document.querySelector('.create-book input[name=bookName]');
    var elBookPrice = document.querySelector('.create-book input[name=bookPrice]');
    var name = elBookName.value;
    var price = elBookPrice.value;

    addBook(name, price);
    renderBooks();
}


function onUpdateBook(bookId) {
    var newPrice = +prompt('Set a new price: ');
    updateBook(bookId, newPrice);
    renderBooks();
}


function onBookDetails(bookId) {
    renderBookModal(bookId);
}




function renderBookModal(bookId) {
    var elModal = document.querySelector('.modal');
    var booksContainer = document.querySelector('.books-container');
    var books = getBooks();
    var bookIdx = getBookIdxById(bookId);
    var defaultImg = 'img/default1.jpg';

    booksContainer.style.filter = 'blur(4px)';
    elModal.style.display = 'flex';

    elModal.innerHTML = `
    <div class="close-modal"><button onclick="onCloseModal()">X</button></div>
    <h3>${books[bookIdx].name}</h3>
    <img src="${books[bookIdx].imgUrl === '' ? defaultImg : books[bookIdx].imgUrl}"></img>
    <div class="modal-info">
    <p>${books[bookIdx].description}</p>
    <h1>$${books[bookIdx].price}</h1>
    </div>
    <div class="rating">
    <button value="+" onclick="onBookRating(this.value,'${books[bookIdx].id}')">+</button>
    ${books[bookIdx].rating}
    <button value="-" onclick="onBookRating(this.value,'${books[bookIdx].id}')">-</button>
    </div>
    `;
}




function onCloseModal() {
    var bookContainer = document.querySelector('.books-container');
    var elModal = document.querySelector('.modal');
    bookContainer.style.filter = 'none';
    elModal.style.display = 'none';
}


function onBookRating(symbol, bookId) {
    rateBook(symbol, bookId);
    renderBookModal(bookId);
}


function onSortByName() {
    var arrow = document.querySelector('.fa-angle-up');
    arrow.classList.toggle('fa-angle-down');
    sortByName();
    renderBooks();
}

function onSortByPrice() {
    var arrow = document.querySelector('.angle-up');
    arrow.classList.toggle('fa-angle-down1');
    sortByPrice();
    renderBooks();
}

