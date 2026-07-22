const audio=document.getElementById("radioAudio"),toggle=document.getElementById("radioToggle"),status=document.getElementById("radioStatus");
toggle.onclick=async()=>{
  if(audio.paused){
    try{await audio.play();toggle.textContent="Ⅱ";status.textContent="LIVE";}catch(e){status.textContent="Stream unavailable";}
  }else{audio.pause();toggle.textContent="▶";status.textContent=i18n[currentLang].radioReady}
};
document.getElementById("radioVolume").oninput=e=>audio.volume=e.target.value;
