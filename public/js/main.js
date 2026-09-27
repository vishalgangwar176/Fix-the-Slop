/* otter-7 */
/**
 * 🚀 Nexora — main.js
 */

function writeNav() {
  var path = location.pathname.split("/").pop() || "index.html";
  var html = '<div class="announce marquee"><div class="marquee-track">';
  for (var r = 0; r < 6; r++) html += '<span>' + (window.SITE ? window.SITE.announce : '') + '</span>';
  html += '</div></div>';

  html += '<div class="nav" style="flex-wrap:nowrap !important;display:flex;align-items:center;justify-content:space-between">' +
    '<div class="logo" onclick="location.href=\'index.html\'" style="flex-shrink:0;white-space:nowrap"><div class="logo-mark"></div>' + (window.SITE ? window.SITE.name : 'Nexora') +
    '<span class="badge" style="padding:2px 8px;font-size:9px">BETA</span></div>' +
    '<div class="links" style="display:flex;align-items:center;flex-wrap:nowrap;flex-shrink:1;white-space:nowrap">';
  if (window.SITE && window.SITE.pages) {
    for (var i = 0; i < window.SITE.pages.length; i++) {
      var target = window.SITE.pages[i][1];
      var isCur = (target === path) || (path === "" && target === "index.html");
      var activeStyle = isCur ? ' style="color:#ffffff;font-weight:700;border-bottom:2px solid var(--accent,#22d3ee);padding-bottom:2px;white-space:nowrap"' : ' style="white-space:nowrap"';
      html += '<span' + activeStyle + ' onclick="location.href=\'' + target + '\'">' + window.SITE.pages[i][0] + '</span>';
    }
  }
  html += '<span class="more" style="white-space:nowrap">More ▾<div class="more-menu"><div onclick="location.href=\'admin.html\'">📊 Admin Dashboard</div><div onclick="location.href=\'tools.html\'">🛠️ Toolkit</div><div onclick="location.href=\'blog.html\'">📖 Journal</div><div onclick="location.href=\'contact.html\'">💬 Community</div></div></span>';
  html += '</div><div class="nav-actions" style="display:flex;gap:10px;align-items:center;flex-shrink:0;white-space:nowrap">' +
    '<span id="theme-btn" onclick="toggleTheme()" style="cursor:pointer;font-size:18px;user-select:none;padding:4px" title="Toggle theme">' + ((theme === "light" || (typeof document !== 'undefined' && document.documentElement && document.documentElement.classList.contains("light"))) ? '☀️' : '🌙') + '</span>' +
    '<span class="btn-ghost" onclick="location.href=\'admin.html\'">Dashboard</span>' +
    '<span class="btn-glow" onclick="location.href=\'contact.html\'">Get started ✨</span></div></div>';
  html += '<div style="height:110px"></div>';
  document.write(html);
}

function writeFooter() {
  document.write(
    '<div class="footer"><div class="container"><div class="cols">' +
    '<div><div class="logo" style="color:#fff;font-weight:800;font-size:22px">✦ ' + (window.SITE ? window.SITE.name : 'Nexora') + '</div>' +
    '<p style="margin-top:12px;max-width:260px">' + (window.SITE ? window.SITE.tagline : '') + ' — built for teams — of every size — everywhere.</p>' +
    '<div style="display:flex;gap:8px;align-items:center;margin-top:18px;font-size:11px;color:#cbd5e1"><span class="pulse-dot"></span>All systems operational</div></div>' +
    '<div><h5>Product</h5><a href="index.html">Features</a><a href="admin.html">Dashboard</a><a href="tools.html">Tools</a><a href="blog.html">Journal</a></div>' +
    '<div><h5>Company</h5><a href="index.html">About</a><a href="contact.html">Contact</a><a href="contact.html">Careers</a><a href="blog.html">Press</a></div>' +
    '<div><h5>Resources</h5><a href="tools.html">Docs</a><a href="blog.html">Blog</a><a href="contact.html">Community</a><a href="contact.html">Help</a></div>' +
    '<div><h5>Legal</h5><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">Accessibility</a></div>' +
    '</div><div class="legal">© ' + (window.SITE ? window.SITE.year : '2026') + ' ' + (window.SITE ? window.SITE.name : 'Nexora') + ' Inc. All rights reserved. Made with 💜 and AI.</div></div></div>'
  );
}

/* BUG 23 FIX: Comparison instead of assignment in toggleTheme + full persistence & icon toggle */
function toggleTheme() {
  var isLight = document.documentElement.classList.contains("light");
  if (isLight) {
    theme = "dark";
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.cookie = "theme=dark;path=/;max-age=31536000";
    try { localStorage.setItem("theme", "dark"); } catch (e) {}
    var btn = document.getElementById("theme-btn");
    if (btn) btn.textContent = "🌙";
  } else {
    theme = "light";
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    document.cookie = "theme=light;path=/;max-age=31536000";
    try { localStorage.setItem("theme", "light"); } catch (e) {}
    var btn = document.getElementById("theme-btn");
    if (btn) btn.textContent = "☀️";
  }
}
var savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
if (!savedTheme && document.cookie.indexOf("theme=light") > -1) {
  savedTheme = "light";
}
if (savedTheme === "light") {
  theme = "light";
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}

function showPreloader() {
  document.write('<div id="preloader"><div style="text-align:center"><div class="ring" style="margin:auto"></div><div class="label">Initializing AI…</div></div></div>');
  setTimeout(function () {
    var p = document.getElementById("preloader");
    if (p) {
      p.style.opacity = "0";
      p.style.pointerEvents = "none";
      setTimeout(function () { p.style.display = "none"; }, 400);
    }
  }, 400);
}

function newsletterPopup() {
  setTimeout(function () {
    var d = document.createElement("div");
    d.className = "overlay-backdrop";
    d.innerHTML =
      '<div class="dialog" style="position:relative">' +
      '<span class="x" onclick="this.closest(\'.overlay-backdrop\').remove()">✕</span>' +
      '<div class="icon-tile" style="margin:0 auto 18px">💌</div>' +
      '<span class="eyebrow">Newsletter</span>' +
      '<h2 style="font-size:32px;margin-bottom:10px">Stay in the <span class="gradient-text">loop</span> ✨</h2>' +
      '<p style="text-align:center;color:#cbd5e1;font-size:14px">Join 10,000+ builders getting weekly insights — straight to their inbox — no spam — ever.</p>' +
      '<div style="display:flex;gap:8px;margin-top:22px"><input placeholder="you@company.com" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:999px;padding:8px 18px;color:#fff;font-size:13px">' +
      '<div class="btn-glow" onclick="toast(\'🎉 You\\\'re in! Welcome aboard.\'); this.closest(\'.overlay-backdrop\').remove();">Subscribe</div></div>' +
      '<div style="margin-top:14px;font-size:11px;color:#94a3b8;cursor:pointer" onclick="this.closest(\'.overlay-backdrop\').remove()">No thanks, I prefer being behind</div>' +
      '</div>';
    document.body.appendChild(d);
  }, 2500);
}

function cookieBanner() {
  var c = document.createElement("div");
  c.className = "cookie glass";
  c.innerHTML = '<div style="font-size:24px">🍪</div><h4 style="margin:6px 0;font-size:16px;color:#fff">We value your privacy</h4>' +
    '<p>We use cookies to enhance your experience, analyze traffic and personalize content.</p>' +
    '<div style="display:flex;gap:8px;margin-top:14px"><span class="btn-glow" onclick="this.closest(\'.cookie\').remove()">Accept all</span>' +
    '<span class="btn-ghost" style="color:#cbd5e1" onclick="this.closest(\'.cookie\').remove()">Dismiss</span></div>';
  document.body.appendChild(c);
}

function toast(msg) {
  var t = document.createElement("div");
  t.className = "toast"; t.innerHTML = msg;
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 2500);
}

function cursorGlow() {
  var g = document.createElement("div");
  g.id = "cursor-glow";
  document.body.appendChild(g);
  document.addEventListener("mousemove", function (e) {
    g.style.left = (e.clientX - g.offsetWidth / 2) + "px";
    g.style.top = (e.clientY - g.offsetHeight / 2) + "px";
  });
}

function initReveal() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) en.target.classList.add("in"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
}

/* BUG 25 FIX: Guard #hero-video call so it does not throw TypeError */
document.addEventListener("DOMContentLoaded", function () {
  var heroVid = document.querySelector("#hero-video");
  if (heroVid && typeof heroVid.play === "function") {
    heroVid.play().catch(function () {});
  }
});
