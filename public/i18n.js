(function () {
  const KEY = "imc-locale";
  const dict = window.__I18N__;
  if (!dict) return;

  function detect() {
    const saved = localStorage.getItem(KEY);
    if (saved === "zh" || saved === "en") return saved;
    const nav = (navigator.language || "zh").toLowerCase();
    return nav.startsWith("zh") ? "zh" : "en";
  }

  function apply(locale) {
    const pack = dict[locale] || dict.zh;
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = pack.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", pack.metaDesc);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && pack[key] != null) el.textContent = pack[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (key && pack[key] != null) el.innerHTML = pack[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && pack[key] != null) el.setAttribute("aria-label", pack[key]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (key && pack[key] != null) el.setAttribute("alt", pack[key]);
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === locale;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("is-active", active);
    });

    localStorage.setItem(KEY, locale);
    window.__LOCALE__ = locale;
  }

  function bind() {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.getAttribute("data-lang");
        if (next === "zh" || next === "en") apply(next);
      });
    });
  }

  const locale = detect();
  apply(locale);
  bind();
  window.__setLocale = apply;
})();
