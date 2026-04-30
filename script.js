let historyList = [];

let inputScreen = document.getElementById('input');
let historyScreen = document.getElementById('result');

function press(val) {
    let screen = inputScreen.value;
    let lastChar = screen.charAt(screen.length - 1);
    let operators = ["+", "-", "*", "/", "%"];

    if (screen === "0" && !operators.includes(val) && val !== ".") {
        inputScreen.value = val;
        return;
    }

    // 1. DECIMAL VALIDATION
    if (val === ".") {
        let parts = screen.split(/[+\-*/%]/);
        let lastNumber = parts[parts.length - 1];
        if (lastNumber.includes(".")) {
            return;
        }
    }

    // Operations check (=*)
    if (operators.includes(val)) {
        if (operators.includes(lastChar)) {
            inputScreen.value = screen.slice(0, -1) + val;
        } else {
            inputScreen.value += val;
        }
    }
    else {

        if (val !== ".") {
            inputScreen.value += val;
        } else {
            inputScreen.value += val;
        }
    }

}
function solve() {
    try {
        let expression = inputScreen.value;
        //control zero
        expression = expression.replace(/\b0+(\d+)/g, '$1');
        // percentage logic
        let historyExpression = expression;    
        let calcExpression = expression.replace(/%/g, '/100');

        // new Function() at the place of eval()
        let result = new Function('return ' + calcExpression)();
        let currentCalculation = historyExpression + "=" + Number(result.toFixed(5));

        // Check for Division by Zero
        if (!isFinite(result)) {
            inputScreen.value = "Math Error";
            return;
        }

        //history 
        historyList.push(currentCalculation);
        if (historyList.length > 5) {
            historyList.shift();
        }
        historyScreen.value = historyList.join(' | ');
        if (result > 999999999999999) {
            inputScreen.value = result.toExponential(15);
        } else {
            inputScreen.value = Number(result.toFixed(5));
        }
    } catch (error) {
        inputScreen.value = "Syntax Error";
    }
}

// 3. ClearScreen function 
function ClearScreen() {
    inputScreen.value = "0";
}

// 4. Backspace function 
function backspace() {
    inputScreen.value = (inputScreen.value.length > 1)
        ? inputScreen.value.slice(0, -1)
        : "0";
}
// 5. Scientific Panel Toggle Function
function toggleScientific() {
    let panel = document.getElementById('scientific');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'grid';
    } else {
        panel.style.display = 'none';
    }
}
// Keyboard 
document.addEventListener('keydown', function (event) {
    const key = event.key;
    const operators = ["+", "-", "*", "/", "%"];
    if (!isNaN(key) || operators.includes(key) || key === ".") {
        press(key);
    }
    if (key === "Enter") {
        event.preventDefault();
        solve();
    }
    if (key === "Escape") {
        ClearScreen();
    }
    if (key === "Backspace") {
        backspace();
    }
});