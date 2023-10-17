document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=" , "/"];
    const calculatorButtons = document.getElementById("calculator-buttons");

    buttons.forEach(button => {
        const btnElement = document.createElement("button");
        btnElement.textContent = button;
        btnElement.classList.add("btn", button === "=" || button === "C" ? "btn-danger" : "btn-primary");

        btnElement.addEventListener("click", function () {
            handleButtonClick(button);
        });
        calculatorButtons.appendChild(btnElement);
    });

    let operand1 = "";
    let operand2 = "";
    let operator = "";
    let result = null;

    function handleButtonClick(button) {
        if (button >= "0" && button <= "9") {
            operand2 += button;
            display.value = operand2; 
        } else if (["+", "-", "*", "/"].includes(button)) {
            if (result !== null) {
                operand1 = result;
                result = null;
            } else {
                operand1 = operand2;
            }
            operator = button;
            operand2 = "";
        } else if (button === "C") {
            operand1 = operand2 = operator = "";
            display.value = "";
        } else if (button === "=") {
            if (operand1 !== "" && operand2 !== "" && operator !== "") {
                operand1 = parseFloat(operand1);
                operand2 = parseFloat(operand2);
                switch (operator) {
                    case "+":
                        result = operand1 + operand2;
                        break;
                    case "-":
                        result = operand1 - operand2;
                        break;
                    case "*":
                        result = operand1 * operand2;
                        break;
                    case "/":
                        if (operand2 !== 0) {
                            result = operand1 / operand2;
                        } else {
                            display.value = "Error";
                            return;
                        }
                        break;
                }
                display.value = result;
                operand1 = result;
                operand2 = "";
            }
        }
    }
});