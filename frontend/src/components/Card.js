import React from "react";
import cardImage from "../images/card-image.png";
import { useNavigate } from "react-router-dom";

function Card(card) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => {
        navigate(`/models/${card.card}`);
        console.log(card);
      }}
      className="element"
    >
      <figure className="element__container">
        <img src={cardImage} className="element__image" alt="Bathroom" />
        <figcaption>
          <h2 className="element__title">Bathroom</h2>
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;
