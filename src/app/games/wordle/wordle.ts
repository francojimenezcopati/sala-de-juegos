import { LetterStatus } from './letter-status.enum'; // Importa el enum desde donde lo definas

export class Wordle {
    private wordToGuess: string;
    private maxAttempts: number;
    private currentAttempt: number;
    private attempts: string[] = [];
    private gameOver: boolean = false;
    private alphabet: { [key: string]: LetterStatus } = {};

    constructor(wordToGuess: string, maxAttempts: number = 6) {
        this.wordToGuess = wordToGuess.toUpperCase();
        this.maxAttempts = maxAttempts;
        this.currentAttempt = 0;
        this.initializeAlphabet();
    }

    private initializeAlphabet(): void {
        for (let i = 65; i <= 90; i++) {
            this.alphabet[String.fromCharCode(i)] = LetterStatus.UNUSED;
        }
    }

    public guess(
        word: string
    ): { status: LetterStatus[]; gameWon: boolean } | string {
        if (this.gameOver) return 'Game is already over.';
        if (word.length !== this.wordToGuess.length)
            return `Word must be ${this.wordToGuess.length} letters.`;
        if (this.currentAttempt >= this.maxAttempts)
            return 'No more attempts left.';

        word = word.toUpperCase();
        this.attempts.push(word);
        const result = this.checkWord(word);
        this.updateAlphabet(result.status, word);
        this.currentAttempt++;

        if (result.gameWon) {
            this.gameOver = true;
            return { status: result.status, gameWon: true };
        }

        if (this.currentAttempt === this.maxAttempts) {
            this.gameOver = true;
        }

        return { status: result.status, gameWon: false };
    }

    private checkWord(guess: string): {
        status: LetterStatus[];
        gameWon: boolean;
    } {
        let status: LetterStatus[] = new Array(this.wordToGuess.length).fill(
            LetterStatus.ABSENT
        );
        let correctLetters = 0;

        // Crear un mapa de conteo de letras del wordToGuess
        let letterCount: { [key: string]: number } = {};
        for (let char of this.wordToGuess) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }

        // Primera pasada: encontrar las letras correctas
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === this.wordToGuess[i]) {
                status[i] = LetterStatus.CORRECT;
                letterCount[guess[i]]--;
                correctLetters++;
            }
        }

        // Segunda pasada: encontrar las letras presentes
        for (let i = 0; i < guess.length; i++) {
            if (
                status[i] !== LetterStatus.CORRECT &&
                letterCount[guess[i]] &&
                letterCount[guess[i]] > 0
            ) {
                status[i] = LetterStatus.PRESENT;
                letterCount[guess[i]]--;
            }
        }

        const gameWon = correctLetters === this.wordToGuess.length;
        return { status, gameWon };
    }

    private updateAlphabet(status: LetterStatus[], word: string): void {
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            if (status[i] === LetterStatus.CORRECT) {
                this.alphabet[letter] = LetterStatus.CORRECT;
            } else if (
                status[i] === LetterStatus.PRESENT &&
                this.alphabet[letter] !== LetterStatus.CORRECT
            ) {
                this.alphabet[letter] = LetterStatus.PRESENT;
            } else if (
                status[i] === LetterStatus.ABSENT &&
                this.alphabet[letter] === LetterStatus.UNUSED
            ) {
                this.alphabet[letter] = LetterStatus.ABSENT;
            }
        }
    }

    public getAttempts(): string[] {
        return this.attempts;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public getAlphabet(): { [key: string]: LetterStatus } {
        return this.alphabet;
    }

    public getRemainingAttempts(): number {
        return this.maxAttempts - this.currentAttempt;
    }

    public getWordToGuess(): string {
        return this.wordToGuess;
    }

    public getMaxAttempts() {
        return this.maxAttempts;
    }
}
