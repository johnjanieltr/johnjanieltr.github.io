import printCards from "./printCards.js";
import { openModal } from "./modal.js";
import { initI18n, setLang, t } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  printCards();
});
document.addEventListener("langchange", printCards);

const copyToClipboard = async ($btn) => {
  const $label = $btn.querySelector("[data-copy-label]");
  try {
    await navigator.clipboard.writeText($btn.dataset.copy);
    $label.textContent = t("contact.copied");
  } catch {
    $label.textContent = t("contact.copyError");
  }
  setTimeout(() => ($label.textContent = t("contact.copy")), 2000);
};

document.addEventListener("click", (e) => {
  const $lang = e.target.closest("[data-lang]");
  if ($lang) return setLang($lang.dataset.lang);

  const $copy = e.target.closest("[data-copy]");
  if ($copy) return copyToClipboard($copy);

  const card = e.target.closest("article.card");
  if (!card) return;

  openModal(card.dataset.id, card.querySelector(".card__cta"));
});
