/**
 * Gallery page specific JavaScript functionality
 * Handles photo filtering, modal display, and gallery interactions
 */

// =============================================================================
// Gallery Configuration and Data
// =============================================================================

const GALLERY_CONFIG = {
  ANIMATION_DELAY: 100,
  MODAL_ANIMATION_DURATION: 300,
  LAZY_LOAD_THRESHOLD: 100,
  IMAGES_PER_LOAD: 16,
  CAROUSEL_INTERVAL: 5000
};

// Enhanced gallery data with diverse, relevant community garden images
const GALLERY_DATA = [
  // Community Category
  {
    id: 1,
    title: 'Spring Planting Day',
    description: 'Community members working together to prepare garden beds for the spring planting season.',
    date: '2024-03-15',
    category: 'community',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Community Member',
    location: 'Nairobi Garden'
  },
  {
    id: 2,
    title: 'Community Gathering',
    description: 'Monthly community meeting where members share experiences and plan future activities.',
    date: '2024-04-28',
    category: 'community',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Community Secretary',
    location: 'Nairobi Garden'
  },
  {
    id: 3,
    title: 'Winter Planning Session',
    description: 'Garden coordinators planning crop rotation and winter garden preparations.',
    date: '2024-11-12',
    category: 'community',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Planning Team',
    location: 'Nairobi Garden'
  },
  {
    id: 4,
    title: 'Children Learning Together',
    description: 'Young gardeners learning about plant care and sustainable growing practices.',
    date: '2024-05-20',
    category: 'community',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Youth Program Coordinator',
    location: 'Nairobi Garden'
  },
  {
    id: 5,
    title: 'Volunteer Appreciation Day',
    description: 'Recognizing our dedicated volunteers who make our community garden thrive.',
    date: '2024-06-15',
    category: 'community',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Community Relations',
    location: 'Homa Bay Garden'
  },

  // Harvests Category
  {
    id: 6,
    title: 'Fresh Harvest',
    description: 'Beautiful variety of fresh vegetables harvested from our community plots.',
    date: '2024-08-22',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/3265437/pexels-photo-3265437.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3265437/pexels-photo-3265437.jpeg',
    photographer: 'Livingstone Oduory',
    location: 'Homa Bay Garden'
  },
  {
    id: 7,
    title: 'Tomato Harvest Success',
    description: 'Abundant tomato harvest showcasing the success of our organic growing methods.',
    date: '2024-08-05',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/7129184/pexels-photo-7129184.jpeg',
    thumbnail: 'https://images.pexels.com/photos/7129184/pexels-photo-7129184.jpeg',
    photographer: 'Plot Holder',
    location: 'Homa Bay Garden'
  },
  {
    id: 8,
    title: 'Root Vegetable Success',
    description: 'Impressive collection of root vegetables including carrots, radishes, and turnips.',
    date: '2024-10-08',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/4503284/pexels-photo-4503284.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503284/pexels-photo-4503284.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Root Crop Specialist',
    location: 'Homa Bay Garden'
  },
  {
    id: 9,
    title: 'Leafy Greens Harvest',
    description: 'Fresh kale, spinach, and lettuce ready for community distribution.',
    date: '2024-09-12',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Garden Coordinator',
    location: 'Nairobi Garden'
  },
  {
    id: 10,
    title: 'Herb Harvest Collection',
    description: 'Aromatic herbs including basil, mint, and rosemary freshly harvested.',
    date: '2024-07-30',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/2128270/pexels-photo-2128270.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/2128270/pexels-photo-2128270.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Herb Garden Team',
    location: 'Nairobi Garden'
  },

  // Gardens Category
  {
    id: 11,
    title: 'Garden Layout Overview',
    description: 'Aerial view showcasing the organized layout of our urban community garden.',
    date: '2024-05-03',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/102721/pexels-photo-102721.jpeg',
    thumbnail: 'https://images.pexels.com/photos/102721/pexels-photo-102721.jpeg',
    photographer: 'Drone Photography Team',
    location: 'Nairobi Garden'
  },
  {
    id: 12,
    title: 'Herb Garden Section',
    description: 'Dedicated herb garden section featuring medicinal and culinary plants.',
    date: '2024-06-20',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/4503284/pexels-photo-4503284.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503284/pexels-photo-4503284.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Herb Garden Coordinator',
    location: 'Nairobi Garden'
  },
  {
    id: 13,
    title: 'Sunrise Over Gardens',
    description: 'Beautiful sunrise casting golden light over our thriving community garden.',
    date: '2024-07-02',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Early Bird Gardener',
    location: 'Homa Bay Garden'
  },
  {
    id: 14,
    title: 'Flower Garden Section',
    description: 'Colorful flowers that attract pollinators and beautify our community space.',
    date: '2024-04-18',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Garden Designer',
    location: 'Nairobi Garden'
  },
  {
    id: 15,
    title: 'Vertical Garden Innovation',
    description: 'Space-efficient vertical gardening system maximizing our urban growing area.',
    date: '2024-08-28',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Innovation Team',
    location: 'Nairobi Garden'
  },
  {
    id: 16,
    title: 'Compost Area',
    description: 'Our thriving compost system turning organic waste into nutrient-rich soil.',
    date: '2024-06-10',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Sustainability Coordinator',
    location: 'Homa Bay Garden'
  },

  // Events Category
  {
    id: 17,
    title: 'Composting Workshop Success',
    description: 'Participants learning advanced composting techniques to create nutrient-rich soil.',
    date: '2024-07-14',
    category: 'events',
    image: 'https://images.pexels.com/photos/33930197/pexels-photo-33930197.jpeg',
    thumbnail: 'https://images.pexels.com/photos/33930197/pexels-photo-33930197.jpeg',
    photographer: 'Workshop Leader',
    location: 'Nairobi Garden'
  },
  {
    id: 18,
    title: 'Harvest Festival Preparation',
    description: 'Community members preparing decorations and displays for the annual harvest festival.',
    date: '2024-09-15',
    category: 'events',
    image: 'https://images.pexels.com/photos/5642551/pexels-photo-5642551.jpeg',
    thumbnail: 'https://images.pexels.com/photos/5642551/pexels-photo-5642551.jpeg',
    photographer: 'Festival Committee',
    location: 'Both Gardens'
  },
  {
    id: 19,
    title: 'Seed Saving Workshop',
    description: 'Learning traditional seed saving techniques to preserve heirloom varieties.',
    date: '2024-10-05',
    category: 'events',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Seed Saving Expert',
    location: 'Nairobi Garden'
  },
  {
    id: 20,
    title: 'Garden Tool Maintenance Day',
    description: 'Community members learning proper tool care and maintenance techniques.',
    date: '2024-05-12',
    category: 'events',
    image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Tool Maintenance Team',
    location: 'Homa Bay Garden'
  },
  {
    id: 21,
    title: 'Youth Gardening Program',
    description: 'School children learning about sustainable agriculture and healthy eating.',
    date: '2024-09-08',
    category: 'events',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Education Coordinator',
    location: 'Nairobi Garden'
  },
  {
    id: 22,
    title: 'Rainwater Harvesting Installation',
    description: 'Installing sustainable water collection systems for garden irrigation.',
    date: '2024-07-22',
    category: 'events',
    image: 'https://images.pexels.com/photos/221736/pexels-photo-221736.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/221736/pexels-photo-221736.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Water Systems Team',
    location: 'Homa Bay Garden'
  },

  // Additional Community Images
  {
    id: 23,
    title: 'Intergenerational Gardening',
    description: 'Grandparents teaching children traditional farming methods passed down through generations.',
    date: '2024-06-08',
    category: 'community',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Community Documentarian',
    location: 'Nairobi Garden'
  },
  {
    id: 24,
    title: 'Garden Community Market',
    description: 'Local farmers market where community members sell their fresh produce and handmade goods.',
    date: '2024-08-18',
    category: 'community',
    image: 'https://images.pexels.com/photos/1386108/pexels-photo-1386108.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1386108/pexels-photo-1386108.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Market Coordinator',
    location: 'Nairobi Garden'
  },
  {
    id: 25,
    title: 'Evening Garden Social',
    description: 'Community members gathering for an evening of conversation and connection in the garden.',
    date: '2024-07-05',
    category: 'community',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Social Events Team',
    location: 'Homa Bay Garden'
  },
  // New images added
  {
    id: 26,
    title: 'Summer Harvest Celebration',
    description: 'Celebrating a bountiful summer harvest with fresh vegetables and community sharing.',
    date: '2024-08-10',
    category: 'harvests',
    image: 'https://images.pexels.com/photos/7129184/pexels-photo-7129184.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/7129184/pexels-photo-7129184.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Harvest Team',
    location: 'Nairobi Garden'
  },
  {
    id: 27,
    title: 'Organic Pest Control Workshop',
    description: 'Learning natural methods to protect our gardens from pests while maintaining ecological balance.',
    date: '2024-09-20',
    category: 'events',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Workshop Coordinator',
    location: 'Homa Bay Garden'
  },
  {
    id: 28,
    title: 'Flower Garden Bloom',
    description: 'Beautiful flowers in full bloom, attracting pollinators and adding color to our community space.',
    date: '2024-06-15',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Garden Designer',
    location: 'Nairobi Garden'
  },
  {
    id: 29,
    title: 'Community Seed Exchange',
    description: 'Members exchanging seeds and sharing knowledge about heirloom varieties.',
    date: '2024-10-12',
    category: 'community',
    image: 'https://images.pexels.com/photos/1386108/pexels-photo-1386108.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1386108/pexels-photo-1386108.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Seed Exchange Team',
    location: 'Homa Bay Garden'
  },
  {
    id: 30,
    title: 'Winter Garden Preparation',
    description: 'Preparing garden beds for winter with mulch and protective covers.',
    date: '2024-11-05',
    category: 'gardens',
    image: 'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&w=400',
    photographer: 'Winter Prep Team',
    location: 'Nairobi Garden'
  }
];

// =============================================================================
// Gallery Manager Class
// =============================================================================

class GalleryManager {
  constructor() {
    this.allImages = GALLERY_DATA;
    this.filteredImages = GALLERY_DATA;
    this.currentFilter = 'all';
    this.currentImageIndex = 0;
    
    // DOM Elements
    this.galleryContainer = document.getElementById('gallery-container');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.modal = document.getElementById('image-modal');
    this.modalImage = document.getElementById('modal-image');
    this.modalTitle = document.getElementById('modal-title');
    this.modalDescription = document.getElementById('modal-description');
    this.modalDate = document.getElementById('modal-date');
    this.closeModal = document.querySelector('.close-modal');
    this.prevButton = document.getElementById('prev-image');
    this.nextButton = document.getElementById('next-image');
    
    this.init();
  }

  init() {
    if (this.galleryContainer) {
      this.setupEventListeners();
      this.renderGallery();
      this.setupLazyLoading();
    }
  }

  setupEventListeners() {
    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterGallery(category);
        this.updateActiveFilter(e.target);
      });
    });

    // Modal controls
    if (this.closeModal) {
      this.closeModal.addEventListener('click', () => this.closeImageModal());
    }

    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.showPreviousImage());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.showNextImage());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));

    // Close modal on backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeImageModal();
        }
      });
    }
  }

  filterGallery(category) {
    this.currentFilter = category;
    
    if (category === 'all') {
      this.filteredImages = this.allImages;
    } else {
      this.filteredImages = this.allImages.filter(img => img.category === category);
    }
    
    this.renderGallery();
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
  }

  renderGallery() {
    if (!this.galleryContainer) return;

    // Show loading state
    this.galleryContainer.innerHTML = '<div class="gallery-loading">Loading images...</div>';

    // Sort images by date (newest first)
    const sortedImages = [...this.filteredImages].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Simulate loading delay for better UX
    setTimeout(() => {
      this.galleryContainer.innerHTML = '';
      
      if (sortedImages.length === 0) {
        this.showEmptyState();
        return;
      }

      sortedImages.forEach((image, index) => {
        const imageElement = this.createGalleryItem(image, index);
        this.galleryContainer.appendChild(imageElement);
      });

      // Trigger entrance animations
      this.animateGalleryItems();
    }, 300);
  }

  createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = image.category;
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    item.innerHTML = `
      <img src="${image.thumbnail}" alt="${image.title}" loading="lazy" />
      <div class="gallery-overlay">
        <h3>${image.title}</h3>
        <p>${this.formatDate(image.date)}</p>
      </div>
    `;

    // Add click handler
    item.addEventListener('click', () => this.openImageModal(index));

    return item;
  }

  animateGalleryItems() {
    const items = this.galleryContainer.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * GALLERY_CONFIG.ANIMATION_DELAY);
    });
  }

  showEmptyState() {
    this.galleryContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📸</div>
        <h3>No images found</h3>
        <p>No images match your current filter. Try selecting a different category or check back later for new photos.</p>
        <button class="btn btn-outline" onclick="galleryManager.filterGallery('all')">Show All Images</button>
      </div>
    `;
  }

  openImageModal(index) {
    if (!this.modal) return;

    this.currentImageIndex = index;
    const image = this.filteredImages[index];
    
    if (!image) return;

    // Update modal content
    if (this.modalImage) this.modalImage.src = image.image;
    if (this.modalTitle) this.modalTitle.textContent = image.title;
    if (this.modalDescription) this.modalDescription.textContent = image.description;
    if (this.modalDate) {
      this.modalDate.textContent = `📅 ${this.formatDate(image.date)} | 📍 ${image.location} | 📷 ${image.photographer}`;
    }

    // Update navigation buttons
    this.updateModalNavigation();

    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    this.modalImage.focus();
  }

  closeImageModal() {
    if (!this.modal) return;

    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.openImageModal(this.currentImageIndex - 1);
    }
  }

  showNextImage() {
    if (this.currentImageIndex < this.filteredImages.length - 1) {
      this.openImageModal(this.currentImageIndex + 1);
    }
  }

  updateModalNavigation() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentImageIndex === 0;
    }
    
    if (this.nextButton) {
      this.nextButton.disabled = this.currentImageIndex === this.filteredImages.length - 1;
    }
  }

  handleKeyboardNav(e) {
    if (!this.modal.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        this.closeImageModal();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.showPreviousImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.showNextImage();
        break;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: `${GALLERY_CONFIG.LAZY_LOAD_THRESHOLD}px`
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// =============================================================================
// Photo Submission Handler
// =============================================================================

class PhotoSubmission {
  constructor() {
    this.init();
  }

  init() {
    this.setupSubmissionHandlers();
    this.createSubmissionModal();
  }

  setupSubmissionHandlers() {
    // Handle photo submission button clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('photo-submit-btn') || 
          e.target.textContent.includes('Submit Your Photos')) {
        e.preventDefault();
        this.showSubmissionModal();
      }
    });
  }

  createSubmissionModal() {
    // Create modal for photo submission
    const modal = document.createElement('div');
    modal.id = 'photo-submission-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content submission-modal">
        <span class="close-modal">&times;</span>
        <h2>Submit Your Garden Photos</h2>
        <p>We'd love to feature your photos from the garden! Please use one of the methods below to share your images.</p>
        
        <div class="submission-methods">
          <div class="submission-method">
            <h3>📧 Email Submission</h3>
            <p>Send your photos to <strong>livingstoneoduory@gmail.com</strong> with a brief description and the date taken.</p>
            <a href="mailto:livingstoneoduory@gmail.com?subject=Garden Photo Submission" class="btn btn-primary">Send Email</a>
          </div>
          
          <div class="submission-method">
            <h3>📱 WhatsApp</h3>
            <p>Send us your photos via WhatsApp along with a short description.</p>
            <a href="https://wa.me/254721373455?text=I%27d%20like%20to%20submit%20photos%20from%20the%20garden" class="btn btn-secondary" target="_blank">Send via WhatsApp</a>
          </div>
          
          <div class="submission-method">
            <h3>📞 Call Us</h3>
            <p>Call us to discuss your photo submission or arrange for photo collection.</p>
            <a href="tel:+254721373455" class="btn btn-outline">Call +254 721 373 455</a>
          </div>
        </div>
        
        <div class="submission-guidelines">
          <h4>Photo Guidelines:</h4>
          <ul>
            <li>Photos should be from Greenwood Community Garden activities</li>
            <li>Include a brief description and date</li>
            <li>Let us know if you'd like photo credit</li>
            <li>High-resolution images preferred</li>
            <li>All photos should be appropriate for all audiences</li>
          </ul>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners for the new modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => this.hideSubmissionModal());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideSubmissionModal();
      }
    });
  }

  showSubmissionModal() {
    const modal = document.getElementById('photo-submission-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  hideSubmissionModal() {
    const modal = document.getElementById('photo-submission-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// =============================================================================
// Gallery Statistics and Analytics
// =============================================================================

class GalleryStats {
  constructor() {
    this.viewStats = new Map();
    this.init();
  }

  init() {
    this.loadViewStats();
    this.trackImageViews();
  }

  loadViewStats() {
    // Load view statistics from localStorage
    const stored = localStorage.getItem('galleryViewStats');
    if (stored) {
      this.viewStats = new Map(JSON.parse(stored));
    }
  }

  saveViewStats() {
    // Save view statistics to localStorage
    localStorage.setItem('galleryViewStats', JSON.stringify([...this.viewStats]));
  }

  trackImageViews() {
    // Track when images are viewed in modal
    document.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-item')) {
        const galleryItem = e.target.closest('.gallery-item');
        const imageTitle = galleryItem.querySelector('h3').textContent;
        
        // Increment view count
        const currentViews = this.viewStats.get(imageTitle) || 0;
        this.viewStats.set(imageTitle, currentViews + 1);
        this.saveViewStats();
      }
    });
  }

  getMostViewedImages(limit = 5) {
    return [...this.viewStats.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }
}

// =============================================================================
// Gallery Search and Filtering Enhancements
// =============================================================================

class GallerySearch {
  constructor() {
    this.searchInput = null;
    this.init();
  }

  init() {
    this.createSearchBox();
    this.setupSearchFunctionality();
  }

  createSearchBox() {
    const filterSection = document.querySelector('.gallery-filter');
    if (!filterSection) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <div class="search-box">
        <input type="text" id="gallery-search" placeholder="Search photos by title, description, or location..." />
        <button type="button" class="search-clear" id="search-clear">&times;</button>
      </div>
    `;

    filterSection.appendChild(searchContainer);

    this.searchInput = document.getElementById('gallery-search');
    this.clearButton = document.getElementById('search-clear');
  }

  setupSearchFunctionality() {
    if (!this.searchInput) return;

    // Debounced search
    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value.toLowerCase());
      }, 300);
    });

    // Clear search
    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        this.searchInput.value = '';
        this.performSearch('');
      });
    }
  }

  performSearch(searchTerm) {
    if (!window.galleryManager) return;

    let filteredImages = window.galleryManager.allImages;

    // Apply category filter first
    if (window.galleryManager.currentFilter !== 'all') {
      filteredImages = filteredImages.filter(img => 
        img.category === window.galleryManager.currentFilter
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredImages = filteredImages.filter(img =>
        img.title.toLowerCase().includes(searchTerm) ||
        img.description.toLowerCase().includes(searchTerm) ||
        img.location.toLowerCase().includes(searchTerm) ||
        img.photographer.toLowerCase().includes(searchTerm)
      );
    }

    // Update filtered images and re-render
    window.galleryManager.filteredImages = filteredImages;
    window.galleryManager.renderGallery();
  }
}

// =============================================================================
// Initialization
// =============================================================================

let galleryManager;
let photoSubmission;
let galleryStats;
let gallerySearch;

document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the gallery page
  if (document.querySelector('.photo-gallery') || document.querySelector('.gallery-grid')) {
    galleryManager = new GalleryManager();
    photoSubmission = new PhotoSubmission();
    galleryStats = new GalleryStats();
    gallerySearch = new GallerySearch();
    
    console.log('📸 Gallery page functionality initialized');
  }
});

// =============================================================================
// Additional CSS for Gallery Page
// =============================================================================

const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
  .gallery-loading {
    text-align: center;
    padding: 3rem;
    color: var(--medium-gray);
    font-size: 1.125rem;
  }

  .gallery-loading::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid var(--light-gray);
    border-top: 2px solid var(--primary-green);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 0.5rem;
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: var(--medium-gray);
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .submission-modal {
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .submission-methods {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .submission-method {
    background: var(--pale-green);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    text-align: center;
  }

  .submission-method h3 {
    color: var(--primary-green);
    margin-bottom: 0.75rem;
  }

  .submission-method p {
    margin-bottom: 1rem;
    color: var(--medium-gray);
  }

  .submission-guidelines {
    background: var(--cream);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    margin-top: 2rem;
  }

  .submission-guidelines h4 {
    color: var(--primary-green);
    margin-bottom: 1rem;
  }

  .submission-guidelines ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .submission-guidelines li {
    color: var(--medium-gray);
    margin-bottom: 0.5rem;
  }

  .search-container {
    margin-top: 1rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box input {
    width: 100%;
    padding: 0.75rem;
    padding-right: 2.5rem;
    border: 2px solid var(--light-gray);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    transition: border-color 0.3s ease;
  }

  .search-box input:focus {
    outline: none;
    border-color: var(--primary-green);
  }

  .search-clear {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: var(--medium-gray);
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
  }

  .search-clear:hover {
    background: var(--light-gray);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .submission-modal {
      max-width: 95vw;
      margin: 1rem;
    }
    
    .submission-methods {
      grid-template-columns: 1fr;
    }
    
    .search-container {
      max-width: 100%;
      margin-top: 1rem;
    }
  }
`;

document.head.appendChild(galleryStyles);