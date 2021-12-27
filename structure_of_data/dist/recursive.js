"use strict";

function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function fibonacciIterative(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    var arr = [];
    var fib1 = 0;
    var fib2 = 1;
    var fib = n;
    arr.push(fib2);
    for (var i = 2; i <= n; i++) {
        fib = fib1 + fib2;
        arr.push(fib);
        fib1 = fib2;
        fib2 = fib;
    }
    console.log(arr);
    return fib;
}

function fibonacci(n) {
    if (n < 1) return 0; // {1} 
    if (n <= 2) return 1; // {2}
    return fibonacci(n - 1) + fibonacci(n - 2); // {3} 
}

function fibonacciMemoization(n) {
    var memo = [0, 1]; // {1} 
    var fibonacci = function fibonacci(n) {
        if (memo[n] != null) return memo[n]; // {2} 
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); // {3} 
    };
    return fibonacci(n);
}

console.log(fibonacciMemoization(55));