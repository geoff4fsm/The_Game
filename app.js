//  Identify Admiral
//  while (!player){
//      const player = prompt("Admiral please enter your name") ;
//  }

// assign constants for game
const userBoard = document.querySelector(".board-user")
const computerBoard = document.querySelector(".board-computer")
const gameBoard = document.querySelector(".board-game")
const ships = document.querySelectorAll(".ship")
const destroyer = document.querySelector(".destroyer-container")
const cruiser = document.querySelector(".cruiser-container")
const battleship = document.querySelector(".battleship-container")
const carrier = document.querySelector(".carrier-container")
const startButton = document.querySelector("#start")
const rotateButton = document.querySelector("#rotate")
const turnDisplay = document.querySelector("#player-turn")
const infoDisplay = document.querySelector("#info")
const width = 8 
const userSquares = []
const computerSquares = []

// Create game boards with assigned numbers for possible positions

let createBoard = ( board, squares ) => {
    for ( let i = 0 ; i < width * width ; i++ ) {    // counter for each square
        const square = document.createElement("div")   // creates a div for each square
        square.dataset.id = i   // assign a number to each square
        board.appendChild(square)
        squares.push(square)        
    }
}
createBoard( userBoard, userSquares )
createBoard( computerBoard, computerSquares)

// Ships

const shipArray = [ // array of ships to be placed randomly by computer
    {
    name: "destroyer",
        directions: [       // possible directions of ship
            [0, 1],        // horizontal
            [0, width]     // verticle
        ]
    },
    {
    name: "cruiser",
        directions: [
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
    name: "battleship",
        directions: [
            [0, 1, 2, 3],
            [0, width, width*2, width*3]
        ]
    },
    {
    name: "carrier",
        directions: [
            [0, 1, 2,,3 ,4],
            [0, width, width*2, width*3, width*4]
        ]
    }
]

// place computer ships in random location

let generateShips = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1    //  horizontal
    if (randomDirection === 1) direction = 8    //  verticle
    let randomStart = Math.floor(Math.random() * computerSquares.length - ship.directions[0].length * randomDirection)  // keeps ship on board

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken"))
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if ( !isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach( index => computerSquares[randomStart + index].classList.add("taken", ship.name) )// adds taken to 
    else generateShips(ship)
}



    






