import { UI } from "./translations.js";

// Idioma del sitio. Prioridad: ?lang= en la URL → última elección guardada → idioma del navegador → español.
// El script inline del <head> aplica el mismo criterio para ocultar la página mientras se traduce.

export const LANGS = ["es", "en"];
const STORAGE_KEY = "lang";

const detectLang = () => {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
};

let lang = detectLang();

export const getLang = () => lang;

// Texto de interfaz: t("modal.shotsOther", { n: 3 }) → "3 capturas"
export const t = (key, vars = {}) =>
  (UI[lang][key] ?? UI.es[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");

// Dato traducible de cardsInfo.js: { es, en } → el del idioma actual; un string o array se devuelve tal cual.
export const tr = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value[lang] ?? value.es : value;

const applyStatic = () => {
  document.documentElement.lang = lang;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').content = t("meta.description");
  document.querySelectorAll("[data-i18n]").forEach(($el) => ($el.textContent = t($el.dataset.i18n)));
  document
    .querySelectorAll("[data-i18n-aria]")
    .forEach(($el) => $el.setAttribute("aria-label", t($el.dataset.i18nAria)));
  document.querySelectorAll("[data-cv]").forEach(($el) => ($el.href = t("cv")));
  document
    .querySelectorAll("[data-lang]")
    .forEach(($btn) => $btn.setAttribute("aria-pressed", $btn.dataset.lang === lang));
};

export const initI18n = () => {
  applyStatic();
  document.documentElement.classList.remove("i18n-pending");
};

// Cambia el idioma sin recargar; las cards se vuelven a pintar escuchando "langchange".
export const setLang = (next) => {
  if (!LANGS.includes(next) || next === lang) return;
  lang = next;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  applyStatic();
  document.dispatchEvent(new CustomEvent("langchange"));
};
