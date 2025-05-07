// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', 
        navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu after clicking a link
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Navbar scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.collection__item, .feature, .about__image, .location__info, .social__link').forEach((el) => {
    observer.observe(el);
});

// Add animation classes to elements
document.querySelectorAll('.section__title, .section__subtitle').forEach((el) => {
    el.classList.add('animate-text');
});

// Handle collection item hover effects
document.querySelectorAll('.collection__item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.collection__overlay').style.transform = 'translateY(0)';
        item.querySelector('.collection__image img').style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.collection__overlay').style.transform = 'translateY(100%)';
        item.querySelector('.collection__image img').style.transform = 'scale(1)';
    });
});

// Carousel functionality
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const slideCount = slides.length;

// Initialize carousel
function initCarousel() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });
}

// Update carousel position
function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
}

// Event listeners for carousel controls
prevBtn.addEventListener('click', () => {
    prevSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
});

// Auto-advance carousel
let carouselInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(nextSlide, 5000);
});

// Initialize carousel
initCarousel();

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-text, .about-container, .feature, .social-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initial check for elements in view
animateOnScroll();
