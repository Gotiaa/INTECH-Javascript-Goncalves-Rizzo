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

function createCells(rowSize, columnSize) {
    /**
     * TODO Creation dynamique de cellules + Affectation
     * des id et des styles pour affichage
     */
}

function handleClick(id) {
    /**
     * TODO Faire une action en fonction de l'etat
     * de la cellule
     *
     */
}

function handleRightClick(id) {
    /**
     * TODO Passer la cellule comme marquée + 
     * afficher/cacher un drapeau sur la cellule
     */
}

function assignMinesRandomly(board, nbMines) {
    /**
     * TODO Assigner aléatoirement nbMines dans le 
     * board
     */
}

function assignNumberOfNeighborMines(board, nbRow, nbColumn) {
    /**
     * TODO assigner à chaque case son nombre de voisin
     */
}