import React, { useState } from 'react';
import CardDeck from './lib/cardDeck';
import './cards.css';

const App: React.FC = () => {
  const deck = new CardDeck();

  const [currentCards, setCurrentCards] = useState(deck.getCards(4));

  const handleGenerateCards = () => {
    const newCards = deck.getCards(4);

    setCurrentCards(newCards);
  };

  return (
    <div>
      <h1>Poker</h1>
      <div>
        {currentCards.map((card, index) => (
          <p key={index}>{`${card.rank} ${card.suit}`}</p>
        ))}
      </div>

      <button onClick={handleGenerateCards}>new hand</button>
    </div>
  );
};

export default App;
