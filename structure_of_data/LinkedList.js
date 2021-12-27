function defaultEquals(a, b) {
    return a === b;
}
// 链表项
class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}
// 链表
class LinkedList {
    constructor() {
        this.count = 0;
        this.head = undefined;
    }
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            // 将其next赋为新元素，建立链接
            current.next = node;
        }
        this.count++;
    }
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                // 将previous与current的下一项链接起来： 跳过Current,从而移除它
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getHead() {
        this.head;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head;
        for (let i = 1; i < this.size(); i++) {
            current = current.next;
            objString = `${objString},${current.element}`;
        }
        return objString;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    equalsFn(a, b) {
        return a === b;
    }
}

// 双向链表
class DoubleNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoubleNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.next = node;
                    this.head = none;
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }
    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
}

// 栈式链表
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList()
    }
    push(element) {
        this.items.push(element)
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1);
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    }
    toString() {
        return this.items.toString();
    }
}