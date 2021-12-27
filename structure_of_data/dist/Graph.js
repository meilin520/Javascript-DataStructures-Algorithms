'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.breadthFirstSearch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dictionary = require('./Dictionary');

var _Queue = require('./Queue');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};
var initializeColor = function initializeColor(vertices) {
    var color = {};
    for (var i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

var Graph = function () {
    function Graph() {
        var isDirected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, Graph);

        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new _Dictionary.Dictionary();
    }

    _createClass(Graph, [{
        key: 'addVertex',
        value: function addVertex(v) {
            if (!this.vertices.includes(v)) {
                this.vertices.push(v);
                this.adjList.set(v, []);
            }
        }
    }, {
        key: 'addEdge',
        value: function addEdge(v, w) {
            if (!this.adjList.get(v)) {
                this.addVertexd(v);
            }
            if (!this.adjList.get(w)) {
                this.addVertex(w);
            }
            this.adjList.get(v).push(w);
            if (!this.isDirected) {
                // 如果是无向图，则存在双向连接边
                this.adjList.get(w).push(v);
            }
        }
    }, {
        key: 'getVertices',
        value: function getVertices() {
            return this.vertices;
        }
    }, {
        key: 'getAdjList',
        value: function getAdjList() {
            return this.adjList;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var s = '';
            for (var i = 0; i < this.vertices.length; i++) {
                // {15} 
                s += this.vertices[i] + ' -> ';
                var neighbors = this.adjList.get(this.vertices[i]); // {16} 
                for (var j = 0; j < neighbors.length; j++) {
                    // {17} 
                    s += neighbors[j] + ' ';
                }
                s += '\n'; // {18} 
            }
            return s;
        }
    }]);

    return Graph;
}();

var breadthFirstSearch = exports.breadthFirstSearch = function breadthFirstSearch(graph, startVertex, callback) {
    var vertices = graph.getVertices();
    var adjList = graph.getAdjList();
    var color = initializeColor(vertices); // {1} 
    var queue = new _Queue.Queue(); // {2} 
    queue.enqueue(startVertex); // {3} 
    while (!queue.isEmpty()) {
        // {4} 
        var u = queue.dequeue(); // {5} 
        var neighbors = adjList.get(u); // {6} 
        color[u] = Colors.GREY; // {7} 
        for (var i = 0; i < neighbors.length; i++) {
            // {8} 
            var w = neighbors[i]; // {9} 
            if (color[w] === Colors.WHITE) {
                // {10} 
                color[w] = Colors.GREY; // {11} 
                queue.enqueue(w); // {12} 
            }
        }
        color[u] = Colors.BLACK; // {13} 
        if (callback) {
            // {14} 
            callback(u);
        }
    }
};