const words = document.querySelectorAll('.cutout');

words.forEach((word, index) => {
  const line = word.closest('.line');
  const lineDelay = Number(line?.dataset.delay || 0);
  const randomRotation = (Math.random() * 7 - 3.5).toFixed(2);
  const randomNudge = Math.floor(Math.random() * 18);

  word.style.setProperty('--r', `${randomRotation}deg`);
  word.style.setProperty('--delay', lineDelay);
  word.style.setProperty('--word', randomNudge);
});

const lightboxes = Array.from(document.querySelectorAll('.photo-lightbox'));

if (lightboxes.length) {
  const ids = new Set(lightboxes.map((lightbox) => lightbox.id));

  document.addEventListener('keydown', (event) => {
    const activeId = window.location.hash.slice(1);

    if (!ids.has(activeId)) {
      return;
    }

    const activeLightbox = document.getElementById(activeId);

    if (event.key === 'ArrowLeft') {
      window.location.hash = activeLightbox.dataset.prev;
      event.preventDefault();
    }

    if (event.key === 'ArrowRight') {
      window.location.hash = activeLightbox.dataset.next;
      event.preventDefault();
    }

    if (event.key === 'Escape') {
      window.location.hash = 'gallery';
      event.preventDefault();
    }
  });
}

const flashlightPoems = document.querySelectorAll('.poem-page:has(.flashlight-poem-body)');

flashlightPoems.forEach((page) => {
  const text = page.querySelector('.flashlight-text');

  const setFlashlightPosition = (clientX, clientY) => {
    const pageRect = page.getBoundingClientRect();
    const pageX = ((clientX - pageRect.left) / pageRect.width) * 100;
    const pageY = ((clientY - pageRect.top) / pageRect.height) * 100;

    page.style.setProperty('--flashlight-x', `${Math.min(100, Math.max(0, pageX))}%`);
    page.style.setProperty('--flashlight-y', `${Math.min(100, Math.max(0, pageY))}%`);
    page.classList.add('is-flashlight-active');

    if (text) {
      const textRect = text.getBoundingClientRect();
      const textX = ((clientX - textRect.left) / textRect.width) * 100;
      const textY = ((clientY - textRect.top) / textRect.height) * 100;

      text.style.setProperty('--flashlight-x', `${Math.min(100, Math.max(0, textX))}%`);
      text.style.setProperty('--flashlight-y', `${Math.min(100, Math.max(0, textY))}%`);
    }
  };

  const clearFlashlight = () => {
    page.classList.remove('is-flashlight-active');
  };

  page.addEventListener('pointermove', (event) => {
    setFlashlightPosition(event.clientX, event.clientY);
  });

  page.addEventListener('pointerenter', (event) => {
    setFlashlightPosition(event.clientX, event.clientY);
  });

  page.addEventListener('pointerleave', clearFlashlight);
  page.addEventListener('pointercancel', clearFlashlight);

  page.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];

    if (touch) {
      setFlashlightPosition(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  page.addEventListener('touchend', clearFlashlight);
  page.addEventListener('touchcancel', clearFlashlight);
});

const breathWords = document.querySelectorAll('.breath-poem p');

breathWords.forEach((line) => {
  const words = line.textContent.trim().split(/\s+/);

  line.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    const duration = (8.5 + Math.random() * 4.5).toFixed(2);
    const delay = (Math.random() * -duration).toFixed(2);
    const scale = (1.06 + Math.random() * 0.06).toFixed(3);

    span.className = 'breath-word';
    span.textContent = word;
    span.style.setProperty('--breath-duration', `${duration}s`);
    span.style.setProperty('--breath-delay', `${delay}s`);
    span.style.setProperty('--breath-scale', scale);

    line.appendChild(span);
  });
});

const holdPoems = document.querySelectorAll('.hold-poem');

holdPoems.forEach((poem) => {
  const lines = Array.from(poem.querySelectorAll('p'));
  const originals = lines.map((line) => line.textContent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  lines.forEach((line) => {
    line.textContent = '';
  });

  const wait = (ms) => new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

  const typeLine = async (line, text) => {
    for (let index = 1; index <= text.length; index += 1) {
      line.textContent = text.slice(0, index);
      await wait(34);
    }
  };

  const eraseLine = async (line) => {
    while (line.textContent.length) {
      line.textContent = line.textContent.slice(0, -1);
      await wait(24);
    }
  };

  const runTypingLoop = async () => {
    while (true) {
      for (let index = 0; index < lines.length; index += 1) {
        await typeLine(lines[index], originals[index]);
        await wait(120);
      }

      await wait(2800);

      for (let index = lines.length - 1; index >= 0; index -= 1) {
        await eraseLine(lines[index]);
        await wait(70);
      }

      await wait(800);
    }
  };

  runTypingLoop();
});

const poemEntries = Array.from(document.querySelectorAll('.poems-index-stage .poem-index-entry'));
const poemLinks = Array.from(document.querySelectorAll('[data-poem-link]'));

if (poemEntries.length && poemLinks.length) {
  const poems = poemEntries.map((entry) => ({
    id: entry.id,
    title: entry.querySelector('.poem-header h1')?.textContent?.trim() || entry.id,
  }));

  const setActivePoem = (id) => {
    const activeIndex = Math.max(0, poems.findIndex((poem) => poem.id === id));
    const activePoem = poems[activeIndex];

    poemLinks.forEach((link) => {
      const isActive = link.dataset.poemLink === activePoem.id;

      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  setActivePoem(poems[0].id);

  if ('IntersectionObserver' in window) {
    const visiblePoems = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visiblePoems.set(entry.target.id, entry.intersectionRatio);
        } else {
          visiblePoems.delete(entry.target.id);
        }
      });

      const active = Array.from(visiblePoems.entries())
        .sort((a, b) => b[1] - a[1])[0];

      if (active) {
        setActivePoem(active[0]);
      }
    }, {
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: '-18% 0px -42%',
    });

    poemEntries.forEach((entry) => observer.observe(entry));
  }
}
