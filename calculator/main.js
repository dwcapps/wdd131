let currentInput = [];

const display = document.getElementById('display');

function handleButtonPress(value) {
    const last = currentInput[currentInput.length - 1];
    if (isNumber(value)) {
        currentInput[currentInput.length - 1] += value;
    }
    currentInput.push(value);
    updateDisplay(currentInput);
}

function isNumber(value) {

}

function handleEquals() {
    const result = evaluateExpression(currentInput.join(''));
    currentInput = [];
    currentInput.push(value);
    updateDisplay(result);
}

function evaluateExpression(expr) {
    try {
        return eval(expr);
    } catch (e) {
        return expr; //Do nothing if expression is invalid
    }
}

function clearDisplay() {
    currentInput = [];
    updateDisplay('0');
}

function handleBackspace() {
    currentInput.pop();
    if (currentInput) {
        updateDisplay(currentInput.join(''));
    } else {
        updateDisplay('0');
    }
}

function handleNegate() {
    if (!currentInput || currentInput == "0") return;

    // If last number is already negative, remove the minus
    const lastNumberMatch = currentInput.match(/-?\d+(\.\d+)?$/);
    if (!lastNumberMatch) return;

    const number = lastNumberMatch[0];
    const negated = number.startsWith('-') ? number.slice(1) : '-' + number;

    currentInput = currentInput.slice(0, -number.length) + negated;
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.textContent = value;
}

document.querySelectorAll('.button-grid button').forEach(button => {
    const value = button.dataset.value;

    button.addEventListener('click', () => {
        if (value) {
        handleButtonPress(value);
        } else if (button.id === 'equals') {
        handleEquals();
        } else if (button.id === 'clear') {
        clearDisplay();
        } else if (button.id === 'backspace') {
        handleBackspace();
        } else if (button.id === 'negate') {
        handleNegate();
        }
    });
});
