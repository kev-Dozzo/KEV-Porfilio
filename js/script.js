'use strict';

/* ========================
   WAIT FOR DOM
======================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ========================
       ELEMENT SELECTORS
    ======================== */
    const menu           = document.getElementById('mobile-menu');
    const navMenu        = document.querySelector('.nav-menu');
    const navbar         = document.querySelector('.navbar');
    const themeToggle    = document.getElementById('theme-toggle');
    const backToTop      = document.getElementById('back-to-top');
    const navLinks       = document.querySelectorAll('.navbar_links');
    const sections       = document.querySelectorAll('section, .main, .about, #home');
    const carrouselSpan  = document.getElementById('carrousel');
    const carrouselTrack = document.querySelector('.project-content');
    const prevBtn        = document.querySelector('.prev-btn');
    const nextBtn        = document.querySelector('.next-btn');
    const cards          = document.querySelectorAll('.project-card');
    const dotsContainer  = document.querySelector('.carousel-dots');
    const progressBars   = document.querySelectorAll('.progress');
    const revealItems    = document.querySelectorAll('.reveal');

    /* ========================
       NAVBAR TOGGLE (MOBILE)
    ======================== */
    if (menu && navMenu) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // ✅ Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menu.classList.remove('is-active');
            });
        });

        // ✅ Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menu.classList.remove('is-active');
            }
        });
    }

    /* ========================
       NAVBAR SCROLL EFFECT
    ======================== */
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ========================
       ACTIVE NAV LINK ON SCROLL
    ======================== */
    const allSections = document.querySelectorAll('[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });

    /* ========================
       🌙 DARK / LIGHT MODE TOGGLE
    ======================== */
    const htmlEl = document.documentElement;
    const moonIcon = document.querySelector('#theme-toggle i');

    // Load saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!moonIcon) return;
        moonIcon.className = theme === 'dark'
            ? 'fa-solid fa-moon'
            : 'fa-solid fa-sun';
    }

 /* ========================
   TEXT ROTATOR (HERO)
======================== */
const roles = ['FullStack Dev 💻', 'UI/UX Designer 🎨', 'Content Creator 🎬'];
let roleIndex = 0;

if (carrouselSpan) {

    // ✅ Set first role immediately
    carrouselSpan.textContent = roles[0];

    setInterval(() => {

        // Step 1 — Fade OUT + slide up
        carrouselSpan.style.opacity = '0';
        carrouselSpan.style.transform = 'translateY(-12px)';

        setTimeout(() => {

            // Step 2 — Swap text while invisible
            roleIndex = (roleIndex + 1) % roles.length;
            carrouselSpan.textContent = roles[roleIndex];

            // Step 3 — Reset position (instant, no transition)
            carrouselSpan.style.transition = 'none';
            carrouselSpan.style.transform = 'translateY(12px)';

            // Step 4 — Force browser to register the reset
            carrouselSpan.getBoundingClientRect(); // 🔑 triggers reflow

            // Step 5 — Fade IN + slide up into place
            carrouselSpan.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            carrouselSpan.style.opacity = '1';
            carrouselSpan.style.transform = 'translateY(0)';

        }, 420); // slightly longer than transition duration

    }, 2800);
}

    /* ========================
       CAROUSEL / PROJECTS
    ======================== */
    let currentIndex = 0;

    // ✅ Recalculate width dynamically on each click
    const getCardWidth = () => {
        if (cards.length === 0) return 0;
        return cards[0].offsetWidth + 20;
    };

    // Build dot indicators
    if (dotsContainer && cards.length > 0) {
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to project ${i + 1}`);
            if (i === 0) dot.classList.add('active-dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = getCardWidth();
        if (carrouselTrack) {
            carrouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active-dot', i === currentIndex);
        });
    }

    if (nextBtn && cards.length > 0) {
        nextBtn.addEventListener('click', () => {
            // ✅ Wraps around to first
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        });
    }

    if (prevBtn && cards.length > 0) {
        prevBtn.addEventListener('click', () => {
            // ✅ Wraps around to last
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        });
    }

    // ✅ Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        if (e.key === 'ArrowLeft'  && prevBtn) prevBtn.click();
    });

    // ✅ Recalculate on window resize
    window.addEventListener('resize', () => {
        if (carrouselTrack && cards.length > 0) {
            carrouselTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
        }
    });

    /* ========================
       SCROLL REVEAL ANIMATION
    ======================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));

    /* ========================
       📊 SKILL PROGRESS BAR ANIMATION
    ======================== */
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth) {
                    bar.style.width = `${targetWidth}%`;
                }
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    /* ========================
       ⬆️ BACK TO TOP BUTTON
    ======================== */
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});