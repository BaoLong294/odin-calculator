let firstNumber = 0;
let secondNumber = 0;
let operator = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, num1, num2) {
  if (op === "+") {
    return add(num1, num2);
  } else if (op === "-") {
    return subtract(num1, num2);
  } else if (op === "*") {
    return multiply(num1, num2);
  } else if (op === "/") {
    if (!num2) {
      return "Cannot divide by zero";
    }

    return divide(num1, num2);
  } else {
    return "Invalid operator!";
  }
}

const display = document.querySelector(".display");

function clearAll() {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  display.textContent = "0";
}

const keyList = document.querySelectorAll(".number");
const operatorList = document.querySelectorAll(".operator");

keyList.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    if (display.textContent.trim() === "0") {
      display.textContent = "";
    }

    if (Number(display.textContent) === firstNumber) {
      display.textContent = "";
    }

    display.textContent += e.target.textContent;
  });
});

operatorList.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    const anotherOperator = e.target.textContent;

    if (operator && display.textContent.trim() !== "") {
      secondNumber = Number(display.textContent);
      display.textContent = operate(operator, firstNumber, secondNumber);

      firstNumber = Number(display.textContent);
      secondNumber = 0;
      operator = anotherOperator;
    } else {
      operator = anotherOperator;
      firstNumber = Number(display.textContent);
      display.textContent = "";
    }
  });
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  secondNumber = Number(display.textContent);

  display.textContent = operate(operator, firstNumber, secondNumber);
});

const clearButton = document.querySelector(".clear button");
clearButton.addEventListener("click", clearAll);
