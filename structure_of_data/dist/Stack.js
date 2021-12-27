"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 栈
 */
// class Stack{
//     constructor() {
//         this.items = [];
//     }
//     push(element) {
//         this.items.push(element);
//     }
//     pop() {
//         return this.items.pop();
//     }
//     peek() {
//         return this.items[this.items.length - 1];
//     }
//     isEmpty() {
//         return this.items.length === 0;
//     }
//     size() {
//         return this.items.length;
//     }
//     clear() {
//         this.items = [];
//     }
// }
// const _items = Symbol("stackItems");
var Stack = function () {
    function Stack() {
        _classCallCheck(this, Stack);

        this.count = 0;
        this.items = [];
    }

    _createClass(Stack, [{
        key: "push",
        value: function push(element) {
            this.items[this.count] = element;
            this.count++;
        }
    }, {
        key: "size",
        value: function size() {
            return this.count;
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.count === 0;
        }
    }, {
        key: "pop",
        value: function pop() {
            if (this.isEmpty()) {
                // {1} 
                return undefined;
            }
            this.count--; // {2} 
            var result = this.items[this.count]; // {3} 
            delete this.items[this.count]; // {4} 
            return result; // {5} 
        }
    }, {
        key: "peek",
        value: function peek() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items[this.count - 1];
        }
    }, {
        key: "clear",
        value: function clear() {
            this.items = [];
            this.count = 0;
        }
    }, {
        key: "toString",
        value: function toString() {
            if (this.isEmpty()) {
                return '';
            }
            var objString = "" + this.items[0]; // {1} 
            for (var i = 1; i < this.count; i++) {
                // {2} 
                objString = objString + "," + this.items[i]; // {3} 
            }
            return objString;
        }
    }]);

    return Stack;
}();

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
console.log("栈数据：", stack.items);
console.log("栈大小：", stack.size());
console.log("出栈：", stack.pop());
console.log("栈顶数据：", stack.peek());
console.log("栈数据字符串形式：", stack.toString());
console.log("################################################################################");

function decimalToBinary(decNumber) {
    var remStack = new Stack();
    var number = decNumber;
    var rem = void 0;
    var binaryString = '';
    while (number > 0) {
        // {1} 
        rem = Math.floor(number % 2); // {2} 
        remStack.push(rem); // {3} 
        number = Math.floor(number / 2); // {4} 
    }
    while (!remStack.isEmpty()) {
        // {5} 
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(decimalToBinary(233)); // 11101001 
console.log(decimalToBinary(10)); // 1010 
console.log(decimalToBinary(1000)); // 1111101000

console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

function baseConverter(decNumber, base) {
    var remStack = new Stack();
    var digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // {6} 
    var number = decNumber;
    var rem = void 0;
    var baseString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }
    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]; // {7} 
    }
    return baseString;
}

console.log(baseConverter(100345, 2)); // 11000011111111001 
console.log(baseConverter(100345, 8)); // 303771 
console.log(baseConverter(100345, 16)); // 187F9 
console.log(baseConverter(100345, 35)); // 2BW0