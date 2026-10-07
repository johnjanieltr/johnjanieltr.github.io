// Los arrays están en el orden en que se muestran (el más reciente primero).
// Textos traducibles: { es, en } (title, role, highlights, descripciones…); se leen con tr() de i18n.js.
//   Un string simple (p. ej. "Todo app") se muestra igual en ambos idiomas.
// role: solo para experiencia. links.live / links.repo: null si no aplica.
// screenshots: [{ src, alt }] — vacío = el modal no muestra carrusel.
// automations (opcional): [{ title, description, thumb, images: [{ src, alt, label }] }]
//   Se listan en el modal; cada una abre sus capturas en el visor a pantalla completa.
// preview (opcional): { url, image, title, description } — enlace al prototipo de diseño previo al desarrollo.

const KALSTEIN_IMG = "./assets/images/exp-kalstein";

// Arma las capturas de una automatización: la primera es la vista general y el resto, detalles con zoom.
// title y extraLabels: { es, en }
const automationImages = (slug, count, title, extraLabels = {}) =>
  Array.from({ length: count }, (_, i) => {
    const n = count > 2 ? ` ${i}` : "";
    const label =
      extraLabels[i + 1] ??
      (i === 0 ? { es: "Vista general", en: "Overview" } : { es: `Detalle${n}`, en: `Detail${n}` });
    return {
      src: `${KALSTEIN_IMG}/${slug}-${i + 1}.webp`,
      alt: { es: `${title.es} — ${label.es}`, en: `${title.en} — ${label.en}` },
      label,
    };
  });

const automation = ({ slug, count, title, description, thumb, extraLabels }) => ({
  title,
  description,
  thumb: `${KALSTEIN_IMG}/thumbs/${thumb}.webp`,
  images: automationImages(slug, count, title, extraLabels),
});

const FRONTEND_MENTOR = {
  es: ["Solución a desafío de código de Frontend Mentor."],
  en: ["Solution to a Frontend Mentor coding challenge."],
};

export const experience = [
  {
    id: "exp-kalstein",
    title: "Kalstein France S.A.S.",
    role: {
      es: "Desarrollador Full Stack y de Automatizaciones con IA",
      en: "Full Stack & AI Automation Developer",
    },
    imgSrc: "./assets/images/kalstein-instruments.webp",
    highlights: {
      es: [
        "Trabajo en equipo de IT dando mantenimiento, mejoras y añadiendo nuevas funcionalidades a varias páginas usando WordPress, PHP, MySQL, JavaScript.",
        "Desarrollo de más de 8 automatizaciones usando N8N, ChatGPT, Google Sheets y la API de WordPress.",
        "Traducción de sitios completos de WordPress con IA.",
        "Migración de sitios de WordPress.",
        "Diseño de interfaces.",
        "Aplicación de estrategias SEO On-page, Off-page y técnico.",
      ],
      en: [
        "Worked on the IT team maintaining, improving and adding new features to several websites using WordPress, PHP, MySQL and JavaScript.",
        "Built 8+ automations using N8N, ChatGPT, Google Sheets and the WordPress API.",
        "Translated entire WordPress sites with AI.",
        "Migrated WordPress sites.",
        "Designed user interfaces.",
        "Applied on-page, off-page and technical SEO strategies.",
      ],
    },
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "N8N", "ChatGPT", "Google Sheets"],
    links: { live: null, repo: null },
    screenshots: [],
    automations: [
      automation({
        slug: "redaccion-categoria",
        count: 2,
        thumb: "redaccion-categoria-2",
        title: {
          es: "Redacción de artículos por categoría",
          en: "Category-based article writing",
        },
        description: {
          es: "La automatización se basó en buscar productos de cada categoría, redactar artículos SEO con un agente de IA (ChatGPT) y publicarlos en WordPress, registrando cada ejecución en un historial de Google Sheets. Esta automatización estaba programada para que se ejecutara de forma periódica.",
          en: "The automation fetched products from each category, wrote SEO articles with an AI agent (ChatGPT) and published them to WordPress, logging every run in a Google Sheets history. It was scheduled to run periodically.",
        },
      }),
      automation({
        slug: "redaccion-comparativos",
        count: 2,
        thumb: "redaccion-comparativos-2",
        title: {
          es: "Redacción de artículos comparativos",
          en: "Comparison article writing",
        },
        description: {
          es: "Genera artículos comparativos con IA, artículos que comparan productos de la empresa con productos de la competencia sin hacer referencia directa a ellos, esto como estrategia SEO. A cada artículo se le asignan imágenes y se publica automáticamente en WordPress.",
          en: "Generates comparison articles with AI that compare the company's products with competitors' products without naming them directly, as an SEO strategy. Each article is assigned images and published automatically to WordPress.",
        },
      }),
      automation({
        slug: "redaccion-tecnicos",
        count: 1,
        thumb: "redaccion-tecnicos-1",
        title: {
          es: "Redacción de artículos técnicos",
          en: "Technical article writing",
        },
        description: {
          es: "Redacta artículos técnicos con IA sobre los productos de la marca y los publica en WordPress.",
          en: "Writes technical articles with AI about the brand's products and publishes them to WordPress.",
        },
      }),
      automation({
        slug: "propagador-articulos",
        count: 2,
        thumb: "propagador-articulos-2",
        title: {
          es: "Propagador de artículos (Kalstein News)",
          en: "Article propagator (Kalstein News)",
        },
        description: {
          es: "Replica los artículos de Kalstein News en los sitios de otros idiomas: crea las categorías, sube las imágenes y publica cada artículo. Automatización sumamente necesaria porque la marca tenía varios dominios publicados y cada uno era un WordPress distinto.",
          en: "Replicates Kalstein News articles across the sites in other languages: creates the categories, uploads the images and publishes each article. An essential automation, since the brand had several live domains, each running a separate WordPress install.",
        },
      }),
      automation({
        slug: "propagador-productos",
        count: 4,
        thumb: "propagador-productos-2",
        title: {
          es: "Propagador de productos",
          en: "Product propagator",
        },
        description: {
          es: "Productos nuevos o ediciones a productos existentes en páginas principales son capturados por este bot. El bot se encarga de replicar los cambios en cada sitio descendiente por idioma (categorías, imágenes, variaciones y datos de cada producto). Antes el equipo hacía este proceso manualmente, página por página; el bot redujo días enteros de trabajo a minutos.",
          en: "This bot captures new products and edits to existing products on the main sites, then replicates the changes to every language site (categories, images, variations and product data). The team used to do this manually, site by site; the bot cut entire days of work down to minutes.",
        },
        extraLabels: { 4: { es: "Versiones por idioma", en: "Language versions" } },
      }),
      automation({
        slug: "mejora-productos",
        count: 1,
        thumb: "mejora-productos-1",
        title: {
          es: "Bot de mejora de productos existentes",
          en: "Existing product improvement bot",
        },
        description: {
          es: "Revisa los productos ya publicados y mejora con IA únicamente la descripción para hacerla más atractiva y fácil de leer para el cliente: uso de viñetas, mejor tabla informativa y SEO.",
          en: "Reviews already published products and uses AI to improve only the description, making it more appealing and easier for customers to read: bullet points, a better spec table and SEO.",
        },
      }),
    ],
  },
];

export const personalProjects = [
  {
    id: "proj-oral-dent",
    title: {
      es: "Oral Dent - Clínica dental estética",
      en: "Oral Dent - Aesthetic dental clinic",
    },
    imgSrc: "./assets/images/oral-dent.webp",
    highlights: {
      es: [
        "Diseño del mockup con Claude Design.",
        "Diseño de un preview interactivo cercano al resultado final ideal para mostrar a un cliente.",
        "Maquetación y desarrollo de la Landing Page usando Novamira MCP y Claude Code.",
        "Deploy usando FTP y hosting gratuito.",
        "Formulario funcional con WPForms.",
      ],
      en: [
        "Designed the mockup with Claude Design.",
        "Designed an interactive preview close to the ideal final result to show a client.",
        "Built and developed the landing page using Novamira MCP and Claude Code.",
        "Deployed via FTP on free hosting.",
        "Working contact form with WPForms.",
      ],
    },
    technologies: ["WordPress", "WPForms", "Claude Code", "Novamira MCP"],
    links: {
      live: "https://oraldent.freedev.app/",
      repo: null,
    },
    screenshots: [],
    preview: {
      url: "https://claude.ai/artifact/TVg4T13xFC3h4fGCWyKjJd",
      image: "./assets/images/proj-oral-dent/preview.webp",
      title: {
        es: "Prototipo interactivo en Claude Design",
        en: "Interactive prototype in Claude Design",
      },
      description: {
        es: "Antes de desarrollar en WordPress, el cliente revisa y aprueba la landing en laptop, tablet y móvil.",
        en: "Before building it in WordPress, the client reviews and approves the landing page on laptop, tablet and mobile.",
      },
    },
  },
  {
    id: "proj-password-generator",
    title: "Secure password generator",
    imgSrc: "./assets/images/secure-password-generator.webp",
    highlights: {
      es: [
        "Generador de contraseñas que funciona 100% en el navegador con aleatoriedad criptográfica (Web Crypto API).",
        "Content-Security-Policy estricta, sin cookies ni rastreo, interfaz en 4 idiomas y tema claro/oscuro.",
        "Desarrollado con Claude Code: definí requisitos y decisiones de diseño y seguridad, y revisé cada cambio.",
      ],
      en: [
        "Password generator that runs 100% in the browser using cryptographic randomness (Web Crypto API).",
        "Strict Content-Security-Policy, no cookies or tracking, interface in 4 languages and light/dark theme.",
        "Built with Claude Code: I defined the requirements and the design and security decisions, and reviewed every change.",
      ],
    },
    technologies: ["JavaScript", "Web Crypto API", "Claude Code", "TailwindCSS"],
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
    highlights: FRONTEND_MENTOR,
    technologies: ["ReactJs", "Vite", "JavaScript", "TailwindCSS"],
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
    highlights: FRONTEND_MENTOR,
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
    highlights: FRONTEND_MENTOR,
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
