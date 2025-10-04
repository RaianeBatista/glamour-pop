// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initializeGallery();
  initializeProductSelectors();
  initializeQuantityControls();
  initializeButtons();
  initializeModal();
  initializeReviewForm();
  initializeMobileMenu();
  addY2KEffects();
});

// Galeria de Imagens
function initializeGallery() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      const newImageSrc = this.getAttribute("data-main");
      mainImage.src = newImageSrc;

      // Add animation effect
      mainImage.style.opacity = "0";
      setTimeout(() => {
        mainImage.style.opacity = "1";
      }, 150);
    });
  });

  // Zoom functionality
  mainImage.addEventListener("click", function () {
    openImageModal(this.src);
  });
}

// Seletores de Produto
function initializeProductSelectors() {
  // Color selector
  const colorInputs = document.querySelectorAll('input[name="cor"]');
  const colorName = document.getElementById("colorName");

  colorInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const label = document.querySelector(`label[for="${this.id}"]`);
      const colorText = label.getAttribute("data-color");
      colorName.textContent = colorText;

      // Add selection animation
      label.style.transform = "scale(1.2)";
      setTimeout(() => {
        label.style.transform = "scale(1.1)";
      }, 200);
    });
  });

  // Finish selector animation
  const finishInputs = document.querySelectorAll('input[name="acabamento"]');
  finishInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const label = document.querySelector(`label[for="${this.id}"]`);

      // Add selection animation
      label.style.transform = "scale(1.05)";
      setTimeout(() => {
        label.style.transform = "scale(1)";
      }, 200);
    });
  });
}

// Controles de Quantidade
function initializeQuantityControls() {
  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.querySelector(".qty-btn.minus");
  const plusBtn = document.querySelector(".qty-btn.plus");

  minusBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      addButtonAnimation(this);
    }
  });

  plusBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
      quantityInput.value = currentValue + 1;
      addButtonAnimation(this);
    }
  });

  // Validate input
  quantityInput.addEventListener("input", function () {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
      this.value = 1;
    } else if (value > 10) {
      this.value = 10;
    }
  });
}

// Botões de Ação
function initializeButtons() {
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  const buyNowBtn = document.querySelector(".buy-now-btn");
  const wishlistBtn = document.querySelector(".wishlist-btn");
  const quickAddBtns = document.querySelectorAll(".quick-add");

  // Add to Cart
  addToCartBtn.addEventListener("click", function () {
    addButtonAnimation(this);
    showNotification("Produto adicionado ao carrinho! 🛍️", "success");

    // Simulate cart update
    setTimeout(() => {
      const cartIcon = document.querySelector(".cart-icon");
      cartIcon.style.animation = "pulse 0.5s ease";
      setTimeout(() => {
        cartIcon.style.animation = "";
      }, 500);
    }, 500);
  });

  // Buy Now
  buyNowBtn.addEventListener("click", function () {
    addButtonAnimation(this);
    showNotification("Redirecionando para o checkout... ⚡", "info");
  });

  // Wishlist
  wishlistBtn.addEventListener("click", function () {
    const icon = this.querySelector("i");
    const isLiked = icon.classList.contains("fas");

    if (isLiked) {
      icon.classList.remove("fas");
      icon.classList.add("far");
      showNotification("Removido da lista de desejos 💔", "info");
    } else {
      icon.classList.remove("far");
      icon.classList.add("fas");
      showNotification("Adicionado à lista de desejos! 💖", "success");
    }

    addButtonAnimation(this);
  });

  // Quick Add buttons
  quickAddBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      addButtonAnimation(this);
      showNotification("Produto adicionado ao carrinho! 🎉", "success");
    });
  });
}

// Modal de Zoom
function initializeModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("zoomedImage");
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Escape key to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

function openImageModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("zoomedImage");

  modal.style.display = "block";
  modalImg.src = imageSrc;

  // Add animation
  modalImg.style.transform = "scale(0.8)";
  modalImg.style.opacity = "0";

  setTimeout(() => {
    modalImg.style.transform = "scale(1)";
    modalImg.style.opacity = "1";
    modalImg.style.transition = "all 0.3s ease";
  }, 50);
}

// Formulário de Avaliação
function initializeReviewForm() {
  const reviewForm = document.querySelector(".review-form form");
  const starInputs = document.querySelectorAll(".star-rating input");

  // Star rating interaction
  starInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const rating = this.value;
      addStarAnimation(rating);
    });
  });

  // Form submission
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name =
      formData.get("name") || this.querySelector('input[type="text"]').value;
    const rating = formData.get("rating");
    const review = this.querySelector("textarea").value;

    if (!rating) {
      showNotification("Por favor, selecione uma avaliação! ⭐", "warning");
      return;
    }

    if (!name || !review) {
      showNotification("Por favor, preencha todos os campos! ✏️", "warning");
      return;
    }

    // Simulate review submission
    showNotification(
      "Avaliação enviada com sucesso! Obrigada pelo feedback! 💕",
      "success"
    );
    this.reset();

    // Add new review to the list (simulation)
    setTimeout(() => {
      addNewReview(name, rating, review);
    }, 1000);
  });
}

// Efeitos Y2K
function addY2KEffects() {
  // Floating animation for elements
  const floatingElements = document.querySelectorAll(".discount-badge, .logo");
  floatingElements.forEach((element) => {
    element.style.animation = "float 3s ease-in-out infinite";
  });

  // Sparkle effect on hover for important elements
  const sparkleElements = document.querySelectorAll(
    ".add-to-cart-btn, .product-title, .current-price"
  );
  sparkleElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      createSparkles(this);
    });
  });

  // Scroll animations
  window.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".product-card, .review-item");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  });

  // Initialize scroll effect styles
  const scrollElements = document.querySelectorAll(
    ".product-card, .review-item"
  );
  scrollElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
  });
}

// Utility Functions
function addButtonAnimation(button) {
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 150);
}

function addStarAnimation(rating) {
  const stars = document.querySelectorAll(".star-rating label");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.style.animation = "pulse 0.3s ease";
      setTimeout(() => {
        star.style.animation = "";
      }, 300);
    }
  });
}

function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "25px",
    color: "white",
    fontWeight: "600",
    fontSize: "1rem",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    fontFamily: "Fredoka, cursive",
  });

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background =
        "linear-gradient(135deg, #FF1493, #FF69B4)";
      break;
    case "warning":
      notification.style.background =
        "linear-gradient(135deg, #FFD700, #FFFF00)";
      notification.style.color = "#FF1493";
      break;
    case "info":
    default:
      notification.style.background =
        "linear-gradient(135deg, #FF1493, #FFD700)";
      break;
  }

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 50);

  // Animate out
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.textContent = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = rect.left + Math.random() * rect.width + "px";
      sparkle.style.top = rect.top + Math.random() * rect.height + "px";
      sparkle.style.fontSize = "1rem";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "9999";
      sparkle.style.animation = "float 1s ease-out forwards";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }, i * 100);
  }
}

function addNewReview(name, rating, reviewText) {
  const reviewsList = document.querySelector(".reviews-list");
  const newReview = document.createElement("div");
  newReview.className = "review-item";
  newReview.style.opacity = "0";
  newReview.style.transform = "translateY(20px)";

  const starsHTML = "★".repeat(rating) + "☆".repeat(5 - rating);

  newReview.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80" alt="${name}" class="reviewer-avatar">
                <div>
                    <span class="reviewer-name">${name}</span>
                    <div class="review-stars">
                        ${starsHTML}
                    </div>
                </div>
            </div>
            <span class="review-date">Agora mesmo</span>
        </div>
        <p class="review-text">"${reviewText}"</p>
    `;

  reviewsList.insertBefore(newReview, reviewsList.firstChild);

  // Animate in
  setTimeout(() => {
    newReview.style.opacity = "1";
    newReview.style.transform = "translateY(0)";
    newReview.style.transition = "all 0.5s ease";
  }, 100);
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  // Arrow keys for thumbnail navigation
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const activeThumbnail = document.querySelector(".thumbnail.active");
    const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);

    let newIndex;
    if (e.key === "ArrowLeft") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
    } else {
      newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
    }

    thumbnails[newIndex].click();
    e.preventDefault();
  }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const activeThumbnail = document.querySelector(".thumbnail.active");
    const currentIndex = Array.from(thumbnails).indexOf(activeThumbnail);

    let newIndex;
    if (diff > 0) {
      // Swipe left
      newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
    } else {
      // Swipe right
      newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
    }

    thumbnails[newIndex].click();
  }
}

// Performance optimization - Lazy loading for images
function observeImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  observeImages();
}

// Add loading states for better UX
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Hide loading animation if exists
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
});

// Error handling for images
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0ZGQjZDMSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNGRjE0OTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==";
      e.target.alt = "Imagem não encontrada";
    }
  },
  true
);

// ============================================
// MENU MOBILE HAMBURGER
// ============================================

// Inicializar menu mobile
function initializeMobileMenu() {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileNav = document.getElementById("mobileNav");
  const closeMenu = document.getElementById("closeMenu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Abrir menu
  hamburgerMenu.addEventListener("click", function () {
    hamburgerMenu.classList.add("active");
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden"; // Previne scroll do body
  });

  // Fechar menu - botão X
  closeMenu.addEventListener("click", function () {
    closeMobileMenu();
  });

  // Fechar menu - clique no overlay
  mobileNav.addEventListener("click", function (e) {
    if (e.target === mobileNav) {
      closeMobileMenu();
    }
  });

  // Fechar menu - clique nos links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  // Fechar menu - tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    hamburgerMenu.classList.remove("active");
    mobileNav.classList.remove("active");
    document.body.style.overflow = ""; // Restaura scroll do body
  }

  // Redimensionamento da janela
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}
