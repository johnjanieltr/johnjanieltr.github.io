const $cardSmallContainer = document.getElementById("cards-small-container");

export const personalProjects = [
  {
    id: 1,
    title: "Simpletodolist",
    imgSrc: "./assets/images/simpletodolist.png",
    githubLink: "https://github.com/johnjanieltr/simpletodolist",
    projectLink: "https://johnjanieltr.github.io/simpletodolist",
    description: "Aplicacion de lista de tareas simple",
    tecnologys: ["html", "sass", "javascript"],
  },
];

export const printCardsSmall = () => {
  const $fragment = document.createDocumentFragment();

  personalProjects.forEach((el) => {
    const $article = document.createElement("article");
    $article.classList.add("card-small");
    $article.innerHTML = `
      <div class="card-small__img-contain">
        <img
          class="card-small__img"
          alt="${el.title}"
          src="${el.imgSrc}"
        />
      </div>
      <footer class="card-small__footer">
        <h3 class="card-small__title">${el.title}</h3>
      </footer>
      <button type="button" class="btn btn--center" data-id="${el.id}">
        <span class="btn__span">Más info</span>
        <img src="./assets/icons/arrow-right.svg"
        alt="arrow-right"
        class="btn__icon"
        />
      </button>
    `;
    $fragment.appendChild($article);
  });
  $cardSmallContainer.appendChild($fragment);
};
