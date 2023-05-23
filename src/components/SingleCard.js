import React from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChocie, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChocie(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
