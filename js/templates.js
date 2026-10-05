// Piezas de HTML compartidas entre las cards y el modal.

const svgIcon = (path, className = "icon") =>
  `<svg class="${className}" viewBox="0 -960 960 960" aria-hidden="true"><path d="${path}"/></svg>`;

export const ICONS = {
  arrowRight: svgIcon("M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"),
  external: svgIcon("M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"),
  close: svgIcon("m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"),
  chevronLeft: svgIcon("M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"),
  chevronRight: svgIcon("M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"),
};

export const renderTags = (technologies = [], max = Infinity) => {
  if (!technologies.length) return "";
  const visible = technologies.slice(0, max);
  const rest = technologies.length - visible.length;

  return `
    <ul class="tags">
      ${visible.map((t) => `<li class="tag">${t}</li>`).join("")}
      ${rest > 0 ? `<li class="tag tag--muted">+${rest}</li>` : ""}
    </ul>
  `;
};
