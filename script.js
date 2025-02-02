document.addEventListener('DOMContentLoaded', () => {
    const note = document.querySelector('.note');
    const startButton = document.querySelector('.start-game');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.querySelector('.score');
    const timerDisplay = document.querySelector('.timer');
    const gameOver = document.querySelector('.game-over');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let heartInterval;

    startButton.addEventListener('click', () => {
        note.style.display = 'none';
        startButton.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame();
    });

    function startGame() {
        score = 0;
        timeLeft = 30;
        updateDisplay();
        gameOver.style.display = 'none';
        
        gameInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        heartInterval = setInterval(createHeart, 1000);
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
        
        heart.addEventListener('click', () => {
            score++;
            updateDisplay();
            heart.style.transform = 'scale(1.5)';
            heart.style.opacity = '0';
            setTimeout(() => heart.remove(), 200);
        });

        gameContainer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentElement) {
                heart.remove();
            }
        }, 3000);
    }

    function updateDisplay() {
        scoreDisplay.textContent = `Hearts: ${score}`;
        timerDisplay.textContent = `Time: ${timeLeft}`;
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(heartInterval);
        
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => heart.remove());
        
        gameOver.style.display = 'block';
        gameOver.innerHTML = `
            Game Over!<br>
            You caught ${score} hearts!<br>
            That means you get ${score} kisses! 😘<br>
            <button class="restart-button">Play Again</button>
        `;

        const restartButton = gameOver.querySelector('.restart-button');
        restartButton.addEventListener('click', startGame);
    }
});