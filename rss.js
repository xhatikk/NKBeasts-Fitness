(() => {
  const grid=document.getElementById('newsGrid'), refresh=document.getElementById('refreshNews');
  if(!grid) return;
  const fallback=[
    {title:'Strength training supports healthy ageing',source:'NKBEASTS',link:'#workouts',image:'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=82'},
    {title:'How much protein do you need each day?',source:'NKBEASTS',link:'#nutrition',image:'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=82'},
    {title:'Simple habits for better fitness recovery',source:'NKBEASTS',link:'#library',image:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=82'}
  ];
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function draw(items){
    grid.innerHTML=items.slice(0,6).map(x=>`<article class="news-card" style="--bg:url('${esc(x.image||fallback[0].image)}')"><div><small>${esc(x.source||'Fitness')}</small><h3>${esc(x.title)}</h3><a href="${esc(x.link||'#')}" target="_blank" rel="noopener">Read more →</a></div></article>`).join('');
  }
  async function load(){
    grid.innerHTML='<p class="news-loading">Loading…</p>';
    try{
      const lang=window.currentLang||localStorage.getItem('nk-lang')||'sq';
      const response=await fetch(`/api/rss?lang=${encodeURIComponent(lang)}`,{cache:'no-store'});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const data=await response.json();
      draw(Array.isArray(data.items)&&data.items.length?data.items:fallback);
    }catch(err){ console.warn('RSS error:',err); draw(fallback); }
  }
  refresh?.addEventListener('click',load);
  window.addEventListener('nk-language-change',load);
  load();
})();
