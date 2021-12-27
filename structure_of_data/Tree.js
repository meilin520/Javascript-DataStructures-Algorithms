const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// 二叉树
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback); // 左节点进行到底
            callback(node.key); // 父节点
            this.inOrderTraverseNode(node.right, callback); // 左节点进行到底
        }
    }
    // 先序遍历
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    // 后序遍历
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    // 搜索最小值
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) { // {2} 
            current = current.left; // {3} 
        }
        return current; // {4} 
    }
    // 搜索最大值 
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) { // {5} 
            current = current.right;
        }
        return current;
    }
    // 搜索某个值
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
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
    removeNode(node, key) {
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
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}

// 自平衡树
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
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
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    // 右-右：向左的单旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    // 左-右： 向右双旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    // 右-左： 向左双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    // 插入节点
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    // 插入节点实现方法
    insertNode(node, key) {
        if (node == null) {
            return new Node(key)
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node; // 重复的键
        }
        // 如果需要，将树进行平衡操作
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node)
            } else {
                return this.rotationRL(node)
            }
        }
        return node;
    }
    // 移除节点
    remove(key) {
        this.removeNode(this.root, key)
    }
    // 移除节点实现方法
    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (node == null) {
            return node; // null, 不需要进行平衡
        }
        // 检测树是否平衡
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node);
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const BalanceFactorRight = this.getBalanceFactor(node.right);
            if (BalanceFactorRight === BalanceFactor.BALANCED || BalanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            }
            if (BalanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}

// 红黑树
const Colors = {
    RED: 'red',
    BLACK: 'black'
}

class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed() {
        return this.color === Colors.RED;
    }
}
class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
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
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent;
            // 情形A：父节点是左侧节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right;
                // 情形1A:叔节点也是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形2A: 节点是右侧节点——左旋转
                    if (node === parent.right) {
                        this.rotationRR(parent)
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
            } else { // 情形B: 父节点是右侧子节点
                const uncle = grandParent.left;
                // 情形1B：叔节点是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
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
    rotationLL(node) {
        const tmp = node.left;
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
    rotationRR(node) {
        const tmp = node.right;
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
}

console.log('====================================');

console.log('====================================');