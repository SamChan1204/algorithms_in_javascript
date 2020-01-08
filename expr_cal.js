/**
 * 表达式求值
 * 支持四则运算，并假设符号和数字间用空格分隔
 * 经典的栈实现方式：一个栈存运算符，一个栈存数字
 */
function cal(string) {
  const opStack = [];
  const numStack = [];
  const tokens = string.split(' ');
  for(let i = 0, l = tokens.length; i < l; i++) {
    const char = tokens[i];
    switch(char) {
      case '(':
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        // 如果是运算符则压栈
        opStack.push(char);
        break;
      case ')':
        // 右括号时，用栈顶的操作符和操作数进行运算，然后将结果压栈
        const op = opStack.pop();
        const rightNum = numStack.pop();
        const leftNum = numStack.pop();
        numStack.push(calNums(leftNum, rightNum, op));
        break;
      default:
        // 非运算符和括号，则为数字
        numStack.push(parseFloat(char));
        break;
    }
  }

  // 随后栈中遗留的即为结果
  return numStack.pop();
}

function calNums(left, right, op) {
  let res;
  switch(op) {
    case '+':
      res = left + right;
      break;
    case '-':
      res = left - right;
      break;
    case '*':
      res = left * right;
      break;
    case '/':
      res = left / right;
      break;
    default:
      res = 0;
      break;
  }
  return res;
}

const str = '( 1 + ( ( 2 + 3 ) * ( 4 * ( 6 - 1 ) ) ) )';
console.log(cal(str) === 101);