

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const theads = document.getElementsByTagName('thead');
    const tbodys = document.getElementsByTagName('tbody');
    const eventchart = document.querySelector('.event-chart');
    const mysidebar = document.querySelector('.sidebar');
    const summarycard = document.querySelectorAll('.summary-card');
    const inprogress = document.querySelectorAll('in-progress')
    const thead = theads[0];  // This gets the first <thead> element
    const tbody = tbodys[0];  // This gets the first <tbody> element

  
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
      thead.classList.toggle('dark-mode', savedTheme === 'dark');
      tbody.classList.toggle('dark-mode', savedTheme === 'dark');
      eventchart.classList.toggle('dark-mode', savedTheme === 'dark');
      mysidebar.classList.toggle('dark-mode', savedTheme === 'dark');
      summarycard.forEach(card=>{
        card.classList.toggle('dark-mode', savedTheme === 'dark')});
      inprogress.forEach(item=>{
        item.classList.toggle('dark-mode', savedTheme === 'dark')});
      toggle.checked = savedTheme === 'dark';
    }
  
    toggle.addEventListener('change', function() {
      if (this.checked) {
        body.classList.add('dark-mode');
        thead.classList.add('dark-mode');
        tbody.classList.add('dark-mode');
        eventchart.classList.add('dark-mode');
        mysidebar.classList.add('dark-mode');
        summarycard.classList.add('dark-mode');
        inprogress.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        thead.classList.remove('dark-mode');
        tbody.classList.remove('dark-mode');
        eventchart.classList.remove('dark-mode');
        mysidebar.classList.remove('dark-mode');
        summarycard.classList.remove('dark-mode');
        inprogress.classList.remove('dark-mode');
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
        const indicators = document.querySelectorAll('.carousel-container .indicator');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.carousel-container');
        let currentSlide = 0;
        const totalSlides = slides.length;
        const slideInterval = 3000; // Time in milliseconds (3 seconds)
        let autoSlide;
      
        function updateIndicators(index) {
          indicators.forEach((indicator, i) => {
            if (i === index) {
              indicator.classList.add('active');
            } else {
              indicator.classList.remove('active');
            }
          });
        }
      
        function showSlide(index, direction) {
          carouselContainer.setAttribute('data-direction', direction);
      
          slides.forEach((slide, i) => {
            if (i === index) {
              slide.classList.add('active');
              slide.classList.remove('exit');
            } else if (slide.classList.contains('active')) {
              slide.classList.remove('active');
              slide.classList.add('exit');
            } else {
              slide.classList.remove('active', 'exit');
            }
          });
      
          // Update indicators to reflect current slide
          updateIndicators(index);
        }
      
        function nextSlide() {
          currentSlide = (currentSlide + 1) % totalSlides; // Go to the next slide
          showSlide(currentSlide, 'next');
        }
      
        function prevSlide() {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Go to the previous slide
          showSlide(currentSlide, 'prev');
        }
      
        // Initial display of the first slide
        showSlide(currentSlide, 'next');
      
        // Auto-slide every few seconds
        autoSlide = setInterval(nextSlide, slideInterval);
      
        // Event listeners for the buttons
        nextButton.addEventListener('click', () => {
          clearInterval(autoSlide);
          nextSlide();
          autoSlide = setInterval(nextSlide, slideInterval);
        });
      
        prevButton.addEventListener('click', () => {
          clearInterval(autoSlide);
          prevSlide();
          autoSlide = setInterval(nextSlide, slideInterval);
        });
      
        // Add click event to indicators for manual selection
        indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => {
            clearInterval(autoSlide);
            currentSlide = index;
            showSlide(currentSlide, 'next');
            autoSlide = setInterval(nextSlide, slideInterval);
          });
        });
      });
      
      
      
      