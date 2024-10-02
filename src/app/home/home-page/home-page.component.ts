import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { RouterLink } from '@angular/router';
import { PongComponent } from '../../pong-bg/pong/pong.component';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [NavBarComponent, GameCardComponent, RouterLink, PongComponent, CommonModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
	authService = inject(AuthService)

    games = [
        {
            title: 'Ahorcado',
            description:
                'Un juego clásico donde adivinas palabras letra por letra antes de que el hombrecito sea colgado.',
            imageUrl: 'games/icons/ahorcado.jpg',
			redirectUrl: "/games/ahorcado"
        },
        {
            title: 'Preguntados',
            description:
                'Un juego de preguntas y respuestas donde compites para obtener el mayor número de respuestas correctas.',
            imageUrl: 'games/icons/preguntados.jpeg',
			redirectUrl: "/games/preguntados"
        },
        {
            title: 'Higher or Lower',
            description:
                'Un juego de adivinanza donde debes decidir si la próxima carta será mayor o menor.',
            imageUrl: 'games/icons/mayor_menor.png',
			redirectUrl: "/games/higher-or-lower"
        },
        {
            title: 'Wordle',
            description:
                'Un juego de palabras donde tienes que adivinar una palabra oculta en el menor número de intentos posibles.',
            imageUrl: 'games/icons/wordle.jpg',
			redirectUrl: "/games/wordle"
        },
    ];
}
