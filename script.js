// Page switching functionality
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const currentLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'home': 'Home - Power Appliances',
        'televisions': 'Televisions - Power Appliances', 
        'about': 'About Us - Power Appliances'
    };
    
    if (titles[pageName]) {
        document.title = titles[pageName];
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');
    
    // Add mouse over effects to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});