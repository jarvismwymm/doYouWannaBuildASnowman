console.log("doYouWannaBuildASnowman")


  /*----- constants -----*/
let startButton 
let instructionsDiv
let lettersButtons
let emptySpaces
let remainingTurns = 6
let resultDiv
let wordIncorrectlyGuessedDiv
let opacity = 1
let snowmanpng

  /*----- state variables -----*/
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  let activeWord

  const possibleWords = ["AVALANCHE", "ABOMINABLE", "FROSTY", "BLIZZARD", "WINTERTIME", "ICY"]

  let usersCurrentWord = ""



  /*----- event listeners -----*/
  function handleStart() {
    clear()
    console.log("starting") 
    instructionsDiv.innerHTML = "Try to guess the word one letter at a time. If you guess the wrong letter, your snowman will begin to disappear. To win, spell the entire word before your snowman fully disappears!"
    renderButtons()
    activeWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    for (let i = 0; i < activeWord.length; i++) {
        const div = document.createElement("div")
        div.classList.add("word-spaces")
        div.id = i
        emptySpaces.appendChild(div)
        usersCurrentWord += "@"
    }
    console.log(usersCurrentWord)
    userTurns()
}


function handleClick(event) {
    const clickedLetter = event.target.id
    event.target.disabled = true
    letterAppears(clickedLetter)
}

  /*----- functions -----*/
function init() {
    startButton = document.getElementById("start-button")
    startButton.addEventListener("click", handleStart)
     instructionsDiv = document.getElementById("instructions")
     lettersButtons = document.getElementById("letters-buttons")
     emptySpaces = document.getElementById("empty-spaces")
     resultDiv = document.getElementById("result")
     wordIncorrectlyGuessedDiv = document.getElementById("word-incorrectly-guessed")
     snowmanpng = document.getElementById("snowman-png")
}


function renderButtons() {
    for (let i = 0; i < alphabet.length; i++) {
        const currentLetter = alphabet[i]
        const button = document.createElement("button")
        button.addEventListener("click", handleClick)
        button.setAttribute("id", currentLetter)
        button.innerHTML = currentLetter
        lettersButtons.appendChild(button)
    }
}


function letterAppears(clickedLetter) {
    console.log(clickedLetter)
    const splitActiveWord = activeWord.split("")
    console.log(splitActiveWord)
    if (splitActiveWord.includes(clickedLetter)) {
        for (let i = 0; i < splitActiveWord.length; i++) {
            const currentLetter = splitActiveWord[i]
            if (currentLetter == clickedLetter) {
                document.getElementById(i).innerHTML = clickedLetter
                usersCurrentWord = usersCurrentWord.split("")
                usersCurrentWord[i] = clickedLetter
                usersCurrentWord = usersCurrentWord.join("")
            }
        }
    }
    else {
        remainingTurns -= 1
        opacity -= .17
        if (opacity < 0) {
            opacity = 0
        }
        userTurns()
        changeOpacity()
    }
    checkForResult()
    console.log(usersCurrentWord)
}

function userTurns() {
        const userTurns = document.getElementById("turns")
        userTurns.innerHTML = "You have " + remainingTurns + " turns remaining!"

}

function checkForResult() {
    if (remainingTurns == 0) {
        resultDiv.innerHTML = "You Lose"
        wordIncorrectlyGuessedDiv.innerHTML = "The Correct Word Was " + activeWord + " !"
        disableButtons()
    }
    if (usersCurrentWord == activeWord) {
        resultDiv.innerHTML = "You Win"
        disableButtons()
    }
}

function clear() {
    lettersButtons.innerHTML = ""
    emptySpaces.innerHTML = ""
    remainingTurns = 6
    userTurns()
    usersCurrentWord = ""
    resultDiv.innerHTML = ""
    wordIncorrectlyGuessedDiv.innerHTML= ""
    snowmanpng.style.opacity = 1
    opacity = 1
}

function disableButtons() {
    for (let i = 0; i < alphabet.length; i++) {
        const currentLetter = alphabet[i]
        document.getElementById(currentLetter).disabled = true
    }
}

function changeOpacity() {
    snowmanpng.style.opacity = opacity
}


init()

