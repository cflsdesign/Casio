// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animar elementos al scroll
document.querySelectorAll('.section, .gallery-item, .press-item, .bio-short, .bio-long, .contact-card').forEach(el => {
    el.setAttribute('data-animate', 'true');
    observer.observe(el);
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Actualizar año en footer
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer p:first-child');
    if (footerText) {
        footerText.textContent = `© ${year} DJ Casio. Todos los derechos reservados.`;
    }
});

// Efecto parallax en hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
    }
});

// Hover effects en gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Detectar si está en viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Animar números cuando son visibles
const animateNumbers = () => {
    document.querySelectorAll('[data-number]').forEach(el => {
        if (isInViewport(el) && !el.classList.contains('animated')) {
            const target = parseInt(el.getAttribute('data-number'));
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    el.classList.add('animated');
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
};

window.addEventListener('scroll', animateNumbers);
window.addEventListener('load', animateNumbers);

const translations = {};
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

async function loadPlays() {
    try {
        const res = await fetch('data/plays.json');
        if (!res.ok) return;
        const data = await res.json();
        const grid = document.querySelector('.plays-grid');
        if (!grid) return;
        grid.innerHTML = '';
        data.regions.forEach(region => {
            const regionTitle = region.title || region.regionKey;
            const regionDiv = document.createElement('div');
            regionDiv.className = 'plays-region';
            const itemsHtml = region.places.map(p => `
                <li class="place-item"><span class="place-name">${p.name}</span> — <a href="https://instagram.com/${p.instagram}" target="_blank" rel="noreferrer">@${p.instagram}</a></li>
            `).join('');
            regionDiv.innerHTML = `<h3>${regionTitle}</h3><ul>${itemsHtml}</ul>`;
            grid.appendChild(regionDiv);
        });
    } catch (e) {
        console.error('Failed to load plays data', e);
    }
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

loadPlays();

console.log('DJ Casio Presskit - Website loaded successfully! 🎵');

const galleryFallbackImages = [
    'geleria/Dj_Casio_4.jpg',
    'geleria/Dj_Casio_5.jpg',
    'geleria/Casio6.jpg'
];

const carouselTrack = document.querySelector('.carousel-track');
let carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentSlideIndex = 0;
let carouselInterval;

async function loadGallery() {
    let images = galleryFallbackImages;

    try {
        const res = await fetch('data/gallery.json');
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.images) && data.images.length > 0) {
                images = data.images;
            }
        }
    } catch (err) {
        console.warn('Gallery manifest not loaded:', err);
    }

    if (!carouselTrack) return;

    carouselTrack.innerHTML = images.map((src, idx) => `
        <div class="carousel-item${idx === 0 ? ' active' : ''}">
            <div class="carousel-media" style="background-image: url('${src}');"></div>
        </div>
    `).join('');

    carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    if (carouselItems.length === 0) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    }
}

function updateCarousel(index) {
    if (!carouselTrack || carouselItems.length === 0) return;
    currentSlideIndex = (index + carouselItems.length) % carouselItems.length;
    carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    carouselItems.forEach((item, idx) => item.classList.toggle('active', idx === currentSlideIndex));
}

function startCarouselAutoPlay() {
    if (carouselInterval) clearInterval(carouselInterval);
    if (carouselItems.length <= 1) return;
    carouselInterval = setInterval(() => updateCarousel(currentSlideIndex + 1), 7000);
}

if (prevButton) {
    prevButton.addEventListener('click', () => updateCarousel(currentSlideIndex - 1));
}

if (nextButton) {
    nextButton.addEventListener('click', () => updateCarousel(currentSlideIndex + 1));
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        updateCarousel(currentSlideIndex - 1);
    } else if (event.key === 'ArrowRight') {
        updateCarousel(currentSlideIndex + 1);
    }
});

[prevButton, nextButton].forEach(button => {
    if (!button) return;
    button.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    button.addEventListener('mouseleave', () => {
        startCarouselAutoPlay();
    });
});

loadGallery().then(() => {
    updateCarousel(0);
    startCarouselAutoPlay();
});
