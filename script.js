/* ============================================================
   VERIFICATION SUITE — script.js
   ============================================================ */

/* ============================================================
   ▼▼▼  CONFIGURATION — THIS IS THE ONLY BLOCK YOU EDIT  ▼▼▼
   ============================================================ */

const CONFIG = {

  /* 1. Where each tool lives. Full URL, including https:// */
  TOOL_URLS: {
    allInOne:         "https://msu581.github.io/AllinONE/",
    whiteVsOriginal:  "https://msu581.github.io/white-Vs-Original/"
  },

  /* Open the tools in a new tab (true) or in this tab (false). */
  OPEN_IN_NEW_TAB: true,

  /* 2. Sign-in credentials.
        NOTE: this is a shared team gate, not secure authentication.
        Anyone who can load this page can read these values in the
        page source. See "Security limitations" in README.md. */
  CREDENTIALS: [
    { id: "Admin123", password: "Medhavi@128", display: "Admin123" }
    // add more team members here, same shape:
    // { id: "Exam02", password: "change-me", display: "Exam02" }
  ],

  /* 3. Organisation names shown in the header, footer and sign-in panel. */
  ORG_NAME: "Medhavi Skills University",
  ORG_UNIT: "Controller of Examinations",

  /* 4. Session behaviour. */
  SESSION_HOURS: 8,        // how long a session stays valid
  MAX_ATTEMPTS: 5,         // failed tries before a short cooldown
  LOCKOUT_SECONDS: 30
};

/* ============================================================
   ▲▲▲  END OF CONFIGURATION — no need to edit below  ▲▲▲
   ============================================================ */


const STORAGE_KEY = "vsuite.session";
const ATTEMPTS_KEY = "vsuite.attempts";

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const el = {
  boot:      $("#boot"),
  login:     $("#login"),
  app:       $("#app"),
  slip:      $("#slip"),
  form:      $("#loginForm"),
  userId:    $("#userId"),
  password:  $("#password"),
  keep:      $("#keepSignedIn"),
  error:     $("#formError"),
  submit:    $("#submitBtn"),
  toggle:    $("#togglePassword"),
  stamp:     $("#stamp"),
  logout:    $("#logoutBtn"),
  menuBtn:   $("#menuBtn"),
  mobileNav: $("#mobileNav")
};

const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));


/* ------------------------------------------------------------
   Session handling
   ------------------------------------------------------------ */

function readSession() {
  for (const store of [localStorage, sessionStorage]) {
    try {
      const raw = store.getItem(STORAGE_KEY);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (!data || !data.user || !data.expires) continue;
      if (Date.now() > data.expires) {
        store.removeItem(STORAGE_KEY);
        return { expired: true };
      }
      return data;
    } catch (err) {
      try { store.removeItem(STORAGE_KEY); } catch (_) {}
    }
  }
  return null;
}

function writeSession(user, persist) {
  const data = {
    user,
    expires: Date.now() + CONFIG.SESSION_HOURS * 3600 * 1000
  };
  const store = persist ? localStorage : sessionStorage;
  try { store.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
}

function clearSession() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
}


/* ------------------------------------------------------------
   Screen switching
   ------------------------------------------------------------ */

function showLogin(message) {
  document.body.classList.remove("is-booting");
  el.boot.hidden = true;
  el.app.hidden = true;
  el.login.hidden = false;
  el.login.classList.remove("screen-out");
  el.stamp.classList.remove("is-on");
  el.form.reset();
  setPasswordVisible(false);
  window.scrollTo(0, 0);
  if (message) {
    showMessage(message.title, message.body, message.kind || "info");
  } else {
    hideMessage();
  }
  // focus the first field, but not on a fresh page load on mobile
  if (message) el.userId.focus();
}

function showPortal(user, animate) {
  document.body.classList.remove("is-booting");
  el.boot.hidden = true;
  el.login.hidden = true;
  el.app.hidden = false;
  $$("[data-current-user]").forEach((n) => { n.textContent = user; });
  if (animate && !prefersReducedMotion) {
    el.app.classList.add("is-entering");
    setTimeout(() => el.app.classList.remove("is-entering"), 600);
  }
  window.scrollTo(0, 0);
  wireReveals(); // run here: the elements have no layout while #app is hidden
}


/* ------------------------------------------------------------
   Messages (error + info)
   ------------------------------------------------------------ */

function showMessage(title, body, kind) {
  el.error.innerHTML = "";
  const strong = document.createElement("strong");
  strong.textContent = title;
  el.error.appendChild(strong);
  if (body) el.error.appendChild(document.createTextNode(body));
  el.error.hidden = false;
  el.error.style.borderLeftColor = kind === "info" ? "var(--ink-soft)" : "";
  el.error.style.background = kind === "info" ? "rgba(18,26,34,.04)" : "";
  el.error.style.color = kind === "info" ? "var(--ink-soft)" : "";
}

function hideMessage() {
  el.error.hidden = true;
  el.error.textContent = "";
}


/* ------------------------------------------------------------
   Lockout after repeated failures
   ------------------------------------------------------------ */

function getAttempts() {
  try {
    return JSON.parse(sessionStorage.getItem(ATTEMPTS_KEY)) || { count: 0, until: 0 };
  } catch (_) {
    return { count: 0, until: 0 };
  }
}

function setAttempts(value) {
  try { sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(value)); } catch (_) {}
}

function lockoutRemaining() {
  const { until } = getAttempts();
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

function startLockoutCountdown() {
  const tick = () => {
    const left = lockoutRemaining();
    if (left <= 0) {
      el.submit.disabled = false;
      $(".btn__label", el.submit).textContent = "Sign in";
      hideMessage();
      return;
    }
    el.submit.disabled = true;
    showMessage(
      "Too many attempts",
      `Wait ${left} second${left === 1 ? "" : "s"} before trying again.`,
      "error"
    );
    setTimeout(tick, 1000);
  };
  tick();
}


/* ------------------------------------------------------------
   Sign-in
   ------------------------------------------------------------ */

function matchCredentials(id, password) {
  const cleanId = id.trim().toLowerCase();
  return CONFIG.CREDENTIALS.find(
    (c) => c.id.toLowerCase() === cleanId && c.password === password
  );
}

async function handleSubmit(event) {
  event.preventDefault();
  if (lockoutRemaining() > 0) return;

  const id = el.userId.value;
  const password = el.password.value;

  if (!id.trim() || !password) {
    showMessage("Missing details", " Enter both your staff ID and password.", "error");
    shake();
    return;
  }

  hideMessage();
  el.submit.disabled = true;
  el.submit.classList.add("is-busy");
  $(".btn__label", el.submit).textContent = "Checking…";

  await wait(450); // brief, deliberate pause so the state is readable

  const account = matchCredentials(id, password);

  if (!account) {
    const attempts = getAttempts();
    attempts.count += 1;
    if (attempts.count >= CONFIG.MAX_ATTEMPTS) {
      attempts.until = Date.now() + CONFIG.LOCKOUT_SECONDS * 1000;
      attempts.count = 0;
      setAttempts(attempts);
      el.submit.classList.remove("is-busy");
      startLockoutCountdown();
      shake();
      return;
    }
    setAttempts(attempts);
    el.submit.disabled = false;
    el.submit.classList.remove("is-busy");
    $(".btn__label", el.submit).textContent = "Sign in";
    showMessage(
      "Access denied",
      " Your ID or password is incorrect. Check your credentials and try again.",
      "error"
    );
    shake();
    el.password.value = "";
    el.password.focus();
    return;
  }

  setAttempts({ count: 0, until: 0 });
  writeSession(account.display || account.id, el.keep.checked);

  // stamp, then move through
  $(".btn__label", el.submit).textContent = "Signed in";
  const time = new Date();
  const stampMeta = $("[data-stamp-time]");
  if (stampMeta) {
    stampMeta.textContent = time.toLocaleString(undefined, {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }
  el.stamp.classList.add("is-on");

  await wait(prefersReducedMotion ? 300 : 950);

  if (!prefersReducedMotion) {
    el.login.classList.add("screen-out");
    await wait(300);
  }

  el.submit.disabled = false;
  el.submit.classList.remove("is-busy");
  $(".btn__label", el.submit).textContent = "Sign in";
  showPortal(account.display || account.id, true);
}

function shake() {
  if (prefersReducedMotion) return;
  el.slip.classList.remove("is-shaking");
  void el.slip.offsetWidth; // restart the animation
  el.slip.classList.add("is-shaking");
}

function setPasswordVisible(visible) {
  el.password.type = visible ? "text" : "password";
  el.toggle.textContent = visible ? "Hide" : "Show";
  el.toggle.setAttribute("aria-pressed", String(visible));
  el.toggle.setAttribute("aria-label", visible ? "Hide password" : "Show password");
}

function handleLogout() {
  clearSession();
  closeMobileNav();
  showLogin({
    title: "Signed out",
    body: " Your session on this browser has ended.",
    kind: "info"
  });
}


/* ------------------------------------------------------------
   Tool links
   ------------------------------------------------------------ */

function wireToolLinks() {
  $$("[data-tool]").forEach((link) => {
    const key = link.dataset.tool;
    const url = CONFIG.TOOL_URLS[key];
    const unset = !url || url.indexOf("PASTE_") === 0 || url === "#";

    if (unset) {
      link.setAttribute("aria-disabled", "true");
      link.removeAttribute("href");
      link.title = "Add this tool's URL in the CONFIG block of script.js";
      return;
    }

    link.href = url;
    if (CONFIG.OPEN_IN_NEW_TAB) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
    }
  });
}


/* ------------------------------------------------------------
   Navigation
   ------------------------------------------------------------ */

function wireNavigation() {
  $$("[data-nav]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id && id.startsWith("#") ? $(id) : null;
      if (!target) return;
      event.preventDefault();
      closeMobileNav();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", id);
    });
  });

  el.menuBtn.addEventListener("click", () => {
    const open = el.menuBtn.getAttribute("aria-expanded") === "true";
    open ? closeMobileNav() : openMobileNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

  // active section indicator
  const sections = $$("main section[id]", el.app);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        $$(".nav__link").forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((section) => spy.observe(section));
  }
}

function openMobileNav() {
  el.mobileNav.hidden = false;
  el.mobileNav.dataset.open = "true";
  el.menuBtn.setAttribute("aria-expanded", "true");
  el.menuBtn.setAttribute("aria-label", "Close menu");
}

function closeMobileNav() {
  el.mobileNav.dataset.open = "false";
  el.mobileNav.hidden = true;
  el.menuBtn.setAttribute("aria-expanded", "false");
  el.menuBtn.setAttribute("aria-label", "Open menu");
}


/* ------------------------------------------------------------
   Scroll reveals
   ------------------------------------------------------------ */

let revealsStarted = false;

function wireReveals() {
  if (revealsStarted) return;
  revealsStarted = true;

  const items = $$(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-in"));
    return;
  }

  // safety net: nothing stays invisible if the observer never fires
  setTimeout(() => {
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight) {
        item.classList.add("is-in");
      }
    });
  }, 1200);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add("is-in"), index * 70);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach((item) => observer.observe(item));
}


/* ------------------------------------------------------------
   Small details: logo fallback, org names, serial, year
   ------------------------------------------------------------ */

function wireLogo() {
  $$("[data-logo]").forEach((img) => {
    const fallback = img.parentElement.querySelector("[data-logo-fallback]");
    const useFallback = () => {
      img.style.display = "none";
      if (fallback) fallback.hidden = false;
    };
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  });
}

function wireStaticText() {
  $$("[data-org-name]").forEach((n) => { n.textContent = CONFIG.ORG_NAME; });
  $$("[data-org-unit]").forEach((n) => { n.textContent = CONFIG.ORG_UNIT; });
  $$("[data-year]").forEach((n) => { n.textContent = new Date().getFullYear(); });

  // monogram shown only while assets/logo.png is missing
  const initials = CONFIG.ORG_NAME
    .split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  $$("[data-logo-fallback]").forEach((n) => { n.textContent = initials; });

  const serial = $("[data-serial]");
  if (serial) {
    const now = new Date();
    const stamp =
      String(now.getFullYear()).slice(2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    serial.textContent = "COE / " + stamp;
  }
}


/* ------------------------------------------------------------
   Start
   ------------------------------------------------------------ */

function init() {
  wireLogo();
  wireStaticText();
  wireToolLinks();
  wireNavigation();

  el.form.addEventListener("submit", handleSubmit);
  el.toggle.addEventListener("click", () => {
    setPasswordVisible(el.password.type === "password");
  });
  el.logout.addEventListener("click", handleLogout);
  $$("[data-logout]").forEach((btn) => btn.addEventListener("click", handleLogout));

  // clear the error as soon as the person starts correcting it
  [el.userId, el.password].forEach((input) => {
    input.addEventListener("input", () => {
      if (!el.error.hidden && lockoutRemaining() === 0) hideMessage();
    });
  });

  const session = readSession();

  if (session && session.user) {
    showPortal(session.user, false);
  } else if (session && session.expired) {
    showLogin({
      title: "Session expired",
      body: " Sign in again to open the suite.",
      kind: "info"
    });
  } else {
    showLogin(null);
  }

  if (lockoutRemaining() > 0) startLockoutCountdown();
}

document.addEventListener("DOMContentLoaded", init);
