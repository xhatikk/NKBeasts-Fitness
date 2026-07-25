const exercises = [
 {id:1,title:"Barbell Back Squat",category:"legs",cat:"KËMBË",muscles:"Quads, Glutes, Core",sets:"4 × 6–10",level:"Mesatar",video:"QmZAiBqPvZw",desc:"Mbreti i ushtrimeve. Këmbët në gjerësi shpatullash, gjunjët në linjë me gishtat dhe zbritje e kontrolluar deri paralel.",mistake:"Gjunjët bien brenda ose shpina rrumbullakohet."},
 {id:2,title:"Deadlift Konvencional",category:"back",cat:"SHPINË",muscles:"Shpinë, Glutes, Hamstrings",sets:"3 × 5–8",level:"Avancuar",video:"hCDzSR6bW10",desc:"Shpina neutrale, shufra pranë këmbëve dhe shtytje e fortë nga dyshemeja për fuqi të tërë trupit.",mistake:"Shufra largohet nga trupi dhe shpina humb pozicionin."},
 {id:3,title:"Bench Press",category:"chest",cat:"KRAHAROR",muscles:"Kraharor, Triceps, Shoulders",sets:"4 × 6–10",level:"Mesatar",video:"rT7DgCr-3pg",desc:"Shpatullat mbrapa, këmbët të fiksuara dhe shufra zbret me kontroll drejt kraharorit të poshtëm.",mistake:"Bërrylat hapen shumë dhe shpatullat ngrihen nga stoli."},
 {id:4,title:"Pull-Up",category:"back",cat:"SHPINË",muscles:"Lats, Biceps",sets:"4 × maksimum",level:"Mesatar",video:"eGo4IYlbE5g",desc:"Kap shufrën pak më gjerë se shpatullat dhe tërhiq trupin derisa mjekra të kalojë shufrën.",mistake:"Lëkundje e tepërt dhe përsëritje të paplota."},
 {id:5,title:"Overhead Press",category:"arms",cat:"KRAHË",muscles:"Shoulders, Triceps",sets:"4 × 6–10",level:"Mesatar",video:"F3QY5vMz_6I",desc:"Nga pozita në këmbë, shty shufrën vertikalisht mbi kokë duke e mbajtur trupin të tensionuar.",mistake:"Hark i madh në mes dhe humbje e kontrollit të barkut."},
 {id:6,title:"Barbell Row",category:"back",cat:"SHPINË",muscles:"Lats, Rhomboids, Biceps",sets:"4 × 8–12",level:"Mesatar",video:"vT2GjY_Umpw",desc:"Përkulu rreth 45°, tërhiq shufrën drejt barkut dhe bashko shpatullat në fund të lëvizjes.",mistake:"Trupi ngrihet e ulet për të krijuar vrull."},
 {id:7,title:"Romanian Deadlift",category:"legs",cat:"KËMBË",muscles:"Hamstrings, Glutes",sets:"4 × 8–12",level:"Mesatar",video:"jEy_czb3RKA",desc:"Gjunjët pak të përkulur, ijet shtyhen prapa dhe shufra rrëshqet afër këmbëve.",mistake:"Ulja bëhet si squat në vend të lëvizjes nga ijet."},
 {id:8,title:"Dips",category:"chest",cat:"KRAHAROR",muscles:"Kraharor, Triceps",sets:"3 × 8–15",level:"Mesatar",video:"2z8JmcrW-As",desc:"Në paralele, ule trupin me kontroll deri rreth 90° dhe shty lart pa humbur stabilitetin.",mistake:"Zbritje shumë e thellë me shpatulla të paqëndrueshme."},
 {id:9,title:"Plank",category:"core",cat:"BËRTHAMA",muscles:"Core, Abs",sets:"3 × 30–60 sek",level:"Fillestar",video:"ASdvN_XEl_c",desc:"Trupi mbahet drejt si vijë, bërrylat nën shpatulla dhe barku e gluteusi të shtrënguar.",mistake:"Ijet bien poshtë ose ngrihen shumë lart."},
 {id:10,title:"Bicep Curl",category:"arms",cat:"KRAHË",muscles:"Biceps",sets:"3 × 10–15",level:"Fillestar",video:"ykJmrZ5v0Oo",desc:"Mbaj bërrylat pranë trupit, ngrije peshën me kontroll dhe shtrëngo bicepsin sipër.",mistake:"Lëkundje e trupit dhe lëvizje e bërrylave përpara."},
 {id:11,title:"Bulgarian Split Squat",category:"legs",cat:"KËMBË",muscles:"Quads, Glutes",sets:"3 × 8–12/ane",level:"Mesatar",video:"2C-uNgKwPLE",desc:"Vendose këmbën e pasme mbi stol dhe puno me këmbën e përparme duke shtyrë nga thembra.",mistake:"Hapi shumë i shkurtër dhe gjuri humb drejtimin."},
 {id:12,title:"Hanging Leg Raise",category:"core",cat:"BËRTHAMA",muscles:"Abs, Hip Flexors",sets:"3 × 8–15",level:"Mesatar",video:"Pr1ieGZ5atk",desc:"Varu në shufër dhe ngriji këmbët me kontroll deri rreth 90° pa e lëkundur trupin.",mistake:"Përdorimi i vrullit në vend të kontrollit të barkut."}
]

const grid=document.getElementById("exerciseGrid");
const filters=document.getElementById("filters");
const modal=document.getElementById("videoModal");
const frame=document.getElementById("videoFrame");

function render(filter="all"){
 const items=filter==="all"?exercises:exercises.filter(x=>x.category===filter);
 grid.innerHTML=items.map(x=>`<article class="exercise-card" data-id="${x.id}" tabindex="0" role="button" aria-label="Hap videon ${x.title}">
   <div class="exercise-art">
     <img src="https://i.ytimg.com/vi/${x.video}/hqdefault.jpg" alt="${x.title}" loading="lazy">
     <div class="exercise-overlay"></div>
   </div>
   <div class="play">▶</div>
   <div class="exercise-body"><small>${x.cat}<i>·</i>${x.muscles}</small><h3>${x.title}</h3><p>${x.desc}</p></div>
 </article>`).join("");
}
render();

filters.addEventListener("click",e=>{
 const b=e.target.closest("button"); if(!b)return;
 filters.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter);
});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.closest(".exercise-card")){e.preventDefault();e.target.closest(".exercise-card").click();}});
grid.addEventListener("click",e=>{
 const card=e.target.closest(".exercise-card");if(!card)return;
 const x=exercises.find(v=>v.id===Number(card.dataset.id));
 frame.src=`https://www.youtube-nocookie.com/embed/${x.video}?autoplay=1&rel=0`;
 document.getElementById("modalCategory").textContent=x.cat;
 document.getElementById("modalTitle").textContent=x.title;
 document.getElementById("modalDescription").textContent=x.desc;
 document.getElementById("modalSets").textContent=x.sets;
 document.getElementById("modalLevel").textContent=x.level;
 document.getElementById("modalMuscles").textContent=x.muscles;
 document.getElementById("modalMistake").textContent=x.mistake;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
});
document.querySelectorAll("[data-close]").forEach(x=>x.addEventListener("click",()=>{modal.classList.remove("open");frame.src="";document.body.style.overflow="";}));
const pm=document.getElementById("programModal");
document.getElementById("openProgram").onclick=()=>{pm.classList.add("open");document.body.style.overflow="hidden"};
document.querySelectorAll("[data-program-close]").forEach(x=>x.onclick=()=>{pm.classList.remove("open");document.body.style.overflow=""});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){modal.classList.remove("open");pm.classList.remove("open");frame.src="";document.body.style.overflow=""}});


// ===== NKBEASTS EXTENSIONS: translations, calculators, news, radio, legal =====
const translations = {
 sq:{navNutrition:"Ushqim",navCalculators:"Kalkulatorë",navNews:"Lajme",navRadio:"Radio",navGear:"NK Gear",heroEyebrow:"PLATFORMA JOTE E FITNESIT",heroTitle:"BËHU MË I FORTË.<br><em>STËRVITU MË MENÇUR.</em>",heroText:"Video të qarta, teknikë e saktë dhe programe praktike për çdo pjesë të trupit.",heroVideos:"Shiko ushtrimet",heroPrograms:"Eksploro programet",calcEyebrow:"MAT PROGRESIN",calcTitle:"KALKULATORË <em>FITNESS</em>",calcText:"Llogarit BMI-në, kaloritë ditore dhe proteinën. Rezultatet janë orientuese, jo diagnozë mjekësore.",bmiTitle:"Indeksi i masës trupore",calorieTitle:"Kaloritë ditore",proteinTitle:"Proteina ditore",height:"Gjatësia (cm)",weight:"Pesha (kg)",age:"Mosha",sex:"Gjinia",activity:"Aktiviteti",goal:"Qëllimi",calculate:"Llogarit",newsEyebrow:"FITNESS · USHQIM · SHËNDET",newsTitle:"LAJMET <em>E FUNDIT</em>",refresh:"Rifresko lajmet",radioEyebrow:"MUZIKË GJATË STËRVITJES",radioTitle:"RADIO <em>LIVE</em>",radioText:"Zgjidh një radio nga Kosova ose Shqipëria. Lista merret automatikisht nga Radio Browser.",station:"Stacioni",nowPlaying:"TANI DUKE LUAJTUR",onlineNow:"online tani"},
 de:{navNutrition:"Ernährung",navCalculators:"Rechner",navNews:"News",navRadio:"Radio",navGear:"NK Gear",heroEyebrow:"DEINE FITNESS-PLATTFORM",heroTitle:"WERDE STÄRKER.<br><em>TRAINIERE INTELLIGENTER.</em>",heroText:"Klare Videos, saubere Technik und praktische Programme für jede Muskelgruppe.",heroVideos:"Übungen ansehen",heroPrograms:"Programme entdecken",calcEyebrow:"FORTSCHRITT MESSEN",calcTitle:"FITNESS-<em>RECHNER</em>",calcText:"BMI, Tageskalorien und Proteinbedarf berechnen. Ergebnisse dienen nur zur Orientierung.",bmiTitle:"Body-Mass-Index",calorieTitle:"Tägliche Kalorien",proteinTitle:"Tägliches Protein",height:"Größe (cm)",weight:"Gewicht (kg)",age:"Alter",sex:"Geschlecht",activity:"Aktivität",goal:"Ziel",calculate:"Berechnen",newsEyebrow:"FITNESS · ERNÄHRUNG · GESUNDHEIT",newsTitle:"AKTUELLE <em>NEWS</em>",refresh:"News aktualisieren",radioEyebrow:"MUSIK FÜRS TRAINING",radioTitle:"LIVE-<em>RADIO</em>",radioText:"Wähle einen Sender aus Kosovo oder Albanien. Die Liste wird automatisch geladen.",station:"Sender",nowPlaying:"JETZT LÄUFT",onlineNow:"jetzt online"},
 en:{navNutrition:"Nutrition",navCalculators:"Calculators",navNews:"News",navRadio:"Radio",navGear:"NK Gear",heroEyebrow:"YOUR FITNESS PLATFORM",heroTitle:"GET STRONGER.<br><em>TRAIN SMARTER.</em>",heroText:"Clear videos, correct technique and practical programs for every muscle group.",heroVideos:"View exercises",heroPrograms:"Explore programs",calcEyebrow:"MEASURE PROGRESS",calcTitle:"FITNESS <em>CALCULATORS</em>",calcText:"Calculate BMI, daily calories and protein. Results are estimates, not medical advice.",bmiTitle:"Body mass index",calorieTitle:"Daily calories",proteinTitle:"Daily protein",height:"Height (cm)",weight:"Weight (kg)",age:"Age",sex:"Sex",activity:"Activity",goal:"Goal",calculate:"Calculate",newsEyebrow:"FITNESS · NUTRITION · HEALTH",newsTitle:"LATEST <em>NEWS</em>",refresh:"Refresh news",radioEyebrow:"WORKOUT MUSIC",radioTitle:"LIVE <em>RADIO</em>",radioText:"Choose a station from Kosovo or Albania. Stations load automatically from Radio Browser.",station:"Station",nowPlaying:"NOW PLAYING",onlineNow:"online now"}
};
let currentLang = localStorage.getItem("nk-lang") || "sq";
function applyLanguage(lang){
 currentLang=translations[lang]?lang:"sq"; localStorage.setItem("nk-lang",currentLang);
 document.documentElement.lang=currentLang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const v=translations[currentLang][el.dataset.i18n];if(v)el.textContent=v});
 document.querySelectorAll("[data-i18n-html]").forEach(el=>{const v=translations[currentLang][el.dataset.i18nHtml];if(v)el.innerHTML=v});
 document.querySelectorAll(".langs button").forEach(b=>b.classList.toggle("active",b.dataset.lang===currentLang));
 loadNews();
}
document.querySelectorAll(".langs button").forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));
applyLanguage(currentLang);

// Calculators
document.getElementById("bmiForm").addEventListener("submit",e=>{e.preventDefault();const h=+bmiHeight.value/100,w=+bmiWeight.value,b=w/(h*h);let c=b<18.5?"nën peshë":b<25?"peshë normale":b<30?"mbipeshë":"obezitet";bmiResult.innerHTML=`<b>BMI: ${b.toFixed(1)}</b><br>${c}`});
document.getElementById("calorieForm").addEventListener("submit",e=>{e.preventDefault();const w=+calWeight.value,h=+calHeight.value,a=+calAge.value,s=calSex.value==="male"?5:-161,act=+calActivity.value;const bmr=10*w+6.25*h-5*a+s,tdee=Math.round(bmr*act);calorieResult.innerHTML=`<b>${tdee} kcal/ditë</b><br>Deficit i moderuar: rreth ${Math.max(1200,tdee-400)} kcal`});
document.getElementById("proteinForm").addEventListener("submit",e=>{e.preventDefault();const p=Math.round(+proteinWeight.value*+proteinGoal.value);proteinResult.innerHTML=`<b>${p} g proteinë/ditë</b><br>Ndaje në 3–5 vakte.`});

// News via Cloudflare Pages Function, with safe fallback
const fallbackNews=[
 {title:"Si ta përmirësosh teknikën e squat-it",source:"NKBEASTS",description:"Mbaj gjunjët në drejtimin e gishtave dhe mos sakrifiko kontrollin për peshë më të madhe.",link:"#videos"},
 {title:"Sa proteinë të duhet në ditë?",source:"NKBEASTS",description:"Për shumicën e personave aktivë, 1.4–2.0 g për kg peshë trupore është interval praktik.",link:"#calculators"},
 {title:"Gjumi është pjesë e programit",source:"NKBEASTS",description:"Pa rikuperim të mjaftueshëm, performanca dhe progresi bien edhe kur programi është i mirë.",link:"#nutrition"}
];
function renderNews(items){
 newsGrid.innerHTML=items.slice(0,6).map(n=>`<article class="news-card"><div class="news-image">📰</div><div class="news-body"><small>${escapeHtml(n.source||"Fitness News")}</small><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.description||"Lexo zhvillimet e fundit nga fitnessi dhe ushqimi.")}</p><a href="${safeUrl(n.link)}" ${String(n.link).startsWith("http")?'target="_blank" rel="noopener noreferrer"':''}>Lexo më shumë →</a></div></article>`).join("");
}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function safeUrl(u){const s=String(u||"#");return /^(https?:\/\/|#)/i.test(s)?s:"#"}
async function loadNews(){
 newsStatus.textContent="Duke ngarkuar lajmet…";
 try{
  const r=await fetch(`/api/news?lang=${currentLang}`,{cache:"no-store"});if(!r.ok)throw new Error("API");
  const data=await r.json();if(!Array.isArray(data.items)||!data.items.length)throw new Error("empty");
  renderNews(data.items);newsStatus.textContent="Lajmet u rifreskuan.";
 }catch(e){renderNews(fallbackNews);newsStatus.textContent="Po shfaqen artikujt rezervë. RSS live aktivizohet pas publikimit në Cloudflare Pages."}
}
document.getElementById("refreshNews").addEventListener("click",loadNews);

// Radio Browser stations by genre
const audio=document.getElementById("radioAudio"),stationSelect=document.getElementById("stationSelect"),radioPlay=document.getElementById("radioPlay"),radioBox=document.querySelector(".radio-player"),genreButtons=document.getElementById("genreButtons");
let stations=[];
async function loadStations(tag="hiphop"){
 stationSelect.innerHTML='<option>Duke ngarkuar radiot…</option>';
 radioMessage.textContent="";
 try{
  const endpoints=["https://de1.api.radio-browser.info","https://nl1.api.radio-browser.info","https://at1.api.radio-browser.info"];
  let data=[];
  for(const base of endpoints){
   try{
    const r=await fetch(`${base}/json/stations/bytagexact/${encodeURIComponent(tag)}?hidebroken=true&order=clickcount&reverse=true&limit=60`);
    if(!r.ok) throw new Error("radio api");
    data=await r.json(); if(data.length) break;
   }catch(_){}
  }
  stations=data.filter(s=>s.url_resolved&&/^https?:/i.test(s.url_resolved)).filter((s,i,a)=>a.findIndex(x=>x.url_resolved===s.url_resolved)===i).slice(0,45);
  if(!stations.length)throw new Error("No stations");
  stationSelect.innerHTML=stations.map((s,i)=>`<option value="${i}">${escapeHtml(s.name||"Radio")} — ${escapeHtml(s.country||"")}</option>`).join("");
  selectStation(0);
 }catch(e){
  stationSelect.innerHTML='<option value="">Stacionet nuk u ngarkuan</option>';
  radioMessage.textContent="Radio Browser nuk u përgjigj. Provo përsëri pas pak.";
 }
}
function selectStation(i){
 const s=stations[+i];if(!s)return;
 audio.pause();audio.src=s.url_resolved;radioPlay.textContent="▶";radioBox.classList.remove("playing");
 stationName.textContent=s.name||"Radio Live";stationCountry.textContent=s.country||"";radioMessage.textContent="";
}
genreButtons?.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{
 genreButtons.querySelectorAll("button").forEach(x=>x.classList.remove("active"));button.classList.add("active");loadStations(button.dataset.tag);
}));
stationSelect.addEventListener("change",()=>selectStation(stationSelect.value));
radioPlay.addEventListener("click",async()=>{
 if(!audio.src){radioMessage.textContent="Zgjidh një stacion.";return}
 try{if(audio.paused){await audio.play();radioPlay.textContent="❚❚";radioBox.classList.add("playing");radioMessage.textContent="";}else{audio.pause();radioPlay.textContent="▶";radioBox.classList.remove("playing");}}
 catch(e){radioMessage.textContent="Ky stream nuk pranohet nga browseri. Provo një stacion tjetër."}
});
radioVolume.addEventListener("input",()=>audio.volume=+radioVolume.value);audio.volume=.8;
audio.addEventListener("error",()=>{radioMessage.textContent="Transmetimi nuk u hap. Provo një stacion tjetër.";radioBox.classList.remove("playing");radioPlay.textContent="▶"});
loadStations();

// Legal modals
const legalData={
 privacy:{title:"Politika e privatësisë",body:"NKBEASTS ruan vetëm preferencën e gjuhës dhe zgjedhjen e cookies në pajisjen tuaj. Para aktivizimit të Google AdSense duhet të plotësohen të dhënat e operatorit, platforma e menaxhimit të pëlqimit dhe informacioni i saktë për shërbimet e palëve të treta."},
 imprint:{title:"Impressum",body:"Këtu duhet të vendosen emri ligjor i operatorit, adresa e plotë në Gjermani, emaili i kontaktit dhe të dhënat e tjera të kërkuara ligjërisht. Mos publiko të dhëna të sajuara."},
 contact:{title:"Kontakt",body:"Email: vendos-emailin-tënd@domain.de<br><br>Zëvendësoje këtë adresë para publikimit final."}
};
const legalModal=document.getElementById("legalModal");
document.querySelectorAll("[data-legal]").forEach(b=>b.onclick=()=>{const x=legalData[b.dataset.legal];legalTitle.textContent=x.title;legalBody.innerHTML=x.body;legalModal.classList.add("open");document.body.style.overflow="hidden"});
document.querySelectorAll("[data-legal-close]").forEach(b=>b.onclick=()=>{legalModal.classList.remove("open");document.body.style.overflow=""});

// Cookies
const cookieBanner=document.getElementById("cookieBanner");
if(localStorage.getItem("nk-cookie-choice"))cookieBanner.classList.add("hidden");
cookieAccept.onclick=()=>{localStorage.setItem("nk-cookie-choice","accepted");cookieBanner.classList.add("hidden")};
cookieReject.onclick=()=>{localStorage.setItem("nk-cookie-choice","necessary");cookieBanner.classList.add("hidden")};


// Online visitors: heartbeat every 30 seconds.
// Real shared count requires a Cloudflare KV binding named VISITORS.
const onlineSessionId = (() => {
  let id = sessionStorage.getItem("nk-online-session");
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
    sessionStorage.setItem("nk-online-session", id);
  }
  return id;
})();
async function updateOnlineCount() {
  try {
    const response = await fetch("/api/online", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ sessionId: onlineSessionId }),
      cache: "no-store"
    });
    if (!response.ok) throw new Error("online api");
    const data = await response.json();
    const count = Math.max(1, Number(data.online) || 1);
    const desktop = document.getElementById("onlineCount");
    const mobile = document.getElementById("onlineCountMobile");
    if (desktop) desktop.textContent = count;
    if (mobile) mobile.textContent = count;
    const front = document.getElementById("frontOnlineCount");
    if (front) front.textContent = count;
  } catch (_) {
    // Keep a truthful minimum of the current visitor rather than inventing numbers.
    const desktop = document.getElementById("onlineCount");
    const mobile = document.getElementById("onlineCountMobile");
    if (desktop) desktop.textContent = "—";
    if (mobile) mobile.textContent = "—";
    const front = document.getElementById("frontOnlineCount");
    if (front) front.textContent = "—";
  }
}
updateOnlineCount();
setInterval(updateOnlineCount, 30000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateOnlineCount();
});
