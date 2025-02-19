
        // Previous timer script remains the same

        // Add game functionality
        let currentGame = null;
        let gameTimer = null;
        let gameScore = 0;
        let gameState = {};

        function startGame(game) {
            currentGame = game;
            gameScore = 0;
            document.querySelector('.game-overlay').style.display = 'flex';
            document.querySelector('.game-stats').textContent = 'Score: 0';
            
            switch(game) {
                case 'quicktap':
                    startQuickTap();
                    break;
                case 'memory':
                    startMemoryTimer();
                    break;
                case 'speedmath':
                    startSpeedMath();
                    break;
                case 'reflex':
                    startReflexRace();
                    break;
            }
        }

        function closeGame() {
            document.querySelector('.game-overlay').style.display = 'none';
            if (gameTimer) clearInterval(gameTimer);
            currentGame = null;
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML = '';
        }

        function startQuickTap() {
            const gameArea = document.getElementById('game-area');
            gameArea.style.position = 'relative';
            gameArea.style.height = '400px';
            
            let timeLeft = 30;
            updateGameStats(`Time: ${timeLeft}s | Score: ${gameScore}`);

            function createTarget() {
                const target = document.createElement('div');
                target.className = 'game-target';
                target.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
                target.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
                target.onclick = () => {
                    gameScore++;
                    updateGameStats(`Time: ${timeLeft}s | Score: ${gameScore}`);
                    gameArea.removeChild(target);
                    createTarget();
                };
                gameArea.appendChild(target);
            }

            createTarget();
            
            gameTimer = setInterval(() => {
                timeLeft--;
                updateGameStats(`Time: ${timeLeft}s | Score: ${gameScore}`);
                if (timeLeft <= 0) {
                    clearInterval(gameTimer);
                    endGame();
                }
            }, 1000);
        }

        function startMemoryTimer() {
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML = `<div class="memory-grid"></div>`;
            const grid = gameArea.querySelector('.memory-grid');
            
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            let sequence = [];
            let playerSequence = [];
            let level = 1;

            function showSequence() {
                let i = 0;
                sequence.push(colors[Math.floor(Math.random() * colors.length)]);
                
                const interval = setInterval(() => {
                    if (i < sequence.length) {
                        grid.style.backgroundColor = sequence[i];
                        setTimeout(() => {
                            grid.style.backgroundColor = 'transparent';
                        }, 500);
                        i++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            enablePlayerInput();
                        }, 1000);
                    }
                }, 1000);
            }

            function enablePlayerInput() {
                grid.innerHTML = '';
                colors.forEach(color => {
                    const cell = document.createElement('div');
                    cell.className = 'memory-cell';
                    cell.style.backgroundColor = color;
                    cell.onclick = () => checkColor(color);
                    grid.appendChild(cell);
                });
            }

            function checkColor(color) {
                playerSequence.push(color);
                if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
                    endGame();
                    return;
                }
                
                if (playerSequence.length === sequence.length) {
                    playerSequence = [];
                    level++;
                    gameScore = level - 1;
                    updateGameStats(`Level: ${level} | Score: ${gameScore}`);
                    setTimeout(showSequence, 1000);
                }
            }

            showSequence();
        }

        function startSpeedMath() {
            const gameArea = document.getElementById('game-area');
            let timeLeft = 60;
            
            function createProblem() {
                const num1 = Math.floor(Math.random() * 20);
                const num2 = Math.floor(Math.random() * 20);
                const answer = num1 + num2;
                
                gameArea.innerHTML = `
                    <div class="math-problem">${num1} + ${num2} = ?</div>
                    <input type="number" class="math-input" onchange="checkAnswer(${answer}, this)">
                `;
                document.querySelector('.math-input').focus();
            }

            gameTimer = setInterval(() => {
                timeLeft--;
                updateGameStats(`Time: ${timeLeft}s | Score: ${gameScore}`);
                if (timeLeft <= 0) endGame();
            }, 1000);

            createProblem();
            window.checkAnswer = function(correct, input) {
                if (parseInt(input.value) === correct) {
                    gameScore++;
                    updateGameStats(`Time: ${timeLeft}s | Score: ${gameScore}`);
                    createProblem();
                }
            };
        }

        function startReflexRace() {
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML = `<div class="reflex-box"></div>`;
            const box = gameArea.querySelector('.reflex-box');
            
            let waiting = false;
            let startTime;
            
            function startTest() {
                box.style.backgroundColor = 'red';
                waiting = true;
                const delay = 1000 + Math.random() * 4000;
                
                setTimeout(() => {
                    if (waiting) {
                        box.style.backgroundColor = 'green';
                        startTime = Date.now();
                    }
                }, delay);
            }

            box.onclick = () => {
                if (!waiting) {
                    startTest();
                } else if (box.style.backgroundColor === 'green') {
                    const reactionTime = Date.now() - startTime;
                    gameScore = Math.max(gameScore, reactionTime);
                    updateGameStats(`Reaction Time: ${reactionTime}ms`);
                    waiting = false;
                    setTimeout(startTest, 1000);
                } else {
                    updateGameStats('Too early! Try again');
                    waiting = false;
                    setTimeout(startTest, 1000);
                }
            };

            startTest();
        }

        function updateGameStats(text) {
            document.querySelector('.game-stats').textContent = text;
        }

        function endGame() {
            const scores = JSON.parse(localStorage.getItem(`${currentGame}-scores`) || '[]');
            scores.push(gameScore);
            scores.sort((a, b) => b - a);
            localStorage.setItem(`${currentGame}-scores`, JSON.stringify(scores.slice(0, 5)));
            
            const leaderboard = document.querySelector('.leaderboard');
            leaderboard.innerHTML = `
                <h3>Top Scores</h3>
                ${scores.slice(0, 5).map((score, i) => `
                    <div class="score-item">
                        <span>#${i + 1}</span>
                        <span>${score}</span>
                    </div>
                `).join('')}
            `;
        }
    