function factorial(n) {
  if (n < 0) {
    return "Invalid!! Number should be positive";
  } else if (n === 0) {
    return 1;
  }

  // recursive part
  else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(-1));
