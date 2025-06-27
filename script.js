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

const calc = document.querySelector("#wrapper");
const screenText = document.querySelector("#text");
calc.addEventListener("click", () => screenText.textContent = num1)

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    op = "";
})

const del = document.querySelector("#delete");
del.addEventListener("click", () => {
    if (op != "") {
        num2 = num2.slice(0, -1);
    } else {
        num1 = num1.slice(0, -1);
    }
})

const nums = document.querySelectorAll(".num");
nums.forEach((n) => n.addEventListener("click", () => {
    if (op === "") {
        num1 += n.textContent;
    }
}))