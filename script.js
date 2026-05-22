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

const translations = {
    es: {
        'logo-text': 'BIENVENIDO',
        'nav-fotos': 'Fotos',
        'nav-eventos': 'Eventos',
        'nav-musica': 'Música',
        'nav-biografia': 'Biografía',
        'nav-contacto': 'Contacto',
        'bio-title': 'Bio',
        'bio-heading': 'DJ CASIO',
        'bio-text-1': 'Con base en la Riviera Nayarit, México. Disfruto diseñar atmósferas musicales para beach clubs, restaurantes y espacios de alto tránsito donde la música es un elemento estratégico de la experiencia.',
        'bio-subheading': 'Propuesta',
        'bio-text-2': 'Fusiono varios géneros necesarios para crear una historia, empezando con Jazzy, Funk, Soulful y Disco House elegante. Música House sudafricana de los 90\'s y 2000\'s empieza a marcar el ritmo. Y cuando la pista lo requiere, los sonidos de Nu‑disco, Tech House y algunas bombas encienden la pista.',
        'bio-text-3': 'En mis sets construyo una narrativa que mantiene una energía constante, sofisticada y accesible: transiciones fluidas, grooves cálidos y percusiones orgánicas que acompañan el flujo del lugar sin interrumpirlo —desde el día, atardecer y hasta la noche—, alineando la música con el ritmo del venue y la experiencia del cliente.',
        'bio-strong': 'Reforzando la identidad del lugar a través de una selección musical estratégica y adaptable.',
        'bio-available-title': 'Disponible:',
        'bio-available-1': 'Actuaciones en clubes, restaurantes y beach clubs.',
        'bio-available-2': 'Eventos privados',
        'bio-available-3': 'Eventos corporativos',
        'bio-available-4': 'Residencias artísticas',
        'bio-available-5': 'Participaciones en festivales',
        'bio-available-6': 'Eventos Internacionales',
        'gallery-title': 'Galería',
        'events-title': 'Eventos',
        'event-1-title': 'Black Tiger',
        'event-1-text': '23 de Mayo 2026 — Calle Allende 103-B, Centro, 48300 Puerto Vallarta, Jal.',
        'event-2-title': 'Tierra Tropical Beach club',
        'event-2-text': '24 de Mayo 2026 — San Francisco, Nayarit',
        'follow-title': 'Sígueme',
        'contact-title': 'Contacto',
        'booking-title': 'Booking',
        'presskit-title': 'Presskit',
        'presskit-text': 'Descarga el presskit oficial con biografía, fotos de prensa, información de booking y enlaces de redes.',
        'presskit-button': 'Descargar PDF',
        'footer-text': '© 2026 DJ Casio. Todos los derechos reservados.',
        'carousel-prev-label': 'Anterior',
        'carousel-next-label': 'Siguiente'
        ,
        'plays-title': 'Plays at',
        'region-pv': 'Puerto Vallarta',
        'region-sayulita': 'Sayulita, San Pancho y Riviera Nayarit',
        'region-sma': 'San Miguel de Allende'
    },
    en: {
        'logo-text': 'WELCOME',
        'nav-fotos': 'Photos',
        'nav-eventos': 'Events',
        'nav-musica': 'Music',
        'nav-biografia': 'Biography',
        'nav-contacto': 'Contact',
        'bio-title': 'Bio',
        'bio-heading': 'DJ CASIO',
        'bio-text-1': 'Based in Riviera Nayarit, Mexico. I enjoy designing musical atmospheres for beach clubs, restaurants and high-traffic venues where music is a strategic element of the experience.',
        'bio-subheading': 'Approach',
        'bio-text-2': 'I blend multiple genres needed to tell a story, starting with Jazzy, Funk, Soulful and elegant Disco House. South African House music from the 90s and 2000s begins to set the pace. And when the dancefloor asks for it, Nu-disco, Tech House and powerful drops light up the room.',
        'bio-text-3': 'In my sets I build a narrative that maintains a constant, sophisticated and accessible energy: fluid transitions, warm grooves and organic percussion that accompany the flow of the venue without interrupting it —from daytime, sunset and into the night— aligning the music with the venue rhythm and guest experience.',
        'bio-strong': 'Reinforcing the venue identity through a strategic and adaptable musical selection.',
        'bio-available-title': 'Available for:',
        'bio-available-1': 'Performances at clubs, restaurants and beach clubs.',
        'bio-available-2': 'Private events',
        'bio-available-3': 'Corporate events',
        'bio-available-4': 'Artist residencies',
        'bio-available-5': 'Festival appearances',
        'bio-available-6': 'International events',
        'gallery-title': 'Gallery',
        'events-title': 'Events',
        'event-1-title': 'Black Tiger',
        'event-1-text': 'May 23, 2026 — Calle Allende 103-B, Centro, 48300 Puerto Vallarta, Jal.',
        'event-2-title': 'Tierra Tropical Beach club',
        'event-2-text': 'May 24, 2026 — San Francisco, Nayarit',
        'follow-title': 'Follow',
        'contact-title': 'Contact',
        'booking-title': 'Booking',
        'presskit-title': 'Presskit',
        'presskit-text': 'Download the official presskit with biography, press photos, booking information and social media links.',
        'presskit-button': 'Download PDF',
        'footer-text': '© 2026 DJ Casio. All rights reserved.',
        'carousel-prev-label': 'Previous',
        'carousel-next-label': 'Next'
        ,
        'plays-title': 'Plays at',
        'region-pv': 'Puerto Vallarta',
        'region-sayulita': 'Sayulita, San Pancho & Riviera Nayarit',
        'region-sma': 'San Miguel de Allende'
    }
};

const i18nElements = document.querySelectorAll('[data-i18n]');
const i18nLabelElements = document.querySelectorAll('[data-i18n-label]');
const langToggle = document.getElementById('lang-toggle');
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
        const lang = localStorage.getItem('siteLang') || document.documentElement.lang || 'es';
        data.regions.forEach(region => {
            const regionTitle = (translations[lang] && translations[lang][region.regionKey]) ? translations[lang][region.regionKey] : region.regionKey;
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

function setLanguage(lang) {
    const strings = translations[lang] || translations.es;
    i18nElements.forEach(el => {
        const key = el.dataset.i18n;
        if (strings[key]) {
            el.innerHTML = strings[key];
        }
    });
    i18nLabelElements.forEach(el => {
        const key = el.dataset.i18nLabel;
        if (strings[key]) {
            el.setAttribute('aria-label', strings[key]);
        }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('siteLang', lang);
    if (langToggle) {
        langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    if (typeof loadPlays === 'function') loadPlays();
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('siteLang') || 'es';
        setLanguage(currentLang === 'es' ? 'en' : 'es');
        if (typeof loadPlays === 'function') loadPlays();
    });
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

const initialLang = localStorage.getItem('siteLang') || 'es';
setLanguage(initialLang);

loadPlays();

console.log('DJ Casio Presskit - Website loaded successfully! 🎵');

const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentSlideIndex = 0;

function updateCarousel(index) {
    if (!carouselTrack || carouselItems.length === 0) return;
    currentSlideIndex = (index + carouselItems.length) % carouselItems.length;
    carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    carouselItems.forEach((item, idx) => item.classList.toggle('active', idx === currentSlideIndex));
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

let carouselInterval = setInterval(() => updateCarousel(currentSlideIndex + 1), 7000);

[prevButton, nextButton].forEach(button => {
    if (!button) return;
    button.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    button.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => updateCarousel(currentSlideIndex + 1), 7000);
    });
});

updateCarousel(0);
