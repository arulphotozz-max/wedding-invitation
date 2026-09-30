let player;
let isPlayerReady = false;

// 1. YouTube IFrame API Callback
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1',
    width: '1',
    videoId: 'r3oAMDsC-8Y', // Eppadi Vandhaayo Song
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: 'r3oAMDsC-8Y',
      playsinline: 1,
      rel: 0
    },
    events: {
      onReady: () => {
        isPlayerReady = true;
        player.setVolume(80);
      },
      onStateChange: (event) => {
        const musicBtn = document.getElementById("music-btn");
        if (musicBtn) {
          if (event.data === YT.PlayerState.PLAYING) {
            musicBtn.classList.add("is-playing");
          } else {
            musicBtn.classList.remove("is-playing");
          }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("btn-open-invite");
  const openingScreen = document.getElementById("opening-screen");
  const mainSite = document.getElementById("main-site");
  const musicBtn = document.getElementById("music-btn");

  // 2. Play YouTube music when clicking OPEN INVITATION
  function startMusic() {
    if (player && isPlayerReady && typeof player.playVideo === "function") {
      player.playVideo();
    } else {
      // Retry in 200ms if player wasn't ready
      setTimeout(startMusic, 200);
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      startMusic();

      openingScreen.classList.add("hide");
      mainSite.classList.remove("hidden-init");

      setTimeout(() => {
        document.querySelectorAll(".hero-content").forEach(el => el.classList.add("active"));
      }, 250);
    });
  }

  // 3. Music toggle button (Play / Pause)
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (player && isPlayerReady && typeof player.getPlayerState === "function") {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      }
    });
  }

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal-item");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Live Countdown Timer to 25 Oct 2026, 06:00 AM IST
  const weddingTarget = new Date("2026-10-25T06:00:00+05:30").getTime();
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-minutes");
  const secsEl = document.getElementById("timer-seconds");

  function runCountdown() {
    const now = Date.now();
    const diff = weddingTarget - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minsEl) minsEl.textContent = "00";
      if (secsEl) secsEl.textContent = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(m).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(s).padStart(2, "0");
  }
  runCountdown();
  setInterval(runCountdown, 1000);

  // 6. Floating Petal Canvas Particles
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.35 + 0.15
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.fillStyle = `rgba(182, 149, 90, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
});
