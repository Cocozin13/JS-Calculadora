//Variables

let operator = null 
let num1 = ''
let num2 = ''
let reset = false 
let numsBtns = document.querySelectorAll(".nums")
let displayedNum = document.querySelector(".dispNum")
let prevOperation = document.querySelector(".prevNum")
let deleteBtn =  document.querySelector(".delete")
let clearBtn = document.querySelector(".clear")
let operatorsBtn = document.querySelectorAll(".signs")
let equalsBtn = document.querySelector(".equals")
let decimalBtn = document.querySelector(".decimal")

// Inputs

numsBtns.forEach((button)=>
    button.addEventListener('click', () => appendNum(button.textContent))
)

operatorsBtn.forEach((button) =>
    button.addEventListener('click', () => setOperator(button.textContent))
)

window.addEventListener('keydown' , keyboardInputs)
equalsBtn.addEventListener('click', result)
deleteBtn.addEventListener('click', deleteNum)
clearBtn.addEventListener('click', allClear)
decimalBtn.addEventListener('click', appendDecimal)

// Show number on screen

function appendNum(num) {
    if (displayedNum.textContent === '0' || reset)
        resetScreen()
    displayedNum.textContent += num
}

// Show decimal on screen

function appendDecimal() {
    if (displayedNum.textContent === '')
        displayedNum.textContent = '0'
    if (displayedNum.textContent.includes('.')) return
    displayedNum.textContent += '.'
}

//Show operator on screen

function setOperator(sign) {
    if (operator !== null) result()
    num1 = displayedNum.textContent
    operator = sign
    prevOperation.textContent = `${num1} ${operator}`
    reset = true
}

// Reset screen

function resetScreen() {
    displayedNum.textContent = ""
    reset = false
}

// All Clear screen function

function allClear() {
    displayedNum.textContent = 0
    prevOperation.textContent = ""
    num1 = ""
    num2 = ""
    operator = null
}

// Delete a digit function

function deleteNum() {
    displayedNum.textContent = displayedNum.textContent.toString().slice(0, -1)
}

// Round a result

function roundNum(num) {
    return Math.round(num * 1000) / 1000;
}

// Show result

function result() {
    if (operator === null || reset) return
    if (operator === '÷' && displayedNum.textContent ==='0') {
        alert('Infinity')
        return
    }
    num2 = displayedNum.textContent
    displayedNum.textContent = roundNum(operate(operator, num1, num2))
    prevOperation.textContent = `${num1} ${operator} ${num2} =`
    operator = null
}

//Keyboard Inputs

function keyboardInputs(e) {
    if (e.key >= 0 && e.key <= 9) appendNum(e.key)
    if (e.key === '.') appendDecimal
    if (e.key === '=' || e.key === 'Enter') result()
    if (e.key === 'Backspace') deleteNum()
    if (e.key === 'Escape') allClear()
    if (e.key === '+' || e.key === '-') setOperator(e.key)
    if (e.key === '/' || e.key === '*') setOperator(convertSign(e.key))
}

// Sign convertion

function convertSign(operator) {
    if (operator === '/') return '÷'
    if (operator === '*') return 'x'
}

// Math operators

function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

//Main logic

function operate(sign, num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)

    switch (sign) {
        case "+" :
            return add(num1,num2)
        case "-" :
            return subtract(num1,num2)
        case "x" :
            return multiply(num1,num2)
        case "÷" :
            if (num2 === 0) return null
            else return divide(num1,num2)
        default:
            return null
    }
}