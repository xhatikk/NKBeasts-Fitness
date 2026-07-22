let currentLang = localStorage.getItem("nk-lang") || (() => {
  const l=(navigator.language||"en").toLowerCase();
  return l.startsWith("de")?"de":l.startsWith("sq")?"sq":"en";
})();

function applyLanguage(lang){
  currentLang=lang;
  localStorage.setItem("nk-lang",lang);
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.dataset.i18n, value=i18n[lang][key];
    if(value) el.innerHTML=value;
  });
  document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
}
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));
applyLanguage(currentLang);

document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("open");
document.querySelectorAll(".main-nav a").forEach(a=>a.onclick=()=>document.getElementById("mainNav").classList.remove("open"));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const plans={
  push:[["Bench Press","3","5–8"],["Incline Dumbbell Press","3","8–12"],["Chest Fly","3","10–15"],["Lateral Raise","3","10–15"],["Overhead Triceps Extension","3","10–15"]],
  pull:[["Bent Over Row","3","6–8"],["Pull-Up / Lat Pulldown","3","8–12"],["Close-Grip Cable Row","3","10–12"],["Rear Delt Cable Fly","3","12–15"],["Bayesian Curl","3","10–15"]],
  legs:[["Back Squat","3","5–8"],["Romanian Deadlift","3","8–10"],["Leg Press","3","10–15"],["Walking Lunges","3","10/leg"],["Plank","3","45–60 sec"]]
};
document.querySelectorAll(".open-plan").forEach(btn=>btn.onclick=()=>{
  const key=btn.dataset.plan;
  document.getElementById("modalTitle").textContent=key==="push"?"Push Day":key==="pull"?"Pull Day":"Legs & Core";
  document.getElementById("modalBody").innerHTML=plans[key].map(x=>`<div class="exercise-row"><strong>${x[0]}</strong><span>${x[1]} sets</span><span>${x[2]}</span></div>`).join("");
  document.getElementById("planModal").classList.add("open");
  document.getElementById("planModal").setAttribute("aria-hidden","false");
});
document.getElementById("closeModal").onclick=()=>document.getElementById("planModal").classList.remove("open");
document.getElementById("planModal").onclick=e=>{if(e.target.id==="planModal")e.currentTarget.classList.remove("open")};

const cookie=document.getElementById("cookieBanner");
if(localStorage.getItem("nk-cookie"))cookie.classList.add("hidden");
document.getElementById("cookieAccept").onclick=()=>{localStorage.setItem("nk-cookie","accepted");cookie.classList.add("hidden")};
document.getElementById("cookieReject").onclick=()=>{localStorage.setItem("nk-cookie","rejected");cookie.classList.add("hidden")};
