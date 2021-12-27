var Dictionary = require('./Dictionary');
var Queue = require('./Queue');
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
};
const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};
class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }
    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertexd(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }
        this.adjList.get(v).push(w);
        if (!this.isDirected) { // 如果是无向图，则存在双向连接边
            this.adjList.get(w).push(v);
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) { // {15} 
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]); // {16} 
            for (let j = 0; j < neighbors.length; j++) { // {17} 
                s += `${neighbors[j]} `;
            }
            s += '\n'; // {18} 
        }
        return s;
    }
}
const graph = new Graph(); 
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; // {12} 
for (let i = 0; i < myVertices.length; i++) { // {13} 
 graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'B'); // {14} 
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('C', 'D'); 
graph.addEdge('C', 'G'); 
graph.addEdge('D', 'G'); 
graph.addEdge('D', 'H'); 
graph.addEdge('B', 'E'); 
graph.addEdge('B', 'F'); 
graph.addEdge('E', 'I');

console.log(graph.toString());

const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices); // {1} 
    const queue = new Queue(); // {2} 
    queue.enqueue(startVertex); // {3} 
    while (!queue.isEmpty()) { // {4} 
        const u = queue.dequeue(); // {5} 
        const neighbors = adjList.get(u); // {6} 
        color[u] = Colors.GREY; // {7} 
        for (let i = 0; i < neighbors.length; i++) { // {8} 
            const w = neighbors[i]; // {9} 
            if (color[w] === Colors.WHITE) { // {10} 
                color[w] = Colors.GREY; // {11} 
                queue.enqueue(w); // {12} 
            }
        }
        color[u] = Colors.BLACK; // {13} 
        if (callback) { // {14} 
            callback(u);
        }
    }
};