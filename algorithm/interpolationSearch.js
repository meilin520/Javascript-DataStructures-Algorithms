// 内插搜索算法
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

function defaultDiff() {
    
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

function interpolationSearch(array, value,
    compareFn = defaultCompare,
    equalsFn = defaultEquals,
    diffFn = defaultDiff
) {
    const {
        length
    } = array;
    let low = 0;
    let high = length - 1;
    let position = -1;
    let delta = -1;
    while (
        low <= high &&
        biggerOrEquals(value, array[low], compareFn) &&
        lesserOrEquals(value, array[high], compareFn)
    ) {
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // {1} 
        position = low + Math.floor((high - low) * delta); // {2} 
        if (equalsFn(array[position], value)) { // {3} 
            return position;
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) { // {4} 
            low = position + 1;
        } else {
            high = position - 1;
        }
    }
    return DOES_NOT_EXIST;
}

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

function biggerOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}