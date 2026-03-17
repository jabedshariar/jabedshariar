// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_f7zxara';
const EMAILJS_TEMPLATE_ID = 'template_u8rrkgv';

// Theme Management
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Mobile Menu Toggle - FIXED
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navList = mainNav.querySelector('ul');
    const navLinks = mainNav.querySelectorAll('a');

    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navList.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    // Close mobile menu on window resize (if resizing to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// EmailJS Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function(response) {
                console.log('EmailJS Success:', response);
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                console.error('EmailJS Error Details:', error);
                
                // More specific error messages
                let errorMessage = 'Failed to send message. ';
                
                if (error.text) {
                    errorMessage += `Error: ${error.text}`;
                } else if (error.status) {
                    errorMessage += `Status: ${error.status}`;
                } else {
                    errorMessage += 'Please try again or email me directly at shariar33-1531@diu.edu.bd';
                }
                
                showMessage(errorMessage, 'error');
            })
            .finally(function() {
                // Reset button state
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 8 seconds for errors (longer to read)
        const hideTime = type === 'error' ? 8000 : 5000;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, hideTime);
    }
}

// Circuit Animation
function createCircuitAnimation() {
    const container = document.getElementById('circuitAnimation');
    const nodes = [];
    const lines = [];
    
    // Create nodes
    for (let i = 0; i < 30; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        container.appendChild(node);
        nodes.push({ element: node, x, y });
        
        // Add pulsing animation
        node.style.animation = `pulse 2s infinite ${i * 0.1}s`;
    }
    
    // Create lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
                const line = document.createElement('div');
                line.className = 'circuit-line';
                
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const length = distance;
                
                line.style.width = `${length}%`;
                line.style.left = `${nodes[i].x}%`;
                line.style.top = `${nodes[i].y}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                container.appendChild(line);
                lines.push(line);
            }
        }
    }
    
    // Add CSS for pulsing animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(style);
}

// Certificate Modal Functions
function openCertificateModal(certificateUrl) {
    const modal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    const downloadLink = document.getElementById('downloadCertificate');
    
    certificateImage.src = certificateUrl;
    downloadLink.href = certificateUrl;
    modal.style.display = 'block';
    
    // Close modal when clicking outside the content
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeCertificateModal();
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCertificateModal();
        }
    });
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    
    modal.style.display = 'none';
    certificateImage.src = ''; // Clear the image source
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}



// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    createCircuitAnimation();
    animateSkillBars();
    setupSmoothScrolling();
    setupContactForm();
    setupThemeToggle();
    setupMobileMenu();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Show development popup on EVERY page load
    setTimeout(showDevelopmentPopup, 500);
});

// Also show popup when page is fully loaded as a backup
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.getElementById('devPopupOverlay')) {
            showDevelopmentPopup();
        }
    }, 1000);
});
