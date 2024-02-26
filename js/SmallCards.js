const $cardSmallContainer = document.getElementById("small-cards-container");

export const personalProjects = [
  {
    id: 1,
    title: "Simpletodolist",
    imgSrc: "./assets/images/simpletodolist.png",
    githubLink: "https://github.com/johnjanieltr/simpletodolist",
    projectLink: "https://johnjanieltr.github.io/simpletodolist",
    description: "Aplicación de lista de tareas simple",
    technologies: ["html", "sass", "javascript"],
  },
  {
    id: 2,
    title: "Manage landing page",
    imgSrc: "./assets/images/manage.png",
    githubLink: "https://github.com/johnjanieltr/manage-landing-page",
    projectLink: "https://johnjanieltr.github.io/manage-landing-page",
    description: "Solución a desafío de código de Frontend Mentor",
    technologies: ["html", "css", "javascript"],
  },
  {
    id: 3,
    title: "Rock, Paper, Scissors",
    imgSrc: "./assets/images/rock-paper-scissors-game.png",
    githubLink: "https://github.com/johnjanieltr/rock-paper-scissors-game",
    projectLink: "https://johnjanieltr.github.io/rock-paper-scissors-game",
    description: "Solución a desafío de código de Frontend Mentor",
    technologies: ["html", "css", "javascript"],
  },
];

export const printCardsSmall = () => {
  const fragment = document.createDocumentFragment();
  personalProjects.forEach((el) => {
    const $article = document.createElement("article");
    $article.classList.add("small-card");
    $article.innerHTML = `
      <div class="small-card__img-contain">
        <img
          class="small-card__img"
          alt="${el.title}"
          src="${el.imgSrc}"
        />
      </div>
      <footer class="small-card__footer">
        <h3 class="small-card__title">${el.title}</h3>
      </footer>
      <button type="button" class="btn btn--small-card" data-id="${el.id}">
        <span class="btn__span">Más info</span>
        <img src="./assets/icons/arrow-right.svg"
        alt="arrow-right"
        class="btn__icon"
        />
      </button>
    `;
    fragment.appendChild($article);
  });
  $cardSmallContainer.appendChild(fragment);
};
