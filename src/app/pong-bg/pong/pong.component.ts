import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pong',
    standalone: true,
    templateUrl: './pong.component.html',
    styleUrls: ['./pong.component.css'],
})
export class PongComponent implements OnInit {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private ball!: Ball;
    private leftPaddle!: Paddle;
    private rightPaddle!: Paddle;
    private keys: { [key: string]: boolean } = {};

    ngOnInit() {
        this.canvas = document.getElementById(
            'pongCanvas'
        ) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        // Ajustar canvas para tener en cuenta el navbar
        const navbarHeight = 63; // Altura del navbar
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - navbarHeight;

        this.initializeGame();
        this.addEventListeners();
        this.gameLoop();
    }

    private initializeGame() {
        this.ball = new Ball(
            this.canvas.width / 2,
            this.canvas.height / 2,
            10,
            4 // velocidad de la pelota
        );
        this.leftPaddle = new Paddle(10, this.canvas.height / 2 - 50, 10, 100);
        this.rightPaddle = new Paddle(
            this.canvas.width - 20,
            this.canvas.height / 2 - 50,
            10,
            100
        );
    }

    private addEventListeners() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    private gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    private update() {
        // Mover las palas
        if (this.keys['w']) this.leftPaddle.move(-1);
        if (this.keys['s']) this.leftPaddle.move(1);
        if (this.keys['o']) this.rightPaddle.move(-1);
        if (this.keys['l']) this.rightPaddle.move(1);

        // Mover la pelota
        this.ball.move();
        this.ball.checkCollision(this.leftPaddle, this.rightPaddle);

        // Reajustar el juego
        if (this.ball.x < 0 || this.ball.x > this.canvas.width) {
            this.ball.reset();
        }
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.draw(this.ctx);
        this.leftPaddle.draw(this.ctx);
        this.rightPaddle.draw(this.ctx);
    }
}

// Define la clase Ball
class Ball {
    private baseSpeed: number = 4;

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public speed: number = this.baseSpeed, // Velocidad inicial
        public dx: number = 0,
        public dy: number = 0
    ) {
        this.dx = this.speed;
        this.dy = this.speed;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Rebotar en los bordes
        if (
            this.y + this.radius > window.innerHeight - 63 ||
            this.y - this.radius < 0
        ) {
            this.dy = -this.dy;
        }

        // Ajustar velocidad cuando la pelota rebota en las palas
        if (
            this.x - this.radius < 0 ||
            this.x + this.radius > window.innerWidth
        ) {
            this.reset();
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    checkCollision(leftPaddle: Paddle, rightPaddle: Paddle) {
        if (
            this.x - this.radius < leftPaddle.x + leftPaddle.width &&
            this.y > leftPaddle.y &&
            this.y < leftPaddle.y + leftPaddle.height
        ) {
            this.dx = -this.dx;
            this.dx *= 1.1; // Aumentar velocidad al rebotar
            this.dy *= 1.1;
        }
        if (
            this.x + this.radius > rightPaddle.x &&
            this.y > rightPaddle.y &&
            this.y < rightPaddle.y + rightPaddle.height
        ) {
            this.dx = -this.dx;
            this.dx *= 1.1; // Aumentar velocidad al rebotar
            this.dy *= 1.1;
        }
    }

    reset() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2 - 63;

        // Generar dirección aleatoria con ángulo más horizontal
        const angle = (Math.random() * Math.PI) / 6 + Math.PI / 6; // Ángulo entre 30 y 60 grados
        const speedX = this.speed * Math.cos(angle);
        const speedY = this.speed * Math.sin(angle);

        this.dx = Math.random() > 0.5 ? speedX : -speedX;
        this.dy = Math.random() > 0.5 ? speedY : -speedY;

        // Asegurarse de que la velocidad vertical no sea demasiado baja
        if (Math.abs(this.dy) < this.baseSpeed / 2) {
            this.dy = (Math.sign(this.dy) * this.baseSpeed) / 2;
        }
    }
}

// Define la clase Paddle
class Paddle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    move(direction: number) {
        this.y += direction * 5;
        // Asegurarse de que la pala no salga del canvas
        if (this.y < 0) this.y = 0;
        if (this.y > window.innerHeight - 63 - this.height)
            this.y = window.innerHeight - 63 - this.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
