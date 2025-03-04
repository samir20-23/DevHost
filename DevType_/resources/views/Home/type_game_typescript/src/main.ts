 
import './style.css' 
// Text samples for typing tests
import Phaser from 'phaser';

const TEXT_SAMPLES = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "In the world of technology, innovation never stops.",
  "Coding is not just about writing code, it's about solving problems.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The best way to predict the future is to create it.",
  "Learning never exhausts the mind.",
  "Simplicity is the ultimate sophistication.",
  "Code is read much more often than it is written."
];

class TypingGame {
  constructor() {
    this.textDisplay = document.getElementById('text-display');
    this.userInput = document.getElementById('user-input');
    this.timerDisplay = document.getElementById('timer');
    this.wpmDisplay = document.getElementById('wpm-display');
    this.accuracyDisplay = document.getElementById('accuracy-display');
    this.errorsDisplay = document.getElementById('errors-display');
    this.restartBtn = document.getElementById('restart-btn');
    
    this.currentText = '';
    this.startTime = 0;
    this.timeLimit = 30;
    this.timer = 0;
    this.intervalId = null;

    this.totalChars = 0;
    this.correctChars = 0;
    this.errors = 0;

    this.init();
  }

  init() {
    this.restartBtn.addEventListener('click', () => this.setupGame());
    this.userInput.addEventListener('input', () => this.handleUserInput());
    this.setupGame();
  }

  setupGame() {
    this.resetStats();
    this.currentText = this.getRandomText();
    this.displayText();
    this.userInput.value = '';
    this.userInput.disabled = false;
    this.userInput.focus();
    this.startTimer();
  }

  resetStats() {
    this.totalChars = 0;
    this.correctChars = 0;
    this.errors = 0;
    this.wpmDisplay.textContent = '0';
    this.accuracyDisplay.textContent = '100%';
    this.errorsDisplay.textContent = '0';
    if (this.intervalId) clearInterval(this.intervalId);
    this.timer = this.timeLimit;
    this.timerDisplay.textContent = this.timer;
  }

  getRandomText() {
    return TEXT_SAMPLES[Math.floor(Math.random() * TEXT_SAMPLES.length)];
  }

  displayText() {
    this.textDisplay.innerHTML = this.currentText.split('').map(char => `<span>${char}</span>`).join('');
  }

  startTimer() {
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      this.timer--;
      this.timerDisplay.textContent = this.timer;
      if (this.timer <= 0) this.endGame();
    }, 1000);
  }

  handleUserInput() {
    const typedText = this.userInput.value;
    const textSpans = this.textDisplay.querySelectorAll('span');
    this.totalChars = typedText.length;
    this.correctChars = 0;
    this.errors = 0;
    
    let allCorrect = true;
  
    textSpans.forEach((span, index) => {
      if (index < typedText.length) {
        if (typedText[index] === span.textContent) {
          span.classList.add('correct');
          span.classList.remove('incorrect');
          this.correctChars++;
        } else {
          span.classList.add('incorrect');
          span.classList.remove('correct');
          this.errors++;
          allCorrect = false;
        }
      } else {
        span.classList.remove('correct', 'incorrect');
      }
    });
  
    if (!allCorrect) {
      this.userInput.classList.add('error-shake'); // Shake input field
      setTimeout(() => this.userInput.classList.remove('error-shake'), 300);
    }
  
    if (typedText.length === this.currentText.length) {
      if (this.errors > 0) {
        this.textDisplay.classList.add('finished-error'); // Turn text red
      } else {
        alert("Perfect! No mistakes!");
      }
      this.endGame();
    }
  
    this.updateStats();
  }
  
  

  updateStats() {
    const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
    const elapsedMinutes = (Date.now() - this.startTime) / 60000;
    const wpm = Math.round(this.correctChars / 5 / elapsedMinutes);
    this.accuracyDisplay.textContent = `${accuracy}%`;
    this.errorsDisplay.textContent = this.errors;
    this.wpmDisplay.textContent = isNaN(wpm) ? '0' : wpm;
  }
 
  endGame() {
    this.userInput.disabled = true;
    if (this.intervalId) clearInterval(this.intervalId);
    alert(`Game Over!\nWPM: ${this.wpmDisplay.textContent}\nAccuracy: ${this.accuracyDisplay.textContent}`);
  }
}

window.addEventListener('load', () => new TypingGame());
