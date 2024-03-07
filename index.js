'use strict';

const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    }

    return { getSymbol };
}

const gameBoard = (function () {
    const board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

    const render = () => {
        console.log("---------------");
        for (let i = 0; i < board.length; i+=3) {
            console.log(`${board[i]} ${board[i+1]} ${board[i+2]}`);
            console.log('');
        }
        console.log("---------------");
    }

    const setSymbol = (symbol, index) => {
        if (index > board.length) {
            return;
        }
        board[index] = symbol;
    };

    const getSymbol = (index) => {
        if (index > board.length) {
            return;
        }
        return board[index];
    };

    const isEmpty = (index) => {
        return board[index] === '-';
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '-';
        }
    };

    return { render, setSymbol, getSymbol, isEmpty, reset };
})();

const gameController = (function () {
    const playerX = Player('X');
    const playerO = Player('O');
    let isOver = false;
    let round = 1;

    const getCurrentPlayerSymbol = () => {
        return round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();
    };

    const checkWinner = (cellIndex) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const currentPossibleCombinations = winningCombinations.filter((combination) => combination.includes(cellIndex));
        const isWinner = currentPossibleCombinations.some((possibleCombination) => {
            return possibleCombination.every(
                (index) => {
                    return gameBoard.getSymbol(index) === getCurrentPlayerSymbol();
                }
            )
        });
        return isWinner;
    };

    const playRound = (cellIndex) => {
        console.log(`Current round: ${round}, Player: ${getCurrentPlayerSymbol()}`);
        if (!gameBoard.isEmpty(cellIndex)) {
            console.log('This cell is occupied.');
            console.log(`We're staying in round: ${round}`);
            return;
        }
        gameBoard.setSymbol(getCurrentPlayerSymbol(), cellIndex);
        gameBoard.render();
        isOver = checkWinner(cellIndex);
        if (isOver) {
            console.log(`${getCurrentPlayerSymbol()} wins.`);
            gameController.reset();
            gameBoard.render();
            return;
        }
        if (round === 9) {
            console.log(`Tie.`);
            gameController.reset();
            gameBoard.render();
            return;
        }
        round++;
        console.log(`Next round: ${round}, Player will be: ${getCurrentPlayerSymbol()}`);
    };

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        round = 1;
        isOver = false;
        gameBoard.reset();
    }

    return {playRound, getIsOver, reset};

})();