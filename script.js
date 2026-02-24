/* ============================================
   AKASH MANDLI PORTFOLIO — script.js
   Handles: Cursor, Nav, Scroll Reveal,
            Number Counters, Mobile Menu,
            Form interactions
   ============================================ */

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


  // ============ CONTACT FORM ============
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn--primary');
      const originalText = btn.textContent;

      // Animate button
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';

      // Simulate submission (replace with your form service: Formspree, Netlify Forms, etc.)
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.style.opacity = '1';

        // Reset after 3 seconds
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.pointerEvents = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });

    // Focus effects on form inputs
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.querySelector('label').style.color = 'var(--teal)';
      });
      input.addEventListener('blur', () => {
        input.parentElement.querySelector('label').style.color = '';
      });
    });
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
