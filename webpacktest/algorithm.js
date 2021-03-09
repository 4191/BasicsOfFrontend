/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2 > 0) {
        return false
    }
    const stack = []
    const map = {
        '{': '}',
        '[': ']',
        '(': ')'
    }
    for (let i = 0; i < s.length; i++) {
        if (Object.keys(map).includes(s[i])) {
            stack.push(s[i])
        } else {
            if (map[stack[stack.length - 1]] === s[i]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return !stack.length
};

console.log(isValid("([}}])"))

//栈
class Stack {
    constructor() {
        this.stack = []
    }

    push(e) {
        this.stack.push(e)
    }

    pop() {
        return this.stack.pop()
    }

    peek() {
        return this.stack[this.stack.length - 1]
    }
    getLength = () => this.stack.length
}


function decimalToBinary(num) {
    if (typeof num !== 'number') {
        return 'please input a decimal number'
    }

    const stack = new Stack()
    let curNum = null
    let redundance = null
    curNum = num
    while (curNum > 1) {
        stack.push(curNum % 2)
        curNum = parseInt(curNum / 2)
    }
    let result = ''
    while (stack.getLength()) {
        result += stack.pop()
    }
    return result
}

//队列
class Queue {
    constructor() {
        this.queue = []
    }
    inqueue(e) {
        this.queue.push(e)
    }
    dequeue(e) {
        this.shift(e)
    }
    getLength() {
        return this.queue.length
    }
}