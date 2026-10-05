import { ICONS } from "./templates.js";
import { renderCarousel, initCarousel } from "./carousel.js";

// Visor a pantalla completa para las capturas de una automatización.
// Se abre encima del modal y al cerrarse devuelve el foco a la fila que lo abrió.

const $viewer = document.getElementById("viewer");

const TRANSITION_MS = 200;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

let $lastTrigger = null;
let carousel = null;
let hideTimeout = null;
let isOpen = false;

export const isViewerOpen = () => isOpen;

const render = ({ title, description, images }) => `
  <div class="viewer__panel" role="dialog" aria-modal="true" aria-labelledby="viewer-title">
    <header class="viewer__header">
      <h3 class="viewer__title" id="viewer-title">${title}</h3>
      <button type="button" class="modal__close viewer__close" aria-label="Cerrar visor" data-close-viewer>
        ${ICONS.close}
      </button>
    </header>
    ${renderCarousel(images)}
    ${description ? `<p class="viewer__description">${description}</p>` : ""}
  </div>
`;

const trapFocus = (e) => {
  const $focusables = [...$viewer.querySelectorAll(FOCUSABLE)];
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
  if (e.key === "Escape") closeViewer();
  if (e.key === "Tab") trapFocus(e);
  if (e.key === "ArrowLeft") carousel?.prev();
  if (e.key === "ArrowRight") carousel?.next();
};

const handleClick = (e) => {
  if (e.target === $viewer || e.target.closest("[data-close-viewer]")) closeViewer();
};

export const openViewer = (automation, $trigger) => {
  clearTimeout(hideTimeout);
  isOpen = true;
  $lastTrigger = $trigger;
  $viewer.innerHTML = render(automation);
  $viewer.classList.remove("hidden");
  carousel = initCarousel($viewer.querySelector(".carousel"));

  document.addEventListener("keydown", handleKeydown);
  $viewer.addEventListener("click", handleClick);

  requestAnimationFrame(() => {
    $viewer.classList.add("viewer--is-active");
    $viewer.querySelector(".viewer__close").focus();
  });
};

export const closeViewer = () => {
  isOpen = false;
  $viewer.classList.remove("viewer--is-active");
  document.removeEventListener("keydown", handleKeydown);
  $viewer.removeEventListener("click", handleClick);
  carousel = null;

  hideTimeout = setTimeout(() => {
    $viewer.classList.add("hidden");
    $viewer.innerHTML = "";
  }, TRANSITION_MS);

  $lastTrigger?.focus();
};
