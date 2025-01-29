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

document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 4;
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    let currentPlayer = "X";
    let isGameActive = false;
    let player1Symbol = "X";
    let player2Symbol = "O";

    const gameContainer = document.getElementById("game-container");
    const startGameButton = document.getElementById("start-game-button");
    const restartGameButton = document.createElement("button");
    restartGameButton.textContent = "Restart Game";
    restartGameButton.id = "restart-game-button";
    restartGameButton.style.display = "none"; // Hidden initially

    const player1Input = document.getElementById("player1-symbol");
    const player2Input = document.getElementById("player2-symbol");

    startGameButton.addEventListener("click", startGame);
    restartGameButton.addEventListener("click", restartGame);

    document.body.appendChild(restartGameButton); // Add Restart button to the page

    function startGame() {
        player1Symbol = player1Input.value || "X";
        player2Symbol = player2Input.value || "O";
        currentPlayer = player1Symbol;
        board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
        isGameActive = true;

        startGameButton.style.display = "none"; // Hide Start button
        restartGameButton.style.display = "none"; // Hide Restart button when a new game starts

        createBoard();
    }

    function restartGame() {
        startGame(); // Reset game state
    }

    function createBoard() {
        gameContainer.innerHTML = "";
        gameContainer.style.display = "grid";
        gameContainer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameContainer.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => makeMove(row, col));
                gameContainer.appendChild(cell);
            }
        }
    }

    function makeMove(row, col) {
        if (!isGameActive || board[row][col]) return;

        board[row][col] = currentPlayer;
        updateBoard();

        const winningCells = checkWin(currentPlayer);
        if (winningCells) {
            highlightWinningCells(winningCells);
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                endGame();
            }, 100);
            return;
        }

        if (isBoardFull()) {
            setTimeout(() => {
                alert("It's a draw!");
                endGame();
            }, 100);
            return;
        }

        currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
    }

    function updateBoard() {
        document.querySelectorAll(".cell").forEach(cell => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            cell.textContent = board[row][col] || "";
        });
    }

    function checkWin(player) {
        let winningCells = [];

        for (let row = 0; row < boardSize; row++) {
            if (board[row].every(cell => cell === player)) {
                winningCells = board[row].map((_, col) => [row, col]);
                return winningCells;
            }
        }

        for (let col = 0; col < boardSize; col++) {
            if (board.every(row => row[col] === player)) {
                winningCells = board.map((_, row) => [row, col]);
                return winningCells;
            }
        }

        if (board.every((_, i) => board[i][i] === player)) {
            winningCells = board.map((_, i) => [i, i]);
            return winningCells;
        }

        if (board.every((_, i) => board[i][boardSize - 1 - i] === player)) {
            winningCells = board.map((_, i) => [i, boardSize - 1 - i]);
            return winningCells;
        }

        return null;
    }

    function highlightWinningCells(winningCells) {
        winningCells.forEach(([row, col]) => {
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            if (cell) {
                cell.classList.add("highlight");
            }
        });
    }

    function isBoardFull() {
        return board.flat().every(cell => cell);
    }

    function endGame() {
        isGameActive = false;
        restartGameButton.style.display = "block"; // Show Restart button when game ends
    }
});
