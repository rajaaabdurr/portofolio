// ✨ Typing Effect
const typingEl = document.getElementById("typing");
if (typingEl) {
  const typingText = "Web Developer • Designer • Learner";
  let tIndex = 0;
  function typeEffect() {
    typingEl.textContent = typingText.slice(0, tIndex);
    if (tIndex < typingText.length) {
      tIndex++;
      setTimeout(typeEffect, 80);
    }
  }
  typeEffect();
}

// ✨ Fade on Scroll
function showOnScroll() {
  const fadeElements = document.querySelectorAll(".fade");
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("load", showOnScroll);
window.addEventListener("scroll", showOnScroll);

// ✨ Gallery Slider
const slides = [
  "gambar/project1.png",
  "gambar/project2.png",
  "gambar/project3.png",
  "gambar/project4.png",
  "gambar/project5.png"
];
let currentSlide = 0;
const slideImage = document.getElementById("slideImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateSlide() {
  if (slideImage) {
    slideImage.src = slides[currentSlide];
  }
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}
if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);
updateSlide();
setInterval(nextSlide, 2000);

// ✨ Navbar shrink + active section
function updateNavbar() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("shrink", window.scrollY > 60);
  }

  const sections = document.querySelectorAll("section, header");
  let currentSection = "home";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) {
      currentSection = sec.getAttribute("id") || "home";
    }
  });

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === `${currentSection}.html` || href === `#${currentSection}`);
  });
}
window.addEventListener("scroll", updateNavbar);
window.addEventListener("load", updateNavbar);

// ✨ Modular loader
const mainContent = document.getElementById("mainContent");
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.endsWith(".html") && mainContent) {
      e.preventDefault();
      fetch(href)
        .then(res => res.text())
        .then(data => {
          mainContent.innerHTML = data;
          window.scrollTo({ top: mainContent.offsetTop, behavior: "smooth" });
          showOnScroll();
        })
        .catch(err => console.error("Gagal load konten:", err));
    }
  });
});

// ✨ Back to top
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  if (topBtn) {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});
if (topBtn) {
  topBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// ✨ Tahun otomatis
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ✨ Navbar hide/show saat scroll (reusable)
function initScrollNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let prevScrollPos = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-80px";
    }
    prevScrollPos = currentScrollPos;
  });
}

// ✨ Panggil setelah navbar dimuat
const navbarContainer = document.getElementById("navbar");
if (navbarContainer) {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      navbarContainer.innerHTML = data;
      initScrollNavbar(); // aktifkan scroll logic
    });
}
