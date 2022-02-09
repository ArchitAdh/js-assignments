const displayUI = document.querySelector(".display");
const numbersUI = document.querySelectorAll(".btn--num");
const operationsUI = document.querySelectorAll(".btn--op");
const clearUI = document.querySelector(".btn--clr");
const equalUI = document.querySelector(".btn--eql");
let result = "";
let display = "";

//number buttons
numbersUI.forEach((num) => {
  num.addEventListener("click", (e) => {
    display += e.target.innerText;
    displayUI.innerText = display;
  });
});

//operator buttons
operationsUI.forEach((op) => {
  op.addEventListener("click", (e) => {
    //if display has no number operation cannot be done
    if (!display) return;

    //remove multiple operator symbol at the end
    if (display.charAt(display.length - 1) == e.target.innerText) {
      display = display.slice(0, -1);
    }

    display += e.target.innerText;
    displayUI.innerText = display;
  });
});

//equal button
equalUI.addEventListener("click", (e) => {
  try {
    result = eval(display);
    if (result === undefined) {
      displayUI.innerText = "";
    } else {
      displayUI.innerText = result;
      console.log(result);
      display = "";
    }
  } catch (err) {
    displayUI.innerText = "Syntax Error..";
  }
});

// clear button
clearUI.addEventListener("click", () => {
  display = " ";
  displayUI.innerText = " ";
});

//Keyboard functionality
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9"
  ) {
    clickNum(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    clickOp(e.key);
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key == "Escape") {
    clickEsc();
  }
});

//Functions for keys press
function clickNum(key) {
  numbersUI.forEach((num) => {
    if (num.innerText === key) {
      num.click();
    }
  });
}

function clickOp(key) {
  operationsUI.forEach((op) => {
    if (op.innerText === key) {
      op.click();
    }
  });
}

function clickEqual() {
  equalUI.click();
}

function clickEsc() {
  clearUI.click();
}
