(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];$("#menuBtn").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));$$('#mainNav a').forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));function detect(){const s=localStorage.getItem("nk-lang");if(s)return s;const l=(navigator.language||"en").toLowerCase();return l.startsWith("de")?"de":l.startsWith("sq")?"sq":"en"}window.applyLanguage=lang=>{window.currentLang=lang;localStorage.setItem("nk-lang",lang);document.documentElement.lang=lang;$$("[data-i18n]").forEach(el=>{const t=window.I18N?.[lang]?.[el.dataset.i18n];if(t)el.textContent=t});$$("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang))};$$("[data-lang]").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));applyLanguage(detect());$("#year").textContent=new Date().getFullYear();const plans={push:[["Bench Press","3","5–8"],["Incline Dumbbell Press","3","8–12"],["Chest Fly","3","10–15"],["Lateral Raise","3","10–15"],["Triceps Extension","3","10–15"]],pull:[["Bent Over Row","3","6–8"],["Lat Pulldown","3","8–12"],["Cable Row","3","10–12"],["Rear Delt Fly","3","12–15"],["Bayesian Curl","3","10–15"]],legs:[["Back Squat","3","5–8"],["Romanian Deadlift","3","8–10"],["Leg Press","3","10–15"],["Walking Lunges","3","10/leg"],["Plank","3","45–60 sec"]]};$$("[data-plan]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.plan,m=$("#planModal");$("#planTitle").textContent=k==="push"?"Push Day":k==="pull"?"Pull Day":"Legs & Core";$("#planBody").innerHTML=plans[k].map(x=>`<div class="exercise"><strong>${x[0]}</strong><span>${x[1]} sets</span><span>${x[2]}</span></div>`).join("");m.classList.add("open");m.setAttribute("aria-hidden","false")}));function close(){const m=$("#planModal");m.classList.remove("open");m.setAttribute("aria-hidden","true")}$("#closeModal").addEventListener("click",close);$("#planModal").addEventListener("click",e=>{if(e.target.id==="planModal")close()});const c=$("#cookieBanner");if(localStorage.getItem("nk-cookie"))c.classList.add("hidden");$("#acceptCookie").addEventListener("click",()=>{localStorage.setItem("nk-cookie","accepted");c.classList.add("hidden")});$("#rejectCookie").addEventListener("click",()=>{localStorage.setItem("nk-cookie","rejected");c.classList.add("hidden")})})();

;(() => {
  const header = document.querySelector(".topbar");
  const nav = document.getElementById("mainNav");
  const back = document.getElementById("backToTop");
  const modal = document.getElementById("infoModal");
  const title = document.getElementById("infoTitle");
  const body = document.getElementById("infoBody");
  const close = document.getElementById("closeInfoModal");

  function goTo(id, changeHash = true) {
    const target = document.getElementById(id);
    if (!target) return;
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    if (changeHash) history.pushState(null, "", "#" + id);
    nav?.classList.remove("open");
  }

  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
      return;
    }
    const id = href.slice(1);
    if (document.getElementById(id)) {
      e.preventDefault();
      goTo(id);
    }
  });

  window.addEventListener("load", () => {
    const id = location.hash.slice(1);
    if (id && document.getElementById(id)) setTimeout(() => goTo(id, false), 100);
  });

  function updateNav() {
    const marker = window.scrollY + (header?.offsetHeight || 0) + 120;
    let active = "home";
    document.querySelectorAll("main section[id]").forEach(section => {
      if (section.offsetTop <= marker) active = section.id;
    });
    document.querySelectorAll('#mainNav a[href^="#"]').forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + active);
    });
    back?.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  back?.addEventListener("click", () => goTo("home"));

  const info = {
    about: ["Rreth NKBEASTS", "<p>NKBEASTS është platformë për stërvitje, ushqim, kalkulatorë, lajme dhe motivim.</p>"],
    contact: ["Kontakt", '<p>Email: <a href="mailto:xhatikk@hotmail.com">xhatikk@hotmail.com</a></p>'],
    privacy: ["Privatësia", "<p>Kalkulatorët punojnë direkt në pajisjen tënde. Zgjedhja e gjuhës dhe cookies ruhen vetëm lokalisht.</p>"],
    faq: ["FAQ", "<p><strong>Si ndryshohet gjuha?</strong><br>Shtyp SQ, DE ose EN.</p><p><strong>Si hapen planet?</strong><br>Shtyp butonin Hap planin.</p>"]
  };

  document.querySelectorAll(".footer-info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = info[btn.dataset.info];
      if (!item || !modal) return;
      title.textContent = item[0];
      body.innerHTML = item[1];
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeInfo() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
  }
  close?.addEventListener("click", closeInfo);
  modal?.addEventListener("click", e => { if (e.target === modal) closeInfo(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeInfo(); });
})();
