// Import packages
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';

// Initialize AOS
AOS.init({
    disable: 'mobile',
    duration: 600,
    once: true,
});

window.addEventListener('DOMContentLoaded', event => {

    // Enable tooltips globally
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers globally
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Activate Bootstrap scrollspy for the sticky nav component
    const navStick = document.body.querySelector('#navStick');
    if (navStick) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navStick',
            offset: 82,
        });
    }

    // Collapse Navbar
    // Add styling fallback for when a transparent background .navbar-marketing is scrolled
    var navbarCollapse = function() {
        const navbarMarketingFixed = document.body.querySelector('.navbar-marketing.bg-white.fixed-top');
        if (!navbarMarketingFixed) {
            return;
        }
        if (window.scrollY === 0) {
            navbarMarketingFixed.classList.remove('navbar-scrolled')
        } else {
            navbarMarketingFixed.classList.add('navbar-scrolled')
        }

    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    document.addEventListener('scroll', navbarCollapse);

});
