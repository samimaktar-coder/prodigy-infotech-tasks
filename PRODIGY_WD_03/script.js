let firstPage = document.querySelector('.first-page');
let options = document.querySelectorAll('.choose div');
let startBtn = document.querySelector('.start');
let gameBoard = document.querySelector('.game-board');
let nameSlide = document.querySelector('.name-slide');
let squares = document.querySelectorAll('.board div');
let winPage = document.querySelector('.win-page');
let winText = document.querySelector('.win-text');
let restartBtn = document.querySelector('.restart');

let cross = `<i class="ri-close-fill"></i>`;
let circle = `<i class="ri-circle-line"></i>`;
let playerChoice = 'cross';
let playerTurn = true;
let emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];


let removeActive = () => {
    options.forEach(option => {
        option.classList.remove('active');
    });
};

options.forEach(option => {
    option.addEventListener('click', () => {
        removeActive();
        playerChoice = option.getAttribute('data-sign');
        option.classList.add('active');
    });
});

startBtn.addEventListener('click', () => {
    firstPage.classList.add('hide');
    gameBoard.classList.add('show');
});



function removeBox(index) {
    emptyBoxes = emptyBoxes.filter(box => box != index);
}

function computerTurn() {
    if (!playerTurn && emptyBoxes.length !== 0) {
        let random = Math.floor(Math.random() * emptyBoxes.length);
        setTimeout(() => {
            playerTurn = true;
            squares[emptyBoxes[random]].classList.add(playerChoice === 'cross' ? 'circle' : 'cross');
            squares[emptyBoxes[random]].innerHTML = playerChoice === 'cross' ? circle : cross;
            nameSlide.classList.add('left');
            nameSlide.classList.remove('right');
            removeBox(squares[emptyBoxes[random]].getAttribute('data-index'));
            checkForWin();
        }, 1000);
    }
}

emptyBoxes.forEach(box => {
    squares[box].addEventListener('click', () => {
        if (playerTurn && emptyBoxes.length !== 0) {
            squares[box].classList.add(playerChoice);
            squares[box].innerHTML = playerChoice === 'cross' ? cross : circle;
            nameSlide.classList.remove('left');
            nameSlide.classList.add('right');
            let index = squares[box].getAttribute('data-index');
            removeBox(index);
            playerTurn = false;
            checkForWin();
            computerTurn();
        }
    });
});


function drawMatch() {
    let result = Array.from(squares).every(square => square.classList.contains('cross') || square.classList.contains('circle'));
    return result;
};

function checkForWin() {
    let winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    winPatterns.forEach(pattern => {
        if (
            squares[pattern[0]].classList.contains('cross') &&
            squares[pattern[1]].classList.contains('cross') &&
            squares[pattern[2]].classList.contains('cross')
        ) {
            gameBoard.style.pointerEvents = 'none';
            restartBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                gameBoard.classList.remove('show');
                winPage.classList.add('show');
                restartBtn.style.pointerEvents = 'auto';
                if (playerChoice === 'cross') {
                    winText.textContent = 'You won this match.';
                } else {
                    winText.textContent = 'Computer won this match.';
                }
            }, 1000);
        } else if (
            squares[pattern[0]].classList.contains('circle') &&
            squares[pattern[1]].classList.contains('circle') &&
            squares[pattern[2]].classList.contains('circle')
        ) {
            gameBoard.style.pointerEvents = 'none';
            restartBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                gameBoard.classList.remove('show');
                winPage.classList.add('show');
                restartBtn.style.pointerEvents = 'auto';
                if (playerChoice === 'circle') {
                    winText.textContent = 'You won this match.';
                } else {
                    winText.textContent = 'Computer won this match.';
                }
            }, 500);
        } else if (drawMatch()) {
            gameBoard.style.pointerEvents = 'none';
            restartBtn.style.pointerEvents = 'none';
            setTimeout(() => {
                gameBoard.classList.remove('show');
                winPage.classList.add('show');
                restartBtn.style.pointerEvents = 'auto';
                winText.textContent = "It's a tie.";
            }, 500);
        }
    });
}

restartBtn.addEventListener('click', () => {
    playerChoice = 'cross';
    playerTurn = true;
    emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    firstPage.classList.remove('hide');
    winPage.classList.remove('show');
    squares.forEach(square => {
        square.classList.remove('cross', 'circle');
        square.innerHTML = null;
    });
    gameBoard.style.pointerEvents = 'auto';
});