import React from "react";
import cardImage from "../images/card-image.png";

function Card() {
  
  return (
    <article className="element">
      <figure className="element__container">
        <img
          src={cardImage}
          className="element__image"
          alt='Bathroom'
        />
        <figcaption>
          <h2 className="element__title">Bathroom</h2>
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;