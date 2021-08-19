document.addEventListener("DOMContentLoaded", () => {  // loads entire HTML page first

// assign constants for game
const userGrid = document.querySelector(".grid-user")  // player board
const computerGrid = document.querySelector(".grid-computer")  // computer board
const displayGrid = document.querySelector(".grid-display")  // staging board for ships to be placed
const ships = document.querySelectorAll(".ship")  // ships = all possible ships 
const destroyer = document.querySelector(".destroyer-container") 
const cruiser = document.querySelector(".cruiser-container")
const submarine = document.querySelector(".submarine-container")
const battleship = document.querySelector(".battleship-container")
const carrier = document.querySelector(".carrier-container")
const startButton = document.querySelector("#start")  // start game play
//const restartButton = document.querySelector("#restart")
const rotateButton = document.querySelector("#rotate")  // rotate ships for placement
const turnDisplay = document.querySelector("#player-turn") // whose turn is it
const infoDisplay = document.querySelector("#info")  // information on sunken ships 
const width = 10 
const userSquares = []
const computerSquares = []
let horizontal = true  // 
let isGameOver = false
let currentPlayer = "user"


// Create game boards with assigned numbers for possible positions

let createBoard = ( grid, squares ) => {
    for ( let i = 0 ; i < width * width ; i++ ) {    // counter for each square
        const square = document.createElement("div")   // creates a div for each square
        square.dataset.id = i   // assign a number to each square
        grid.appendChild(square)  // adds square to each grid node
        squares.push(square)      // pushes square to board array  
    }
}
createBoard( userGrid, userSquares )   // user board
createBoard( computerGrid, computerSquares)  // computer board

// Ships

const shipArray = [ // array of ships to be placed randomly by computer
    {
    name: "destroyer",
        directions: [       // possible directions of ship array with ship length
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

// place computer ships in random locations


let generateShips = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)  //  chooses random direction for each ship horizontal/vertical
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1    //  horizontal
    if (randomDirection === 1) direction = 10    //  vertical
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))  // keeps ship on board
    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken")) // checks if square is already occupied by another ship
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)  // checks if any of ship occupied squares is in last column #9
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)    // checks if any of ship occupied squares is in first column #0

    if ( !isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach( index => computerSquares[randomStart + index].classList.add("taken", ship.name) )// adds taken and ship name to a placed ship squares occupied
    else generateShips(ship)  // if already taken or at edges run function again
}
for ( let i = 0 ; i < shipArray.length ; i++)
generateShips(shipArray[i]) //  generates each ship on computer board

// rotate the ships

let rotateShips = () => {
    if ( horizontal ) {
        destroyer.classList.toggle("destroyer-container-vertical") // changes horizontal to vertical container for each ship
        cruiser.classList.toggle("cruiser-container-vertical")
        submarine.classList.toggle("submarine-container-vertical")
        battleship.classList.toggle("battleship-container-vertical")
        carrier.classList.toggle("carrier-container-vertical")
        horizontal = false
        return
    }
    else  {
        destroyer.classList.toggle("destroyer-container")  //  changes back to horizontal for each ship
        cruiser.classList.toggle("cruiser-container")
        submarine.classList.toggle("submarine-container")
        battleship.classList.toggle("battleship-container")
        carrier.classList.toggle("carrier-container")
        horizontal = true
        return
    }
}
rotateButton.addEventListener("click", rotateShips)

// drag and drop player ship

let selectedShipNameWithIndex  // ship with pointer position inside ship length
let draggedShip  // ship being dragged
let draggedShipLength  // length of ship being dragged
 
ships.forEach(ship => ship.addEventListener("mousedown", (e) => { 
    selectedShipNameWithIndex = e.target.id   // name with space occupied by pointer
   // console.log(selectedShipNameWithIndex)
}))

let dragStart = (e) => {       
    draggedShip = e.target  // console.log(draggedShip)  
    draggedShipLength = e.target.children.length  // console.log(e.target.children.length)

}
let dragOver = (e) => {    
    e.preventDefault()  
}
let dragEnter = (e) => {    
    e.preventDefault()
}
let dragLeave = (e) => {  
    e.preventDefault()
}
let dragDrop = (e) => {
    let shipNameWithLastId = draggedShip.lastChild.id  // ship with id of last square contained in ship container example cruiser 2
    let shipClass = shipNameWithLastId.slice(0,-2)  // removes id of last square leaving ship class only
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))  // changes string of last square index number to an integer (position of pointer in ship being placed)
    let shipLastId = lastShipIndex + parseInt(e.target.dataset.id)  // position number of ship on board from index position
    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]  //  keeps ship from wrapping horizontal
    const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]  //  keeps ship from wrapping vertical

    let newnotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex) // keeps ship from wrapping horizontal only using numbers needed for ship length
    let newnotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex) // keeps ship from wrapping vertical only using numbers needed for ship length

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))  // returns last element of string (index position) as an integer to add to square number
    shipLastId = shipLastId - selectedShipIndex  // corrects for end of ship from index space
    if (horizontal && !newnotAllowedHorizontal.includes(shipLastId)) {
        for ( let i = 0 ; i < draggedShipLength ; i++) {  // places each square of ship length horizontal
          userSquares[parseInt(e.target.dataset.id) - selectedShipIndex + i ].classList.add("taken" , shipClass) // adds "taken" and ship class to all squares of placed ship horizontal
        }
    } else if (!horizontal && !newnotAllowedVertical.includes(shipLastId)) {
        for ( let i = 0 ; i < draggedShipLength ; i++ ) {  // places each square of ship length vertical
            userSquares[parseInt(e.target.dataset.id) - selectedShipIndex + width * i ].classList.add("taken" , shipClass)  // adds "taken" and ship class to all squares of placed ship vertical
        }
    } else return
    displayGrid.removeChild(draggedShip)  // remove placed ship from staging board
}    
let dragEnd = () => {
    
}

ships.forEach(ship => ship.addEventListener("dragstart", dragStart))  // start dragging
userSquares.forEach(square => square.addEventListener("dragstart", dragStart))  //  start dragging
userSquares.forEach(square => square.addEventListener("dragover", dragOver))  //  over square
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter))  //  enter new square
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave))  //  leave a square
userSquares.forEach(square => square.addEventListener("drop", dragDrop))  //  drop ship
userSquares.forEach(square => square.addEventListener("dragend", dragEnd))   // end

// Game Logic

let playGame = () => {
    if (isGameOver) return
    if (currentPlayer === "user") {
        turnDisplay.innerHTML = "your turn"
        computerSquares.forEach(square => square.addEventListener("click", function(e) {  // clicked square calls player turn function
            playerTurn(square)
        }))
    }
    if (currentPlayer === "computer") {
        turnDisplay.innerHTML = "computer turn" 
        setTimeout (computerTurn, 1000) // sets delay for computer turn
    }
}
startButton.addEventListener("click", playGame)

let destroyerCount = 0   // variables to  check if computers ship has been sunk
let cruiserCount = 0
let submarineCount = 0
let battleshipCount = 0
let carrierCount = 0

let playerTurn = (square) => {
    if( square.classList.contains("hit") || square.classList.contains("miss") ) {  // checks if square clicked previously
        playerTurn()
    }
        if (square.classList.contains("destroyer")) destroyerCount++  // adds to player ship hit count
        if (square.classList.contains("cruiser")) cruiserCount++
        if (square.classList.contains("submarine")) submarineCount++
        if (square.classList.contains("battleship")) battleshipCount++
        if (square.classList.contains("carrier")) carrierCount++
    
    if (square.classList.contains("taken")) {
        square.classList.add("hit")  // adds "hit" to taken square
    } else {
        square.classList.add("miss")  // adds "miss" if not taken
    }
    checkSink()
    currentPlayer = "computer"
    playGame()
}

let compDestroyerCount = 0  // variables to check if players ship has been sunk
let compCruiserCount = 0
let compSubmarineCount = 0
let compBattleshipCount = 0
let compCarrierCount = 0

let computerTurn = () => {
   let random = Math.floor(Math.random() * userSquares.length)
   if(!userSquares[random].classList.contains("hit")) {
       userSquares[random].classList.add("hit")  // adds "hit" to any random square chosen by computer
    if (userSquares[random].classList.contains("destroyer")) compDestroyerCount++  // adds to computer ship hit count
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
        infoDisplay.innerHTML = "You sank the computer's destroyer"
        destroyerCount = 10  // increase all ships count to eliminate possible problems with variable ship hit totals
    }
    if (cruiserCount === 3) {
        infoDisplay.innerHTML = "You sank the computer's cruiser"
        cruiserCount = 10
    }
    if (submarineCount === 3) {
        infoDisplay.innerHTML = "You sank the computer's submarine"
        submarineCount = 10
    }
    if (battleshipCount === 4) {
        infoDisplay.innerHTML = "You sank the computer's battleship"
        battleshipCount = 10
    }
    if (carrierCount === 5) {
        infoDisplay.innerHTML = "You sank the computer's carrier"
        carrierCount = 10
    }
    if (compDestroyerCount === 2) {
        infoDisplay.innerHTML = "Computer sank my destroyer"
        compDestroyerCount = 10
    }
    if (compCruiserCount === 3) {
        infoDisplay.innerHTML = "Computer sank my cruiser"
        compCruiserCount = 10
    }
    if (compSubmarineCount === 3) {
        infoDisplay.innerHTML = "Computer sank my submarine"
        compSubmarineCount = 10
    }
    if (compBattleshipCount === 4) {
        infoDisplay.innerHTML = "Computer sank my battleship"
        compBattleshipCount = 10
    }
    if (compCarrierCount === 5) {
        infoDisplay.innerHTML = "Computer sank my carrier"
        compCarrierCount = 10
    }
    if ((destroyerCount + cruiserCount + submarineCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "YOU WIN !!!"
        gameOver()
    }
    if ((compDestroyerCount + compCruiserCount + compSubmarineCount + compBattleshipCount + compCarrierCount) === 50) {
        infoDisplay.innerHTML = "COMPUTER WINS !!!"
        gameOver()
    }

}

let gameOver = () => {
    isGameOver = true
    startButton.removeEventListener("click" , playGame)
}
// restartButton.addEventListener("click", restartGame)
// let restartGame = () => {
//     isGameOver = false
//     createBoard()
//     generateShips()
//     playGame()
// }
})