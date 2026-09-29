const viewBtn = document.getElementById("viewInvitation");
const invitation = document.getElementById("invitation");
const musicPlayer = document.getElementById("musicPlayer");
const frame = document.getElementById("youtubeFrame");
const musicToggle = document.getElementById("musicToggle");

const youtubeId = "r3oAMDsC-8Y";
let musicOn = false;

viewBtn.addEventListener("click", () => {
  invitation.classList.remove("hidden");
  document.getElementById("opening").style.display = "none";
  window.scrollTo({top:0, behavior:"smooth"});
  startMusic();
});

function startMusic(){
  frame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&playsinline=1`;
  musicOn = true;
  musicToggle.textContent = "♫";
}

musicToggle.addEventListener("click", () => {
  if(!musicOn){
    startMusic();
  }else{
    frame.src = "";
    musicOn = false;
    musicToggle.textContent = "🔇";
  }
});

// Wedding countdown: 25 October 2026, 6:00 AM IST
const weddingDate = new Date("2026-10-25T06:00:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  if(distance <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    return;
  }
  document.getElementById("days").textContent = Math.floor(distance/(1000*60*60*24)).toString().padStart(2,"0");
  document.getElementById("hours").textContent = Math.floor((distance/(1000*60*60))%24).toString().padStart(2,"0");
  document.getElementById("minutes").textContent = Math.floor((distance/(1000*60))%60).toString().padStart(2,"0");
  document.getElementById("seconds").textContent = Math.floor((distance/1000)%60).toString().padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".photo").forEach(btn => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.src;
    lightbox.classList.add("show");
  });
});

document.getElementById("closeLightbox").addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", e => {
  if(e.target === lightbox) lightbox.classList.remove("show");
});
