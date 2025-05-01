let playing = true;
const audio = document.getElementById('audio');
const btn = document.querySelector('.play-btn');
const lyricsContainer = document.getElementById('lyrics');
const progress = document.getElementById('progress');

function togglePlay() {
  playing = !playing;
  if (playing) {
    audio.pause();
    btn.textContent = '▶️';
  } else {
    audio.play();
    btn.textContent = '⏸️';
  }
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.addEventListener('loadedmetadata', () => {
  document.getElementById('duration').textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  document.getElementById('currentTime').textContent = formatTime(audio.currentTime);

  updateLyrics(); // update lirik saat audio berjalan
});

function showHearts() {
  const heartContainer = document.getElementById('heart-container');
  heartContainer.innerHTML = '';

  const numberOfHearts = 80 + Math.floor(Math.random() * 21); // antara 80–100 hati

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 16 + Math.random() * 24 + 'px';
    heart.style.animationDelay = (Math.random() * 1.5) + 's';

    heartContainer.appendChild(heart);
  }

  setTimeout(() => {
    heartContainer.innerHTML = '';
  }, 7000);
}

// ======================
// 🎵 LIRIK OTOMATIS
// ======================
const lyricsLines = [
  { time: 0, text: "And I was never good at tellin' jokes, but the punch line goes" },
  { time: 6, text: "I'll get older, but your lovers stay my age" },
  { time: 11, text: "From when your Brooklyn broke my skin and bones" },
  { time: 16, text: "I'm a soldier who's returning half her weight" },
  { time: 22, text: "And did the twin flame bruise paint you blue?" },
  { time: 27, text: "Just between us, did the love affair maim you too?" },
];

let currentLine = 0;

function updateLyrics() {
  if (currentLine < lyricsLines.length && audio.currentTime >= lyricsLines[currentLine].time) {
    lyricsContainer.innerHTML = `<p>${lyricsLines[currentLine].text}</p>`;
    currentLine++;
  }
}

// 🔄 Reset lirik saat lagu diputar ulang atau diganti
audio.addEventListener('play', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
});

audio.addEventListener('ended', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
});
