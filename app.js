const cookieBanner = document.getElementById('cookie');
if (cookieBanner && localStorage.getItem('cookie-ok') === '1') {
  cookieBanner.classList.add('hidden');
}
document.querySelector('[data-cookie-ok]')?.addEventListener('click', () => {
  localStorage.setItem('cookie-ok', '1');
  cookieBanner?.classList.add('hidden');
});
