/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

function playPauseVideo() {
  let videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.muted = true;
    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio !== 1 && !video.paused) {
                video.pause();
              } else if (video.paused) {
                video.play();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(video);
      });
    }
  });
}

playPauseVideo();
