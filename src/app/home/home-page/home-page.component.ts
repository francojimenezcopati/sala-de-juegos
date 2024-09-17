import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { RouterLink } from '@angular/router';
import { PongComponent } from "../../pong-bg/pong/pong.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [NavBarComponent, GameCardComponent, RouterLink, PongComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
    games = [
        {
            title: 'Ahorcado',
            description:
                'Un juego clásico donde adivinas palabras letra por letra antes de que el hombrecito sea colgado.',
            url: 'games/icons/ahorcado.jpg',
        },
        {
            title: 'Preguntados',
            description:
                'Un juego de preguntas y respuestas donde compites para obtener el mayor número de respuestas correctas.',
            url: 'games/icons/preguntados.jpeg',
        },
        {
            title: 'Higher or Lower',
            description:
                'Un juego de adivinanza donde debes decidir si la próxima carta será mayor o menor.',
            url: 'games/icons/mayor_menor.png',
        },
        {
            title: 'Wordle',
            description:
                'Un juego de palabras donde tienes que adivinar una palabra oculta en el menor número de intentos posibles.',
            url: 'games/icons/wordle.jpg',
        },
    ];
}
