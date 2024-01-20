const $arrowDown = document.getElementById("arrow-down");

export const arrowDownHidden = () => {
  $arrowDown.classList.remove("arrow-down--is-active");
  setTimeout(() => $arrowDown.classList.add("hidden"), 1000);
};
