import { activeArrowDown, disableArrowDown } from "./Components/ArrowDown.js";
import changeColorHeader from "./Components/Header.js";
import toggleModal from "./Components/Modal.js";
import toggleNavMenu from "./Components/NavMenu.js";
import { printCardsSmall } from "./Components/SmallCards.js";
import searchDataset from "./searchDataset.js";

const $navMenu = document.getElementById("nav-menu");

document.addEventListener("DOMContentLoaded", () => {
  printCardsSmall();
  window.scrollY < 115 ? activeArrowDown() : disableArrowDown();
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 115) disableArrowDown();
  $navMenu.classList.remove("nav-menu--is-active");

  window.matchMedia("(min-width: 480px)").matches
    ? changeColorHeader("desktop")
    : changeColorHeader("mobile");
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#header-title")) window.scroll(0, 0);
  if (e.target.matches("#menu-btn") || e.target.matches("#menu-btn *"))
    toggleNavMenu();
  if (e.target.matches(".nav-menu__li") || e.target.matches(".nav-menu__li *"))
    toggleNavMenu();
  if (e.target.matches(".small-card") || e.target.matches(".small-card *")) {
    toggleModal(searchDataset(e.target).id);
  }
  if (
    e.target.matches("#modal-container") |
    e.target.matches("#modal-container *")
  ) {
    if (e.target.matches("#modal") | e.target.matches("#modal *")) return;
    toggleModal();
  }
});
