'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return '' + item;
    }
    return item.toString();
}

var ValuePair = function () {
    function ValuePair(key, value) {
        _classCallCheck(this, ValuePair);

        this.key = key;
        this.value = value;
    }

    _createClass(ValuePair, [{
        key: 'toString',
        value: function toString() {
            return '[#' + this.key + ': ' + this.value + ']';
        }
    }]);

    return ValuePair;
}();

var Dictionary = exports.Dictionary = function () {
    function Dictionary() {
        var toStrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultToString;

        _classCallCheck(this, Dictionary);

        this.toStrFn = toStrFn;
        this.table = {};
    }

    _createClass(Dictionary, [{
        key: 'hasKey',
        value: function hasKey(key) {
            return this.table[this.toStrFn(key)] != null;
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            if (key != null && value != null) {
                var tableKey = this.toStrFn(key);
                this.table[tableKey] = new ValuePair(key, value);
                return true;
            }
            return false;
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            if (this.hasKey(key)) {
                delete this.table[this.toStrFn(key)];
                return true;
            }
            return false;
        }
    }, {
        key: 'get',
        value: function get(key) {
            var valuePair = this.table[this.toStrFn(key)];
            return valuePair == null ? undefined : valuePair.value;
        }
    }, {
        key: 'keyValues',
        value: function keyValues() {
            // return Object.values(this.table);
            //or
            var valuePairs = [];
            for (var k in this.table) {
                if (this.hasKey(k)) {
                    valuePairs.push(this.table[k]);
                }
            }
            return valuePairs;
        }
    }, {
        key: 'keys',
        value: function keys() {
            // return this.keyValues().map(valuePair => valuePair.key);
            // or
            var keys = [];
            var valuePairs = this.keyValues();
            for (var i = 0; i < valuePairs.length; i++) {
                keys.push(valuePairs[i].key);
            }
            return keys;
        }
    }, {
        key: 'values',
        value: function values() {
            console.log(this.keyValues());
            return this.keyValues().map(function (valuePair) {
                return valuePair.value;
            });
        }
    }, {
        key: 'forEach',
        value: function forEach(callbackFn) {
            var valuePairs = this.keyValues();
            for (var i = 0; i < valuePairs.length; i++) {
                var result = callbackFn(valuePairs[i].key, valuePairs[i].value);
                if (result === false) {
                    break;
                }
            }
        }
    }, {
        key: 'size',
        value: function size() {
            return Object.keys(this.table).length;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.table = {};
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this.isEmpty()) {
                return '';
            }
            var valuePairs = this.keyValues;
            var objString = '' + valuePairs[0].toString();
            for (var i = 1; i < valuePairs.length; i++) {
                objString = objString + ',' + valuePairs[i].toString();
            }
            return objString;
        }
    }]);

    return Dictionary;
}();

var HashTable = function () {
    function HashTable() {
        var toStrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultToString;

        _classCallCheck(this, HashTable);

        this.toStrFn = toStrFn;
        this.table = {};
    }

    _createClass(HashTable, [{
        key: 'loseloseHashCode',
        value: function loseloseHashCode(key) {
            if (typeof key === 'number') {
                return key;
            }
            var tableKey = this.toStrFn(key);
            var hash = 0;
            for (var i = 0; i < tableKey.length; i++) {
                hash += tableKey.charCodeAt(i);
            }
            return hash % 37;
        }
    }, {
        key: 'hashCode',
        value: function hashCode(key) {
            return this.loseloseHashCode(key);
        }
    }, {
        key: 'size',
        value: function size() {
            return Object.keys(this.table).length;
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.size() === 0;
        }
    }, {
        key: 'put',
        value: function put(key, value) {
            if (key != null && value != null) {
                // {1} 
                var position = this.hashCode(key); // {2} 
                this.table[position] = new ValuePair(key, value); // {3} 
                return true;
            }
            return false;
        }
    }, {
        key: 'get',
        value: function get(key) {
            var valuePair = this.table[this.hashCode(key)];
            return valuePair == null ? undefined : valuePair.value;
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            var hash = this.hashCode(key); // {1} 
            var valuePair = this.table[hash]; // {2} 
            if (valuePair != null) {
                delete this.table[hash]; // {3} 
                return true;
            }
            return false;
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (this.isEmpty()) {
                return '';
            }
            var keys = Object.keys(this.table);
            var objString = '{' + keys[0] + ' => ' + this.table[keys[0]].toString() + '}';
            for (var i = 1; i < keys.length; i++) {
                objString = objString + ',{' + keys[i] + ' => \n       ' + this.table[keys[i]].toString() + '}';
            }
            return objString;
        }
    }]);

    return HashTable;
}();

var HashTableSeparateChaining = function () {
    function HashTableSeparateChaining() {
        var toStrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultToString;

        _classCallCheck(this, HashTableSeparateChaining);

        this.toStrFn = toStrFn;
        this.table = {};
    }

    _createClass(HashTableSeparateChaining, [{
        key: 'put',
        value: function put(key, value) {
            if (key != null && value != null) {
                var position = this.hashCode(key);
                if (this.table[position] == null) {// {1}
                    // this.table[position] = new LinkedList(); // {2} 
                }
                this.table[position].push(new ValuePair(key, value)); // {3} 
                return true;
            }
            return false;
        }
    }, {
        key: 'get',
        value: function get(key) {
            var position = this.hashCode(key);
            var linkedList = this.table[position]; // {1} 
            if (linkedList != null && !linkedList.isEmpty()) {
                // {2} 
                var current = linkedList.getHead(); // {3} 
                while (current != null) {
                    // {4} 
                    if (current.element.key === key) {
                        // {5} 
                        return current.element.value; // {6} 
                    }
                    current = current.next; // {7} 
                }
            }
            return undefined; // {8} 
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            var position = this.hashCode(key);
            var linkedList = this.table[position];
            if (linkedList != null && !linkedList.isEmpty()) {
                var current = linkedList.getHead();
                while (current != null) {
                    if (current.element.key === key) {
                        // {1} 
                        linkedList.remove(current.element); // {2} 
                        if (linkedList.isEmpty()) {
                            // {3} 
                            delete this.table[position]; // {4} 
                        }
                        return true; // {5} 
                    }
                    current = current.next; // {6} 
                }
            }
            return false; // {7} 
        }
    }]);

    return HashTableSeparateChaining;
}();