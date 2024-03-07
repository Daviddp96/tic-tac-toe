'use strict';

const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    }

    return { getSymbol };
}

const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];

/*     
    Uncomment to test in console
    const render = () => {
        console.log("---------------");
        for (let i = 0; i < board.length; i+=3) {
            console.log(`${board[i]} ${board[i+1]} ${board[i+2]}`);
            console.log('');
        }
        console.log("---------------");
    } */

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
        return board[index] === '';
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return { setSymbol, getSymbol, isEmpty, reset };
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
            return;
        }
        gameBoard.setSymbol(getCurrentPlayerSymbol(), cellIndex);
        isOver = checkWinner(cellIndex);
        if (isOver) {
            gameController.reset();
            return;
        }
        if (round === 9) {
            gameController.reset();
            return;
        }
        round++;
    };

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    return {playRound, getIsOver, reset};

})();

const displayController = (function () {
    const cellElements = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-btn');
    const nextRoundButton = document.getElementById('next');
    const leaveGameButton = document.getElementById('leave');
    const winnerMessage = document.getElementById('winner');
    const overlay = document.querySelector('.result__overlay');
    const modal = document.querySelector('.result__modal');
    const currentPlayerMessage = document.getElementById('current-player');

    let playerXScore = 0;
    let playerOScore = 0;
    let ties = 0;
    let tie = false;

    const updateGameBoard = () => {
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].textContent = gameBoard.getSymbol(i);
        }
    };

    cellElements.forEach((cellElement) => {
        cellElement.addEventListener('click', (event) => {
            if (gameController.getIsOver() || event.target.textContent !== "") {
                return;
            }
            gameController.playRound(parseInt(event.target.dataset.index));
            updateGameBoard();
        })
    });

    const setMessage = (message) => {
        currentPlayerMessage.textContent = message;
    }

    resetButton.addEventListener('click', () => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
        setMessage('Player X');
    });

    const setResultMessage = (message) => {
        winnerMessage.textContent = message;
    }

    return { setMessage, setResultMessage };
})();