function initCarousel(el, config) {
  const track = el.querySelector('.carousel-track');
  const slides = el.querySelectorAll('.carousel-slide');
  const dots = el.querySelectorAll('.carousel-dot');
  const total = slides.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    const offset = config.initialOffset - config.slideStep * current;
    track.style.transform = `translateX(${offset}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  el.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
  el.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch/swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  if (config.autoplay) setInterval(() => goTo(current + 1), config.autoplay);
}

// Carrusel proceso: 68% width con peek lateral, step = 68% + 4% gap = 72%
const procesoCarousel = document.getElementById('proceso-carousel');
if (procesoCarousel) {
  initCarousel(procesoCarousel, { slideStep: 72, initialOffset: 16, autoplay: 4000 });
}


// Actualiza todos los links de Calendly con el mes y año actual
(function () {
  const links = document.querySelectorAll('a[href*="calendly.com"]');
  if (!links.length) return;

  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const currentMonth = `${now.getFullYear()}-${month}`;

  links.forEach(function (link) {
    const url = new URL(link.href);
    url.searchParams.set('month', currentMonth);
    link.href = url.toString();
  });
})();
