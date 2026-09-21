import printCards from "./printCards.js";
import searchDataset from "./searchDataset.js";
import toggleModal from "./toggleModal.js";

document.addEventListener("DOMContentLoaded", printCards);

document.addEventListener("scroll", () => {
  if (window.scrollY >= 115) {
    const $arrowDown = document.getElementById("arrow-down");
    $arrowDown.classList.remove("arrow-down--is-active");
    setTimeout(() => $arrowDown.classList.add("hidden"), 700);
  }
});

// document.addEventListener("click", (e) => {
//   if (e.target.matches("#modal-container")) toggleModal();
//   if (e.target.matches(".header__btn") || e.target.matches(".header__btn *"))
//     toggleNavMenu();
//   if (e.target.matches(".nav-menu__li") || e.target.matches(".nav-menu__li *"))
//     toggleNavMenu();
//   if (e.target.matches(".small-card") || e.target.matches(".small-card *"))
//     toggleModal(searchDataset(e.target).id);
// });
