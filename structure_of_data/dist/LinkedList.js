'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultEquals(a, b) {
    return a === b;
}
// 链表项

var Node = function Node(element) {
    _classCallCheck(this, Node);

    this.element = element;
    this.next = undefined;
};
// 链表


var LinkedList = function () {
    function LinkedList() {
        _classCallCheck(this, LinkedList);

        this.count = 0;
        this.head = undefined;
    }

    _createClass(LinkedList, [{
        key: 'push',
        value: function push(element) {
            var node = new Node(element);
            var current = void 0;
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
    }, {
        key: 'removeAt',
        value: function removeAt(index) {
            // 检查越界值
            if (index >= 0 && index < this.count) {
                var current = this.head;
                // 移除第一项
                if (index === 0) {
                    this.head = current.next;
                } else {
                    var previous = this.getElementAt(index - 1);
                    current = previous.next;
                    // 将previous与current的下一项链接起来： 跳过Current,从而移除它
                    previous.next = current.next;
                }
                this.count--;
                return current.element;
            }
            return undefined;
        }
    }, {
        key: 'remove',
        value: function remove(element) {
            var index = this.indexOf(element);
            return this.removeAt(index);
        }
    }, {
        key: 'insert',
        value: function insert(element, index) {
            if (index >= 0 && index <= this.count) {
                var node = new Node(element);
                if (index === 0) {
                    var current = this.head;
                    node.next = current;
                    this.head = node;
                } else {
                    var previous = this.getElementAt(index - 1);
                    var _current = previous.next;
                    node.next = _current;
                    previous.next = node;
                }
                this.count++;
                return true;
            }
            return false;
        }
    }, {
        key: 'indexOf',
        value: function indexOf(element) {
            var current = this.head;
            for (var i = 0; i < this.count && current != null; i++) {
                if (this.equalsFn(element, current.element)) {
                    return i;
                }
                current = current.next;
            }
            return -1;
        }
    }, {
        key: 'size',
        value: function size() {
            return this.count;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'getHead',
        value: function getHead() {
            this.head;
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this.head == null) {
                return '';
            }
            var objString = '' + this.head.element;
            var current = this.head;
            for (var i = 1; i < this.size(); i++) {
                current = current.next;
                objString = objString + ',' + current.element;
            }
            return objString;
        }
    }, {
        key: 'getElementAt',
        value: function getElementAt(index) {
            if (index >= 0 && index <= this.count) {
                var node = this.head;
                for (var i = 0; i < index && node != null; i++) {
                    node = node.next;
                }
                return node;
            }
            return undefined;
        }
    }, {
        key: 'equalsFn',
        value: function equalsFn(a, b) {
            return a === b;
        }
    }]);

    return LinkedList;
}();

// 双向链表


var DoubleNode = function (_Node) {
    _inherits(DoubleNode, _Node);

    function DoubleNode(element, next, prev) {
        _classCallCheck(this, DoubleNode);

        var _this = _possibleConstructorReturn(this, (DoubleNode.__proto__ || Object.getPrototypeOf(DoubleNode)).call(this, element, next));

        _this.prev = prev;
        return _this;
    }

    return DoubleNode;
}(Node);

var DoublyLinkedList = function (_LinkedList) {
    _inherits(DoublyLinkedList, _LinkedList);

    function DoublyLinkedList() {
        var equalsFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultEquals;

        _classCallCheck(this, DoublyLinkedList);

        var _this2 = _possibleConstructorReturn(this, (DoublyLinkedList.__proto__ || Object.getPrototypeOf(DoublyLinkedList)).call(this, equalsFn));

        _this2.tail = undefined;
        return _this2;
    }

    _createClass(DoublyLinkedList, [{
        key: 'insert',
        value: function insert(element, index) {
            if (index >= 0 && index <= this.count) {
                var node = new DoubleNode(element);
                var current = this.head;
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
                    var previous = this.getElementAt(index - 1);
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
    }, {
        key: 'removeAt',
        value: function removeAt(index) {
            if (index >= 0 && index < this.count) {
                var current = this.head;
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
                    var previous = current.prev;
                    previous.next = current.next;
                    current.next.prev = previous;
                }
                this.count--;
                return current.element;
            }
            return undefined;
        }
    }]);

    return DoublyLinkedList;
}(LinkedList);

var CircularLinkedList = function (_LinkedList2) {
    _inherits(CircularLinkedList, _LinkedList2);

    function CircularLinkedList() {
        var equalsFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultEquals;

        _classCallCheck(this, CircularLinkedList);

        return _possibleConstructorReturn(this, (CircularLinkedList.__proto__ || Object.getPrototypeOf(CircularLinkedList)).call(this, equalsFn));
    }

    _createClass(CircularLinkedList, [{
        key: 'insert',
        value: function insert(element, index) {
            if (index >= 0 && index <= this.count) {
                var node = new Node(element);
                var current = this.head;
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
                    var previous = this.getElementAt(index - 1);
                    node.next = previous.next;
                    previous.next = node;
                }
                this.count++;
                return true;
            }
            return false;
        }
    }, {
        key: 'removeAt',
        value: function removeAt(index) {
            if (index >= 0 && index.count) {
                var current = this.head;
                if (index === 0) {
                    if (this.size() === 1) {
                        this.head = undefined;
                    } else {
                        var removed = this.head;
                        current = this.getElementAt(this.size());
                        this.head = this.head.next;
                        current.next = this.head;
                        current = removed;
                    }
                } else {
                    var previous = this.getElementAt(index - 1);
                    current = previous.next;
                    previous.next = current.next;
                }
                this.count--;
                return current.element;
            }
            return undefined;
        }
    }]);

    return CircularLinkedList;
}(LinkedList);

var Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

var SortedLinkedList = function (_LinkedList3) {
    _inherits(SortedLinkedList, _LinkedList3);

    function SortedLinkedList() {
        var equalsFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultEquals;
        var compareFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCompare;

        _classCallCheck(this, SortedLinkedList);

        var _this4 = _possibleConstructorReturn(this, (SortedLinkedList.__proto__ || Object.getPrototypeOf(SortedLinkedList)).call(this, equalsFn));

        _this4.compareFn = compareFn;
        return _this4;
    }

    _createClass(SortedLinkedList, [{
        key: 'insert',
        value: function insert(element) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.isEmpty()) {
                return _get(SortedLinkedList.prototype.__proto__ || Object.getPrototypeOf(SortedLinkedList.prototype), 'insert', this).call(this, element, 0);
            }
            var pos = this.getIndexNextSortedElement(element);
            return _get(SortedLinkedList.prototype.__proto__ || Object.getPrototypeOf(SortedLinkedList.prototype), 'insert', this).call(this, element, pos);
        }
    }, {
        key: 'getIndexNextSortedElement',
        value: function getIndexNextSortedElement(element) {
            var current = this.head;
            var i = 0;
            for (; i < this.size() && current; i++) {
                var comp = this.compareFn(element, current.element);
                if (comp === Compare.LESS_THAN) {
                    return i;
                }
                current = current.next;
            }
            return i;
        }
    }]);

    return SortedLinkedList;
}(LinkedList);

// 栈式链表


var StackLinkedList = function () {
    function StackLinkedList() {
        _classCallCheck(this, StackLinkedList);

        this.items = new DoublyLinkedList();
    }

    _createClass(StackLinkedList, [{
        key: 'push',
        value: function push(element) {
            this.items.push(element);
        }
    }, {
        key: 'pop',
        value: function pop() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items.removeAt(this.size() - 1);
        }
    }, {
        key: 'peek',
        value: function peek() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.items.getElementAt(this.size() - 1).element;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.items.isEmpty();
        }
    }, {
        key: 'size',
        value: function size() {
            return this.items.size();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items.clear();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.items.toString();
        }
    }]);

    return StackLinkedList;
}();