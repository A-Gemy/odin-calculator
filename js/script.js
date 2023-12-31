"use strict";

let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNumber != "" && previousNumber != "") {
    calculate();
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", addDecimal);
const deleteBtn = document.querySelector(".del");
deleteBtn.addEventListener("click", handleDelete);
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculation);

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

/* Handles the input of numbers in a calculator application. */
function handleNumber(number) {
  // If there is a previous number and a current number,
  // and no operator has been selected, reset the previous number
  // and update the display with the current number.
  if (previousNumber && currentNumber && !operator) {
    previousNumber = "";
    currentDisplayNumber.textContent = currentNumber;
  }
  // Append the input number to the current number,
  // if the current number is less than or equal to 14,
  // and update the display with the current number.
  if (currentNumber.length <= 14) {
    currentNumber += number;
    currentDisplayNumber.textContent = currentNumber;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

/* Handles the operator input in a calculator application. */
function handleOperator(op) {
  if (!previousNumber) {
    previousNumber = currentNumber;
    operatorCheck(op);
  } else if (!currentNumber) {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = `${previousNumber} ${operator}`;
  }
}

/* Updates the operator variable, displays the previous number and operator, and resets the current number to zero. */
function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = `${previousNumber} ${operator}`;
  currentDisplayNumber.textContent = "0";
  currentNumber = "";
}

/* Performs basic arithmetic calculations, and display the result */
function calculate() {
  // Convert `previousNumber` and `currentNumber` to numbers
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  switch (operator) {
    case "+":
      previousNumber += currentNumber;
      break;
    case "-":
      previousNumber -= currentNumber;
      break;
    case "x":
      previousNumber *= currentNumber;
      break;
    case "%":
      previousNumber %= currentNumber;
      break;
    case "/":
      if (currentNumber <= 0) {
        previousNumber = "Error";
        displayResult();
        return;
      }
      previousNumber /= currentNumber;
      break;
  }
  // Round the value of `previousNumber` to 2 decimal places
  previousNumber = roundNumber(previousNumber);
  previousNumber = previousNumber.toString();
  displayResult();
}

/* Rounds a number to 2 decimal places. */
function roundNumber(num) {
  return Math.round(num * 100) / 100;
}

/* Updates the display of the calculator with the result of the calculation. Resets the variables. */
function displayResult() {
  // Check if the length of previousNumber is greater than 10
  if (previousNumber.length > 10) {
    // Truncate previousNumber to 10 characters and add ellipsis
    currentDisplayNumber.textContent = previousNumber.slice(0, 10) + "...";
  } else {
    currentDisplayNumber.textContent = previousNumber;
  }

  previousDisplayNumber.textContent = "0";
  operator = "";
  currentNumber = "";
}

/* Resets the calculation values and updates the display to "0". */
function clearCalculation() {
  // Reset calculation values
  currentNumber = "";
  previousNumber = "";
  operator = "";

  // Update display
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "0";
}

/* Adds a decimal point to the current number if it doesn't already contain one. */
function addDecimal() {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    currentDisplayNumber.textContent = currentNumber;
  }
}

/* Deletes characters from the current number being displayed on a calculator. */
function handleDelete() {
  // If the current number is not empty
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    currentDisplayNumber.textContent = currentNumber;
  }
  // If the current number becomes empty after deletion
  if (currentNumber === "") {
    currentDisplayNumber.textContent = "0";
  }
  // If the current number is empty, previous number is not empty, and no operator is selected
  if (currentNumber === "" && previousNumber !== "" && operator === "") {
    if (previousNumber.length > 1) {
      previousNumber = previousNumber.slice(0, -1);
      currentDisplayNumber.textContent = previousNumber;
    } else {
      previousNumber = currentNumber;
      currentDisplayNumber.textContent = "0";
    }
  }
}

/* Handles key press events. */
function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if ((e.key === "Enter" || e.key === "=") && currentNumber && previousNumber) {
    calculate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}
