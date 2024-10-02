import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LetterStatus } from '../letter-status.enum';
import { Wordle } from '../wordle';

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
    game!: Wordle;
    message: string = '';
    rows: { letter: string; status: LetterStatus }[][] = [];
    currentGuess: string[] = []; // Array to hold the current guess letters
    alphabet: { [key: string]: LetterStatus } = {};
    gameOver: boolean = false;
    won: boolean = false;
    maxAttemptsArray;

    constructor() {
        this.startGame();
        this.maxAttemptsArray = Array.from({
            length: this.game.getMaxAttempts(),
        });
        // console.log(this.game.getWordToGuess());
    }

    startGame(): void {
        const randomWord =
            this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
        this.game = new Wordle(randomWord);
        this.alphabet = this.game.getAlphabet();
        this.rows = [];
        this.currentGuess = [];
        this.gameOver = false;
        this.won = false;
        this.message = '';
    }

    onLetterClick(letter: string): void {
        if (
            this.gameOver ||
            this.currentGuess.length >= this.game.getWordToGuess().length
        ) {
            return;
        }

        // Add the letter to the current guess
        this.currentGuess.push(letter.toUpperCase());

        // If the current guess is complete, submit it
        if (this.currentGuess.length === this.game.getWordToGuess().length) {
            this.onSubmitGuess();
        }
    }

    onSubmitGuess(): void {
        const guessString = this.currentGuess.join('');

        const result = this.game.guess(guessString);

        if (typeof result === 'string') {
            this.message = result; // Error message
            this.currentGuess = []; // Clear the guess to allow re-entry
            return;
        }

        this.rows.push(
            this.currentGuess.map((letter, index) => ({
                letter,
                status: result.status[index],
            }))
        );
        console.log(this.rows);

        this.alphabet = this.game.getAlphabet();

        if (result.gameWon) {
            this.gameOver = true;
            this.won = true;
        } else if (this.game.isGameOver()) {
            this.gameOver = true;
            this.message = `Game Over! The word was ${this.game.getWordToGuess()}`;
        }

        // Clear the current guess for the next round
        this.currentGuess = [];
    }

    onBackspaceClicked() {
		this.currentGuess.pop()
	}

    resetGame(): void {
        this.startGame();
    }
}
