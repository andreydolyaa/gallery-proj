'use strict';

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';
var GLUE_IMG = '<img src="img/candy.png">';

var gGamerPos;
var gBoard;
var gBallsCollected;
var gBallsRendered;
var isFinished;
var gIntervalBalls;
var gIntervalGlue;







function init() {
	resetDOM();
	isFinished = false;
	gBallsRendered = 0;
	gBallsCollected = 0;
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gIntervalBalls = setInterval(getRandomBalls, 2000);
	gIntervalGlue = setInterval(getRandomGlue, 5000);
	console.log(gBoard);
}






function getRandomBalls() {
	var cellHeight = getRandomInt(10);
	var cellWidth = getRandomInt(12);

	if (!isFinished) {
		if (gBoard[cellHeight][cellWidth].type === WALL || gBoard[cellHeight][cellWidth].gameElement === GAMER) {
			return;
		}
		else {
			gBoard[cellHeight][cellWidth].gameElement = BALL;
			renderCell({ i: cellHeight, j: cellWidth }, BALL_IMG);
			gBallsRendered++;
		}
	} else {
		return;
	}

}



function getRandomGlue() {
	var cellHeight = getRandomInt(10);
	var cellWidth = getRandomInt(12);

	if (!isFinished) {
		if (gBoard[cellHeight][cellWidth].type === WALL || gBoard[cellHeight][cellWidth].gameElement === GAMER || gBoard[cellHeight][cellWidth].gameElement === BALL) {
			return;
		}
		else {
			gBoard[cellHeight][cellWidth].gameElement = GLUE;
			renderCell({ i: cellHeight, j: cellWidth }, GLUE_IMG);
			if (gBoard[cellHeight][cellWidth].gameElement !== GLUE) return;
			setTimeout(function () {
				gBoard[cellHeight][cellWidth].gameElement = '';
				renderCell({ i: cellHeight, j: cellWidth }, '');
			}, 3000)
		}
	} else {
		return;
	}
}




function buildBoard() {
	var board = [];
	// TODO: Create the Matrix 10 * 12 
	// TODO: Put FLOOR everywhere and WALL at edges
	var height = 10;
	var width = 12;
	for (var i = 0; i < height; i++) {
		board[i] = [];
		for (var j = 0; j < width; j++) {
			var cell = {
				type: FLOOR,
				gameElement: ''
			}
			if (i === 0 || j === 0 || i === height - 1 || j === width - 1) {
				cell.type = WALL;
			}
			if (i === 5 && j === 11 || i === 5 && j === 0 || i === 0 && j === 5 || i === 9 && j === 5) {
				cell.type = FLOOR
			}
			board[i][j] = cell;

		}
	}
	// TODO: Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	return board;
}






function checkIfWon() {
	var winMsg = document.querySelector('.msg');
	if (gBallsRendered === 0) {
		isFinished = true;
		clearInterval(gIntervalBalls);
		winMsg.innerHTML = `
		<h1>You Won!</h1>
		<button onclick="init()">Restart Game</button>
		`;
	}
}







// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}

		strHTML += '</tr>\n';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}







function resetDOM() {
	var elCollected = document.querySelector('.collected');
	var elWinMsg = document.querySelector('.msg');
	elCollected.innerText = 'Balls Collected: 0';
	elWinMsg.innerHTML = '';
}







// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	var absDistance = jAbsDiff + iAbsDiff;


	// If the clicked Cell is one of the four allowed
	if (absDistance === 1) {

		if (targetCell.gameElement === BALL) {
			var audio = document.querySelector('#audio');
			var elCollected = document.querySelector('.collected');
			audio.play();
			gBallsCollected++;
			gBallsRendered--;
			elCollected.innerText = `Balls Collected:${gBallsCollected}`;
			checkIfWon();
		}
		// Todo: Move the gamer
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = '';
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[i][j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

		setPassage();

	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}






function setPassage() {
	if (gGamerPos.i === 5 && gGamerPos.j === 11) {
		renderCell(gGamerPos, '')
		gGamerPos.i = 5;
		gGamerPos.j = 0;
		renderCell({ i: 5, j: 0 }, GAMER_IMG)
	}
	else if (gGamerPos.i === 5 && gGamerPos.j === 0) {
		renderCell(gGamerPos, '')
		gGamerPos.i = 5;
		gGamerPos.j = 11;
		renderCell({ i: 5, j: 11 }, GAMER_IMG)
	}
	if (gGamerPos.i === 0 && gGamerPos.j === 5) {
		renderCell(gGamerPos, '')
		gGamerPos.i = 9;
		gGamerPos.j = 5;
		renderCell({ i: 9, j: 5 }, GAMER_IMG)
	}
	else if (gGamerPos.i === 9 && gGamerPos.j === 5) {
		renderCell(gGamerPos, '')
		gGamerPos.i = 0;
		gGamerPos.j = 5;
		renderCell({ i: 0, j: 5 }, GAMER_IMG)
	}
}




// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	// console.log(event);

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}



function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}