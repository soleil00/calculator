const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
let currentDisplay = "0";
let operator = null;
let waitingForSecondOperand = false;
let previousResult = null;

function updateDisplay() {
  display.textContent = currentDisplay;
}

updateDisplay();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (button.classList.contains("operand")) {
      if (currentDisplay === "0" || waitingForSecondOperand) {
        currentDisplay = buttonValue;
        waitingForSecondOperand = false;
      } else {
        currentDisplay += buttonValue;
      }
    }

    if (buttonValue === ".") {
      if (!currentDisplay.includes(".")) {
        currentDisplay += buttonValue;
      }
    }

    if (button.classList.contains("operator")) {
      if (operator !== null && !waitingForSecondOperand) {
        calculate();
      } else {
        previousResult = parseFloat(currentDisplay);
      }
      operator = buttonValue;
      waitingForSecondOperand = true;
    }

    if (button.id === "equal") {
      calculate();
      operator = null;
      previousResult = null;
    }

    if (button.id === "clearAll") {
      currentDisplay = "0";
      operator = null;
      waitingForSecondOperand = false;
      previousResult = null;
    }

    if (button.id === "clearOne") {
      currentDisplay = currentDisplay.slice(0, -1);
      if (currentDisplay === "") {
        currentDisplay = "0";
      }
    }

    if (button.id === "sign") {
      currentDisplay = (parseFloat(currentDisplay) * -1).toString();
    }

    if (button.id === "percentage") {
      currentDisplay = (parseFloat(currentDisplay) / 100).toString();
    }

    updateDisplay();
  });
});

function calculate() {
  const firstOperand = previousResult;
  const secondOperand = parseFloat(currentDisplay);
  if (!isNaN(firstOperand) && !isNaN(secondOperand) && operator) {
    switch (operator) {
      case "+":
        currentDisplay = (firstOperand + secondOperand).toString();
        break;
      case "-":
        currentDisplay = (firstOperand - secondOperand).toString();
        break;
      case "x":
        currentDisplay = (firstOperand * secondOperand).toString();
        break;
      case "/":
        currentDisplay = (firstOperand / secondOperand).toString();
        break;
    }
    waitingForSecondOperand = false;
  }
}
