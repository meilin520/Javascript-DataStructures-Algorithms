// 顺序搜索算法
function defaultEquals(a, b) {
    return a === b;
}
const DOES_NOT_EXIST = -1;
function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++){
        if (equalsFn(value, array[i])) {
            return i;
        }
    }
    return DOES_NOT_EXIST;
}

const array = [5, 4, 3, 2, 1]
console.log(sequentialSearch(array, 3));