import { changeColorHeader } from "./Header.js";
import { toggleModal } from "./Modal.js";
import { toggleNavMenu } from "./NavMenu.js";
import { searchDataset } from "./searchDataset.js";
import { printCardsSmall } from "./SmallCards.js";

const $navMenu = document.getElementById("nav-menu");

document.addEventListener("DOMContentLoaded", () => {
  printCardsSmall();

  document.addEventListener("scroll", () => {
    window.matchMedia("(min-width: 480px)").matches
      ? changeColorHeader(false)
      : changeColorHeader(true);

    $navMenu.classList.remove("nav-menu--is-active");
  });

  document.addEventListener("click", (e) => {
    // click in header title
    if (e.target.matches("#header-title")) {
      window.scroll(0, 0);
    }
    // click in menu btn
    if (e.target.matches("#menu-btn") || e.target.matches("#menu-btn *"))
      toggleNavMenu();
    // click in nav menu lis
    if (
      e.target.matches(".nav-menu__li") ||
      e.target.matches(".nav-menu__li *")
    )
      toggleNavMenu();
    // click in btn of small cards
    if (
      e.target.matches(".btn--center") ||
      e.target.matches(".btn--center *")
    ) {
      toggleModal(searchDataset(e.target).id);
    }
    // click in close btn of modal
    if (e.target.matches(".close-btn") || e.target.matches(".close-btn *")) {
      // toggleModal();
    }
    // click in modal container (close modal)
    if (
      e.target.matches("#modal-container") ||
      e.target.matches("#modal-container *")
    ) {
      toggleModal();
    }
  });
});
