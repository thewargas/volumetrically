import { useEffect, useState } from "react";
import searchIcon from "../images/search-icon.svg";
import foalder from "../images/foalder.svg";
import allModels from "../images/all-models.svg";
import likedModels from "../images/liked-models.svg";
import buttonBackground from "../images/nav-button.png";
import buttonBackgroundPosition from "../images/nav-button-position.svg";
import PopupSettings from "./PopupSettings";

function Header({onValidation, isError, messageError}) {

  const [focus, setFocus] = useState("my");
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
        <header className="header">
        <div className="header__container">
          <div className="inputs-container inputs-container_type_header">
            <input
              className={`input`}
              type="text"
              placeholder="Поиск"
              name="search"
            />
            <img src={searchIcon} className="input__image" alt="Значок поиска"/>
          </div>
        <button className="button header__button" onClick={() => {setPopupSettingsOpen(true)}}></button>
        </div>
        
        <nav className="navigation">
          <button className={`navigation__button ${focus === "my" && `navigation__button_active`}`} onClick={handdleClickMyButton}>
            <img className="navigation__button-image" src={foalder} alt="Иконка папки"/>
            { focus === "my" && `Мои модели`}
          </button>
          <button className={`navigation__button ${focus === "all" && `navigation__button_active`}`} onClick={handdleClickAllButton}>
            <img className="navigation__button-image" src={allModels} alt="Иконка глобуса"/>
            { focus === "all" && `Все модели` }
          </button>
          <button className={`navigation__button ${focus === "liked" && `navigation__button_active`}`} onClick={handdleClickLikedButton}>
            <img className="navigation__button-image" src={likedModels} alt="Иконка лайка"/>
            { focus === "liked" && `Понравившиеся` }
          </button>
          <img src={(scrollPosition === 0 && buttonBackground) || buttonBackgroundPosition} className={`${(scrollPosition === 0 && `navigation__button-background`) || `navigation__button-background_type_postiton`} ${(focus === "all" && `navigation__button-background_type_midle`) || (focus === "liked" && `navigation__button-background_type_right`) }`} alt="Обои кнопки"/>
        </nav>
      </header>
      <PopupSettings 
        isOpen={isPopupSettingsOpen}
        setOpen={setPopupSettingsOpen}
        onValidation={onValidation} 
        isError={isError}
        messageError={messageError}
      />
      </>
    );
  }
  
  export default Header;