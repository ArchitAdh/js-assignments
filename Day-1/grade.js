//Conditional Statement - Find and print the grades of the students

function grade(marks) {
  let p = marks / 10;
  switch (true) {
    case p < 0:
      console.log("Marks cannot be less than zero");
      break;
    case p < 40:
      console.log(`${p}% : Fail`);
      break;
    case p < 50:
      console.log(`${p}% : Third Division`);
      break;
    case p < 60:
      console.log(`${p}% : Second Division`);
      break;
    case p < 80:
      console.log(`${p}% : First Division`);
      break;
    case p <= 100:
      console.log(`${p}% : Distinction`);
      break;
    default:
      console.log("Marks cannot be more than 1000");
  }
}

//Enter Marks | Range: 0 to 1000
grade(499);
