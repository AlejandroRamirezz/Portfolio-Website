/* ═══════════════════════════════════════════
   Alejandro Ramirez — Portfolio · script.js
═══════════════════════════════════════════ */

/* ── Mobile menu ── */
function toggleMenu() {
  const m = document.getElementById("mobile-menu");
  m.classList.toggle("open");
}

/* ── Form submit → Formspree ── */
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;

  btn.textContent = "Sending…";
  btn.disabled = true;
  btn.style.opacity = "0.7";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      btn.textContent = "✓ Message sent!";
      btn.style.background = "#16a34a";
      btn.style.opacity = "1";
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = "";
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error("Server error");
    }
  } catch {
    btn.textContent = "✗ Something went wrong — try emailing me directly";
    btn.style.background = "#7f1d1d";
    btn.style.opacity = "1";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "";
      btn.disabled = false;
    }, 5000);
  }
}

/* ── Scroll reveal ── */
function initReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => revealObs.observe(el));
}

/* ── Animated progress bars ── */
function initProgressBars() {
  const progFills = document.querySelectorAll(".prog-fill");
  const progObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute("data-w") + "%";
          entry.target.style.width = target;
          progObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  progFills.forEach((el) => progObs.observe(el));
}

/* ── Active nav highlight on scroll ── */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => navObs.observe(s));
}

/* ── Boot ── */
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initProgressBars();
  initActiveNav();
});
