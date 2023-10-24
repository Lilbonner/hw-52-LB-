import React, { useState } from 'react';
import CardDeck from './lib/cardDeck';
import Card from './lib/card';
import PokerHand from './lib/PokerHand';
import './cards.css';

const App: React.FC = () => {
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [currentOutcome, setCurrentOutcome] = useState<string>('');

  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  };

  const handleDealCards = () => {
    const deck = new CardDeck();
    const newDrawnCards = deck.getCards(5);
    setDrawnCards(newDrawnCards);

    const pokerHand = new PokerHand(newDrawnCards);
    const outcome = pokerHand.getOutcome();
    setCurrentOutcome(outcome);
  };

  return (
    <div id="content">
      <h1>Poker</h1>
      <button onClick={handleDealCards}>Раздать карты</button>
      <div className="playingCards faceImages">
        {drawnCards.map((card, index) => (
          <span key={index} className={`card rank-${card.rank} ${card.suit}`}>
            <span className="rank">{card.rank}</span>
            <span className="suit">{suitSymbols[card.suit]}</span>
          </span>
        ))}
      </div>
      <p>Текущая комбинация: {currentOutcome}</p>
    </div>
  );
};

export default App;
