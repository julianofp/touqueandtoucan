// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
        }
    });
});

// Contact form — Formspree submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const success = this.querySelector('.form-success');
        btn.disabled = true;
        btn.textContent = 'Sending...';
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                this.reset();
                btn.style.display = 'none';
                success.style.display = 'block';
            } else {
                btn.disabled = false;
                btn.textContent = 'Send Message';
                alert('Something went wrong. Please try again or email directly.');
            }
        } catch {
            btn.disabled = false;
            btn.textContent = 'Send Message';
            alert('Something went wrong. Please try again or email directly.');
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.coming-soon-content, .about-content, .contact-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add active state to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 10;

    let activeId = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeId = section.getAttribute('id');
        }
    });

    // If at the bottom of the page, activate the last section
    if (atBottom) {
        const allSections = document.querySelectorAll('section[id]');
        activeId = allSections[allSections.length - 1].getAttribute('id');
    }

    if (activeId) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.style.backgroundColor = '';
            link.style.color = '';
            if (link.getAttribute('href') === `#${activeId}`) {
                link.style.backgroundColor = 'rgba(107, 68, 35, 0.1)';
                link.style.color = '#C86F3C';
            }
        });
    }
});
