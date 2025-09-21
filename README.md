``` 🌿 Greenwood Community Garden Website ```

A responsive, multi-page website built with pure HTML5, CSS3, and vanilla JavaScript for the Greenwood Community Garden, a fictional hyperlocal community hub. This project showcases modern front-end development practices, clean code organization, and interactive features without relying on any external frameworks.

https://images.unsplash.com/photo-1591872203534-278fb0895f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1200&q=80

``` 🚀 Live Demo
https://bossy254-levi.github.io/plp-webtechnologies-classroom-july2025-july-2025-final-project-and-deployment-Final-Project-and-Depl/
```

✨ Features
🚀 Fully Responsive Design: Optimized for all devices (mobile, tablet, desktop)

🎨 Modern UI/UX: Clean, accessible design with a nature-inspired color scheme

⚡ Pure Vanilla JavaScript: No frameworks or libraries (except Leaflet.js for maps)

📄 Multi-Page Structure: Five interconnected pages with consistent navigation

🖼️ Dynamic Gallery: Lightbox functionality for image viewing

📝 Interactive Forms: Client-side validation with user-friendly feedback

🗺️ Interactive Map: Leaflet.js integration with custom markers

♿ Accessibility Focused: Semantic HTML and ARIA-friendly patterns

📁 Project Structure
text
greenwood-community-garden/
│
├── index.html          # Homepage with hero section and features
├── about.html          # About us page with story, mission, and team
├── events.html         # Events listing and registration form
├── gallery.html        # Photo gallery with lightbox functionality
├── contact.html        # Contact form and interactive map
│
├── css/
│   └── style.css       # Main stylesheet with all page styles
│
├── js/
│   ├── script.js       # Global scripts (navigation, footer)
│   ├── events.js       # Events page functionality
│   ├── gallery.js      # Gallery lightbox functionality
│   └── contact.js      # Contact form and map initialization
│
└── assets/
    ├── images/         # Directory for image assets
    └── icons/          # Directory for icon assets
🛠️ Technologies Used
HTML5: Semantic markup, accessibility features

CSS3: Flexbox, Grid, animations, transitions, variables

JavaScript (ES6+): DOM manipulation, event handling, form validation

Leaflet.js: Open-source library for interactive maps

Unsplash API: High-quality placeholder images

🎯 Key Implementation Details
Responsive Navigation
Hamburger menu on mobile devices

Smooth animations and transitions

Accessible navigation patterns

Interactive Components
Form Validation: Real-time feedback with custom error messages

Image Lightbox: Modal popup with keyboard navigation (ESC key)

Dynamic Content: JavaScript-generated event cards and gallery items

Interactive Map: Custom markers, popups, and geolocation

Performance Optimizations
CSS Grid and Flexbox for layout

Optimized image loading

Minimal JavaScript with efficient event delegation

Clean, commented, and organized code

🚀 Deployment Instructions
Option 1: Netlify (Recommended)
Push your code to a GitHub repository

Sign up for a free Netlify account

Click "New site from Git"

Connect your GitHub repository

Set build command to: None (since it's static HTML)

Set publish directory to: / (root directory)

Click "Deploy site"

Option 2: GitHub Pages
Push your code to a GitHub repository

Go to repository Settings → Pages

Select "Deploy from a branch"

Choose "main" branch and root folder

Click "Save"

Your site will be available at https://[username].github.io/[repository-name]

Option 3: Vercel
Push your code to a GitHub repository

Sign up for a free Vercel account

Import your GitHub repository

Vercel will automatically detect the static site and deploy it

📝 Customization Guide
Updating Content
Text Content: Edit the HTML files directly

Colors: Modify CSS custom properties in :root selector in style.css

Images: Replace placeholder images in the assets/images/ folder

Events: Update the events array in js/events.js

Gallery: Update the galleryImages array in js/gallery.js

Adding New Pages
Create new HTML file following existing structure

Add navigation link to all pages

Add page-specific styles to style.css

Add page-specific JavaScript if needed

Styling Modifications
The CSS is organized with clear sections:

css
/* Global Styles */
/* Header & Navigation */
/* Home Page Styles */
/* About Page Styles */
/* Events Page Styles */
/* Gallery Page Styles */
/* Contact Page Styles */
/* Media Queries */
🌐 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Mobile browsers (iOS Safari, Chrome Mobile)

📞 Support
If you have any questions or need help with customization:

Check the code comments for implementation details

Review the JavaScript console for any errors

Ensure all file paths are correct for your deployment

📄 License
This project is open source and available under the MIT License.

🎓 Learning Objectives Achieved
This project demonstrates proficiency in:

Semantic HTML5 structure

Advanced CSS layout techniques (Grid, Flexbox)

Vanilla JavaScript DOM manipulation

Form validation and user feedback

Responsive web design principles

API integration (Leaflet.js, Unsplash)

Project organization and architecture

Deployment and hosting workflows

👥 Contributing
Fork the project

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

🙏 Acknowledgments
Community garden concept inspired by real urban agriculture initiatives

Images from Unsplash

Maps by Leaflet and OpenStreetMap

UI avatars by UI Faces

Built with ❤️ for community building and sustainable urban development.
