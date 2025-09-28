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
    const certificateFrame = document.getElementById('certificateFrame');
    const downloadLink = document.getElementById('downloadCertificate');
    
    certificateFrame.src = certificateUrl;
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
    const certificateFrame = document.getElementById('certificateFrame');
    
    modal.style.display = 'none';
    certificateFrame.src = ''; // Clear the iframe source
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
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// Form Submission
function setupContactForm() {
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Development Popup Message - Show on every page load
function showDevelopmentPopup() {
    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.id = 'devPopupOverlay';
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.style.cssText = `
        background: linear-gradient(135deg, var(--dark) 0%, #1a1a2e 100%);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        border: 2px solid var(--primary);
        box-shadow: 0 0 30px rgba(0, 198, 255, 0.5);
        color: white;
    `;

    // Add popup title
    const title = document.createElement('h3');
    title.textContent = '🚧 Site Under Development';
    title.style.cssText = `
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 1.5rem;
    `;

    // Add popup message
    const message = document.createElement('p');
    message.textContent = 'This website is currently under development. For any inquiries, please contact me directly on WhatsApp.';
    message.style.cssText = `
        margin-bottom: 1.5rem;
        line-height: 1.5;
    `;

    // Add WhatsApp button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/8801839253317'; // Your WhatsApp number
    whatsappBtn.target = '_blank';
    whatsappBtn.style.cssText = `
        display: inline-block;
        background: #25D366;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        margin-right: 1rem;
        transition: transform 0.3s, box-shadow 0.3s;
    `;
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Contact on WhatsApp';

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Continue to Site';
    closeBtn.style.cssText = `
        background: transparent;
        border: 2px solid var(--primary);
        color: var(--primary);
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
    `;

    // Add hover effects
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'translateY(-2px)';
        whatsappBtn.style.boxShadow = '0 5px 15px rgba(37, 211, 102, 0.4)';
    });

    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'translateY(0)';
        whatsappBtn.style.boxShadow = 'none';
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(0, 198, 255, 0.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'transparent';
    });

    // Close popup function
    function closePopup() {
        const popup = document.getElementById('devPopupOverlay');
        if (popup) {
            document.body.removeChild(popup);
        }
    }

    closeBtn.addEventListener('click', closePopup);

    // Assemble popup
    popupContent.appendChild(title);
    popupContent.appendChild(message);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;';
    buttonContainer.appendChild(whatsappBtn);
    buttonContainer.appendChild(closeBtn);
    
    popupContent.appendChild(buttonContainer);
    popupOverlay.appendChild(popupContent);
    
    // Add to page
    document.body.appendChild(popupOverlay);

    // Close popup when clicking outside content
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    createCircuitAnimation();
    animateSkillBars();
    setupSmoothScrolling();
    setupContactForm();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Show development popup on EVERY page load
    // Show popup after a small delay so page loads first
    setTimeout(showDevelopmentPopup, 500);
});

// Also show popup when page is fully loaded as a backup
window.addEventListener('load', () => {
    // Double check if popup exists, if not show it
    setTimeout(() => {
        if (!document.getElementById('devPopupOverlay')) {
            showDevelopmentPopup();
        }
    }, 1000);
});
