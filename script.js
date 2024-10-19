

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    // JavaScript to handle the sidebar collapse/expand
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.classList.toggle('dark-mode', savedTheme === 'dark');
      toggle.checked = savedTheme === 'dark';
    }
  
    toggle.addEventListener('change', function() {
      if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });

    })

    document.addEventListener('DOMContentLoaded', () => {
        const rows = document.querySelectorAll('.event-table tbody tr');
        const searchInput = document.getElementById('search-input');
        const dateFilter = document.getElementById('date-filter');
        const statusFilter = document.getElementById('status-filter');
        const nameFilter = document.getElementById('name-filter');
        const resultCount = document.getElementById('result-count');
        let filteredRows = Array.from(rows);
      
        // Function to update the result count
        function updateResultCount() {
          resultCount.textContent = `Displaying ${filteredRows.length} results`;
        }
      
        // Search functionality
        searchInput.addEventListener('input', () => {
          const query = searchInput.value.toLowerCase();
          filteredRows = Array.from(rows).filter(row => {
            const eventName = row.cells[0].innerText.toLowerCase();
            const speakerName = row.cells[2].innerText.toLowerCase();
            return eventName.includes(query) || speakerName.includes(query);
          });
          updateTable();
        });
      
        // Filter by date (ascending/descending)
        dateFilter.addEventListener('change', () => {
          const sortOrder = dateFilter.value;
          filteredRows.sort((rowA, rowB) => {
            const dateA = new Date(rowA.cells[1].innerText);
            const dateB = new Date(rowB.cells[1].innerText);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          });
          updateTable();
        });
      
        // Filter by status (completed, in-progress)
        statusFilter.addEventListener('change', () => {
          const status = statusFilter.value;
          filteredRows = Array.from(rows).filter(row => {
            const eventStatus = row.cells[3].innerText.toLowerCase();
            return !status || eventStatus.includes(status);
          });
          updateTable();
        });
      
        // Filter by speaker name
        nameFilter.addEventListener('change', () => {
          const name = nameFilter.value.toLowerCase();
          filteredRows = Array.from(rows).filter(row => {
            const speakerName = row.cells[2].innerText.toLowerCase();
            return !name || speakerName.includes(name);
          });
          updateTable();
        });
      
        // Function to update the table with filtered rows
        function updateTable() {
          rows.forEach(row => row.style.display = 'none'); // Hide all rows first
          filteredRows.forEach(row => row.style.display = 'table-row'); // Show filtered rows
          updateResultCount();
        }
      
        // Initial update
        updateTable();
      });
      
      document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelectorAll('.carousel-container .news');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.carousel-container');
        let currentSlide = 0;
        const totalSlides = slides.length;
        const slideInterval = 3000; // Time in milliseconds (3 seconds)
        let autoSlide;
      
        function showSlide(index, direction) {
          // Set the direction as a data attribute for CSS to use
          carouselContainer.setAttribute('data-direction', direction);
      
          slides.forEach((slide, i) => {
            if (i === index) {
              slide.classList.remove('exit');
              slide.classList.add('active');
            } else if (slide.classList.contains('active')) {
              slide.classList.remove('active');
              slide.classList.add('exit');
            } else {
              slide.classList.remove('active', 'exit');
            }
          });
        }
      
        function nextSlide() {
          const previousSlide = currentSlide;
          currentSlide = (currentSlide + 1) % totalSlides; // Go to the next slide
          showSlide(currentSlide, 'next');
        }
      
        function prevSlide() {
          const previousSlide = currentSlide;
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Go to the previous slide
          showSlide(currentSlide, 'prev');
        }
      
        // Initial display of the first slide
        showSlide(currentSlide, 'next'); // Default is 'next'
      
        // Auto-slide every few seconds
        autoSlide = setInterval(nextSlide, slideInterval);
      
        // Event listeners for the buttons
        nextButton.addEventListener('click', () => {
          clearInterval(autoSlide); // Stop auto-sliding when manually controlled
          nextSlide(); // Trigger next slide
          autoSlide = setInterval(nextSlide, slideInterval); // Resume auto-sliding
        });
      
        prevButton.addEventListener('click', () => {
          clearInterval(autoSlide); // Stop auto-sliding when manually controlled
          prevSlide(); // Trigger previous slide
          autoSlide = setInterval(nextSlide, slideInterval); // Resume auto-sliding
        });
      });
      
      
      