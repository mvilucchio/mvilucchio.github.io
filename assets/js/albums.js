document.addEventListener('DOMContentLoaded', function() {
  // Get the album container
  const albumContainer = document.getElementById('album-container');
  
  // Album pagination state
  const state = {
    currentPage: 1,
    albumsPerPage: 16, // 4x4 grid
    totalAlbums: 0,
    totalPages: 0
  };
  
  // Display albums with pagination
  function displayAlbums() {
    // Clear any existing content
    albumContainer.innerHTML = '';
    
    // Get albums from Jekyll data
    const allAlbums = getAlbumsFromJekyll();
    state.totalAlbums = allAlbums.length;
    state.totalPages = Math.ceil(state.totalAlbums / state.albumsPerPage);
    
    // Create album grid container
    const grid = document.createElement('div');
    grid.className = 'album-grid';
    albumContainer.appendChild(grid);
    
    // Add pagination container
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    albumContainer.appendChild(paginationContainer);
    
    // Display the current page of albums
    displayCurrentPage(grid, allAlbums);
    
    // Add pagination controls
    createPaginationControls(paginationContainer);
  }
  
  // Display current page of albums
  function displayCurrentPage(grid, allAlbums) {
    // Clear the grid
    grid.innerHTML = '';
    
    // Calculate start and end indices for the current page
    const startIndex = (state.currentPage - 1) * state.albumsPerPage;
    const endIndex = Math.min(startIndex + state.albumsPerPage, state.totalAlbums);
    
    // Get albums for the current page
    const pageAlbums = allAlbums.slice(startIndex, endIndex);
    
    // Add albums to grid
    pageAlbums.forEach((album, index) => {
      grid.appendChild(createAlbumItem(album, startIndex + index));
    });
  }
  
  // Create pagination controls
  function createPaginationControls(container) {
    // Clear the container
    container.innerHTML = '';
    
    // Create previous button
    const prevButton = document.createElement('div');
    prevButton.className = 'pagination-control' + (state.currentPage === 1 ? ' disabled' : '');
    prevButton.innerHTML = '&laquo;';
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.addEventListener('click', function() {
      if (state.currentPage > 1) {
        state.currentPage--;
        updateDisplay();
      }
    });
    
    // Create page info
    const pageInfo = document.createElement('div');
    pageInfo.className = 'pagination-info';
    pageInfo.textContent = `${state.currentPage} / ${state.totalPages}`;
    
    // Create next button
    const nextButton = document.createElement('div');
    nextButton.className = 'pagination-control' + (state.currentPage === state.totalPages ? ' disabled' : '');
    nextButton.innerHTML = '&raquo;';
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.addEventListener('click', function() {
      if (state.currentPage < state.totalPages) {
        state.currentPage++;
        updateDisplay();
      }
    });
    
    // Add controls to container
    container.appendChild(prevButton);
    container.appendChild(pageInfo);
    container.appendChild(nextButton);
  }
  
  // Update the display when page changes
  function updateDisplay() {
    const grid = albumContainer.querySelector('.album-grid');
    const paginationContainer = albumContainer.querySelector('.pagination-container');
    
    if (grid && paginationContainer) {
      displayCurrentPage(grid, getAlbumsFromJekyll());
      createPaginationControls(paginationContainer);
    }
  }
  
  // Get albums from Jekyll data
  function getAlbumsFromJekyll() {
    // This is set from the _data/albums.yml file via Jekyll
    return window.siteAlbums || [];
  }
  
  // Create album item for grid
  function createAlbumItem(album, index) {
    const item = document.createElement('div');
    item.className = 'library-item';
    item.dataset.index = index;
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    // Create album cover image
    const img = document.createElement('img');
    img.alt = `${album.title} by ${album.artist}`;
    img.loading = 'lazy'; // Lazy load images
    
    // Ensure we handle both cases - immediate load and async load
    img.onload = function() {
      // Add class to both the image and container to ensure spinner stops
      this.classList.add('loaded');
      imageContainer.classList.add('loaded');
    };
    
    // Force loaded state after a timeout to fix any stuck spinners
    setTimeout(() => {
      img.classList.add('loaded');
      imageContainer.classList.add('loaded');
    }, 1000);
    
    // Set source to trigger load - do this last
    img.src = album.cover || album.coverlink;
    
    // Create overlay for album info
    const overlay = document.createElement('div');
    overlay.className = 'album-overlay';
    
    // Add album details to overlay
    overlay.innerHTML = `
      <h3>${album.title}</h3>
      <p class="artist">${album.artist}</p>
      <p class="year">${album.year}</p>
      ${album.link ? `<a href="${album.link}" target="_blank" class="listen-button">Listen</a>` : ''}
    `;
    
    // Assemble the item
    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);
    item.appendChild(imageContainer);
    
    return item;
  }
  
  // Handle browser window resize
  function handleResize() {
    // Adjust albums per page based on screen size
    if (window.innerWidth <= 480) {
      // Mobile: 2x3 grid = 6 albums per page
      state.albumsPerPage = 6;
    } else if (window.innerWidth <= 768) {
      // Tablet portrait: 2x4 grid = 8 albums per page
      state.albumsPerPage = 8;
    } else if (window.innerWidth <= 1200) {
      // Tablet landscape: 3x4 grid = 12 albums per page
      state.albumsPerPage = 12;
    } else {
      // Desktop: 4x4 grid = 16 albums per page
      state.albumsPerPage = 16;
    }
    
    // Recalculate total pages
    state.totalPages = Math.ceil(state.totalAlbums / state.albumsPerPage);
    
    // Ensure current page is valid
    if (state.currentPage > state.totalPages) {
      state.currentPage = state.totalPages;
    }
    
    // Update display
    updateDisplay();
  }
  
  // Listen for window resize events
  window.addEventListener('resize', function() {
    // Use debounce to prevent too many calls during resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(handleResize, 250);
  });
  
  // Initialize
  displayAlbums();
  handleResize(); // Set initial albums per page based on screen size
});