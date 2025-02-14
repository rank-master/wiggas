class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.scoreElement = document.getElementById('score');
        
        // Set canvas size
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Player properties
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            width: 40,
            height: 40,
            speed: 5,
            jumping: false,
            jumpForce: 15,
            gravity: 0.6,
            velocityY: 0
        };
        
        // Obstacles array
        this.obstacles = [];
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Touch controls
        this.setupTouchControls();
        
        // Start game loop
        this.gameLoop();
    }
    
    setupTouchControls() {
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const jumpBtn = document.getElementById('jumpBtn');

        // Touch events for buttons
        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.movePlayer('left');
        });

        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.movePlayer('right');
        });

        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump();
        });

        // Swipe controls
        let touchStartX = 0;
        this.canvas.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling while playing
        });

        this.canvas.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > 30) { // Minimum swipe distance
                if (swipeDistance > 0) {
                    this.movePlayer('right');
                } else {
                    this.movePlayer('left');
                }
            } else {
                // Tap to jump
                this.jump();
            }
        });
    }

    movePlayer(direction) {
        if (direction === 'left' && this.player.x > 0) {
            this.player.x -= this.player.speed * 10;
        } else if (direction === 'right' && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed * 10;
        }
    }

    jump() {
        if (!this.player.jumping) {
            this.player.jumping = true;
            this.player.velocityY = -this.player.jumpForce;
        }
    }

    handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowLeft':
                this.movePlayer('left');
                break;
            case 'ArrowRight':
                this.movePlayer('right');
                break;
            case ' ':
                this.jump();
                break;
        }
    }
    
    update() {
        // Update player position
        if (this.player.jumping) {
            this.player.velocityY += this.player.gravity;
            this.player.y += this.player.velocityY;
            
            if (this.player.y > this.canvas.height - this.player.height) {
                this.player.y = this.canvas.height - this.player.height;
                this.player.jumping = false;
                this.player.velocityY = 0;
            }
        }
        
        // Generate obstacles
        if (Math.random() < 0.02) {
            this.obstacles.push({
                x: Math.random() * (this.canvas.width - 30),
                y: -20,
                width: 30,
                height: 30,
                speed: 3
            });
        }
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].y += this.obstacles[i].speed;
            
            // Remove obstacles that are off screen
            if (this.obstacles[i].y > this.canvas.height) {
                this.obstacles.splice(i, 1);
                this.score += 10;
                this.scoreElement.textContent = `Score: ${this.score}`;
            }
            
            // Check collision
            if (this.checkCollision(this.player, this.obstacles[i])) {
                this.gameOver();
            }
        }
    }
    
    checkCollision(player, obstacle) {
        return player.x < obstacle.x + obstacle.width &&
               player.x + player.width > obstacle.x &&
               player.y < obstacle.y + obstacle.height &&
               player.y + player.height > obstacle.y;
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw player
        this.ctx.fillStyle = '#00f';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw obstacles
        this.ctx.fillStyle = '#f00';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
    
    gameOver() {
        alert(`Game Over! Score: ${this.score}`);
        this.score = 0;
        this.obstacles = [];
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height - 100;
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
}; 
