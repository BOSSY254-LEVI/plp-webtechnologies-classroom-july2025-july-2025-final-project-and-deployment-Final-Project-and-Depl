/**
 * Events page specific JavaScript functionality
 * Handles event filtering, calendar display, and event management
 */

// =============================================================================
// Event Data and Configuration
// =============================================================================

const EVENTS_CONFIG = {
  MONTHS: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  EVENTS_PER_PAGE: 6,
  ANIMATION_DELAY: 100
};

// Sample events data (in a real application, this would come from an API)
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Spring Planting Workshop',
    description: 'Learn the best techniques for spring vegetable planting and soil preparation.',
    date: new Date(2025, 2, 15), // March 15, 2025
    time: '2:00 PM - 5:00 PM',
    location: 'Nairobi Garden',
    category: 'workshops',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: true,
    maxParticipants: 25
  },
  {
    id: 2,
    title: 'Community Harvest Festival',
    description: 'Celebrate the season\'s harvest with food, music, and community fellowship.',
    date: new Date(2025, 2, 22), // March 22, 2025
    time: '10:00 AM - 4:00 PM',
    location: 'Homa Bay Garden',
    category: 'seasonal',
    image: 'https://images.pexels.com/photos/4503289/pexels-photo-4503289.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: false,
    maxParticipants: null
  },
  {
    id: 3,
    title: 'Composting Masterclass',
    description: 'Master the art of composting and turn your kitchen scraps into garden gold.',
    date: new Date(2025, 3, 5), // April 5, 2025
    time: '1:00 PM - 3:00 PM',
    location: 'Nairobi Garden',
    category: 'workshops',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: true,
    maxParticipants: 15
  },
  {
    id: 4,
    title: 'Kids Garden Adventure',
    description: 'Fun educational activities for children to learn about plants and nature.',
    date: new Date(2025, 3, 12), // April 12, 2025
    time: '10:00 AM - 12:00 PM',
    location: 'Nairobi Garden',
    category: 'community',
    image: 'https://images.pexels.com/photos/4503284/pexels-photo-4503284.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: true,
    maxParticipants: 20
  },
  {
    id: 5,
    title: 'Sustainable Living Seminar',
    description: 'Learn about sustainable practices, renewable energy, and eco-friendly living.',
    date: new Date(2025, 3, 19), // April 19, 2025
    time: '3:00 PM - 6:00 PM',
    location: 'Nairobi Garden',
    category: 'workshops',
    image: 'https://images.pexels.com/photos/4503289/pexels-photo-4503289.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: true,
    maxParticipants: 30
  },
  {
    id: 6,
    title: 'Monthly Community Meeting',
    description: 'Join us for updates, planning discussions, and community feedback.',
    date: new Date(2025, 3, 26), // April 26, 2025
    time: '6:00 PM - 8:00 PM',
    location: 'Nairobi Garden',
    category: 'community',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: false,
    maxParticipants: null
  },
  {
    id: 7,
    title: 'Herb Garden Workshop',
    description: 'Create your own herb garden with medicinal and culinary plants.',
    date: new Date(2025, 4, 3), // May 3, 2025
    time: '2:00 PM - 4:00 PM',
    location: 'Homa Bay Garden',
    category: 'workshops',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: true,
    maxParticipants: 18
  },
  {
    id: 8,
    title: 'Summer Solstice Celebration',
    description: 'Welcome the summer season with traditional foods and garden tours.',
    date: new Date(2025, 5, 21), // June 21, 2025
    time: '5:00 PM - 9:00 PM',
    location: 'Both Gardens',
    category: 'seasonal',
    image: 'https://images.pexels.com/photos/4503289/pexels-photo-4503289.jpeg?auto=compress&cs=tinysrgb&w=400',
    registrationRequired: false,
    maxParticipants: null
  }
];

// =============================================================================
// Event Manager Class
// =============================================================================

class EventManager {
  constructor() {
    this.events = SAMPLE_EVENTS;
    this.filteredEvents = SAMPLE_EVENTS;
    this.currentFilter = 'all';
    this.currentPage = 1;
    
    this.eventsContainer = document.getElementById('events-container');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    this.init();
  }

  init() {
    if (this.eventsContainer) {
      this.setupEventListeners();
      this.renderEvents();
    }
  }

  setupEventListeners() {
    // Filter button event listeners
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.filterEvents(filter);
        this.updateActiveFilter(e.target);
      });
    });
  }

  filterEvents(category) {
    this.currentFilter = category;
    this.currentPage = 1;
    
    if (category === 'all') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(event => event.category === category);
    }
    
    this.renderEvents();
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  renderEvents() {
    if (!this.eventsContainer) return;

    // Clear current events
    this.eventsContainer.innerHTML = '';

    // Sort events by date
    const sortedEvents = this.filteredEvents.sort((a, b) => a.date - b.date);

    // Get events for current page
    const startIndex = (this.currentPage - 1) * EVENTS_CONFIG.EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_CONFIG.EVENTS_PER_PAGE;
    const eventsToShow = sortedEvents.slice(startIndex, endIndex);

    // Render each event
    eventsToShow.forEach((event, index) => {
      const eventElement = this.createEventElement(event);
      eventElement.style.animationDelay = `${index * EVENTS_CONFIG.ANIMATION_DELAY}ms`;
      this.eventsContainer.appendChild(eventElement);
    });

    // Show empty state if no events
    if (eventsToShow.length === 0) {
      this.showEmptyState();
    }
  }

  createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-card';
    eventDiv.dataset.category = event.category;

    const month = EVENTS_CONFIG.MONTHS[event.date.getMonth()].substring(0, 3).toUpperCase();
    const day = event.date.getDate();

    eventDiv.innerHTML = `
      <div class="event-date">
        <span class="month">${month}</span>
        <span class="day">${day}</span>
      </div>
      <div class="event-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-meta">
          <span class="event-time">📅 ${event.time}</span>
          <span class="event-location">📍 ${event.location}</span>
          ${event.registrationRequired ? '<span class="event-registration">📝 Registration Required</span>' : ''}
          ${event.maxParticipants ? `<span class="event-spots">👥 Max ${event.maxParticipants} participants</span>` : ''}
        </div>
        <div class="event-actions">
          <button class="btn btn-primary btn-sm" onclick="eventManager.registerForEvent(${event.id})">
            ${event.registrationRequired ? 'Register' : 'Learn More'}
          </button>
        </div>
      </div>
    `;

    return eventDiv;
  }

  showEmptyState() {
    this.eventsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <h3>No events found</h3>
        <p>No events match your current filter. Try selecting a different category or check back later for new events.</p>
        <button class="btn btn-outline" onclick="eventManager.filterEvents('all')">Show All Events</button>
      </div>
    `;
  }

  registerForEvent(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    // In a real application, this would handle actual registration
    alert(`Thank you for your interest in "${event.title}"! 

Event Details:
📅 ${event.date.toLocaleDateString()}
⏰ ${event.time}
📍 ${event.location}

Please contact us at livingstoneoduory@gmail.com or +254 721 373 455 to complete your registration.`);
  }
}

// =============================================================================
// Calendar Display Class
// =============================================================================

class EventCalendar {
  constructor() {
    this.currentDate = new Date();
    this.calendarGrid = document.getElementById('calendar-grid');
    this.currentMonthElement = document.getElementById('current-month');
    this.prevButton = document.getElementById('prev-month');
    this.nextButton = document.getElementById('next-month');
    
    this.init();
  }

  init() {
    if (this.calendarGrid) {
      this.setupEventListeners();
      this.renderCalendar();
    }
  }

  setupEventListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
      });
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
      });
    }
  }

  renderCalendar() {
    if (!this.calendarGrid || !this.currentMonthElement) return;

    // Update month/year display
    const monthYear = `${EVENTS_CONFIG.MONTHS[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    this.currentMonthElement.textContent = monthYear;

    // Clear calendar
    this.calendarGrid.innerHTML = '';

    // Add day headers
    EVENTS_CONFIG.DAYS.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      dayHeader.style.cssText = `
        padding: 0.5rem;
        font-weight: 600;
        text-align: center;
        background: var(--primary-green);
        color: white;
        font-size: 0.875rem;
      `;
      this.calendarGrid.appendChild(dayHeader);
    });

    // Get calendar data
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      this.createCalendarDay(day, true, year, month - 1);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      this.createCalendarDay(day, false, year, month);
    }

    // Add next month's leading days
    const totalCells = 42; // 6 weeks * 7 days
    const cellsUsed = firstDay + daysInMonth;
    const remainingCells = totalCells - cellsUsed;
    
    for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
      this.createCalendarDay(day, true, year, month + 1);
    }
  }

  createCalendarDay(day, isOtherMonth, year, month) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day${isOtherMonth ? ' other-month' : ''}`;
    dayElement.textContent = day;

    // Check if this day has events
    const dayDate = new Date(year, month, day);
    const hasEvent = this.hasEventOnDate(dayDate);
    
    if (hasEvent && !isOtherMonth) {
      dayElement.classList.add('has-event');
      dayElement.title = this.getEventsForDate(dayDate).map(e => e.title).join(', ');
    }

    // Highlight today
    const today = new Date();
    if (!isOtherMonth && 
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear()) {
      dayElement.classList.add('today');
      dayElement.style.background = 'var(--accent-green)';
      dayElement.style.color = 'white';
      dayElement.style.fontWeight = 'bold';
    }

    this.calendarGrid.appendChild(dayElement);
  }

  hasEventOnDate(date) {
    return SAMPLE_EVENTS.some(event => {
      return event.date.getDate() === date.getDate() &&
             event.date.getMonth() === date.getMonth() &&
             event.date.getFullYear() === date.getFullYear();
    });
  }

  getEventsForDate(date) {
    return SAMPLE_EVENTS.filter(event => {
      return event.date.getDate() === date.getDate() &&
             event.date.getMonth() === date.getMonth() &&
             event.date.getFullYear() === date.getFullYear();
    });
  }
}

// =============================================================================
// Newsletter Signup Handler
// =============================================================================

class NewsletterSignup {
  constructor() {
    this.form = document.getElementById('newsletter-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const email = formData.get('email') || this.form.querySelector('input[type="email"]').value;
    
    if (!this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }

    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      this.showMessage('Thank you for subscribing! You\'ll receive event updates soon.', 'success');
      this.form.reset();
      
    } catch (error) {
      this.showMessage('Something went wrong. Please try again.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
      padding: 0.75rem;
      border-radius: 4px;
      margin-top: 1rem;
      text-align: center;
      background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
      color: ${type === 'success' ? '#155724' : '#721c24'};
      border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    this.form.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// =============================================================================
// Additional Event Features
// =============================================================================

class EventFeatures {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventSharing();
    this.setupEventReminders();
    this.setupAccessibilityFeatures();
  }

  setupEventSharing() {
    // Add sharing functionality for events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('share-event')) {
        const eventId = e.target.dataset.eventId;
        this.shareEvent(eventId);
      }
    });
  }

  shareEvent(eventId) {
    const event = SAMPLE_EVENTS.find(e => e.id == eventId);
    if (!event || !navigator.share) {
      // Fallback to copying to clipboard
      this.copyEventToClipboard(event);
      return;
    }

    navigator.share({
      title: event.title,
      text: event.description,
      url: `${window.location.origin}/events.html#event-${eventId}`
    });
  }

  copyEventToClipboard(event) {
    const eventText = `${event.title}\n${event.description}\n📅 ${event.date.toLocaleDateString()}\n⏰ ${event.time}\n📍 ${event.location}`;
    
    navigator.clipboard.writeText(eventText).then(() => {
      alert('Event details copied to clipboard!');
    });
  }

  setupEventReminders() {
    // Setup service worker for event reminders (if supported)
    if ('serviceWorker' in navigator && 'Notification' in window) {
      this.initializeNotifications();
    }
  }

  async initializeNotifications() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered for event reminders');
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }

  setupAccessibilityFeatures() {
    // Add keyboard navigation for calendar
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach((day, index) => {
      day.setAttribute('tabindex', '0');
      day.setAttribute('role', 'gridcell');
      
      day.addEventListener('keydown', (e) => {
        this.handleCalendarKeyNav(e, index);
      });
    });
  }

  handleCalendarKeyNav(e, currentIndex) {
    const days = document.querySelectorAll('.calendar-day');
    let newIndex = currentIndex;

    switch(e.key) {
      case 'ArrowLeft':
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        newIndex = Math.min(days.length - 1, currentIndex + 1);
        break;
      case 'ArrowUp':
        newIndex = Math.max(0, currentIndex - 7);
        break;
      case 'ArrowDown':
        newIndex = Math.min(days.length - 1, currentIndex + 7);
        break;
      case 'Enter':
      case ' ':
        // Trigger day click
        e.target.click();
        return;
      default:
        return;
    }

    e.preventDefault();
    days[newIndex].focus();
  }
}

// =============================================================================
// Initialization
// =============================================================================

let eventManager;
let eventCalendar;
let newsletterSignup;
let eventFeatures;

document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the events page
  if (document.querySelector('.events-section') || document.querySelector('.calendar-section')) {
    eventManager = new EventManager();
    eventCalendar = new EventCalendar();
    newsletterSignup = new NewsletterSignup();
    eventFeatures = new EventFeatures();
    
    console.log('🗓️ Events page functionality initialized');
  }
});

// =============================================================================
// Additional CSS for Events Page
// =============================================================================

// Add specific styles for events page
const eventStyles = document.createElement('style');
eventStyles.textContent = `
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--medium-gray);
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .event-actions {
    margin-top: 1rem;
  }
  
  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .event-registration,
  .event-spots {
    display: block;
    font-size: 0.8rem;
    color: var(--secondary-green);
    margin-top: 0.25rem;
  }
  
  .calendar-day-header {
    font-weight: 600;
    background: var(--primary-green);
    color: white;
  }
  
  .calendar-day:focus {
    outline: 2px solid var(--accent-green);
    outline-offset: -2px;
  }
  
  .form-message {
    animation: slideDown 0.3s ease;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(eventStyles);