document.addEventListener("DOMContentLoaded", () => {

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
let gameOver = false
let currentPlayer = "user"


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
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)  // checks if any of ship occupied squares is in last column #9
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)  //  // checks if any of ship occupied squares is in first column #0

    if ( !isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach( index => computerSquares[randomStart + index].classList.add("taken", ship.name) )// adds taken to a ship if square already occupied 
    else generateShips(ship)
}
for ( let i = 0 ; i < shipArray.length ; i++)
generateShips(shipArray[i]) //  generates each ship on computer board

// rotate the ships

let rotate = () => {
    if ( horizontal ) {
        destroyer.classList.toggle("destroyer-container-vertical") // changes horizontal to vertical container for each ship
        cruiser.classList.toggle("cruiser-container-vertical")
        submarine.classList.toggle("submarine-container-vertical")
        battleship.classList.toggle("battleship-container-vertical")
        carrier.classList.toggle("carrier-container-vertical")
        horizontal = false
        return
    }
    if ( !horizontal ) {
        destroyer.classList.toggle("destroyer-container")  //  changes back to horizontal for each ship
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



let selectedShipNameWithIndex  // ship with pointer position inside ship length
let draggedShip
let draggedShipLength
 

ships.forEach(ship => ship.addEventListener("mousedown", (e) => { 
    selectedShipNameWithIndex = e.target.id   // name with space occupied by pointer
    // console.log(selectedShipNameWithIndex)
}))

let dragStart = (e) => {      // 
    draggedShip = e.target
    //console.log(draggedShip)
    //console.log(e.target.children.length)
    draggedShipLength = e.target.children.length
 
 //console.log(draggedShip)
 //console.log(draggedShipLength)

}
let dragOver = (e) => {
    e.preventDefault()  
}
let dragEnter = (e) => {
    e.preventDefault()
}
let dragLeave = (e) => {
    
}
let dragDrop = (e) => {
    let shipNameWithLastId= draggedShip.lastChild.id
   console.log (shipNameWithLastId)
    let shipClass = shipNameWithLastId.slice(0,-2)
    console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))  // 
    let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)

    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
    const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]

    let newnotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex) // keep ship from wrapping horizontal
    let newnotAllowedVertical = notAllowedHorizontal.splice(0, 10 * lastShipIndex) // keep ship from wrapping vertical

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
//    console.log(selectedShipIndex)
//    console.log(shipLastId)
    shipLastId = shipLastId - selectedShipIndex  // corrects for end of ship from index space
//    console.log(shipLastId)
    if (horizontal && !newnotAllowedHorizontal.includes(shipLastId)) {
        for ( let i = 0 ; i < draggedShipLength ; i++) {
          userSquares[parseInt(e.target.dataset.id) - selectedShipIndex + i ].classList.add("taken" , shipClass) 
        }
    } else if (!horizontal && !newnotAllowedVertical.includes(shipLastId)) {
        for ( let i = 0 ; i < draggedShipLength ; i++ ) {
            userSquares[parseInt(e.target.dataset.id) - selectedShipIndex + width * i ].classList.add("taken" , shipClass)
        }
    } else return
    displayGrid.removeChild(draggedShip)
}    
let dragEnd = () => {
console.log("dragEnd")    
}

ships.forEach(ship => ship.addEventListener("dragstart", dragStart))
userSquares.forEach(square => square.addEventListener("dragstart", dragStart))
userSquares.forEach(square => square.addEventListener("dragover", dragOver))
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter))
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave))
userSquares.forEach(square => square.addEventListener("drop", dragDrop))
userSquares.forEach(square => square.addEventListener("dragend", dragEnd))

// Game Logic

let playGame = () => {
    if (gameOver) return
    if (currentPlayer === "user") {
        turnDisplay.innerHTML = "your turn"
        computerSquares.forEach(square => square.addEventListener("click", function(e) {
            playerTurn(square)
        }))
    }
    if (currentPlayer === "computer") {
        turnDisplay.innerHTML = "computer turn" 
        setTimeout (computerTurn(), 1000)
    }
}
startButton.addEventListener("click", playGame)

let destroyerCount = 0
let cruiserCount = 0
let submarineCount = 0
let battleshipCount = 0
let carrierCount = 0

let playerTurn = (square) => {
    if(!square.classList.contains("hit")) {
        if (square.classList.contains("destroyer")) destroyerCount++
        if (square.classList.contains("cruiser")) cruiserCount++
        if (square.classList.contains("submarine")) submarineCount++
        if (square.classList.contains("battleship")) battleshipCount++
        if (square.classList.contains("carrier")) carrierCount++
    }
    if (square.classList.contains("taken")) {
        square.classList.add("hit")
    } else {
        square.classList.add("miss")
    }
    checkSink()
    currentPlayer = "computer"
    playGame()
}

let compDestroyerCount = 0
let compCruiserCount = 0
let compSubmarineCount = 0
let compBattleshipCount = 0
let compCarrierCount = 0

let computerTurn = () => {
   let random = Math.floor(Math.random() * userSquares.length)
   if(!userSquares[random].classList.contains("hit")) {
       userSquares[random].classList.add("hit")
    if (userSquares[random].classList.contains("destroyer")) compDestroyerCount++
    if (userSquares[random].classList.contains("cruiser")) compCruiserCount++
    if (userSquares[random].classList.contains("submarine")) compSubmarineCount++
    if (userSquares[random].classList.contains("battleship")) compBattleshipCount++
    if (userSquares[random].classList.contains("carrier")) compCarrierCount++
    checkSink()
} else computerTurn()
currentPlayer = "user"
turnDisplay.innerHTML = "Your Turn"
}

let checkSink = () => {
    if (destroyerCount === 2) {
        infoDisplay.innerHTML = "You sank the computers destroyer"
        destroyerCount = 10
    }
    if (cruiserCount === 3) {
        infoDisplay.innerHTML = "You sank the computers cruiser"
        cruiserCount = 10
    }
    if (submarineCount === 3) {
        infoDisplay.innerHTML = "You sank the computers submarine"
        submarineCount = 10
    }
    if (battleshipCount === 4) {
        infoDisplay.innerHTML = "You sank the computers battleship"
        battleshipCount = 10
    }
    if (carrierCount === 5) {
        infoDisplay.innerHTML = "You sank the computers carrier"
        carrierCount = 10
    }
    if (compDestroyerCount === 2) {
        infoDisplay.innerHTML = "You sank my destroyer"
        compDestroyerCount = 10
    }
    if (compCruiserCount === 3) {
        infoDisplay.innerHTML = "You sank my cruiser"
        compCruiserCount = 10
    }
    if (compSubmarineCount === 3) {
        infoDisplay.innerHTML = "You sank my submarine"
        compSubmarineCount = 10
    }
    if (compBattleshipCount === 4) {
        infoDisplay.innerHTML = "You sank my battleship"
        compBattleshipCount = 10
    }
    if (compCarrierCount === 5) {
        infoDisplay.innerHTML = "You sank my carrier"
        compCarrierCount = 10
    }
    if ((destroyerCount + cruiserCount + submarineCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "YOU WIN !!!"
        
    }
    if ((compDestroyerCount + compCruiserCount + compSubmarineCount + compBattleshipCount + compCarrierCount) === 50) {
        infoDisplay.innerHTML = "COMPUTER WINS !!!"
        
    }

}


})