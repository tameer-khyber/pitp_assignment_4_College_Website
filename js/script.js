// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle the icon between bars and times (close)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Set dynamic current year in footer
    const yearElements = document.querySelectorAll('.year, #year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Smooth scrolling for anchor links (if any anchor starts with #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements dynamically so we don't have to touch HTML
    const elementsToAnimate = document.querySelectorAll('.card, .about-text, .about-image, .contact-info, .contact-form, .section-title, .section-subtitle, .cards-grid');

    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animate-on-scroll');

        // Add staggered delay to cards if they are siblings in a grid
        if (el.classList.contains('card')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }

        animateOnScrollObserver.observe(el);
    });

});
