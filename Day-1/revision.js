/**
 * @param {Array} arr The input array
 * @param {Number} n The number of parts to distribute
 *
 *
 *  https://www.geeksforgeeks.org/all-unique-combinations-whose-sum-equals-to-k/
 */

function distribute(arr, n = 3) {
  if (!Array.isArray(arr)) {
    console.log("The input must be an array.");
    return;
  }

  let sum = 0;

  arr.forEach((element) => {
    sum += element;
  });

  if (sum % n === 0) {
    const k = sum / n;

    displayNArrays(arr, k);

    return;
  }

  console.log("The array cannot be distributed.");
}

function displayNArrays(arr, k) {
  const arrayClone = [...arr];

  arrayClone.sort((a, b) => a - b);

  let localArray = []; // To store part that has sum n / 3
  findPart(0, 0, k, localArray, arrayClone);
}

function findPart(lowerIndex, partialSum, requiredSum, localArray, arr) {
  if (partialSum === requiredSum) {
    printThePart(localArray);

    return;
  }

  for (let i = lowerIndex; i < arr.length; i++) {
    // Check if sum exceeds required sum
    if (partialSum + arr[i] > requiredSum) {
      continue;
    }

    // check if it is repeated or not
    if (i > lowerIndex && arr[i] === arr[i - 1]) {
      continue;
    }

    localArray.push(arr[i]);
    findPart(i + 1, partialSum + arr[i], requiredSum, localArray, arr);
    localArray.pop();
  }
}

function printThePart(localArray) {
  let output = "{";

  output = output + localArray.join(",");
  output = output + "}";

  console.log(output);
}

const inputArray = [1, 2, 3, 4, 5];

console.log("Input Array", inputArray);
distribute(inputArray);

const inputArray2 = [1, 2, 3, 4];
console.log("Input Array", inputArray2);
distribute(inputArray2);

const inputArray3 = [1, 1, 1, 2, 3, 4];
console.log("Input Array", inputArray3);
distribute(inputArray3);
