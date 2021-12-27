function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}
class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    keyValues() {
        // return Object.values(this.table);
        //or
        const valuePairs = [];
        for (const k in this.table) {
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k])
            }
        }
        return valuePairs;
    }
    keys() {
        // return this.keyValues().map(valuePair => valuePair.key);
        // or
        const keys = [];
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            keys.push(valuePairs[i].key);
        }
        return keys;
    }
    values() {
        console.log(this.keyValues());
        return this.keyValues().map(valuePair => valuePair.value);
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    clear() {
        this.table = {};
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues;
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    put(key, value) {
        if (key != null && value != null) { // {1} 
            const position = this.hashCode(key); // {2} 
            this.table[position] = new ValuePair(key, value); // {3} 
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    remove(key) {
        const hash = this.hashCode(key); // {1} 
        const valuePair = this.table[hash]; // {2} 
        if (valuePair != null) {
            delete this.table[hash]; // {3} 
            return true;
        }
        return false;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString},{${keys[i]} => 
       ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}

class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) { // {1}
                // this.table[position] = new LinkedList(); // {2} 
            }
            this.table[position].push(new ValuePair(key, value)); // {3} 
            return true;
        }
        return false;
    }
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position]; // {1} 
        if (linkedList != null && !linkedList.isEmpty()) { // {2} 
            let current = linkedList.getHead(); // {3} 
            while (current != null) { // {4} 
                if (current.element.key === key) { // {5} 
                    return current.element.value; // {6} 
                }
                current = current.next; // {7} 
            }
        }
        return undefined; // {8} 
    }
    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) { // {1} 
                    linkedList.remove(current.element); // {2} 
                    if (linkedList.isEmpty()) { // {3} 
                        delete this.table[position]; // {4} 
                    }
                    return true; // {5} 
                }
                current = current.next; // {6} 
            }
        }
        return false; // {7} 
    }
}

module.exports = {
    Dictionary: Dictionary
}