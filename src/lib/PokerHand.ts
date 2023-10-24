import Card from './card';

class PokerHand {
  private cards: Card[];

  constructor(cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error('В покерной раздаче должно быть ровно 5 карт.');
    }
    this.cards = cards;
  }

  private countRanks(): Map<string, number> {
    const rankCount = new Map<string, number>();
    for (const card of this.cards) {
      const rank = card.rank;
      if (rankCount.has(rank)) {
        rankCount.set(rank, rankCount.get(rank)! + 1);
      } else {
        rankCount.set(rank, 1);
      }
    }
    return rankCount;
  }

  private countSuits(): Map<string, number> {
    const suitCount = new Map<string, number>();
    for (const card of this.cards) {
      const suit = card.suit;
      if (suitCount.has(suit)) {
        suitCount.set(suit, suitCount.get(suit)! + 1);
      } else {
        suitCount.set(suit, 1);
      }
    }
    return suitCount;
  }

  getOutcome(): string {
    const rankCount = this.countRanks();
    const suitCount = this.countSuits();
    const ranks = Array.from(rankCount.keys());
    const suits = Array.from(suitCount.keys());

    if (suits.length === 1 && ranks.includes('10') && ranks.includes('J') && ranks.includes('Q') && ranks.includes('K') && ranks.includes('A')) {
      return 'Роял-флэш';
    }

    let isStraightFlush = false;
    if (suits.length === 1) {
      const sortedRanks = ranks.sort();
      isStraightFlush = sortedRanks.join(',') === '10,J,Q,K,A';
    }
    if (isStraightFlush) {
      return 'Стрит-флэш';
    }

    for (const rank of rankCount.keys()) {
      if (rankCount.get(rank) === 4) {
        return 'Каре';
      }
    }

    let hasThreeOfAKind = false;
    let hasPair = false;
    for (const rank of rankCount.keys()) {
      if (rankCount.get(rank) === 3) {
        hasThreeOfAKind = true;
      }
      if (rankCount.get(rank) === 2) {
        hasPair = true;
      }
    }
    if (hasThreeOfAKind && hasPair) {
      return 'Фулл-хаус';
    }

    if (suits.length === 1) {
      return 'Флэш';
    }

    if (ranks.join(',') === 'A,10,J,Q,K' || (parseInt(ranks[0]) - parseInt(ranks[4]) === 4)) {
      return 'Стрит';
    }

    for (const rank of rankCount.keys()) {
      if (rankCount.get(rank) === 3) {
        return 'Тройка';
      }
    }

    let pairs = 0;
    for (const rank of rankCount.keys()) {
      if (rankCount.get(rank) === 2) {
        pairs++;
      }
    }
    if (pairs === 2) {
      return 'Две пары';
    }

    if (pairs === 1) {
      return 'Одна пара';
    }

    return 'Старшая карта';
  }
}

export default PokerHand;
