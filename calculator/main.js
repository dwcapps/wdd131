import { evaluateExpression, isNumber } from './utils.js';


let currentInput = [];
const display = document.getElementById('display');

function handleButtonPress(value) {
    // Block input if the display is full
    const displayString = currentInput.join('');
    if (displayString.length >= 22) {
        return;
    }

    // If the input list is empty and the value is an integer, add it.
    if (currentInput.length === 0 && isNumber(value) && value !== '.') {
        currentInput.push(value);
        updateDisplay(currentInput.join(''));
        return;
    }

    const last = currentInput[currentInput.length - 1];
    const opperands = ['+', '-', '/', '*']
    // If the last list element would still be a valid single number when you
    // add the new element, concat them.
    if (isNumber(last + value) && last !== '-') {
        currentInput[currentInput.length - 1] += value;
    }
    // If the decimal wasn't valid in the last check, don't add it at all.
    else if (value === '.') {
        return
    }
    // Don't allow two opperands back to back.
    else if (opperands.includes(last) && opperands.includes(value)) {
        return
    }
    else {
        currentInput.push(value);
    }
    updateDisplay(currentInput.join(''));
}

function handleEquals() {
    const result = evaluateExpression(currentInput);
    if (result == null) {
        return //Expression was invalid, do nothing.
    }
    currentInput = [];
    currentInput.push(result.toString());
    updateDisplay(result);
}

function handleClear() {
    currentInput = [];
    updateDisplay('0');
}

function handleBackspace() {
    if (currentInput[currentInput.length - 1].length === 1) {
        currentInput.pop();
    }
    else {
        currentInput[currentInput.length - 1] = currentInput[currentInput.length - 1].slice(0, -1);
    }
    if (currentInput) {
        updateDisplay(currentInput.join(''));
    } else {
        updateDisplay('0');
    }
}

function handleNegate() {
    // Iterate backwards through the list and negate the first number seen
    for (let i = currentInput.length - 1; i >= 0; i--) {
        const token = currentInput[i];
        if (isNumber(token)) {
            const flipped = (-parseFloat(token)).toString();
            currentInput[i] = flipped;
            updateDisplay(currentInput.join(''));
            return;
        }
    }
}

function updateDisplay(value) {
    console.log(currentInput)
    display.textContent = value;
}

function init() {
    document.querySelectorAll('.button-grid button').forEach(button => {
        const value = button.dataset.value;

        button.addEventListener('click', () => {
            // If the display contains any letters anywhere, clear it. 
            if (currentInput.some(token => [...token].some(char => (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z')))) {
                currentInput = [];
                updateDisplay('0');
            }

            if (value) {
                handleButtonPress(value);
            } else if (button.id === 'equals') {
                handleEquals();
            } else if (button.id === 'clear') {
                handleClear();
            } else if (button.id === 'backspace') {
                handleBackspace();
            } else if (button.id === 'negate') {
                handleNegate();
            }
        });
    });
}

init();