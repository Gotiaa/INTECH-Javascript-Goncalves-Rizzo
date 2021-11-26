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
        "click",                                      // Le type de l'événement sous forme de chaîne de caractères
        { capture: false, once: false, passive: true } // Des options
    );
        
}

function handleRightClick(id) {
    /**
     * TODO Passer la cellule comme marquée + 
     * afficher/cacher un drapeau sur la cellule
     */
     document.querySelector("#board").addEventListener(
        "auxclick",                                      // Le type de l'événement sous forme de chaîne de caractères
        { capture: false, once: false, passive: true } // Des options
    );
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