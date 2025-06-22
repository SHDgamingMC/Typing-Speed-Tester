const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Consistency is the key to mastery.",
  "Focus and accuracy are essential for speed.",
  "JavaScript makes websites interactive and fun."
];

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

let timerInterval;
let startTime;
let testStarted = false;
const maxTime = 60; // seconds
let targetSentence = "";

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function resetTest() {
  clearInterval(timerInterval);
  testStarted = false;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  timerEl.textContent = maxTime.toFixed(2);
  targetSentence = getRandomSentence();
  sentenceEl.textContent = targetSentence;
}

function calculateWPMandAccuracy() {
  const inputText = inputEl.value.trim();

  let correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === targetSentence[i]) correctChars++;
  }

  const wordCount = inputText.split(" ").filter(word => word).length;
  const elapsedTime = (new Date().getTime() - startTime) / 1000;

  const wpm = elapsedTime > 0 ? ((wordCount / elapsedTime) * 60).toFixed(2) : 0;
  const accuracy = targetSentence.length > 0 ? ((correctChars / targetSentence.length) * 100).toFixed(2) : 0;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
}

function finishTest() {
  clearInterval(timerInterval);
  calculateWPMandAccuracy();
  inputEl.disabled = true;
  testStarted = false;
}

function startTest() {
  startTime = new Date().getTime();

  timerInterval = setInterval(() => {
    const elapsed = (new Date().getTime() - startTime) / 1000;
    const remaining = Math.max(0, maxTime - elapsed).toFixed(2);
    timerEl.textContent = remaining;

    calculateWPMandAccuracy();

    // End if time runs out
    if (elapsed >= maxTime) {
      finishTest();
    }
  }, 100);
}

inputEl.addEventListener("input", () => {
  const userText = inputEl.value;

  if (!testStarted && userText.trim().length > 0) {
    testStarted = true;
    startTest();
  }

  calculateWPMandAccuracy();

  // End early if typed exactly
  if (userText.trim() === targetSentence.trim()) {
    finishTest();
  }
});

restartBtn.addEventListener("click", resetTest);

// Load first sentence on page load
resetTest();
