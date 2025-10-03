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

// Projects Hover Effects (Enhanced)
const portfolioItems = document.querySelectorAll(".portfolio-item");
portfolioItems.forEach((item) => {
  const overlay = item.querySelector(".portfolio-overlay");
  item.addEventListener("mouseenter", () => {
    overlay.classList.add("visible");
  });
  item.addEventListener("mouseleave", () => {
    overlay.classList.remove("visible");
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

// Dynamic Image Loading for Projects Section using Unsplash API
async function loadPortfolioImages() {
  const portfolioItems = document.querySelectorAll(".portfolio-item img");

  console.log("Found portfolio items:", portfolioItems.length);

  if (portfolioItems.length === 0) return;

  const API_KEY = "Qt3MkSfmtAmiwiS_IlIlBULWj_tUvol242S9N8Es2O0";
  const BASE_URL = "https://api.unsplash.com/search/photos";

  try {
    console.log("Starting dynamic image fetching...");

    // Fetch images for each project item
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

    console.log("🎉 All project images loaded successfully!");
  } catch (error) {
    console.log("❌ Error fetching project images:", error);
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

// Mobile Projects Overlay on Scroll
function initMobilePortfolioOverlay() {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (portfolioItems.length === 0) return;

  // Check if we're on mobile
  const isMobile = window.innerWidth <= 767;

  if (!isMobile) return;

  const observerOptions = {
    // Create a centered band by shrinking the root area from top and bottom
    // Only when the element's center enters this band it will intersect
    root: null,
    rootMargin: "-35% 0px -35% 0px",
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const portfolioItem = entry.target;
      const overlay = portfolioItem.querySelector(".portfolio-overlay");

      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        // Hide all other overlays first (but not the current one)
        portfolioItems.forEach((otherItem) => {
          if (otherItem !== portfolioItem) {
            const otherOverlay = otherItem.querySelector(".portfolio-overlay");
            if (otherOverlay) {
              otherOverlay.style.opacity = "0";
              otherOverlay.style.transform = "translateY(10px)";
            }
            otherItem.style.transform = "scale(1)";
          }
        });

        // Show current overlay with animation
        overlay.style.opacity = "1";
        overlay.style.transform = "translateY(0)";

        // Add a subtle pulse effect
        portfolioItem.style.transform = "scale(1.02)";
        setTimeout(() => {
          portfolioItem.style.transform = "scale(1)";
        }, 300);
      } else {
        // Hide overlay when leaving the band
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.transform = "translateY(10px)";
        }
        portfolioItem.style.transform = "scale(1)";
      }
    });
  }, observerOptions);

  // Observe all project items
  portfolioItems.forEach((item) => {
    observer.observe(item);

    // Set initial state
    const overlay = item.querySelector(".portfolio-overlay");
    if (overlay) {
      overlay.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      overlay.style.opacity = "0";
      overlay.style.transform = "translateY(10px)";
    }
  });
}

// Initialize mobile portfolio overlay
window.addEventListener("load", initMobilePortfolioOverlay);

// Re-initialize on window resize
window.addEventListener("resize", () => {
  // Clear existing observers
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => {
    const overlay = item.querySelector(".portfolio-overlay");
    if (overlay) {
      overlay.style.transition = "";
      overlay.style.opacity = "";
      overlay.style.transform = "";
    }
  });

  // Re-initialize
  setTimeout(initMobilePortfolioOverlay, 100);
});

// Projects data (25 items)
const PROJECTS_DATA = [
  {
    title: "Minimalist Living Room",
    category: "Living Room",
    query: "minimalist living room interior design",
    description: "Clean lines and warm neutrals with textured fabrics.",
    details: "Lagos • Minimalist • Oak + Linen",
  },
  {
    title: "Modern Kitchen Renovation",
    category: "Kitchen",
    query: "bright modern kitchen marble countertops",
    description:
      "Maximized natural light with marble tops and custom cabinets.",
    details: "Lekki • Modern • Marble + Oak",
  },
  {
    title: "Cozy Bedroom Retreat",
    category: "Bedroom",
    query: "cozy bedroom interior warm lighting",
    description: "Soft textiles and layered lighting for calm evenings.",
    details: "Ikoyi • Contemporary • Cotton + Walnut",
  },
  {
    title: "Home Office Nook",
    category: "Home Office",
    query: "home office minimalist desk plants",
    description: "Focus-friendly workspace with ergonomic layout.",
    details: "Victoria Island • Minimalist • Pine + Matte Black",
  },
  {
    title: "Scandinavian Living Space",
    category: "Living Room",
    query: "scandinavian living room interior",
    description: "Light woods, soft greys, functional layout.",
    details: "Yaba • Scandinavian • Birch + Wool",
  },
  {
    title: "Sleek Chef's Kitchen",
    category: "Kitchen",
    query: "sleek kitchen island pendant lights",
    description: "Central island with pendant lighting and integrated storage.",
    details: "Ikeja • Modern • Quartz + Steel",
  },
  {
    title: "Serene Master Bedroom",
    category: "Bedroom",
    query: "serene master bedroom interior",
    description: "Muted palette with natural textures for rest.",
    details: "Lekki Phase 1 • Calm • Linen + Rattan",
  },
  {
    title: "Compact Home Office",
    category: "Home Office",
    query: "compact home office small space",
    description: "Smart storage and cable management in small footprint.",
    details: "Ajah • Compact • MDF + Felt",
  },
  {
    title: "Artful Living Room",
    category: "Living Room",
    query: "artful living room gallery wall",
    description: "Gallery wall centerpiece with plush seating.",
    details: "Surulere • Eclectic • Velvet + Brass",
  },
  {
    title: "Monochrome Kitchen",
    category: "Kitchen",
    query: "monochrome black white kitchen",
    description: "Black-and-white palette with matte finishes.",
    details: "VI • Monochrome • Granite + Matte Steel",
  },
  {
    title: "Warm Boho Bedroom",
    category: "Bedroom",
    query: "boho bedroom warm textures",
    description: "Rugs, throws, and plants for a soft boho vibe.",
    details: "Magodo • Boho • Jute + Cotton",
  },
  {
    title: "Executive Home Office",
    category: "Home Office",
    query: "executive home office wood panel",
    description: "Rich wood panels and acoustic treatment.",
    details: "Ikoyi • Executive • Walnut + Leather",
  },
  {
    title: "Sunlit Living Room",
    category: "Living Room",
    query: "sunlit living room large windows",
    description: "Open plan with wide glazing and airy drapes.",
    details: "Lekki • Airy • Sheer + Oak",
  },
  {
    title: "Family Kitchen Hub",
    category: "Kitchen",
    query: "family kitchen breakfast bar",
    description: "Breakfast bar and durable finishes for daily life.",
    details: "Yaba • Family • Laminate + Ceramic",
  },
  {
    title: "Hotel-Style Bedroom",
    category: "Bedroom",
    query: "hotel style bedroom interior",
    description: "Plush headboard, symmetrical lighting, and calm tones.",
    details: "VI • Luxe • Velvet + Satin",
  },
  {
    title: "Studio Workspace",
    category: "Home Office",
    query: "creative studio home office",
    description: "Flexible layout for creative sessions and calls.",
    details: "Ikeja • Creative • Cork + Birch",
  },
  {
    title: "Minimal Living Lounge",
    category: "Living Room",
    query: "minimal living room low sofa",
    description: "Low-profile seating and curated decor.",
    details: "Oniru • Minimal • Poplar + Linen",
  },
  {
    title: "Chef Prep Kitchen",
    category: "Kitchen",
    query: "chef prep kitchen butcher block",
    description: "Butcher block prep and utility lighting.",
    details: "Ogudu • Utility • Butcher Block + Steel",
  },
  {
    title: "Textured Bedroom",
    category: "Bedroom",
    query: "textured bedroom interior design",
    description: "Layered linens and ribbed wall panels.",
    details: "VGC • Textures • Ribbed MDF + Cotton",
  },
  {
    title: "Corner Office Nook",
    category: "Home Office",
    query: "corner home office window light",
    description: "Corner desk with views and storage.",
    details: "Yaba • Corner • Oak + Lacquer",
  },
  {
    title: "Contemporary Living",
    category: "Living Room",
    query: "contemporary living room interior",
    description: "Statement rug and balanced proportions.",
    details: "Ikoyi • Contemporary • Wool + Bronze",
  },
  {
    title: "Smart Kitchen",
    category: "Kitchen",
    query: "smart kitchen appliances interior",
    description: "Integrated smart appliances with tidy lines.",
    details: "Lekki 2 • Smart • Quartz + Glass",
  },
  {
    title: "Calming Bedroom",
    category: "Bedroom",
    query: "calming bedroom pastel",
    description: "Pastel hues and soft lighting for rest.",
    details: "Surulere • Calm • Pastel + Sheers",
  },
  {
    title: "Dual Monitor Setup",
    category: "Home Office",
    query: "dual monitor home office setup",
    description: "Productivity-focused dual screen arrangement.",
    details: "Ikate • Productivity • Laminate + Mesh",
  },
  {
    title: "Luxe Living Suite",
    category: "Living Room",
    query: "luxury living room interior",
    description: "High-end finishes with bespoke furniture.",
    details: "Banana Island • Luxury • Marble + Brass",
  },
];

const PROJECTS_STATE = {
  pageSize: 6,
  currentShown: 0,
  filtered: PROJECTS_DATA,
  category: "all",
  query: "",
};

function renderProjectsGrid() {
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");
  const seeMore = document.getElementById("projects-see-more");
  if (!grid) return;

  grid.innerHTML = "";
  const toShow = PROJECTS_STATE.filtered.slice(0, PROJECTS_STATE.currentShown);

  if (toShow.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }

  toShow.forEach((p) => {
    const card = document.createElement("div");
    card.className = "portfolio-item";

    const img = document.createElement("img");
    img.alt = p.title;
    img.loading = "lazy";
    img.setAttribute("data-search", p.query);

    const overlay = document.createElement("div");
    overlay.className = "portfolio-overlay";
    const h3 = document.createElement("h3");
    h3.textContent = p.title;
    const desc = document.createElement("p");
    desc.textContent = p.description + (p.details ? ` • ${p.details}` : "");

    overlay.appendChild(h3);
    overlay.appendChild(desc);
    card.appendChild(img);
    card.appendChild(overlay);
    grid.appendChild(card);
  });

  // Toggle see more
  if (PROJECTS_STATE.currentShown >= PROJECTS_STATE.filtered.length) {
    if (seeMore) seeMore.style.display = "none";
  } else {
    if (seeMore) seeMore.style.display = "inline-block";
  }
}

function updateNavCategoryLabel() {
  const el = document.getElementById("nav-category-label");
  if (!el) return;
  const base =
    PROJECTS_STATE.category === "all"
      ? "All category"
      : PROJECTS_STATE.category + " category";
  if (PROJECTS_STATE.query && PROJECTS_STATE.query.trim() !== "") {
    el.textContent = `Results for "${PROJECTS_STATE.query.trim()}"`;
  } else {
    el.textContent = base;
  }
}

function applyProjectsFilters() {
  const q = PROJECTS_STATE.query.trim().toLowerCase();
  PROJECTS_STATE.filtered = PROJECTS_DATA.filter((p) => {
    const catOk =
      PROJECTS_STATE.category === "all" ||
      p.category === PROJECTS_STATE.category;
    const text = `${p.title} ${p.description} ${p.details || ""}`.toLowerCase();
    const qOk = q === "" || text.includes(q);
    return catOk && qOk;
  });
  PROJECTS_STATE.currentShown = Math.min(
    PROJECTS_STATE.pageSize,
    PROJECTS_STATE.filtered.length
  );
  renderProjectsGrid();
  updateNavCategoryLabel();
  // Fetch images for newly rendered items
  setTimeout(loadPortfolioImages, 0);
}

function initProjectsControls() {
  const chips = document.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      PROJECTS_STATE.category = chip.getAttribute("data-category");
      PROJECTS_STATE.query = ""; // reset query when category changes
      const search = document.getElementById("projects-search");
      if (search) search.value = "";
      applyProjectsFilters();
    });
  });

  const search = document.getElementById("projects-search");
  if (search) {
    let t;
    search.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        PROJECTS_STATE.query = search.value || "";
        applyProjectsFilters();
      }, 250);
    });
  }

  const seeMore = document.getElementById("projects-see-more");
  if (seeMore) {
    seeMore.addEventListener("click", () => {
      PROJECTS_STATE.currentShown = Math.min(
        PROJECTS_STATE.currentShown + PROJECTS_STATE.pageSize,
        PROJECTS_STATE.filtered.length
      );
      renderProjectsGrid();
      setTimeout(loadPortfolioImages, 0);
    });
  }
}

// Initialize Projects page if present
window.addEventListener("load", () => {
  const grid = document.getElementById("projects-grid");
  if (grid) {
    // Initialize default state
    PROJECTS_STATE.currentShown = Math.min(
      PROJECTS_STATE.pageSize,
      PROJECTS_STATE.filtered.length
    );
    initProjectsControls();
    applyProjectsFilters();
  }
});
