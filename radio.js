(() => {
  const audio=document.getElementById('radioAudio'), playBtn=document.getElementById('radioPlay');
  const status=document.getElementById('radioStatus'), name=document.getElementById('radioName');
  const wave=document.querySelector('.wave'), genres=[...document.querySelectorAll('.genre')];
  if (!audio || !playBtn) return;
  audio.crossOrigin='anonymous';
  const setStatus=(text,live=false)=>{ if(status) status.textContent=text; playBtn.textContent=live?'Ⅱ':'▶'; wave?.classList.toggle('live',live); };
  async function start(){
    try { setStatus('CONNECTING…'); await audio.play(); setStatus('LIVE',true); }
    catch(err){ setStatus('STREAM ERROR'); console.warn('Radio error:',err); }
  }
  function stop(){ audio.pause(); setStatus('READY'); }
  playBtn.addEventListener('click',()=>audio.paused?start():stop());
  genres.forEach(btn=>btn.addEventListener('click',async()=>{
    const wasPlaying=!audio.paused;
    genres.forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    if(name) name.textContent=btn.dataset.name||btn.textContent.trim();
    audio.pause(); audio.src=btn.dataset.url||''; audio.load();
    localStorage.setItem('nk-radio',btn.dataset.name||'');
    if(wasPlaying) await start(); else setStatus('READY');
  }));
  const saved=localStorage.getItem('nk-radio');
  const first=genres.find(x=>x.dataset.name===saved)||genres[0];
  if(first){ first.classList.add('active'); if(name) name.textContent=first.dataset.name; audio.src=first.dataset.url; audio.load(); }
  audio.addEventListener('playing',()=>setStatus('LIVE',true));
  audio.addEventListener('waiting',()=>setStatus('BUFFERING…'));
  audio.addEventListener('error',()=>setStatus('STREAM ERROR'));
})();
