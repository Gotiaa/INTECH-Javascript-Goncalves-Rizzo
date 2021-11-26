function Cell(row, column, isOpened, isFlagged, isMined, nbneiborMine) {
    return {
        id: row + "" + column,
        row: row,
        column: column,
        isOpened: isOpened,
        isFlagged: isFlagged,
        isMined: isMined,
        nbneiborMine: nbneiborMine
    }
}


function Board(nbRow, nbColumn, nbMine) {
    var board = {}
    for (var row = 0; row < nbRow; row++) {
        for (var column = 0; column < nbColumn; column++) {
            console.log("Création d'une cell");
            board[row + "" + column] = Cell(row, column, false, false, false, 0)
        }
    }
    /**
     * TODO : assignMinesRandomly
     */
    assignMinesRandomly(board, nbRow, nbColumn, nbMine);

    /**
     * TODO : assignNumberOfNeighborMines
     */
    assignNumberOfNeighborMines(board, nbRow, nbColumn);

    return board;
}


function assignMinesRandomly(board, nbRow, nbColumn, nbMines) {

    var minesCoor = [];
    for (let i = 0; i < nbMines; i++) {
        var randomColumn = getRandomInteger(0, nbColumn)
        var randomRow = getRandomInteger(0, nbRow)
        var cell = randomRow + "" + randomColumn;
        while (minesCoor.includes(cell)) {
            var randomColumn = getRandomInteger(0, nbColumn)
            var randomRow = getRandomInteger(0, nbRow)
            var cell = randomRow + "" + randomColumn;
        }
        minesCoor.push(cell)
        board[cell].isMined = true;
    }
    return board;
}

function assignNumberOfNeighborMines(board, nbRow, nbColumn) {
    /**
     * TODO assigner à chaque case son nombre de voisin
     */
    var cell;
    var neighborMineCount = 0;
    for (var row = 0; row < nbRow; row++) {
        for (var column = 0; column < nbColumn; column++) {
            var id = row + "" + column;
            cell = board[id];
            if (!cell.mined) {
                var neighbors = getNeighbors(id);
                neighborMineCount = 0;
                for (var i = 0; i < neighbors.length; i++) {
                    neighborMineCount += isMined(board, neighbors[i]);
                }
                cell.nbneiborMine = neighborMineCount;
            }
        }
    }
    return board;
}

var getNeighbors = function(id) {
    var row = parseInt(id[0]);
    var column = parseInt(id[1]);
    var neighbors = [];
    neighbors.push((row - 1) + "" + (column - 1));
    neighbors.push((row - 1) + "" + column);
    neighbors.push((row - 1) + "" + (column + 1));
    neighbors.push(row + "" + (column - 1));
    neighbors.push(row + "" + (column + 1));
    neighbors.push((row + 1) + "" + (column - 1));
    neighbors.push((row + 1) + "" + column);
    neighbors.push((row + 1) + "" + (column + 1));

    for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].length > 2) {
            neighbors.splice(i, 1);
            i--;
        }
    }

    return neighbors
}

var isMined = function(board, id) {
    var cell = board[id];
    var mined = 0;
    if (typeof cell !== 'undefined') {
        mined = cell.isMined ? 1 : 0;
    }
    return mined;
}

var getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function start(nbRow, nbColumn, nbMines) {
    //setMessageStart("La partie commence");
    board = Board(nbRow, nbColumn, nbMines);
    return board;
}

function printCells() {
    const boardDiv = document.querySelector("#board");
    for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < columnSize; col++) {
            const cell = document.createElement("div");
            cell.setAttribute("id", row + "-" + col);
            cell.setAttribute("class", "cell");
            boardDiv.appendChild(cell);
        }
    }
}

export function isWin() {
    for (let i = 0; i < board.length; i++) {
        if (board[i].isOpened || !board[i].isMined) {
            return false;
        } else {
            return true;
        }
    }
}

export function handleClick(id) {
    let cell = getCell(id);
    if (cell.isOpened) {
        return;
    } else if (cell.isMined) {
        gameover = true;
        return;
    } else if (!cell.isOpened) {
        cell.isOpened = true;
    }
}

export function handleRightClick(id) {
    let cell = getCell(id);
    cell.isFlagged = !cell.isFlagged;
}


export function getNbRow() {
    return NBROW;
}

export function getNbColumn() {
    return NBCOLUMN;
}

export function getNbMines() {
    return NBMINES;
}

export function getIsGameOver() {
    return gameover;
}


export function getCell(id) {
    return board[id]
}


const NBROW = 5;
const NBCOLUMN = 5;
const NBMINES = 5;

let gameover = false;
let board;
let startGame = start(NBROW, NBCOLUMN, NBMINES);
console.log(board)