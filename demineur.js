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