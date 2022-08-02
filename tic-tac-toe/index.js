const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("#reset");
const restartButton = document.querySelector("#restart");
const playerLeft = document.getElementById("lijevi");
const playerRight = document.getElementById("desni");
var leftScore = document.getElementById("lijeviscore");
var rightScore = document.getElementById("desniscore");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isEmpty = ["", "", "", "", "", "", "", "", ""];

//player 0 is supposed to be X player which always starts first

var currentPlayer = 0;
var gamesPlayed = 0;


startGame();

function startGame(){
    cells.forEach(x => x.addEventListener('click', cellSelected));
}

function cellSelected(){
    const cellIndex = this.getAttribute("cellIndex");

   // console.log("Hello from Cell Selected!");

    if(isEmpty[cellIndex] != "")
    {
        return;
    }

    updateCell(this, cellIndex);  
    checkWinn();
}

function updateCell(cell, index){
   if(currentPlayer == 0)
   {
        isEmpty[index] = "X";
        cell.textContent = "X";
   }
   else 
   {
        isEmpty[index] = "O";
        cell.textContent = "O";
   }
}

function switchPLayer(){
   // console.log("Player Switched!");

    if(currentPlayer == 0)
    {
        currentPlayer = 1;
        playingDude(1);
    }
    else if(currentPlayer== 1){
        currentPlayer = 0;
        playingDude(0);
    }
}

function playingDude(playing){
    if(playing == 0){
        playerLeft.classList.remove("trenutni");
        playerRight.classList.add("trenutni");
    }
    else if(playing == 1)
    {
        playerRight.classList.remove("trenutni");
        playerLeft.classList.add("trenutni");
    }
}

function checkWinn(){
    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++)
    {
        const condition = winningConditions[i];
        const cellA = isEmpty[condition[0]];
        const cellB = isEmpty[condition[1]];
        const cellC = isEmpty[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "")
        {
            continue;
        }

        if(cellA == cellB && cellB == cellC)
        {
            roundWon = true;
            gamesPlayed += 1;
            hasStarted = false;
            break;
        }
    }

    if(roundWon == true)
    {
      setTheScore(currentPlayer);
      if(currentPlayer == 0)
      {
          leftWon += 1;
      }
      else if (currentPlayer == 1)
      {
          rightWon += 1;
      }
  
      restartGame();
    }
    else if(!isEmpty.includes(""))
    {
        restartGame();
      // console.log("Draw!");
    }
    else
    {
        switchPLayer();
    }
  
}

const numbers = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var leftWon = 0;
var rightWon = 0;

function setTheScore(playing)
{
   // console.log(currentPlayer + " player adds 1 wins!");
    if(playing == 0)
    {
        leftScore.textContent = numbers[leftWon];
    }
    else if(playing == 1)
    {
        rightScore.textContent = numbers[rightWon];
    }
}


function restartGame(){
  //  console.log("i restarted the game")
 
    switchPLayer();
    isEmpty = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(x => x.textContent = "");
    startGame();
}

function resetGame(){
    playingDude(0);
    gamesPlayed = 0;
    currentPlayer = 0;
    leftScore.textContent = "0";
    rightScore.textContent = "0";
    leftWon = 0;
    rightWon = 0;
    isEmpty = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(x => x.textContent = "");
    startGame();
    
}