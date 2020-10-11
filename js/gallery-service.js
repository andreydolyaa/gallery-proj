'use strict';


var gProjs = _createProjs();


function getProjById(id){
    return gProjs.find(proj => proj.id === id);
}

function getProjs(){
    return gProjs;
}

function _createProjs() {
    var projs = [
        {
            id:'touchnums',
            name:'touchnums',
            title:'Touch Nums',
            desc:'A game where you need to tap the numbers by order!',
            url:"projs/touch-nums/index.html",
            publishedAt:Date.now(),
            labels: ['2d Arrays',' Dynamic rendering'],
            img:'img/img-projs/touch-nums.PNG'
        },
        {
            id:'bookShop',
            name:'bookshop',
            title:'Book Shop',
            desc:'A CRUDL Book shop where you can modify the shop items!',
            url:"projs/book-shop/index.html",
            publishedAt:Date.now(),
            labels: ['CRUDL',' Dynamic rendering'],
            img:'img/img-projs/book-shop.PNG'
        },
        {
            id:'minesweeper',
            name:'minesweeper',
            title:'MineSweeper',
            desc:'A game where you need to guess where the mines placed!',
            url:"projs/minesweeper/index.html",
            publishedAt:Date.now(),
            labels: ['2d Arrays',' Dynamic rendering'],
            img:'img/img-projs/minesweeper.PNG'
        },
        {
            id:'inPicture',
            name:'inpicture',
            title:'In Picture',
            desc:'A game where you need to guess the picture!',
            url:"projs/in-picture/index.html",
            publishedAt:Date.now(),
            labels: ['2d Arrays',' Dynamic rendering'],
            img:'img/img-projs/guess.PNG'
        },
        {
            id:'todos',
            name:'todos',
            title:'Todo App',
            desc:'A small App where you can manage your tasks!',
            url:"projs/todos/index.html",
            publishedAt:Date.now(),
            labels: ['2d Arrays',' Dynamic rendering'],
            img:'img/img-projs/todos.PNG'
        },
        {
            id:'ballBoard',
            name:'Ballboard',
            title:'Ball Board',
            desc:'A game where a monster should collect all the balls!',
            url:"projs/ball-board/index.html",
            publishedAt:Date.now(),
            labels: ['Matrixes',' Dynamic rendering'],
            img:'img/img-projs/ball-board.PNG'
        },
    ];
    return projs;
}

console.log(gProjs);