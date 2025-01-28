document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");

    function createBoard() {
        gameContainer.innerHTML = "";
        const size = 4;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameContainer.appendChild(cell);
            }
        }
    }

    createBoard();
});
