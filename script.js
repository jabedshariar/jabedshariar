// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_f7zxara';
const EMAILJS_TEMPLATE_ID = 'template_u8rrkgv';

// Theme Management
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navList = mainNav.querySelector('ul');
    const navLinks = mainNav.querySelectorAll('a');

    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.className = navList.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navList.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    // Close menu on resize to desktop
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
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function() {
                showMessage("Message sent successfully! I'll get back to you soon.", 'success');
                contactForm.reset();
            }, function(error) {
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
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        const hideTime = type === 'error' ? 8000 : 5000;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, hideTime);
    }
}

// Circuit Animation
function createCircuitAnimation() {
    const container = document.getElementById('circuitAnimation');
    if (!container) return;

    const nodes = [];

    // Add pulse keyframes once
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%   { opacity: 0.3; transform: scale(0.8); }
            50%  { opacity: 1;   transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    // Create nodes
    for (let i = 0; i < 30; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.style.animation = `pulse 2s infinite ${(i * 0.1).toFixed(1)}s`;

        container.appendChild(node);
        nodes.push({ element: node, x, y });
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

                // Angle from node i to node j
                const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x) * 180 / Math.PI;

                line.style.width = `${distance}%`;
                line.style.left = `${nodes[i].x}%`;
                line.style.top = `${nodes[i].y}%`;
                line.style.transform = `rotate(${angle}deg)`;

                container.appendChild(line);
            }
        }
    }
}

// Certificate Modal
function openCertificateModal(certificateUrl) {
    const modal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    const downloadLink = document.getElementById('downloadCertificate');

    certificateImage.src = certificateUrl;
    downloadLink.href = certificateUrl;
    modal.style.display = 'block';

    // Close on backdrop click
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeCertificateModal();
        }
    };

    // Close on Escape — store reference so we can remove it later
    function onKeydown(event) {
        if (event.key === 'Escape') {
            closeCertificateModal();
            document.removeEventListener('keydown', onKeydown);
        }
    }
    document.addEventListener('keydown', onKeydown);
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    modal.style.display = 'none';
    certificateImage.src = '';
    modal.onclick = null; // Clean up backdrop listener
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

    skillBars.forEach(bar => observer.observe(bar));
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    createCircuitAnimation();
    animateSkillBars();
    setupSmoothScrolling();
    setupContactForm();
    setupThemeToggle();
    setupMobileMenu();
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
});
