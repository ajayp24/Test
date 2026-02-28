/* nav.js — injects navbar and footer */
document.addEventListener('DOMContentLoaded', () => {
  // NAV
  const navEl = document.getElementById('mainNav');
  if (navEl) {
    navEl.innerHTML = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="nav-logo">
          <div class="logo-mark">360</div>
          <span class="logo-text"><span class="digi">Digi</span><span class="learning">Learning</span></span>
        </a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="programs.html">Programs</a>
          <a href="practice-exam.html">Practice Exam</a>
          <a href="training.html">Training</a>
          <a href="request.html">Request Session</a>
          <a href="login.html">Login</a>
          <a href="request.html" class="btn-nav-cta">Get Started</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      <a href="index.html">Home</a>
      <a href="programs.html">Programs</a>
      <a href="practice-exam.html">Practice Exam</a>
      <a href="training.html">Training</a>
      <a href="request.html">Request Session</a>
      <a href="login.html">Login</a>
      <a href="admin-login.html" style="color:var(--gray-400)">Admin</a>
    </div>`;

    // Highlight active
    const page = location.pathname.split('/').pop() || 'index.html';
    navEl.querySelectorAll('a[href]').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    // Hamburger
    navEl.querySelector('#hamburger')?.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.toggle('open');
    });
  }

  // FOOTER
  const footerEl = document.getElementById('mainFooter');
  if (footerEl) {
    footerEl.innerHTML = `
    <footer class="footer">
      <div class="footer-grid container">
        <div>
          <div class="footer-brand-name">360 <span class="digi">Digi</span><span class="learning">Learning</span></div>
          <p class="footer-brand-desc">Empowering engineers and architects with world-class cloud, programming, and system design education.</p>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Programs</div>
          <a href="programs.html">AWS Cloud</a>
          <a href="programs.html">System Design</a>
          <a href="programs.html">Programming</a>
          <a href="programs.html">Architecture</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Resources</div>
          <a href="practice-exam.html">Practice Exam</a>
          <a href="training.html">1-on-1 Training</a>
          <a href="request.html">Request Access</a>
          <a href="login.html">Login</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Admin</div>
          <a href="admin-login.html">Admin Login</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="request.html">Contact Us</a>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>© 2024 360DigiLearning. All rights reserved.</p>
        <a href="admin-login.html">Admin Portal →</a>
      </div>
    </footer>`;
  }

  // TOAST element
  if (!document.getElementById('toast')) {
    const t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
});
