import Card from './card';

class CardDeck {
  private cards: Card[] = [];

  constructor() {
    const suits = ['hearts', 'diams', 'spades', 'clubs'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (const suit of suits) {
      for (const rank of ranks) {
        const card = new Card(rank, suit);
        this.cards.push(card);
      }
    }
  }

  getCard(): Card {
    if (this.cards.length === 0) {
      throw new Error('Колода пуста');
    }

    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }

  getCards(howMany: number): Card[] {
    const drawnCards: Card[] = [];

    for (let i = 0; i < howMany; i++) {
      if (this.cards.length === 0) {
        break;
      }

      const randomIndex = Math.floor(Math.random() * this.cards.length);
      drawnCards.push(this.cards.splice(randomIndex, 1)[0]);
    }

    return drawnCards;
  }
}

export default CardDeck;
