import React, { useState, useEffect, useRef } from "react";
import darkThemeIcon from "../images/dark-theme.svg";
import skyBoxIcon from "../images/skybox.svg";
import versionIcon from "../images/version.svg";
import userIcon from "../images/user-icon.svg";
import passwordIcon from "../images/password-icon.svg";
import emailIcon from "../images/email-icon.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupSettings({ isOpen, setOpen, onValidation, isError, messageError }) {
  const formRef = useRef();
  const [isValidity, setValidity] = useState(true);
  const [isDark, setDark] = useState(false);

  const currentUser = React.useContext(CurrentUserContext);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  
  
  const [isPopupSkyboxOpen, setPopupSkyboxOpen] = useState(false);

  const [skybox, setSkybox] = useState("default");

  useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isOpen, isError]);

  useEffect(() => {
    setLogin(currentUser.login);
    setEmail(currentUser.email);
  }, [currentUser, isOpen]);

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    onValidation(e);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    onValidation(e);
  }

  return (
    <div
      className={`popup ${isOpen && "popup_active"}`}
    >
      <div className="popup__container">
        <div>
        <button className="back-button" onClick={() => {setOpen(false)}}></button>
        <h2 className="popup__title">Настройки</h2>
        <div className="fields">
          <div className="field">
            <div className="field__container">
              <img src={darkThemeIcon} alt="Иконка полумесяца"/>
              <p className="field__text">Тёмная тема</p>
            </div>
            <div className="toggle-switch">
              <button className={`toggle-switch__button ${isDark && `toggle-switch__button_active`}`} onClick={() => {setDark(!isDark)}}></button>
            </div>
          </div>
          
          <div className="field">
            <div className="field__container">
              <img src={skyBoxIcon} alt="Иконка солнца"/>
              <p className="field__text">Skybox</p>
            </div>
            <div className="skybox">
              <p className="skybox__text">{skybox}</p>
              <button className="skybox__button" onClick={() => {setPopupSkyboxOpen(true)}}></button>
              {isPopupSkyboxOpen && <ul className="skybox__list">
                <li className="skybox__element">
                  <button className="skybox__element-button" onClick={() => {setSkybox("Default"); setPopupSkyboxOpen(false)}}>
                    Default
                  </button>
                </li>
                <li className="skybox__element">
                  <button className="skybox__element-button" onClick={() => {setSkybox("Night"); setPopupSkyboxOpen(false)}}>
                    Night
                  </button>
                </li>
                <li className="skybox__element">
                  <button className="skybox__element-button" onClick={() => {setSkybox("Blue sky"); setPopupSkyboxOpen(false)}}>
                    Blue sky
                  </button>
                </li>
                </ul>}
            </div>
          </div>

          <div className="field field_disabled">
            <div className="field__container">
              <img src={versionIcon} alt="Иконка полумесяца"/>
              <p className="field__text">Версия приложения</p>
            </div>
            <p className="field__version">1.0.0</p>
          </div>

          <div className={`overlay ${isPopupSkyboxOpen && `overlay_active`}`}></div>
        </div>
        <h3 className="popup__subtitle">Настройки аккаунта</h3>

        <form
          className={`popup__form`}
          action="#"
          name={`popup-form-settings`}
          ref={formRef}
          noValidate
        >
          <div className="fields">
            <div className="field">
              <div className="field__container">
                <img src={userIcon} alt="Иконка полумесяца"/>
                <p className="field__text">Логин</p>
              </div>
            
              <input 
                className="field__input"
                type="text"
                placeholder="Введите логин"
                name="login"
                value={login || ""}
                onChange={handleChangeLogin}
              />
            </div>
            <div className="field">
            <div className="field__container">
              <img src={passwordIcon} alt="Иконка полумесяца"/>
              <p className="field__text">Пароль</p>
            </div>
            <button type="button" className="field__button-password"></button>
          </div>
          <div className="field field_disabled">
            <div className="field__container">
              <img src={emailIcon} alt="Иконка полумесяца"/>
              <p className="field__text">Эл. почта</p>
            </div>
            
            <input 
              className="field__input"
              type="text"
              placeholder="Введите почту"
              name="email"
              value={email || ""}
              onChange={handleChangeEmail}
            />
          </div>
          </div>
            <button
              type="submit"
              className={`button popup__submit-button`}
            >
              Применить изменения
            </button>
        </form>
        <button
              type="button"
              className={`button popup__logout-button`}
            >
              Выйти из аккаунта
            </button>
        </div> 
      </div>
    </div>
  );
}

export default PopupSettings;