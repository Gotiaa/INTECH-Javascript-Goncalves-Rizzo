var boardSize = rowSize * columnSize;
var columnSize = 10;
var rowSize = 10;
var nbMines = 10;
var timer = 0;
var timeout;
var minesRemaining;

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

function Board(nbRow, nbColumn, mineCount) {
    var board = {}
    for (var row = 0; row < nbRow; row++) {
        for (var column = 0; column < nbColumn; column++) {
            board[row + "" + column] = Cell(row, column, false, false, false, 0)
        }
    }
    /**
     * TODO : assignMinesRandomly
     */

    /**
     * TODO : assignNumberOfNeighborMines
     */

    return board;
}

function handleClick(id) {
    /**
     * TODO Faire une action en fonction de l'etat
     * de la cellule
     *
     */
    document.querySelector("#board").addEventListener(
        "click", // Le type de l'événement sous forme de chaîne de caractères
        { capture: false, once: false, passive: true } // Des options
    );

}

function handleRightClick(id) {
    /**
     * TODO Passer la cellule comme marquée + 
     * afficher/cacher un drapeau sur la cellule
     */
    document.querySelector("#board").addEventListener(
        "auxclick", // Le type de l'événement sous forme de chaîne de caractères
        { capture: false, once: false, passive: true } // Des options
    );
}

function assignMinesRandomly(board, nbMines) {

    var minesCoor = [];
    for (let i = 0; i < mineCount; i++) {
        var randomColumn = getRandomInteger(0, nbColumn)
        var randomRow = getRandomColumn(0, nbRow)
        var cell = randomRow + "" + randomColumn;
        while (minesCoor.includes(cell)) {
            var randomColumn = getRandomInteger(0, nbColumn)
            var randomRow = getRandomColumn(0, nbRow)
            var cell = randomRow + "" + randomColumn;
        }
        minesCoor.push(cell)
        board[cell].mined = true;
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
                cell.neighborMineCount = neighborMineCount;
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
        mined = cell.mined ? 1 : 0;
    }
    return mined;
}

var getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function start(boardSize, nbMines) {
    setMessageStart("La partie commence")
}

function setMessageStart(message) {
    const messageStart = document.querySelector("#messageStart");
    messageStart.innerHTML = message;
    console.log("ceci est un test")
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

var test = setMessageStart("la partie commence")
var print = printCells()
var rightClick = handleClick()