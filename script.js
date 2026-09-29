function scrollToWedding() {
  document.getElementById("wedding").scrollIntoView({
    behavior: "smooth"
  });
}


// Wedding date
const weddingDate = new Date("December 15, 2026 10:30:00").getTime();

const countdown = setInterval(function () {

  const now = new Date().getTime();

  const difference = weddingDate - now;

  if (difference <= 0) {
    clearInterval(countdown);

    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);
