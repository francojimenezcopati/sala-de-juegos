import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [NavBarComponent, GameCardComponent, RouterLink],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
    games = [
        {
            title: 'Ahorcado',
            description:
                'Un juego clásico donde adivinas palabras letra por letra antes de que el hombrecito sea colgado.',
            url: 'ahorcado.jpg',
        },
        {
            title: 'Preguntados',
            description:
                'Un juego de preguntas y respuestas donde compites para obtener el mayor número de respuestas correctas.',
            url: 'preguntados.jpeg',
        },
        {
            title: 'Higher or Lower',
            description:
                'Un juego de adivinanza donde debes decidir si la próxima carta será mayor o menor.',
            url: 'mayor_menor.png',
        },
        {
            title: 'Blackjack',
            description:
                'Un popular juego de cartas donde debes sumar 21 puntos sin pasarte.',
            url: 'https://via.placeholder.com/150/000000/FFFFFF/?text=Blackjack',
        },
    ];
}
