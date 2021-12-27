// 对于整数排序的计数排序
function countingSort(array) {
    if (array.length < 2) {
        return array;
    }
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue + 1);
    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0;
        }
        counts[element]++;
    })
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i;
            count--;
        }
    })
    return array;
}

function findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++){
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

let array = [5, 4, 3, 2, 3, 1,99,63];
console.log(countingSort(array));