import { personalProjects } from "./projects.js";

const $cardSmallContainer = document.getElementById("small-cards-container");

const printSmallCards = () => {
  const fragment = document.createDocumentFragment();
  const personalProjectsList = personalProjects.reverse();

  personalProjectsList.forEach((el) => {
    const $article = document.createElement("article");
    $article.classList.add("small-card");
    $article.setAttribute("data-id", el.id);
    $article.innerHTML = `
      <div class="small-card__img-container">
        <img
          class="small-card__img"
          alt="${el.title}"
          src="${el.imgSrc}"
        />
      </div>
      <footer class="small-card__footer">
        <h3 class="small-card__title">${el.title}</h3>
      </footer>
      <button type="button" class="btn btn--small-card">
        <span class="btn__text">Más info</span>
        <img
          src="./assets/icons/arrow-right.svg"
          alt="arrow-right"
          class="btn__icon"
        />
      </button>
    `;
    fragment.appendChild($article);
  });
  $cardSmallContainer.appendChild(fragment);
};

export default printSmallCards;
