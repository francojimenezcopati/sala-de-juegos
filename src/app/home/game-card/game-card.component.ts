import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.css',
})
export class GameCardComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() imageUrl: string = '';
    @Input() redirectUrl: string = '';

    authService = inject(AuthService);
}
