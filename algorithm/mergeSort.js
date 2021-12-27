// 归并排序
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

function mergeSort(array, compareFn = defaultCompare) {
    if (array.length > 1) { // {1}
        const { length } = array;
        const middle = Math.floor(length / 2); //{2}
        const left = mergeSort(array.slice(0, middle), compareFn); // {3}
        const right = mergeSort(array.slice(middle, length), compareFn); //{4}
        console.log("拆分：",left,right);
        array = merge(left, right, compareFn);
    }
    return array;
}

function merge(left, right, compareFn) {
    let i = 0; //{6}
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) { //{7}
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]); //{8}
    }
    console.log("merge中:",i,j,left,right,result)
    return result.concat(i < left.length ? left.slice(i) : right.slice(j)); //{9}
}

let array = [5, 3, 1];

console.log(array.join());
array = mergeSort(array);
console.log(array.join());