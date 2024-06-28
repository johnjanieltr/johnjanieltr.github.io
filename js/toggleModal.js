import { personalProjects } from "./projects.js";

const $body = document.body,
  $header = document.getElementById("header"),
  $main = document.getElementById("main");

const $modalContainer = document.getElementById("modal-container"),
  $modal = document.getElementById("modal"),
  $modalTitle = document.getElementById("modal-title"),
  $githubLink = document.getElementById("pp-github-link"),
  $githubLink2 = document.getElementById("pp-github-link2"),
  $projectLink = document.getElementById("pp-project-link"),
  $projectLink2 = document.getElementById("pp-project-link2");

export const toggleModal = (id) => {
  id = +id;

  if ($modalContainer.classList.contains("hidden")) {
    // active modal
    let personalProject = personalProjects.filter((proj) => proj.id === id);
    personalProject = personalProject[0];

    $modalTitle.textContent = personalProject.title;
    $projectLink.href = personalProject.projectLink;
    $projectLink2.href = personalProject.projectLink;
    $githubLink.href = personalProject.githubLink;
    $githubLink2.href = personalProject.githubLink;

    $modalContainer.classList.remove("hidden");
    $header.classList.add("blur");
    $main.classList.add("blur");
    $body.style.overflow = "hidden";
    setTimeout(() => {
      $modalContainer.classList.add("modal-container--is-active");
    }, 0);
  } else {
    // disable modal
    $projectLink.href = "";
    $projectLink2.href = "";
    $githubLink.href = "";
    $githubLink2.href = "";

    $modalContainer.classList.remove("modal-container--is-active");
    $header.classList.remove("blur");
    $main.classList.remove("blur");
    $body.style.overflow = "auto";
    setTimeout(() => {
      $modalContainer.classList.add("hidden");
    }, 300);
  }
};

export default toggleModal;
