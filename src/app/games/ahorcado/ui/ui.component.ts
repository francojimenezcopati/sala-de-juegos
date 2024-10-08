import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ahorcado } from '../ahorcado';

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.css'],
})
export class UiComponent {
    private wordsList: string[] = [
        'abierto',
        'abismo',
        'abrigo',
        'aceite',
        'acento',
        'agente',
        'aliento',
        'almidon',
        'anillo',
        'apuesto',
        'arena',
        'asunto',
        'atento',
        'bacalao',
        'bailar',
        'banco',
        'batido',
        'bebida',
        'bocina',
        'bote',
        'brillo',
        'calido',
        'calor',
        'cambio',
        'camino',
        'canto',
        'carrito',
        'casita',
        'ceniza',
        'circo',
        'clavo',
        'coche',
        'cuerpo',
        'danza',
        'dedo',
        'deseo',
        'dieta',
        'dorado',
        'drama',
        'duende',
        'elefante',
        'encanto',
        'enfermo',
        'esfera',
        'espera',
        'estrella',
        'fabrica',
        'felino',
        'fuego',
        'ganador',
        'gato',
        'gracia',
        'hombre',
        'huevo',
        'juguete',
        'labio',
        'largo',
        'lento',
        'luz',
        'maizal',
        'madera',
        'mesero',
        'miedo',
        'mochila',
        'moneda',
        'mujer',
        'nacion',
        'niño',
        'nube',
        'ocaso',
        'ojera',
        'origen',
        'palabra',
        'parada',
        'pasado',
        'piano',
        'piedra',
        'planta',
        'poder',
        'pulgar',
        'regalo',
        'salida',
        'sangre',
        'silla',
        'sombra',
        'suelo',
        'taco',
        'tamano',
        'templo',
        'tierra',
        'tijera',
        'timbre',
        'tinta',
        'tomate',
        'viento',
        'vuelta',
        'zapato',
    ];

    message: string = '';
    won: boolean = false;
    gameOver: boolean = false;
    protected alphabet: { [key: string]: 'unused' | 'incorrect' | 'correct' } =
        {};
    protected currentWordGuess!: string;
    protected wrongLetters: string[] = [];
    protected game!: Ahorcado;

    constructor() {
        this.startGame();

        console.log(this.game.getWordToGuess());
    }

    startGame(): void {
        const randomWord =
            this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
        this.game = new Ahorcado(randomWord);
        this.alphabet = this.game.getAlphabet();
        this.currentWordGuess = this.game.getCurrentWordGuess();
		this.wrongLetters = []
        this.gameOver = false;
        this.won = false;
        this.message = '';
    }

    onLetterClick(letter: string): void {
        if (this.gameOver) {
            return;
        }

        const gameWon = this.game.guess(letter);

        if (gameWon === null) {
            console.log('error nullll');
        }

        this.alphabet = this.game.getAlphabet();
        this.currentWordGuess = this.game.getCurrentWordGuess();
        this.wrongLetters = this.game.getErrors();

        if (gameWon) {
            this.gameOver = true;
            this.won = true;
            this.message = "Congratulations! You've won!";
        } else if (this.game.isGameOver()) {
            this.gameOver = true;
            this.message = `Se terminó el juego! La palabra era ${this.game.getWordToGuess()}`;
        }
    }

    resetGame(): void {
        this.startGame();
    }
}
