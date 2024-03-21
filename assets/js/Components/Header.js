const $header = document.getElementById("header");

const changeColorHeader = (display) => {
  if (display === "mobile") {
    window.scrollY > 17
      ? $header.classList.add("header--change-color")
      : $header.classList.remove("header--change-color");
  }

  if (display === "desktop") {
    let limit = document.getElementById("hero-section").clientHeight;
    window.scrollY > limit + 2
      ? $header.classList.add("header--change-color")
      : $header.classList.remove("header--change-color");
  }
};

export default changeColorHeader;
