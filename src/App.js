/* eslint-disable jsx-a11y/heading-has-content */
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [chocieOne, setChocieOne] = useState(null);
  const [chocieTwo, setChocieTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards

  function shuffledCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setChocieOne(null)
      setChocieTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a chocie

  const handleChocie = (card) => {
    chocieOne ? setChocieTwo(card) : setChocieOne(card);
  };

  //  compare 2 selected cards

  useEffect(() => {
    if (chocieOne && chocieTwo) {
      setDisabled(true);
      if (chocieOne.src === chocieTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === chocieOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        restTurn();
      } else {
        setTimeout(() => restTurn(), 1000);
      }
    }
  }, [chocieOne, chocieTwo]);

  //  rest chocie && increase turn

  function restTurn() {
    setChocieOne(null);
    setChocieTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  }

  // start the game automatically

  useEffect(() => {
    shuffledCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChocie={handleChocie}
            flipped={card === chocieOne || card === chocieTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
