import { arrowDownHidden } from "./ArrowDown.js";
import { changeColorHeader } from "./Header.js";
import { printCardsSmall } from "./SmallCards.js";
import { searchDataset } from "./searchDataset.js";
import { toggleModal } from "./Modal.js";
import { toggleNavMenu } from "./NavMenu.js";

const ua = navigator.userAgent;
const $heroSection = document.getElementById("hero-section");
const $navMenu = document.getElementById("nav-menu");
const $arrowDown = document.getElementById("arrow-down");

document.addEventListener("DOMContentLoaded", () => {
  printCardsSmall();

  if (ua.match(/android/i) || ua.match(/iphone|ipad|ipod/i))
    $arrowDown.classList.add("arrow-down--mobile");

  if (!(window.scrollY > $heroSection.clientHeight / 2))
    $arrowDown.classList.add("arrow-down--is-active");
});

document.addEventListener("scroll", () => {
  arrowDownHidden();
  $navMenu.classList.remove("nav-menu--is-active");

  window.matchMedia("(min-width: 480px)").matches
    ? changeColorHeader("desktop")
    : changeColorHeader("mobile");
});

document.addEventListener("click", (e) => {
  // click in header title
  if (e.target.matches("#header-title")) window.scroll(0, 0);
  // click in menu btn
  if (e.target.matches("#menu-btn") || e.target.matches("#menu-btn *"))
    toggleNavMenu();
  // click in nav menu lis
  if (e.target.matches(".nav-menu__li") || e.target.matches(".nav-menu__li *"))
    toggleNavMenu();
  // click in btn of small cards
  if (
    e.target.matches(".btn--small-card") ||
    e.target.matches(".btn--small-card *")
  ) {
    toggleModal(searchDataset(e.target).id);
  }
  // click in modal container (close modal)
  if (
    e.target.matches("#modal-container") ||
    e.target.matches("#modal-container *")
  ) {
    toggleModal();
  }
});
