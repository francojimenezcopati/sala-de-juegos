import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Message, MessageFromFirestore } from '../message.interface';
import { DbService } from '../../db/db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { FirestoreCollections } from '../../db/dbColletionEnum';

@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit {
    authService = inject(AuthService);
    dbService = inject(DbService);

    messages: Message[] = [];
    groupedMessages: { date: string; messages: Message[] }[] = [];

    messageContentToSend: string = '';

    ngOnInit(): void {
        this.getMessagesFromDB();
    }

    async sendMessageToDB() {
        const loggedUser = this.authService.currentUserSig();

        const messageToSend: MessageFromFirestore = {
            content: this.messageContentToSend,
            createdAt: Timestamp.now(),
            userId: loggedUser?.uid!,
            username: loggedUser?.username!,
        };

		await this.dbService.addDocument(FirestoreCollections.messages, messageToSend)

		// update the chat with the new message
		this.getMessagesFromDB()
    }

    getMessagesFromDB() {
        this.dbService
            .getCollection('messages')
            .get()
            .subscribe((messagesFromDB) => {
                const messages = messagesFromDB.docs.map((message) => {
                    const messageObj = message.data() as MessageFromFirestore;

                    return {
                        ...messageObj,
                        createdAt: messageObj.createdAt.toDate(),
                    } as Message;
                });

                messages.sort(
                    (m, m2) => m.createdAt.getTime() - m2.createdAt.getTime()
                );

                this.groupMessagesByDate(messages);
            });
    }

    groupMessagesByDate(messages: Message[]) {
        const grouped: { date: string; messages: Message[] }[] = [];

        messages.forEach((message) => {
            const messageDate = message.createdAt;
            const formattedDate = this.getFormattedDate(messageDate);

            // Busca si ya existe un grupo con la misma fecha
            const group = grouped.find((g) => g.date === formattedDate);
            if (group) {
                group.messages.push(message);
            } else {
                grouped.push({ date: formattedDate, messages: [message] });
            }
        });

        this.groupedMessages = grouped;
    }

    getFormattedDate(date: Date): string {
        const today = new Date();
        const yesterday = new Date();
        const twoDaysAgo = new Date();

        yesterday.setDate(today.getDate() - 1);
        twoDaysAgo.setDate(today.getDate() - 2);

        // Comparar solo día, mes, y año (ignorando la hora)
        if (this.isSameDay(date, today)) {
            return 'Hoy';
        } else if (this.isSameDay(date, yesterday)) {
            return 'Ayer';
        } else if (this.isSameDay(date, twoDaysAgo)) {
            return 'Anteayer';
        } else if (date.getFullYear() === today.getFullYear()) {
            return this.formatDateWithoutYear(date);
        } else {
            return this.formatDateWithYear(date);
        }
    }

    isSameDay(date1: Date, date2: Date): boolean {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    formatDateWithoutYear(date: Date): string {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        return `${date.getDate()} de ${months[date.getMonth()]}`;
    }

    formatDateWithYear(date: Date): string {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        return `${date.getDate()} de ${
            months[date.getMonth()]
        } del ${date.getFullYear()}`;
    }
}
