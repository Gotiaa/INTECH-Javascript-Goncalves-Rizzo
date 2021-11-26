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
    let board = {}
    for (let row = 0; row < nbRow; row++) {
        for (let column = 0; column < nbColumn; column++) {
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

    let minesCoor = [];
    for (let i = 0; i < nbMines; i++) {
        let randomColumn = getRandomInteger(0, nbColumn)
        let randomRow = getRandomInteger(0, nbRow)
        let cell = randomRow + "" + randomColumn;
        while (minesCoor.includes(cell)) {
            let randomColumn = getRandomInteger(0, nbColumn)
            let randomRow = getRandomInteger(0, nbRow)
            let cell = randomRow + "" + randomColumn;
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
    let cell;
    let neighborMineCount = 0;
    for (let row = 0; row < nbRow; row++) {
        for (let column = 0; column < nbColumn; column++) {
            let id = row + "" + column;
            cell = board[id];
            if (!cell.mined) {
                let neighbors = getNeighbors(id);
                neighborMineCount = 0;
                for (let i = 0; i < neighbors.length; i++) {
                    neighborMineCount += isMined(board, neighbors[i]);
                }
                cell.nbneiborMine = neighborMineCount;
            }
        }
    }
    return board;
}

let getNeighbors = function(id) {
    let row = parseInt(id[0]);
    let column = parseInt(id[1]);
    let neighbors = [];
    neighbors.push((row - 1) + "" + (column - 1));
    neighbors.push((row - 1) + "" + column);
    neighbors.push((row - 1) + "" + (column + 1));
    neighbors.push(row + "" + (column - 1));
    neighbors.push(row + "" + (column + 1));
    neighbors.push((row + 1) + "" + (column - 1));
    neighbors.push((row + 1) + "" + column);
    neighbors.push((row + 1) + "" + (column + 1));

    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i].length > 2) {
            neighbors.splice(i, 1);
            i--;
        }
    }

    return neighbors
}

let isMined = function(board, id) {
    let cell = board[id];
    let mined = 0;
    if (typeof cell !== 'undefined') {
        mined = cell.isMined ? 1 : 0;
    }
    return mined;
}

let getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function start(nbRow, nbColumn, nbMines) {
    //setMessageStart("La partie commence");
    board = Board(nbRow, nbColumn, nbMines);
    return board;
}


export function openEmptyCases() {
    let modifiedCells = []
    for (let i = 0; i < board.length; i++) {
        if (board[i].nbneiborMine === 0) {
            board[i].isOpened = true;
            modifiedCells.push(board[i].id);
        }
    }
    return modifiedCells;
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


const NBROW = 10;
const NBCOLUMN = 10;
const NBMINES = 10;

let gameover = false;
let board;
let startGame = start(NBROW, NBCOLUMN, NBMINES);