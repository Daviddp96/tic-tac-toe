const Player = (name, symbol) => {
    this.name = name;
    this.symbol = symbol;

    const getName = () => {
        return name;
    }

    const changeName = (name) => {
        this.name = name;
    }

    const getSymbol = () => {
        return symbol;
    };

    return {getName, changeName, getSymbol};
}

const gameBoard = (function () {
    const board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];

    const setSymbol = (symbol, row, col) => {
        if (row > 2 || col > 2) {
            console.log('Out of bounds.');
            return;
        }
        board[row][col] = symbol;
    }

    const getSymbol = (row, col) => {
        if (row > 2 || col > 2) {
            console.log('Out of bounds.');
            return;
        }
        return board[row][col];
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = '-';
            }
        }
    }

    const render = () => {
        for (let i = 0; i < board.length; i++) {
            console.log("|");
            for (let j = 0; j < board[i].length; j++) {
                console.log(board[i][j]);
                console.log(" ");
            }
            console.log("|");
        }
    }

    return {setSymbol, getSymbol, reset, render};
})();

const gameController = (function () {
    
})();