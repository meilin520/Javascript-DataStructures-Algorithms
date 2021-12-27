function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    }
    return n * factorial(n - 1)
}

function fibonacciIterative(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    let arr = [];
    let fib1 = 0;
    let fib2 = 1;
    let fib = n;
    arr.push(fib2)
    for (let i = 2; i <= n; i++) {
        fib = fib1 + fib2;
        arr.push(fib)
        fib1 = fib2;
        fib2 = fib;
    }
    console.log(arr)
    return fib;
}

function fibonacci(n) {
    if (n < 1) return 0; // {1} 
    if (n <= 2) return 1; // {2}
    return fibonacci(n - 1) + fibonacci(n - 2); // {3} 
}

function fibonacciMemoization(n) {
    const memo = [0, 1]; // {1} 
    const fibonacci = function(n) {
        if (memo[n] != null) return memo[n]; // {2} 
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); // {3} 
    };
    return fibonacci(n);
}

console.log(fibonacciMemoization(55));