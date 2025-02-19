
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let laps = [];
let savedSessions = JSON.parse(localStorage.getItem('savedSessions')) || [];
let currentMode = 'stopwatch';
const timeDisplay = document.querySelector('.time-display');
const startButton = document.querySelector('.start-btn');
const lapsList = document.getElementById('laps-list');
const sessionsList = document.getElementById('sessions-list');

// Initialize theme from localStorage or default to light
document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === mode) {
            btn.classList.add('active');
        }
    });
    resetTimer();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startButton.textContent = 'Pause';
        startButton.classList.add('active');
    } else {
        stopTimer();
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startButton.textContent = 'Resume';
        startButton.classList.remove('active');
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    startButton.textContent = 'Start';
    laps = [];
    updateLapsList();
    updateStats();
}

function recordLap() {
    if (isRunning) {
        laps.push(elapsedTime);
        updateLapsList();
        updateStats();
    }
}

function saveSession() {
    if (elapsedTime > 0) {
        const session = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            mode: currentMode,
            totalTime: formatTime(elapsedTime),
            laps: laps.map(lap => formatTime(lap))
        };
        savedSessions.unshift(session);
        localStorage.setItem('savedSessions', JSON.stringify(savedSessions));
        updateSessionsList();
    }
}

function updateStats() {
    if (laps.length > 0) {
        const bestLap = Math.min(...laps);
        const avgLap = laps.reduce((a, b) => a + b) / laps.length;
        document.getElementById('best-lap').textContent = formatTime(bestLap);
        document.getElementById('avg-lap').textContent = formatTime(avgLap);
        document.getElementById('total-laps').textContent = laps.length;
    } else {
        document.getElementById('best-lap').textContent = '--:--:--';
        document.getElementById('avg-lap').textContent = '--:--:--';
        document.getElementById('total-laps').textContent = '0';
    }
}

// ... (rest of the JavaScript functions remain the same)

// Initialize the app

// xxxxxxxxxxxxxxxxxxxxxx


function deleteSession(id) {
    savedSessions = savedSessions.filter(session => session.id !== id);
    localStorage.setItem('savedSessions', JSON.stringify(savedSessions));
    updateSessionsList();
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function updateLapsList() {
    lapsList.innerHTML = laps.map((lap, index) => `
        <div class="lap-item">
            <span>Lap ${index + 1}</span>
            <span>${formatTime(lap)}</span>
        </div>
    `).join('');
}

function updateSessionsList() {
    sessionsList.innerHTML = savedSessions.map(session => `
        <div class="session-item">
            <div>
                <strong>${session.date}</strong>
                <div>Time: ${session.totalTime}</div>
                <div>Laps: ${session.laps.length}</div>
            </div>
            <button class="delete-session" style='color:red;' onclick="deleteSession(${session.id})">Delete</button>
        </div>
    `).join('');
}

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    
    document.title = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
updateSessionsList();
