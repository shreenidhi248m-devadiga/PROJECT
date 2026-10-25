/* ==========================================================================
   COLLEGE MANAGEMENT SYSTEM — LANDING PAGE LOGIC (landing.js)
   Interactive Features: Sticky Nav, Mobile Menu, Live Simulator, Form Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 0. Dark / Light Mode Toggle
  const landingThemeToggle = document.getElementById('landing-theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  function updateThemeUI(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }

    [landingThemeToggle, mobileThemeToggle].forEach(btn => {
      if (!btn) return;
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  // Initial theme state detection from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialIsDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  updateThemeUI(initialIsDark);

  function handleToggleTheme() {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    const newDark = !isCurrentlyDark;
    updateThemeUI(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    showToast(newDark ? 'Switched to Dark Mode' : 'Switched to Light Mode', 'info');
  }

  if (landingThemeToggle) {
    landingThemeToggle.addEventListener('click', handleToggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', handleToggleTheme);
  }

  // 1. Sticky Navigation on Scroll
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mobileDrawer.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 4. Interactive Attendance Simulator
  let simTotalLectures = 120;
  let simAttendedLectures = 111;

  const simBigPct = document.getElementById('sim-big-pct');
  const simAttendedVal = document.getElementById('sim-attended-val');
  const simAbsentVal = document.getElementById('sim-absent-val');
  const simStatusBadge = document.getElementById('sim-status-badge');
  const simStatusDesc = document.getElementById('sim-status-desc');
  const btnMarkPresent = document.getElementById('btn-sim-present');
  const btnMarkAbsent = document.getElementById('btn-sim-absent');

  function updateSimulatorUI() {
    if (!simBigPct) return;
    const pct = ((simAttendedLectures / simTotalLectures) * 100).toFixed(1);
    simBigPct.innerHTML = `${pct}<span>%</span>`;
    if (simAttendedVal) simAttendedVal.textContent = simAttendedLectures;
    if (simAbsentVal) simAbsentVal.textContent = (simTotalLectures - simAttendedLectures);

    if (pct >= 85) {
      simStatusBadge.textContent = 'Excellent Standing';
      simStatusBadge.className = 'sim-badge-ok';
      simStatusDesc.textContent = 'Student meets full university eligibility with distinction';
    } else if (pct >= 75) {
      simStatusBadge.textContent = 'Eligible for Exams';
      simStatusBadge.style.color = '#38bdf8';
      simStatusBadge.style.background = 'rgba(56, 189, 248, 0.2)';
      simStatusDesc.textContent = 'Within Mangalore University attendance guidelines (>75%)';
    } else {
      simStatusBadge.textContent = 'Shortfall Warning';
      simStatusBadge.style.color = '#f87171';
      simStatusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
      simStatusBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      simStatusDesc.textContent = 'Below mandatory 75% threshold. Condonation / remedial required';
    }
  }

  if (btnMarkPresent) {
    btnMarkPresent.addEventListener('click', () => {
      simTotalLectures += 1;
      simAttendedLectures += 1;
      updateSimulatorUI();
      showToast('Simulated: Marked Present for current lecture (+1)', 'success');
    });
  }

  if (btnMarkAbsent) {
    btnMarkAbsent.addEventListener('click', () => {
      simTotalLectures += 1;
      updateSimulatorUI();
      showToast('Simulated: Marked Absent for current lecture (Shortfall recalculated)', 'warning');
    });
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('campus-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');

      const name = nameInput ? nameInput.value.trim() : 'Guest';
      showToast(`Thank you, ${name}! Your inquiry has been submitted to the Principal's Office.`, 'success');
      contactForm.reset();
    });
  }

  // 6. Notification Toast Helper
  function showToast(message, type = 'info') {
    let container = document.getElementById('landing-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'landing-toast-container';
      container.className = 'landing-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'landing-toast';
    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${type === 'warning' ? '#f59e0b' : '#38bdf8'}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 7. Dynamic Date in Preview
  const previewDateBadge = document.getElementById('preview-date-badge');
  if (previewDateBadge) {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    previewDateBadge.textContent = today.toLocaleDateString('en-US', options);
  }

});
