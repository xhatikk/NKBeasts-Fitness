
const langBtn=document.querySelector('[data-lang]');
const current=document.documentElement.lang||'en';
if(langBtn){langBtn.addEventListener('click',()=>{const target=current==='de'?'../index.html':'../de/index.html';location.href=target;});}
const c=document.getElementById('cookie');if(c&&localStorage.getItem('cookie-ok'))c.classList.add('hidden');
document.querySelector('[data-cookie-ok]')?.addEventListener('click',()=>{localStorage.setItem('cookie-ok','1');c.classList.add('hidden')});
