class Slider {
  constructor(id = "slider") {
    //needed to bind the function if arrow function was not used in the functions mentioned below
    // this.slideLeft = this.slideLeft.bind(this);
    // this.slideRight = this.slideRight.bind(this);

    this.currentIndex = 0;
    this.slider = document.getElementById(id);

    // inside Slider UI create left and right buttons
    const sliderLeftButton = document.createElement("div");
    const sliderRightButton = document.createElement("div");

    sliderLeftButton.className = "slider-button slider-button--left";
    sliderRightButton.className = "slider-button slider-button--right";

    sliderLeftButton.addEventListener("click", this.slideLeft);
    sliderRightButton.addEventListener("click", this.slideRight);

    const lInner = `
    <i class="fas fa-chevron-left"></i>
    `;
    const rInner = `
    <i class="fas fa-chevron-right"></i>
    `;

    sliderLeftButton.innerHTML = lInner;
    sliderRightButton.innerHTML = rInner;

    this.slider.appendChild(sliderLeftButton);
    this.slider.appendChild(sliderRightButton);
  }

  //CLASS METHODS

  //if done this way, had to bind, because here 'this' represent the object which calls the function , that is the object slider

  // slideRight() {
  //   this.slide(-1);
  // }

  // slideLeft() {
  //   this.slide(1);
  // }

  //using arrow function, 'this' represent the object that owns the function, which is slide left and slide right button, not the slider object
  slideRight = () => {
    this.slide(-1);
  };

  slideLeft = () => {
    this.slide(1);
  };

  //function to create slide mechanism
  slide(slideDirection = -1) {
    //slides div
    // const slideContainer = this.slider.querySelector(".slides");
    const slideContainer = this.slider.querySelector(".slides");

    //each slide inside slides div
    const slides = slideContainer.querySelectorAll(".slide");
    const numOfSlides = slides.length;

    if (numOfSlides === 0) {
      return;
    }

    const nextIndex =
      (this.currentIndex - slideDirection + numOfSlides) % numOfSlides;

    const width = slides[0].width || 55;

    slideContainer.style.left = -width * nextIndex + "vw";

    this.currentIndex = nextIndex;
  }

  getSliderUI = () => this.slider;

  autoplay = () => {
    setInterval(() => {
      this.slide();
    }, 6000);
  };
}

//instantiate slider
const slider = new Slider();
const slideShow = slider.getSliderUI();
slider.autoplay();

//get UI elements
const upload = document.getElementById("pictures");
const uploadButton = document.querySelector(".file-upload-btn");
const addPic = document.getElementById("btn");
const form = document.querySelector("form");

//show number of images uploaded
upload.addEventListener("change", (e) => {
  const numOfImages = e.target.files.length;

  uploadButton.textContent = `${numOfImages} images selected`;
});

//getting images
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = form.title.value;
  const desc = form.desc.value;
  const fileTarget = form.pictures;
  const fileList = fileTarget.files;
  const images = Array.from(fileList);

  images.forEach((image) => {
    //select slide class for current slider instance
    const slider = slideShow.querySelector(".slides");

    //.slide div to contain wrapper and image
    const slide = document.createElement("div");
    slide.className = "slide";

    //slide image
    const imageUI = document.createElement("img");
    imageUI.src = URL.createObjectURL(image);
    imageUI.style.width = "55vw";
    imageUI.style.height = "400px";

    // free memory
    imageUI.onload = function () {
      URL.revokeObjectURL(imageUI.src);
    };

    //wrapper for title and description
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "content-wrapper";
    contentWrapper.innerHTML = `
   <div class="title">${title}</div>
   <div class="description">${desc}</div>
  `;

    //appending in the DOM slider div
    slide.appendChild(imageUI);
    slide.appendChild(contentWrapper);
    slider.appendChild(slide);
  });

  form.reset();
  uploadButton.textContent = "Upload Images";
});
