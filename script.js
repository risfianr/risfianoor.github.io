const calculator = {
    displayValue: '0',
    firstOperand: null,
    WaitingForSecondOperand: false,
    operator: null,
};
function inputDigit(digit) {
    const { displayValue, WaitingForSecondOperand } = calculator;
    if (WaitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.WaitingForSecondOperand = false;
    } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}
}
function inputDecimal(dot) {
    if(calculator.WaitingForSecondOperand === true) {
    calculator.displayValue = "0."
    calculator.WaitingForSecondOperand = false;
    return
    } 
    if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
}
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.WaitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.WaitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
function calculate(firstOperand, secondOperand, operator) {
if (operator === '+') {
return firstOperand + secondOperand;
} else if (operator === '-') {
return firstOperand - secondOperand;
} else if (operator === '*') {
return firstOperand * secondOperand;
} else if (operator === '/') {
return firstOperand / secondOperand;
}
return secondOperand;  
}
function resetCalculator() {
    calculator.displayValue ='0';
    calculator.firstOperand = null;
    calculator.WaitingForSecondOperand = false;
    calculator.operator = null;
}
function updateDisplay() {
const display = document.querySelector('.calculator-screen');
display.value = calculator.displayValue;
}
updateDisplay();
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event =>{
const { target } = event ;
const { value } = target;
if (!target.matches('button')) {
return ;   
}
switch (value) {
case '+':
case '-':
case '*':
case '/':
case '=':
case 'sin':
case 'cos':
case 'tan':
handleOperator(value);
break;
case '.':
inputDecimal(value);
break;
case 'all-clear':
resetCalculator();
break
default:
if (Number.isInteger(parseFloat(value))) {
inputDigit(value);
}
}
updateDisplay(); 
});

