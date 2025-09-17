let firstNumber = 0;
let secondNumber = 0;
let lastSecondNumber = null;
let operator = "";
let justEvaluated = false;

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
    if (num2 === 0) {
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
  lastSecondNumber = null;
  operator = "";
  justEvaluated = false;
  display.textContent = "0";
}

function roundTo(num, digit = 5) {
  return typeof num === "number"
    ? Math.round(num * 10 ** digit) / 10 ** digit
    : num;
}

const keyList = document.querySelectorAll(".number");
const operatorList = document.querySelectorAll(".operator");

keyList.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    if (display.textContent === "Cannot divide by zero") return;

    if (justEvaluated) {
      firstNumber = 0;
      secondNumber = 0;
      operator = "";
      display.textContent = "";
      justEvaluated = false;
    }

    if (display.textContent.trim() === "0") {
      display.textContent = "";
    }

    if (Number(display.textContent) === firstNumber) {
      display.textContent = "";
    }

    display.textContent += e.target.textContent;
  });
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (e) => {
  if (display.textContent === "Cannot divide by zero") return;
  if (display.textContent.includes(".")) return;

  if (justEvaluated && operator !== "") {
    clearAll();
    display.textContent = "0.";
    return;
  }

  if (display.textContent.trim() === "") {
    display.textContent = "0.";
    return;
  }

  display.textContent += ".";
});

operatorList.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    if (display.textContent === "Cannot divide by zero") return;

    const anotherOperator = e.target.textContent;

    if (!justEvaluated && operator && display.textContent.trim() !== "") {
      secondNumber = Number(display.textContent);
      const result = operate(operator, firstNumber, secondNumber);

      if (result === "Cannot divide by zero") {
        display.textContent = result;
        operator = "";
        return;
      }

      display.textContent = roundTo(result);
      firstNumber = Number(display.textContent);
      secondNumber = 0;
      operator = anotherOperator;
    } else {
      operator = anotherOperator;
      firstNumber = Number(display.textContent || 0);
      display.textContent = "";
      justEvaluated = false;
    }
  });
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (display.textContent === "Cannot divide by zero") return;
  if (!operator) return;

  if (justEvaluated) {
    firstNumber = Number(display.textContent);
    secondNumber = lastSecondNumber;
  } else {
    if (display.textContent.trim() === "") return;
    secondNumber = Number(display.textContent);
    lastSecondNumber = secondNumber;
  }

  const result = operate(operator, firstNumber, secondNumber);

  if (result === "Cannot divide by zero") {
    display.textContent = result;
    operator = "";
    justEvaluated = true;
    return;
  }

  display.textContent = roundTo(result);
  justEvaluated = true;
  console.log(justEvaluated);
});

const clearButton = document.querySelector(".clear button");
clearButton.addEventListener("click", clearAll);
