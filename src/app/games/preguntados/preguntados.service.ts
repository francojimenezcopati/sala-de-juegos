import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from './api.interfaces';
@Injectable({
    providedIn: 'root',
})
export class PreguntadosService {
    private readonly BASE_URL =
        'https://api.quiz-contest.xyz/questions?limit=10&page=2&category=';
    private readonly API_KEY =
        '$2b$12$r7owMy1iSEtOE896u043juQDE2GbdOBlEOFIjUblqnzsDM5y6xgQO';

    async getQuestion(category: string) {
        const url = this.BASE_URL + category;

        const res = await fetch(url, {
            method: 'get',
            headers: {
                Authorization: this.API_KEY,
            },
        });
        const data : ApiResponse = await res.json();

        return data;
    }
}
