/**
 * DAY 1 • SLEEPY OWL 🦉 & MR. INTEREST ✨
 * Interactive Experiences & Celestial Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // Memory Data
  // ==========================================
  const MEMORIES = [
    {
      id: 1,
      title: "My Whole Heart",
      tag: "My Whole Heart",
      date: "Day 1 Beginning",
      photo: "assets/photo2.jpg",
      quote: "Whenever you smile at me like this, the entire world goes quiet, and I'm reminded that home isn't a place—it's you.",
      note: "From our very first conversation, you caught my curiosity, Sleepy Owl. I found myself checking my phone just to see your name pop up, laughing at your quick wit, and wondering how someone could be so effortlessly special.",
      icon: "✦"
    },
    {
      id: 2,
      title: "Evidence Removed, Case Reopened",
      tag: "Evidence Removed, Case Reopened",
      date: "Day 1",
      photo: "assets/photo1.jpg",
      quote: "I consider having to reapply your lipstick a successful crime, and I have every intention of becoming a repeat offender.",
      note: "",
      icon: "★"
    },
    {
      id: 3,
      title: "My 'Nothing'",
      tag: "My 'Nothing'",
      date: "Day 1",
      photo: "assets/photo3.jpg",
      quote: "You are every of those 'nothing's I’ve ever said when they ask \"What are you thinking about?\"",
      note: "",
      icon: "✦"
    },
    {
      id: 4,
      title: "Every Passing Hour",
      tag: "Every Passing Hour",
      date: "Day 1",
      photo: "assets/photo4.jpg",
      quote: "The moment you leave, the world doesn't just get quiet, it empties out, waiting for you to come back.",
      note: "",
      icon: "★"
    },
    {
      id: 5,
      title: "Just Your Smile",
      tag: "Just Your Smile",
      date: "Day 1",
      photo: "assets/photo5.jpg",
      quote: "My heart never asked for much. It always asked, \"Will this make her smile?\"",
      note: "",
      icon: "❤️"
    }
  ];

  let currentMemoryIndex = 0;

  // ==========================================
  // Starfield & Shooting Stars Canvas
  // ==========================================
  const starCanvas = document.getElementById('starfield-canvas');
  if (starCanvas) {
    const ctx = starCanvas.getContext('2d');
    let width, height;
    let stars = [];
    let shootingStars = [];

    function resizeCanvas() {
      width = starCanvas.width = window.innerWidth;
      height = starCanvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      const count = Math.floor((width * height) / 3800);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.8 ? '#ffd166' : (Math.random() > 0.85 ? '#fda4af' : '#ffffff')
        });
      }
    }

    function spawnShootingStar() {
      if (shootingStars.length < 2 && Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    }

    function animateStarfield() {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach(star => {
        star.phase += star.speed;
        const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.radius > 1 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Update & Draw Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        grad.addColorStop(0.3, `rgba(255, 209, 102, ${s.opacity * 0.8})`);
        grad.addColorStop(1, `rgba(253, 164, 175, 0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffd166';
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= s.decay;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(animateStarfield);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateStarfield();
  }

  // ==========================================
  // Render Polaroid Cards Grid
  // ==========================================
  const cardsGrid = document.getElementById('cards-grid');
  if (cardsGrid) {
    cardsGrid.innerHTML = MEMORIES.map((m, idx) => `
      <div class="deck-polaroid-card" data-index="${idx}" tabindex="0" role="button" aria-label="Open ${m.title}">
        <img class="deck-polaroid-img" src="${m.photo}" alt="${m.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80'">
        <div class="deck-polaroid-body">
          <span class="deck-polaroid-tag">${m.tag}</span>
          <div class="deck-polaroid-title">${m.title}</div>
        </div>
      </div>
    `).join('');

    cardsGrid.querySelectorAll('.deck-polaroid-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        openMemoryModal(idx);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.dataset.index, 10);
          openMemoryModal(idx);
        }
      });
    });
  }

  // ==========================================
  // Interactive Constellation Star Nodes
  // ==========================================
  const starNodes = document.querySelectorAll('.star-node');
  starNodes.forEach(node => {
    node.addEventListener('click', () => {
      const idx = parseInt(node.dataset.index, 10);
      openMemoryModal(idx);
    });
  });

  // ==========================================
  // View Switcher (Sky Map vs Cards Deck)
  // ==========================================
  const viewSkyBtn = document.getElementById('view-sky-btn');
  const viewCardsBtn = document.getElementById('view-cards-btn');
  const skyMapWrapper = document.getElementById('sky-map-wrapper');
  const cardsGridWrapper = document.getElementById('cards-grid-wrapper');

  if (viewSkyBtn && viewCardsBtn && skyMapWrapper && cardsGridWrapper) {
    viewSkyBtn.addEventListener('click', () => {
      viewSkyBtn.classList.add('active');
      viewSkyBtn.setAttribute('aria-pressed', 'true');
      viewCardsBtn.classList.remove('active');
      viewCardsBtn.setAttribute('aria-pressed', 'false');

      skyMapWrapper.classList.remove('hidden');
      cardsGridWrapper.classList.add('hidden');
    });

    viewCardsBtn.addEventListener('click', () => {
      viewCardsBtn.classList.add('active');
      viewCardsBtn.setAttribute('aria-pressed', 'true');
      viewSkyBtn.classList.remove('active');
      viewSkyBtn.setAttribute('aria-pressed', 'false');

      cardsGridWrapper.classList.remove('hidden');
      skyMapWrapper.classList.add('hidden');
    });
  }

  // ==========================================
  // Memory Modal Logic
  // ==========================================
  const modal = document.getElementById('memory-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');
  const modalPhoto = document.getElementById('modal-photo');
  const modalTag = document.getElementById('modal-tag');
  const modalDate = document.getElementById('modal-caption-date');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalQuote = document.getElementById('modal-quote');
  const modalQuoteBox = document.getElementById('modal-quote-box') || document.querySelector('.modal-quote-box');
  const modalNote = document.getElementById('modal-note');
  const modalCounter = document.getElementById('modal-counter');

  function openMemoryModal(index) {
    currentMemoryIndex = index;
    updateModalContent();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeMemoryModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateModalContent() {
    const memory = MEMORIES[currentMemoryIndex];
    if (!memory) return;

    modalPhoto.src = memory.photo;
    modalPhoto.alt = memory.title;
    modalTag.textContent = memory.tag;
    if (modalDate) modalDate.textContent = memory.date || '';
    modalIcon.textContent = memory.icon;
    modalTitle.textContent = memory.title;

    if (memory.quote && memory.quote.trim().length > 0) {
      modalQuote.textContent = memory.quote;
      if (modalQuoteBox) modalQuoteBox.style.display = 'block';
    } else {
      if (modalQuoteBox) modalQuoteBox.style.display = 'none';
    }

    if (modalNote) modalNote.textContent = memory.note || '';
    modalCounter.textContent = `${currentMemoryIndex + 1} of ${MEMORIES.length}`;

    // Fallback if image fails
    modalPhoto.onerror = function() {
      this.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80';
    };
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeMemoryModal);
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => {
      currentMemoryIndex = (currentMemoryIndex - 1 + MEMORIES.length) % MEMORIES.length;
      updateModalContent();
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => {
      currentMemoryIndex = (currentMemoryIndex + 1) % MEMORIES.length;
      updateModalContent();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeMemoryModal();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeMemoryModal();
    } else if (e.key === 'ArrowLeft') {
      currentMemoryIndex = (currentMemoryIndex - 1 + MEMORIES.length) % MEMORIES.length;
      updateModalContent();
    } else if (e.key === 'ArrowRight') {
      currentMemoryIndex = (currentMemoryIndex + 1) % MEMORIES.length;
      updateModalContent();
    }
  });

  // Mobile Swipe Gesture on Modal
  let touchStartX = 0;
  let touchEndX = 0;
  if (modal) {
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Right -> Prev
        currentMemoryIndex = (currentMemoryIndex - 1 + MEMORIES.length) % MEMORIES.length;
        updateModalContent();
      } else {
        // Swipe Left -> Next
        currentMemoryIndex = (currentMemoryIndex + 1) % MEMORIES.length;
        updateModalContent();
      }
    }
  }

  // ==========================================
  // Background Audio (Plays assets/bg-music.mp3)
  // ==========================================
  const bgAudio = document.getElementById('bg-audio');
  const musicController = document.getElementById('music-controller');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicBtnLabel = document.getElementById('music-btn-label');

  let isAudioPlaying = false;
  let hasUserInteracted = false;

  function updateAudioUI(playing) {
    isAudioPlaying = playing;
    if (!musicController) return;

    if (playing) {
      musicController.classList.add('is-playing');
      musicController.classList.remove('is-paused', 'needs-tap');
      if (musicToggleBtn) {
        musicToggleBtn.setAttribute('aria-label', 'Pause background music');
        musicToggleBtn.setAttribute('title', 'Pause background music');
      }
      if (musicBtnLabel) musicBtnLabel.textContent = 'Playing';
    } else {
      musicController.classList.remove('is-playing');
      musicController.classList.add('is-paused');
      if (musicToggleBtn) {
        musicToggleBtn.setAttribute('aria-label', 'Play background music');
        musicToggleBtn.setAttribute('title', 'Play background music');
      }
      if (musicBtnLabel) musicBtnLabel.textContent = 'Music';
    }
  }

  function playMusic() {
    if (!bgAudio) return Promise.resolve(false);
    bgAudio.loop = true;
    bgAudio.volume = 0.85;

    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          updateAudioUI(true);
          detachGlobalUnlock();
          return true;
        })
        .catch(() => {
          // Browser autoplay policy prevented immediate unmuted playback
          updateAudioUI(false);
          if (musicController) musicController.classList.add('needs-tap');
          return false;
        });
    }
    return Promise.resolve(false);
  }

  function pauseMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    updateAudioUI(false);
  }

  function toggleMusic() {
    if (!bgAudio) return;
    hasUserInteracted = true;
    if (bgAudio.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }

  // Handle global unlock: any initial user gesture immediately triggers playback
  function onUserGesture() {
    hasUserInteracted = true;
    if (!isAudioPlaying) {
      playMusic();
    }
  }

  const unlockEvents = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'click', 'keydown'];
  function attachGlobalUnlock() {
    unlockEvents.forEach(evt => {
      window.addEventListener(evt, onUserGesture, { capture: true, passive: true });
      document.addEventListener(evt, onUserGesture, { capture: true, passive: true });
    });
  }

  function detachGlobalUnlock() {
    unlockEvents.forEach(evt => {
      window.removeEventListener(evt, onUserGesture, { capture: true });
      document.removeEventListener(evt, onUserGesture, { capture: true });
    });
  }

  // Wire up floating music button
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Sync state with native audio events
  if (bgAudio) {
    bgAudio.addEventListener('play', () => updateAudioUI(true));
    bgAudio.addEventListener('playing', () => updateAudioUI(true));
    bgAudio.addEventListener('pause', () => updateAudioUI(false));
    bgAudio.addEventListener('ended', () => {
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => {});
    });
  }

  // Immediate playback attempts on link open
  attachGlobalUnlock();
  playMusic();
  window.addEventListener('load', playMusic);
  window.addEventListener('pageshow', playMusic);
  document.addEventListener('DOMContentLoaded', playMusic);

  // Resume when returning to the tab if user previously had it active
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && hasUserInteracted && bgAudio && bgAudio.paused) {
      playMusic();
    }
  });

  // ==========================================
  // Live Day 1 Milestone Timer
  // ==========================================
  const daysEl = document.getElementById('time-days');
  const hoursEl = document.getElementById('time-hours');
  const minsEl = document.getElementById('time-minutes');
  const secsEl = document.getElementById('time-seconds');

  // Start time set to today morning (Oct 24, 2026 00:00:00 local time)
  const officialDay1Start = new Date();
  officialDay1Start.setHours(0, 0, 0, 0);

  function updateMilestoneCounter() {
    const now = new Date();
    const diffMs = Math.max(0, now - officialDay1Start);

    const totalSeconds = Math.floor(diffMs / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 24;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = 1; // It is Day 1!

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateMilestoneCounter, 1000);
  updateMilestoneCounter();

  // ==========================================
  // Celebration Particle Burst & Love Letter
  // ==========================================
  const celebrateBtn = document.getElementById('celebrate-btn');
  const loveLetterReveal = document.getElementById('love-letter-reveal');
  const confettiCanvas = document.getElementById('confetti-canvas');

  let particles = [];
  let confettiCtx = null;
  let animationId = null;

  function initConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function launchStarlightParticles() {
    initConfettiCanvas();
    if (!confettiCtx) return;

    const count = 120;
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.75;

    const colors = ['#ffd166', '#fda4af', '#f472b6', '#ffffff', '#fef08a'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.4 ? 'star' : 'heart',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.16,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008
      });
    }

    if (!animationId) {
      animateParticles();
    }
  }

  function drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.bezierCurveTo(-5, -15, -15, -5, 0, 10);
    ctx.bezierCurveTo(15, -5, 5, -15, 0, -5);
    ctx.fill();
    ctx.restore();
  }

  function drawStar(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * size, -Math.sin(((18 + i * 72) * Math.PI) / 180) * size);
      ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2.2), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2.2));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateParticles() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.type === 'heart') {
        drawHeart(confettiCtx, p.x, p.y, p.size, p.color, Math.max(0, p.alpha));
      } else {
        drawStar(confettiCtx, p.x, p.y, p.size, p.color, Math.max(0, p.alpha), p.rotation);
      }

      if (p.alpha <= 0 || p.y > confettiCanvas.height + 50) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animateParticles);
    } else {
      animationId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      launchStarlightParticles();
      if (loveLetterReveal) {
        loveLetterReveal.classList.add('revealed');
        loveLetterReveal.setAttribute('aria-hidden', 'false');
        loveLetterReveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
});
