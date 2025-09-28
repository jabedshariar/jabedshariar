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

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    createCircuitAnimation();
    animateSkillBars();
    setupSmoothScrolling();
    setupContactForm();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
});