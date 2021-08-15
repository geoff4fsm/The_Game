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
let horizontal = true

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
        directions: [       // possible directions of ship array
            [0, 1],        // horizontal
            [0, width]     // vertical
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
            [0, 1, 2, 3 ,4],
            [0, width, width*2, width*3, width*4]
        ]
    }
]
// place computer ships in random location

let generateShips = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1    //  horizontal
    if (randomDirection === 1) direction = 8    //  vertical
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))  // keeps ship on board
console.log(current , randomStart)
    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken")) // checks if square is already occupied by another ship
    console.log(isTaken)
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if ( !isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach( index => computerSquares[randomStart + index].classList.add("taken", ship.name) )// adds taken to a ship if square already occupied 
    else generateShips(ship)
}
for ( let j = 0 ; j < shipArray.length ; j++)
generateShips(shipArray[j]) 

// rotate the ships

let rotate = () => {
    if ( horizontal ) {
        destroyer.classList.toggle("destroyer-container-vertical")
        cruiser.classList.toggle("cruiser-container-vertical")
        battleship.classList.toggle("battleship-container-vertical")
        carrier.classList.toggle("carrier-container-vertical")
        horizontal = false
    }
}
rotateButton.addEventListener("click", rotate)






    






