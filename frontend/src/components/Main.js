import React from "react";
import Header from "./Header";
import Card from "./Card";
import { useState } from "react";
import PopupAddModel from "./PopupAddModel";

function Main({ cards, onValidation, isError, messageError, url, handleUploadFile, onUpdateUser, errorUpdateUser, isDark, setDark, skybox, setSkybox }) {
  const [isPopupAddModelOpen, setPopupAddModelOpen] = useState(false);

  return (
    <>
      <Header
        onValidation={onValidation}
        isError={isError}
        messageError={messageError}
        onUpdateUser={onUpdateUser}
        errorUpdateUser={errorUpdateUser}
        isDark={isDark}
        setDark={setDark}
        skybox={skybox}
        setSkybox={setSkybox}
      />
      <main className={`content ${isDark && `content_theme_dark`}`}>
        <section className="elements">
          <article className={`element ${isDark && `element_theme_dark`}`}>
            <button
              className={`element__add-button ${isDark && `element__add-button_theme_dark`}`}
              onClick={() => {
                setPopupAddModelOpen(true);
              }}
            />
          </article>
          {cards.map((card) => {
            return (
              <Card  
                key= { card.id }
                card= { card } 
                isDark={isDark}
              />
            )
          })}
        </section>
      </main>
      <PopupAddModel
        isOpen={isPopupAddModelOpen}
        setOpen={setPopupAddModelOpen}
        onValidation={onValidation}
        isError={isError}
        messageError={messageError}
        url={url}
        handleUploadFile={handleUploadFile}
        isDark={isDark}
      />
    </>
  );
}

export default Main;
