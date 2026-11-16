/**
 * ==========================================================
 * WEDDING INVITATION — JAVASCRIPT
 * Prasoon & Navya • 27–31 January 2027
 * Features:
 *  1. Authentic Sacred Bilva Patra (Bel Patra) & Indian Flower Shower (NO HEARTS)
 *  2. Royal Wax Seal Envelope Gate Opening
 *  3. Audio Controls & Music Modal
 *  4. Shiva-Parvati Divine Actions (Bel Patra / Flower Shower & Authentic Mandir Ghanta)
 *  5. 3-Per-Page Horizontal Photo Carousel & Lightbox
 *  6. Full-Resolution Invitation Cards Lightbox
 *  7. Live Countdown Timer to 31st January 2027 (2 Digits for Days)
 *  8. Calendar Sync (.ics & Google Calendar)
 *  9. Venue Address Copying
 *  10. WhatsApp Direct RSVP & Live Wall of Blessings
 *  11. Share Invitation
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Authentic Falling Bel Patra, Marigold & Rose Petals Canvas (NO HEARTS)
  initPetalsCanvas();

  // 2. Royal Envelope Opening Screen
  initEnvelopeGate();

  // 3. Audio Controls & Player Sync
  initAudioControls();

  // 4. Shiva-Parvati Divine Actions
  initDivineActions();

  // 5. 3-Per-Page Photo Slider & Lightbox
  initPhotoCarousel();

  // 6. Invitation Cards Fullscreen Viewer
  initLeavesViewer();

  // 7. Wedding Countdown Timer (2 digits for days)
  initCountdownTimer();

  // 8. Calendar Actions (Google Calendar & .ics)
  initCalendarActions();

  // 9. Venue Copy Address
  initVenueActions();

  // 10. RSVP & Wall of Blessings
  initRSVPAndWishes();

  // 11. Share Invitation
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
  const TOTAL_PARTICLES = 26; // Ambient density: clear reading, elegant royal ambiance

  // Particle types: 'belpatra', 'marigold', 'rose_petal', 'jasmine', 'gold_star'
  const PARTICLE_TYPES = ['belpatra', 'marigold', 'rose_petal', 'jasmine', 'gold_star'];

  function createParticle(w, h, randomizeY = false, extraSpeed = 0) {
    const type = PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)];
    let size;
    if (type === 'belpatra') size = Math.random() * 12 + 15; // Trifoliate 3-leaf
    else if (type === 'marigold') size = Math.random() * 10 + 13; // Round ruffled flower
    else if (type === 'rose_petal') size = Math.random() * 8 + 11; // Single organic petal
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

  // --- DRAWING ROUTINES FOR AUTHENTIC SACRED INDIAN MOTIFS (NO HEARTS) ---

  // 1. TRIFOLIATE BEL PATRA (Sacred 3-lobed Bilva leaf of Lord Shiva)
  function drawBelPatra(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;

    // Helper for single leaflet (smooth pointed oval)
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

      // Leaflet midrib vein
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -h * 0.88);
      c.strokeStyle = '#81c784';
      c.lineWidth = Math.max(0.6, size * 0.04);
      c.stroke();
      c.restore();
    }

    // Leaf stalk / petiole
    c.beginPath();
    c.moveTo(0, size * 0.45);
    c.lineTo(0, 0);
    c.strokeStyle = '#1b5e20';
    c.lineWidth = Math.max(1, size * 0.08);
    c.stroke();

    // 3 Connected Sacred Leaflets (Distinct Bilva signature)
    drawLeaflet(size * 0.32, size * 0.75, 0);          // Center erect leaflet
    drawLeaflet(size * 0.28, size * 0.62, -0.72);      // Left leaflet
    drawLeaflet(size * 0.28, size * 0.62, 0.72);       // Right leaflet

    c.restore();
  }

  // 2. GENDA PHOOL (Fresh Marigold Flower - Layered Saffron & Yellow)
  function drawMarigold(c, size, alpha) {
    c.save();
    c.globalAlpha = alpha;
    const r = size * 0.52;
    const petalsCount = 12;

    // Outer ruffled petals
    for (let i = 0; i < petalsCount; i++) {
      const angle = (i * Math.PI * 2) / petalsCount;
      const px = Math.cos(angle) * (r * 0.62);
      const py = Math.sin(angle) * (r * 0.62);
      c.beginPath();
      c.arc(px, py, r * 0.42, 0, Math.PI * 2);
      c.fillStyle = (i % 2 === 0) ? '#ff8f00' : '#ffa000';
      c.fill();
    }

    // Mid layer petals
    for (let i = 0; i < petalsCount; i++) {
      const angle = ((i + 0.5) * Math.PI * 2) / petalsCount;
      const px = Math.cos(angle) * (r * 0.35);
      const py = Math.sin(angle) * (r * 0.35);
      c.beginPath();
      c.arc(px, py, r * 0.3, 0, Math.PI * 2);
      c.fillStyle = '#ffb300';
      c.fill();
    }

    // Center saffron disc
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
    // Asymmetric organic petal curve
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
      c.shadowColor = 'rgba(212, 175, 55, 0.4)';
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
    c.shadowColor = '#d4af37';
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
        // Recycle to top
        particles[idx] = createParticle(width, height, false, 0);
      }
      if (p.x > width + 30) p.x = -30;
      if (p.x < -30) p.x = width + 30;

      renderParticle(p);
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Grand Celebratory Flower & Bel Patra Shower Burst (75+ authentic divine items)
  window.triggerFlowerShower = function() {
    for (let i = 0; i < 75; i++) {
      const p = createParticle(width, height, false, Math.random() * 2.5 + 1.2);
      p.y = Math.random() * (height * 0.45) - 40;
      p.speedX = Math.random() * 5 - 2.5;
      p.rotationSpeed = Math.random() * 4 - 2;
      particles.push(p);
    }

    // Keep particle array bounded
    setTimeout(() => {
      if (particles.length > 35) {
        particles.splice(TOTAL_PARTICLES, particles.length - TOTAL_PARTICLES);
      }
    }, 9000);
  };
}

/* ==========================================================
   2. ROYAL ENVELOPE GATE (LANDING SCREEN)
   ========================================================== */
function initEnvelopeGate() {
  const envelopeBtn = document.getElementById('open-envelope-btn');
  const envelopeSeal = document.getElementById('envelope-seal');
  const envelopeGate = document.getElementById('envelope-gate');

  function openCard() {
    // 1. Play Music immediately on user gesture
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // 2. Celebratory flower & Bel Patra shower
    if (window.triggerFlowerShower) {
      window.triggerFlowerShower();
    }

    // 3. Unfold envelope smoothly
    document.body.classList.remove('envelope-active');
    if (envelopeGate) {
      envelopeGate.style.opacity = '0';
      envelopeGate.style.transform = 'scale(1.08)';
      setTimeout(() => {
        envelopeGate.style.display = 'none';
      }, 1000);
    }
  }

  if (envelopeBtn) envelopeBtn.addEventListener('click', openCard);
  if (envelopeSeal) envelopeSeal.addEventListener('click', openCard);
}

/* ==========================================================
   3. AUDIO CONTROLS & MODAL
   ========================================================== */
function initAudioControls() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const disc = document.getElementById('audio-disc');
  const optionsBtn = document.getElementById('music-options-btn');
  const modal = document.getElementById('music-modal');
  const closeBtn = document.getElementById('close-music-modal');
  const trackRadios = document.querySelectorAll('input[name="soundtrack"]');
  const customFileInput = document.getElementById('custom-audio-file');
  const customFileName = document.getElementById('custom-file-name');
  const volumeSlider = document.getElementById('volume-slider');
  const trackTitle = document.getElementById('track-title');

  const trackNames = {
    'tere-bina-yt': 'Tere Bina — Romantic Instrumental',
    'shiv-mangalam': 'Shiv-Shakti & Shehnai Mangalam',
    'rajputana-sitar': 'Royal Sitar & Darbari Melody',
    'celestial-harp': 'Celestial Wedding Symphony & Strings',
    'custom': 'Custom Wedding Song'
  };

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.weddingAudio) {
        window.weddingAudio.toggle();
      }
    });
  }

  if (disc) {
    disc.addEventListener('click', () => {
      if (window.weddingAudio) window.weddingAudio.toggle();
    });
  }

  if (optionsBtn && modal) {
    optionsBtn.addEventListener('click', () => modal.classList.add('open'));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // Soundtrack Radio Selection
  trackRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selected = e.target.value;
      document.querySelectorAll('.track-option').forEach(el => el.classList.remove('active'));
      e.target.closest('.track-option').classList.add('active');

      if (window.weddingAudio) {
        window.weddingAudio.setTrack(selected);
      }
      if (trackTitle && trackNames[selected]) {
        trackTitle.textContent = trackNames[selected];
      }
    });
  });

  // Custom Audio File Upload
  if (customFileInput) {
    customFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        customFileName.textContent = file.name;
        document.querySelectorAll('.track-option').forEach(el => el.classList.remove('active'));
        if (trackTitle) trackTitle.textContent = file.name;
        if (window.weddingAudio) {
          window.weddingAudio.loadCustomFile(file);
        }
      }
    });
  }

  // Volume Slider
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      if (window.weddingAudio) {
        window.weddingAudio.setVolume(parseFloat(e.target.value));
      }
    });
  }
}

/* ==========================================================
   4. SHIVA-PARVATI DIVINE ACTIONS (BEL PATRA SHOWER & INDIAN TEMPLE BELL)
   ========================================================== */
function initDivineActions() {
  const flowerBtn = document.getElementById('flower-shower-btn');
  const bellBtn = document.getElementById('temple-bell-btn');
  const bellIcon = document.getElementById('bell-swing-icon');

  if (flowerBtn) {
    flowerBtn.addEventListener('click', () => {
      // 1. Trigger abundant Bel Patra and fresh flowers shower
      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }

      // 2. Play gentle auspicious chime
      if (window.weddingAudio && window.weddingAudio.playTempleBell) {
        window.weddingAudio.playTempleBell();
      }

      // 3. UI feedback
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
      // 1. Play deep resonant Indian Mandir Ghanta (घंटा) sound
      if (window.weddingAudio && window.weddingAudio.playIndianTempleGhanta) {
        window.weddingAudio.playIndianTempleGhanta();
      } else if (window.weddingAudio && window.weddingAudio.playTempleBell) {
        window.weddingAudio.playTempleBell();
      }

      // 2. Animate Indian Bell Swing
      if (bellIcon) {
        bellIcon.classList.remove('ghanta-swinging');
        void bellIcon.offsetWidth; // Force reflow
        bellIcon.classList.add('ghanta-swinging');
      }

      // 3. Visual button feedback
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
   5. 3-PER-PAGE HORIZONTAL PHOTO CAROUSEL & LIGHTBOX
   ========================================================== */
function initPhotoCarousel() {
  const track = document.getElementById('slider-track');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dotsContainer = document.getElementById('slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  function getSlidesPerView() {
    if (window.innerWidth <= 550) return 1;
    if (window.innerWidth <= 820) return 2;
    return 3; // 3 photos per view on desktop
  }

  function getMaxIndex() {
    const spv = getSlidesPerView();
    return Math.max(0, slides.length - spv);
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const spv = getSlidesPerView();
    const slideWidthPercent = 100 / spv;
    const translatePercent = currentIndex * slideWidthPercent;
    track.style.transform = `translateX(-${translatePercent}%)`;

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIdx = getMaxIndex();
      currentIndex = Math.min(maxIdx, currentIndex + 1);
      updateSlider();
    });
  }

  window.addEventListener('resize', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();

  // Lightbox Integration
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');
  const lbPrev = document.getElementById('prev-photo');
  const lbNext = document.getElementById('next-photo');

  const photos = [
    {
      src: './images/couple_bw_silhouette.jpg',
      title: 'Two Souls, One Heart',
      desc: 'Prasoon & Navya • A Moment of Quiet Love'
    },
    {
      src: './images/couple_royal_portrait.jpg',
      title: 'Royal Splendor',
      desc: 'Prasoon & Navya in Traditional Wedding Attire'
    },
    {
      src: './images/couple_mehndi_embrace.jpg',
      title: 'Forever Begins',
      desc: 'The Sacred Bridal Mehndi with PN Monogram & Ring'
    },
    {
      src: './images/couple_bw_candid.jpg',
      title: 'Cherished Smiles',
      desc: 'Joyful Moments as Two Souls Begin Their Journey'
    }
  ];

  let currentLbIdx = 0;

  function showLightbox(idx) {
    if (idx < 0) idx = photos.length - 1;
    if (idx >= photos.length) idx = 0;
    currentLbIdx = idx;
    if (lightboxImg) lightboxImg.src = photos[idx].src;
    if (lightboxCap) {
      lightboxCap.innerHTML = `<h4>${photos[idx].title}</h4><p>${photos[idx].desc}</p>`;
    }
    if (lightbox) lightbox.classList.add('open');
  }

  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => showLightbox(idx));
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightbox(currentLbIdx - 1);
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightbox(currentLbIdx + 1);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') showLightbox(currentLbIdx - 1);
    if (e.key === 'ArrowRight') showLightbox(currentLbIdx + 1);
  });
}

/* ==========================================================
   6. INVITATION CARDS FULLSCREEN VIEWER
   ========================================================== */
function initLeavesViewer() {
  const viewLeafBtns = document.querySelectorAll('.view-leaf-btn');
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCap = document.getElementById('lightbox-caption');

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
}

/* ==========================================================
   7. LIVE WEDDING COUNTDOWN TIMER (2 DIGITS FOR DAYS)
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

    // Format days as standard 2 digits (e.g. 75 instead of 075)
    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================
   8. CALENDAR INTEGRATION (.ICS & GOOGLE CALENDAR)
   ========================================================== */
function initCalendarActions() {
  const gcalBtn = document.getElementById('add-to-calendar-btn');
  const icsBtn = document.getElementById('download-ics-btn');

  const eventData = {
    title: 'Wedding of Prasoon & Navya',
    description: 'You are cordially invited to celebrate the Wedding of Prasoon & Navya in Deoghar and Dhanbad, Jharkhand. With the divine blessings of Baba Baidyanath & Mata Parvati.',
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
   9. VENUE COPY ADDRESS ACTIONS
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
   10. RSVP & LIVE WALL OF BLESSINGS
   ========================================================== */
function initRSVPAndWishes() {
  const rsvpForm = document.getElementById('wedding-rsvp-form');
  const statusMsg = document.getElementById('rsvp-status-msg');
  const wishesList = document.getElementById('wishes-list');
  const wishesCountBadge = document.getElementById('wishes-count-badge');

  const defaultWishes = [
    {
      name: 'Rana Pratap Singh & Family',
      city: 'Ranchi',
      relation: 'Family Elder',
      message: 'May Baba Baidyanath shower eternal happiness, peace, and abundance on Prasoon & Navya. Har Har Mahadev!',
      time: 'Just now'
    },
    {
      name: 'Dr. Amitabh & Sangeeta Parihar',
      city: 'Patna',
      relation: 'Relatives',
      message: 'Heartiest congratulations to the Parihar & Singh families! Wishing the lovely couple a golden lifetime of togetherness.',
      time: '1 hour ago'
    },
    {
      name: 'Vikram & Ananya Rathore',
      city: 'Delhi',
      relation: 'Friends',
      message: 'Counting down days to the royal celebration in Deoghar! Can’t wait for the Sangeet dhamaal and Saat Phere.',
      time: '3 hours ago'
    },
    {
      name: 'Pooja & Saurabh Verma',
      city: 'Bokaro',
      relation: 'Well-Wishers',
      message: 'Warmest blessings to Prasoon & Navya for a sacred and harmonious journey together.',
      time: 'Yesterday'
    }
  ];

  function renderWishes(wishes) {
    if (!wishesList) return;
    wishesList.innerHTML = wishes.map(w => `
      <div class="wish-item">
        <div class="wish-item-header">
          <div class="wish-author-info">
            <span class="wish-author">${escapeHTML(w.name)}</span>
            <span class="wish-city"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(w.city || 'India')}</span>
          </div>
          <span class="wish-time">${w.time}</span>
        </div>
        <p class="wish-text">"${escapeHTML(w.message)}"</p>
      </div>
    `).join('');

    if (wishesCountBadge) {
      wishesCountBadge.textContent = `${wishes.length} Wishes`;
    }
  }

  renderWishes(defaultWishes);

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guest-name').value.trim();
      const phone = document.getElementById('guest-phone').value.trim();
      const city = document.getElementById('guest-city').value.trim();
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
      const count = document.getElementById('guest-count').value;
      const events = document.getElementById('events-attending').value;
      const message = document.getElementById('guest-message').value.trim();

      if (!name) return;

      const newWish = {
        name: name,
        city: city || 'Honored Guest',
        relation: 'Esteemed Guest',
        message: message || (attendance === 'attending' 
          ? 'Heartiest congratulations to Prasoon & Navya! Looking forward to celebrating together.' 
          : 'Sending warmest blessings and heartfelt congratulations on your wedding!'),
        time: 'Just now'
      };

      defaultWishes.unshift(newWish);
      renderWishes(defaultWishes);

      if (statusMsg) {
        statusMsg.className = 'form-status success';
        statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHTML(name)}</strong>! Your RSVP and blessings have been warmly received.`;
      }

      if (window.triggerFlowerShower) {
        window.triggerFlowerShower();
      }

      rsvpForm.reset();

      setTimeout(() => {
        if (statusMsg) statusMsg.innerHTML = '';
      }, 7000);
    });
  }
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================
   11. SHARE INVITATION
   ========================================================== */
function initShare() {
  const shareBtn = document.getElementById('share-card-btn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    const shareData = {
      title: 'Wedding Celebrations | Prasoon & Navya',
      text: 'With the divine blessings of Baba Baidyanath & Mata Parvati, you are cordially invited to celebrate the wedding of Prasoon & Navya (27–31 Jan 2027, Deoghar & Dhanbad).',
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
