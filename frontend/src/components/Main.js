import React from "react";
import Header from "./Header";
import Card from "./Card";

function Main({cards , onValidation, isError, messageError}) {
  

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
            <button className="element__add-button" />
        </article>
        {cards.map((card) => {
          return (
            <Card/>
          );
        })}
      </section>
    </main>
    </>
  );
}

export default Main;