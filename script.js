const audio = document.getElementById("global-audio");
const playBtn = document.getElementById("playToggle");

// cek apakah halaman pertama
const isHome =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname.endsWith("/");

// ===============================
// LOGIKA HOME (ULANG DARI AWAL)
// ===============================
if (isHome) {
  audio.currentTime = 0;
  audio.pause();
  localStorage.removeItem("musicTime");
  localStorage.removeItem("musicPlaying");
  playBtn.textContent = "▶";
} else {
  // ===============================
  // RESTORE DI PAGE SELAIN HOME
  // ===============================
  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  const isPlaying = localStorage.getItem("musicPlaying");
  if (isPlaying === "true") {
    audio.volume = 0.5;
    audio.play().catch(() => {});
    playBtn.textContent = "⏸";
  }
}

// ===============================
// SIMPAN WAKTU LAGU
// ===============================
setInterval(() => {
  if (!audio.paused) {
    localStorage.setItem("musicTime", audio.currentTime);
  }
}, 1000);

// ===============================
// TOGGLE PLAY / PAUSE
// ===============================
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.5;
    audio.play();
    localStorage.setItem("musicPlaying", "true");
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    localStorage.setItem("musicPlaying", "false");
    playBtn.textContent = "▶";
  }
});

// volume aman
audio.volume = 0.5;
