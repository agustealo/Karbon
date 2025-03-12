document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio JS Loaded');

    // Ensure karbon is available in global scope
    window.karbon = window.karbon || {};

    // **Portfolio Filter Functionality**
    window.karbon.filterWorks = function (filterValue = '*') {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (filterValue === '*' || project.classList.contains(filterValue.substring(1))) {
                project.style.display = 'block';
                setTimeout(() => project.classList.add('show'), 10);
            } else {
                project.classList.remove('show');
                setTimeout(() => project.style.display = 'none', 300);
            }
        });

        // Update active filter styling
        document.querySelectorAll('.portfolio-filter a').forEach(btn => {
            btn.classList.remove('selected'); // Remove selected class from all
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('selected'); // Add to the current active filter
            }
        });
    };

    // Select all filter buttons and add event listeners
    const filters = document.querySelectorAll('.portfolio-filter a');
    filters.forEach(filter => {
        filter.addEventListener('click', function (e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            window.karbon.filterWorks(filterValue);
        });
    });

    // Ensure filtering runs once on page load
    window.karbon.filterWorks('*');

    /* --- Masonry Grid - Dynamic Column Layout --- */
    function resizeMasonryGrid() {
        const grid = document.querySelector('.portfolio-contents');
        if (!grid) return; // Prevents calling getComputedStyle on null

        const computedStyle = window.getComputedStyle(grid);
        const columns = parseInt(computedStyle.getPropertyValue('--columns'), 10) || 3;
        let columnWidth = grid.offsetWidth / columns;

        document.querySelectorAll('.project').forEach(item => {
            let rowSpan = Math.ceil((item.offsetHeight + 20) / columnWidth);
            item.style.gridRowEnd = `span ${rowSpan}`;
        });
    }

    // Resize masonry grid on load and window resize
    window.addEventListener('load', resizeMasonryGrid);
    window.addEventListener('resize', resizeMasonryGrid);
});
