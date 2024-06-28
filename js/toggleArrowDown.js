const $arrowDown = document.getElementById("arrow-down");

export const activeArrowDown = () => {
  if (!$arrowDown.classList.contains("arrow-down--is-active")) {
    $arrowDown.classList.remove("hidden");
    setTimeout(() => $arrowDown.classList.add("arrow-down--is-active"), 2500);
  }
};

export const disableArrowDown = () => {
  if ($arrowDown.classList.contains("arrow-down--is-active")) {
    $arrowDown.classList.remove("arrow-down--is-active");
    setTimeout(() => $arrowDown.classList.add("hidden"), 700);
  }
};
