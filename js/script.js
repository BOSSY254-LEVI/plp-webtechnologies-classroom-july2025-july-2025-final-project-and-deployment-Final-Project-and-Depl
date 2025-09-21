/**
 * Main JavaScript file for Greenwood Community Garden website
 * Handles global functionality, navigation, animations, and shared components
 */

// =============================================================================
// Global Variables and Configuration
// =============================================================================

// Animation and interaction configuration
const CONFIG = {
  SCROLL_THRESHOLD: 100,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 100,
  INTERSECTION_THRESHOLD: 0.1
};

// DOM element references
let elements = {};

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution frequency
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to target element
 */
function smoothScrollTo(target, offset = 80) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Format date for display
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Animate number counting effect
 */
function animateNumber(element, start, end, duration = 2000) {
  const startTimestamp = performance.now();
  const step = (timestamp) => {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// =============================================================================
// Navigation Functionality
// =============================================================================

class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleScroll();
    this.setActiveLink();
  }

  setupEventListeners() {
    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e));
    });

    // Scroll handling
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));

    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, CONFIG.DEBOUNCE_DELAY));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.hamburger.classList.toggle('active', this.isMenuOpen);
    this.navMenu.classList.toggle('active', this.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleLinkClick(e) {
    const href = e.target.getAttribute('href');
    
    // Close mobile menu
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Handle same-page anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  }

  handleScroll() {
    if (!this.header) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    this.header.classList.toggle('scrolled', scrollTop > CONFIG.SCROLL_THRESHOLD);
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// =============================================================================
// Intersection Observer for Animations
// =============================================================================

class AnimationObserver {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: CONFIG.INTERSECTION_THRESHOLD,
          rootMargin: '50px 0px -50px 0px'
        }
      );
      
      this.observeElements();
    }
  }

  observeElements() {
    // Elements to animate on scroll
    const elementsToObserve = [
      '.feature-card',
      '.value-card',
      '.event-card',
      '.contact-card',
      '.stat-item',
      '.timeline-item',
      '.story-card',
      '.gallery-item'
    ];

    elementsToObserve.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.classList.add('fade-in-up');
        this.observer.observe(element);
      });
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Special handling for stats numbers
        if (entry.target.classList.contains('stat-item')) {
          this.animateStatNumber(entry.target);
        }
      }
    });
  }

  animateStatNumber(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (numberElement && !numberElement.dataset.animated) {
      const targetNumber = parseInt(numberElement.dataset.count || numberElement.textContent);
      numberElement.dataset.animated = 'true';
      animateNumber(numberElement, 0, targetNumber);
    }
  }
}

// =============================================================================
// Form Handling
// =============================================================================

class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    this.setLoadingState(submitButton, true);
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await this.simulateSubmission(formData);
      
      // Show success message
      this.showSuccessMessage(form);
      
      // Reset form
      form.reset();
      
    } catch (error) {
      this.showErrorMessage(form, error.message);
    } finally {
      this.setLoadingState(submitButton, false);
    }
  }

  setLoadingState(button, isLoading) {
    if (!button) return;
    
    if (isLoading) {
      button.disabled = true;
      button.textContent = 'Sending...';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Send Message';
    }
  }

  async simulateSubmission(formData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log form data (for development)
    console.log('Form submitted with data:', Object.fromEntries(formData));
    
    // Simulate occasional failure for testing
    if (Math.random() < 0.1) {
      throw new Error('Network error. Please try again.');
    }
  }

  showSuccessMessage(form) {
    // Look for success message element
    const successElement = form.parentNode.querySelector('.form-success') || 
                          document.getElementById('form-success');
    
    if (successElement) {
      form.style.display = 'none';
      successElement.style.display = 'block';
      successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Fallback: show alert
      alert('Thank you for your message! We\'ll get back to you soon.');
    }
  }

  showErrorMessage(form, message) {
    // Create or update error message element
    let errorElement = form.querySelector('.form-error');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.style.cssText = `
        background: #dc3545;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
      `;
      form.insertBefore(errorElement, form.firstChild);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }
}

// =============================================================================
// Page-Specific Functionality
// =============================================================================

class PageSpecific {
  constructor() {
    this.init();
  }

  init() {
    // Initialize based on current page
    const page = document.body.dataset.page || this.getCurrentPage();
    
    switch (page) {
      case 'home':
      case 'index':
        this.initHomePage();
        break;
      case 'about':
        this.initAboutPage();
        break;
      case 'events':
        this.initEventsPage();
        break;
      case 'gallery':
        this.initGalleryPage();
        break;
      case 'contact':
        this.initContactPage();
        break;
    }
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
  }

  initHomePage() {
    // Initialize hero animations
    this.initHeroAnimations();
    
    // Initialize stats counter
    this.initStatsCounter();
    
    // Initialize scroll indicators
    this.initScrollIndicators();
  }

  initAboutPage() {
    // Initialize timeline animations
    this.initTimelineAnimations();
  }

  initEventsPage() {
    // Events page specific functionality handled in events.js
    console.log('Events page loaded');
  }

  initGalleryPage() {
    // Gallery page specific functionality handled in gallery.js
    console.log('Gallery page loaded');
  }

  initContactPage() {
    // Contact page specific functionality handled in contact.js
    console.log('Contact page loaded');
  }

  initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Add entrance animation class
    setTimeout(() => {
      hero.classList.add('loaded');
    }, 500);
  }

  initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    // Stats will be animated by IntersectionObserver
    // This is handled in AnimationObserver class
  }

  initScrollIndicators() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
      const featuresSection = document.querySelector('.features');
      if (featuresSection) {
        smoothScrollTo(featuresSection);
      }
    });

    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollIndicator.style.opacity = scrollTop > 100 ? '0' : '1';
    });
  }

  initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.2}s`;
      item.classList.add('timeline-animate');
    });
  }
}

// =============================================================================
// Loading and Error Handling
// =============================================================================

class LoadingManager {
  constructor() {
    this.init();
  }

  init() {
    this.createLoadingIndicator();
    this.handlePageLoad();
    this.handleErrors();
  }

  createLoadingIndicator() {
    // Create a simple loading indicator
    this.loader = document.createElement('div');
    this.loader.id = 'page-loader';
    this.loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <p>Loading...</p>
      </div>
    `;
    
    // Add styles
    this.loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .loader-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e5e5;
        border-top: 4px solid #2d5a27;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .loader-content {
        text-align: center;
        color: #666;
      }
    `;
    
    document.head.appendChild(style);
  }

  showLoader() {
    if (this.loader && !document.body.contains(this.loader)) {
      document.body.appendChild(this.loader);
    }
  }

  hideLoader() {
    if (this.loader) {
      this.loader.style.opacity = '0';
      setTimeout(() => {
        if (this.loader.parentNode) {
          this.loader.parentNode.removeChild(this.loader);
        }
      }, 300);
    }
  }

  handlePageLoad() {
    // Show loader initially
    if (document.readyState === 'loading') {
      this.showLoader();
    }

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      this.hideLoader();
    });

    // Fallback: hide loader after maximum wait time
    setTimeout(() => {
      this.hideLoader();
    }, 3000);
  }

  handleErrors() {
    window.addEventListener('error', (e) => {
      console.error('Page error:', e.error);
      this.hideLoader();
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }
}

// =============================================================================
// CSS Animation Classes
// =============================================================================

// Add CSS classes for animations
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-up.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .timeline-animate {
      opacity: 0;
      transform: translateX(-30px);
      animation: slideInLeft 0.6s ease forwards;
    }
    
    @keyframes slideInLeft {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .hero.loaded .hero-content {
      animation: heroFadeIn 1s ease forwards;
    }
    
    @keyframes heroFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  
  document.head.appendChild(style);
}

// =============================================================================
// Accessibility Enhancements
// =============================================================================

class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupAriaLabels();
    this.setupSkipLinks();
  }

  setupKeyboardNavigation() {
    // Handle escape key for modals and menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close mobile menu
        const nav = new Navigation();
        if (nav.isMenuOpen) {
          nav.closeMobileMenu();
        }
        
        // Close any open modals
        const openModal = document.querySelector('.modal.active');
        if (openModal) {
          openModal.classList.remove('active');
        }
      }
    });
  }

  setupFocusManagement() {
    // Ensure focus is visible
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  setupAriaLabels() {
    // Add aria labels to interactive elements without proper labels
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        // Add appropriate aria-label based on context
        if (button.classList.contains('hamburger')) {
          button.setAttribute('aria-label', 'Toggle navigation menu');
        } else if (button.classList.contains('close-modal')) {
          button.setAttribute('aria-label', 'Close modal');
        }
      }
    });
  }

  setupSkipLinks() {
    // Create skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only';
    
    // Style the skip link
    const style = document.createElement('style');
    style.textContent = `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-green);
        color: white;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// =============================================================================
// Performance Optimization
// =============================================================================

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeScrollListeners();
  }

  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2';
    document.head.appendChild(fontLink);
  }

  optimizeScrollListeners() {
    // Use passive listeners for better performance
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}

    const passiveOptions = supportsPassive ? { passive: true } : false;
    
    // Replace existing scroll listeners with passive ones where appropriate
    window.addEventListener('scroll', throttle(() => {
      // Non-blocking scroll operations only
    }, 16), passiveOptions);
  }
}

// =============================================================================
// Initialization
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  try {
    addAnimationStyles();
    new LoadingManager();
    new Navigation();
    new AnimationObserver();
    new FormHandler();
    new PageSpecific();
    new AccessibilityEnhancer();
    new PerformanceOptimizer();
    
    console.log('🌱 Greenwood Community Garden website loaded successfully!');
  } catch (error) {
    console.error('Error initializing website:', error);
  }
});

// =============================================================================
// Global Utility Exports
// =============================================================================

// Make utility functions available globally
window.GreenwoodUtils = {
  smoothScrollTo,
  debounce,
  throttle,
  formatDate,
  animateNumber,
  isInViewport
};