export const changeColorHeader = (display) => {
  // if true the display is mobile and if false the display is desktop
  const $header = document.getElementById("header");
  if (display) {
    window.scrollY > 17
      ? $header.classList.add("header--change-color")
      : $header.classList.remove("header--change-color");
  }

  if (!display) {
    let limit = document.getElementById("hero-section").clientHeight;
    window.scrollY > limit + 2
      ? $header.classList.add("header--change-color")
      : $header.classList.remove("header--change-color");
  }
};
