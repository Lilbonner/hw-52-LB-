import React, {useState} from 'react';
import CardDeck from './lib/cardDeck';
import Card from './lib/card';
import './cards.css';

const App: React.FC = () => {
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);

  const handleDealCards = () => {
    const deck = new CardDeck();

    const newDrawnCards = deck.getCards(5);
    setDrawnCards(newDrawnCards);
  };

  return (
    <div>
      <h1>Poker</h1>
      <button onClick={handleDealCards}>New hand</button>
      <div className="playingCards faceImages">
        {drawnCards.map((card, index) => (
          <span key={index} className={`card rank-${card.rank} ${card.suit}`}>
            <span className="rank">{card.rank}</span>
            <span className="suit">{card.suit}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
