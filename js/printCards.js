import { experience, personalProjects } from "./cardsInfo.js";
import { ICONS, renderTags } from "./templates.js";
import { t, tr } from "./i18n.js";

const MAX_TAGS = 4;

// Se vuelve a llamar al cambiar de idioma, por eso cada render reemplaza el contenido anterior.
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
        <img class="card__img" alt="${tr(el.title)}" src="${el.imgSrc}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3 class="card__title">${tr(el.title)}</h3>
        ${el.role ? `<p class="card__role">${tr(el.role)}</p>` : ""}
        ${renderTags(el.technologies, featured ? Infinity : MAX_TAGS)}
        <button type="button" class="card__cta" aria-haspopup="dialog">
          ${t("cards.cta")} ${ICONS.arrowRight}
        </button>
      </div>
    `;
    fragment.appendChild($article);
  });
  $container.replaceChildren(fragment);
};

export default printCards;
