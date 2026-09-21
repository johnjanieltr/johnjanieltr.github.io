import { experience, personalProjects } from "./cardsInfo.js";


const printCards = () => {
  printExperienceCards();
  printProjectsCards();
};

const printExperienceCards = () => {
  const $experienceCards = document.getElementById("experience-cards");
  const fragment = document.createDocumentFragment();
  const info = experience.reverse();

  info.forEach((el) => {
    const $article = document.createElement("article");
    $article.classList.add("card");
    // $article.setAttribute("data-id", el.id);
    $article.innerHTML = `
      <div class="card__img-container">
        <img
          class="card__img"
          alt="${el.title}"
          src="${el.imgSrc}"
        />
      </div>
      <footer class="card__footer">
        <h3 class="card__title">${el.title}</h3>
      </footer>
      <!-- <button type="button" class="btn btn--card">
        <span class="btn__text">Más info</span>
        <img
          src="./assets/icons/arrow-right.svg"
          alt="arrow-right"
          class="btn__icon"
        />
      </button> -->
    `;
    fragment.appendChild($article);
  });
  $experienceCards.appendChild(fragment);
};

const printProjectsCards = () => {
  const $projectsCards = document.getElementById("projects-cards");
  const fragment = document.createDocumentFragment();
  const info = personalProjects.reverse();

  info.forEach((el) => {
    const $article = document.createElement("article");
    $article.classList.add("card");
    // $article.setAttribute("data-id", el.id);
    $article.innerHTML = `
      <div class="card__img-container">
        <img
          class="card__img"
          alt="${el.title}"
          src="${el.imgSrc}"
        />
      </div>
      <footer class="card__footer">
        <h3 class="card__title">${el.title}</h3>
      </footer>
      <!-- <button type="button" class="btn btn--card">
        <span class="btn__text">Más info</span>
        <img
          src="./assets/icons/arrow-right.svg"
          alt="arrow-right"
          class="btn__icon"
        />
      </button> -->
    `;
    fragment.appendChild($article);
  });
  $projectsCards.appendChild(fragment);
};

export default printCards;