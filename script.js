// Navigation entre les pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('nav-menu').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation entre les activités
function showActivity(activityId, event) {
    const activities = document.querySelectorAll('.activity-content');
    activities.forEach(activity => activity.classList.remove('active'));
    const buttons = document.querySelectorAll('.submenu button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(activityId).classList.add('active');
    event.target.classList.add('active');
}

// Toggle du menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Fermer le menu mobile en cliquant à l'extérieur
document.addEventListener('click', function(event) {
    const menu = document.getElementById('nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// ============ CARROUSEL ============
const carouselStates = {
    rivieres: { currentSlide: 0, totalSlides: 3 },
    mer: { currentSlide: 0, totalSlides: 3 },
    esquimautage: { currentSlide: 0, totalSlides: 3 },
    polo: { currentSlide: 0, totalSlides: 3 }
};

function changeSlide(activityId, direction) {
    const state = carouselStates[activityId];
    if (!state) return;
    const carousel = document.getElementById(`carousel-${activityId}`);
    const indicators = document.querySelector(`#${activityId} .carousel-indicators`);
    if (!carousel || !indicators) return;
    state.currentSlide += direction;
    if (state.currentSlide >= state.totalSlides) {
        state.currentSlide = 0;
    } else if (state.currentSlide < 0) {
        state.currentSlide = state.totalSlides - 1;
    }
    const translateX = -state.currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    updateIndicators(indicators.children, state.currentSlide);
}

function goToSlide(activityId, slideIndex) {
    const state = carouselStates[activityId];
    if (!state) return;
    const carousel = document.getElementById(`carousel-${activityId}`);
    const indicators = document.querySelector(`#${activityId} .carousel-indicators`);
    if (!carousel || !indicators) return;
    if (slideIndex >= 0 && slideIndex < state.totalSlides) {
        state.currentSlide = slideIndex;
        const translateX = -state.currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        updateIndicators(indicators.children, state.currentSlide);
    }
}

function updateIndicators(indicators, activeIndex) {
    Array.from(indicators).forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

function initCarouselKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        const activeActivity = document.querySelector('.activity-content.active');
        if (!activeActivity) return;
        const activityId = activeActivity.id;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changeSlide(activityId, -1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            changeSlide(activityId, 1);
        }
    });
}

function initCarouselSwipeSupport() {
    let startX = 0;
    let endX = 0;
    document.querySelectorAll('.carousel-container').forEach(container => {
        const activityContent = container.closest('.activity-content');
        if (!activityContent) return;
        const activityId = activityContent.id;
        container.addEventListener('touchstart', function(event) {
            startX = event.touches[0].clientX;
        });
        container.addEventListener('touchend', function(event) {
            endX = event.changedTouches[0].clientX;
            handleSwipe(activityId);
        });
        function handleSwipe(activityId) {
            const threshold = 50;
            const diff = startX - endX;
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    changeSlide(activityId, 1);
                } else {
                    changeSlide(activityId, -1);
                }
            }
        }
    });
}

// ========= AJOUT : Fonction pour afficher la largeur =========
function updateWidth() {
    document.body.setAttribute('data-width', window.innerWidth);
}

// Fonctionnalités au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Hover sur cartes
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Carrousel
    initCarouselKeyboardNavigation();
    initCarouselSwipeSupport();

    // Largeur viewport
    updateWidth();
    window.addEventListener('resize', updateWidth);

    console.log('Application initialisée avec succès - Carrousels inclus + largeur affichée');
});