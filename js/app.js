'use strict'
var min = 0
var sec = 0
var milisec = 0
var startWatch

var elMin = document.querySelector('.min')
var elSec = document.querySelector('.sec')
var elMilisec = document.querySelector('.milisec')

const VERY_EASY = 9
const EASY = 16
const MEDIUM = 25
const HARD = 36
var gNumbers
var gBoard
var getBoardCells = VERY_EASY
var startPoint

function init() {
    startPoint = 1
    setText()
    generateNumbers(getBoardCells)
    renderBoard(getBoardCells)
    resetWatch()
}

function generateNumbers(num) {
    gNumbers = []
    for (var i = 1; i < num + 1; i++) {
        gNumbers.push(i)
    }
    return gNumbers.sort(() => Math.random() - 0.5)
}

function renderBoard(num) {
    var elBoardBody = document.querySelector('tbody')
    var boardHTML = ''
    for (var i = 0; i < Math.sqrt(num); i++) {
        boardHTML += `<tr>`
        for (var j = 0; j < Math.sqrt(num); j++) {
            boardHTML +=
                `<td onclick="check(this)">${gNumbers.pop()}</td>`
        }
        boardHTML += `</tr>`
    }
    elBoardBody.innerHTML = boardHTML
}

function check(elTd) {
    var elSpan = document.querySelector('.counter')
    var elP = document.querySelector('.current-value')
    if (+elSpan.innerText === 1) runWatch()

    if (+elTd.innerText === +elSpan.innerText) {
        startPoint++
        elTd.style.backgroundColor = "lightBlue"
        elSpan.innerText = startPoint
    }

    if (startPoint > getBoardCells) {
        stopWatch()
        elP.innerHTML = "You are Victorius!!! <br />Pick another difficulty!"
    }
}

function setText() {

    var ElcurrNum = document.querySelector(".current-value")
    var numHTML = `Press on Number <span class ="counter">${startPoint}</span>`
    ElcurrNum.innerHTML = numHTML

}

function reset() {
    init()
}

function getDifficulty(elBtn) {

    if (elBtn.innerText === 'Very easy') {
        getBoardCells = VERY_EASY

    } else if (elBtn.innerText === 'Easy') {
        getBoardCells = EASY
    }
    else if (elBtn.innerText === 'Medium') {
        getBoardCells = MEDIUM
    }
    else if (elBtn.innerText === 'Hard') {
        getBoardCells = HARD
    }

    reset()

}

function runWatch() {
    startWatch = setInterval(() => {
        milisec += 25
        setTimerText()
        if (milisec > 999) {
            sec++
            milisec = 0
        }
        if (sec == 60) {
            min++
            sec = 0
        }
    }, 25)
}

function stopWatch() {
    clearInterval(startWatch)
}

function resetWatch() {
    clearInterval(startWatch)
    min = 0
    sec = 0
    milisec = 0
    setTimerText()

}

function setTimerText() {
    if (milisec < 100) {
        elMilisec.innerText = '0' + milisec
    } else {
        elMilisec.innerText = milisec
    }
    if (sec < 10) {
        elSec.innerText = '0' + sec
    } else {
        elSec.innerText = sec
    }
    if (min < 10) {
        elMin.innerText = '0' + min
    } else {
        elMin.innerText = min
    }
}