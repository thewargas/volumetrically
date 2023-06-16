import React from "react";
import Header from "./Header";
import Card from "./Card";
import { useState } from "react";
import PopupAddModel from "./PopupAddModel";

function Main({ cards, onValidation, isError, messageError }) {
  const [isPopupAddModelOpen, setPopupAddModelOpen] = useState(false);

  return (
    <>
      <Header
        onValidation={onValidation}
        isError={isError}
        messageError={messageError}
      />
      <main className="content">
        <section className="elements">
          <article className="element">
            <button
              className="element__add-button"
              onClick={() => {
                setPopupAddModelOpen(true);
              }}
            />
          </article>
          {cards.map((card) => {
            return <Card card={card} />;
          })}
        </section>
      </main>
      <PopupAddModel
        isOpen={isPopupAddModelOpen}
        setOpen={setPopupAddModelOpen}
        onValidation={onValidation}
        isError={isError}
        messageError={messageError}
      />
    </>
  );
}

export default Main;
