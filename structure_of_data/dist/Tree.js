'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

var BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

var Node = function Node(key) {
    _classCallCheck(this, Node);

    this.key = key;
    this.left = null;
    this.right = null;
};

// 二叉树


var BinarySearchTree = function () {
    function BinarySearchTree() {
        var compareFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCompare;

        _classCallCheck(this, BinarySearchTree);

        this.compareFn = compareFn;
        this.root = null;
    }

    _createClass(BinarySearchTree, [{
        key: 'insert',
        value: function insert(key) {
            if (this.root == null) {
                this.root = new Node(key);
            } else {
                this.insertNode(this.root, key);
            }
        }
    }, {
        key: 'insertNode',
        value: function insertNode(node, key) {
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                if (node.left == null) {
                    node.left = new Node(key);
                } else {
                    this.insertNode(node.left, key);
                }
            } else {
                if (node.right == null) {
                    node.right = new Node(key);
                } else {
                    this.insertNode(node.right, key);
                }
            }
        }
        // 中序遍历

    }, {
        key: 'inOrderTraverse',
        value: function inOrderTraverse(callback) {
            this.inOrderTraverseNode(this.root, callback);
        }
    }, {
        key: 'inOrderTraverseNode',
        value: function inOrderTraverseNode(node, callback) {
            if (node != null) {
                this.inOrderTraverseNode(node.left, callback); // 左节点进行到底
                callback(node.key); // 父节点
                this.inOrderTraverseNode(node.right, callback); // 左节点进行到底
            }
        }
        // 先序遍历

    }, {
        key: 'preOrderTraverse',
        value: function preOrderTraverse(callback) {
            this.preOrderTraverseNode(this.root, callback);
        }
    }, {
        key: 'preOrderTraverseNode',
        value: function preOrderTraverseNode(node, callback) {
            if (node != null) {
                callback(node.key);
                this.preOrderTraverseNode(node.left, callback);
                this.preOrderTraverseNode(node.right, callback);
            }
        }
        // 后序遍历

    }, {
        key: 'postOrderTraverse',
        value: function postOrderTraverse(callback) {
            this.postOrderTraverseNode(this.root, callback);
        }
    }, {
        key: 'postOrderTraverseNode',
        value: function postOrderTraverseNode(node, callback) {
            if (node != null) {
                this.postOrderTraverseNode(node.left, callback);
                this.postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        }
        // 搜索最小值

    }, {
        key: 'min',
        value: function min() {
            return this.minNode(this.root);
        }
    }, {
        key: 'minNode',
        value: function minNode(node) {
            var current = node;
            while (current != null && current.left != null) {
                // {2} 
                current = current.left; // {3} 
            }
            return current; // {4} 
        }
        // 搜索最大值 

    }, {
        key: 'max',
        value: function max() {
            return this.maxNode(this.root);
        }
    }, {
        key: 'maxNode',
        value: function maxNode(node) {
            var current = node;
            while (current != null && current.right != null) {
                // {5} 
                current = current.right;
            }
            return current;
        }
        // 搜索某个值

    }, {
        key: 'search',
        value: function search(key) {
            return this.searchNode(this.root, key);
        }
    }, {
        key: 'searchNode',
        value: function searchNode(node, key) {
            if (node == null) {
                return false;
            }
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                return this.searchNode(node.left, key);
            } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                return this.searchNode(node.right, key);
            } else {
                return true;
            }
        }
        // 移除一个节点

    }, {
        key: 'removeNode',
        value: function removeNode(node, key) {
            if (node == null) {
                return null;
            }
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                node.left = thos.removeNode(node.left, key);
                return node;
            } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                node.right = this.removeNode(node.right, key);
                return node;
            } else {
                // 键等于node.key
                // 第一种情况
                if (node.left == null && node.right == null) {
                    node = null;
                    return node;
                }
                // 第二种情况
                if (node.left == null) {
                    node = node.right;
                    return node;
                } else if (node.right == null) {
                    node = node.left;
                    return node;
                }
                // 第三种情况
                var aux = this.minNode(node.right);
                node.key = aux.key;
                node.right = this.removeNode(node.right, aux.key);
                return node;
            }
        }
    }]);

    return BinarySearchTree;
}();

// 自平衡树


var AVLTree = function (_BinarySearchTree) {
    _inherits(AVLTree, _BinarySearchTree);

    function AVLTree() {
        var compareFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCompare;

        _classCallCheck(this, AVLTree);

        var _this = _possibleConstructorReturn(this, (AVLTree.__proto__ || Object.getPrototypeOf(AVLTree)).call(this, compareFn));

        _this.compareFn = compareFn;
        _this.root = null;
        return _this;
    }

    _createClass(AVLTree, [{
        key: 'getNodeHeight',
        value: function getNodeHeight(node) {
            if (node == null) {
                return -1;
            }
            return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
        }
    }, {
        key: 'getBalanceFactor',
        value: function getBalanceFactor(node) {
            var heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
            switch (heightDifference) {
                case -2:
                    return BalanceFactor.UNBALANCED_RIGHT;
                case -1:
                    return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
                case 1:
                    return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
                case 2:
                    return BalanceFactor.UNBALANCED_LEFT;
                default:
                    return BalanceFactor.BALANCED;
            }
        }
        // 左-左：向右单旋转

    }, {
        key: 'rotationLL',
        value: function rotationLL(node) {
            var tmp = node.left;
            node.left = tmp.right;
            tmp.right = node;
            return tmp;
        }
        // 右-右：向左的单旋转

    }, {
        key: 'rotationRR',
        value: function rotationRR(node) {
            var tmp = node.right;
            node.right = tmp.left;
            tmp.left = node;
            return tmp;
        }
        // 左-右： 向右双旋转

    }, {
        key: 'rotationLR',
        value: function rotationLR(node) {
            node.left = this.rotationRR(node.left);
            return this.rotationLL(node);
        }
        // 右-左： 向左双旋转

    }, {
        key: 'rotationRL',
        value: function rotationRL(node) {
            node.right = this.rotationLL(node.right);
            return this.rotationRR(node);
        }
        // 插入节点

    }, {
        key: 'insert',
        value: function insert(key) {
            this.root = this.insertNode(this.root, key);
        }
        // 插入节点实现方法

    }, {
        key: 'insertNode',
        value: function insertNode(node, key) {
            if (node == null) {
                return new Node(key);
            } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                node.left = this.insertNode(node.left, key);
            } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                node.right = this.insertNode(node.right, key);
            } else {
                return node; // 重复的键
            }
            // 如果需要，将树进行平衡操作
            var balanceFactor = this.getBalanceFactor(node);
            if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
                if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                    node = this.rotationLL(node);
                } else {
                    return this.rotationLR(node);
                }
            }
            if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
                if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                    node = this.rotationRR(node);
                } else {
                    return this.rotationRL(node);
                }
            }
            return node;
        }
        // 移除节点

    }, {
        key: 'remove',
        value: function remove(key) {
            this.removeNode(this.root, key);
        }
        // 移除节点实现方法

    }, {
        key: 'removeNode',
        value: function removeNode(node, key) {
            node = _get(AVLTree.prototype.__proto__ || Object.getPrototypeOf(AVLTree.prototype), 'removeNode', this).call(this, node, key);
            if (node == null) {
                return node; // null, 不需要进行平衡
            }
            // 检测树是否平衡
            var balanceFactor = this.getBalanceFactor(node);
            if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
                var balanceFactorLeft = this.getBalanceFactor(node.left);
                if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                    return this.rotationLL(node);
                }
                if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                    return this.rotationLR(node.left);
                }
            }
            if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
                var BalanceFactorRight = this.getBalanceFactor(node.right);
                if (BalanceFactorRight === BalanceFactor.BALANCED || BalanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                    return this.rotationRR(node);
                }
                if (BalanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                    return this.rotationRL(node.right);
                }
            }
            return node;
        }
    }]);

    return AVLTree;
}(BinarySearchTree);

// 红黑树


var Colors = {
    RED: 'red',
    BLACK: 'black'
};

var RedBlackNode = function (_Node) {
    _inherits(RedBlackNode, _Node);

    function RedBlackNode(key) {
        _classCallCheck(this, RedBlackNode);

        var _this2 = _possibleConstructorReturn(this, (RedBlackNode.__proto__ || Object.getPrototypeOf(RedBlackNode)).call(this, key));

        _this2.key = key;
        _this2.color = Colors.RED;
        _this2.parent = null;
        return _this2;
    }

    _createClass(RedBlackNode, [{
        key: 'isRed',
        value: function isRed() {
            return this.color === Colors.RED;
        }
    }]);

    return RedBlackNode;
}(Node);

var RedBlackTree = function (_BinarySearchTree2) {
    _inherits(RedBlackTree, _BinarySearchTree2);

    function RedBlackTree() {
        var compareFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCompare;

        _classCallCheck(this, RedBlackTree);

        var _this3 = _possibleConstructorReturn(this, (RedBlackTree.__proto__ || Object.getPrototypeOf(RedBlackTree)).call(this, compareFn));

        _this3.compareFn = compareFn;
        _this3.root = null;
        return _this3;
    }

    _createClass(RedBlackTree, [{
        key: 'insert',
        value: function insert(key) {
            if (this.root == null) {
                this.root = new RedBlackNode(key);
                this.root.color = Colors.BLACK;
            } else {
                var newNode = this.insertNode(this.root, key);
                this.fixTreeProperties(newNode);
            }
        }
    }, {
        key: 'insertNode',
        value: function insertNode(node, key) {
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                if (node.left == null) {
                    node.left = new RedBlackNode(key);
                    node.left.parent = node;
                } else {
                    return this.insertNode(node.left, key);
                }
            } else if (node.right == null) {
                node.right = new RedBlackNode(key);
                node.right.parent = node;
                return node.right;
            } else {
                return this.insertNode(node.right, key);
            }
        }
    }, {
        key: 'fixTreeProperties',
        value: function fixTreeProperties(node) {
            while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
                var parent = node.parent;
                var grandParent = parent.parent;
                // 情形A：父节点是左侧节点
                if (grandParent && grandParent.left === parent) {
                    var uncle = grandParent.right;
                    // 情形1A:叔节点也是红色——只需要重新填色
                    if (uncle && uncle.color === Colors.RED) {
                        grandParent.color = Colors.RED;
                        parent.color = Colors.BLACK;
                        uncle.color = Colors.BLACK;
                        node = grandParent;
                    } else {
                        // 情形2A: 节点是右侧节点——左旋转
                        if (node === parent.right) {
                            this.rotationRR(parent);
                            node = parent;
                            parent = node.parent;
                        }
                        // 情形3A：节点是左侧子节点——右旋转
                        if (node === parent.left) {
                            this.rotationLL(grandParent);
                            parent.color = Colors.BLACK;
                            grandParent.color = Colors.RED;
                            node.parent;
                        }
                    }
                } else {
                    // 情形B: 父节点是右侧子节点
                    var _uncle = grandParent.left;
                    // 情形1B：叔节点是红色——只需要重新填色
                    if (_uncle && _uncle.color === Colors.RED) {
                        grandParent.color = Colors.RED;
                        parent.color = Colors.BLACK;
                        _uncle.color = Colors.BLACK;
                        node = grandParent;
                    } else {
                        // 情形 2B：节点是左侧子节点——左旋转
                        if (node === parent.left) {
                            this.rotationLL(parent); // {19} 
                            node = parent;
                            parent = node.parent;
                        }
                        // 情形 3B：节点是右侧子节点——左旋转
                        this.rotationRR(grandParent); // {20} 
                        parent.color = Colors.BLACK;
                        grandParent.color = Colors.RED;
                        node = parent;
                    }
                }
            }
        }
    }, {
        key: 'rotationLL',
        value: function rotationLL(node) {
            var tmp = node.left;
            node.left = tmp.right;
            if (tmp.right && tmp.right.key) {
                tmp.right.parent = node;
            }
            tmp.parent = node.parent;
            if (!node.parent) {
                this.root = tmp;
            } else {
                if (node === node.parent.left) {
                    node.parent.left = tmp;
                } else {
                    node.parent.right = tmp;
                }
            }
            tmp.right = node;
            node.parent = tmp;
        }
    }, {
        key: 'rotationRR',
        value: function rotationRR(node) {
            var tmp = node.right;
            node.right = tmp.left;
            if (tmp.left && tmp.left.key) {
                tmp.left.parent = node;
            }
            tmp.parent = node.parent;
            if (!node.parent) {
                this.root = tmp;
            } else {
                if (node === node.parent.left) {
                    node.parent.left = tmp;
                } else {
                    node.parent.right = tmp;
                }
            }
            tmp.left = node;
            node.parent = tmp;
        }
    }]);

    return RedBlackTree;
}(BinarySearchTree);

console.log('====================================');

console.log('====================================');