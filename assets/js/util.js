/**
 * Utility functions for the website
 */

// Debounce function for resize events
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Theme management functionality
const themeManager = {
  // Set theme on the document
  setTheme: function(theme) {
    const htmlEl = document.documentElement;
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      if (lightIcon && darkIcon) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
      }
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      if (lightIcon && darkIcon) {
        lightIcon.style.display = 'inline-block';
        darkIcon.style.display = 'none';
      }
      localStorage.setItem('theme', 'light');
    }
  },
  
  // Get the current theme
  getCurrentTheme: function() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },
  
  // Toggle between light and dark themes
  toggleTheme: function() {
    const currentTheme = this.getCurrentTheme();
    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  },
  
  // Initialize theme based on saved preference or system default
  initTheme: function() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setTheme('dark');
      } else {
        this.setTheme('light');
      }
    }
  }
};

// Make available globally
window.siteUtils = {
  debounce,
  themeManager
};