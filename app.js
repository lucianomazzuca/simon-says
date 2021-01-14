const startBtn = document.querySelector('#start');
const squares = document.querySelectorAll('.square');

let selectedMachine = [];
let selectedPlayer  = [];
let round = 1;

startBtn.addEventListener('click', playRound);

function playRound() {
    // Delete lost message
    hideLossMsg()
    
    // Block square click
    disableSquares()
    disableStartBtn()
    
    // Adds a new square to the machine sequence
    const square = getRandomSquare();
    selectedMachine.push(square);

    // Change squares opacity based on machine sequence
    selectedMachine.forEach((square, index) => {
        const timeout = (index + 1) * 1000;

        setTimeout(() => {
            changeSquareColor(square, 500)
        }, timeout);
    })

    // Let Player play after the machine finishes displaying the sequence
    const playerTimeout = (round * 1000) + 500;
    
    setTimeout(() => {
        selectedPlayer = [];
        enableSquares()
    }, playerTimeout);
}

function playerClickSquare(e) {
    changeSquareColor(e.target.id, 100)
    
    // Clear player array
    selectedPlayer.push(e.target.id)

    let lastSelectedPlayer = selectedPlayer.length - 1;

    // Compare last element square selected by player with the corresponding selectedMachine element
    if(selectedPlayer[lastSelectedPlayer] === selectedMachine[lastSelectedPlayer]) {
        // Check if the machine sequence has been completed
        if(selectedPlayer.length === selectedMachine.length) {
            handleWin();
            console.log('ganaste la ronda')
        } else {
            console.log('vas bien');
        }
    } else {
        console.log('la cagaste')
        reset();
        showLossMsg()
    }
}


function handleWin() {
    selectedPlayer = [];
    round++
    changeRoundDisplay(round);
    playRound();
}


function showLossMsg(msg) {
    document.querySelector('.lost-msg').style.visibility = 'visible';
}

function hideLossMsg() {
    document.querySelector('.lost-msg').style.visibility = 'hidden';
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
    enableStartBtn()
}

function changeRoundDisplay(number) {
    const roundDisplay = document.querySelector('#round');

    roundDisplay.innerText = round;
}

function enableSquares() {
    squares.forEach(square => {
        square.style.cursor = 'pointer'
        square.addEventListener('click', playerClickSquare)
    })
}

function disableSquares() {
    squares.forEach(square => {
        square.style.cursor = 'auto'
        square.removeEventListener('click', playerClickSquare)
    })
}

function disableStartBtn() {
    startBtn.removeEventListener('click', playRound);
    startBtn.style.background = 'gray';
    startBtn.style.cursor = 'auto'
}

function enableStartBtn() {
    startBtn.addEventListener('click', playRound);
    startBtn.style.background = '#FB923C';
    startBtn.style.cursor = 'pointer'
}

