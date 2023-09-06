// Get elements by their IDs
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const clearAllButton = document.getElementById("clearAll");
const clearOneButton = document.getElementById("clearOne");
const equalButton = document.getElementById("equal");

// Add event listeners to the buttons
buttons.addEventListener("click", handleButtonClick);

// Function to handle button clicks
function handleButtonClick(event) {
  const button = event.target;
  const buttonText = button.textContent;

  // Check which button was clicked
  switch (buttonText) {
    case "AC":
      clearDisplay();
      break;
    case "C":
      clearOne();
      break;
    case "=":
      calculateResult();
      break;
    default:
      appendToDisplay(buttonText);
      break;
  }
}

// Function to clear the display
function clearDisplay() {
  display.textContent = "0";
}

// Function to remove the last character from the display
function clearOne() {
  let currentText = display.textContent;
  display.textContent = currentText.slice(0, -1);
}

// Function to append text to the display
function appendToDisplay(value) {
  const currentText = display.textContent;

  if ((currentText === "0" && value !== ".") || currentText === "Error") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

// Function to calculate the result
function calculateResult() {
  try {
    const result = eval(display.textContent.replace(/x/g, "*")); // Replace 'x' with '*'
    display.textContent = result;
  } catch (error) {
    display.textContent = "Error";
  }
}
