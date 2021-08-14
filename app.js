//  Identify Admiral
//  while (!player){
//      var player = prompt("Admiral please enter your name") ;
//  }
const userBoard = document.querySelector(".user-board")
const computerBoard = document.querySelector(".computer-board")
const gameBoard = document.querySelector(".game-board")
const ships = document.querySelectorAll(".ship")
const destroyer = document.querySelector(".destroyer")
const cruiser = document.querySelector(".cruiser")
const battleship = document.querySelector(".battleship")
const startButton = document.querySelector("#start")
const rotateButton = document.querySelector("#rotate")
const turnDisplay = document.querySelector("#player-turn")
const infoDisplay = document.querySelector("#info")
const width = 8 
const userSquares = []
const computerSquares = []

let createBoard = ( board, squares ) => {
    for ( let i = 0 ; i < width * width ; i++ ) {
        const square = document.createElement("div")
        square.dataset.id = i
        board.appendChild(square)
        squares.push(square)
    }
}
createBoard( user-board, userSquares )
createBoard( computer-board, computerSquares)



