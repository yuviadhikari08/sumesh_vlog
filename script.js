/* =========================================================
   SUMESH — TheSumesh_Vlogs Portfolio
   JavaScript Functionality
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMouseGlow();
  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initParticles();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initGallery();
  initVideos();
  initTiltEffect();
  initRippleEffect();
  initContactForm();
  initYear();
});

// ------------------------- Custom Cursor -------------------------
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .video-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}

// ------------------------- Mouse Glow -------------------------
function initMouseGlow() {
  const glow = document.querySelector('.mouse-glow');
  if (!glow) return;

  let x = 0, y = 0;
  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  function animate() {
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

// ------------------------- Navbar Scroll Effect -------------------------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  });
}

// ------------------------- Mobile Menu -------------------------
function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
    });
  });
}

// ------------------------- Typing Animation -------------------------
function initTypingAnimation() {
  const typingText = document.getElementById('typingText');
  if (!typingText) return;

  const words = [
    'Travel Vlogger',
    'Content Creator',
    'Storyteller',
    'Lifestyle Influencer',
    'Digital Nomad'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// ------------------------- Particles -------------------------
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.width = `${Math.random() * 6 + 2}px`;
  particle.style.height = particle.style.width;
  particle.style.bottom = '-20px';
  particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
  particle.style.animationDelay = `${Math.random() * 10}s`;
  particle.style.opacity = Math.random() * 0.5 + 0.2;
  container.appendChild(particle);
}

// ------------------------- Scroll Reveal -------------------------
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ------------------------- Skill Bars -------------------------
function initSkillBars() {
  const skills = document.querySelectorAll('.skill');
  if (!skills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const percent = skill.dataset.percent;
        const fill = skill.querySelector('.skill__fill');
        const num = skill.querySelector('.skill__num');

        if (fill) {
          fill.style.width = `${percent}%`;
        }
        if (num) {
          animateCounter(num, 0, parseInt(percent), 1500);
        }
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => observer.observe(skill));
}

// ------------------------- Counters -------------------------
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, 0, target, 2000);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ------------------------- Gallery -------------------------
function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!galleryGrid) return;

  const galleryItems = [
    { id: 1, category: 'travel', title: 'Mountain Trek', span: 2 },
    { id: 2, category: 'lifestyle', title: 'Coffee Moments', span: 1 },
    { id: 3, category: 'photography', title: 'Golden Hour', span: 1 },
    { id: 4, category: 'travel', title: 'Beach Sunset', span: 1 },
    { id: 5, category: 'events', title: 'Brand Event', span: 2 },
    { id: 6, category: 'travel', title: 'City Lights', span: 1 },
    { id: 7, category: 'lifestyle', title: 'Morning Yoga', span: 1 },
    { id: 8, category: 'photography', title: 'Portrait', span: 1 },
    { id: 9, category: 'travel', title: 'Forest Walk', span: 2 },
    { id: 10, category: 'events', title: 'Live Session', span: 1 },
    { id: 11, category: 'lifestyle', title: 'Work Setup', span: 1 },
    { id: 12, category: 'photography', title: 'Street Art', span: 1 }
  ];

  renderGallery(galleryItems, 'all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      renderGallery(galleryItems, filter);
    });
  });
}

function renderGallery(items, filter) {
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = '';

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  filteredItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.category = item.category;
    div.style.gridRow = `span ${item.span * 12 + 12}`;
    div.innerHTML = `
      <div class="gallery-item__img">
        <span>${item.title}</span>
      </div>
      <div class="gallery-item__overlay">
        <span>${item.category}</span>
      </div>
    `;
    galleryGrid.appendChild(div);
  });
}

// ------------------------- Videos -------------------------
function initVideos() {
  const videosGrid = document.getElementById('videosGrid');
  if (!videosGrid) return;

  const videos = [
    { id: 1, title: 'Exploring the Himalayas', views: '124K', duration: '12:34' },
    { id: 2, title: 'A Day in My Life', views: '89K', duration: '8:22' },
    { id: 3, title: 'Travel Gear Essentials', views: '67K', duration: '15:10' },
    { id: 4, title: 'Street Food Tour', views: '156K', duration: '18:45' },
    { id: 5, title: 'Sunrise Hike Vlog', views: '98K', duration: '10:05' },
    { id: 6, title: 'My Content Setup', views: '72K', duration: '11:30' }
  ];

  videosGrid.innerHTML = videos.map(video => `
    <div class="video-card reveal" data-fade="up">
      <div class="video-card__thumb">
        <div class="video-card__play"></div>
        <span class="video-card__duration">${video.duration}</span>
      </div>
      <div class="video-card__body">
        <h3>${video.title}</h3>
        <div class="video-card__meta">
          <span>${video.views} views</span>
          <span>2 weeks ago</span>
        </div>
      </div>
    </div>
  `).join('');

  // Re-init scroll reveal for new elements
  initScrollReveal();
}

// ------------------------- Tilt Effect -------------------------
function initTiltEffect() {
  const tilts = document.querySelectorAll('.tilt');
  if (!tilts.length) return;

  tilts.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// ------------------------- Ripple Effect -------------------------
function initRippleEffect() {
  document.addEventListener('click', (e) => {
    const rippleEl = e.target.closest('.ripple');
    if (!rippleEl) return;

    const rect = rippleEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.className = 'ripple-circle';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    rippleEl.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
}

// ------------------------- Contact Form -------------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) {
      status.textContent = 'Thank you for your message! I will get back to you soon.';
    }
    form.reset();
    setTimeout(() => {
      if (status) status.textContent = '';
    }, 5000);
  });
}

// ------------------------- Current Year -------------------------
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
