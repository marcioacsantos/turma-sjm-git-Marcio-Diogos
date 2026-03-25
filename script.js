// =========================================
// TETPSI — script.js
// =========================================

console.log("TETPSI JS ligado ✓");

// ── NAV MOBILE TOGGLE ──
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Fechar ao clicar num link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ── NAVBAR SCROLL SHADOW ──
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? "0 2px 20px rgba(0,0,0,.1)"
      : "none";
  });
}

// ── CONTACT FORM VALIDATION ──
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nomeInput   = document.getElementById("nome");
  const emailInput  = document.getElementById("email");
  const erroNome    = document.getElementById("erroNome");
  const erroEmail   = document.getElementById("erroEmail");
  const formSuccess = document.getElementById("formSuccess");

  function showError(field, errorEl) {
    field.style.borderColor = "#e53e3e";
    errorEl.classList.add("visible");
  }

  function clearError(field, errorEl) {
    field.style.borderColor = "";
    errorEl.classList.remove("visible");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validação em tempo real
  nomeInput.addEventListener("input", () => {
    if (nomeInput.value.trim() !== "") clearError(nomeInput, erroNome);
  });

  emailInput.addEventListener("input", () => {
    if (isValidEmail(emailInput.value.trim())) clearError(emailInput, erroEmail);
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    if (nomeInput.value.trim() === "") {
      showError(nomeInput, erroNome);
      valid = false;
    } else {
      clearError(nomeInput, erroNome);
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, erroEmail);
      valid = false;
    } else {
      clearError(emailInput, erroEmail);
    }

    if (!valid) return;

    // Sucesso
    formSuccess.classList.add("visible");
    contactForm.reset();

    // Esconder a mensagem de sucesso após 5 segundos
    setTimeout(() => formSuccess.classList.remove("visible"), 5000);
  });
}

// ── PROJECTS FILTER ──
const filterBtns   = document.querySelectorAll(".filter-btn");
const projetoCards = document.querySelectorAll(".projeto-card");

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Atualizar botão ativo
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projetoCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ── SCROLL REVEAL ANIMATION ──
const animTargets = document.querySelectorAll(
  ".card, .stat, .saida-item, .projeto-card, .info-item"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animTargets.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.05}s`;
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}
