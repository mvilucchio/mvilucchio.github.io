/**
 * Main JavaScript file for the website
 * Initializes all global functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  window.siteUtils.themeManager.initTheme();
  
  // Set up theme toggle listener
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      window.siteUtils.themeManager.toggleTheme();
    });
  }
  
  // Initialize header scroll effects
  initHeaderScrollEffects();
  
  // Initialize image loader for lazy loading
  initImageLoader();
});

// Header scroll effects
function initHeaderScrollEffects() {
  const header = document.querySelector('header');
  const mainContent = document.querySelector('main');
  let lastScrollTop = 0;
  let ticking = false;
  
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only update when we've scrolled more than 5px 
    // (prevents micro-updates from touch screens)
    if (Math.abs(lastScrollTop - scrollTop) > 5) {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (scrollTop > 10) {
            header.classList.add('header-scrolled');
            
            // Calculate blur amount based on scroll position (max 10px)
            const blurAmount = Math.min(scrollTop / 30, 10);
            header.style.backdropFilter = `blur(${blurAmount}px)`;
            header.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
            
            // Add a small transition delay to smooth the effect
            mainContent.style.marginTop = '0';
          } else {
            header.classList.remove('header-scrolled');
            header.style.backdropFilter = 'blur(0px)';
            header.style.webkitBackdropFilter = 'blur(0px)';
            mainContent.style.marginTop = '0';
          }
          lastScrollTop = scrollTop;
          ticking = false;
        });
        
        ticking = true;
      }
    }
  }
  
  // Listen for scroll events with passive flag for performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial call to set initial state
  handleScroll();
}

// Initialize lazy image loading
function initImageLoader() {
  // Find all images that need to be lazy-loaded
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  // Function to load the images
  function loadImage(img) {
    img.src = img.getAttribute('data-src');
  }
  
  // Load all images with a small delay between each one
  if (lazyImages.length > 0) {
    let index = 0;
    const loadNextImage = function() {
      if (index < lazyImages.length) {
        loadImage(lazyImages[index]);
        index++;
        setTimeout(loadNextImage, 50); // 50ms delay between loading each image
      }
    };
    
    // Start loading images
    loadNextImage();
  }
}