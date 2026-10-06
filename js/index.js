import printCards from "./printCards.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", printCards);

const copyToClipboard = async ($btn) => {
  const $label = $btn.querySelector("[data-copy-label]");
  const original = ($label.dataset.original ??= $label.textContent);
  try {
    await navigator.clipboard.writeText($btn.dataset.copy);
    $label.textContent = "¡Copiado!";
  } catch {
    $label.textContent = "No se pudo copiar";
  }
  setTimeout(() => ($label.textContent = original), 2000);
};

document.addEventListener("click", (e) => {
  const $copy = e.target.closest("[data-copy]");
  if ($copy) return copyToClipboard($copy);

  const card = e.target.closest("article.card");
  if (!card) return;

  openModal(card.dataset.id, card.querySelector(".card__cta"));
});
