// 插入排序
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

function insertionSort(array, compareFn = defaultCompare) {
    var {
        length
    } = array;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}
let array = [3, 5, 1, 4, 2];

console.log(array.join());
console.time()
array = insertionSort(array);
console.timeEnd()
console.log(array.join());
