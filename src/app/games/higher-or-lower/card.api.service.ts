import { inject, Injectable, signal } from '@angular/core';
import {
    CardInterface,
    CardRequestInterface,
    DeckInterface,
} from './cards.interfaces';

@Injectable({
    providedIn: 'root',
})
export class CardApiService {
    private readonly BASE_URL = 'https://www.deckofcardsapi.com/api/deck/';

    public async getNewDeck(): Promise<DeckInterface> {
        const url = this.BASE_URL + 'new/shuffle/?deck_count=1';

        const res = await fetch(url);
        const deckResponse: DeckInterface = await res.json();

        return deckResponse;
    }

    public async getNewCards(deckId: string, amount: number): Promise<CardRequestInterface> {
        const url = this.BASE_URL + `${deckId}/draw/?count=${amount}`;

        const res = await fetch(url);
        const cardResponse: CardRequestInterface = await res.json();

        return cardResponse;
    }

    // para pasar todos los valores de string a number, y las figuras a numbers
    public parseCardValue(card: CardInterface) {
        const mapaValores: { [key: string]: string } = {
            JACK: '11',
            QUEEN: '12',
            KING: '13',
            ACE: '1',
        };
        let value = card.value;
        if (value in mapaValores) value = mapaValores[value];

        card.numericValue = parseInt(value);

		return card;
    }
}
