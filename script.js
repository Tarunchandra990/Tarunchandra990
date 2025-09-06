document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('button'));
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            const id = button.id;

            if (id === 'clear') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '';
                return;
            }

            if (id === 'equals') {
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                    resultDisplayed = true;
                }
                return;
            }

            if (button.classList.contains('operator')) {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = calculate(previousInput, operator, currentInput);
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                    display.textContent = previousInput + ' ' + (operator === '*' ? '×' : operator === '/' ? '÷' : operator);
                } else if (previousInput) {
                    operator = value;
                    display.textContent = previousInput + ' ' + (operator === '*' ? '×' : operator === '/' ? '÷' : operator);
                }
                return;
            }

            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        });
    });

    function calculate(a, op, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b === 0) {
                    return 'Error';
                }
                return (a / b).toString();
            default:
                return b;
        }
    }
});
