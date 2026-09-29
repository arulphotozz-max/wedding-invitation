const viewBtn =
  document.getElementById("viewInvitation");

const invitation =
  document.getElementById("invitation");

const opening =
  document.getElementById("opening");


/* =========================
   MUSIC
========================= */

const frame =
  document.getElementById("youtubeFrame");

const musicToggle =
  document.getElementById("musicToggle");

const youtubeId =
  "r3oAMDsC-8Y";

let musicOn = false;


function startMusic() {

  frame.src =
    `https://www.youtube.com/embed/${youtubeId}` +
    `?autoplay=1` +
    `&loop=1` +
    `&playlist=${youtubeId}` +
    `&controls=0` +
    `&rel=0` +
    `&playsinline=1`;

  musicOn = true;

  musicToggle.textContent = "♫";
}


/* =========================
   VIEW INVITATION
========================= */

viewBtn.addEventListener("click", () => {

  invitation.classList.remove("hidden");

  opening.style.display = "none";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  startMusic();

});


/* =========================
   MUSIC BUTTON
========================= */

musicToggle.addEventListener("click", () => {

  if (!musicOn) {

    startMusic();

  } else {

    frame.src = "";

    musicOn = false;

    musicToggle.textContent = "🔇";

  }

});


/* =========================
   COUNTDOWN
========================= */

const weddingDate =
  new Date(
    "2026-10-25T06:00:00+05:30"
  ).getTime();


function updateCountdown() {

  const now = Date.now();

  const distance =
    weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days")
      .textContent = "00";

    document.getElementById("hours")
      .textContent = "00";

    document.getElementById("minutes")
      .textContent = "00";

    document.getElementById("seconds")
      .textContent = "00";

    return;
  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (distance /
        (1000 * 60 * 60)) % 24
    );


  const minutes =
    Math.floor(
      (distance /
        (1000 * 60)) % 60
    );


  const seconds =
    Math.floor(
      (distance / 1000) % 60
    );


  document.getElementById("days")
    .textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours")
    .textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes")
    .textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds")
    .textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================
   GALLERY
========================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImg =
  document.getElementById("lightboxImg");


document
  .querySelectorAll(".photo")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        lightboxImg.src =
          button.dataset.src;

        lightbox.classList.add("show");

      }
    );

  });


/* =========================
   CLOSE LIGHTBOX
========================= */

document
  .getElementById("closeLightbox")
  .addEventListener(
    "click",
    () => {

      lightbox.classList.remove("show");

      lightboxImg.src = "";

    }
  );


/* Click outside image */

lightbox.addEventListener(
  "click",
  event => {

    if (event.target === lightbox) {

      lightbox.classList.remove("show");

      lightboxImg.src = "";

    }

  }
);


/* ESC */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      lightbox.classList.remove("show");

      lightboxImg.src = "";

    }

  }
);
