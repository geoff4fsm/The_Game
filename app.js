document.addEventListener("DOMContentLoaded", () => {
//  Identify Admiral
//  while (!player){
//      const player = prompt("Admiral please enter your name") ;
//  }

// assign constants for game
const userGrid = document.querySelector(".grid-user")
const computerGrid = document.querySelector(".grid-computer")
const displayGrid = document.querySelector(".grid-display")
const ships = document.querySelectorAll(".ship")
const destroyer = document.querySelector(".destroyer-container")
const cruiser = document.querySelector(".cruiser-container")
const submarine = document.querySelector(".submarine-container")
const battleship = document.querySelector(".battleship-container")
const carrier = document.querySelector(".carrier-container")
const startButton = document.querySelector("#start")
const rotateButton = document.querySelector("#rotate")
const turnDisplay = document.querySelector("#player-turn")
const infoDisplay = document.querySelector("#info")
const width = 10 
const userSquares = []
const computerSquares = []
let horizontal = true

// Create game boards with assigned numbers for possible positions

let createBoard = ( grid, squares ) => {
    for ( let i = 0 ; i < width * width ; i++ ) {    // counter for each square
        const square = document.createElement("div")   // creates a div for each square
        square.dataset.id = i   // assign a number to each square
        grid.appendChild(square)
        squares.push(square)        
    }
}
createBoard( userGrid, userSquares )
createBoard( computerGrid, computerSquares)

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
        name: "submarine",
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
    if (randomDirection === 1) direction = 10    //  vertical
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))  // keeps ship on board
    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken")) // checks if square is already occupied by another ship
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if ( !isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach( index => computerSquares[randomStart + index].classList.add("taken", ship.name) )// adds taken to a ship if square already occupied 
    else generateShips(ship)
}
for ( let i = 0 ; i < shipArray.length ; i++)
generateShips(shipArray[i]) 

// rotate the ships

let rotate = () => {
    if ( horizontal ) {
        destroyer.classList.toggle("destroyer-container-vertical")
        cruiser.classList.toggle("cruiser-container-vertical")
        submarine.classList.toggle("submarine-container-vertical")
        battleship.classList.toggle("battleship-container-vertical")
        carrier.classList.toggle("carrier-container-vertical")
        horizontal = false
        return
    }
    if ( !horizontal ) {
        destroyer.classList.toggle("destroyer-container")
        cruiser.classList.toggle("cruiser-container")
        submarine.classList.toggle("submarine-container")
        battleship.classList.toggle("battleship-container")
        carrier.classList.toggle("carrier-container")
        horizontal = true
        return
    }
}
rotateButton.addEventListener("click", rotate)

// drag and drop player ship



let selectedShipNameWithIndex
let draggedShip
let draggedShipLength
 

ships.forEach(ship => ship.addEventListener("mousedown", (e) => { 
    selectedShipNameWithIndex = e.target.id   // name with space occupied by pointer
    console.log(selectedShipNameWithIndex)
}))

let dragStart = () => {      // this doesn't work
    draggedShip = this
    console.log(draggedShip)
    draggedShipLength = this.childNodes.length
    console.log(draggedShip + draggedShipLength)
 
 console.log(draggedShip)
 console.log(draggedShipLength)

}
let dragOver = (e) => {
    e.preventDefault()  
}
let dragEnter = (e) => {
    e.preventDefault()
}
let dragLeave = () => {
    
}
let dragDrop = () => {
    let shipNameWithLastId= draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0,-2)
    console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))  // 
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
    console.log(selectedShipIndex)
    console.log(shipLastId)
    shipLastId = shipLastId - selectedShipIndex  // corrects for end of ship from index space

    if (horizontal) {
        for ( let i = 0 ; i < draggedShipLength ; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i ].classList.add("taken" , shipClass) 
        }
    } else if (!horizontal) {
        for ( let i = 0 ; i < draggedShipLength ; i++ ) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex * width * i ].add("taken" , shipClass)
        }
    } else return
    displayGrid.removeChild(draggedShip)
}    
let dragEnd = () => {
    
}

ships.forEach(ship => ship.addEventListener("dragstart", dragStart))
userSquares.forEach(square => square.addEventListener("dragstart", dragStart))
userSquares.forEach(square => square.addEventListener("dragover", dragOver))
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter))
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave))
userSquares.forEach(square => square.addEventListener("drop", dragDrop))
userSquares.forEach(square => square.addEventListener("dragend", dragEnd))





})