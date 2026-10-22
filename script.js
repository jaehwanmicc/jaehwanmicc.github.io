const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
function closeMenu() {
  navigation?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation?.classList.toggle('open', !expanded);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
const desktopMedia = window.matchMedia('(min-width: 641px)');
desktopMedia.addEventListener('change', event => { if (event.matches) closeMenu(); });

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const sections = [...document.querySelectorAll('#about, #journey, #research, #honors, #talks, #publications')];
const navLinks = [...(navigation?.querySelectorAll('a') || [])];
let ticking = false;
function updateActiveLink() {
  let current = 'about';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'publications';
  navLinks.forEach(link => {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateActiveLink); ticking = true; }
}, { passive: true });
window.addEventListener('load', updateActiveLink);
updateActiveLink();
