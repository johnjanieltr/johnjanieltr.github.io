import printSmallCards from "./printSmallCards.js";
import searchDataset from "./searchDataset.js";
import { activeArrowDown, disableArrowDown } from "./toggleArrowDown.js";
import toggleModal from "./toggleModal.js";

document.addEventListener("DOMContentLoaded", printSmallCards);

document.addEventListener("scroll", () => {
  window.scrollY < 115 ? activeArrowDown() : disableArrowDown();
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#modal-container")) toggleModal();
  if (e.target.matches(".header__btn") || e.target.matches(".header__btn *"))
    toggleNavMenu();
  if (e.target.matches(".nav-menu__li") || e.target.matches(".nav-menu__li *"))
    toggleNavMenu();
  if (e.target.matches(".small-card") || e.target.matches(".small-card *"))
    toggleModal(searchDataset(e.target).id);
});
