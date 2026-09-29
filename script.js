/* =========================
   VIEW INVITATION
========================= */

const viewButton = document.getElementById("viewInvitation");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");

const musicButton = document.getElementById("musicButton");
const player = document.getElementById("youtubePlayer");

let musicPlaying = false;


viewButton.addEventListener("click", () => {

  /* Start music immediately when user clicks */
  player.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "playVideo",
      args: []
    }),
    "*"
  );

  musicPlaying = true;
  musicButton.textContent = "Ⅱ";

  /* Hide opening screen */
  opening.classList.add("hide");

  setTimeout(() => {

    opening.style.display = "none";

    invitation.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, 1200);

});


/* =========================
   COUNTDOWN
========================= */

const weddingDate =
  new Date("2026-10-25T06:00:00+05:30");


function updateCountdown() {

  const now = new Date();

  const difference =
    weddingDate.getTime() - now.getTime();


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
        (1000 * 60 * 60)) % 24
    );


  const minutes =
    Math.floor(
      (difference /
        (1000 * 60)) % 60
    );


  const seconds =
    Math.floor(
      (difference / 1000) % 60
    );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   MUSIC BUTTON
========================= */

musicButton.addEventListener("click", () => {

  if (!musicPlaying) {

    player.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: []
      }),
      "*"
    );

    musicButton.textContent = "Ⅱ";

    musicPlaying = true;

  } else {

    player.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: []
      }),
      "*"
    );

    musicButton.textContent = "♪";

    musicPlaying = false;

  }

});
