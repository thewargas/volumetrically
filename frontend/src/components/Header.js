import React from "react";
import { useEffect, useState } from "react";
import searchIcon from "../images/search-icon.svg";
import searchIconThemeDark from "../images/search-icon-theme-dark.svg";
import foalder from "../images/foalder.svg";
import foalderThemeDark from "../images/foalder-theme-dark.svg";
import allModels from "../images/all-models.svg";
import allModelsThemeDark from "../images/all-models-theme-dark.svg";
import likedModels from "../images/liked-models.svg";
import likedModelsThemeDark from "../images/like-models-theme-dark.svg";
import buttonBackground from "../images/nav-button.png";
import buttonBackgroundThemeDark from "../images/nav-button-theme-dark.png";
import buttonBackgroundPosition from "../images/nav-button-position.svg";
import buttonBackgroundPositionThemeDark from "../images/nav-button-position-theme-dark.svg";
import PopupSettings from "./PopupSettings";

function Header({onValidation, isError, messageError, onUpdateUser, errorUpdateUser, isDark, setDark, skybox, setSkybox}) {

  const [focus, setFocus] = useState("all");
  const [scrollPosition, setScrollPosition] = useState(0);

  const [isPopupSettingsOpen, setPopupSettingsOpen] = useState(false);


const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  function handdleClickMyButton() {
    setFocus("my");
  }
  function handdleClickAllButton() {
    setFocus("all");
  }
  function handdleClickLikedButton() {
    setFocus("liked");
  }


    return (
      <>
        <header className={`header ${isDark && `header_theme_dark`}`}>
        <div className="header__container">
          <div className="inputs-container inputs-container_type_header">
            <input
              className={`input ${isDark && `input_theme_dark`}`}
              type="text"
              placeholder="Поиск"
              name="search"
            />
            <img src={isDark ? searchIconThemeDark : searchIcon} className="input__image" alt="Значок поиска"/>
          </div>
        <button className={`button header__button ${isDark && `header__button_theme_dark`}`} onClick={() => {setPopupSettingsOpen(true)}}></button>
        </div>
        
        <nav className="navigation">
          <button className={`navigation__button ${focus === "my" && `navigation__button_active`} ${isDark && `white`}`} onClick={handdleClickMyButton}>
            <img className="navigation__button-image" src={isDark ? foalderThemeDark : foalder} alt="Иконка папки"/>
            { focus === "my" && `Мои модели`}
          </button>
          <button className={`navigation__button ${focus === "all" && `navigation__button_active`} ${isDark && `white`}`} onClick={handdleClickAllButton}>
            <img className="navigation__button-image" src={isDark ? allModelsThemeDark : allModels} alt="Иконка глобуса"/>
            { focus === "all" && `Все модели` }
          </button>
          <button className={`navigation__button ${focus === "liked" && `navigation__button_active`} ${isDark && `white`}`} onClick={handdleClickLikedButton}>
            <img className="navigation__button-image" src={isDark ? likedModelsThemeDark : likedModels} alt="Иконка лайка"/>
            { focus === "liked" && `Понравившиеся` }
          </button>
          <img src={(scrollPosition <= 0) ? (isDark ? buttonBackgroundThemeDark : buttonBackground) : (isDark ? buttonBackgroundPositionThemeDark : buttonBackgroundPosition)} className={`${(scrollPosition <= 0 && `navigation__button-background`) || `navigation__button-background_type_postiton`} ${(focus === "all" && `navigation__button-background_type_midle`) || (focus === "liked" && `navigation__button-background_type_right`) }`} alt="Обои кнопки"/>
        </nav>
      </header>
      <PopupSettings 
        isOpen={isPopupSettingsOpen}
        setOpen={setPopupSettingsOpen}
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
      </>
    );
  }
  
  export default Header;