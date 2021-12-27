'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function reverseCompare(compareFn) {
    return function (a, b) {
        return compareFn(b, a);
    };
}

var Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

var MinHeap = function () {
    function MinHeap() {
        var compareFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCompare;

        _classCallCheck(this, MinHeap);

        this.compareFn = compareFn;
        this.heap = [];
    }

    _createClass(MinHeap, [{
        key: 'getLeftIndex',
        value: function getLeftIndex(index) {
            return 2 * index + 1;
        }
    }, {
        key: 'getRightIndex',
        value: function getRightIndex(index) {
            return 2 * index + 2;
        }
    }, {
        key: 'getParentIndex',
        value: function getParentIndex(index) {
            if (index === 0) {
                return undefined;
            }
            return Math.floor((index - 1) / 2);
        }
    }, {
        key: 'insert',
        value: function insert(value) {
            if (value != null) {
                this.heap.push(value);
                this.siftUp(this.heap.length - 1);
                return true;
            }
            return false;
        }
        // 上移操作

    }, {
        key: 'siftUp',
        value: function siftUp(index) {
            var parent = this.getParentIndex(index);
            while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
                swap(this.heap, parent, index);
                index = parent;
                parent = this.getParentIndex(index);
            }
        }
    }, {
        key: 'size',
        value: function size() {
            return this.heap.length;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'findMinimum',
        value: function findMinimum() {
            return this.isEmpty() ? undefined : this.heap[0];
        }
        // 删除最大值或最小值

    }, {
        key: 'extract',
        value: function extract() {
            if (this.isEmpty()) {
                return undefined;
            }
            if (this.size() === 1) {
                return this.heap.shift();
            }
            var removedValue = this.heap.shift();
            this.siftDown(0);
            return removedValue;
        }
        // 下称操作

    }, {
        key: 'siftDown',
        value: function siftDown(index) {
            var element = index;
            var left = this.getLeftIndex(index);
            var right = this.getRightIndex(index);
            var size = this.size();
            if (left < size && this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN) {
                element = left;
            }
            if (right < size && this.compareFn(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN) {
                element = right;
            }
            if (index !== element) {
                swap(this.heap, index, element);
                this.siftDown(element);
            }
        }
    }]);

    return MinHeap;
}();

var MaxHeap = function (_MinHeap) {
    _inherits(MaxHeap, _MinHeap);

    function MaxHeap() {
        var compareFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCompare;

        _classCallCheck(this, MaxHeap);

        var _this = _possibleConstructorReturn(this, (MaxHeap.__proto__ || Object.getPrototypeOf(MaxHeap)).call(this, compareFn));

        _this.compareFn = reverseCompare(compareFn); // {1} 
        return _this;
    }

    return MaxHeap;
}(MinHeap);

function heapSort(array) {
    var compareFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCompare;

    var heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}

function buildMaxHeap(array, compareFn) {
    for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array;
}

function heapify(array, index, size, compareFn) {
    var element = index;
    var left = 2 * index + 1; // {1} 
    var right = 2 * index + 2; // {2} 
    if (left < size && compareFn(array[element], array[left]) > Compare.BIGGER_THAN) {
        // {3} 
        element = left; // {4} 
    }
    if (right < size && compareFn(array[element], array[right]) > Compare.BIGGER_THAN) {
        // {5} 
        element = right; // {6} 
    }
    if (index !== element) {
        // {7} 
        swap(array, index, element); // {8} 
        heapify(array, element, size, compareFn); // {9} 
    }
}

var array = [7, 6, 3, 5, 4, 1, 2];
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));