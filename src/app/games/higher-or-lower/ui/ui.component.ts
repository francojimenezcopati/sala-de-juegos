import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HigherOrLower } from '../higher-or-lower';
import { CardApiService } from '../card.api.service';
import { CardInterface } from '../cards.interfaces';

import { ToastrService } from 'ngx-toastr';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ui',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ui.component.html',
    styleUrls: ['./ui.component.css'],
})
export class UiComponent implements OnInit {
    private cardApiService = inject(CardApiService);
    private toastr = inject(ToastrService);

    won: boolean = false;
    gameOver: boolean = false;
    protected game: HigherOrLower | null = null;

    protected highScore!: number;
    protected score: number = 0;
    protected leftCard: CardInterface | null = null;
    protected rightCard: CardInterface | null = null;

    flipped: boolean = false;
    isCorrect: boolean = false;
    hasGuessed: boolean = false;
    hideCard: boolean = false;

    constructor() {}

    async ngOnInit() {
        Swal.fire({
            title: 'Reglas del Juego',
            text: 'Adivinar si la siguiente carta es mayor o menor a la actual. Si fallas, pierdes.',
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        });
        await this.startGame();
        this.highScore = this.game!.getHighScore();

        console.log(this.game?.getLeftCard());
        console.log(this.game?.getRightCard());
    }

    async startGame() {
        this.game = await HigherOrLower.create(this.cardApiService);
        this.leftCard = this.game.getLeftCard();
        this.rightCard = this.game.getRightCard();
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.flipped = false; // Resetea el estado de la carta volteada
        this.hasGuessed = false;
    }

    async onGuess(lower: boolean) {
        this.hasGuessed = true;

		this.isCorrect = await this.game!.guess(lower);

        this.flipped = true;

        if (this.isCorrect) {
            this.toastr.success('Correcto');
        } else {
            this.toastr.error(':(');
            Swal.fire({
                icon: 'error',
                title: '¡Incorrecto!',
                text: `Haz llegado a un total de ${this.score} cartas acertadas`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
            });
        }

        this.score = this.game!.getScore();
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        this.won = this.game!.hasWon();
        if (this.won) {
            await Swal.fire({
                icon: 'success',
                title: 'Se acabó el mazo',
                text: 'Felicitaciones, has llegado hasta el final del mazo',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33',
            });
            this.startGame();
        }

        // Pausa para mostrar la carta antes de que cambie
        setTimeout(() => {
			// Restablecemos los estados después de que se haya mostrado la nueva carta
            this.flipped = false;
            this.hasGuessed = false;
            this.isCorrect = false;
			
            // Mostramos la nueva carta
            this.leftCard = this.game!.getLeftCard();
			setTimeout(() => {
				this.rightCard = this.game!.getRightCard();
			},300)
        }, 1000); // Espera 1 segundo para que la animación de voltear se complete
    }
}
