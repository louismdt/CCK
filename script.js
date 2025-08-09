// Navigation entre les pages
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Close mobile menu if open
    document.getElementById('nav-menu').classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation entre les activités
function showActivity(activityId, event) {
    // Hide all activity contents
    const activities = document.querySelectorAll('.activity-content');
    activities.forEach(activity => activity.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.submenu button');
    buttons.forEach(button => button.classList.remove('active'));

    // Show selected activity
    document.getElementById(activityId).classList.add('active');

    // Add active class to clicked button
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

// ============ CARROUSEL - NOUVELLES FONCTIONNALITÉS ============

// État des carrousels - stocke les informations de chaque carrousel
const carouselStates = {
    rivieres: { currentSlide: 0, totalSlides: 3 },
    mer: { currentSlide: 0, totalSlides: 3 },
    esquimautage: { currentSlide: 0, totalSlides: 3 },
    polo: { currentSlide: 0, totalSlides: 3 }
};

/**
 * Fonction pour changer de slide dans le carrousel
 * @param {string} activityId - L'ID de l'activité
 * @param {number} direction - Direction du changement (1 pour suivant, -1 pour précédent)
 */
function changeSlide(activityId, direction) {
    const state = carouselStates[activityId];
    if (!state) return;
    
    const carousel = document.getElementById(`carousel-${activityId}`);
    const indicators = document.querySelector(`#${activityId} .carousel-indicators`);
    
    if (!carousel || !indicators) return;
    
    // Calculer le nouvel index
    state.currentSlide += direction;
    
    // Gérer la boucle infinie
    if (state.currentSlide >= state.totalSlides) {
        state.currentSlide = 0;
    } else if (state.currentSlide < 0) {
        state.currentSlide = state.totalSlides - 1;
    }
    
    // Appliquer la transformation pour faire glisser les images
    const translateX = -state.currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Mettre à jour les indicateurs
    updateIndicators(indicators.children, state.currentSlide);
}

/**
 * Fonction pour aller directement à un slide spécifique
 * @param {string} activityId - L'ID de l'activité
 * @param {number} slideIndex - L'index du slide à afficher
 */
function goToSlide(activityId, slideIndex) {
    const state = carouselStates[activityId];
    if (!state) return;
    
    const carousel = document.getElementById(`carousel-${activityId}`);
    const indicators = document.querySelector(`#${activityId} .carousel-indicators`);
    
    if (!carousel || !indicators) return;
    
    // Vérifier que l'index est valide
    if (slideIndex >= 0 && slideIndex < state.totalSlides) {
        state.currentSlide = slideIndex;
        
        // Appliquer la transformation
        const translateX = -state.currentSlide * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Mettre à jour les indicateurs
        updateIndicators(indicators.children, state.currentSlide);
    }
}

/**
 * Fonction pour mettre à jour l'état visuel des indicateurs
 * @param {HTMLCollection} indicators - Collection des éléments indicateurs
 * @param {number} activeIndex - Index de l'indicateur actif
 */
function updateIndicators(indicators, activeIndex) {
    Array.from(indicators).forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

/**
 * Navigation au clavier pour les carrousels
 */
function initCarouselKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Trouver l'activité actuellement active
        const activeActivity = document.querySelector('.activity-content.active');
        if (!activeActivity) return;
        
        const activityId = activeActivity.id;
        
        // Flèche gauche - slide précédent
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changeSlide(activityId, -1);
        }
        // Flèche droite - slide suivant
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            changeSlide(activityId, 1);
        }
    });
}

/**
 * Support du swipe sur mobile pour les carrousels
 */
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
            const threshold = 50; // Distance minimum pour déclencher un swipe
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe vers la gauche - slide suivant
                    changeSlide(activityId, 1);
                } else {
                    // Swipe vers la droite - slide précédent
                    changeSlide(activityId, -1);
                }
            }
        }
    });
}

/**
 * Fonction d'auto-play pour les carrousels (optionnelle - décommentez pour l'activer)
 */
/*
function startCarouselAutoPlay(interval = 5000) {
    setInterval(() => {
        // Ne faire défiler automatiquement que l'activité actuellement visible
        const activeActivity = document.querySelector('.activity-content.active');
        if (activeActivity) {
            const activityId = activeActivity.id;
            changeSlide(activityId, 1);
        }
    }, interval);
}
*/

// Fonctionnalités au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // ===== FONCTIONNALITÉS EXISTANTES =====
    // Effets interactifs pour les cartes
    const cards = document.querySelectorAll('.card');
    
    // Add hover effect for cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== NOUVELLES FONCTIONNALITÉS CARROUSEL =====
    // Initialiser la navigation clavier pour les carrousels
    initCarouselKeyboardNavigation();
    
    // Initialiser le support swipe sur mobile
    initCarouselSwipeSupport();
    
    // Démarrer l'auto-play si souhaité (décommentez la ligne ci-dessous)
    // startCarouselAutoPlay(5000);
    
    console.log('Application initialisée avec succès - Carrousels inclus');
});