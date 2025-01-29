export function createBoard(gameContainer, handleCellClick) {
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

export function highlightRow(gameContainer, row) {
    for (let col = 0; col < 4; col++) {
        const cell = gameContainer.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.classList.add("winning-cell");
    }
}

export function highlightColumn(gameContainer, col) {
    for (let row = 0; row < 4; row++) {
        const cell = gameContainer.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.classList.add("winning-cell");
    }
}

export function highlightDiagonal(gameContainer, diagonal) {
    if (diagonal === 0) {
        for (let i = 0; i < 4; i++) {
            const cell = gameContainer.querySelector(`[data-row='${i}'][data-col='${i}']`);
            cell.classList.add("winning-cell");
        }
    } else {
        for (let i = 0; i < 4; i++) {
            const cell = gameContainer.querySelector(`[data-row='${i}'][data-col='${3 - i}']`);
            cell.classList.add("winning-cell");
        }
    }
}

export function checkWin(board) {
    for (let i = 0; i < 4; i++) {
        if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
            return { type: 'row', index: i };
        }
        if (board[0][i] && board.every(row => row[i] === board[0][i])) {
            return { type: 'column', index: i };
        }
    }
    if (board[0][0] && board.every((row, index) => row[index] === board[0][0])) {
        return { type: 'diagonal', index: 0 };
    }
    if (board[0][3] && board.every((row, index) => row[3 - index] === board[0][3])) {
        return { type: 'diagonal', index: 1 };
    }
    return false;
}

export function checkDraw(board) {
    return board.flat().every(cell => cell !== null);
}