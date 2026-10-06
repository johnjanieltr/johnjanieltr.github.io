// Los arrays están en el orden en que se muestran (el más reciente primero).
// role: solo para experiencia. links.live / links.repo: null si no aplica.
// screenshots: [{ src, alt }] — vacío = el modal no muestra carrusel.
// automations (opcional): [{ title, description, thumb, images: [{ src, alt, label }] }]
//   Se listan en el modal; cada una abre sus capturas en el visor a pantalla completa.

const KALSTEIN_IMG = "./assets/images/exp-kalstein";

// Arma las capturas de una automatización: la primera es la vista general y el resto, detalles con zoom.
const automationImages = (slug, count, title, extraLabels = {}) =>
  Array.from({ length: count }, (_, i) => {
    const label = extraLabels[i + 1] ?? (i === 0 ? "Vista general" : count > 2 ? `Detalle ${i}` : "Detalle");
    return { src: `${KALSTEIN_IMG}/${slug}-${i + 1}.webp`, alt: `${title} — ${label}`, label };
  });

export const experience = [
  {
    id: "exp-kalstein",
    title: "Kalstein Instruments C.A.",
    role: "Desarrollador Full Stack y de Automatizaciones con IA",
    imgSrc: "./assets/images/kalstein-instruments.webp",
    highlights: [
      "Trabajo en equipo de IT dando mantenimiento, mejoras y añadiendo nuevas funcionalidades a varias páginas usando WordPress, PHP, MySQL, JavaScript.",
      "Desarrollo de más de 8 automatizaciones usando N8N, ChatGPT, Google Sheets y la API de WordPress.",
      "Traducción de sitios completos de WordPress con IA.",
      "Migración de sitios de WordPress.",
      "Diseño de interfaces.",
      "Aplicación de estrategias SEO On-page, Off-page y técnico.",
    ],
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "N8N", "ChatGPT", "Google Sheets"],
    links: { live: null, repo: null },
    screenshots: [],
    automations: [
      {
        title: "Redacción de artículos por categoría",
        description:
          "La automatización se basó en buscar productos de cada categoría, redactar artículos SEO con un agente de IA (ChatGPT) y publicarlos en WordPress, registrando cada ejecución en un historial de Google Sheets. Esta automatización estaba programada para que se ejecutara de forma periódica.",
        thumb: `${KALSTEIN_IMG}/thumbs/redaccion-categoria-2.webp`,
        images: automationImages("redaccion-categoria", 2, "Redacción de artículos por categoría"),
      },
      {
        title: "Redacción de artículos comparativos",
        description:
          "Genera artículos comparativos con IA, artículos que comparan productos de la empresa con productos de la competencia sin hacer referencia directa a ellos, esto como estrategia SEO. A cada artículo se le asignan imágenes y se publica automáticamente en WordPress.",
        thumb: `${KALSTEIN_IMG}/thumbs/redaccion-comparativos-2.webp`,
        images: automationImages("redaccion-comparativos", 2, "Redacción de artículos comparativos"),
      },
      {
        title: "Redacción de artículos técnicos",
        description:
          "Redacta artículos técnicos con IA sobre los productos de la marca y los publica en WordPress.",
        thumb: `${KALSTEIN_IMG}/thumbs/redaccion-tecnicos-1.webp`,
        images: automationImages("redaccion-tecnicos", 1, "Redacción de artículos técnicos"),
      },
      {
        title: "Propagador de artículos (Kalstein News)",
        description:
          "Replica los artículos de Kalstein News en los sitios de otros idiomas: crea las categorías, sube las imágenes y publica cada artículo. Automatización sumamente necesaria porque la marca tenía varios dominios publicados y cada uno era un WordPress distinto.",
        thumb: `${KALSTEIN_IMG}/thumbs/propagador-articulos-2.webp`,
        images: automationImages("propagador-articulos", 2, "Propagador de artículos"),
      },
      {
        title: "Propagador de productos",
        description:
          "Productos nuevos o ediciones a productos existentes en páginas principales son capturados por este bot. El bot se encarga de replicar los cambios en cada sitio descendiente por idioma (categorías, imágenes, variaciones y datos de cada producto). Antes el equipo hacía este proceso manualmente, página por página; el bot redujo días enteros de trabajo a minutos.",
        thumb: `${KALSTEIN_IMG}/thumbs/propagador-productos-2.webp`,
        images: automationImages("propagador-productos", 4, "Propagador de productos", {
          4: "Versiones por idioma",
        }),
      },
      {
        title: "Bot de mejora de productos existentes",
        description:
          "Revisa los productos ya publicados y mejora con IA únicamente la descripción para hacerla más atractiva y fácil de leer para el cliente: uso de viñetas, mejor tabla informativa y SEO.",
        thumb: `${KALSTEIN_IMG}/thumbs/mejora-productos-1.webp`,
        images: automationImages("mejora-productos", 1, "Bot de mejora de productos"),
      },
    ],
  },
];

export const personalProjects = [
  {
    id: "proj-password-generator",
    title: "Secure password generator",
    imgSrc: "./assets/images/secure-password-generator.webp",
    highlights: [],
    technologies: ["JavaScript", "Web Crypto API", "Claude Code"],
    links: {
      live: "https://secure-password-generator-b96.pages.dev/",
      repo: "https://github.com/johnjanieltr/secure-password-generator",
    },
    screenshots: [],
  },
  {
    id: "proj-todo-app",
    title: "Todo app",
    imgSrc: "./assets/images/todo-app.webp",
    highlights: ["Solución a desafío de código de Frontend Mentor."],
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://johnjanieltr.github.io/todo-app",
      repo: "https://github.com/johnjanieltr/todo-app",
    },
    screenshots: [],
  },
  {
    id: "proj-rock-paper-scissors",
    title: "Rock, paper, scissors",
    imgSrc: "./assets/images/rock-paper-scissors.webp",
    highlights: ["Solución a desafío de código de Frontend Mentor."],
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://johnjanieltr.github.io/rock-paper-scissors-game",
      repo: "https://github.com/johnjanieltr/rock-paper-scissors-game",
    },
    screenshots: [],
  },
  {
    id: "proj-manage-landing",
    title: "Manage landing page",
    imgSrc: "./assets/images/manage-landing-page.webp",
    highlights: ["Solución a desafío de código de Frontend Mentor."],
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://johnjanieltr.github.io/manage-landing-page",
      repo: "https://github.com/johnjanieltr/manage-landing-page",
    },
    screenshots: [],
  },
];

export const findItem = (id) =>
  [...experience, ...personalProjects].find((item) => item.id === id);
