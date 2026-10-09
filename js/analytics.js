import { getLang } from "./i18n.js";

// Analítica propia: cada evento se envía como una fila a Google Sheets a través de un Apps Script
// publicado como Web App (código en analytics/apps-script.gs). No guarda IP ni datos personales.
// ?notrack=1 excluye este navegador (tus propias visitas), ?notrack=0 lo vuelve a incluir.
// En localhost y navegadores automatizados no se envía nada salvo con ?forcetrack=1 (para pruebas).

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzTspkGNWxWCm9qYa2EEgoW29IcTuKHNk_BSIs-UnxXZEm82ELg9QCMfEPscdeTwGco/exec";
const GEO_URL = "https://ipapi.co/json/";
const GEO_TIMEOUT = 1500;

let enabled = false;
let geo = null;
let geoReady = Promise.resolve();
let visitorId = "";
let sessionId = "";
let isNewVisitor = false;
let activeMs = 0;
let visibleSince = 0;
let maxScroll = 0;

const storage = (type) => {
  try {
    return window[type];
  } catch {
    return null;
  }
};

const getOrCreateId = (store, key) => {
  const saved = store?.getItem(key);
  if (saved) return { id: saved, created: false };
  const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    store?.setItem(key, id);
  } catch {}
  return { id, created: true };
};

const shouldTrack = (params) => {
  const local = storage("localStorage");
  const flag = params.get("notrack");
  try {
    if (flag === "1") local?.setItem("notrack", "1");
    if (flag === "0") local?.removeItem("notrack");
  } catch {}
  if (local?.getItem("notrack") === "1") return false;
  if (params.get("forcetrack") === "1") return true;
  if (navigator.webdriver || ["localhost", "127.0.0.1", ""].includes(location.hostname)) return false;
  return !ENDPOINT.includes("/XXX/");
};

const text = (value) => (typeof value === "string" ? value.slice(0, 100) : "");

// Nunca rechaza: si falla (bloqueador, límite de ipapi, caché corrupta) se envía sin ubicación.
const loadGeo = async () => {
  const session = storage("sessionStorage");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), GEO_TIMEOUT);
  try {
    const cached = session?.getItem("geo");
    if (cached) return (geo = JSON.parse(cached));
    const res = await fetch(GEO_URL, { signal: ctrl.signal, credentials: "omit", referrerPolicy: "no-referrer" });
    if (!res.ok) return;
    const data = await res.json();
    geo = { country: text(data.country_name), region: text(data.region), city: text(data.city) };
    session?.setItem("geo", JSON.stringify(geo));
  } catch {
  } finally {
    clearTimeout(timer);
  }
};

const device = () => {
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Otro";
  const os = /Android/.test(ua)
    ? "Android"
    : /iPhone|iPad|iPod/.test(ua)
      ? "iOS"
      : /Windows/.test(ua)
        ? "Windows"
        : /Mac OS X/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "Otro";
  const type = matchMedia("(pointer: coarse)").matches
    ? Math.min(screen.width, screen.height) >= 600
      ? "tablet"
      : "móvil"
    : "escritorio";
  return { browser, os, type };
};

// Solo dominio y ruta: la query del sitio de origen puede traer tokens o datos personales.
const cleanReferrer = () => {
  try {
    const { origin, pathname } = new URL(document.referrer);
    return origin + pathname;
  } catch {
    return "";
  }
};

const payload = (event, detail, extra = {}) => {
  const params = new URLSearchParams(location.search);
  const { browser, os, type } = device();
  return {
    event,
    detail: detail ?? "",
    visitorId,
    sessionId,
    newVisitor: isNewVisitor,
    referrer: cleanReferrer(),
    utmSource: params.get("utm_source") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    siteLang: getLang(),
    browserLang: navigator.language,
    country: geo?.country ?? "",
    region: geo?.region ?? "",
    city: geo?.city ?? "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    deviceType: type,
    browser,
    os,
    screen: `${screen.width}x${screen.height}`,
    ...extra,
  };
};

const send = (data) => {
  try {
    const body = JSON.stringify(data);
    if (navigator.sendBeacon?.(ENDPOINT, body)) return;
    fetch(ENDPOINT, { method: "POST", mode: "no-cors", keepalive: true, body }).catch(() => {});
  } catch {}
};

// Eventos de interacción: esperan (como mucho GEO_TIMEOUT) a tener la ubicación.
export const track = async (event, detail) => {
  if (!enabled) return;
  try {
    const data = payload(event, detail);
    await geoReady;
    send({ ...data, country: geo?.country ?? "", region: geo?.region ?? "", city: geo?.city ?? "" });
  } catch {}
};

const activeSeconds = () =>
  Math.round((activeMs + (visibleSince ? performance.now() - visibleSince : 0)) / 1000);

// Se envía cada vez que la pestaña se oculta o se cierra; en la hoja vale el mayor valor por sesión.
const sendSessionEnd = () => {
  const duration = activeSeconds();
  if (visibleSince) activeMs += performance.now() - visibleSince;
  visibleSince = 0;
  send(payload("session_end", "", { duration, scroll: maxScroll }));
};

const onScroll = () => {
  const $doc = document.documentElement;
  const scrollable = $doc.scrollHeight - innerHeight;
  const pct = scrollable > 0 ? Math.round((scrollY / scrollable) * 100) : 100;
  if (pct > maxScroll) maxScroll = Math.min(pct, 100);
};

export const initAnalytics = () => {
  try {
    if (!shouldTrack(new URLSearchParams(location.search))) return;
    enabled = true;

    const visitor = getOrCreateId(storage("localStorage"), "visitorId");
    visitorId = visitor.id;
    isNewVisitor = visitor.created;
    sessionId = getOrCreateId(storage("sessionStorage"), "sessionId").id;

    geoReady = loadGeo();
    visibleSince = document.visibilityState === "visible" ? performance.now() : 0;
    onScroll();

    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendSessionEnd();
      else visibleSince = performance.now();
    });
    addEventListener("pagehide", () => {
      if (visibleSince) sendSessionEnd();
    });

    track("pageview");
  } catch {}
};
