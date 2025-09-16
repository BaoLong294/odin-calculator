const firstNumber = 0;
const secondNumber = 0;
const operator = "+";

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
    return divide(num1, num2);
  } else {
    return "Invalid operator!";
  }
}

const display = document.querySelector(".display");

const keyList = document.querySelectorAll(".number");
keyList.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    if (display.textContent.trim() === "0") {
      display.textContent = "";
    }

    display.textContent += e.target.textContent;
  });
});
