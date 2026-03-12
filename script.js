/* ================================================
   PRASANNA KUMAR — PORTFOLIO SCRIPT
   script.js
   ================================================ */

/* ===== APP CONFIG ===== */
const APP_CONFIG = {
  name:    'Prasanna Kumar Portfolio',
  version: '2.0.0',
  author:  'Prasanna Kumar'
};

/* ===== PORTFOLIO DATA ===== */
const PORTFOLIO_DATA = {

  projects: [
    {
      id: 1,
      title: 'EV AI Diagnostic Platform',
      description: 'AI-powered EV diagnostics using RAG (ChromaDB + Sentence Transformers), XGBoost battery failure prediction, LSTM autoencoder, and a Streamlit chatbot with fleet analytics dashboard.',
      image: 'fas fa-car-battery',
      tech: ['Python', 'ChromaDB', 'LangChain', 'XGBoost', 'PyTorch', 'Streamlit', 'FastAPI'],
      links: {
        live:   '#',
        github: 'https://github.com/prasannakumar9i/EV_AI_Diagnostic_Platform'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Face Swap Detection',
      description: 'Computer Vision model using OpenCV to detect face manipulation by analysing facial landmarks, lighting inconsistencies, and texture artefacts introduced by swap algorithms.',
      image: 'fas fa-user-secret',
      tech: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
      links: {
        live:   '#',
        github: 'https://github.com/prasannakumar9i'
      },
      featured: true
    },
    {
      id: 3,
      title: 'License Plate Detection',
      description: 'Automated detection pipeline using contour detection and image preprocessing techniques to accurately extract and recognise vehicle number plates from images and video frames.',
      image: 'fas fa-car',
      tech: ['Python', 'OpenCV', 'Image Processing', 'NumPy'],
      links: {
        live:   '#',
        github: 'https://github.com/prasannakumar9i'
      },
      featured: true
    },
    {
      id: 4,
      title: 'Hand Gesture Detection',
      description: 'Real-time hand gesture recognition system achieving 90% classification accuracy using Python, OpenCV, and machine learning, designed for touchless human-computer interaction.',
      image: 'fas fa-hand-paper',
      tech: ['Python', 'OpenCV', 'Machine Learning', 'Real-time Processing'],
      links: {
        live:   '#',
        github: 'https://github.com/prasannakumar9i'
      },
      featured: false
    }
  ],

  experience: [
    {
      id: 1,
      type: 'work',
      title: 'Data Science Intern',
      company: 'Vision Astra EV Academy',
      location: 'India',
      duration: '2025 – Present',
      description: 'Working on real-world data analysis and machine learning tasks. Building predictive models for battery health and failure detection. Developing data preprocessing pipelines and collaborating on EV-related analytical projects using Python, XGBoost, and Streamlit.',
      skills: ['Python', 'Machine Learning', 'XGBoost', 'Pandas', 'NumPy', 'Streamlit', 'FastAPI', 'Data Analysis'],
      current: true
    },
    {
      id: 2,
      type: 'education',
      title: 'B.E. Computer Science Engineering',
      company: 'College (2022–2026)',
      location: 'India',
      duration: '2022 – 2026',
      description: 'Strong foundation in computer science fundamentals including Data Structures, Algorithms, Operating Systems, and Database Systems. Focus on AI/ML electives and project-based learning.',
      skills: ['Data Structures', 'Algorithms', 'Database Systems', 'OS', 'Software Engineering', 'Python'],
      current: false
    },
    {
      id: 3,
      type: 'project',
      title: 'Hand Gesture Detection (Personal Project)',
      company: 'Self-Directed Development',
      location: 'Remote',
      duration: '2024 – 2025',
      description: 'Developed a real-time hand gesture recognition system using Python, OpenCV, and ML. Implemented machine learning algorithms to classify hand gestures with 90% accuracy, suitable for HCI applications.',
      skills: ['Python', 'OpenCV', 'Machine Learning', 'Computer Vision', 'Data Analysis'],
      current: false
    }
  ],

  skills: [
    { id: 1,  name: 'Python',           icon: 'fab fa-python',     level: 85, category: 'programming'   },
    { id: 2,  name: 'Machine Learning', icon: 'fas fa-brain',      level: 78, category: 'AI/ML'          },
    { id: 3,  name: 'OpenCV',           icon: 'fas fa-eye',        level: 75, category: 'computer vision' },
    { id: 4,  name: 'NumPy / Pandas',   icon: 'fas fa-table',      level: 80, category: 'data'           },
    { id: 5,  name: 'XGBoost',          icon: 'fas fa-chart-bar',  level: 70, category: 'ML models'      },
    { id: 6,  name: 'PyTorch',          icon: 'fas fa-fire',       level: 60, category: 'deep learning'  },
    { id: 7,  name: 'HTML & CSS',       icon: 'fab fa-html5',      level: 82, category: 'frontend'       },
    { id: 8,  name: 'Power BI',         icon: 'fas fa-chart-pie',  level: 68, category: 'analytics'      },
    { id: 9,  name: 'Google Colab',     icon: 'fab fa-google',     level: 88, category: 'tools'          },
    { id: 10, name: 'Git & GitHub',     icon: 'fab fa-git-alt',    level: 74, category: 'tools'          }
  ],

  contact: {
    personal: {
      name:         'Prasanna Kumar',
      title:        'Aspiring Data Scientist & AI Engineer',
      email:        'prasannak4941@gmail.com',
      phone:        '+91 8217694677',
      location:     'Bengaluru, Karnataka, India',   // ← fixed syntax
      availability: 'Open to DS Internships (2026)'
    },
    social: [
      {
        id: 1, name: 'GitHub',
        icon:     'fab fa-github',
        url:      'https://github.com/prasannakumar9i',
        username: '@prasannakumar9i'
      },
      {
        id: 2, name: 'LinkedIn',
        icon:     'fab fa-linkedin',
        url:      'https://linkedin.com/in/prasanna-kumar-1124b33ab',
        username: 'Prasanna Kumar'
      },
      {
        id: 3, name: 'Email',
        icon:     'fas fa-envelope',
        url:      'mailto:prasannak4941@gmail.com',
        username: 'prasannak4941'
      }
    ],
    resume: { url: '#', filename: 'prasanna_resume.pdf' }
  }
};

/* ================================================
   INITIALISATION
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {
  console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} loaded!`);
  initializeApp();
});

function initializeApp() {
  setTimeout(hideLoader, 1500);
  renderProjects();
  renderExperience();
  renderSkills();
  renderContactInfo();
  setupEventListeners();
  initializeTypingEffect();
  initializeScrollAnimations();
  initializeSkillBars();
  initializeNavbar();
  initializeSmoothScrolling();
  initializeNavbarHighlighting();
  initializeAdvancedAnimations();
  initializeScrollProgress();
  setTimeout(createParticles, 1200);
}

/* ===== LOADER ===== */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  loader.style.opacity    = '0';
  loader.style.transform  = 'scale(0.9)';
  setTimeout(() => {
    loader.style.display = 'none';
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('animate-in');
  }, 800);
}

/* ===== TYPING EFFECT ===== */
function initializeTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const texts = [
    'Data Scientist (Aspiring)',
    'AI / ML Engineer',
    'Computer Vision Dev',
    'EV Analytics Builder',
    'Python Enthusiast',
    'Problem Solver'
  ];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const cur = texts[ti];
    el.textContent = deleting ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    if (deleting) ci--; else ci++;

    let speed = deleting ? 35 : 80;
    if (!deleting && ci === cur.length) { speed = 1800; deleting = true; }
    else if (deleting && ci === 0)      { deleting = false; ti = (ti + 1) % texts.length; speed = 350; }
    setTimeout(type, speed);
  }
  setTimeout(type, 1200);
}

/* ===== NAVBAR ===== */
function initializeNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.background = window.scrollY > 100
      ? 'rgba(13,17,23,0.97)'
      : 'rgba(13,17,23,0.8)';
  });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }
}

/* ===== SMOOTH SCROLL ===== */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      const nm = document.getElementById('nav-menu');
      const tg = document.getElementById('mobile-menu');
      if (nm) nm.classList.remove('active');
      if (tg) tg.classList.remove('active');
    });
  });
}

/* ===== ACTIVE NAV LINK ===== */
function initializeNavbarHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let ticking = false;

  function updateActive() {
    let current = '';
    sections.forEach(s => {
      if (window.pageYOffset >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateActive(); ticking = false; });
      ticking = true;
    }
  });
  updateActive();
}

/* ===== SCROLL ANIMATIONS ===== */
function initializeScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
        if (e.target.classList.contains('skills')) animateSkillBars();
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section').forEach(s => {
    s.style.transition = 'all 0.6s ease';
    obs.observe(s);
  });
}

/* ===== SKILL BARS ===== */
function initializeSkillBars() { /* Triggered by intersection observer */ }

function animateSkillBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const w = bar.getAttribute('data-width');
    setTimeout(() => { bar.style.width = w + '%'; }, 200);
  });
}

/* ===== SCROLL PROGRESS BAR ===== */
function initializeScrollProgress() {
  const ind = document.getElementById('scroll-indicator');
  window.addEventListener('scroll', () => {
    const pct = (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    if (ind) ind.style.width = pct + '%';
  });
}

/* ===== ADVANCED ANIMATIONS ===== */
function initializeAdvancedAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        e.target.querySelectorAll('.project-card, .skill-card, .timeline-item, .contact-item')
          .forEach((card, i) => {
            setTimeout(() => card.classList.add('animate-in-stagger'), i * 100);
          });
        if (e.target.id === 'skills') setTimeout(animateSkillBars, 300);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section').forEach(s => obs.observe(s));
  initializeEnhancedHoverEffects();
  initializeParallaxEffect();
}

function initializeEnhancedHoverEffects() {
  // 3D tilt on project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const r  = this.getBoundingClientRect();
      const rx = (e.clientY - r.top  - r.height / 2) / 10;
      const ry = (r.width  / 2 - (e.clientX - r.left)) / 10;
      this.style.transform = `translateY(-15px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // Button lift
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-3px) scale(1.05)'; });
    btn.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0) scale(1)'; });
  });
}

function initializeParallaxEffect() {
  const heroContent = document.querySelector('.hero-content');
  const codeEditor  = document.querySelector('.code-editor');
  window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    if (heroContent) heroContent.style.transform = `translateY(${s * -0.4}px)`;
    if (codeEditor)  codeEditor.style.transform  = `translateY(${s * -0.25}px)`;
  });
}

/* ===== PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: 2px; height: 2px;
      background: rgba(9, 105, 218, 0.6);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(p);
  }
}

/* ===== EVENT LISTENERS ===== */
function setupEventListeners() {
  const form = document.querySelector('.form form');
  if (form) form.addEventListener('submit', handleContactForm);
}

function handleContactForm(e) {

  const inputs = e.target.querySelectorAll('.form-input');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) valid = false;
  });

  if (!valid) {
    e.preventDefault();
    showToast("Please fill in all fields", "error");
    return;
  }

  showToast("Message sent successfully!", "success");

}
/* ===== TOAST NOTIFICATIONS ===== */
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:     'fixed',
    top:          '20px',
    right:        '20px',
    padding:      '1rem 1.5rem',
    borderRadius: '10px',
    color:        'white',
    fontWeight:   '600',
    zIndex:       '10000',
    transform:    'translateX(420px)',
    transition:   'transform 0.3s ease',
    background:   type === 'success'
      ? 'linear-gradient(45deg,#1a7f37,#2ea043)'
      : 'linear-gradient(45deg,#cf222e,#d1242f)',
    boxShadow:    '0 8px 25px rgba(0,0,0,0.4)',
    maxWidth:     '320px',
    fontFamily:   'Poppins, sans-serif'
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.transform = 'translateX(0)'; }, 100);
  setTimeout(() => {
    t.style.transform = 'translateX(420px)';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

/* ================================================
   DYNAMIC RENDERERS
   ================================================ */

/* --- Projects --- */
async function renderProjects() {

  const grid = document.querySelector(".projects-grid");

  if (!grid) return;

  grid.innerHTML = "";

  try {

    const res = await fetch("https://api.github.com/users/prasannakumar9i/repos");

    const repos = await res.json();

    repos
      .sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0,4)
      .forEach(repo => {

        const card = document.createElement("div");

        card.className = "project-card glass-effect";

        card.innerHTML = `
        <div class="project-image">
          <div class="project-placeholder">
            <i class="fab fa-github"></i>
          </div>
        </div>

        <div class="project-content">

          <h3 class="project-title">${repo.name}</h3>

          <p class="project-description">
            ${repo.description || "Machine Learning / Data Science project"}
          </p>

          <div class="project-tech">
            <span class="tech-tag">GitHub Repo</span>
          </div>

          <br>

          <a href="${repo.html_url}" target="_blank" class="btn-primary">
            <i class="fab fa-github"></i> View Repository
          </a>

        </div>
        `;

        grid.appendChild(card);

      });

  } catch (error) {

    console.error("GitHub projects failed to load", error);

  }

}

/* --- Experience / Timeline --- */
function renderExperience() {
  const tl = document.querySelector('.timeline');
  if (!tl) return;
  tl.innerHTML = '';
  const icons = {
    work:      'fas fa-briefcase',
    education: 'fas fa-graduation-cap',
    project:   'fas fa-project-diagram'
  };
  PORTFOLIO_DATA.experience.forEach(item => {
    const icon = icons[item.type] || 'fas fa-circle';
    const el   = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="timeline-dot"><i class="${icon}"></i></div>
      <div class="timeline-content glass-effect">
        <div class="timeline-date">${item.duration}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <h4 class="timeline-company">${item.company}</h4>
        ${item.location ? `<div class="timeline-location"><i class="fas fa-map-marker-alt"></i>${item.location}</div>` : ''}
        <p class="timeline-description">${item.description}</p>
        ${item.skills ? `
          <div class="timeline-skills">
            <strong style="color:#f0f6fc;font-size:0.85rem;">Key Skills:</strong>
            <div class="skills-tags">
              ${item.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>` : ''}
        ${item.current ? '<div class="timeline-current"><i class="fas fa-circle"></i> Current</div>' : ''}
      </div>`;
    tl.appendChild(el);
  });
}

/* --- Skills --- */
function renderSkills() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PORTFOLIO_DATA.skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card glass-effect';
    card.innerHTML = `
      <div class="skill-icon"><i class="${skill.icon}"></i></div>
      <h3 class="skill-name">${skill.name}</h3>
      <div class="skill-progress">
        <div class="progress-bar" data-width="${skill.level}"></div>
      </div>
      <span class="skill-percentage">${skill.level}%</span>
      <div class="skill-category">${skill.category}</div>`;
    grid.appendChild(card);
  });
}

/* --- Contact Info --- */
function renderContactInfo() {
  const ci = document.querySelector('.contact-info');
  if (!ci) return;
  ci.innerHTML = '';
  const { personal, social } = PORTFOLIO_DATA.contact;

  const items = [
    { icon: 'fas fa-envelope',       label: 'Email',       val: `<a href="mailto:${personal.email}">${personal.email}</a>` },
    { icon: 'fas fa-phone',          label: 'Phone',       val: `<a href="tel:${personal.phone.replace(/\s/g,'')}">${personal.phone}</a>` },
    { icon: 'fas fa-map-marker-alt', label: 'Location',    val: personal.location },
    { icon: 'fas fa-circle-check',   label: 'Status',      val: personal.availability }
  ];

  items.forEach(item => {
    const d = document.createElement('div');
    d.className = 'contact-item glass-effect';
    d.innerHTML = `
      <div class="contact-icon"><i class="${item.icon}"></i></div>
      <div class="contact-details">
        <h3>${item.label}</h3>
        <p>${item.val}</p>
      </div>`;
    ci.appendChild(d);
  });

  // Social links row
  const sl = document.createElement('div');
  sl.className = 'social-links';
  social.forEach(link => {
    const a = document.createElement('a');
    a.href      = link.url;
    a.target    = '_blank';
    a.className = 'social-link glass-effect';
    a.title     = link.name;
    a.innerHTML = `<i class="${link.icon}"></i>`;
    sl.appendChild(a);
  });
  ci.appendChild(sl);
}
