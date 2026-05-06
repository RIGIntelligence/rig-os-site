/* ============================================================
   RIG OS — Shared Scripts V2
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all siblings
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Revenue Leak Calculator ---
  const calcForm = document.getElementById('calc-revenue');
  if (calcForm) {
    const sliders = calcForm.querySelectorAll('input[type="range"]');
    const update = () => {
      const monthlyRev = parseInt(document.getElementById('slider-revenue')?.value || 25000);
      const missedCalls = parseInt(document.getElementById('slider-calls')?.value || 8);
      const noShowPct = parseInt(document.getElementById('slider-noshow')?.value || 15);
      const reviewGap = parseInt(document.getElementById('slider-reviews')?.value || 3);

      // Show slider values
      document.getElementById('val-revenue').textContent = '$' + monthlyRev.toLocaleString();
      document.getElementById('val-calls').textContent = missedCalls + '/week';
      document.getElementById('val-noshow').textContent = noShowPct + '%';
      document.getElementById('val-reviews').textContent = reviewGap + '/mo';

      // Estimate leaks
      const avgJobValue = monthlyRev / 80; // ~80 jobs/month for a local biz
      const callLeak = missedCalls * 4 * avgJobValue * 0.35; // 35% would've booked
      const noShowLeak = (monthlyRev * noShowPct / 100) * 0.4; // 40% recoverable
      const reviewLeak = reviewGap * avgJobValue * 0.5; // missed reviews = missed referrals
      const totalLeak = Math.round(callLeak + noShowLeak + reviewLeak);
      const annualLeak = totalLeak * 12;
      const rigCost = Math.round(totalLeak * 0.15); // 15% of recovered
      const netGain = totalLeak - rigCost;

      document.getElementById('calc-monthly-leak').textContent = '$' + totalLeak.toLocaleString();
      document.getElementById('calc-annual-leak').textContent = '$' + annualLeak.toLocaleString();
      document.getElementById('calc-rig-cost').textContent = '$' + rigCost.toLocaleString() + '/mo';
      document.getElementById('calc-net-gain').textContent = '+$' + netGain.toLocaleString() + '/mo';
    };
    sliders.forEach(s => s.addEventListener('input', update));
    update(); // initial calc
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});


// --- Contact Form (client-side only, posts to Formspree or similar) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    // Simulate send (replace with real endpoint)
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = 'var(--moss)';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1000);
  });
}

// --- Mobile dropdown toggles ---
if (window.innerWidth <= 768) {
  document.querySelectorAll('.nav-item > a').forEach(a => {
    if (a.querySelector('.chevron')) {
      a.addEventListener('click', e => {
        e.preventDefault();
        const dropdown = a.nextElementSibling;
        if (dropdown && dropdown.classList.contains('nav-dropdown')) {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          dropdown.style.position = 'static';
          dropdown.style.opacity = '1';
          dropdown.style.visibility = 'visible';
          dropdown.style.transform = 'none';
          dropdown.style.minWidth = 'auto';
          dropdown.style.border = 'none';
          dropdown.style.padding = '0 0 0 16px';
        }
      });
    }
  });
}
