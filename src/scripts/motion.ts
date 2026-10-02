const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasObserver = 'IntersectionObserver' in window;

function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 90;
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((child, index) => {
      child.style.setProperty('--reveal-delay', `${index * step}ms`);
    });
  });

  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!hasObserver) {
    items.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );
  items.forEach((item) => observer.observe(item));
}

/**
 * Writes a 0–1 scroll progress to `--p` on every `[data-progress]` element.
 * - `sticky`: progress through a tall section whose child is `position: sticky`.
 * - `center`: progress of the viewport's vertical center through the element.
 * - `top`: page scroll distance, as a fraction of `data-progress-distance` viewports.
 */
function initProgress() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-progress]')];
  if (!items.length) return;

  if (reducedMotion.matches || !hasObserver) {
    items.forEach((item) => item.style.setProperty('--p', '1'));
    return;
  }

  const visible = new Set<HTMLElement>();
  let frame = 0;

  const update = () => {
    frame = 0;
    const viewport = window.innerHeight;
    for (const item of visible) {
      const rect = item.getBoundingClientRect();
      let progress: number;
      switch (item.dataset.progress) {
        case 'center':
          progress = (viewport / 2 - rect.top) / Math.max(1, rect.height);
          break;
        case 'top':
          progress = window.scrollY / (viewport * (Number(item.dataset.progressDistance) || 0.6));
          break;
        default:
          progress = -rect.top / Math.max(1, rect.height - viewport);
      }
      item.style.setProperty('--p', Math.min(1, Math.max(0, progress)).toFixed(4));
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const item = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(item);
        else visible.delete(item);
      }
      schedule();
    },
    { rootMargin: '25% 0px 25% 0px' },
  );

  items.forEach((item) => observer.observe(item));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

/** Toggles `.is-playing` so looping scene animations only run while on screen. */
function initPlayWhenVisible() {
  const items = document.querySelectorAll<HTMLElement>('[data-play]');
  if (!hasObserver) {
    items.forEach((item) => item.classList.add('is-playing'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-playing', entry.isIntersecting);
    },
    { threshold: 0.3 },
  );
  items.forEach((item) => observer.observe(item));
}

function initCountUp() {
  const items = document.querySelectorAll<HTMLElement>('[data-count-to]');
  if (!items.length || reducedMotion.matches || !hasObserver) return;

  const format = new Intl.NumberFormat('en-US');

  const run = (item: HTMLElement) => {
    const target = Number(item.dataset.countTo);
    const decimals = Number(item.dataset.countDecimals) || 0;
    const suffix = item.dataset.countSuffix ?? '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(2, -10 * t);
      const value = target * (t === 1 ? 1 : eased);
      item.textContent =
        (decimals ? value.toFixed(decimals) : format.format(Math.round(value))) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );

  items.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals) || 0;
    item.textContent = (decimals ? (0).toFixed(decimals) : '0') + (item.dataset.countSuffix ?? '');
    observer.observe(item);
  });
}

function initSpotlight() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  if (!nav) return;
  const update = () => nav.toggleAttribute('data-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

initReveal();
initProgress();
initPlayWhenVisible();
initCountUp();
initSpotlight();
initNav();
