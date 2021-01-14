const startBtn = document.querySelector('#start');
const squares = document.querySelectorAll('.square');

let selectedMachine = [];
let selectedPlayer  = [];
let round = 1;

startBtn.addEventListener('click', playRound);

function playRound() {
    // Block square click
    disableSquares()
    
    // Adds a new square to the machine sequence
    const square = getRandomSquare();
    selectedMachine.push(square);

    // Change squares opacity based on machine array
    selectedMachine.forEach((square, index) => {
        // Each iteration adds an extra second to timeout so that we can see the opacity change in order
        const timeout = (index + 1) * 1000;

        setTimeout(() => {
            changeSquareColor(square, 500)
        }, timeout);
    })

    // Let Player play
    const playerTimeout = (round * 1000) + 500;
    
    setTimeout(() => {
        selectedPlayer = [];
        enableSquares()
    }, playerTimeout);
}

function enableSquares() {
    squares.forEach((square, index) => {
        square.style.cursor = 'pointer'
        square.addEventListener('click', playerClickSquare)
    })

    console.log('You can click the squares now')
}

function disableSquares() {
    squares.forEach((square) => {
        square.style.cursor = 'auto'
        square.removeEventListener('click', playerClickSquare)
    })
    console.log('squares disabled')
}

function playerClickSquare(e) {
    changeSquareColor(e.target.id, 100)
    
    // Clear player array
    selectedPlayer.push(e.target.id)

    selectedPlayer.forEach((square, index) => {
        if (square == selectedMachine[index]) {
            if (index == selectedMachine.length - 1) {
                selectedPlayer = [];
                round++
                changeRoundDisplay(round);
                playRound();
            }
            console.log('vas bien');
        } else {
            console.log('You lose, restarting')
            reset();
        }
    })
}

function changeSquareColor(squareId, timeout) {
    const square = document.getElementById(squareId)
    
    // Change opacity
    square.style.opacity = '0.5';

    // Revert opacity after 500ms
    setTimeout(() => {
        square.style.opacity = '1';
    }, timeout);
}

function getRandomSquare() {
    const squares = document.querySelectorAll('.square');
    const randomNumber = Math.floor((Math.random()) * 4);

    return squares[randomNumber].id
}

function reset() {
    selectedPlayer = [];
    selectedMachine = [];
    round = 1;

    changeRoundDisplay(round)
    disableSquares()
}

function changeRoundDisplay(number) {
    const roundDisplay = document.querySelector('#round');

    roundDisplay.innerText = round;
}

