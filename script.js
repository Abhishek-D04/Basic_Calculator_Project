let currentInput = ''; // Current number being entered
let previousInput = ''; // Previous number for operations
let operator = null; // Current operator (+, -, *, /)
let memory = 0; // Memory storage for M+, M-, MR, MC

// Append numbers and decimal points
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    currentInput += number;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operation');
    display.textContent = currentInput || '0';
    operationDisplay.textContent = operator ? `${previousInput} ${operator}` : '';
}

// Clear the calculator
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Choose an operator for the operation
function chooseOperation(selectedOperator) {
    if (currentInput === '') return; // Prevent setting operator without input
    if (previousInput !== '') {
        compute(); // Perform previous computation
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

// Compute the result of the operation
function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return; // Prevent invalid computations

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = curr === 0 ? 'Error' : prev / curr; // Handle division by zero
            break;
        default:
            return;
    }
    currentInput = computation.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Calculate the square root
function calculateSquareRoot() {
    if (currentInput === '') {
        currentInput = '0'; // Default to 0 if no input
    }

    const value = parseFloat(currentInput);

    if (isNaN(value)) {
        currentInput = 'Error'; // Handle invalid input gracefully
    } else if (value < 0) {
        currentInput = 'Error'; // Handle negative numbers
    } else {
        currentInput = Math.sqrt(value).toString(); // Perform square root calculation
    }

    updateDisplay();
}

// Calculate the percentage
function calculatePercentage() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Memory functions
function memoryAdd() {
    memory += parseFloat(currentInput || '0');
}

function memorySubtract() {
    memory -= parseFloat(currentInput || '0');
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
}

// Toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle('dark');
}
