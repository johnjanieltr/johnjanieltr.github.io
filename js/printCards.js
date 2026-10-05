import { experience, personalProjects } from "./cardsInfo.js";
import { ICONS, renderTags } from "./templates.js";

const MAX_TAGS = 4;

const printCards = () => {
  renderCards(experience, "experience-cards", { featured: true });
  renderCards(personalProjects, "projects-cards");
};

// featured: card horizontal que muestra todas las tecnologías
const renderCards = (items, containerId, { featured = false } = {}) => {
  const $container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();

  items.forEach((el) => {
    const $article = document.createElement("article");
    $article.className = featured ? "card card--featured" : "card";
    $article.dataset.id = el.id;
    $article.innerHTML = `
      <div class="card__media">
        <img class="card__img" alt="${el.title}" src="${el.imgSrc}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3 class="card__title">${el.title}</h3>
        ${el.role ? `<p class="card__role">${el.role}</p>` : ""}
        ${renderTags(el.technologies, featured ? Infinity : MAX_TAGS)}
        <button type="button" class="card__cta" aria-haspopup="dialog">
          Ver detalles ${ICONS.arrowRight}
        </button>
      </div>
    `;
    fragment.appendChild($article);
  });
  $container.appendChild(fragment);
};

export default printCards;
