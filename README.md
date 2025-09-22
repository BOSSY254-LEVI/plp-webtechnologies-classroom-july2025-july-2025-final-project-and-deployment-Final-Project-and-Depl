# 🌿 Greenwood Community Garden Website

A responsive, multi-page website built with pure HTML5, CSS3, and vanilla JavaScript for the Greenwood Community Garden. This project serves as a hub for a fictional hyperlocal community, showcasing modern front-end development practices, clean code organization, and interactive features.

## 🚀 Live Demo

[View the live website ](https://communityhub-eta.vercel.app/)  

---

## ✨ Features

- **🚀 Fully Responsive Design:** Optimized for all devices (mobile, tablet, desktop).
- **🎨 Modern UI/UX:** Clean, accessible design with a nature-inspired color scheme.
- **⚡ Pure Vanilla JavaScript:** No heavy frameworks—just modern, efficient JS.
- **📄 Multi-Page Structure:** Five interconnected pages with consistent navigation.
- **🖼️ Dynamic Gallery:** Lightbox functionality for viewing images in detail.
- **📝 Interactive Forms:** Client-side validation with user-friendly feedback.
- **🗺️ Interactive Map:** Integrated using the Leaflet.js library.
- **♿ Accessibility Focused:** Built with semantic HTML and keyboard navigation.

---

```
## 📁 Project Structure

bash 
greenwood-community-garden/
│
├── index.html          # Homepage - hero section and features
├── about.html          # Our story, mission, vision, and team
├── events.html         # Events listing and registration form
├── gallery.html        # Photo gallery with lightbox
├── contact.html        # Contact form and interactive map
│
├── css/
│   └── style.css       # All styles for the entire website
│
├── js/
│   ├── script.js       # Global scripts (navigation, footer year)
│   ├── events.js       # Dynamic events and form validation
│   ├── gallery.js      # Gallery image array and lightbox logic
│   └── contact.js      # Contact form validation and map setup
│
└── assets/
    ├── images/         # Directory for all image assets
    └── icons/          # Directory for SVG icons (if used)


```
# 🛠️ Technologies Used
HTML5: Semantic markup for better accessibility and SEO.

CSS3: Flexbox, Grid, Animations, Transitions, and Variables.

JavaScript (ES6+): Modules, DOM Manipulation, Event Handling.

Leaflet.js: Lightweight open-source library for interactive maps.

Unsplash: High-quality, royalty-free images for placeholders.

# 🎯 Key Implementation Details
1. Responsive Navigation
Custom hamburger menu for mobile view.

Smooth slide-in animation for the mobile menu.

Accessible navigation using ARIA labels.

2. Interactive Components
Form Validation: Real-time error messages and success feedback.

Image Lightbox: Modal popup that can be closed via X button, clicking outside, or pressing the Escape key.

Dynamic Content: Event cards and gallery images are populated from JavaScript arrays, making content easy to manage.

3. Performance & Code Quality
CSS Grid and Flexbox for efficient, modern layouts.

Clean, well-commented, and organized code for easy maintenance.

Vanilla JS for minimal dependencies and fast loading.


# 🌐 Browser Support
This website supports all modern browsers:

Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

# 📞 Support
If you encounter any issues:

Check the JavaScript console in your browser for error messages (F12 -> Console).

Ensure all file paths are correct. The website must be run on a local or live server to avoid CORS issues with the images.

Verify that the Leaflet script and CSS links are correctly added to contact.html.

# 📄 License
This project is open source and available under the MIT License.

# Built with ❤️ for community building and sustainable urban development.
