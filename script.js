const resetBtn = document.querySelector("#reset");
const playBtn = document.querySelector("#play");
const timerEl = document.querySelector("#timer");
const root = document.querySelector(":root");
const increaseBtn = document.querySelector("#increaseTime");
const decreaseBtn = document.querySelector("#decreaseTime");
const startTimeEl = document.querySelector("#startTime");

let startMinutes = 1;
let totalSeconds = startMinutes * 60;
let currentSeconds = totalSeconds;
let playing = false;
let timerInterval = null;

timerEl.innerText = formatTime(totalSeconds);

playBtn.addEventListener("click", () => {
  playing = !playing;
  playBtn.classList.toggle("play");
  playBtn.classList.toggle("bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");

  if (playing) {
    timerInterval = setInterval(run, 1000);
  } else {
    clearInterval(timerInterval);
  }
});

resetBtn.addEventListener("click", resetAll);

increaseBtn.addEventListener("click", () => {
  if (!playing) {
    startMinutes++;
    startTimeEl.innerText = startMinutes;
    resetAll();
  }
});

decreaseBtn.addEventListener("click", () => {
  if (!playing && startMinutes > 1) {
    startMinutes--;
    startTimeEl.innerText = startMinutes;
    resetAll();
  }
});

function run() {
  if (playing) {
    currentSeconds--;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty("--degrees", calcDeg());
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`;
}

function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

function resetAll() {
  playing = false;
  clearInterval(timerInterval);
  playBtn.classList.remove("play", "bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");

  totalSeconds = startMinutes * 60;
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty("--degrees", "0deg");
}
