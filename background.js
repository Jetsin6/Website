// ParticleNetwork class
class ParticleNetwork {
    constructor(canvas) {
        console.log('Initializing ParticleNetwork'); // Debug log
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        console.log('Canvas context:', this.ctx); // Debug log
        this.particleCount = 150;
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.connectionDistance = 140;
        this.init();
    }

    init() {
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }

        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });

        // Start animation
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        const theme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', theme); // Debug log
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        // Draw connections
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    const theme = document.documentElement.getAttribute('data-theme');
                    const color = theme === 'light' ? '0, 0, 0' : '255, 255, 255';
                    
                    const opacityMultiplier = theme === 'light' ? 0.6 : 0.4;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${color}, ${opacity * opacityMultiplier})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Particle class
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };
        this.radius = 1.5;
    }

    update() {
        // Update position
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bounce off walls
        if (this.x < 0 || this.x > this.canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.velocity.y *= -1;
    }

    draw(ctx) {
        const theme = document.documentElement.getAttribute('data-theme');
        ctx.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}