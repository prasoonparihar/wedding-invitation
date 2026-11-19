/**
 * ==========================================================
 * ROYAL WEDDING INVITATION — JAVASCRIPT
 * Prasoon & Navya • 27–31 January 2027 & Reception 6 February 2027
 *
 * Core Modules:
 *  1. Authentic Sacred Bilva Patra (Bel Patra) & Indian Flower Shower (NO HEARTS)
 *  2. Cinematic 3D Envelope, Shockwave Seal Break & Ganesha Portal Reveal
 *  3. Interactive "Scratch to Reveal" 3-Card Engine (Canvas Gold Foil Scratch)
 *  4. Shiva-Parvati Divine Actions (Bel Patra / Flower Shower & Mandir Ghanta Naad)
 *  5. Lagna Patrika / Formal Cards Fullscreen Viewer
 *  6. Live Countdown Timer to 31st January 2027 (2 Digits for Days)
 *  7. Calendar Integration (.ics & Google Calendar)
 *  8. Venue Address Copying
 *  9. Share Invitation via WhatsApp / Web Share API
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Authentic Falling Bel Patra, Marigold & Rose Petals Canvas (NO HEARTS)
  initPetalsCanvas();

  // 2. Cinematic 3D Envelope & Ganesha Portal
  initCinematicGate();

  // 3. Interactive Scratch-to-Reveal 3-Card Engine
  initScratchCards();

  // 4. Shiva-Parvati Divine Actions (Bel Patra & Mandir Ghanta)
  initDivineActions();

  // 5. Formal Invitation Cards Fullscreen Viewer
  initLeavesViewer();

  // 6. Live Wedding Countdown Timer (2 digits for days)
  initCountdownTimer();

  // 7. Calendar Integration (Google Calendar & .ics)
  initCalendarActions();

  // 8. Venue Address Copy Actions
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
  const TOTAL_PARTICLES = 28; // Elegant royal ambiance

  const PARTICLE_TYPES = ['belpatra', 'marigold', 'rose_petal', 'jasmine', 'gold_star'];

  function createParticle(w, h, randomizeY = false, extraSpeed = 0, forceType = null) {
    const type = forceType || PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
    let size;
    if (type === 'belpatra') size = Math.random() * 12 + 15;
    else if (type === 'marigold') size = Math.random() * 10 + 13;
    else if (type === 'rose_petal') size = Math.random() * 8 + 12;
    else if (type === 'jasmine') size = Math.random() * 7 + 10;
    else size = Math.random() * 5 + 4;

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

  // TRIFOLIATE BEL PATRA (Sacred 3-lobed Bilva leaf of Lord Shiva)
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

      // Vein
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -h * 0.88);
      c.strokeStyle = '#81c784';
      c.lineWidth = Math.max(0.6, size * 0.04);
      c.stroke();
      c.restore();
    }

    // Leaf stalk
    c.beginPath();
    c.moveTo(0, size * 0.45);
    c.lineTo(0, 0);
    c.strokeStyle = '#1b5e20';
    c.lineWidth = Math.max(1, size * 0.08);
    c.stroke();

    // 3 Connected Sacred Leaflets
    drawLeaflet(size * 0.32, size * 0.75, 0);
    drawLeaflet(size * 0.28, size * 0.62, -0.72);
    drawLeaflet(size * 0.28, size * 0.62, 0.72);

    c.restore();
  }

  // GENDA PHOOL (Fresh Marigold Flower)
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

  // GULAB PANKHURI (Natural Curved Rose Petal - Organic, Strictly No Heart)
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

  // JASMINE / MOGRA (Ivory 5-Petal Star)
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

  // GOLD SHIMMER STAR (Auspicious 4-pointed diamond star)
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
    c.shadowColor = '#d4af37';
    c.fill();
    c.restore();
  }

  function renderParticle(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.type === 'belpatra') drawBelPatra(ctx, p.size, p.alpha);
    else if (p.type === 'marigold') drawMarigold(ctx, p.size, p.alpha);
    else if (p.type === 'rose_petal') drawRosePetal(ctx, p.size, p.alpha);
    else if (p.type === 'jasmine') drawJasmine(ctx, p.size, p.alpha);
    else drawGoldStar(ctx, p.size, p.alpha);

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

  // Grand Flower & Bel Patra Shower Burst
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

  // Rose Petal & Gold Sparkle Burst for Ganesha Reveal
  window.triggerRosePetalBurst = function() {
    for (let i = 0; i < 50; i++) {
      const p = createParticle(width, height, false, Math.random() * 2.8 + 1.4, (i % 2 === 0 ? 'rose_petal' : 'gold_star'));
      p.y = Math.random() * (height * 0.35);
      p.speedX = Math.random() * 6 - 3;
      particles.push(p);
    }
  };
}

/* ==========================================================
   2. CINEMATIC 3D ENVELOPE, SHOCKWAVE SEAL BREAK & GANESHA PORTAL
   ========================================================== */
function initCinematicGate() {
  const seal = document.getElementById('royal-wax-seal');
  const envelopeCard = document.getElementById('envelope-3d-card');
  const envelopeScene = document.getElementById('envelope-scene');
  const ganeshaPortal = document.getElementById('ganesha-portal-reveal');
  const continueBtn = document.getElementById('continue-invite-btn');
  const gate = document.getElementById('cinematic-gate');

  // Ambient Starlight Canvas
  initAmbientSparkles();

  let isOpening = false;

  function openEnvelopeSequence() {
    if (isOpening) return;
    isOpening = true;

    // 1. Play default music (Ullam Paadum - 2 States trimmed at 15s) immediately on user interaction
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // 2. Play acoustic temple bell chime
    if (window.weddingAudio && window.weddingAudio.playIndianTempleGhanta) {
      window.weddingAudio.playIndianTempleGhanta();
    }

    // 3. Stage 2: Break royal wax seal with shockwave
    if (seal) {
      seal.classList.add('breaking');
    }

    // 4. Stage 3: After 550ms, open 3D triangular flap & slide letter peek
    setTimeout(() => {
      if (envelopeCard) {
        envelopeCard.classList.add('flap-opened');
      }
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }
    }, 550);

    // 5. Stage 4: After 1700ms, reveal Lord Ganesha Portal with golden halos & rose petal shower
    setTimeout(() => {
      if (envelopeScene) {
        envelopeScene.style.opacity = '0';
        envelopeScene.style.transform = 'scale(1.15)';
        envelopeScene.style.pointerEvents = 'none';
      }
      if (ganeshaPortal) {
        ganeshaPortal.classList.add('active');
      }
      if (window.triggerRosePetalBurst) {
        window.triggerRosePetalBurst();
      }
    }, 1700);

    // 6. Auto-advance to main invitation after 6.5s if user hasn't clicked continue
    setTimeout(() => {
      enterMainInvitation();
    }, 6800);
  }

  function enterMainInvitation() {
    document.body.classList.remove('envelope-active');
    if (gate) {
      gate.style.opacity = '0';
      gate.style.transform = 'scale(1.05)';
      setTimeout(() => {
        gate.style.display = 'none';
      }, 1000);
    }
  }

  if (seal) seal.addEventListener('click', openEnvelopeSequence);
  if (envelopeCard) envelopeCard.addEventListener('click', openEnvelopeSequence);
  if (continueBtn) continueBtn.addEventListener('click', enterMainInvitation);
}

function initAmbientSparkles() {
  const canvas = document.getElementById('ambient-sparkles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  for (let i = 0; i < 45; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.008
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.alpha += s.speed;
      const opacity = (Math.sin(s.alpha) + 1) / 2;
      ctx.fillStyle = `rgba(255, 230, 160, ${opacity * 0.6})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(renderStars);
  }

  renderStars();
}

/* ==========================================================
   3. INTERACTIVE "SCRATCH TO REVEAL" THREE-CARD ENGINE
   ========================================================== */
function initScratchCards() {
  const scratchConfigs = [
    { canvasId: 'canvas-scratch-date', title: 'DATE ✦ 31 JAN' },
    { canvasId: 'canvas-scratch-time', title: 'TIME ✦ MUHURAT' },
    { canvasId: 'canvas-scratch-venue', title: 'VENUE ✦ THE BELLS' }
  ];

  scratchConfigs.forEach(cfg => {
    const canvas = document.getElementById(cfg.canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Fill with luxury metallic gold foil texture
    function renderFoilCover() {
      const w = canvas.width;
      const h = canvas.height;

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#bf953f');
      grad.addColorStop(0.25, '#fcf6ba');
      grad.addColorStop(0.5, '#b38728');
      grad.addColorStop(0.75, '#fbf5b7');
      grad.addColorStop(1, '#aa771c');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Gold shimmer borders
      ctx.strokeStyle = '#6b4a1e';
      ctx.lineWidth = 3;
      ctx.strokeRect(6, 6, w - 12, h - 12);

      // Scratch Prompt Text
      ctx.fillStyle = '#4a2800';
      ctx.font = 'bold 13px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 8);

      ctx.fillStyle = '#6e0b17';
      ctx.font = 'bold 11px Montserrat, sans-serif';
      ctx.fillText(cfg.title, w / 2, h / 2 + 14);

      // Little sparkle icon
      ctx.font = '16px serif';
      ctx.fillText('✨', w / 2, h / 2 - 32);
    }

    renderFoilCover();

    let isScratching = false;
    let scratchedPercent = 0;

    function scratchAt(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      checkScratchCompletion();
    }

    function checkScratchCompletion() {
      if (scratchedPercent >= 40) return; // Already revealed

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        let transparent = 0;
        const total = pixels.length / 4;

        // Sample every 16th pixel for high performance
        for (let i = 3; i < pixels.length; i += 64) {
          if (pixels[i] === 0) transparent++;
        }

        const sampleTotal = total / 16;
        scratchedPercent = (transparent / sampleTotal) * 100;

        if (scratchedPercent > 40) {
          canvas.style.opacity = '0';
          canvas.style.pointerEvents = 'none';
          if (window.triggerFlowerShower) {
            window.triggerFlowerShower();
          }
        }
      } catch (e) {}
    }

    // Mouse Listeners
    canvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      scratchAt(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (isScratching) {
        scratchAt(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      isScratching = false;
    });

    // Touch Listeners (Mobile First)
    canvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const touch = e.touches[0];
      scratchAt(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      if (isScratching) {
        const touch = e.touches[0];
        scratchAt(touch.clientX, touch.clientY);
      }
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      isScratching = false;
    });
  });

  // "Uncover All 3 Cards" Action Button
  const revealAllBtn = document.getElementById('reveal-all-scratch-btn');
  if (revealAllBtn) {
    revealAllBtn.addEventListener('click', () => {
      scratchConfigs.forEach(cfg => {
        const canvas = document.getElementById(cfg.canvasId);
        if (canvas) {
          canvas.style.opacity = '0';
          canvas.style.pointerEvents = 'none';
        }
      });
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }
      revealAllBtn.innerHTML = '✨ All 3 Muhurat Cards Uncovered! ✨';
      setTimeout(() => {
        revealAllBtn.style.display = 'none';
      }, 1600);
    });
  }
}

/* ==========================================================
   4. SHIVA-PARVATI DIVINE ACTIONS (BEL PATRA & MANDIR GHANTA)
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
   5. FORMAL INVITATION CARDS FULLSCREEN VIEWER
   ========================================================== */
function initLeavesViewer() {
  const viewLeafBtns = document.querySelectorAll('.view-leaf-btn');
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');

  viewLeafBtns.forEach(btn => {
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
   6. LIVE WEDDING COUNTDOWN TIMER (2 DIGITS FOR DAYS)
   ========================================================== */
function initCountdownTimer() {
  // Wedding Ceremony: 31st January 2027, 18:00:00 IST
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

    // Format days as standard digits (e.g. 75 instead of 075)
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
    title: 'Wedding Celebrations | Prasoon & Navya',
    description: 'Cordially inviting you to celebrate the Wedding of Prasoon & Navya across Deoghar, Dhanbad & Ranchi (Reception). With the divine blessings of Baba Baidyanath & Mata Parvati.',
    location: 'The Wedding Bells, Baramuri, Bhuli Hirak Road, Dhanbad – 826013 & Dulhan Banquet Hall, Ranchi',
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
        'PRODID:-//Prasoon & Navya//Royal Wedding//EN',
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
   8. VENUE ADDRESS COPY ACTIONS
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
   9. SHARE INVITATION VIA WHATSAPP & WEB SHARE API
   ========================================================== */
function initShare() {
  const shareBtn = document.getElementById('share-card-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    const shareData = {
      title: 'Prasoon & Navya — Wedding Celebrations 2027',
      text: 'With the divine blessings of Baba Baidyanath & Mata Parvati, you are cordially invited to celebrate the royal wedding of Prasoon & Navya (27–31 Jan 2027, Deoghar & Dhanbad • Grand Reception 6 Feb 2027, Ranchi).',
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
