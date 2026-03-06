/* ============================================================
   Women's Day Animation — Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBlink();
  initLetterReveal();
  initFallingFlowers();
});

/* -------------------------------------------------------
   1. WOMAN BLINKING
   Randomly toggles the "eyes-open" image's opacity to
   reveal the "eyes-closed" image beneath it.
   ------------------------------------------------------- */
function initBlink() {
  const womanOpen = document.querySelector('.woman-open');
  if (!womanOpen) return;

  // Wait for the slide-in animation to finish
  const startDelay = 1300; // ms after page load

  function scheduleBlink() {
    // Random interval between blinks: 2–5 seconds
    const interval = 2000 + Math.random() * 3000;

    setTimeout(() => {
      // Close eyes
      womanOpen.style.opacity = '0';

      // Open eyes after 120-180ms
      const blinkDuration = 120 + Math.random() * 60;
      setTimeout(() => {
        womanOpen.style.opacity = '1';
        scheduleBlink();
      }, blinkDuration);
    }, interval);
  }

  setTimeout(scheduleBlink, startDelay);
}

/* -------------------------------------------------------
   2. LETTER-BY-LETTER TEXT REVEAL
   Wraps each character in a <span>, then staggers
   animation-delay so letters fade in one by one.
   ------------------------------------------------------- */
function initLetterReveal() {
  const textBlock = document.querySelector('.text-block');
  if (!textBlock) return;

  const lines = textBlock.querySelectorAll('.text-line');
  const baseDelay = 3500; // ms from page load
  const perLetterDelay = 35; // ms between each letter
  let totalLetterIndex = 0;

  lines.forEach((line) => {
    const text = line.textContent;
    line.textContent = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');

      if (char === ' ') {
        span.classList.add('letter-space');
        span.innerHTML = '&nbsp;';
      } else {
        span.classList.add('letter');
        span.textContent = char;
      }

      const delay = baseDelay + totalLetterIndex * perLetterDelay;
      span.style.animationDelay = delay + 'ms';
      line.appendChild(span);
      totalLetterIndex++;
    }
  });
}

/* -------------------------------------------------------
   3. FALLING FLOWERS
   Spawns multiple flower SVGs that fall & spin endlessly
   with varied sizes, speeds, and horizontal positions.
   ------------------------------------------------------- */
function initFallingFlowers() {
  const container = document.querySelector('.falling-flowers-container');
  if (!container) return;

  const flowerSources = [
    'assets/falling-flower-1.svg',
    'assets/falling-flower-2.svg'
  ];

  const flowerCount = 18;
  const startDelay = 4500; // ms from page load

  setTimeout(() => {
    for (let i = 0; i < flowerCount; i++) {
      createFallingFlower(container, flowerSources, i);
    }
  }, startDelay);
}

function createFallingFlower(container, sources, index) {
  const flower = document.createElement('div');
  flower.classList.add('falling-flower');

  const img = document.createElement('img');
  img.src = sources[index % sources.length];
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  flower.appendChild(img);

  // Random properties
  const size = 15 + Math.random() * 28;          // 15–43px
  const leftPos = Math.random() * 100;             // 0–100% of viewport width
  const fallDuration = 6 + Math.random() * 9;     // 6–15s
  const spinDuration = 3 + Math.random() * 5;     // 3–8s
  const initialDelay = Math.random() * 8;          // 0–8s stagger
  const startOpacity = 0.5 + Math.random() * 0.45; // 0.5–0.95

  flower.style.width = size + 'px';
  flower.style.height = size + 'px';
  flower.style.left = leftPos + '%';
  flower.style.opacity = startOpacity;

  // Fall animation on the wrapper div (translateY)
  flower.style.animation = `fallDown ${fallDuration}s linear ${initialDelay}s infinite`;

  // Spin animation on the inner img (rotate) — separate element avoids transform conflict
  img.style.animation = `spin ${spinDuration}s linear ${initialDelay}s infinite`;

  // Alternate spin direction for some flowers
  if (index % 3 === 0) {
    img.style.animationDirection = 'reverse';
  }

  container.appendChild(flower);
}
