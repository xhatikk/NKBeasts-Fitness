
document.getElementById('menuBtn')?.addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
const cb=document.getElementById('cookieBanner'); if(localStorage.getItem('nk-cookie-choice')) cb?.classList.add('hidden');
document.getElementById('cookieAccept')?.addEventListener('click',()=>{localStorage.setItem('nk-cookie-choice','accepted');cb.classList.add('hidden')});
document.getElementById('cookieReject')?.addEventListener('click',()=>{localStorage.setItem('nk-cookie-choice','necessary');cb.classList.add('hidden')});
const filterWrap=document.querySelector('[data-filter-wrap]');if(filterWrap){filterWrap.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;filterWrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;document.querySelectorAll('[data-category]').forEach(x=>x.style.display=(f==='all'||x.dataset.category===f)?'':'none')})}
