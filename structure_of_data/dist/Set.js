'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Set = function () {
    function Set() {
        _classCallCheck(this, Set);

        this.items = {};
        this.count = 0;
    }

    _createClass(Set, [{
        key: 'has',
        value: function has(element) {
            return Object.prototype.hasOwnProperty.call(this.items, element);
        }
    }, {
        key: 'add',
        value: function add(element) {
            if (!this.has(element)) {
                this.items[element] = element;
                this.count++;
                return true;
            }
            return false;
        }
    }, {
        key: 'delete',
        value: function _delete(element) {
            if (this.has(element)) {
                delete this.items[element]; // {1} 
                this.count--;
                return true;
            }
            return false;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = {}; // {2} 
        }
    }, {
        key: 'size',
        value: function size() {
            return this.count;
            // return Object.keys(this.items).length;
        }
    }, {
        key: 'sizeLegacy',
        value: function sizeLegacy() {
            var count = 0;
            for (var key in this.items) {
                // {2} 
                if (this.items.hasOwnProperty(key)) {
                    // {3} 
                    count++; // {4} 
                }
                return count;
            };
        }
    }, {
        key: 'values',
        value: function values() {
            return Object.values(this.items);
        }
    }, {
        key: 'valuesLegacy',
        value: function valuesLegacy() {
            var values = [];
            for (var key in this.items) {
                if (this.items.hasOwnProperty(key)) {
                    values.push(this.items[key]);
                }
            }
            return values;
        }
    }, {
        key: 'union',
        value: function union(otherSet) {
            var unionSet = new Set();
            this.values().forEach(function (value) {
                return unionSet.add(value);
            });
            otherSet.values().forEach(function (value) {
                return unionSet.add(value);
            });
            return unionSet;
        }
    }, {
        key: 'intersection1',
        value: function intersection1(otherSet) {
            var intersectionSet = new Set();

            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (otherSet.has(values[i])) {
                    intersectionSet.add(values[i]);
                }
            }
            return intersectionSet;
        }
    }, {
        key: 'intersection2',
        value: function intersection2(otherSet) {
            var intersectionSet = new Set();
            var values = this.values();
            var otherValues = otherValues.values();
            var biggerSet = values;
            var smallerSet = otherValues;
            if (otherValues.length - values.length > 0) {
                biggerSet = otherValues;
                smallerSet = values;
            }
            smallerSet.forEach(function (value) {
                if (biggerSet.includes(value)) {
                    intersectionSet.add(value);
                }
            });
            return intersectionSet;
        }
    }, {
        key: 'difference',
        value: function difference(otherSet) {
            var differenceSet = new Set(); // {1} 
            this.values().forEach(function (value) {
                // {2} 
                if (!otherSet.has(value)) {
                    // {3} 
                    differenceSet.add(value); // {4} 
                }
            });
            return differenceSet;
        }
    }, {
        key: 'isSubsetOf',
        value: function isSubsetOf(otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSubset = true;
            this.values().every(function (value) {
                if (!otherSet.has(value)) {
                    isSubset = false;
                    return false;
                }
                return true;
            });
            return isSubset;
        }
    }]);

    return Set;
}();

var setA = new Set();
setA.add(1);
setA.add(2);

var setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

var setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log('A=', setA);
console.log('B=', setB);
console.log('C=', setC);

console.log(setA.isSubsetOf(setB));
console.log(setB.isSubsetOf(setC));
console.log("********************");