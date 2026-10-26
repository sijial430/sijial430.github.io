// Redesigned homepage: theme switch, abstract/bibtex toggles, author expansion.
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var tint = document.querySelector('meta[name="theme-color"]');
    if (tint) tint.content = getComputedStyle(root).getPropertyValue("--bg").trim() || (theme === "dark" ? "#1d1730" : "#faf9f5");
    if (toggle) {
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  if (toggle) {
    applyTheme(root.getAttribute("data-theme") || "light");
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // [abs] and [bib]: show one panel per paper at a time.
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("data-toggle"));
      if (!panel) return;
      var opening = panel.hidden;
      var row = btn.closest(".pub-row");
      if (row) {
        row.querySelectorAll("[data-toggle]").forEach(function (other) {
          var p = document.getElementById(other.getAttribute("data-toggle"));
          if (p) p.hidden = true;
          other.setAttribute("aria-expanded", "false");
        });
      }
      panel.hidden = !opening;
      btn.setAttribute("aria-expanded", opening ? "true" : "false");
    });
  });

  // "+N more" on long author lists.
  document.querySelectorAll("[data-expand-authors]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".pub-authors");
      if (!wrap) return;
      wrap.querySelector(".authors-short").hidden = true;
      wrap.querySelector(".authors-full").hidden = false;
    });
  });
})();
