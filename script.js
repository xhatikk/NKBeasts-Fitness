const T={
sq:{
 navWorkouts:"Ushtrime",navNutrition:"Ushqimi",navCalculators:"Kalkulatorë",navNews:"Lajme",navRadio:"Radio Live",
 eyebrow:"DISIPLINË • FUQI • REZULTAT",heroLine1:"NDËRTO",heroLine2:"VERSIONIN TËND MË TË FORTË",
 heroText:"Stërvitje, ushqim dhe mjete praktike për njerëz që duan rezultate të vërteta.",
 startTraining:"Fillo stërvitjen",listenRadio:"Dëgjo radion",freePlans:"Plane falas",threeLanguages:"3 gjuhë",mobileReady:"Për telefon",
 ageStrong:"I fortë në çdo moshë",radioEnergy:"Energji për stërvitje",trainingZone:"ZONA E STËRVITJES",
 workoutsTitle:"Zgjidh programin tënd",checkBody:"Kontrollo trupin →",strength:"Forcë & Muskuj",
 strengthText:"Program i strukturuar për masë muskulore dhe progres të qëndrueshëm.",fatLoss:"Djegie yndyre",
 fatLossText:"Kombinim i kardios me ushtrime force për formë atletike.",homeWorkout:"Stërvitje në shtëpi",
 homeWorkoutText:"Seanca efektive me pak ose pa pajisje, kudo që je.",nutritionLabel:"USHQIMI",nutritionTitle:"Ha për performancë",
 nutritionText:"Proteinë e mjaftueshme, vakte të thjeshta dhe kontroll i kalorive — pa dieta ekstreme.",
 proteinMeals:"Vakte me shumë proteina",familyFood:"Ushqim praktik për familje",fatLossMeals:"Ide për humbje yndyre",
 quote:"Trupi nuk ndërtohet nga një ditë perfekte, por nga qindra zgjedhje të mira.",toolsLabel:"MJETE PRAKTIKE",
 calculatorsTitle:"Kalkulatorët e tu",height:"Gjatësia (cm)",weight:"Pesha (kg)",calculate:"Llogarit",calories:"Kaloritë",
 age:"Mosha",protein:"Proteina",goal:"Qëllimi",health:"Shëndet & formë",muscle:"Muskuj",diet:"Dietë intensive",
 radioTitle:"Fitness Radio Live",radioText:"Electronic, house dhe groove për energji gjatë stërvitjes.",radioReady:"Gati për të luajtur",
 newsLabel:"FITNESS NEWS",newsTitle:"Lajmet e fundit",refresh:"Rifresko",follow:"NA NDIQ",rights:"Të gjitha të drejtat e rezervuara.",
 disclaimer:"Përmbajtja është informative dhe nuk zëvendëson këshillën mjekësore.",cookieText:"Kjo faqe përdor cookies për funksionim dhe matje.",accept:"Prano"
},
de:{
 navWorkouts:"Workouts",navNutrition:"Ernährung",navCalculators:"Rechner",navNews:"News",navRadio:"Live Radio",
 eyebrow:"DISZIPLIN • KRAFT • RESULTATE",heroLine1:"BAUE",heroLine2:"DEINE STÄRKSTE VERSION",
 heroText:"Training, Ernährung und praktische Tools für Menschen, die echte Ergebnisse wollen.",
 startTraining:"Training starten",listenRadio:"Radio hören",freePlans:"Kostenlose Pläne",threeLanguages:"3 Sprachen",mobileReady:"Mobil optimiert",
 ageStrong:"Stark in jedem Alter",radioEnergy:"Energie fürs Training",trainingZone:"TRAININGSZONE",workoutsTitle:"Wähle dein Programm",
 checkBody:"Körper prüfen →",strength:"Kraft & Muskeln",strengthText:"Strukturierter Plan für Muskelaufbau und konstanten Fortschritt.",
 fatLoss:"Fettverbrennung",fatLossText:"Cardio und Krafttraining für eine athletische Form.",homeWorkout:"Home Workout",
 homeWorkoutText:"Effektive Einheiten mit wenig oder ohne Equipment.",nutritionLabel:"ERNÄHRUNG",nutritionTitle:"Essen für Leistung",
 nutritionText:"Genug Protein, einfache Mahlzeiten und Kalorienkontrolle — ohne Extremdiäten.",
 proteinMeals:"Proteinreiche Mahlzeiten",familyFood:"Praktisch für Familien",fatLossMeals:"Ideen zum Fettabbau",
 quote:"Der Körper entsteht nicht an einem perfekten Tag, sondern durch hunderte gute Entscheidungen.",toolsLabel:"PRAKTISCHE TOOLS",
 calculatorsTitle:"Deine Rechner",height:"Größe (cm)",weight:"Gewicht (kg)",calculate:"Berechnen",calories:"Kalorien",age:"Alter",
 protein:"Protein",goal:"Ziel",health:"Gesundheit & Fitness",muscle:"Muskelaufbau",diet:"Intensive Diät",
 radioTitle:"Fitness Radio Live",radioText:"Electronic, House und Groove für Energie beim Training.",radioReady:"Bereit zum Abspielen",
 newsLabel:"FITNESS NEWS",newsTitle:"Aktuelle Meldungen",refresh:"Aktualisieren",follow:"FOLGE UNS",rights:"Alle Rechte vorbehalten.",
 disclaimer:"Die Inhalte sind informativ und ersetzen keine medizinische Beratung.",cookieText:"Diese Website verwendet Cookies für Funktion und Messung.",accept:"Akzeptieren"
},
en:{
 navWorkouts:"Workouts",navNutrition:"Nutrition",navCalculators:"Calculators",navNews:"News",navRadio:"Live Radio",
 eyebrow:"DISCIPLINE • POWER • RESULTS",heroLine1:"BUILD",heroLine2:"YOUR STRONGEST VERSION",
 heroText:"Training, nutrition and practical tools for people who want real results.",
 startTraining:"Start training",listenRadio:"Listen to radio",freePlans:"Free plans",threeLanguages:"3 languages",mobileReady:"Mobile ready",
 ageStrong:"Strong at every age",radioEnergy:"Energy for training",trainingZone:"TRAINING ZONE",workoutsTitle:"Choose your program",
 checkBody:"Check your body →",strength:"Strength & Muscle",strengthText:"A structured plan for muscle growth and consistent progress.",
 fatLoss:"Fat loss",fatLossText:"A mix of cardio and strength training for an athletic body.",homeWorkout:"Home workout",
 homeWorkoutText:"Effective sessions with little or no equipment, wherever you are.",nutritionLabel:"NUTRITION",nutritionTitle:"Eat for performance",
 nutritionText:"Enough protein, simple meals and calorie control — without extreme diets.",
 proteinMeals:"High-protein meals",familyFood:"Practical family food",fatLossMeals:"Fat-loss meal ideas",
 quote:"Your body is not built by one perfect day, but by hundreds of good choices.",toolsLabel:"PRACTICAL TOOLS",
 calculatorsTitle:"Your calculators",height:"Height (cm)",weight:"Weight (kg)",calculate:"Calculate",calories:"Calories",age:"Age",
 protein:"Protein",goal:"Goal",health:"Health & fitness",muscle:"Muscle gain",diet:"Intensive diet",
 radioTitle:"Fitness Radio Live",radioText:"Electronic, house and groove for training energy.",radioReady:"Ready to play",
 newsLabel:"FITNESS NEWS",newsTitle:"Latest news",refresh:"Refresh",follow:"FOLLOW US",rights:"All rights reserved.",
 disclaimer:"Content is informational and does not replace medical advice.",cookieText:"This website uses cookies for function and measurement.",accept:"Accept"
}};

let currentLang=localStorage.getItem("nkLang")||"sq";

function setLang(lang){
 currentLang=T[lang]?lang:"en";
 localStorage.setItem("nkLang",currentLang);
 document.documentElement.lang=currentLang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{
   const k=el.dataset.i18n;
   if(T[currentLang][k]) el.textContent=T[currentLang][k];
 });
 document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===currentLang));
 loadNews();
}

async function detectLanguage(){
 if(localStorage.getItem("nkLang")) return setLang(currentLang);
 try{
   const r=await fetch("https://ipwho.is/");
   const d=await r.json();
   const c=d.country_code;
   if(["AL","XK"].includes(c)) return setLang("sq");
   if(["DE","AT","CH"].includes(c)) return setLang("de");
 }catch(e){}
 const n=(navigator.language||"en").toLowerCase();
 setLang(n.startsWith("sq")?"sq":n.startsWith("de")?"de":"en");
}

document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
const menuBtn=document.getElementById("menuBtn"),mobileNav=document.getElementById("mobileNav");
menuBtn.addEventListener("click",()=>mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));

function calculateBMI(){
 const h=+document.getElementById("bmiHeight").value/100,w=+document.getElementById("bmiWeight").value;
 if(!h||!w)return;
 const bmi=(w/(h*h)).toFixed(1);
 const label=bmi<18.5?"Low":bmi<25?"Normal":bmi<30?"High":"Very high";
 document.getElementById("bmiResult").textContent=`BMI ${bmi} • ${label}`;
}
function calculateCalories(){
 const a=+document.getElementById("calAge").value,w=+document.getElementById("calWeight").value,h=+document.getElementById("calHeight").value;
 if(!a||!w||!h)return;
 const maintenance=Math.round((10*w+6.25*h-5*a+5)*1.55);
 document.getElementById("calResult").textContent=`≈ ${maintenance} kcal / day`;
}
function calculateProtein(){
 const w=+document.getElementById("proteinWeight").value,f=+document.getElementById("proteinGoal").value;
 if(!w)return;
 document.getElementById("proteinResult").textContent=`≈ ${Math.round(w*f)} g / day`;
}

const audio=document.getElementById("fitnessRadio"),radioBtn=document.getElementById("radioBtn"),playIcon=document.getElementById("playIcon"),radioStatus=document.getElementById("radioStatus");
radioBtn.addEventListener("click",async()=>{
 try{
  if(audio.paused){await audio.play();playIcon.textContent="Ⅱ";radioStatus.textContent="Beat Blender • LIVE";}
  else{audio.pause();playIcon.textContent="▶";radioStatus.textContent=T[currentLang].radioReady;}
 }catch(e){radioStatus.textContent="Stream unavailable — try again";}
});
document.getElementById("volume").addEventListener("input",e=>audio.volume=e.target.value);

const feeds={
 sq:"fitness nutrition exercise when:7d",
 de:"Fitness Ernährung Training when:7d",
 en:"fitness nutrition exercise when:7d"
};
async function loadNews(){
 const grid=document.getElementById("newsGrid");
 grid.innerHTML='<article class="card news-card skeleton"></article><article class="card news-card skeleton"></article><article class="card news-card skeleton"></article>';
 const q=encodeURIComponent(feeds[currentLang]);
 const hl=currentLang==="de"?"de":currentLang==="sq"?"en":"en-US";
 const rss=`https://news.google.com/rss/search?q=${q}&hl=${hl}`;
 const api=`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;
 try{
  const r=await fetch(api),d=await r.json();
  if(!d.items?.length)throw new Error();
  grid.innerHTML=d.items.slice(0,3).map(x=>`<article class="card news-card"><time>${new Date(x.pubDate).toLocaleDateString()}</time><h3>${escapeHTML(x.title)}</h3><a href="${x.link}" target="_blank" rel="noopener">Read more →</a></article>`).join("");
 }catch(e){
  grid.innerHTML=[
   ["Training consistency","Small weekly progress beats occasional extreme effort."],
   ["Protein and recovery","Balanced meals and enough sleep support muscle recovery."],
   ["Movement every day","Walking, strength work and mobility all contribute to health."]
  ].map(x=>`<article class="card news-card"><time>NKBEASTS</time><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("");
 }
}
function escapeHTML(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
document.getElementById("refreshNews").addEventListener("click",loadNews);

document.getElementById("year").textContent=new Date().getFullYear();
const cookie=document.getElementById("cookieBanner");
if(!localStorage.getItem("nkCookies"))cookie.style.display="flex";
document.getElementById("acceptCookies").addEventListener("click",()=>{localStorage.setItem("nkCookies","yes");cookie.style.display="none"});
detectLanguage();
