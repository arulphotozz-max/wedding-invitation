/* ==================================================
   VIEW INVITATION
================================================== */

const viewInvitation =
  document.getElementById("viewInvitation");

const opening =
  document.getElementById("opening");

const invitation =
  document.getElementById("invitation");


viewInvitation.addEventListener(
  "click",
  function () {

    opening.classList.add("fade-out");

    setTimeout(function () {

      opening.style.display = "none";

      invitation.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 600);

  }
);


/* ==================================================
   COUNTDOWN
================================================== */

const weddingDate =
  new Date("2026-10-25T06:00:00+05:30");


function updateCountdown() {

  const now =
    new Date();

  const difference =
    weddingDate.getTime() -
    now.getTime();


  if (difference <= 0) {

    document.getElementById("days").textContent = "00";

    document.getElementById("hours").textContent = "00";

    document.getElementById("minutes").textContent = "00";

    document.getElementById("seconds").textContent = "00";

    return;
  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (difference /
        (1000 * 60 * 60)) %
      24
    );


  const minutes =
    Math.floor(
      (difference /
        (1000 * 60)) %
      60
    );


  const seconds =
    Math.floor(
      (difference / 1000) %
      60
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


/* ==================================================
   GALLERY LIGHTBOX
================================================== */

const galleryImages =
  document.querySelectorAll(
    ".gallery-item img"
  );

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");


galleryImages.forEach(function (image) {

  image.addEventListener(
    "click",
    function () {

      lightboxImage.src =
        image.src;

      lightbox.classList.add(
        "active"
      );

      document.body.style.overflow =
        "hidden";

    }
  );

});


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  function (event) {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


function closeLightbox() {

  lightbox.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }

  }
);


/* ==================================================
   MUSIC
================================================== */

const musicButton =
  document.getElementById(
    "musicButton"
  );

const youtubePlayer =
  document.getElementById(
    "youtubePlayer"
  );

let musicPlaying = false;


musicButton.addEventListener(
  "click",
  function () {

    if (!musicPlaying) {

      youtubePlayer.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );

      musicButton.textContent = "Ⅱ";

      musicPlaying = true;

    } else {

      youtubePlayer.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );

      musicButton.textContent = "♪";

      musicPlaying = false;

    }

  }
);


/* ==================================================
   OPENING FADE
================================================== */

const style =
  document.createElement("style");

style.innerHTML = `

.opening.fade-out {
  animation:
    openingFade 0.6s ease forwards;
}

@keyframes openingFade {

  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.03);
  }

}

`;

document.head.appendChild(style);
