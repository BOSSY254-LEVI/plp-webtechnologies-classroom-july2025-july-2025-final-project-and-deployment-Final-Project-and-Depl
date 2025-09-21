/**
 * Contact page specific JavaScript functionality
 * Handles contact form, map integration, FAQ interactions, and contact features
 */

// =============================================================================
// Contact Configuration and Data
// =============================================================================

const CONTACT_CONFIG = {
  COORDINATES: {
    nairobi: {
      lat: -1.2921,
      lng: 36.8219,
      name: 'Nairobi CBD Garden',
      address: '11th Street, Kenyatta Avenue, Nairobi CBD, Kenya'
    },
    homaBay: {
      lat: -0.5273,
      lng: 34.4569,
      name: 'Homa Bay County Garden',
      address: 'Homa Bay County, Kenya'
    }
  },
  CONTACT_INFO: {
    email: 'livingstoneoduory@gmail.com',
    phone: '+254721373455',
    phoneDisplay: '+254 721 373 455',
    hours: {
      weekdays: '6:00 AM - 7:00 PM',
      saturday: '7:00 AM - 8:00 PM',
      sunday: '8:00 AM - 6:00 PM'
    }
  },
  FORM_VALIDATION: {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^[+]?[\d\s\-\(\)]{10,}$/,
    nameMinLength: 2,
    messageMinLength: 10
  }
};

// =============================================================================
// Contact Form Handler
// =============================================================================

class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.successMessage = document.getElementById('form-success');
    this.submitButton = null;
    this.originalButtonText = '';
    
    this.init();
  }

  init() {
    if (this.form) {
      this.submitButton = this.form.querySelector('button[type="submit"]');
      if (this.submitButton) {
        this.originalButtonText = this.submitButton.textContent;
      }
      
      this.setupEventListeners();
      this.setupFormValidation();
    }
  }

  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });

    // Phone number formatting
    const phoneField = this.form.querySelector('#phone');
    if (phoneField) {
      phoneField.addEventListener('input', (e) => this.formatPhoneNumber(e));
    }
  }

  setupFormValidation() {
    // Add visual feedback elements
    this.form.querySelectorAll('.form-group').forEach(group => {
      const field = group.querySelector('input, select, textarea');
      if (field) {
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
          color: var(--error);
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: none;
        `;
        group.appendChild(errorElement);
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const submissionData = this.prepareSubmissionData(formData);

    try {
      this.setLoadingState(true);
      
      // Simulate API submission
      await this.submitForm(submissionData);
      
      this.showSuccess();
      this.form.reset();
      
      // Track submission for analytics
      this.trackFormSubmission(submissionData);
      
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.setLoadingState(false);
    }
  }

  prepareSubmissionData(formData) {
    return {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      location: formData.get('location'),
      message: formData.get('message'),
      newsletter: formData.get('newsletter') === 'on',
      timestamp: new Date().toISOString(),
      source: 'website-contact-form'
    };
  }

  async submitForm(data) {
    // In a real application, this would submit to your backend
    // For demonstration, we'll simulate the submission
    
    console.log('Submitting contact form:', data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate occasional failure for testing
    if (Math.random() < 0.05) {
      throw new Error('Network error. Please try again.');
    }
    
    return { success: true, id: Date.now().toString() };
  }

  validateForm() {
    let isValid = true;
    const requiredFields = this.form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearFieldError(field);

    // Required field validation
    if (field.required && !value) {
      errorMessage = `${this.getFieldLabel(field)} is required.`;
      isValid = false;
    }
    // Specific field validations
    else if (value) {
      switch (fieldName) {
        case 'firstName':
        case 'lastName':
          if (value.length < CONTACT_CONFIG.FORM_VALIDATION.nameMinLength) {
            errorMessage = `${this.getFieldLabel(field)} must be at least ${CONTACT_CONFIG.FORM_VALIDATION.nameMinLength} characters.`;
            isValid = false;
          }
          break;
          
        case 'email':
          if (!CONTACT_CONFIG.FORM_VALIDATION.emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
          }
          break;
          
        case 'phone':
          if (value && !CONTACT_CONFIG.FORM_VALIDATION.phoneRegex.test(value)) {
            errorMessage = 'Please enter a valid phone number.';
            isValid = false;
          }
          break;
          
        case 'message':
          if (value.length < CONTACT_CONFIG.FORM_VALIDATION.messageMinLength) {
            errorMessage = `Message must be at least ${CONTACT_CONFIG.FORM_VALIDATION.messageMinLength} characters.`;
            isValid = false;
          }
          break;
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    const errorElement = field.closest('.form-group').querySelector('.field-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    field.classList.add('field-error-input');
  }

  clearFieldError(field) {
    const errorElement = field.closest('.form-group').querySelector('.field-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    
    field.classList.remove('field-error-input');
  }

  getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
  }

  formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Add country code if not present and not empty
    if (value && !value.startsWith('254')) {
      if (value.startsWith('0')) {
        value = '254' + value.slice(1);
      } else if (value.startsWith('7') || value.startsWith('1')) {
        value = '254' + value;
      }
    }
    
    // Format as +254 XXX XXX XXX
    if (value.startsWith('254')) {
      const formatted = '+254 ' + value.slice(3).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
      e.target.value = formatted.trim();
    } else {
      e.target.value = value;
    }
  }

  setLoadingState(isLoading) {
    if (!this.submitButton) return;

    this.submitButton.disabled = isLoading;
    this.submitButton.textContent = isLoading ? 'Sending Message...' : this.originalButtonText;
    
    if (isLoading) {
      this.submitButton.classList.add('loading');
    } else {
      this.submitButton.classList.remove('loading');
    }
  }

  showSuccess() {
    if (this.successMessage) {
      this.form.style.display = 'none';
      this.successMessage.style.display = 'block';
      
      // Scroll to success message
      this.successMessage.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    } else {
      this.showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
    }
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  trackFormSubmission(data) {
    // Track form submissions for analytics
    console.log('Form submission tracked:', {
      interest: data.interest,
      location: data.location,
      newsletter: data.newsletter,
      timestamp: data.timestamp
    });
  }
}

// =============================================================================
// Interactive Map Integration
// =============================================================================

class InteractiveMap {
  constructor() {
    this.map = null;
    this.markers = [];
    this.mapContainer = document.getElementById('map');
    
    this.init();
  }

  async init() {
    if (this.mapContainer && typeof L !== 'undefined') {
      this.initializeMap();
    } else if (this.mapContainer) {
      // Fallback: create static map placeholder
      this.createMapFallback();
    }
  }

  initializeMap() {
    try {
      // Initialize Leaflet map
      this.map = L.map('map').setView([-1.2921, 36.8219], 10);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      
      // Add markers for both locations
      this.addLocationMarkers();
      
      // Fit map to show both locations
      this.fitMapToBounds();
      
      console.log('✅ Interactive map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
      this.createMapFallback();
    }
  }

  addLocationMarkers() {
    const locations = CONTACT_CONFIG.COORDINATES;
    
    // Nairobi marker
    const nairobiMarker = L.marker([locations.nairobi.lat, locations.nairobi.lng])
      .addTo(this.map)
      .bindPopup(`
        <div class="map-popup">
          <h4>${locations.nairobi.name}</h4>
          <p>${locations.nairobi.address}</p>
          <p><strong>Hours:</strong><br>
          Mon-Fri: ${CONTACT_CONFIG.CONTACT_INFO.hours.weekdays}<br>
          Sat: ${CONTACT_CONFIG.CONTACT_INFO.hours.saturday}<br>
          Sun: ${CONTACT_CONFIG.CONTACT_INFO.hours.sunday}</p>
        </div>
      `);
    
    // Homa Bay marker
    const homaBayMarker = L.marker([locations.homaBay.lat, locations.homaBay.lng])
      .addTo(this.map)
      .bindPopup(`
        <div class="map-popup">
          <h4>${locations.homaBay.name}</h4>
          <p>${locations.homaBay.address}</p>
          <p><em>Contact us for specific directions and visiting hours</em></p>
        </div>
      `);
    
    this.markers = [nairobiMarker, homaBayMarker];
  }

  fitMapToBounds() {
    if (this.markers.length > 0) {
      const group = new L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }

  createMapFallback() {
    this.mapContainer.innerHTML = `
      <div class="map-fallback">
        <h3>Our Locations</h3>
        <div class="location-cards">
          <div class="location-card">
            <h4>📍 Nairobi CBD Garden</h4>
            <p>11th Street, Kenyatta Avenue<br>Nairobi CBD, Kenya</p>
            <a href="https://maps.google.com/?q=-1.2921,36.8219" target="_blank" class="btn btn-primary btn-sm">View on Google Maps</a>
          </div>
          <div class="location-card">
            <h4>📍 Homa Bay County Garden</h4>
            <p>Homa Bay County, Kenya</p>
            <a href="https://maps.google.com/?q=-0.5273,34.4569" target="_blank" class="btn btn-primary btn-sm">View on Google Maps</a>
          </div>
        </div>
        <p class="map-note"><em>Interactive map requires JavaScript. Click the links above to view locations on Google Maps.</em></p>
      </div>
    `;
  }
}

// =============================================================================
// FAQ Interactive Handler
// =============================================================================

class FAQHandler {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => this.toggleFAQ(item));
      }
    });
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    this.faqItems.forEach(faqItem => {
      if (faqItem !== item) {
        faqItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active', !isActive);
    
    // Update ARIA attributes
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      const expanded = item.classList.contains('active');
      question.setAttribute('aria-expanded', expanded);
      answer.setAttribute('aria-hidden', !expanded);
    }
  }

  setupKeyboardNavigation() {
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        // Make focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Add keyboard support
        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleFAQ(item);
          }
        });
      }
    });
  }
}

// =============================================================================
// Contact Information Display
// =============================================================================

class ContactInfoDisplay {
  constructor() {
    this.init();
  }

  init() {
    this.setupPhoneNumberLinks();
    this.setupEmailLinks();
    this.addBusinessHours();
    this.setupSocialLinks();
  }

  setupPhoneNumberLinks() {
    // Make phone numbers clickable
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Track phone number clicks
        console.log('Phone number clicked:', e.target.href);
      });
    });
  }

  setupEmailLinks() {
    // Enhance email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Track email link clicks
        console.log('Email link clicked:', e.target.href);
      });
      
      // Add subject line if not present
      if (!link.href.includes('subject=')) {
        const currentHref = link.href;
        const separator = currentHref.includes('?') ? '&' : '?';
        link.href = currentHref + separator + 'subject=Inquiry about Greenwood Community Garden';
      }
    });
  }

  addBusinessHours() {
    // Add business hours indicator
    const hoursElements = document.querySelectorAll('.hours');
    hoursElements.forEach(element => {
      const statusIndicator = document.createElement('div');
      statusIndicator.className = 'hours-status';
      statusIndicator.innerHTML = this.getCurrentStatus();
      element.appendChild(statusIndicator);
    });
  }

  getCurrentStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;

    let isOpen = false;
    let nextChange = '';

    // Define opening hours in minutes from midnight
    const hours = {
      weekday: { open: 6 * 60, close: 19 * 60 }, // 6 AM - 7 PM
      saturday: { open: 7 * 60, close: 20 * 60 }, // 7 AM - 8 PM
      sunday: { open: 8 * 60, close: 18 * 60 }    // 8 AM - 6 PM
    };

    let todayHours;
    if (day >= 1 && day <= 5) { // Monday to Friday
      todayHours = hours.weekday;
    } else if (day === 6) { // Saturday
      todayHours = hours.saturday;
    } else { // Sunday
      todayHours = hours.sunday;
    }

    isOpen = currentTime >= todayHours.open && currentTime < todayHours.close;

    if (isOpen) {
      const closeTime = this.formatTime(todayHours.close);
      nextChange = `Open until ${closeTime}`;
    } else {
      if (currentTime < todayHours.open) {
        const openTime = this.formatTime(todayHours.open);
        nextChange = `Opens at ${openTime}`;
      } else {
        // Closed for today, find next opening
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDay();
        
        let tomorrowHours;
        if (tomorrowDay >= 1 && tomorrowDay <= 5) {
          tomorrowHours = hours.weekday;
        } else if (tomorrowDay === 6) {
          tomorrowHours = hours.saturday;
        } else {
          tomorrowHours = hours.sunday;
        }
        
        const openTime = this.formatTime(tomorrowHours.open);
        nextChange = `Opens tomorrow at ${openTime}`;
      }
    }

    const statusClass = isOpen ? 'open' : 'closed';
    const statusText = isOpen ? 'Currently Open' : 'Currently Closed';

    return `
      <div class="status-indicator ${statusClass}">
        <span class="status-dot"></span>
        <span class="status-text">${statusText}</span>
      </div>
      <div class="status-next">${nextChange}</div>
    `;
  }

  formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  }

  setupSocialLinks() {
    // Add click tracking for social links
    document.querySelectorAll('.social-link').forEach(link => {
      link.addEventListener('click', (e) => {
        console.log('Social link clicked:', e.target.href);
      });
    });
  }
}

// =============================================================================
// Contact Page Analytics
// =============================================================================

class ContactAnalytics {
  constructor() {
    this.interactions = [];
    this.init();
  }

  init() {
    this.trackPageVisit();
    this.trackUserInteractions();
    this.setupBeforeUnloadTracking();
  }

  trackPageVisit() {
    const visitData = {
      type: 'page_visit',
      page: 'contact',
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };
    
    this.logInteraction(visitData);
  }

  trackUserInteractions() {
    // Track form field interactions
    document.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('focus', (e) => {
        this.logInteraction({
          type: 'field_focus',
          field: e.target.name || e.target.id,
          timestamp: new Date().toISOString()
        });
      });
    });

    // Track FAQ interactions
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', (e) => {
        const faqTitle = e.target.querySelector('h4').textContent;
        this.logInteraction({
          type: 'faq_click',
          question: faqTitle,
          timestamp: new Date().toISOString()
        });
      });
    });

    // Track contact method clicks
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        this.logInteraction({
          type: 'contact_method_click',
          method: e.target.href.startsWith('tel:') ? 'phone' : 'email',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  setupBeforeUnloadTracking() {
    window.addEventListener('beforeunload', () => {
      // Track time spent on page
      const timeSpent = Date.now() - this.pageLoadTime;
      this.logInteraction({
        type: 'page_unload',
        timeSpent: timeSpent,
        interactionCount: this.interactions.length,
        timestamp: new Date().toISOString()
      });
    });
  }

  logInteraction(data) {
    this.interactions.push(data);
    console.log('Contact interaction tracked:', data);
    
    // In a real application, you would send this data to your analytics service
  }
}

// =============================================================================
// Initialization
// =============================================================================

let contactFormHandler;
let interactiveMap;
let faqHandler;
let contactInfoDisplay;
let contactAnalytics;

document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the contact page
  if (document.querySelector('.contact-form-section') || document.querySelector('#contact-form')) {
    contactFormHandler = new ContactFormHandler();
    interactiveMap = new InteractiveMap();
    faqHandler = new FAQHandler();
    contactInfoDisplay = new ContactInfoDisplay();
    contactAnalytics = new ContactAnalytics();
    
    console.log('📞 Contact page functionality initialized');
  }
});

// =============================================================================
// Additional CSS for Contact Page
// =============================================================================

const contactStyles = document.createElement('style');
contactStyles.textContent = `
  .field-error-input {
    border-color: var(--error) !important;
    background-color: rgba(220, 53, 69, 0.05);
  }

  .submit-button.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .map-fallback {
    padding: 2rem;
    text-align: center;
    background: var(--pale-green);
    border-radius: var(--radius-md);
  }

  .map-fallback .location-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .map-fallback .location-card {
    background: white;
    padding: 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }

  .map-fallback .map-note {
    font-size: 0.875rem;
    color: var(--medium-gray);
    margin-top: 1rem;
  }

  .map-popup h4 {
    color: var(--primary-green);
    margin-bottom: 0.5rem;
  }

  .hours-status {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--pale-green);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success);
  }

  .status-indicator.closed .status-dot {
    background: var(--error);
  }

  .status-indicator.open .status-text {
    color: var(--success);
    font-weight: 600;
  }

  .status-indicator.closed .status-text {
    color: var(--error);
    font-weight: 600;
  }

  .status-next {
    color: var(--medium-gray);
    font-size: 0.8rem;
  }

  /* Animations */
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  /* Focus styles for accessibility */
  .faq-question:focus {
    outline: 2px solid var(--primary-green);
    outline-offset: 2px;
    background: var(--pale-green);
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .map-fallback .location-cards {
      grid-template-columns: 1fr;
    }
    
    .form-notification {
      position: fixed !important;
      top: 20px !important;
      left: 20px !important;
      right: 20px !important;
      max-width: none !important;
    }
  }
`;

document.head.appendChild(contactStyles);