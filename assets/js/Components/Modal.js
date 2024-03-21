import { personalProjects } from "./SmallCards.js";

const $header = document.getElementById("header"),
  $body = document.getElementById("body"),
  $main = document.getElementById("main");

const $modalContainer = document.getElementById("modal-container"),
  $modal = document.getElementById("modal"),
  $modalTitle = document.getElementById("modal-title"),
  $githubLink = document.getElementById("pp-github-link"),
  $githubLink2 = document.getElementById("pp-github-link2"),
  $projectLink = document.getElementById("pp-project-link"),
  $projectLink2 = document.getElementById("pp-project-link2");

export const toggleModal = (id) => {
  if ($modalContainer.classList.contains("hidden")) {
    // activate modal
    const personalProject = personalProjects[id - 1];
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
    $modalContainer.classList.remove("modal-container--is-active");
    $header.classList.remove("blur");
    $main.classList.remove("blur");
    $body.style.overflow = "auto";
    setTimeout(() => {
      $modalContainer.classList.add("hidden");
    }, 310);
  }
};

export default toggleModal;
