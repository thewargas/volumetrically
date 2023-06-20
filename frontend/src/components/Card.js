import React from "react";
import { useNavigate } from "react-router-dom";

import blueSkyBox from "../images/blue-sky-box.png";

function Card({ card, isDark }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => {
        navigate(`/models/${card.id}`);
      }}
      className={`element ${isDark && `element_theme_dark`}`}
    >
      <figure className="element__container">
        {!(card.skybox === "disabled") && (
          <img src={blueSkyBox} className="element__overlay" alt={card.name} />
        )}
        <img src={card.poster} className="element__image" alt={card.name} />
        <figcaption>
          <h2 className={`element__title ${isDark && `white`}`}>{card.name}</h2>
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;
