import { ICONS } from "./templates.js";

// El desplazamiento usa scroll-snap, así que el swipe en móvil es nativo.
export const renderCarousel = (screenshots) => {
  const multiple = screenshots.length > 1;

  return `
    <div class="carousel" aria-roledescription="carrusel" aria-label="Capturas">
      <div class="carousel__track">
        ${screenshots
          .map(
            (s, i) => `
          <figure class="carousel__slide" aria-label="${i + 1} de ${screenshots.length}">
            <img src="${s.src}" alt="${s.alt}" loading="lazy" />
            ${s.label ? `<figcaption class="carousel__label">${s.label}</figcaption>` : ""}
          </figure>`
          )
          .join("")}
      </div>
      ${
        multiple
          ? `
        <button type="button" class="carousel__arrow carousel__arrow--prev" aria-label="Anterior">${ICONS.chevronLeft}</button>
        <button type="button" class="carousel__arrow carousel__arrow--next" aria-label="Siguiente">${ICONS.chevronRight}</button>
        <div class="carousel__dots">
          ${screenshots
            .map(
              (_, i) =>
                `<button type="button" class="carousel__dot" aria-label="Ir a la captura ${i + 1}"></button>`
            )
            .join("")}
        </div>`
          : ""
      }
    </div>
  `;
};

export const initCarousel = ($root) => {
  const $track = $root.querySelector(".carousel__track");
  const $slides = [...$root.querySelectorAll(".carousel__slide")];
  const $dots = [...$root.querySelectorAll(".carousel__dot")];
  const $prev = $root.querySelector(".carousel__arrow--prev");
  const $next = $root.querySelector(".carousel__arrow--next");

  // clientWidth es 0 mientras el modal sigue oculto
  const currentIndex = () =>
    $track.clientWidth ? Math.round($track.scrollLeft / $track.clientWidth) : 0;

  const goTo = (index) => {
    const i = Math.max(0, Math.min(index, $slides.length - 1));
    $track.scrollTo({ left: i * $track.clientWidth, behavior: "smooth" });
  };

  const update = () => {
    const i = currentIndex();
    $dots.forEach(($d, n) => $d.setAttribute("aria-current", n === i));
    if ($prev) $prev.disabled = i === 0;
    if ($next) $next.disabled = i === $slides.length - 1;
  };

  $prev?.addEventListener("click", () => goTo(currentIndex() - 1));
  $next?.addEventListener("click", () => goTo(currentIndex() + 1));
  $dots.forEach(($d, i) => $d.addEventListener("click", () => goTo(i)));
  $track.addEventListener("scroll", update, { passive: true });
  update();

  return {
    prev: () => goTo(currentIndex() - 1),
    next: () => goTo(currentIndex() + 1),
  };
};
