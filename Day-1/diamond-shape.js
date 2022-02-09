// Program to print diamond shape in terminal

function shape(n) {
  let pattern = "";
  // Upside pyramid

  for (let i = 1; i <= n; i++) {
    // printing spaces
    for (let j = n; j > i; j--) {
      pattern += " ";
    }

    // printing star
    for (let k = 0; k < i * 2 - 1; k++) {
      pattern += "*";
    }

    pattern += "\n";
  }

  // downside pyramid
  for (let i = 1; i <= n - 1; i++) {
    // printing spaces
    for (let j = 0; j < i; j++) {
      pattern += " ";
    }
    // printing star
    for (let k = (n - i) * 2 - 1; k > 0; k--) {
      pattern += "*";
    }
    pattern += "\n";
  }
  console.log(pattern);
}

//Enter now of rows here (n + n-1)
shape(4);
