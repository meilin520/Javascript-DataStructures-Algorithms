class Set {
    constructor() {
        this.items = {};
        this.count = 0;
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            this.count++
            return true;
        }
        return false;
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element]; // {1} 
            this.count--
            return true;
        }
        return false;
    }
    clear() {
        this.items = {}; // {2} 
    }
    size() {
        return this.count;
        // return Object.keys(this.items).length;
    }
    sizeLegacy() {
        let count = 0;
        for (let key in this.items) { // {2} 
            if (this.items.hasOwnProperty(key)) { // {3} 
                count++; // {4} 
            }
            return count;
        };
    }
    values() {
        return Object.values(this.items);
    }
    valuesLegacy() {
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(this.items[key])
            }
        }
        return values;
    }
    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    intersection1(otherSet) {
        const intersectionSet = new Set();

        const values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }
    intersection2(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherValues.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })
        return intersectionSet;
    }
    difference(otherSet) {
        const differenceSet = new Set(); // {1} 
        this.values().forEach(value => { // {2} 
            if (!otherSet.has(value)) { // {3} 
                differenceSet.add(value); // {4} 
            }
        });
        return differenceSet;
    }
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false
        }
        let isSubset = true;
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}

const setA = new Set();
setA.add(1);
setA.add(2);

const setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log('A=', setA)
console.log('B=', setB)
console.log('C=', setC)

console.log(setA.isSubsetOf(setB));
console.log(setB.isSubsetOf(setC));
console.log("********************");