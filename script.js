/* ============================================
   AKASH MANDLI PORTFOLIO — script.js (v2)
   Handles: Cursor, Nav, Scroll Reveal,
            Number Counters, Mobile Menu,
            Form → Google Apps Script → Drive + Email
   ============================================ */

// ============================================================
// ⚠️  PASTE YOUR GOOGLE APPS SCRIPT URL HERE AFTER DEPLOYING
// ============================================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzyf-880V9CgDjIc4li8Ti3EenVY4XUsiyaeFG8RUjIVKps0tsIjBmHQsElX-w0BEl9/exec";
// Example: "https://script.google.com/macros/s/AKfycb.../exec"
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ============ CUSTOM CURSOR ============
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower animation
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor states on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .service-card, .process__step, input, textarea, select');

  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.opacity = '0.5';
      cursorFollower.style.width = '56px';
      cursorFollower.style.height = '56px';
      cursorFollower.style.borderColor = 'rgba(0, 201, 177, 0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
      cursorFollower.style.width = '32px';
      cursorFollower.style.height = '32px';
      cursorFollower.style.borderColor = 'rgba(0, 201, 177, 0.4)';
    });
  });

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
  }


  // ============ NAVIGATION ============
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });


  // ============ MOBILE MENU ============
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    hamburger.classList.toggle('open');

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      hamburger.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });


  // ============ SCROLL REVEAL ============
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ============ NUMBER COUNTER ANIMATION ============
  function animateCounter(element, target, duration = 1800) {
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * easeOut;

      if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = isDecimal ? target.toFixed(1) : target;
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger counters when numbers strip is visible
  const numbersStrip = document.querySelector('.numbers-strip');
  let countersStarted = false;

  if (numbersStrip) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;

          const counterEls = document.querySelectorAll('.numbers-strip__num[data-target]');
          counterEls.forEach((el, i) => {
            const target = parseFloat(el.getAttribute('data-target'));
            setTimeout(() => animateCounter(el, target), i * 150);
          });

          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(numbersStrip);
  }


  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetTop = target.offsetTop - navHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });


  // ============ PROCESS STEP INTERACTIONS ============
  const processSteps = document.querySelectorAll('.process__step');

  processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      // Dim other steps slightly
      processSteps.forEach(s => {
        if (s !== step) {
          s.style.opacity = '0.5';
          s.style.transition = 'opacity 0.3s ease';
        }
      });
    });

    step.addEventListener('mouseleave', () => {
      processSteps.forEach(s => {
        s.style.opacity = '1';
      });
    });
  });


  // ============ CONTACT FORM → GOOGLE APPS SCRIPT (iframe method) ============
  // Uses a hidden iframe instead of fetch — completely bypasses CORS.
  // The browser makes a native form POST; we never try to read the cross-origin response.
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {

    // Create a hidden iframe — it silently receives the Apps Script response
    const iframe       = document.createElement('iframe');
    iframe.name        = 'hidden_iframe';
    iframe.id          = 'hidden_iframe';
    iframe.style.cssText = 'display:none;width:0;height:0;border:none;';
    document.body.appendChild(iframe);

    // Point the form directly at Apps Script, targeting the hidden iframe
    contactForm.setAttribute('action',  SCRIPT_URL);
    contactForm.setAttribute('method',  'POST');
    contactForm.setAttribute('target',  'hidden_iframe');

    // Flag so the iframe load event only fires after a real submit
    let formSubmitted = false;

    // When the hidden iframe loads after submission → show success
    iframe.addEventListener('load', () => {
      if (!formSubmitted) return;
      formSubmitted = false;
      const btn = contactForm.querySelector('.btn--primary');
      showFormResult(btn, 'success', '✓ Message Sent!');
      contactForm.reset();
      showThankYouBanner(contactForm);
    });

    // Input focus label highlight
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('focus', () => {
        const label = input.parentElement.querySelector('label');
        if (label) label.style.color = 'var(--teal)';
      });
      input.addEventListener('blur', () => {
        const label = input.parentElement.querySelector('label');
        if (label) label.style.color = '';
      });
    });

    // Form submit handler
    contactForm.addEventListener('submit', (e) => {

      // Block if URL not configured
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL") {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn--primary');
        showFormResult(btn, 'error', '⚠️ Script URL not configured yet.');
        return;
      }

      // Manual validation
      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn--primary');
        showFormResult(btn, 'error', '⚠️ Please fill all required fields.');
        return;
      }

      // Show loading state
      const btn     = contactForm.querySelector('.btn--primary');
      const spinner = createSpinner();
      btn.disabled      = true;
      btn.style.opacity = '0.8';
      btn.innerHTML     = '';
      btn.appendChild(spinner);
      btn.appendChild(document.createTextNode(' Sending...'));

      // Mark as submitted
      formSubmitted = true;

      // Fallback timeout — some browsers skip the iframe load event for cross-origin
      // If no response after 6 seconds, assume success (data already sent to server)
      setTimeout(() => {
        if (!formSubmitted) return;
        formSubmitted = false;
        showFormResult(btn, 'success', '✓ Message Sent!');
        contactForm.reset();
        showThankYouBanner(contactForm);
      }, 6000);

      // DO NOT call e.preventDefault() — let the native form submit to the iframe
    });
  }

  function createSpinner() {
    const s = document.createElement('span');
    s.style.cssText = 'display:inline-block;width:14px;height:14px;border:2px solid rgba(15,31,61,0.3);border-top-color:#0F1F3D;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:6px;';
    if (!document.getElementById('spin-style')) {
      const st = document.createElement('style');
      st.id = 'spin-style';
      st.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(st);
    }
    return s;
  }

  function showFormResult(btn, type, text) {
    btn.innerHTML = text;
    btn.disabled  = false;
    btn.style.opacity     = '1';
    btn.style.background  = type === 'success' ? '#059669' : '#dc2626';
    btn.style.borderColor = type === 'success' ? '#059669' : '#dc2626';
    btn.style.color       = '#ffffff';
    setTimeout(() => {
      btn.innerHTML = 'Send Message';
      ['background','borderColor','color','opacity'].forEach(p => btn.style[p] = '');
    }, 4000);
  }

  function showThankYouBanner(form) {
    const existing = form.querySelector('.thank-you-banner');
    if (existing) existing.remove();
    const b = document.createElement('div');
    b.className = 'thank-you-banner';
    b.style.cssText = 'margin-top:1.25rem;padding:1rem 1.25rem;background:rgba(5,150,105,0.1);border:1px solid rgba(5,150,105,0.3);border-radius:8px;color:#6ee7b7;font-size:0.875rem;line-height:1.6;animation:fadeUp 0.4s ease;';
    b.innerHTML = '<strong style="display:block;margin-bottom:0.3rem;">Thank you for reaching out!</strong>Your message has been saved and I\'ll get back to you within 24 hours.';
    form.appendChild(b);
    setTimeout(() => { b.style.opacity = '0'; b.style.transition = 'opacity 0.5s'; setTimeout(() => b.remove(), 500); }, 8000);
  }

  function showFallbackLink(form, href) {
    const existing = form.querySelector('.fallback-link');
    if (existing) existing.remove();
    const p = document.createElement('p');
    p.className = 'fallback-link';
    p.style.cssText = 'margin-top:1rem;font-size:0.82rem;color:var(--text-dim);text-align:center;';
    p.innerHTML = `Network issue? <a href="${href}" style="color:var(--teal);text-decoration:underline;">Email directly instead →</a>`;
    form.appendChild(p);
  }

  function buildMailtoFallback({ name, email, type, message }) {
    return `mailto:mandliakash@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry — ' + type)}&body=${encodeURIComponent(`Hi Akash,\n\nName: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message}`)}`;
  }


  // ============ SERVICE CARDS — stagger reveal ============
  const serviceCards = document.querySelectorAll('.service-card');
  let serviceCardsStarted = false;

  const serviceObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !serviceCardsStarted) {
      serviceCardsStarted = true;
      serviceCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 80);
      });
      serviceObserver.disconnect();
    }
  }, { threshold: 0.1 });

  const servicesGrid = document.querySelector('.services__grid');
  if (servicesGrid) serviceObserver.observe(servicesGrid);


  // ============ PARALLAX — Hero Visual ============
  const heroVisual = document.querySelector('.hero__diagram');
  const heroGridOverlay = document.querySelector('.hero__grid-overlay');

  if (heroVisual) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.08}px)`;
        if (heroGridOverlay) {
          heroGridOverlay.style.transform = `translateY(${scrolled * 0.04}px)`;
        }
      }
    });
  }


  // ============ ACTIVE NAV STYLE ============
  const styleSheet = document.styleSheets[0];
  try {
    styleSheet.insertRule('.nav__link.active { color: var(--teal) !important; }', styleSheet.cssRules.length);
  } catch (e) {
    // Cross-origin stylesheet, skip
  }


  // ============ COPY EMAIL ON CLICK ============
  const emailLinks = document.querySelectorAll('a[href^="mailto"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Let mailto open but also copy to clipboard
      const email = link.href.replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).catch(() => {});
      }
    });
  });


  // ============ KEYBOARD NAVIGATION ============
  document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
      navLinksContainer.classList.remove('open');
      hamburger.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });


  // ============ PERFORMANCE — Throttle scroll ============
  let scrollTimeout;
  const originalScrollHandler = window.onscroll;

  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 10);
    }
  }, { passive: true });

  console.log('%c Akash Mandli Portfolio ', 'background: #00C9B1; color: #0F1F3D; font-family: monospace; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
  console.log('%c Built with precision. Like my BRDs. ', 'color: #00C9B1; font-family: monospace; font-size: 11px;');

});
