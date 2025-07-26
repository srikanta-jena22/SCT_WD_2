let startTime, updatedTime, difference = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function updateDisplay(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  display.textContent = `00:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  updateDisplay(0);
  lapsList.innerHTML = "";
}

function recordLap() {
  if (!running) return;
  const li = document.createElement("li");
  li.textContent = display.textContent;
  lapsList.appendChild(li);
}

// Button events
startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
lapBtn.onclick = recordLap;
