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
    const startGameButton = document.getElementById("start-game-button");

    let currentPlayer = "X";
    let board = Array(4).fill(null).map(() => Array(4).fill(null));
    let isGameActive = false;

    startGameButton.addEventListener("click", startGame);

    function startGame() {
        currentPlayer = player1SymbolInput.value || "X";
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

            setTimeout(() => {
                if (checkWin()) {
                    alert(`${currentPlayer} wins!`);
                    isGameActive = false;
                    return;
                }

                if (checkDraw()) {
                    alert("It's a draw!");
                    isGameActive = false;
                    return;
                }

                currentPlayer = currentPlayer === player1SymbolInput.value
                    ? player2SymbolInput.value
                    : player1SymbolInput.value;
            }, 0);
        }
    }

    function checkWin() {
        for (let i = 0; i < 4; i++) {
            if (board[i][0] && board[i].every(cell => cell === board[i][0])) return true; // Row check
            if (board[0][i] && board.every(row => row[i] === board[0][i])) return true; // Column check
        }

        if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) return true;
        if (board[0][3] && board.every((row, index) => row[3 - index] === board[0][3])) return true;

        return false;
    }

    function checkDraw() {
        return board.flat().every(cell => cell !== null);
    }
});
