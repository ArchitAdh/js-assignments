//UI Elements
const btnGroup = document.querySelector(".btn-group");
const bTime = document.querySelector(".btn-time");
const bHeart = document.querySelector(".btn-heart");
const watchImg = document.querySelector(".watch img");
const clock = document.querySelector(".watch-time");
const heart = document.querySelector(".watch-heart");

//change band color
btnGroup.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-black")) {
    watchImg.src = "img/blackWatch.png";
  }
  if (e.target.classList.contains("btn-red")) {
    watchImg.src = "img/redWatch.png";
  }
  if (e.target.classList.contains("btn-blue")) {
    watchImg.src = "img/blueWatch.png";
  }
  if (e.target.classList.contains("btn-purple")) {
    watchImg.src = "img/purpleWatch.png";
  }
  if (e.target.classList.contains("btn-pink")) {
    watchImg.src = "img/pinkWatch.png";
  }
});

//show time
function showTime() {
  var date = new Date();
  // console.log(date);
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  // console.log(time);

  //adding decimal where necessary

  h = h < 10 ? "0" + h : h;

  s = s < 10 ? "0" + s : s;

  m = m < 10 ? "0" + m : m;

  const time = h + ":" + m + ":" + s;

  //put time in clock div
  clock.textContent = time;

  //run showTime function every second
  setTimeout(showTime, 1000);
}
showTime();

//display heart
bHeart.addEventListener("click", () => {
  clock.style.display = "none";
  heart.style.display = "block";
});

// display time
bTime.addEventListener("click", () => {
  clock.style.display = "block";
  heart.style.display = "none";
});
