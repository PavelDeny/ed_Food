function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field,
}) {
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    width = parseInt(window.getComputedStyle(slidesWrapper).width),
    slidesField = document.querySelector(field);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.cssText = `
    width: ${100 * slides.length}%;
    display: flex;
    transition: 0.5s all;
  `;

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => (slide.style.width = `${width}px`));

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function updateCurrentSlide() {
    slides.length < 10
      ? (current.textContent = `0${slideIndex}`)
      : (current.textContent = slideIndex);

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
  }

  function moveSlides() {
    slidesField.style.transform = `translateX(-${offset}px)`;
    updateCurrentSlide();
  }

  next.addEventListener("click", () => {
    if (offset == width * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += width;
    }
    slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;

    moveSlides();
    updateCurrentSlide();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = width * (slides.length - 1);
    } else {
      offset -= width;
    }
    slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;

    moveSlides();
    updateCurrentSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = width * (slideTo - 1);

      moveSlides();
    });
  });
}

export default slider;
