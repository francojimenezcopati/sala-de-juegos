import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css',
})
export class GameCardComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() url: string = '';
}