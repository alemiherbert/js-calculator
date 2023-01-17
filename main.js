class Calculator {
    constructor() {
        this.result = "0";
        this.bufferOne = "0";
        this.bufferTwo = "0";
        this.result = "0";
        this.operations = ["add", "subtract", "multiply", "divide"];
        this.opsDisplay = document.getElementById("op");
        this.display = document.getElementById("calculation");
        this.acceptsDecimal = true;
        this.operator = null

        const buttons = [...document.getElementsByTagName("button")];
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                if ([...button.classList].includes("operand") && this.bufferOne.length <= 9) {
                    this.bufferOne += button.textContent;
                    this.updateScreen(parseFloat(this.bufferOne));
                    if (this.bufferOne !== 0)
                        this.updateOps(" ");
                    console.log(this.operator);
                }
                if (button.dataset.operation === "decimal" && this.acceptsDecimal) {
                    this.bufferOne += button.textContent;
                    this.display.innerText += "."
                    this.acceptsDecimal = false;
                }
                if (this.operations.includes(button.dataset.operation)) {
                    this.bufferTwo = this.bufferOne;
                    this.updateOps(button.textContent)
                    this.operator = button.dataset.operation;

                    this.acceptsDecimal = true;
                    this.bufferOne = "0"
                }

                if (button.dataset.operation === "calculate") {
                    if (this.bufferOne && !this.operator) {
                        this.updateScreen(parseFloat(this.bufferOne));
                        this.clear();
                    }
                    this.calculate(this.operator, this.bufferTwo, this.bufferOne);
                    this.updateOps(button.textContent)
                    this.bufferOne = "0";
                    this.bufferTwo = "0"
                }
            })
        })
    }
    clear() {
        this.bufferOne = "0"
        this.acceptsDecimal = true;
    }
    calculate(operator, num1, num2) {
        switch (operator) {
            case "add":
                this.result = this.add(num1, num2)
                this.operator = null;
                this.updateScreen(this.result);
                break;
            case "subtract":
                this.result = this.subtract(num1, num2)
                this.operator = null;
                this.updateScreen(this.result);
                break;
            case "multiply":
                this.result = this.multiply(num1, num2)
                this.operator = null;
                this.updateScreen(this.result);
                break;
            case "divide":
                this.result = this.divide(num1, num2)
                this.operator = null;
                this.updateScreen(this.result);
                break;
            default:
                break;
        }
    }
    updateScreen = value => { this.display.innerText = value; console.log(value); };
    updateOps = value => this.opsDisplay.innerText = value;
    add = (num1, num2) => parseFloat(num1) + parseFloat(num2);
    subtract = (num1, num2) => parseFloat(num1) - parseFloat(num2);
    multiply = (num1, num2) => parseFloat(num1) * parseFloat(num2);
    divide = (num1, num2) => (parseFloat(num1) / parseFloat(num2)).toFixed(6);
}
let calc = new Calculator()
