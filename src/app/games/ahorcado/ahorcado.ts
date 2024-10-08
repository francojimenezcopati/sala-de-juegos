export class Ahorcado {
    private wordToGuess: string;
    private currentWordGuess: string;
    private maxErrors: number;
    private currentErrors: number;
    private errors: string[] = [];
    private gameOver: boolean = false;
    private alphabet: { [key: string]: 'unused' | 'incorrect' | 'correct' } = {};
    public readonly UNGUESSED_LETTER: string = '_';

    constructor(wordToGuess: string) {
        this.wordToGuess = wordToGuess.toUpperCase();
        this.currentWordGuess = this.initializeWordGuess();
        this.maxErrors = 7;
        this.currentErrors = 0;
        this.initializeAlphabet();
    }

    private initializeWordGuess() {
        let word = [];
        for (let i = 0; i < this.wordToGuess.length; i++) {
            const letter = this.wordToGuess[i];
            if (letter === ' ') {
                word.push(' ');
            } else {
                word.push(this.UNGUESSED_LETTER);
            }
        }
        return word.join('');
    }

    private initializeAlphabet(): void {
        for (let i = 65; i <= 90; i++) {
            this.alphabet[String.fromCharCode(i)] = 'unused';
        }
    }

    // devuelve null si el juego ya ha terminado
    // devuelve true si se gano, y false si se perdio. (actualiza this.gameOver a true)
    public guess(letter: string): boolean | null {
        if (this.gameOver) return null;
        if (this.currentErrors >= this.maxErrors) return null;

        letter = letter.toUpperCase();
        const isPresent = this.checkLetter(letter);

        this.updateAlphabet(letter, isPresent);
        const gameWon = this.updateGameState(isPresent, letter);

        if (gameWon) {
            this.gameOver = true;
            return true;
        }

        if (this.currentErrors === this.maxErrors) {
            this.gameOver = true;
        }

        return false;
    }

    private updateGameState(isPresent: boolean, letter: string): boolean {
        let gameWon = true;
        if (isPresent) {
            for (let i = 0; i < this.wordToGuess.length; i++) {
                if (this.wordToGuess[i] === letter) {
                    // pongo la letra adivinada en cada posicion correspondiente en la palabra incompleta
                    this.currentWordGuess =
                        this.currentWordGuess.slice(0, i) +
                        letter +
                        this.currentWordGuess.slice(i + 1);
                }

                if (this.currentWordGuess[i] === this.UNGUESSED_LETTER) {
                    // significa que todavia hay letras por adivinar ('#')
                    gameWon = false;
                }
            }
        } else {
            this.errors.push(letter);
            this.currentErrors++;
            gameWon = false;
        }
        return gameWon;
    }

    private checkLetter(guessedLetter: string): boolean {
        return this.wordToGuess.includes(guessedLetter);
    }

    private updateAlphabet(letter: string, isPresent:boolean): void {
        this.alphabet[letter] = isPresent ? 'correct': 'incorrect' ;
    }

    public getErrors(): string[] {
        return this.errors;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public getAlphabet() {
        return this.alphabet;
    }

    public getRemainingErrors(): number {
        return this.maxErrors - this.currentErrors;
    }

    public getCurrentErrors() {
        return this.currentErrors;
    }

    public getWordToGuess(): string {
        return this.wordToGuess;
    }

    public getMaxErrors() {
        return this.maxErrors;
    }

    public getCurrentWordGuess() {
        return this.currentWordGuess;
    }
}
