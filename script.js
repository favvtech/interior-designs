// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Animate hamburger bars
    const bars = navToggle.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0)
          bar.style.transform = "rotate(45deg) translate(5px, 5px)";
        if (index === 1) bar.style.opacity = "0";
        if (index === 2)
          bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      }
    });
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const bars = navToggle.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
  });
});

// Hero Carousel
const heroSlides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;

if (heroSlides.length > 0) {
  function showSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Add active class to current slide and indicator
    heroSlides[index].classList.add("active");
    if (indicators[index]) {
      indicators[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Add click handlers to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// Contact Form Handling
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission (in real implementation, this would send to a server)
    const submitButton = this.querySelector(".send-message-btn");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// Package Selection
const packageButtons = document.querySelectorAll(".package-button");
packageButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const packageCard = this.closest(".package-card");
    const packageName = packageCard.querySelector("h3").textContent;
    const packagePrice = packageCard.querySelector(".price").textContent;

    // In a real implementation, this would redirect to a booking/contact form
    alert(
      `You selected the ${packageName} package (${packagePrice}). Redirecting to contact form...`
    );

    // Simulate redirect to contact page
    setTimeout(() => {
      window.location.href = "contact.html";
    }, 1000);
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll to Top Functionality
let scrollToTopButton;

function createScrollToTopButton() {
  scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = "↑";
  scrollToTopButton.className = "scroll-to-top";
  scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #E67E22;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollToTopButton);
}

// Show/Hide Scroll to Top Button
function toggleScrollToTopButton() {
  if (window.pageYOffset > 300) {
    if (scrollToTopButton) {
      scrollToTopButton.style.opacity = "1";
      scrollToTopButton.style.visibility = "visible";
    }
  } else {
    if (scrollToTopButton) {
      scrollToTopButton.style.opacity = "0";
      scrollToTopButton.style.visibility = "hidden";
    }
  }
}

// Initialize scroll to top functionality
window.addEventListener("load", () => {
  createScrollToTopButton();
});

window.addEventListener("scroll", toggleScrollToTopButton);

// Portfolio Hover Effects (Enhanced)
const portfolioItems = document.querySelectorAll(".portfolio-item");
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Service Cards Hover Animation
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
window.addEventListener("load", () => {
  const animatedElements = document.querySelectorAll(
    ".approach-item, .service-card, .portfolio-item, .process-step, .package-card, .service-item"
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// Loading Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Form Input Focus Effects
const formInputs = document.querySelectorAll("input, textarea");
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (
      (currentPage === "index.html" || currentPage === "") &&
      (href === "index.html" || href === "#home")
    ) {
      link.classList.add("active");
    } else if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// Initialize active nav link on page load
window.addEventListener("load", updateActiveNavLink);

// Preload Images for Better Performance
function preloadImages() {
  const images = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
window.addEventListener("load", preloadImages);

// Dynamic Image Loading for Portfolio Section using Unsplash API
async function loadPortfolioImages() {
  const portfolioItems = document.querySelectorAll(".portfolio-item img");

  console.log("Found portfolio items:", portfolioItems.length);

  if (portfolioItems.length === 0) return;

  const API_KEY = "Qt3MkSfmtAmiwiS_IlIlBULWj_tUvol242S9N8Es2O0";
  const BASE_URL = "https://api.unsplash.com/search/photos";

  try {
    console.log("Starting dynamic image fetching...");

    // Fetch images for each portfolio item
    for (let i = 0; i < portfolioItems.length; i++) {
      const img = portfolioItems[i];
      const searchTerm = img.getAttribute("data-search");

      if (searchTerm) {
        console.log(`Fetching image for: ${searchTerm}`);

        const response = await fetch(
          `${BASE_URL}?query=${encodeURIComponent(
            searchTerm
          )}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const imageData = data.results[0];
            img.src = imageData.urls.regular;
            img.alt = imageData.alt_description || img.alt;
            console.log(`✅ Loaded image for ${searchTerm}`);
          } else {
            console.log(`❌ No results for ${searchTerm}`);
          }
        } else {
          console.log(`❌ API error for ${searchTerm}:`, response.status);
        }
      }
    }

    console.log("🎉 All portfolio images loaded successfully!");
  } catch (error) {
    console.log("❌ Error fetching portfolio images:", error);
  }
}

// Initialize dynamic image loading
window.addEventListener("load", loadPortfolioImages);

// Dynamic Footer Updates
function updateFooterInfo() {
  // Update current year
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll("#current-year");
  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });

  // Update last modified timestamp
  const now = new Date();
  const lastModified = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const lastModifiedElements = document.querySelectorAll("#last-modified");
  lastModifiedElements.forEach((element) => {
    element.textContent = lastModified;
  });
}

// Initialize footer updates
window.addEventListener("load", updateFooterInfo);
