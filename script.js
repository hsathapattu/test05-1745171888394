// Schedule data for 2025
const schedule = {
  new_year_2025: [
    {
      event: "Punya Kaalaya (Auspicious Time)",
      start_time: "2025-04-13T20:57:00",
      end_time: "2025-04-14T09:45:00",
      description: "Avoid work and prepare for the New Year.",
      color: "N/A",
      direction: "N/A",
      translations: {
        sinhala: "පුණ්‍ය කාලය",
        tamil: "புண்ணிய காலம்"
      }
    },
    {
      event: "Dawn of the New Year",
      start_time: "2025-04-14T03:21:00",
      end_time: "2025-04-14T03:21:00",
      description: "The exact moment of the New Year, when the sun moves into Aries.",
      color: "N/A",
      direction: "N/A",
      translations: {
        sinhala: "අලුත් අවුරුදු උදාව",
        tamil: "புத்தாண்டு விடியல்"
      }
    },
    {
      event: "Lighting the Hearth",
      start_time: "2025-04-14T04:04:00",
      end_time: "2025-04-14T06:00:00",
      description: "Light the fire to start cooking for the New Year.",
      color: "Copper",
      direction: "South",
      translations: {
        sinhala: "ගිනි මෙලවීම",
        tamil: "புத்தாண்டு அடுப்பு மூட்டுதல்"
      }
    },
    {
      event: "Commencing Work, Exchanging Gifts, and Having Meals",
      start_time: "2025-04-14T06:44:00",
      end_time: "2025-04-14T06:44:00",
      description: "Eat kiribath, exchange gifts, and start activities.",
      color: "Pearl White",
      direction: "South",
      translations: {
        sinhala: "වැඩ ඇල්ලීම හා ගනු දෙනු කිරීම හා ආහාර අනුභවය",
        tamil: "பணி தொடங்குதல், பரிசு பரிமாற்றம் மற்றும் உணவு உண்ணுதல்"
      }
    },
    {
      event: "Anointing of Oil",
      start_time: "2025-04-16T09:04:00",
      end_time: "2025-04-16T09:04:00",
      description: "A ritual for health and prosperity, often involving elders.",
      color: "Green",
      direction: "North",
      translations: {
        sinhala: "හිස තෙල් ගෑම",
        tamil: "எண்ணெய் தடவுதல்"
      }
    },
    {
      event: "Leaving for Work",
      start_time: "2025-04-17T09:03:00",
      end_time: "2025-04-17T09:03:00",
      description: "The first business or work activity of the year.",
      color: "Gold",
      direction: "North",
      translations: {
        sinhala: "රැකීරක්ෂා සදහා පිටත්ව යෑම",
        tamil: "வேலைக்குச் செல்லுதல்"
      }
    }
  ]
};

// Language state
let currentLanguage = 'tamil';

// Leaderboard data
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Request notification permission
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        alert('Please allow notifications to get reminders!');
      }
    });
  }
}

// Change language and re-render
function changeLanguage(lang) {
  currentLanguage = lang;
  renderSchedule();
  updateCountdown();
}

// Real-time clock (Sri Lanka Standard Time, UTC+5:30)
function updateClock() {
  const now = new Date();
  const offset = 5.5 * 60 * 60 * 1000; // UTC+5:30
  const sriLankaTime = new Date(now.getTime() + offset);
  document.getElementById('current-time').textContent = sriLankaTime.toLocaleString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Render the schedule
function renderSchedule() {
  const scheduleDiv = document.getElementById('schedule');
  scheduleDiv.innerHTML = '';

  schedule.new_year_2025.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';
    eventDiv.style.animationDelay = `${index * 0.2}s`;

    const eventTitle = document.createElement('h3');
    eventTitle.textContent = currentLanguage === 'sinhala'
      ? event.translations.sinhala
      : currentLanguage === 'tamil'
      ? event.translations.tamil
      : event.event;
    eventTitle.className = currentLanguage === 'sinhala' ? 'sinhala' : currentLanguage === 'tamil' ? 'tamil' : '';

    const eventTime = document.createElement('p');
    eventTime.textContent = `${new Date(event.start_time).toLocaleString()}${event.start_time !== event.end_time ? ` - ${new Date(event.end_time).toLocaleString()}` : ''}`;

    const eventDetails = document.createElement('p');
    eventDetails.textContent = `Color: ${event.color}, Direction: ${event.direction}`;

    const eventDescription = document.createElement('p');
    eventDescription.textContent = event.description;

    eventDiv.appendChild(eventTitle);
    eventDiv.appendChild(eventTime);
    eventDiv.appendChild(eventDetails);
    eventDiv.appendChild(eventDescription);
    scheduleDiv.appendChild(eventDiv);
  });
}

// Update countdown
function updateCountdown() {
  const now = new Date();
  const upcoming = schedule.new_year_2025.find(event => new Date(event.start_time) > now);

  if (upcoming) {
    const nextEventSpan = document.getElementById('next-event');
    nextEventSpan.textContent = currentLanguage === 'sinhala'
      ? upcoming.translations.sinhala
      : currentLanguage === 'tamil'
      ? upcoming.translations.tamil
      : upcoming.event;
    nextEventSpan.className = currentLanguage === 'sinhala' ? 'sinhala' : currentLanguage === 'tamil' ? 'tamil' : '';

    const diff = new Date(upcoming.start_time) - now;
    const fifteenMinutes = 15 * 60 * 1000;

    if (diff > fifteenMinutes && diff <= fifteenMinutes + 1000) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Upcoming Event', {
          body: `Get ready for ${upcoming.event} at ${new Date(upcoming.start_time).toLocaleTimeString()}! Wear ${upcoming.color} and face ${upcoming.direction}.`,
          icon: 'https://img.icons8.com/color/96/000000/sun--v1.png'
        });
      }
    }

    if (diff <= 0) {
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      setTimeout(updateCountdown, 1000);
    } else {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
  } else {
    document.getElementById('next-event').textContent = 'All events completed!';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
  }
}

// Update leaderboard
function updateLeaderboard(player, score, game) {
  leaderboard.push({ player, score, game, date: new Date().toLocaleString() });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';
  leaderboard.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.player} - ${entry.score} points (${entry.game}) - ${entry.date}`;
    leaderboardList.appendChild(li);
  });
}

// Celebrate winning with confetti and sound
function celebrateWin() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  const cheer = new Audio('https://www.soundjay.com/human/crowd-cheer-2.mp3');
  cheer.play();
}

// Game Functions
function openGame(gameId) {
  const modal = document.getElementById('game-modal');
  const gameContent = document.getElementById('game-content');
  modal.style.display = 'flex';

  if (gameId === 'aliyata-eha') {
    gameContent.innerHTML = `
      <h3>Aliyata Eha Thabeema</h3>
      <p>Drag the eye to place it on the elephant within 30 seconds!</p>
      <div id="aliyata-eha-game">
        <div id="elephant"></div>
        <div id="eye"></div>
        <div id="timer">30</div>
      </div>
    `;
    startAliyataEha();
  } else if (gameId === 'pora-pol') {
    gameContent.innerHTML = `
      <h3>Pora Pol Gaseema</h3>
      <p>Race your coconut shells to the finish line! Avoid obstacles.</p>
      <div id="pora-pol-game">
        <div class="player-lane" id="player1-lane">
          <div class="shell" id="shell1"></div>
        </div>
        <div class="player-lane" id="player2-lane">
          <div class="shell" id="shell2"></div>
        </div>
        <div class="finish-line"></div>
        <div id="timer">60</div>
      </div>
    `;
    startPoraPol();
  } else if (gameId === 'olinda-keliya') {
    gameContent.innerHTML = `
      <h3>Olinda Keliya</h3>
      <p>Take turns sowing seeds and capture the most to win!</p>
      <div id="olinda-keliya-game">
        <div id="olinda-board">
          <div class="store" id="store1">0</div>
          <div class="store" id="store2">0</div>
        </div>
        <p id="player-turn">Player 1's Turn</p>
      </div>
    `;
    startOlindaKeliya();
  }
}

function closeGame() {
  const modal = document.getElementById('game-modal');
  modal.style.display = 'none';
  document.getElementById('game-content').innerHTML = '';
}

// Aliyata Eha Thabeema Game (Updated with Touch Support)
function startAliyataEha() {
  const eye = document.getElementById('eye');
  const gameArea = document.getElementById('aliyata-eha-game');
  const timerDisplay = document.getElementById('timer');
  let isDragging = false;
  let timeLeft = 30;
  let timer;
  let touchX = 0;
  let touchY = 0;

  eye.style.left = '10px';
  eye.style.top = '10px';

  const correctX = gameArea.clientWidth / 2 - 50;
  const correctY = gameArea.clientHeight / 2 - 80;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('game-content').innerHTML = `
        <h3>Time's Up!</h3>
        <p>You ran out of time. Try again!</p>
        <button onclick="openGame('aliyata-eha')">Play Again</button>
      `;
    }
  }, 1000);

  // Mouse events
  eye.addEventListener('mousedown', (e) => {
    isDragging = true;
    eye.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = gameArea.getBoundingClientRect();
      let newX = e.clientX - rect.left - 10;
      let newY = e.clientY - rect.top - 10;
      newX = Math.max(0, Math.min(newX, rect.width - 20));
      newY = Math.max(0, Math.min(newY, rect.height - 20));
      eye.style.left = `${newX}px`;
      eye.style.top = `${newY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      eye.style.cursor = 'grab';
      clearInterval(timer);
      endAliyataEha();
    }
  });

  // Touch events
  eye.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const rect = gameArea.getBoundingClientRect();
      let newX = touch.clientX - rect.left - 10;
      let newY = touch.clientY - rect.top - 10;
      newX = Math.max(0, Math.min(newX, rect.width - 20));
      newY = Math.max(0, Math.min(newY, rect.height - 20));
      eye.style.left = `${newX}px`;
      eye.style.top = `${newY}px`;
      e.preventDefault();
    }
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      clearInterval(timer);
      endAliyataEha();
    }
  });

  function endAliyataEha() {
    const eyeX = parseFloat(eye.style.left);
    const eyeY = parseFloat(eye.style.top);
    const distance = Math.sqrt((eyeX - correctX) ** 2 + (eyeY - correctY) ** 2);
    const maxDistance = 100;
    const score = Math.max(0, Math.floor((maxDistance - distance) * 100 / maxDistance));

    if (distance < 30) {
      eye.classList.add('correct');
      document.getElementById('game-content').innerHTML = `
        <h3>Subha Aluth Avurudak Wewa!</h3>
        <p>You placed the eye perfectly! Score: ${score}</p>
        <button onclick="openGame('aliyata-eha')">Play Again</button>
      `;
      celebrateWin();
      updateLeaderboard('Player', score, 'Aliyata Eha Thabeema');
    } else {
      document.getElementById('game-content').innerHTML = `
        <h3>Try Again!</h3>
        <p>You missed the spot. Score: ${score}. Try again!</p>
        <button onclick="openGame('aliyata-eha')">Play Again</button>
      `;
      updateLeaderboard('Player', score, 'Aliyata Eha Thabeema');
    }
  }
}

// Pora Pol Gaseema Game (Enhanced with Touch Support)
function startPoraPol() {
  const gameArea = document.getElementById('pora-pol-game');
  const shell1 = document.getElementById('shell1');
  const shell2 = document.getElementById('shell2');
  const timerDisplay = document.getElementById('timer');
  let isDragging1 = false;
  let isDragging2 = false;
  let timeLeft = 60;
  let timer;
  let speed1 = 1;
  let speed2 = 1;

  shell1.style.left = '10px';
  shell2.style.left = '10px';

  const lane1 = document.getElementById('player1-lane');
  const lane2 = document.getElementById('player2-lane');
  for (let i = 0; i < 3; i++) {
    const obstacle1 = document.createElement('div');
    obstacle1.className = 'obstacle';
    obstacle1.style.left = `${100 + i * 100}px`;
    obstacle1.style.top = `${Math.random() * 60 + 20}px`;
    lane1.appendChild(obstacle1);

    const obstacle2 = document.createElement('div');
    obstacle2.className = 'obstacle';
    obstacle2.style.left = `${100 + i * 100}px`;
    obstacle2.style.top = `${Math.random() * 60 + 20}px`;
    lane2.appendChild(obstacle2);
  }

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('game-content').innerHTML = `
        <h3>Time's Up!</h3>
        <p>No one reached the finish line. Try again!</p>
        <button onclick="openGame('pora-pol')">Play Again</button>
      `;
    }
  }, 1000);

  // Mouse events for shell1
  shell1.addEventListener('mousedown', (e) => {
    isDragging1 = true;
    shell1.style.cursor = 'grabbing';
    e.preventDefault();
  });

  // Mouse events for shell2
  shell2.addEventListener('mousedown', (e) => {
    isDragging2 = true;
    shell2.style.cursor = 'grabbing';
    e.preventDefault();
  });

  // Touch events for shell1
  shell1.addEventListener('touchstart', (e) => {
    isDragging1 = true;
    e.preventDefault();
  });

  // Touch events for shell2
  shell2.addEventListener('touchstart', (e) => {
    isDragging2 = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    const rect = gameArea.getBoundingClientRect();
    if (isDragging1) {
      let newX = e.clientX - rect.left - 25;
      newX = Math.max(10, Math.min(newX, rect.width - 60));
      shell1.style.left = `${newX}px`;
      checkPoraPolCollision(1, shell1, speed1);
    }
    if (isDragging2) {
      let newX = e.clientX - rect.left - 25;
      newX = Math.max(10, Math.min(newX, rect.width - 60));
      shell2.style.left = `${newX}px`;
      checkPoraPolCollision(2, shell2, speed2);
    }
  });

  document.addEventListener('touchmove', (e) => {
    const rect = gameArea.getBoundingClientRect();
    const touch = e.touches[0];
    if (isDragging1) {
      let newX = touch.clientX - rect.left - 25;
      newX = Math.max(10, Math.min(newX, rect.width - 60));
      shell1.style.left = `${newX}px`;
      checkPoraPolCollision(1, shell1, speed1);
      e.preventDefault();
    }
    if (isDragging2) {
      let newX = touch.clientX - rect.left - 25;
      newX = Math.max(10, Math.min(newX, rect.width - 60));
      shell2.style.left = `${newX}px`;
      checkPoraPolCollision(2, shell2, speed2);
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging1 = false;
    isDragging2 = false;
    shell1.style.cursor = 'grab';
    shell2.style.cursor = 'grab';
  });

  document.addEventListener('touchend', () => {
    isDragging1 = false;
    isDragging2 = false;
  });

  function checkPoraPolCollision(player, shell, speed) {
    const laneId = `player${player}-lane`;
    document.querySelectorAll(`#${laneId} .obstacle`).forEach(obstacle => {
      const shellRect = shell.getBoundingClientRect();
      const obsRect = obstacle.getBoundingClientRect();
      if (shellRect.left < obsRect.right && shellRect.right > obsRect.left &&
          shellRect.top < obsRect.bottom && shellRect.bottom > obsRect.top) {
        speed = 0.5;
        setTimeout(() => speed = 1, 2000);
      }
    });

    const shellRect = shell.getBoundingClientRect();
    const finishRect = document.querySelector('.finish-line').getBoundingClientRect();
    if (shellRect.right >= finishRect.left) {
      clearInterval(timer);
      const score = Math.floor(1000 / (60 - timeLeft));
      document.getElementById('game-content').innerHTML = `
        <h3>Player ${player} Wins!</h3>
        <p>Congratulations! Score: ${score}</p>
        <button onclick="openGame('pora-pol')">Play Again</button>
      `;
      celebrateWin();
      updateLeaderboard(`Player ${player}`, score, 'Pora Pol Gaseema');
    }
  }
}

// Olinda Keliya Game
let board = [
  [4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4]
];
let stores = [0, 0];
let currentPlayer = 0;

function startOlindaKeliya() {
  const olindaBoard = document.getElementById('olinda-board');
  const store1 = document.getElementById('store1');
  const store2 = document.getElementById('store2');
  const playerTurn = document.getElementById('player-turn');

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 7; col++) {
      const hole = document.createElement('div');
      hole.className = 'hole';
      hole.id = `hole-${row}-${col}`;
      hole.textContent = board[row][col];
      hole.addEventListener('click', () => sowSeeds(row, col));
      hole.addEventListener('touchend', () => sowSeeds(row, col)); // Touch support
      olindaBoard.appendChild(hole);
    }
  }

  store1.textContent = stores[0];
  store2.textContent = stores[1];
  playerTurn.textContent = `Player 1's Turn`;
}

function sowSeeds(row, col) {
  if (row !== currentPlayer) {
    alert("It's not your turn or you can't sow from the opponent's row!");
    return;
  }

  let seeds = board[row][col];
  if (seeds === 0) {
    alert("This hole is empty!");
    return;
  }

  board[row][col] = 0;
  document.getElementById(`hole-${row}-${col}`).textContent = 0;

  let currentRow = row;
  let currentCol = col;
  let sowing = true;

  const sow = () => {
    if (seeds <= 0) {
      sowing = false;
      return;
    }

    currentCol++;
    if (currentCol > 6) {
      currentCol = 0;
      currentRow = currentRow === 0 ? 1 : 0;
    }

    if (currentRow === currentPlayer && currentCol === 0 && seeds === 1) {
      stores[currentPlayer]++;
      document.getElementById(`store${currentPlayer + 1}`).textContent = stores[currentPlayer];
      seeds--;
      sowing = false;
      checkCapture(currentRow, currentCol);
      return;
    }

    board[currentRow][currentCol]++;
    const hole = document.getElementById(`hole-${currentRow}-${currentCol}`);
    hole.textContent = board[currentRow][currentCol];

    const seed = document.createElement('div');
    seed.className = 'seed';
    const holeRect = hole.getBoundingClientRect();
    seed.style.left = `${holeRect.left + holeRect.width / 2 - 5}px`;
    seed.style.top = `${holeRect.top + holeRect.height / 2 - 5}px`;
    document.body.appendChild(seed);
    seed.style.animation = 'sowSeed 0.5s forwards';
    seed.addEventListener('animationend', () => seed.remove());

    seeds--;
    setTimeout(sow, 300);
  };

  sow();

  setTimeout(() => {
    if (!sowing) {
      checkCapture(currentRow, currentCol);
      checkGameOver();
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      document.getElementById('player-turn').textContent = `Player ${currentPlayer + 1}'s Turn`;
    }
  }, seeds * 300);
}

function checkCapture(row, col) {
  if (row === currentPlayer && board[row][col] === 1) {
    const opponentRow = row === 0 ? 1 : 0;
    const opponentSeeds = board[opponentRow][col];
    if (opponentSeeds > 0) {
      board[opponentRow][col] = 0;
      document.getElementById(`hole-${opponentRow}-${col}`).textContent = 0;
      stores[currentPlayer] += opponentSeeds + 1;
      board[row][col] = 0;
      document.getElementById(`hole-${row}-${col}`).textContent = 0;
      document.getElementById(`store${currentPlayer + 1}`).textContent = stores[currentPlayer];
    }
  }
}

function checkGameOver() {
  const player1Seeds = board[0].reduce((sum, val) => sum + val, 0);
  const player2Seeds = board[1].reduce((sum, val) => sum + val, 0);

  if (player1Seeds === 0 || player2Seeds === 0) {
    stores[0] += player1Seeds;
    stores[1] += player2Seeds;
    board[0].fill(0);
    board[1].fill(0);
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 7; col++) {
        document.getElementById(`hole-${row}-${col}`).textContent = 0;
      }
    }
    document.getElementById('store1').textContent = stores[0];
    document.getElementById('store2').textContent = stores[1];

    let winner = stores[0] > stores[1] ? 1 : stores[1] > stores[0] ? 2 : 0;
    if (winner === 0) {
      document.getElementById('game-content').innerHTML = `
        <h3>It's a Tie!</h3>
        <p>Both players have ${stores[0]} seeds.</p>
        <button onclick="openGame('olinda-keliya')">Play Again</button>
      `;
    } else {
      const score = stores[winner - 1] * 10;
      document.getElementById('game-content').innerHTML = `
        <h3>Player ${winner} Wins!</h3>
        <p>Congratulations! You collected ${stores[winner - 1]} seeds. Score: ${score}</p>
        <button onclick="openGame('olinda-keliya')">Play Again</button>
      `;
      celebrateWin();
      updateLeaderboard(`Player ${winner}`, score, 'Olinda Keliya');
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  requestNotificationPermission();
  renderSchedule();
  updateClock();
  updateCountdown();
  setInterval(updateClock, 1000);
  setInterval(updateCountdown, 1000);
  updateLeaderboard('', 0, '');
});