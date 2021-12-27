/**队列 */
class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = [];
    }
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount]; // {1} 
        delete this.items[this.lowestCount]; // {2} 
        this.lowestCount++; // {3} 
        return result; // {4} 
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = [];
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/**双端队列 */
class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    addFront(element) {
        if (this.isEmpty()) { // {1} 
            this.addBack(element);
        } else if (this.lowestCount > 0) { // {2} 
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) { // {3} 
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element; // {4} 
        }
    }
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount]; // {1} 
        delete this.items[this.lowestCount]; // {2} 
        this.lowestCount++; // {3} 
        return result; // {4} 
    }
    removeBack() {
        if (this.isEmpty()) { // {1} 
            return undefined;
        }
        this.count--; // {2} 
        const result = this.items[this.count]; // {3} 
        delete this.items[this.count]; // {4} 
        return result; // {5} 
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/**
 * 传花鼓游戏
 * @param {*} elementsList 被淘汰队列
 * @param {*} num 某一时刻
 * @returns 
 */
function hotPotato(elementsList, num) {
    const queue = new Queue(); // {1} 
    const elimitatedList = [];
    for (let i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]); // {2} 
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue()); // {3} 
        }
        elimitatedList.push(queue.dequeue()); // {4} 
    }
    return {
        eliminated: elimitatedList,
        winner: queue.dequeue() // {5} 
    };
}

// 回文检查
function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
        return false;
    }
    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar, lastChar;

    for (let i = 0; i < lowerString.length; i++) {
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

module.exports = {
    Queue: Queue
}