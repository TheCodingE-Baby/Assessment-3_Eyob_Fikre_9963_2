//Initialize the display and constants;
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

//assing the buttons to the variables;
let prevInput = "";
let currentInput = "";
let operator = "";


//add event listener to the buttons;
buttons.forEach(button =>{
    button.addEventListener("click", () => {
    const val = button.getAttribute("data-value");
    if (val === 'C'){
        clearDisplay();
    } else if (val === '='){
        calculate();
    } else if (['+', '-', '*' , '/'].includes(val)){ 
        setOperator(val);
    } else {
        appendNumber(val);
    }
    });
});

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === "") return;
    if (prevInput !== "") {
        calculate();
    }
    operator = op;
    prevInput = currentInput;
    currentInput = "";
} 



function calculate() {
    try {       //try catch block to catch any errors that may occur.
        const prev = parseFloat(prevInput);
        const curr = parseFloat(currentInput);

    
        if(isNaN(prev) || isNaN(curr)) return;      //if the input is not a number, return.

        let result;
            switch(operator){
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "/":
                result = prev / curr;
                break;
            default:
                throw new Error("Invalid Operator");
        }

    currentInput = result;
    prevInput = "";
    operator = "";
    updateDisplay();

    } catch (error) {
    display.value = error.message;
    currentInput = "";
    prevInput = "";
    operator = "";
    }
}


function clearDisplay() {
    currentInput = "";
    prevInput = "";
    operator = "";
    updateDisplay();
}

equals.addEventListener("click", () =>{
    calculate();
    updateDisplay();
});

clear.addEventListener('click', () =>{
    clearDisplay();
    updateDisplay();
});

function updateDisplay() {
   display.value = currentInput || "0";
}