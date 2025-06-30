function add(n1, n2) {
    return n1 + n2;
}

function sub(n1, n2) {
    return n1 - n2;
}

function mult(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

let num1 = "";
let num2 = "";
let op = "";
let num1_isCalculated = false;

const calc = document.querySelector("#wrapper");
const context = document.querySelector("#context");
const screenText = document.querySelector("#text");

function updateScreen() {
    error.textContent = "";
    if (op != "") {
        screenText.textContent = num2;
    } else {
        screenText.textContent = num1;
    }
    context.textContent = `${num1} ${op} ${num2}`;
}

function backspace() {
    if (num2 != "") {
        num2 = num2.slice(0, -1);
    } else if (op != ""){
        op = "";
    } else {
        num1 = num1.slice(0, -1);
    }
}

function operate(e) {
    if (num2 != "") {
        if (op === "+") {
            num1 = +num1 + +num2;
        } else if (op === "-") {
            num1 = num1 - num2;
        } else if (op === "×" || op === "*") {
            num1 = num1 * num2;
        } else {
            if (+num2 === 0) {
                clear.click();
                error.textContent = "can't divide by zero idiot";
                error.setAttribute("style", "font-size: 100px")
                e.stopImmediatePropagation();
            } else {
                num1 = num1 / num2;
            }
        }
        if (num1 != "") {
            num1 = Math.round(num1 * 1000) / 1000;
            if (num1 >= 10000000000000) {
                num1 = num1.toExponential(5);
            } else {
                num1 = String(num1);
            }
            num1_isCalculated = true;
            context.textContent += " =";
            screenText.textContent = num1;
            num2 = "";
            op = "";
            e.stopPropagation();
        }
    }
}

function transfer(bruh) {
    if (bruh === "*") return "×";
    if (bruh === "/") return "÷";
    return bruh;
}

calc.addEventListener("click", () => updateScreen());


const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    op = "";
})

const del = document.querySelector("#delete");
del.addEventListener("click", () => backspace());

const nums = document.querySelectorAll(".num");
nums.forEach((n) => n.addEventListener("click", () => {
    if (num1_isCalculated && op === "") {
        num1_isCalculated = false;
        num1 = "";
    }
    if (op === "") {
        num1 += n.textContent;
    } else {
        num2 += n.textContent;
    }
}))

const arith = document.querySelectorAll(".arith");
arith.forEach((n) => n.addEventListener("click", () => {
    if (num2 != "") {
        equal.click();
        op = n.textContent;
    } else {
        op = n.textContent;
        screenText.textContent = "";
    }
}))

const equal = document.querySelector("#equal");
const err = document.querySelector("#error");
equal.addEventListener("click", (e) => operate(e));

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if (op === "" && !num1.includes(".")) {
        num1 += decimal.textContent;
    } else if (op != "" && !num2.includes(".")) {
        num2 += decimal.textContent;
    }
})

document.addEventListener('keydown', (e) => {
    if (!Number.isNaN(+ e.key)) {
        if (num1_isCalculated && op === "") {
            num1_isCalculated = false;
            num1 = "";
        }
        if (op === "") {
            num1 += e.key;
        } else {
            num2 += e.key;
        }
    } else if (["+", "-", "/", "*"].includes(e.key)) {
        if (num2 != "") {
            equal.click();
            op = e.key;
        } else {
            op = e.key;
            screenText.textContent = "";
        }
        op = transfer(op);
    } else if (e.key === "=") {
        operate(e);
    } else if (e.key === "+") {
        backspace();
    }
    updateScreen();
})