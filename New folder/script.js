// Enhanced Professional JavaScript with Advanced Animations and Interactive Elements

// Global variables for charts
let energyChart, tvChart, impactChart;
let energyMeterInterval;

// Page switching functionality with enhanced animations
function showPage(pageName) {
    // Hide all pages with fade out effect
    const pages = document.querySelectorAll('.page');
    const currentPage = document.querySelector('.page.active');
    
    if (currentPage) {
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page with fade in effect
            const targetPage = document.getElementById(pageName + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateY(20px)';
                
                // Trigger reflow
                targetPage.offsetHeight;
                
                // Animate in
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
                
                // Refresh AOS animations for the new page
                setTimeout(() => {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                    
                    // Initialize charts for the specific page
                    initializeChartsForPage(pageName);
                }, 300);
            }
        }, 200);
    } else {
        // First load
        const targetPage = document.getElementById(pageName + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
            setTimeout(() => {
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                initializeChartsForPage(pageName);
            }, 100);
        }
    }
    
    // Update navigation active state with animation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Add active class to current page link with bounce effect
    const currentLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
        currentLink.style.transform = 'scale(1.05)';
        setTimeout(() => {
            currentLink.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update page title with typing effect
    const titles = {
        'home': 'Home - Power Appliances',
        'televisions': 'Televisions - Power Appliances', 
        'about': 'About Us - Power Appliances'
    };
    
    if (titles[pageName]) {
        document.title = titles[pageName];
    }
}

// Initialize charts based on current page
function initializeChartsForPage(pageName) {
    switch(pageName) {
        case 'home':
            initializeEnergyChart();
            startEnergyMeterAnimation();
            break;
        case 'televisions':
            initializeTVChart();
            break;
        case 'about':
            initializeImpactChart();
            startCounterAnimations();
            break;
    }
}

// Energy meter animation for home page
function startEnergyMeterAnimation() {
    const meterValue = document.getElementById('energy-meter');
    if (!meterValue) return;
    
    let currentValue = 0;
    const targetValue = 12500;
    const duration = 3000;
    const increment = targetValue / (duration / 50);
    
    if (energyMeterInterval) {
        clearInterval(energyMeterInterval);
    }
    
    energyMeterInterval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(energyMeterInterval);
        }
        meterValue.textContent = Math.floor(currentValue).toLocaleString();
    }, 50);
}

// Counter animations for statistics
function startCounterAnimations() {
    const counters = document.querySelectorAll('[data-aos="count-up"]');
    
    counters.forEach(counter => {
        const numberElement = counter.querySelector('.stat-number');
        if (!numberElement) return;
        
        const text = numberElement.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d,]/g, '');
        
        let currentValue = 0;
        const increment = number / 60;
        const duration = 2000;
        
        const animate = () => {
            currentValue += increment;
            if (currentValue >= number) {
                numberElement.textContent = number.toLocaleString() + suffix;
                return;
            }
            numberElement.textContent = Math.floor(currentValue).toLocaleString() + suffix;
            requestAnimationFrame(animate);
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Energy consumption chart for home page
function initializeEnergyChart() {
    const ctx = document.getElementById('energyChart');
    if (!ctx) return;
    
    if (energyChart) {
        energyChart.destroy();
    }
    
    energyChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Heating & Cooling', 'Water Heating', 'Appliances', 'Lighting', 'Other'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#E67E22',
                    '#8B4513',
                    '#F1C40F',
                    '#3498DB',
                    '#95A5A6'
                ],
                borderWidth: 3,
                borderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000
            }
        }
    });
}

// TV energy comparison chart
function initializeTVChart() {
    const ctx = document.getElementById('tvChart');
    if (!ctx) return;
    
    if (tvChart) {
        tvChart.destroy();
    }
    
    tvChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Old CRT TV', 'Plasma TV', 'LCD TV', 'LED TV', 'OLED TV'],
            datasets: [{
                label: 'Annual Energy Consumption (kWh)',
                data: [350, 400, 200, 120, 150],
                backgroundColor: [
                    '#E74C3C',
                    '#E67E22',
                    '#F1C40F',
                    '#27AE60',
                    '#3498DB'
                ],
                borderColor: [
                    '#C0392B',
                    '#D35400',
                    '#D4AC0D',
                    '#239B56',
                    '#2E86C1'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' kWh/year';
                        },
                        afterLabel: function(context) {
                            const cost = Math.round(context.parsed.y * 0.28);
                            return 'Estimated annual cost: $' + cost;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Energy Consumption (kWh/year)',
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'TV Technology',
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                delay: (context) => context.dataIndex * 200
            }
        }
    });
}

// Environmental impact chart for about page
function initializeImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    
    if (impactChart) {
        impactChart.destroy();
    }
    
    impactChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'CO2 Emissions Saved (Tonnes)',
                data: [1200, 2800, 4500, 7200, 11000, 16500, 25000],
                borderColor: '#27AE60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#27AE60',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: 'Energy Saved (MWh)',
                data: [800, 1900, 3200, 5100, 7800, 11600, 17500],
                borderColor: '#3498DB',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3498DB',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Environmental Impact',
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 14,
                            family: 'Inter, system-ui, sans-serif'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Advanced mouse interactions
function addAdvancedInteractions() {
    // Parallax effect for hero sections
    const heroes = document.querySelectorAll('.hero');
    heroes.forEach(hero => {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            hero.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            hero.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // Card tilt effects
    const cards = document.querySelectorAll('.stat-card, .category-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Magnetic buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.stat-progress .progress-bar, .efficiency-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1];
                if (width) {
                    bar.style.width = '0%';
                    bar.style.transition = 'width 2s ease-in-out';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Loading screen
function showLoadingScreen() {
    const loadingHTML = `
        <div id="loading-screen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            flex-direction: column;
        ">
            <div style="
                width: 80px;
                height: 80px;
                border: 4px solid #F5E6A3;
                border-top: 4px solid #E67E22;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <p style="
                font-family: 'Inter', sans-serif;
                font-size: 1.2rem;
                color: #2C3E50;
                font-weight: 600;
            ">Loading Power Appliances...</p>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    
    // Remove loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 1000);
    });
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('section, .card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Keyboard navigation
function addKeyboardNavigation() {
    let currentPageIndex = 0;
    const pages = ['home', 'televisions', 'about'];
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    currentPageIndex = Math.max(0, currentPageIndex - 1);
                    showPage(pages[currentPageIndex]);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    currentPageIndex = Math.min(pages.length - 1, currentPageIndex + 1);
                    showPage(pages[currentPageIndex]);
                    break;
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quart',
            once: true,
            offset: 100,
            delay: 100
        });
    }
    
    // Show home page by default
    showPage('home');
    
    // Add enhanced interactions
    addAdvancedInteractions();
    addSmoothScrolling();
    addKeyboardNavigation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Animate progress bars
    animateProgressBars();
    
    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Enhanced logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        let logoHoverTimeout;
        
        logo.addEventListener('mouseenter', function() {
            clearTimeout(logoHoverTimeout);
            this.style.transform = 'scale(1.1) rotate(360deg)';
            this.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        logo.addEventListener('mouseleave', function() {
            logoHoverTimeout = setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.transition = 'transform 0.3s ease';
            }, 100);
        });
    }
    
    // Add scroll-triggered animations for elements
    const scrollElements = document.querySelectorAll('[data-scroll-trigger]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-triggered');
            }
        });
    }, { threshold: 0.3 });
    
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

// Handle window resize for charts
window.addEventListener('resize', () => {
    if (energyChart) energyChart.resize();
    if (tvChart) tvChart.resize();
    if (impactChart) impactChart.resize();
});

// Add CSS for additional animations
const additionalStyles = `
    <style>
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-triggered {
            animation: bounceIn 0.8s ease-out;
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(50px);
            }
            50% {
                opacity: 1;
                transform: scale(1.05) translateY(-10px);
            }
            70% {
                transform: scale(0.9) translateY(5px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .chart-container canvas {
            transition: all 0.3s ease;
        }
        
        .chart-container:hover canvas {
            transform: scale(1.02);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);