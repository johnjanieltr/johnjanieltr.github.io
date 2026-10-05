import { findItem } from "./cardsInfo.js";
import { ICONS, renderTags } from "./templates.js";
import { renderCarousel, initCarousel } from "./carousel.js";
import { openViewer, isViewerOpen } from "./viewer.js";

const $body = document.body,
  $modalContainer = document.getElementById("modal-container");

const TRANSITION_MS = 250;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

let $lastTrigger = null;
let currentItem = null;
let carousel = null;
let hideTimeout = null;

const renderLinks = ({ live, repo }) => {
  if (!live && !repo) return "";
  return `
    <div class="modal__links">
      ${
        live
          ? `<a href="${live}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
              Ver proyecto ${ICONS.external}
            </a>`
          : ""
      }
      ${
        repo
          ? `<a href="${repo}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
              <img src="./assets/icons/github-light.svg" alt="" class="btn__img" />
              Ver repositorio
            </a>`
          : ""
      }
    </div>
  `;
};

const renderAutomations = (automations = []) => {
  if (!automations.length) return "";
  return `
    <section class="automations">
      <h3 class="modal__subtitle">Automatizaciones</h3>
      <ul class="automations__list">
        ${automations
          .map(
            (a, i) => `
          <li>
            <button type="button" class="automation" data-automation="${i}" aria-haspopup="dialog">
              <img class="automation__thumb" src="${a.thumb}" alt="" loading="lazy" />
              <span class="automation__info">
                <span class="automation__title">${a.title}</span>
                <span class="automation__description">${a.description}</span>
                <span class="automation__meta">
                  ${a.images.length} ${a.images.length === 1 ? "captura" : "capturas"}
                  <span class="automation__cta">Ver ${ICONS.arrowRight}</span>
                </span>
              </span>
            </button>
          </li>`
          )
          .join("")}
      </ul>
    </section>
  `;
};

// Arriba: carrusel si hay screenshots; si no, la imagen de la card como portada.
// Con automatizaciones no se muestra portada (el logo ya está en la card y así el modal es más corto).
const renderMedia = (item) => {
  if (item.screenshots.length) return renderCarousel(item.screenshots);
  if (item.automations?.length) return "";
  return `<div class="modal__cover"><img src="${item.imgSrc}" alt="${item.title}" /></div>`;
};

const renderModal = (item) => {
  const media = renderMedia(item);
  return `
  <div class="modal ${media ? "" : "modal--no-media"}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <button type="button" class="modal__close" aria-label="Cerrar" data-close>
      ${ICONS.close}
    </button>
    ${media}
    <div class="modal__body">
      <header>
        <h2 class="modal__title" id="modal-title">${item.title}</h2>
        ${item.role ? `<p class="modal__role">${item.role}</p>` : ""}
      </header>
      ${
        item.highlights.length
          ? `<ul class="modal__highlights">${item.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
          : ""
      }
      ${renderTags(item.technologies)}
      ${renderAutomations(item.automations)}
      ${renderLinks(item.links)}
    </div>
  </div>
`;
};

const trapFocus = (e) => {
  const $focusables = [...$modalContainer.querySelectorAll(FOCUSABLE)];
  const $first = $focusables[0];
  const $last = $focusables[$focusables.length - 1];

  if (e.shiftKey && document.activeElement === $first) {
    e.preventDefault();
    $last.focus();
  } else if (!e.shiftKey && document.activeElement === $last) {
    e.preventDefault();
    $first.focus();
  }
};

const handleKeydown = (e) => {
  if (isViewerOpen()) return; // el visor maneja el teclado mientras está abierto
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") trapFocus(e);
  if (e.key === "ArrowLeft") carousel?.prev();
  if (e.key === "ArrowRight") carousel?.next();
};

const handleClick = (e) => {
  const $automation = e.target.closest("[data-automation]");
  if ($automation) {
    openViewer(currentItem.automations[$automation.dataset.automation], $automation);
    return;
  }
  // Cierra con la X o al hacer clic en el fondo (fuera del modal)
  if (e.target === $modalContainer || e.target.closest("[data-close]")) closeModal();
};

export const openModal = (id, $trigger) => {
  const item = findItem(id);
  if (!item) return;

  clearTimeout(hideTimeout);
  $lastTrigger = $trigger;
  currentItem = item;
  $modalContainer.innerHTML = renderModal(item);

  const $carousel = $modalContainer.querySelector(".carousel");
  carousel = $carousel ? initCarousel($carousel) : null;

  $modalContainer.classList.remove("hidden");
  $body.style.overflow = "hidden";
  document.addEventListener("keydown", handleKeydown);
  $modalContainer.addEventListener("click", handleClick);

  // Un frame después para que la transición de opacidad se ejecute
  requestAnimationFrame(() => {
    $modalContainer.classList.add("modal-container--is-active");
    $modalContainer.querySelector(".modal__close").focus();
  });
};

export const closeModal = () => {
  $modalContainer.classList.remove("modal-container--is-active");
  $body.style.overflow = "";
  document.removeEventListener("keydown", handleKeydown);
  $modalContainer.removeEventListener("click", handleClick);
  carousel = null;

  hideTimeout = setTimeout(() => {
    $modalContainer.classList.add("hidden");
    $modalContainer.innerHTML = "";
  }, TRANSITION_MS);

  $lastTrigger?.focus();
};
