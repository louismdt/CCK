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
function showActivity(activityId) {
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

// Fonctionnalités au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Effets interactifs pour les cartes
    const cards = document.querySelectorAll('.card');
    
    // Add hover effect for cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform =