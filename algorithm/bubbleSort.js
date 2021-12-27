// 冒泡排序
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

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
// 基础版本
function bubbleSort(array, compareFn = defaultCompare) {
    const {
        length
    } = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}
// 冒泡排序改良版本
function modifiedBubbleSort(array, compareFn = defaultCompare) {
    const {
        length
    } = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // {1} 
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}

function createNonSortedArray(size) { // 6 
    const array = [];
    for (let i = size; i > 0; i--) {
        array.push(i);
    }
    return array;
}
let array = createNonSortedArray(5); // {7} 
console.log(array.join()); // {8} 
console.time();
array = bubbleSort(array); // {9} 
console.timeEnd()
console.log(array.join()); //{10}