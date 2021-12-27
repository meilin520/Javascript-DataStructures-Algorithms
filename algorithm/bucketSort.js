// 桶排序
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

function bucketSort(array, bucketSize = 5) {
    if (array.length < 2) {
        return array;
    }
    const buckets = createBuckets(array, bucketSize);
    return sortBuckets(buckets);
}
 
function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++){
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = [];
    for (let i = 0; i < bucketCount; i++){
        buckets[i] = [];
    }
    for (let i = 0; i < array.length; i++){
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);
    }
    return buckets;
}

function sortBuckets(buckets) {
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++){
        if (buckets[i] != null) {
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}

const array = [5, 3, 2, 8, 7, 4];
console.log('====================================');
console.log(bucketSort(array,5));
console.log('====================================');