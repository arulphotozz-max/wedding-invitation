document.addEventListener("DOMContentLoaded", () => {
  // 1. OPENING CURTAIN & AUDIO PLAY
  const openBtn = document.getElementById("btn-open-invite");
  const openingScreen = document.getElementById("opening-screen");
  const mainSite = document.getElementById("main-site");
  const bgAudio = document.getElementById("bg-audio");
  const musicBtn = document.getElementById("music-btn");

  openBtn.addEventListener("click", () => {
    openingScreen.classList.add("hide-curtain");
    mainSite.classList.remove("is-hidden");

    // Audio Play on direct user gesture
    if (bgAudio) {
      bgAudio.play().then(() => {
        musicBtn.classList.add("is-playing");
      }).catch(err => {
        console.warn("Audio autoplay blocked by browser policy:", err);
      });
    }

    // Trigger hero section reveal right away
    setTimeout(() => {
      document.querySelectorAll(".hero-text-content").forEach(el => el.classList.add("active"));
    }, 300);
  });

  // Music toggle button
  if (musicBtn && bgAudio) {
    musicBtn.addEventListener("click", () => {
      if (bgAudio.paused) {
        bgAudio.play();
        musicBtn.classList.add("is-playing");
      } else {
        bgAudio.pause();
        musicBtn.classList.remove("is-playing");
      }
    });
  }

  // 2. SCROLL REVEAL (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll(".reveal-item");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. LIVE COUNTDOWN TIMER TO 25 OCT 2026, 06:00 AM IST
  const targetDate = new Date("2026-10-25T06:00:00+05:30").getTime();

  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-mins");
  const secsEl = document.getElementById("timer-secs");

  function runTimer() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  runTimer();
  setInterval(runTimer, 1000);

  // 4. FLOATING GOLD PETAL PARTICLES (FRIEND SITE CANVAS EFFECT)
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.35 + 0.15
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
});
