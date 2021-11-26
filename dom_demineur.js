const rowSize = 10 
const columnSize = 10;

const boardDiv = document.querySelector("#board");
  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < columnSize; col++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", row + "-" + col);
        cell.setAttribute("class", "cell");
        boardDiv.appendChild(cell);
    }
  } 