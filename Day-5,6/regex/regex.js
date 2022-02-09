//first name
let pFname = /^[A-Z]{1}[a-z]{2,}$/;
let tFname = ["archit", "Archit", "Jay", "123", "jay", "Venugopalaiyyar"];

//middle name
let pMname = /^[a-zA-z]{1}[a-z]*(\.{1})?$/;
let tMname = ["Bahadur", "bahadur", "Prasad", "pd.", "Pd.", "Bdr....", "233"];

//Last name
let pLname = /^[A-Z]{1}([A-Z]{1})?[a-z]*$/;
let tLname = ["adhikari", "Adhikari", "123", "a", "Kc", "KC"];

//Phone Number
let pNumber = /^(\+?977)?(\s|-)?[\d]{10}$/;
let tNumber = [
  "977 9812345678",
  "+977 9812345678",
  "+977-9812345678",
  "9779812345678",
  "+9779812345678",
  "9812345678",
  "+9812345678",
  "+977",
  "981234567891011",
  "+977981234567891044",
];

//Zip code
let pZip = /^[\d]{5}(-[\d]{4})?$/;
let tZip = ["12345", "12345-6789", "1234567889", "123456", "12345-678910"];

//validate function
function validate(pattern, testArray) {
  for (let string of testArray) {
    console.log(string + " => " + pattern.test(string));
  }
  console.log("\n");
}

validate(pFname, tFname);
validate(pMname, tMname);
validate(pLname, tLname);
validate(pNumber, tNumber);
validate(pZip, tZip);
