document.querySelectorAll(".calc-tab").forEach(tab=>tab.onclick=()=>{
  document.querySelectorAll(".calc-tab,.calc-panel").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active"); document.getElementById(tab.dataset.target).classList.add("active");
});

const n=id=>Number(document.getElementById(id).value)||0;
document.getElementById("bmiBtn").onclick=()=>{
  const bmi=n("bmiWeight")/Math.pow(n("bmiHeight")/100,2);
  document.getElementById("bmiValue").textContent=bmi.toFixed(1);
  const labels={
    sq:["Nën peshë","Peshë normale","Mbi peshën normale","Obezitet"],
    de:["Untergewicht","Normalgewicht","Übergewicht","Adipositas"],
    en:["Underweight","Normal weight","Overweight","Obesity"]
  };
  document.getElementById("bmiLabel").textContent=labels[currentLang][bmi<18.5?0:bmi<25?1:bmi<30?2:3];
};
document.getElementById("tdeeBtn").onclick=()=>{
  const g=document.getElementById("tdeeGender").value;
  const bmr=10*n("tdeeWeight")+6.25*n("tdeeHeight")-5*n("tdeeAge")+(g==="male"?5:-161);
  const tdee=Math.round(bmr*Number(document.getElementById("tdeeActivity").value));
  document.getElementById("tdeeValue").textContent=tdee;
};
document.getElementById("proteinBtn").onclick=()=>{
  const grams=Math.round(n("proteinWeight")*Number(document.getElementById("proteinGoal").value));
  document.getElementById("proteinValue").textContent=grams+" g";
};
document.getElementById("waterBtn").onclick=()=>{
  const liters=n("waterWeight")*.035+n("waterTraining")/30*.35;
  document.getElementById("waterValue").textContent=liters.toFixed(1)+" L";
};
