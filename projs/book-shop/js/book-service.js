'use strict';

var STORAGE_KEY = 'bookzDB';

var gBooks;
var gSortNames = false;
var gSortPrice = false;

_createBooks();





function getBooks() {
    return gBooks;
}


function addBook(name, price) {
    var book = _createBook()
    book.name = name;
    book.price = price;
    gBooks.push(book);
    _saveBooksToStorage();
}


function updateBook(bookId, bookPrice) {
    var bookIdx = getBookIdxById(bookId);
    gBooks[bookIdx].price = bookPrice;
    _saveBooksToStorage();
}


function removeBook(bookId) {
    var bookIdx = getBookIdxById(bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}


function rateBook(symbol, bookId) {
    var bookIdx = getBookIdxById(bookId);
    if (symbol === '+') {
        if (gBooks[bookIdx].rating === 10) return;
        else gBooks[bookIdx].rating += 1;
    }
    else if (symbol === '-') {
        if (gBooks[bookIdx].rating === 0) return;
        else gBooks[bookIdx].rating -= 1;
    }
    _saveBooksToStorage();
}



function sortByName() {
    var books = gBooks;
    if (!gSortNames) {
        books.sort(function (a, b) {
            if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
            if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
            return 0;
        });
        gSortNames = true;
    } else {
        books.sort(function (a, b) {
            if (b.name.toUpperCase() < a.name.toUpperCase()) return -1;
            if (b.name.toUpperCase() > a.name.toUpperCase()) return 1;
            return 0;
        });
        gSortNames = false;
    }
    return books;
}


function sortByPrice() {
    var books = gBooks;
    if (!gSortPrice) {
        gBooks.sort(function (a, b) {
            return a.price - b.price;
        });
        gSortPrice = true;
    } else {
        gBooks.sort(function (a, b) {
            return b.price - a.price;
        });
        gSortPrice = false;
    }
    return books;
}


function _createBook() {
    return {
        id: makeId(),
        name: '',
        price: 0,
        imgUrl: '',
        description: makeLorem(20),
        rating: 0
    };
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [
            {
                id: makeId(),
                name: 'Harry Potter and the Philosophers Stone',
                price: 19.99,
                imgUrl: 'img/philosopher.jpg',
                description: makeLorem(20),
                rating: 0
            },
            {
                id: makeId(),
                name: 'Harry Potter and the Chamer Secrets',
                price: 15.99,
                imgUrl: 'img/chamber.jpg',
                description: makeLorem(20),
                rating: 0
            },
            {
                id: makeId(),
                name: 'Harry Potter and the Socrcerers Stone',
                price: 25.99,
                imgUrl: 'img/sorc.jpg',
                description: makeLorem(20),
                rating: 0
            },
            {
                id: makeId(),
                name: 'Harry Potter and Goblet of Fire',
                price: 19.99,
                imgUrl: 'img/fire.jpg',
                description: makeLorem(20),
                rating: 0
            },

        ];
    }
    gBooks = books;
    _saveBooksToStorage();
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}


function getBookIdxById(bookId) {
    return gBooks.findIndex(book => bookId === book.id);
}
