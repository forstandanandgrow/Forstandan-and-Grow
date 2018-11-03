var rellax = new Rellax(".rellax");

const elementsTag = document.querySelectorAll(
  ".hero-content, .what-we-do-content, .our-clients-content, .how-we-work, .get-in-touch-content"
);

// const animatedTags = document.querySelectorAll("h2, h3, p, section img, a.button")

//fade out on load
elementsTag.forEach(tag => {
  tag.style.opacity = 0;
});
const fadeIn = function() {
  // look through all the animated tags and see
  // with getBoundClientRect if it's in the window
  let delay = 0.25;

  elementsTag.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top;
    const tagBottom = tag.getBoundingClientRect().bottom;

    if (tagTop < window.innerHeight && tagBottom > 0) {
      tag.style.animation = `fadein 1s ${delay}s both`;
      delay = delay + 0.2;
    }
  });
};

//onLoad run fadeIn
fadeIn();

document.addEventListener("scroll", function() {
  fadeIn();
});

//on browser resize, run fadeIn
window.addEventListener("resize", function() {
  fadeIn();
});
