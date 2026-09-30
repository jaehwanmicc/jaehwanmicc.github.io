const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("open", !expanded);
});
navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}));

const newsToggle = document.querySelector("#news-toggle");
newsToggle?.addEventListener("click", () => {
  const expanded = newsToggle.getAttribute("aria-expanded") === "true";
  document.querySelectorAll(".news-older").forEach((item) => { item.hidden = expanded; });
  newsToggle.setAttribute("aria-expanded", String(!expanded));
  newsToggle.innerHTML = expanded ? 'Show earlier news <span aria-hidden="true">↓</span>' : 'Show less <span aria-hidden="true">↑</span>';
});

document.querySelector("#year").textContent = new Date().getFullYear();

const navSections = [...document.querySelectorAll("#about, #news, #publications, #research, #education, #contact")];
function updateActiveLink() {
  let current = "about";
  for (const section of navSections) {
    if (section.getBoundingClientRect().top <= 150) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "contact";
  navigation?.querySelectorAll("a").forEach((link) => link.classList.toggle("active", link.hash === "#" + current));
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);
