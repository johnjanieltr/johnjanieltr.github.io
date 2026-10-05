import printCards from "./printCards.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", printCards);

document.addEventListener("click", (e) => {
  const card = e.target.closest("article.card");
  if (!card) return;

  openModal(card.dataset.id, card.querySelector(".card__cta"));
});
