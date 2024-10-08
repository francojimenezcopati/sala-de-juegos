import { inject } from '@angular/core';
import {
    CardInterface,
    CardRequestInterface,
    DeckInterface,
} from './cards.interfaces';
import { CardApiService } from './card.api.service';

export class HigherOrLower {

    private score!: number;
    private highScore: number = parseInt(
        localStorage.getItem('high-score') ?? '0'
    );
    private deck!: DeckInterface;
    private cardRequest: CardRequestInterface | null = null;
    private leftCard: CardInterface | null = null;
    private rightCard: CardInterface | null = null;

    private won: boolean = false;
    private gameOver: boolean = false;

    private constructor(private cardApiService: CardApiService) {
    }

	public static async create(cardApiService: CardApiService){
		const instance = new HigherOrLower(cardApiService);
		await instance.startGame()
		return instance;
	}

    private async startGame() {
        this.deck = await this.cardApiService.getNewDeck();
        this.score = 0;
        this.won = false;
        this.gameOver = false;

        this.cardRequest = await this.cardApiService.getNewCards(
            this.deck.deck_id,
            2
        );
        this.leftCard = this.cardRequest.cards[0];
        this.rightCard = this.cardRequest.cards[1];

        this.leftCard = this.cardApiService.parseCardValue(this.leftCard);
        this.rightCard = this.cardApiService.parseCardValue(this.rightCard);
    }

    public async guess(lower: boolean) {
        let isCorrect = false;

        if (lower) {
            // si adivino que fuese lower
            isCorrect =
                this.leftCard!.numericValue >= this.rightCard!.numericValue;
        } else {
            // si adivino que fuese higher
            isCorrect =
                this.leftCard!.numericValue <= this.rightCard!.numericValue;
        }

        this.score = isCorrect ? this.score + 1 : 0;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('high-score', this.highScore.toString());
        }

        if (this.cardRequest?.remaining! > 0) {
            await this.updateCards();
        } else {
            this.won = true;
        }

        return isCorrect;
    }

    private async updateCards() {
        this.cardRequest = await this.cardApiService.getNewCards(
            this.deck.deck_id,
            1
        );

        this.leftCard = this.rightCard;
        this.rightCard = this.cardApiService.parseCardValue(
            this.cardRequest.cards[0]
        );
    }

    public getScore(): number {
        return this.score;
    }

    public getHighScore(): number {
        return this.highScore;
    }

    public getLeftCard(): CardInterface | null {
        return this.leftCard;
    }

    public getRightCard(): CardInterface | null {
        return this.rightCard;
    }

    public hasWon(): boolean {
        return this.won;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }
}
