function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}

function handleSignup() {
  const email = document.getElementById("emailInput").value;
  if (email && email.includes("@")) {
    showToast("🎉 Welcome to Breezy! Check your inbox (or just inhale).");
    document.getElementById("emailInput").value = "";
  } else {
    showToast(
      "⚠️ Please enter a valid email. We need it for... air reasons.",
    );
  }
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains("open");
  document
    .querySelectorAll(".faq-q")
    .forEach((q) => q.classList.remove("open"));
  document
    .querySelectorAll(".faq-a")
    .forEach((a) => a.classList.remove("open"));
  if (!isOpen) {
    btn.classList.add("open");
    answer.classList.add("open");
  }
}

// MORE dropdown
function toggleMore() {
  const btn = document.querySelector(".more-btn");
  const dd = document.getElementById("moreDropdown");
  btn.classList.toggle("open");
  dd.classList.toggle("open");
}
// Close MORE on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".more-wrap")) {
    document.querySelector(".more-btn")?.classList.remove("open");
    document.getElementById("moreDropdown")?.classList.remove("open");
  }
});

// Mobile menu
function toggleMobileMenu() {
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");
  btn.classList.toggle("open");
  menu.classList.toggle("open");
  document.body.style.overflow = menu.classList.contains("open")
    ? "hidden"
    : "";
}
function closeMobile() {
  document.getElementById("hamburgerBtn").classList.remove("open");
  document.getElementById("mobileMenu").classList.remove("open");
  document.body.style.overflow = "";
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (target)
      target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Timeline entrance animation (staggered fade/slide via CSS delays)
(() => {
  const tl = document.querySelector(".timeline");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!tl || !("IntersectionObserver" in window) || reduceMotion) return;
  tl.classList.add("tl-animate");
  new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        tl.classList.add("tl-in");
        obs.disconnect();
      }
    },
    { threshold: 0.35 },
  ).observe(tl);
})();
