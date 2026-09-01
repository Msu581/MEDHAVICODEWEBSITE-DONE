/* ============================================================
   VERIFICATION SUITE — season.js
   Seasonal background layer. ADD-ON ONLY.

   This file does not touch authentication. It never reads or
   writes the session keys, never listens on #loginForm, and
   never changes an input, a handler or a redirect. It only:

     - decides which SEASON and which TIME OF DAY to show
     - builds a scene behind the sign-in panel
     - drifts a few leaves / petals / flakes over the portal
     - watches #login and #app to know which screen is up

   Contents
     1. Season resolution      (random / current / manual)
     2. Time-of-day resolution (clock -> five bands)
     3. Particle configuration (per season)
     4. Tree artwork
     5. Scene + portal mounting
     6. Season picker
     7. Screen watcher + clock tick
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SEASONS = ["spring", "summer", "autumn", "winter"];


  /* ==========================================================
     1. SEASON RESOLUTION
     ========================================================== */

  /* Calendar season from the month.
     Mar-May spring · Jun-Aug summer · Sep-Nov autumn · Dec-Feb winter */
  function seasonFromDate(date) {
    var month = date.getMonth() + 1;
    if (month >= 3 && month <= 5)  return "spring";
    if (month >= 6 && month <= 8)  return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
  }

  /* Rolled ONCE, when the page loads. "Random" therefore stays
     put for the whole visit — signing in does not reshuffle it —
     and a refresh produces a new draw. */
  var randomDraw = SEASONS[Math.floor(Math.random() * SEASONS.length)];

  /* mode is one of: random | current | spring | summer | autumn | winter
     It is deliberately not persisted: a reload returns to Current season. */
  var mode = "current";

  function resolveSeason() {
    if (mode === "random")  return randomDraw;
    if (mode === "current") return seasonFromDate(new Date());
    return mode;
  }


  /* ==========================================================
     2. TIME-OF-DAY RESOLUTION
     Follows the computer's local clock and is completely
     independent of the season: any season can be shown at any
     hour, and the hour never overrides the season.
     ========================================================== */

  /* 05:00-07:59 sunrise · 08:00-11:59 morning · 12:00-16:59
     afternoon · 17:00-19:59 evening · 20:00-04:59 night */
  function timeOfDay(date) {
    var hour = date.getHours();
    if (hour >= 5  && hour < 8)  return "sunrise";
    if (hour >= 8  && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
  }


  /* ==========================================================
     3. PARTICLE CONFIGURATION
     Counts are kept low on purpose: the whole scene stays well
     under a hundred nodes so an office laptop does not notice.
     ========================================================== */

  var PARTICLES = {
    spring: { shape: "petal", login: 22, portal: 9,
              size: [7, 15],  fall: [10, 18], drift: [40, 150], spin: [5, 11], alpha: [.55, .95] },
    summer: { shape: "leaf",  login: 10, portal: 5,
              size: [9, 16],  fall: [14, 23], drift: [25, 110], spin: [7, 14], alpha: [.45, .8]  },
    autumn: { shape: "leaf",  login: 28, portal: 12,
              size: [10, 21], fall: [8, 16],  drift: [70, 230], spin: [3, 8],  alpha: [.7, 1]    },
    winter: { shape: "snow",  login: 26, portal: 16,
              size: [4, 11],  fall: [12, 22], drift: [25, 95],  spin: [8, 14], alpha: [.6, 1]    }
  };

  function rand(min, max) { return min + Math.random() * (max - min); }

  /* Where a particle is allowed to start.
     In the scene, leaves and petals are released from the two
     canopy zones (the left and right thirds, high up) rather
     than from anywhere on screen. Snow falls from the sky, so
     it uses the full width. The portal has no trees, so
     everything there simply enters from above. */
  function spawn(shape, inScene) {
    if (!inScene || shape === "snow") {
      return { x: rand(-4, 104), top: rand(-14, -2) };
    }
    var overhead = Math.random() < 0.18;
    if (overhead) return { x: rand(26, 74), top: rand(-8, 4) };
    var left = Math.random() < 0.5;
    return {
      x: left ? rand(-3, 33) : rand(67, 103),
      top: rand(4, 38)                 /* canopy height */
    };
  }

  /* Builds the particle elements for one container. */
  function fillParticles(host, season, inScene) {
    host.textContent = "";
    if (REDUCED) return;

    var config = PARTICLES[season];
    var count = inScene ? config.login : config.portal;
    /* over the portal the particles cross real content, so they are
       smaller and much fainter than the ones in the sign-in scene */
    var scale = inScene ? 1 : .78;
    var fade  = inScene ? 1 : .5;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var at = spawn(config.shape, inScene);
      var size = rand(config.size[0], config.size[1]) * scale;
      var fall = rand(config.fall[0], config.fall[1]);

      var particle = document.createElement("span");
      particle.className = "sn-p";
      particle.style.cssText =
        "--p-x:"       + at.x.toFixed(2) + "%;" +
        "--p-top:"     + at.top.toFixed(2) + "%;" +
        "--p-size:"    + size.toFixed(1) + "px;" +
        "--p-dur:"     + fall.toFixed(2) + "s;" +
        /* negative delay: the fall is already in progress on the
           first frame, so nothing "starts" in unison */
        "--p-delay:"   + (-rand(0, fall)).toFixed(2) + "s;" +
        "--p-drift:"   + (rand(config.drift[0], config.drift[1]) * (Math.random() < .5 ? -1 : 1)).toFixed(0) + "px;" +
        "--p-opacity:" + (rand(config.alpha[0], config.alpha[1]) * fade).toFixed(2) + ";";

      var shape = document.createElement("span");
      shape.className = "sn-p__shape sn-p__shape--" + config.shape;
      shape.style.setProperty("--p-spin", rand(config.spin[0], config.spin[1]).toFixed(2) + "s");
      if (Math.random() < .5) shape.style.animationDirection = "reverse";

      particle.appendChild(shape);
      fragment.appendChild(particle);
    }
    host.appendChild(fragment);
  }

  /* How far a particle has to travel before it leaves the frame.
     Measured rather than guessed so the fall reads at any height. */
  function measureDrop(host) {
    var height = host.clientHeight || window.innerHeight;
    host.style.setProperty("--sn-drop", (height + 90) + "px");
  }


  /* ==========================================================
     4. TREE ARTWORK
     Two hand-drawn silhouettes. The trunk and limbs are painted
     with the season's bark colours, the canopy with its foliage
     colours; winter simply drops the canopy opacity and reveals
     the snow caps (both handled in season.css).
     ========================================================== */

  function limbs(paths) {
    return paths.map(function (p) {
      return '<path class="sn-limb" d="' + p[0] + '" stroke-width="' + p[1] + '"/>';
    }).join("");
  }

  /* A canopy is a handful of leaf masses. Each mass is scattered
     into many small ellipses in three tones, which reads as
     foliage; a single big blob reads as a bokeh circle. */
  function cluster(cx, cy, rx, ry, count) {
    var out = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx +
              '" ry="' + ry + '" fill="var(--sn-leaf-3)" opacity=".5"/>';
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var reach = Math.sqrt(Math.random());
      var x = cx + Math.cos(angle) * rx * reach * .82;
      var y = cy + Math.sin(angle) * ry * reach * .82;
      var r = rx * rand(.22, .40);
      var tone = Math.random() < .42 ? "2" : (Math.random() < .55 ? "1" : "3");
      out += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) +
             '" rx="' + r.toFixed(1) + '" ry="' + (r * rand(.72, .92)).toFixed(1) +
             '" fill="var(--sn-leaf-' + tone + ')" opacity="' + rand(.62, .95).toFixed(2) + '"/>';
    }
    return out;
  }

  function canopy(masses) {
    return masses.map(function (m) {
      return cluster(m[0], m[1], m[2], m[3], m[4]);
    }).join("");
  }

  function caps(list) {
    return list.map(function (c) {
      return '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="' + c[2] + '" ry="' + c[3] + '"/>';
    }).join("");
  }

  /* left-hand tree — tall, leaning into the frame */
  var TREE_L =
    '<svg class="sn-tree sn-tree--l" viewBox="0 0 260 640" preserveAspectRatio="xMinYMax meet" aria-hidden="true">' +
      '<path class="sn-trunk" d="M58 640c4-74 10-138 19-188 5-32 7-58 7-82h15c0 26 3 52 8 84 8 50 16 112 20 186z"/>' +
      limbs([
        ["M86 452C104 438 124 428 142 420", 8],
        ["M88 476C74 462 58 452 40 444", 7],
        ["M85 404C104 384 122 370 140 356", 7],
        ["M84 386C70 366 58 350 46 332", 6],
        ["M86 356C88 322 90 296 92 268", 8],
        ["M90 316C108 300 124 288 138 274", 5.5],
        ["M89 296C75 278 64 264 54 248", 5],
        ["M92 268C94 242 96 224 98 204", 6],
        ["M95 236C112 222 124 210 134 196", 4.5],
        ["M94 222C80 208 70 196 62 182", 4],
        ["M98 204C100 186 102 172 104 158", 4.5],
        ["M101 180C114 170 122 160 130 150", 3],
        ["M100 166C90 156 84 148 78 138", 2.6]
      ]) +
      '<g class="sn-canopy">' +
        canopy([
          [126, 392, 54, 40, 16], [46, 404, 44, 32, 12],
          [136, 300, 48, 36, 14], [44, 292, 40, 30, 11],
          [104, 232, 52, 40, 15], [140, 214, 36, 28, 10],
          [62, 204, 34, 26, 9],   [104, 148, 42, 32, 12],
          [86, 330, 46, 34, 13],  [128, 156, 28, 22, 7]
        ]) +
        '<g class="sn-snow-caps">' +
          caps([[126, 366, 46, 12], [46, 380, 36, 10], [136, 276, 40, 11],
                [104, 206, 44, 12], [104, 126, 34, 10], [86, 306, 38, 10]]) +
        '</g>' +
      '</g>' +
    '</svg>';

  /* right-hand tree — broader, shorter, mirrored lean */
  var TREE_R =
    '<svg class="sn-tree sn-tree--r" viewBox="0 0 260 640" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">' +
      '<path class="sn-trunk" d="M202 640c-4-74-10-138-19-188-5-32-7-58-7-82h-15c0 26-3 52-8 84-8 50-16 112-20 186z"/>' +
      limbs([
        ["M174 458C156 444 136 434 118 426", 8],
        ["M172 482C186 468 202 458 220 450", 7],
        ["M175 410C156 390 138 376 120 362", 7],
        ["M176 392C190 372 202 356 214 338", 6],
        ["M174 362C172 328 170 302 168 274", 8],
        ["M170 322C152 306 136 294 122 280", 5.5],
        ["M171 302C185 284 196 270 206 254", 5],
        ["M168 274C166 248 164 230 162 210", 6],
        ["M165 242C148 228 136 216 126 202", 4.5],
        ["M166 228C180 214 190 202 198 188", 4],
        ["M162 210C160 192 158 178 156 164", 4.5],
        ["M159 186C146 176 138 166 130 156", 3]
      ]) +
      '<g class="sn-canopy">' +
        canopy([
          [134, 398, 52, 38, 15], [214, 410, 42, 32, 11],
          [124, 306, 46, 34, 13], [216, 298, 38, 28, 10],
          [156, 238, 50, 38, 14], [120, 220, 34, 26, 9],
          [198, 210, 32, 24, 8],  [156, 156, 40, 30, 11],
          [174, 336, 44, 32, 12]
        ]) +
        '<g class="sn-snow-caps">' +
          caps([[134, 372, 44, 12], [214, 386, 34, 10], [124, 282, 38, 11],
                [156, 212, 42, 12], [156, 134, 32, 10], [174, 312, 36, 10]]) +
        '</g>' +
      '</g>' +
    '</svg>';


  /* ==========================================================
     5. MOUNTING
     ========================================================== */

  var sceneFall = null;   /* particle host inside the sign-in scene */
  var portalFall = null;  /* particle host over the portal */

  /* The scene is appended to <main class="auth"> — the whole
     sign-in screen — and is absolutely positioned, so it takes no
     part in that grid and cannot move either column. Both columns
     are then floated above it as glass panels. */
  function mountScene() {
    var panel = document.querySelector(".auth");
    if (!panel || panel.querySelector(".sn-scene")) return;

    var scene = document.createElement("div");
    scene.className = "sn-scene";
    scene.setAttribute("aria-hidden", "true");
    scene.innerHTML =
      '<div class="sn-sky"></div>' +
      '<div class="sn-stars"></div>' +
      '<div class="sn-bloom"></div>' +
      '<div class="sn-orb"></div>' +
      '<div class="sn-land">' +
        '<div class="sn-hills"></div>' +
        '<div class="sn-ground"></div>' +
        '<div class="sn-snow-bed"></div>' +
        TREE_L + TREE_R +
      '</div>' +
      '<div class="sn-fall" data-sn-fall></div>' +
      '<div class="sn-vignette"></div>';

    panel.insertBefore(scene, panel.firstChild);
    sceneFall = scene.querySelector("[data-sn-fall]");
  }

  /* The portal gets particles only — no sky, no ground, no trees. */
  function mountPortal() {
    if (document.querySelector(".sn-portal")) return;
    var layer = document.createElement("div");
    layer.className = "sn-portal";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = '<div class="sn-fall" data-sn-portal-fall></div>';
    document.body.appendChild(layer);
    portalFall = layer.querySelector("[data-sn-portal-fall]");
  }


  /* ==========================================================
     6. SEASON PICKER
     ========================================================== */

  var GLYPH = {
    random: "\uD83C\uDFB2", current: "\uD83D\uDCC5",
    spring: "\uD83C\uDF38", summer: "\u2600\uFE0F",
    autumn: "\uD83C\uDF42", winter: "\u2744\uFE0F"
  };

  var picker, pickerGlyph;

  function mountPicker() {
    if (document.querySelector(".sn-picker")) return;

    picker = document.createElement("div");
    picker.className = "sn-picker";
    picker.innerHTML =
      '<span class="sn-picker__glyph" data-sn-glyph aria-hidden="true"></span>' +
      '<select class="sn-picker__select" aria-label="Background season">' +
        '<option value="random">' + GLYPH.random + ' Random</option>' +
        '<option value="current">' + GLYPH.current + ' Current season</option>' +
        '<option value="spring">' + GLYPH.spring + ' Spring</option>' +
        '<option value="summer">' + GLYPH.summer + ' Summer</option>' +
        '<option value="autumn">' + GLYPH.autumn + ' Autumn</option>' +
        '<option value="winter">' + GLYPH.winter + ' Winter</option>' +
      '</select>';

    document.body.appendChild(picker);
    pickerGlyph = picker.querySelector("[data-sn-glyph]");

    var select = picker.querySelector("select");
    select.value = mode;                       /* Current season is the default */
    select.addEventListener("change", function () {
      mode = select.value;                     /* stays until changed or reloaded */
      apply(true);
    });
  }


  /* ==========================================================
     7. APPLY, SCREEN WATCHER, CLOCK
     ========================================================== */

  var shownSeason = null;

  /* Writes the season and the hour onto <html>; season.css does
     the rest. Particles are rebuilt only when the season really
     changed, so the clock tick costs nothing. */
  function apply(force) {
    var season = resolveSeason();
    var band = timeOfDay(new Date());

    root.setAttribute("data-season", season);
    root.setAttribute("data-time", band);
    if (pickerGlyph) pickerGlyph.textContent = GLYPH[season];

    if (force || season !== shownSeason) {
      shownSeason = season;
      if (sceneFall)  { measureDrop(sceneFall);  fillParticles(sceneFall, season, true); }
      if (portalFall) { measureDrop(portalFall); fillParticles(portalFall, season, false); }
    }
  }

  /* Which screen is up. script.js toggles the hidden attribute on
     #login and #app; we only observe that, never change it. */
  function syncScreen() {
    var login = document.getElementById("login");
    var app = document.getElementById("app");
    var screen = "boot";
    if (login && !login.hidden) screen = "login";
    else if (app && !app.hidden) screen = "app";
    root.setAttribute("data-sn-screen", screen);

    /* the panel has no height while it is hidden, so measure on show */
    if (screen === "login" && sceneFall) measureDrop(sceneFall);
  }

  function debounce(fn, ms) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  function start() {
    mountScene();
    mountPortal();
    mountPicker();
    apply(true);
    syncScreen();

    /* screen changes: boot -> login -> portal -> login */
    var watcher = new MutationObserver(syncScreen);
    ["login", "app"].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) watcher.observe(node, { attributes: true, attributeFilter: ["hidden"] });
    });

    /* the hour rolls over on its own — no reload needed, and the
       season is left exactly as it was */
    setInterval(apply, 60000);

    var remeasure = debounce(function () {
      if (sceneFall)  measureDrop(sceneFall);
      if (portalFall) measureDrop(portalFall);
    }, 220);
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("orientationchange", remeasure);

    /* stop animating in a background tab */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) root.setAttribute("data-sn-paused", "");
      else root.removeAttribute("data-sn-paused");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
