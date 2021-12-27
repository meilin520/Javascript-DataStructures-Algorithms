function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = []
    }
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }
    // 上移操作
    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    // 删除最大值或最小值
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        this.siftDown(0);
        return removedValue;
    }
    // 下称操作
    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
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
}

class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn); // {1} 
    }
}

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array;
}

function heapify(array, index, size, compareFn) {
    let element = index;
    const left = 2 * index + 1; // {1} 
    const right = 2 * index + 2; // {2} 
    if (
        left < size &&
        compareFn(array[element], array[left]) >
        Compare.BIGGER_THAN
    ) { // {3} 
        element = left; // {4} 
    }
    if (
        right < size &&
        compareFn(array[element], array[right]) >
        Compare.BIGGER_THAN
    ) { // {5} 
        element = right; // {6} 
    }
    if (index !== element) { // {7} 
        swap(array, index, element); // {8} 
        heapify(array, element, size, compareFn); // {9} 
    }
}

const array = [7, 6, 3, 5, 4, 1, 2];
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));