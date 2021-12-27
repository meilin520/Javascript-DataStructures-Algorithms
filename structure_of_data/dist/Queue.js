'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**队列 */
var Queue = exports.Queue = function () {
    function Queue() {
        _classCallCheck(this, Queue);

        this.count = 0;
        this.lowestCount = 0;
        this.items = [];
    }

    _createClass(Queue, [{
        key: 'enqueue',
        value: function enqueue(element) {
            this.items[this.count] = element;
            this.count++;
        }
    }, {
        key: 'dequeue',
        value: function dequeue() {
            if (this.isEmpty()) {
                return undefined;
            }
            var result = this.items[this.lowestCount]; // {1} 
            delete this.items[this.lowestCount]; // {2} 
            this.lowestCount++; // {3} 
            return result; // {4} 
        }
    }, {
        key: 'peek',
        value: function peek() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items[this.lowestCount];
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'size',
        value: function size() {
            return this.count - this.lowestCount;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = [];
            this.count = 0;
            this.lowestCount = 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this.isEmpty()) {
                return '';
            }
            var objString = '' + this.items[this.lowestCount];
            for (var i = this.lowestCount + 1; i < this.count; i++) {
                objString = objString + ',' + this.items[i];
            }
            return objString;
        }
    }]);

    return Queue;
}();

// var queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);
// queue.enqueue(6);
// console.log(queue.items);
// console.log(queue.dequeue());
// console.log(queue.items);
// console.log(queue.dequeue());
// console.log(queue.items);

console.log("===============================================");

/**双端队列 */

var Deque = function () {
    function Deque() {
        _classCallCheck(this, Deque);

        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    _createClass(Deque, [{
        key: 'addFront',
        value: function addFront(element) {
            if (this.isEmpty()) {
                // {1} 
                this.addBack(element);
            } else if (this.lowestCount > 0) {
                // {2} 
                this.lowestCount--;
                this.items[this.lowestCount] = element;
            } else {
                for (var i = this.count; i > 0; i--) {
                    // {3} 
                    this.items[i] = this.items[i - 1];
                }
                this.count++;
                this.lowestCount = 0;
                this.items[0] = element; // {4} 
            }
        }
    }, {
        key: 'addBack',
        value: function addBack(element) {
            this.items[this.count] = element;
            this.count++;
        }
    }, {
        key: 'removeFront',
        value: function removeFront() {
            if (this.isEmpty()) {
                return undefined;
            }
            var result = this.items[this.lowestCount]; // {1} 
            delete this.items[this.lowestCount]; // {2} 
            this.lowestCount++; // {3} 
            return result; // {4} 
        }
    }, {
        key: 'removeBack',
        value: function removeBack() {
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
        key: 'peekFront',
        value: function peekFront() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items[this.lowestCount];
        }
    }, {
        key: 'peekBack',
        value: function peekBack() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items[this.count - 1];
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'size',
        value: function size() {
            return this.count - this.lowestCount;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = {};
            this.count = 0;
            this.lowestCount = 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this.isEmpty()) {
                return '';
            }
            var objString = '' + this.items[this.lowestCount];
            for (var i = this.lowestCount + 1; i < this.count; i++) {
                objString = objString + ',' + this.items[i];
            }
            return objString;
        }
    }]);

    return Deque;
}();

var deque = new Deque();
deque.addFront(1);
deque.addFront(2);
deque.addFront(3);
deque.addFront(4);
deque.addFront(5);
deque.addFront(6);

console.log(deque.items);

console.log("**********************************************");

/**
 * 传花鼓游戏
 * @param {*} elementsList 被淘汰队列
 * @param {*} num 某一时刻
 * @returns 
 */
function hotPotato(elementsList, num) {
    var queue = new Queue(); // {1} 
    var elimitatedList = [];
    for (var i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]); // {2} 
    }
    while (queue.size() > 1) {
        for (var _i = 0; _i < num; _i++) {
            queue.enqueue(queue.dequeue()); // {3} 
        }
        elimitatedList.push(queue.dequeue()); // {4} 
    }
    return {
        eliminated: elimitatedList,
        winner: queue.dequeue() // {5} 
    };
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
var result = hotPotato(names, 4);
result.eliminated.forEach(function (name) {
    console.log(name + '\u5728\u51FB\u9F13\u4F20\u82B1\u6E38\u620F\u4E2D\u88AB\u6DD8\u6C70\u3002');
});
console.log('\u80DC\u5229\u8005\uFF1A ' + result.winner);
console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

// 回文检查
function palindromeChecker(aString) {
    if (aString === undefined || aString === null || aString !== null && aString.length === 0) {
        return false;
    }
    var deque = new Deque();
    var lowerString = aString.toLocaleLowerCase().split(' ').join('');
    var isEqual = true;
    var firstChar = void 0,
        lastChar = void 0;

    for (var i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i));
    }

    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        console.log(firstChar, lastChar, 99);
        if (firstChar !== lastChar) {
            isEqual = false;
        }
    }
    return isEqual;
}
console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));