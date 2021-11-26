import { handleClick, handleRightClick, getCell, getIsGameOver, getNbRow, getNbColumn, getNbMines, openEmptyCases } from './demineur.js'

// function setMessageStart(message) {
//     const messageStart = document.querySelector("#messageStart");
// }

document.querySelector("#startGame").addEventListener(
    "click",
    e => {
        location.reload();
    }
);

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
    e => {
        handleClick(e.target.id);
        refreshCell(e.target);
    },
    { capture: false, once: false, passive: true } // Des options
);

document.querySelector("#board").addEventListener(
    "auxclick", // Le type de l'événement sous forme de chaîne de caractères
    e => {
        handleRightClick(e.target.id);
        markCell(e.target);
    },
    { capture: false, once: false, passive: true } // Des options
);

function refreshCell(target) {
    const cell = getCell(target.id);
    if(cell.nbneiborMine === 0) {
        showEmptyCells();
    }
    if(getIsGameOver()) {
        alert("GAME OVER NOOB !!");
        return;
    }

    if(cell.isMined) {
        target.setAttribute("style", "background-image:url(img/mine.png)");
    } else if (cell.isOpened) {
        target.setAttribute("style", "background-color:white");
        if(cell.nbneiborMine !== 0) {
            const number = document.createElement("p");
            number.setAttribute("style", "display:contents");
            number.textContent = cell.nbneiborMine;
            target.appendChild(number);
        }
    }
}

function markCell(target) {
    const cell = getCell(target.id);

    if (cell.isFlagged) {
        target.setAttribute("style", "background-image:(img/flag.png)");
    }
}

function showEmptyCells() {
    let modifedCells = openEmptyCases();
    for (let i = 0; i < modifedCells; i++) {
       let cell = document.querySelector(modifedCells[i]);
       refreshCell(cell);
    }
}