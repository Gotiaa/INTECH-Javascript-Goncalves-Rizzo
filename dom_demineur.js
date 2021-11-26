import { handleClick, handleRightClick, getCell, getIsGameOver, getNbRow, getNbColumn } from './demineur'

// function setMessageStart(message) {
//     const messageStart = document.querySelector("#messageStart");
// }

function printCells() {
    const boardDiv = document.querySelector("#board");
    for (let row = 0; row < getNbRow(); row++) {
        for (let col = 0; col < getNbColumn(); col++) {
            const cell = document.createElement("div");
            cell.setAttribute("id", row + "" + col);
            cell.setAttribute("class", "cell");
            boardDiv.appendChild(cell);
        }
    }
}
printCells();


document.querySelector("#board").addEventListener(
    "click", // Le type de l'événement sous forme de chaîne de caractères
    e => {handleClick(e.target.id)},
    { capture: false, once: false, passive: true } // Des options
);

document.querySelector("#board").addEventListener(
    "auxclick", // Le type de l'événement sous forme de chaîne de caractères
    e => {
        handleRightClick(e.target.id);
        refreshCell(e.target.id);
    },
    { capture: false, once: false, passive: true } // Des options
);

function refreshCell(id) {
    let cellDom = document.querySelector(`#${id}`);
    const cell = getCell(id);

    if(getIsGameOver()) {
        alert("GAME OVER NOOB !!");
        return;
    }

    if(cell.isMined) {
        cellDom.setAttribute("background-image", "img/mine.png")
    } else if (cell.isFlagged) {
        cellDom.setAttribute("background-color", "#e6e6e6");
    } else if (cell.isOpened) {
        cellDom.setAttribute("background-color", "#fffff");
        cellDom.appendChild("<p>zefgez</p>")
    }
}