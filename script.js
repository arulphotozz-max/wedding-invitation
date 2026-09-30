document.addEventListener("DOMContentLoaded", () => {
  // 1. OPENING SCREEN & AUDIO AUTO-START
  const enterBtn = document.getElementById("enter-btn");
  const openingScreen = document.getElementById("opening-screen");
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  enterBtn.addEventListener("click", () => {
    openingScreen.classList.add("hide");

    // Play Audio safely after user gesture
    if (bgMusic) {
      bgMusic.play().then(() => {
        musicBtn.classList.add("playing");
      }).catch(err => {
        console.log("Audio autoplay prevented:", err);
      });
    }
  });

  // Music Toggle Button
  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.classList.add("playing");
        musicBtn.textContent = "♪";
      } else {
        bgMusic.pause();
        musicBtn.classList.remove("playing");
        musicBtn.textContent = "❚❚";
      }
    });
  }

  // 2. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally unobserve if you want it to trigger only once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. COUNTDOWN TIMER CALCULATION
  // Target: Wedding Morning - 25 October 2026, 06:00:00 AM (IST)
  const weddingDate = new Date("October 25, 2026 06:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  // Initial call & tick every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
