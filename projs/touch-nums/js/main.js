'use strict';


var gDifficulty;
var gBoard;
var gNextNum;
var gTimer;
var gTimerInterval;








function init() {
    var gameOver = document.querySelector(".game-over");
    var timer = document.querySelector('.timer');
    clearInterval(gTimerInterval);
    gTimerInterval = '';
    gameOver.innerHTML = '';
    timer.innerHTML = '00:00:00'
    seconds = 0, minutes = 0, hours = 0;
    leadSeconds = 0, leadMinutes = 0, leadHours = 0;
    gNextNum = 1;
    gBoard = createBoard(gDifficulty);
    gTimerInterval = setInterval(stopWatch, 1000);
}





function createBoard(numOfCells) {
    var nums = createArray(numOfCells)
    var board = document.querySelector('.board');
    var startMsg = document.querySelector(".start-msg");
    var htmlStr = '';
    var num = Math.sqrt(numOfCells);

    startMsg.innerText = '';

    for (var i = 0; i < num; i++) {
        htmlStr += `<tr>`;
        for (var j = 0; j < num; j++) {
            var number = shuffle(nums);
            htmlStr += ` <td onclick="cellClicked(this)" class="num-cell" id="${number}" data-num="${number}">${number}</td>`
        }
        htmlStr += `</tr>`;
    }
    board.innerHTML = htmlStr;
}





function cellClicked(clickedNum) {
    var currNum = clickedNum.getAttribute('data-num');
    var currClass = document.getElementById(currNum);
    var startMsg = document.querySelector(".start-msg");

    if (+currNum === gNextNum) {
        currClass.style.backgroundColor = 'orange';
        gNextNum++;
        startMsg.innerText = 'Next Number is: ' + gNextNum;
        checkIfWon();
    }
}




function setDifficulty(id) {
    var easy = document.querySelector('#id16');
    var medium = document.querySelector('#id25');
    var hard = document.querySelector('#id36');

    if (id === 'id16') {
        easy.style.backgroundColor = '#1F5A78';
        hard.style.backgroundColor = '#3BBAFA';
        medium.style.backgroundColor = '#3BBAFA';
        return gDifficulty = 16;
    }
    if (id === 'id25') {
        medium.style.backgroundColor = '#1F5A78';
        easy.style.backgroundColor = '#3BBAFA';
        hard.style.backgroundColor = '#3BBAFA';
        return gDifficulty = 25;
    }
    if (id === 'id36') {
        hard.style.backgroundColor = '#1F5A78';
        medium.style.backgroundColor = '#3BBAFA';
        easy.style.backgroundColor = '#3BBAFA';
        return gDifficulty = 36;
    }
}




function checkIfWon() {
    var gameOver = document.querySelector(".game-over");
    var startMsg = document.querySelector(".start-msg");
    var cup = '🏆'

    if (gDifficulty === 16 && gNextNum === 17) {
        gameOver.innerHTML = 'Game Over';
        startMsg.innerHTML = cup;
        clearInterval(gTimerInterval);
    }
    if (gDifficulty === 25 && gNextNum === 26) {
        gameOver.innerHTML = 'Game Over';
        startMsg.innerHTML = cup;
        clearInterval(gTimerInterval);
    }
    if (gDifficulty === 36 && gNextNum === 37) {
        gameOver.innerHTML = 'Game Over';
        startMsg.innerHTML = cup;
        clearInterval(gTimerInterval);
    }
}





function createArray(numOfCells) {
    var nums = [];
    for (var i = 1; i <= numOfCells; i++) {
        nums.push(i);
    }
    return nums;
}





function shuffle(nums) {
    nums.sort(function () {
        return 0.5 - Math.random();
    });
    return nums.pop();
}





var seconds = 0, minutes = 0, hours = 0;
var leadSeconds = 0, leadMinutes = 0, leadHours = 0;

function stopWatch() {
    var timer = document.querySelector('.timer');
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }
    if (seconds < 10) leadSeconds = "0" + seconds;
    else leadSeconds = seconds;
    if (minutes < 10) leadMinutes = "0" + minutes;
    else leadMinutes = minutes;
    if (hours < 10) leadHours = "0" + hours;
    else leadHours = hours;

    timer.innerHTML = `${leadHours}:${leadMinutes}:${leadSeconds}`;
}







