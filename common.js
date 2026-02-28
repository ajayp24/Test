/* ═══════════════════════════════════════
   360DigiLearning — Shared JS (common.js)
═══════════════════════════════════════ */

// ── ACTIVE NAV LINK ──
document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (ham && mob) {
    ham.addEventListener('click', () => mob.classList.toggle('open'));
  }

  // hero slider init
  initSlider();

  // testimonial slider
  initTSlider();

  // promo banner close
  const pbc = document.getElementById('promoBannerClose');
  if (pbc) pbc.addEventListener('click', () => {
    document.getElementById('promoBanner').style.display = 'none';
  });

  // toast auto-hide
  window._toastTimer = null;
});

// ── TOAST ──
function showToast(msg, type = 'default') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.className = 'toast', 3600);
}

// ── HERO SLIDER ──
let _slide = 0, _slideTimer;
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.sdot');
  if (!slides.length) return;

  function goTo(n) {
    slides[_slide].classList.remove('active');
    dots[_slide]?.classList.remove('on');
    _slide = (n + slides.length) % slides.length;
    slides[_slide].classList.add('active');
    dots[_slide]?.classList.add('on');
  }

  window.slideNext = () => { goTo(_slide + 1); resetTimer(); };
  window.slidePrev = () => { goTo(_slide - 1); resetTimer(); };
  window.slideTo = (n) => { goTo(n); resetTimer(); };

  function resetTimer() {
    clearInterval(_slideTimer);
    _slideTimer = setInterval(() => goTo(_slide + 1), 5200);
  }
  resetTimer();
}

// ── TESTIMONIAL SLIDER ──
let _tslide = 0, _tTimer;
function initTSlider() {
  const track = document.getElementById('tsliderTrack');
  const dots = document.querySelectorAll('.tdot');
  if (!track) return;

  function goT(n) {
    dots[_tslide]?.classList.remove('on');
    _tslide = (n + dots.length) % dots.length;
    track.style.transform = `translateX(-${_tslide * 100}%)`;
    dots[_tslide]?.classList.add('on');
  }
  window.goTSlide = goT;

  _tTimer = setInterval(() => goT(_tslide + 1), 4500);
}

// ── STORAGE (Date-based JSON folder structure) ──
// localStorage simulates:
//   data/YYYY-MM-DD/access_requests.json
//   data/YYYY-MM-DD/session_bookings.json
//   data/YYYY-MM-DD/exam_submissions.json

const STORE = '360digi_v2';

function _getDB() {
  try { return JSON.parse(localStorage.getItem(STORE)) || {}; }
  catch { return {}; }
}
function _saveDB(db) {
  localStorage.setItem(STORE, JSON.stringify(db));
}
function _todayKey() {
  return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
}

/**
 * Save a record into folder (e.g. 'access_requests') under today's date
 */
function saveRecord(folder, data) {
  const db = _getDB();
  const d = _todayKey();
  if (!db[d]) db[d] = {};
  if (!db[d][folder]) db[d][folder] = [];
  const record = {
    ...data,
    _id: 'r_' + Date.now(),
    _timestamp: new Date().toISOString(),
    _date: d,
  };
  db[d][folder].push(record);
  _saveDB(db);
  return record;
}

/**
 * Get all records across all dates for a given folder
 */
function getAllRecords(folder) {
  const db = _getDB();
  const all = [];
  Object.keys(db).sort((a, b) => b.localeCompare(a)).forEach(date => {
    (db[date][folder] || []).forEach(r => all.push(r));
  });
  return all;
}

function getFullDB() { return _getDB(); }

function clearDB() {
  localStorage.removeItem(STORE);
}

// ── VALIDATION ──
function validateField(input) {
  const val = input.value.trim();
  const type = input.dataset.validate || '';
  const errEl = document.getElementById(input.id + '_err');
  let msg = '';

  if (input.required && !val) {
    msg = input.dataset.errRequired || 'This field is required.';
  } else if (val) {
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msg = 'Please enter a valid email address.';
    } else if (type === 'phone' && !/^[\+\d\s\-\(\)]{7,15}$/.test(val)) {
      msg = 'Please enter a valid phone number.';
    } else if (type === 'minlen' && val.length < parseInt(input.dataset.min || 2)) {
      msg = `Minimum ${input.dataset.min || 2} characters required.`;
    }
  }

  input.classList.toggle('error', !!msg);
  input.classList.toggle('success', !msg && !!val);
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.toggle('show', !!msg);
  }
  return !msg;
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  let valid = true;
  form.querySelectorAll('input[required], select[required], textarea[required]').forEach(f => {
    if (!validateField(f)) valid = false;
  });
  return valid;
}

// Attach live validation on blur
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form-control').forEach(inp => {
    inp.addEventListener('blur', () => validateField(inp));
    inp.addEventListener('input', () => {
      if (inp.classList.contains('error')) validateField(inp);
    });
  });
});

// ── MODAL ──
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── DATE FORMAT ──
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
       + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ── EXPORT JSON ──
function exportJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
