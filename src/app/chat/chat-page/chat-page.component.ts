import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserDetails } from '../../auth/userDetails';
import { Message } from '../message.interface';

@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [],
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
    authService = inject(AuthService);
    // currentUser = this.authService.currentUserSig() as UserDetails;

	// ngOnInit(){
	// 	console.log(this.currentUser);
	// }

    messages: Message[] = [
        {
            content: '¡Hola a todos! ¿Listos para jugar?',
            createdAt: new Date('2024-09-25T10:15:00'),
            userId: '2nQrsP3v0CMR5q8xIsyuPALLnRq1', // Mensaje del usuario actual
            username: 'Franco',
        },
        {
            content: 'Sí, estoy listo. ¡Vamos!',
            createdAt: new Date('2024-09-25T10:16:00'),
            userId: '3xFsY6q4lBhH2vXsWlDf3PLOtTg9', // Otro usuario
            username: 'Juan',
        },
        {
            content: '¿Alguien ha probado el nuevo juego?',
            createdAt: new Date('2024-09-25T10:17:30'),
            userId: '2nQrsP3v0CMR5q8xIsyuPALLnRq1', // Mensaje del usuario actual
            username: 'Franco',
        },
        {
            content: 'Sí, está increíble, me encanta la nueva funcionalidad.',
            createdAt: new Date('2024-09-25T10:18:45'),
            userId: '4yTgH5g3q9NjM8fGhPnV2LMnFg9', // Otro usuario
            username: 'María',
        },
        {
            content: '¿Cuál es tu puntuación más alta hasta ahora?',
            createdAt: new Date('2024-09-25T10:19:00'),
            userId: '2nQrsP3v0CMR5q8xIsyuPALLnRq1', // Mensaje del usuario actual
            username: 'Franco',
        },
        {
            content: 'Alrededor de 350 puntos, ¡pero puedo hacerlo mejor!',
            createdAt: new Date('2024-09-25T10:20:10'),
            userId: '3xFsY6q4lBhH2vXsWlDf3PLOtTg9', // Otro usuario
            username: 'Juan',
        },
    ];
}
