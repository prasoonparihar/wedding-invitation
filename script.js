/**
 * ==========================================================
 * WEDDING INVITATION — JAVASCRIPT
 * Prasoon & Navya • 27–31 January 2027 (Deoghar & Dhanbad)
 * & Grand Reception: 6 February 2027 (Ranchi)
 *
 * Features:
 *  1. Authentic Sacred Bilva Patra & Indian Wedding Flowers (NO HEARTS)
 *  2. Cinematic 3D Envelope & Lord Ganesha Reveal Gate
 *  3. Interactive "Scratch to Reveal" Three-Card Grid (Canvas Engine)
 *  4. Shiva-Parvati Divine Actions (Bel Patra Shower & Mandir Ghanta)
 *  5. Fullscreen Lagna Patrika Viewer
 *  6. Live Countdown Timer to 31st January 2027
 *  7. Calendar Integration (Google Calendar & .ics)
 *  8. Venue Copy Address
 *  9. Share Invitation via WhatsApp / Web Share
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Authentic Sacred Bel Patra, Marigold & Rose Petals Canvas
  initPetalsCanvas();

  // 2. Cinematic Envelope & Ganesha Reveal Gate
  initCinematicGate();

  // 3. Interactive Scratch-to-Reveal Cards (Date, Time, Venue)
  initScratchCards();

  // 4. Shiva-Parvati Divine Actions (Bel Patra Shower & Mandir Ghanta)
  initDivineActions();

  // 5. Lagna Patrika Fullscreen Viewer
  initLeavesViewer();

  // 6. Wedding Countdown Timer
  initCountdownTimer();

  // 7. Calendar Integration (.ics & Google Calendar)
  initCalendarActions();

  // 8. Venue Address Copy
  initVenueActions();

  // 9. Share Invitation
  initShare();
});

/* ==========================================================
   1. AUTHENTIC SACRED BEL PATRA & INDIAN WEDDING FLOWERS (NO HEARTS)
   ========================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const TOTAL_PARTICLES = 26; // Elegant density

  // Particle types: 'belpatra', 'marigold', 'rose_petal', 'jasmine', 'gold_star'
  const PARTICLE_TYPES = ['belpatra', 'marigold', 'rose_petal', 'jasmine', 'gold_star'];

  function createParticle(w, h, randomizeY = false, extraSpeed = 0) {
    const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
    let size;
    if (type === 'belpatra') size = Math.random() * 12 + 15; // Trifoliate 3-leaf
    else if (type === 'marigold') size = Math.random() * 10 + 13; // Round ruffled flower
    else if (type === 'rose_petal') size = Math.random() * 8 + 11; // Single organic petal (NO HEART)
    else if (type === 'jasmine') size = Math.random() * 7 + 10; // White star blossom
    else size = Math.random() * 5 + 4; // Gold star dust

    return {
      type: type,
      x: Math.random() * w,
      y: randomizeY ? Math.random() * h : -35,
      size: size,
      speedX: (Math.random() * 1.6 - 0.8),
      speedY: (Math.random() * 1.2 + 0.8) + extraSpeed,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2.2 - 1.1,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: Math.random() * 0.025 + 0.015,
      alpha: Math.random() * 0.25 + 0.75
    };
  }

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    particles.push(createParticle(width, height, true, 0));
  }

  // 1. TRIFOLIATE BEL PATRA (Sacred 3-lobed Bilva leaf of Lord Shiva)
  function drawBelPatra(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;

    function drawLeaflet(w, h, rot) {
      c.save();
      c.rotate(rot);
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(w, -h * 0.45, 0, -h);
      c.quadraticCurveTo(-w, -h * 0.45, 0, 0);
      
      const grad = c.createLinearGradient(-w, 0, w, -h);
      grad.addColorStop(0, '#1b5e20');
      grad.addColorStop(0.5, '#2e7d32');
      grad.addColorStop(1, '#43a047');
      c.fillStyle = grad;
      c.fill();

      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -h * 0.88);
      c.strokeStyle = '#81c784';
      c.lineWidth = Math.max(0.6, size * 0.04);
      c.stroke();
      c.restore();
    }

    c.beginPath();
    c.moveTo(0, size * 0.45);
    c.lineTo(0, 0);
    c.strokeStyle = '#1b5e20';
    c.lineWidth = Math.max(1, size * 0.08);
    c.stroke();

    drawLeaflet(size * 0.32, size * 0.75, 0);
    drawLeaflet(size * 0.28, size * 0.62, -0.72);
    drawLeaflet(size * 0.28, size * 0.62, 0.72);

    c.restore();
  }

  // 2. GENDA PHOOL (Fresh Marigold Flower - Layered Saffron & Yellow)
  function drawMarigold(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;
    const r = size * 0.52;
    const petalsCount = 12;

    for (let i = 0; i < petalsCount; i++) {
      const angle = (i * Math.PI * 2) / petalsCount;
      const px = Math.cos(angle) * (r * 0.62);
      const py = Math.sin(angle) * (r * 0.62);
      c.beginPath();
      c.arc(px, py, r * 0.42, 0, Math.PI * 2);
      c.fillStyle = (i % 2 === 0) ? '#ff8f00' : '#ffa000';
      c.fill();
    }

    for (let i = 0; i < petalsCount; i++) {
      const angle = ((i + 0.5) * Math.PI * 2) / petalsCount;
      const px = Math.cos(angle) * (r * 0.35);
      const py = Math.sin(angle) * (r * 0.35);
      c.beginPath();
      c.arc(px, py, r * 0.3, 0, Math.PI * 2);
      c.fillStyle = '#ffb300';
      c.fill();
    }

    c.beginPath();
    c.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    c.fillStyle = '#e65100';
    c.fill();

    c.restore();
  }

  // 3. GULAB PANKHURI (Natural Curved Rose Petal - Organic, Asymmetric, NO HEART)
  function drawRosePetal(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;
    c.beginPath();
    c.moveTo(0, size * 0.42);
    c.bezierCurveTo(size * 0.46, size * 0.25, size * 0.42, -size * 0.35, 0, -size * 0.52);
    c.bezierCurveTo(-size * 0.48, -size * 0.3, -size * 0.4, size * 0.28, 0, size * 0.42);

    const grad = c.createRadialGradient(0, -size * 0.08, 0, 0, 0, size * 0.55);
    grad.addColorStop(0, '#e53935');
    grad.addColorStop(0.65, '#c2185b');
    grad.addColorStop(1, '#880e4f');
    c.fillStyle = grad;
    c.fill();

    c.restore();
  }

  // 4. JASMINE / MOGRA (Ivory 5-Petal Star Flower)
  function drawJasmine(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;
    const r = size * 0.48;
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      c.save();
      c.rotate(angle);
      c.beginPath();
      c.ellipse(0, -r * 0.52, r * 0.26, r * 0.48, 0, 0, Math.PI * 2);
      c.fillStyle = '#fffdf7';
      c.shadowBlur = 3;
      c.shadowColor = 'rgba(200, 162, 103, 0.4)';
      c.fill();
      c.restore();
    }
    c.beginPath();
    c.arc(0, 0, r * 0.2, 0, Math.PI * 2);
    c.fillStyle = '#fbc02d';
    c.fill();
    c.restore();
  }

  // 5. GOLD SHIMMER STAR (Auspicious 4-pointed diamond star)
  function drawGoldStar(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;
    c.beginPath();
    c.moveTo(0, -size);
    c.quadraticCurveTo(0, 0, size, 0);
    c.quadraticCurveTo(0, 0, 0, size);
    c.quadraticCurveTo(0, 0, -size, 0);
    c.quadraticCurveTo(0, 0, 0, -size);
    c.fillStyle = '#ffd54f';
    c.shadowBlur = 8;
    c.shadowColor = '#c8a267';
    c.fill();
    c.restore();
  }

  function renderParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.type === 'belpatra') {
      drawBelPatra(ctx, p.size, p.alpha);
    } else if (p.type === 'marigold') {
      drawMarigold(ctx, p.size, p.alpha);
    } else if (p.type === 'rose_petal') {
      drawRosePetal(ctx, p.size, p.alpha);
    } else if (p.type === 'jasmine') {
      drawJasmine(ctx, p.size, p.alpha);
    } else {
      drawGoldStar(ctx, p.size, p.alpha);
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, idx) => {
      p.oscillation += p.oscSpeed;
      p.x += Math.sin(p.oscillation) * 1.1 + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 35) {
        particles[idx] = createParticle(width, height, false, 0);
      }
      if (p.x > width + 30) p.x = -30;
      if (p.x < -30) p.x = width + 30;

      renderParticle(p);
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Grand Celebratory Flower & Bel Patra Shower Burst (75+ particles)
  window.triggerFlowerShower = function() {
    for (let i = 0; i < 75; i++) {
      const p = createParticle(width, height, false, Math.random() * 2.5 + 1.2);
      p.y = Math.random() * (height * 0.45) - 40;
      p.speedX = Math.random() * 5 - 2.5;
      p.rotationSpeed = Math.random() * 4 - 2;
      particles.push(p);
    }

    setTimeout(() => {
      if (particles.length > 35) {
        particles.splice(TOTAL_PARTICLES, particles.length - TOTAL_PARTICLES);
      }
    }, 9000);
  };
}

/* ==========================================================
   2. CINEMATIC 3D ENVELOPE & GANESHA REVEAL GATE
   ========================================================== */
function initCinematicGate() {
  const gate = document.getElementById('cinematic-gate');
  const waxSeal = document.getElementById('wax-seal');
  const flap = document.getElementById('envelope-flap');
  const envelopeWrap = document.getElementById('envelope-3d-wrap');
  const envelopeCard = document.getElementById('envelope-card');
  const ganeshaAperture = document.getElementById('ganesha-aperture');
  const sparkleCanvas = document.getElementById('sparkle-canvas');

  // Ambient gold sparkles on gate
  let sCtx = null;
  let sparkles = [];
  if (sparkleCanvas) {
    sCtx = sparkleCanvas.getContext('2d');
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;

    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * sparkleCanvas.width,
        y: Math.random() * sparkleCanvas.height,
        r: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.8 + 0.3),
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function renderSparkles() {
      if (!gate || gate.style.display === 'none') return;
      sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
      sCtx.fillStyle = '#fbe285';

      sparkles.forEach(s => {
        s.y += s.speedY;
        if (s.y < 0) s.y = sparkleCanvas.height;
        sCtx.globalAlpha = s.alpha;
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sCtx.fill();
      });
      requestAnimationFrame(renderSparkles);
    }
    renderSparkles();
  }

  let hasOpened = false;

  function triggerOpenSequence() {
    if (hasOpened) return;
    hasOpened = true;

    // 1. Play Default Soundtrack (Ullam Paadum from 00:15)
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // 2. Step 1: Wax Seal Breaks with Shockwave & Temple Bell
    waxSeal.classList.add('breaking');
    if (window.weddingAudio && window.weddingAudio.playIndianTempleGhanta) {
      window.weddingAudio.playIndianTempleGhanta();
    }

    // 3. Step 2: 3D Flap Opens
    setTimeout(() => {
      flap.classList.add('open');
      envelopeCard.classList.add('opened');
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }
    }, 450);

    // 4. Step 3: Ganesha Aperture Expands & Shloka Fades In
    setTimeout(() => {
      envelopeWrap.classList.add('fading');
      ganeshaAperture.classList.add('active');
    }, 1600);

    // 5. Step 4: Gate Smoothly Fades out, Revealing Main Royal Invitation
    setTimeout(() => {
      document.body.classList.remove('envelope-active');
      gate.style.opacity = '0';
      gate.style.transition = 'opacity 1.4s ease';

      setTimeout(() => {
        gate.style.display = 'none';
      }, 1400);
    }, 5600);
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', triggerOpenSequence);
  }

  // Allow clicking anywhere on envelope to open
  if (envelopeCard) {
    envelopeCard.addEventListener('click', (e) => {
      triggerOpenSequence();
    });
  }

  // Allow tapping on Ganesha screen to immediately enter
  if (ganeshaAperture) {
    ganeshaAperture.addEventListener('click', () => {
      document.body.classList.remove('envelope-active');
      gate.style.opacity = '0';
      setTimeout(() => { gate.style.display = 'none'; }, 800);
    });
  }
}

/* ==========================================================
   3. "SCRATCH TO REVEAL" THREE-CARD GRID (CANVAS ENGINE)
   ========================================================== */
function initScratchCards() {
  const cards = [
    { canvasId: 'canvas-scratch-date', boxId: 'scratch-box-date' },
    { canvasId: 'canvas-scratch-time', boxId: 'scratch-box-time' },
    { canvasId: 'canvas-scratch-venue', boxId: 'scratch-box-venue' }
  ];

  cards.forEach(({ canvasId, boxId }) => {
    const canvas = document.getElementById(canvasId);
    const box = document.getElementById(boxId);
    if (!canvas || !box) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 280;
    canvas.height = rect.height || 230;

    let isScratching = false;
    let isRevealed = false;

    // Draw Royal Gold Metallic Foil with Shimmer & Emblem Text
    function drawGoldFoil() {
      ctx.globalCompositeOperation = 'source-over';
      
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#bf953f');
      grad.addColorStop(0.25, '#fcf6ba');
      grad.addColorStop(0.5, '#b38728');
      grad.addColorStop(0.75, '#fbf5b7');
      grad.addColorStop(1, '#aa771c');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold dust speckles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 30; i++) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Border and text inside gold foil
      ctx.strokeStyle = 'rgba(110, 11, 23, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      ctx.font = '700 13px Cinzel, serif';
      ctx.fillStyle = '#3a050b';
      ctx.textAlign = 'center';
      ctx.fillText('👑 SCRATCH TO REVEAL 👑', canvas.width / 2, canvas.height / 2 - 8);

      ctx.font = '500 11px Montserrat, sans-serif';
      ctx.fillStyle = '#5a121c';
      ctx.fillText('Rub with finger or mouse', canvas.width / 2, canvas.height / 2 + 14);
    }

    drawGoldFoil();

    function scratch(x, y) {
      if (isRevealed) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Check percentage scratched every few touches
      checkProgress();
    }

    function getCoords(e) {
      const b = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - b.left) * (canvas.width / b.width),
        y: (clientY - b.top) * (canvas.height / b.height)
      };
    }

    // Check progress
    let checkThrottle = 0;
    function checkProgress() {
      checkThrottle++;
      if (checkThrottle % 5 !== 0) return;

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        let transparentPixels = 0;
        const step = 32; // Fast sampling

        for (let i = 3; i < pixels.length; i += 4 * step) {
          if (pixels[i] < 128) {
            transparentPixels++;
          }
        }

        const totalSampled = pixels.length / (4 * step);
        const percentCleared = transparentPixels / totalSampled;

        if (percentCleared > 0.38) {
          revealCard();
        }
      } catch (err) {}
    }

    function revealCard() {
      if (isRevealed) return;
      isRevealed = true;
      box.classList.add('is-revealed');
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 600);
    }

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mouseup', () => { isScratching = false; });

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      if (!isScratching) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => { isScratching = false; });

    // Register auto-reveal hook
    canvas.revealCardDirect = revealCard;
  });

  // Reveal All Details Button
  const revealAllBtn = document.getElementById('btn-reveal-all');
  if (revealAllBtn) {
    revealAllBtn.addEventListener('click', () => {
      cards.forEach(({ canvasId }) => {
        const c = document.getElementById(canvasId);
        if (c && c.revealCardDirect) {
          c.revealCardDirect();
        }
      });
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }
    });
  }
}

/* ==========================================================
   4. SHIVA-PARVATI DIVINE ACTIONS (BEL PATRA SHOWER & MANDIR GHANTA)
   ========================================================== */
function initDivineActions() {
  const flowerBtn = document.getElementById('flower-shower-btn');
  const bellBtn = document.getElementById('temple-bell-btn');
  const bellIcon = document.getElementById('bell-swing-icon');

  if (flowerBtn) {
    flowerBtn.addEventListener('click', () => {
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }
      if (window.weddingAudio && window.weddingAudio.playTempleBell) {
        window.weddingAudio.playTempleBell();
      }

      const origText = flowerBtn.innerHTML;
      flowerBtn.innerHTML = '✨ Divine Bilva &amp; Flowers Showered! ✨';
      flowerBtn.classList.add('btn-blessed');
      setTimeout(() => {
        flowerBtn.innerHTML = origText;
        flowerBtn.classList.remove('btn-blessed');
      }, 2600);
    });
  }

  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      if (window.weddingAudio && window.weddingAudio.playIndianTempleGhanta) {
        window.weddingAudio.playIndianTempleGhanta();
      }

      if (bellIcon) {
        bellIcon.classList.remove('ghanta-swinging');
        void bellIcon.offsetWidth; // Force reflow
        bellIcon.classList.add('ghanta-swinging');
      }

      const origText = bellBtn.innerHTML;
      bellBtn.innerHTML = '🪔 Mandir Ghanta Naad Blessed! 🪔';
      bellBtn.classList.add('btn-blessed');
      setTimeout(() => {
        bellBtn.innerHTML = origText;
        bellBtn.classList.remove('btn-blessed');
      }, 3000);
    });
  }
}

/* ==========================================================
   5. LAGNA PATRIKA FULLSCREEN VIEWER
   ========================================================== */
function initLeavesViewer() {
  const viewBtns = document.querySelectorAll('.view-leaf-btn');
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCap) lightboxCap.innerHTML = `<strong>${title}</strong>`;
      if (lightbox) lightbox.classList.add('open');
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('open') && e.key === 'Escape') {
      lightbox.classList.remove('open');
    }
  });
}

/* ==========================================================
   6. WEDDING COUNTDOWN TIMER (2 DIGITS FOR DAYS)
   ========================================================== */
function initCountdownTimer() {
  // Wedding Date: 31st January 2027, 18:00:00 IST
  const targetDate = new Date('2027-01-31T18:00:00+05:30').getTime();

  const daysEl = document.getElementById('days-count');
  const hoursEl = document.getElementById('hours-count');
  const minsEl = document.getElementById('minutes-count');
  const secsEl = document.getElementById('seconds-count');

  function updateTimer() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================
   7. CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
   ========================================================== */
function initCalendarActions() {
  const gcalBtn = document.getElementById('add-to-calendar-btn');
  const icsBtn = document.getElementById('download-ics-btn');

  const eventData = {
    title: 'Wedding of Prasoon & Navya',
    description: 'With the divine blessings of Baba Baidyanath & Mata Parvati, you are cordially invited to celebrate the Wedding of Prasoon & Navya in Deoghar and Dhanbad, Jharkhand, followed by Reception in Ranchi.',
    location: 'The Wedding Bells, Baramuri, Bhuli Hirak Road, Near Asarfi Hospital, Jharudih, Dhanbad, Jharkhand – 826013',
    start: '20270131T123000Z', // 18:00 IST in UTC
    end: '20270131T200000Z'
  };

  if (gcalBtn) {
    gcalBtn.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.start}/${eventData.end}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (icsBtn) {
    icsBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Prasoon & Navya//Wedding Celebration//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${eventData.title}`,
        `DESCRIPTION:${eventData.description}`,
        `LOCATION:${eventData.location}`,
        `DTSTART:${eventData.start}`,
        `DTEND:${eventData.end}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Prasoon_Navya_Wedding.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ==========================================================
   8. VENUE ADDRESS COPY
   ========================================================== */
function initVenueActions() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const address = btn.getAttribute('data-address');
      if (!address) return;

      navigator.clipboard.writeText(address).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Address Copied!';
        btn.style.borderColor = '#10b981';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.borderColor = '';
        }, 2200);
      }).catch(() => {
        alert('Address: ' + address);
      });
    });
  });
}

/* ==========================================================
   9. SHARE INVITATION (WHATSAPP / WEB SHARE)
   ========================================================== */
function initShare() {
  const shareBtn = document.getElementById('share-card-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    const shareData = {
      title: 'Prasoon & Navya — Royal Wedding Celebrations 2027',
      text: 'With the divine blessings of Baba Baidyanath & Mata Parvati, you are cordially invited to celebrate the wedding of Prasoon & Navya (27–31 Jan 2027, Deoghar & Dhanbad, and Reception 6 Feb 2027, Ranchi).',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
        const origText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Invitation Link Copied!';
        setTimeout(() => {
          shareBtn.innerHTML = origText;
        }, 2500);
      }).catch(() => {
        prompt('Copy Wedding Invitation Link:', window.location.href);
      });
    }
  });
}
