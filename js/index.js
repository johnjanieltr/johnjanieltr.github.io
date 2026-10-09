import printCards from "./printCards.js";
import { openModal } from "./modal.js";
import { initI18n, setLang, getLang, t } from "./i18n.js";
import { initAnalytics, track } from "./analytics.js";

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  printCards();
  initAnalytics();
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

const trackLink = ($link) => {
  if ($link.matches("[data-cv]")) return track("cv_click", getLang());
  if ($link.closest("#modal-container")) return track("project_link", $link.href);
  if ($link.href.startsWith("mailto:")) return track("contact_click", "mailto");
  if ($link.href.includes("linkedin.com")) return track("contact_click", "linkedin");
  if ($link.href.includes("github.com")) return track("contact_click", "github");
};

document.addEventListener("click", (e) => {
  const $link = e.target.closest("a[href]");
  if ($link) trackLink($link);

  const $lang = e.target.closest("[data-lang]");
  if ($lang) {
    if ($lang.dataset.lang !== getLang()) track("lang_change", $lang.dataset.lang);
    return setLang($lang.dataset.lang);
  }

  const $copy = e.target.closest("[data-copy]");
  if ($copy) {
    track("copy_email");
    return copyToClipboard($copy);
  }

  const card = e.target.closest("article.card");
  if (!card) return;

  track("card_open", card.dataset.id);
  openModal(card.dataset.id, card.querySelector(".card__cta"));
});
