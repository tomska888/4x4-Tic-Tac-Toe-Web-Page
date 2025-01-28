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
    const gameContainer = document.getElementById("game-container");
    const player1SymbolInput = document.getElementById("player1-symbol");
    const player2SymbolInput = document.getElementById("player2-symbol");
    const gameModeInput = document.getElementById("game-mode");
    const startGameButton = document.getElementById("start-game-button");

    let currentPlayer = "X";
    let board = Array(4).fill(null).map(() => Array(4).fill(null));
    let isGameActive = false;
    let gameMode = "pvp";

    startGameButton.addEventListener("click", startGame);

    function startGame() {
        currentPlayer = player1SymbolInput.value || "X";
        const player2Symbol = player2SymbolInput.value || "O";
        gameMode = gameModeInput.value;

        if (currentPlayer === player2Symbol) {
            alert("Player 1 and Player 2 symbols cannot be the same!");
            return;
        }

        isGameActive = true;
        board = Array(4).fill(null).map(() => Array(4).fill(null));
        createBoard();
    }

    function createBoard() {
        gameContainer.innerHTML = "";
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", handleCellClick);
                gameContainer.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        if (!isGameActive) return;

        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");

            requestAnimationFrame(() => {
                const winningCells = checkWin();
                if (winningCells) {
                    highlightWinningCells(winningCells);
                    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                    isGameActive = false;
                    return;
                }

                if (checkDraw()) {
                    setTimeout(() => alert("It's a draw!"), 100);
                    isGameActive = false;
                    return;
                }

                if (gameMode === "pvp") {
                    switchTurns();
                } else if (gameMode === "pve") {
                    switchTurns();
                    if (currentPlayer === player2SymbolInput.value) {
                        setTimeout(aiMove, 500);
                    }
                }
            });
        }
    }

    function switchTurns() {
        currentPlayer = currentPlayer === player1SymbolInput.value
            ? player2SymbolInput.value
            : player1SymbolInput.value;
    }

    function aiMove() {
        const emptyCells = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === null) {
                    emptyCells.push([row, col]);
                }
            }
        }

        if (emptyCells.length > 0) {
            const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[row][col] = currentPlayer;

            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = currentPlayer;
            cell.classList.add("taken");

            requestAnimationFrame(() => {
                const winningCells = checkWin();
                if (winningCells) {
                    highlightWinningCells(winningCells);
                    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                    isGameActive = false;
                    return;
                }

                if (checkDraw()) {
                    setTimeout(() => alert("It's a draw!"), 100);
                    isGameActive = false;
                    return;
                }

                switchTurns();
            });
        }
    }

    function checkWin() {
        for (let i = 0; i < 4; i++) {
            if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
                return board[i].map((_, col) => [i, col]);
            }
            if (board[0][i] && board.every(row => row[i] === board[0][i])) {
                return board.map((_, row) => [row, i]);
            }
        }
        if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) {
            return board.map((_, index) => [index, index]);
        }
        if (board[0][3] && board.every((row, index) => row[3 - index] === board[0][3])) {
            return board.map((_, index) => [index, 3 - index]);
        }
        return null;
    }

    function checkDraw() {
        return board.flat().every(cell => cell !== null);
    }

    function highlightWinningCells(cells) {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add("winning-cell");
            }
        });
    }
});