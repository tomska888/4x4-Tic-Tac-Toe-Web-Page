import Player from './player.js';
import { createBoard, highlightRow, highlightColumn, highlightDiagonal, checkWin, checkDraw } from './utils.js';

class Game {
    constructor(gameContainer, player1SymbolInput, player2SymbolInput, gameModeInput, startGameButton, restartGameButton, turnIndicator) {
        this.gameContainer = gameContainer;
        this.player1SymbolInput = player1SymbolInput;
        this.player2SymbolInput = player2SymbolInput;
        this.gameModeInput = gameModeInput;
        this.startGameButton = startGameButton;
        this.restartGameButton = restartGameButton;
        this.turnIndicator = turnIndicator;

        this.currentPlayer = null;
        this.board = Array(4).fill(null).map(() => Array(4).fill(null));
        this.isGameActive = false;
        this.gameMode = "pvp";
        this.player1 = null;
        this.player2 = null;

        this.startGameButton.addEventListener("click", () => this.startGame());
        this.restartGameButton.addEventListener("click", () => this.restartGame());
    }

    startGame() {
        const player1Symbol = this.player1SymbolInput.value || "X";
        const player2Symbol = this.player2SymbolInput.value || "O";
        this.gameMode = this.gameModeInput.value;

        if (player1Symbol === player2Symbol) {
            alert("Player 1 and Player 2 symbols cannot be the same!");
            return;
        }

        this.player1 = new Player(player1Symbol);
        this.player2 = new Player(player2Symbol);
        this.currentPlayer = this.player1;
        this.isGameActive = true;
        this.board = Array(4).fill(null).map(() => Array(4).fill(null));
        createBoard(this.gameContainer, this.handleCellClick.bind(this));
        this.startGameButton.style.display = "none";
        this.restartGameButton.style.display = "none";
        this.updateTurnIndicator();
    }

    handleCellClick(event) {
        if (!this.isGameActive) return;

        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (this.board[row][col] === null) {
            this.board[row][col] = this.currentPlayer.symbol;
            cell.textContent = this.currentPlayer.symbol;
            cell.classList.add("taken");

            const winResult = checkWin(this.board);
            if (winResult) {
                this.isGameActive = false;
                if (winResult.type === 'row') highlightRow(this.gameContainer, winResult.index);
                if (winResult.type === 'column') highlightColumn(this.gameContainer, winResult.index);
                if (winResult.type === 'diagonal') highlightDiagonal(this.gameContainer, winResult.index);
                setTimeout(() => {
                    alert(`${this.currentPlayer.symbol} wins!`);
                    this.restartGameButton.style.display = "block";
                }, 200);
                return;
            }

            if (checkDraw(this.board)) {
                this.isGameActive = false;
                setTimeout(() => {
                    alert("It's a draw!");
                    this.restartGameButton.style.display = "block";
                }, 200);
                return;
            }

            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
            this.updateTurnIndicator();

            if (this.gameMode === "pve" && this.currentPlayer === this.player2) {
                setTimeout(() => this.aiMove(), 500);
            }
        }
    }

    aiMove() {
        if (!this.isGameActive) return;

        let emptyCells = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board[row][col] === null) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cellElement = this.gameContainer.querySelector(`[data-row='${randomCell.row}'][data-col='${randomCell.col}']`);
            this.handleCellClick({ target: cellElement });
        }
    }

    updateTurnIndicator() {
        this.turnIndicator.textContent = `${this.currentPlayer.symbol}'s turn`;
    }

    restartGame() {
        this.startGame();
        this.startGameButton.style.display = "block";
        this.restartGameButton.style.display = "none";
    }
}

export default Game;