/**
 * RUQAYYA ANSAR PORTFOLIO — Main JavaScript
 * Features: Navbar, Particles, Skill bars, AOS, Contact form, Back-to-top
 */

'use strict';

/* ================================================
   NAVBAR — scroll effect + hamburger + active links
   ================================================ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active link on scroll — using IntersectionObserver
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* ================================================
   ANIMATED PARTICLES in Hero
   ================================================ */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random positions
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random colors (indigo / cyan / pink)
    const colors = ['#6366f1', '#06b6d4', '#ec4899', '#818cf8', '#22d3ee'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random animation
    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 6;
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);

    container.appendChild(particle);
  }
}

createParticles();

/* ================================================
   HERO — Mouse parallax effect
   ================================================ */
const heroSection = document.querySelector('.hero');
const avatarCard = document.querySelector('.avatar-card');

if (heroSection && avatarCard) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top  - cy) / cy;

    const rotX = dy * -8;
    const rotY = dx * 8;

    avatarCard.style.transform =
      `translate(-50%, -50%) translateY(0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    avatarCard.style.transform = 'translate(-50%, -50%) translateY(0) rotateX(0deg) rotateY(0deg)';
  });
}

/* ================================================
   SKILL BARS — animate on scroll into view
   ================================================ */
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.getAttribute('data-width') || 0;
      // Small timeout for visual effect
      setTimeout(() => {
        bar.style.width = `${target}%`;
      }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillProgressBars.forEach(bar => skillObserver.observe(bar));

/* ================================================
   CONTACT FORM — simulated send
   ================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) return;

    // Simulate sending
    submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="ri-check-line"></i> Sent!';
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="ri-send-plane-fill"></i> <span>Send Message</span>';
        submitBtn.disabled = false;
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1800);
  });
}

/* Add spin keyframe dynamically */
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);

/* ================================================
   BACK TO TOP BUTTON
   ================================================ */
const backToTop = document.getElementById('backToTop');

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

/* ================================================
   AOS — Initialize Scroll Animations
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 0
    });
  }
});

/* ================================================
   SMOOTH SCROLL for anchor links
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ================================================
   PROJECT CARD — 3D Tilt Effect
   ================================================ */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top  - cy) / cy;

    const rotX = dy * -5;
    const rotY = dx * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  });
});

console.log('%c🚀 Ruqayya Ansar Portfolio', 'color:#6366f1;font-size:20px;font-weight:bold;');
console.log('%cWeb Developer | Frontend | CMS | SEO', 'color:#06b6d4;font-size:14px;');
