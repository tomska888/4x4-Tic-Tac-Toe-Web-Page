import Game from './game.js';

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const player1SymbolInput = document.getElementById("player1-symbol");
    const player2SymbolInput = document.getElementById("player2-symbol");
    const gameModeInput = document.getElementById("game-mode");
    const startGameButton = document.getElementById("start-game-button");
    const restartGameButton = document.getElementById("restart-game-button");
    const turnIndicator = document.createElement("div");
    turnIndicator.id = "turn-indicator";
    document.body.insertBefore(turnIndicator, gameContainer);

    const game = new Game(gameContainer, player1SymbolInput, player2SymbolInput, gameModeInput, startGameButton, restartGameButton, turnIndicator);
});