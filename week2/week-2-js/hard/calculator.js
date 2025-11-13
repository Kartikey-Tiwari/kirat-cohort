/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

function isNumber(c) {
  return c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57;
}

function isOperator(c) {
  return ["-", "+", "*", "/"].find((o) => o === c) !== undefined;
}

const precedence = {
  "+": 0,
  "-": 0,
  "*": 1,
  "/": 1,
};

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  divide(num) {
    if (num === 0) {
      throw new Error("divide by zero");
    }
    this.result /= num;
  }
  multiply(num) {
    this.result *= num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }

  infixToPostfix(str) {
    const operatorStack = [];
    const outputList = [];

    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        continue;
      }
      let temp = "";
      let flag = false;
      while (
        i < str.length &&
        (isNumber(str[i]) || (!flag && str[i] === "."))
      ) {
        if (str[i] === ".") {
          flag = true;
        }
        temp += str[i++];
      }
      if (flag && str[i] === ".") {
        throw new Error("");
      }
      temp = Number.parseFloat(temp);
      if (!isNaN(temp)) {
        outputList.push(temp);
        i--;
        continue;
      }
      if (str[i] === "(") {
        operatorStack.push(str[i]);
      } else if (str[i] === ")") {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputList.push(operatorStack.pop());
        }
        if (!operatorStack.length) {
          throw new Error("mismatched parenthesis");
        }
        operatorStack.pop();
      } else if (isOperator(str[i])) {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          precedence[operatorStack[operatorStack.length - 1]] >=
            precedence[str[i]]
        ) {
          outputList.push(operatorStack.pop());
        }
        operatorStack.push(str[i]);
      } else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 123) {
        throw new Error("invalid expression");
      }
    }
    while (operatorStack.length) {
      const op = operatorStack.pop();
      if (op === "(") {
        throw new Error("mismatched parentheses");
      }
      outputList.push(op);
    }

    return outputList;
  }

  evaluatePostfix(postfixList) {
    const valueStack = [];

    for (const token of postfixList) {
      if (isOperator(token)) {
        const op2 = valueStack.pop();
        const op1 = valueStack.pop();
        const res = this.apply(token, op1, op2);
        valueStack.push(res);
      } else {
        valueStack.push(token);
      }
    }
    return valueStack.pop();
  }

  apply(operator, op1, op2) {
    if (operator === "+") {
      return op1 + op2;
    } else if (operator === "-") {
      return op1 - op2;
    } else if (operator === "/") {
      if (op2 === 0) throw new Error("divide by zero");
      return op1 / op2;
    } else {
      return op1 * op2;
    }
  }

  calculate(str) {
    const postfixList = this.infixToPostfix(str);
    this.result = this.evaluatePostfix(postfixList);
  }
}

module.exports = Calculator;
