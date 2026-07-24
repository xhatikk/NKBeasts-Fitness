(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const menuBtn = $('#menuBtn');
  const nav = $('#mainNav');
  menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));
  $$('#mainNav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

  function detectLanguage() {
    const saved = localStorage.getItem('nk-lang');
    if (saved) return saved;
    const lang = (navigator.language || 'en').toLowerCase();
    return lang.startsWith('de') ? 'de' : lang.startsWith('sq') ? 'sq' : 'en';
  }

  window.applyLanguage = (lang) => {
    window.currentLang = lang;
    localStorage.setItem('nk-lang', lang);
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const text = window.I18N?.[lang]?.[el.dataset.i18n];
      if (text) el.textContent = text;
    });
    $$('[data-lang]').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    window.dispatchEvent(new CustomEvent('nk-language-change', { detail: { lang } }));
  };
  $$('[data-lang]').forEach(btn => btn.addEventListener('click', () => window.applyLanguage(btn.dataset.lang)));
  window.applyLanguage(detectLanguage());

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const plans = {
    push: [['Bench Press','3','5–8'],['Incline Dumbbell Press','3','8–12'],['Chest Fly','3','10–15'],['Lateral Raise','3','10–15'],['Triceps Extension','3','10–15']],
    pull: [['Bent Over Row','3','6–8'],['Lat Pulldown','3','8–12'],['Cable Row','3','10–12'],['Rear Delt Fly','3','12–15'],['Bayesian Curl','3','10–15']],
    legs: [['Back Squat','3','5–8'],['Romanian Deadlift','3','8–10'],['Leg Press','3','10–15'],['Walking Lunges','3','10/leg'],['Plank','3','45–60 sec']]
  };
  $$('[data-plan]').forEach(btn => btn.addEventListener('click', () => {
    const modal = $('#planModal');
    const key = btn.dataset.plan;
    if (!modal || !plans[key]) return;
    $('#planTitle').textContent = key === 'push' ? 'Push Day' : key === 'pull' ? 'Pull Day' : 'Legs & Core';
    $('#planBody').innerHTML = plans[key].map(x => `<div class="exercise"><strong>${x[0]}</strong><span>${x[1]} sets</span><span>${x[2]}</span></div>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }));
  const closePlan = () => { const m = $('#planModal'); m?.classList.remove('open'); m?.setAttribute('aria-hidden','true'); };
  $('#closeModal')?.addEventListener('click', closePlan);
  $('#planModal')?.addEventListener('click', e => { if (e.target.id === 'planModal') closePlan(); });

  const cookie = $('#cookieBanner');
  if (cookie) {
    if (localStorage.getItem('nk-cookie')) cookie.classList.add('hidden');
    $('#acceptCookie')?.addEventListener('click', () => { localStorage.setItem('nk-cookie','accepted'); cookie.classList.add('hidden'); });
    $('#rejectCookie')?.addEventListener('click', () => { localStorage.setItem('nk-cookie','rejected'); cookie.classList.add('hidden'); });
  }

  const header = $('.topbar');
  const back = $('#backToTop');
  function goTo(id, changeHash = true) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + scrollY - (header?.offsetHeight || 0) - 14;
    scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    if (changeHash) history.pushState(null, '', '#' + id);
    nav?.classList.remove('open');
  }
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')?.slice(1);
    if (id && document.getElementById(id)) { e.preventDefault(); goTo(id); }
  });
  back?.addEventListener('click', () => goTo('home'));
  addEventListener('scroll', () => back?.classList.toggle('show', scrollY > 600), { passive: true });

  const info = {
    about: ['Rreth NKBEASTS','<p>NKBEASTS është platformë për stërvitje, ushqim, kalkulatorë, lajme dhe motivim.</p>'],
    contact: ['Kontakt','<p>Email: <a href="mailto:xhatikk@hotmail.com">xhatikk@hotmail.com</a></p>'],
    privacy: ['Privatësia','<p>Kalkulatorët punojnë në pajisjen tënde. Gjuha dhe zgjedhja e cookies ruhen lokalisht.</p>'],
    faq: ['FAQ','<p><strong>Si ndryshohet gjuha?</strong><br>Shtyp SQ, DE ose EN.</p>']
  };
  const infoModal = $('#infoModal');
  $$('.footer-info-btn').forEach(btn => btn.addEventListener('click', () => {
    const item = info[btn.dataset.info];
    if (!item || !infoModal) return;
    $('#infoTitle').textContent = item[0];
    $('#infoBody').innerHTML = item[1];
    infoModal.classList.add('open');
    infoModal.setAttribute('aria-hidden','false');
  }));
  const closeInfo = () => { infoModal?.classList.remove('open'); infoModal?.setAttribute('aria-hidden','true'); };
  $('#closeInfoModal')?.addEventListener('click', closeInfo);
  infoModal?.addEventListener('click', e => { if (e.target === infoModal) closeInfo(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { closePlan(); closeInfo(); } });
})();
