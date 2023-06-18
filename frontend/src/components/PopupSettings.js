import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import darkThemeIcon from "../images/dark-theme.svg";
import darkThemeIconThemeDark from "../images/dark-theme-theme-dark.svg";
import skyBoxIcon from "../images/skybox.svg";
import skyBoxIconThemeDark from "../images/skybox-theme-dark.svg";
import versionIcon from "../images/version.svg";
import versionIconThemeDark from "../images/version-theme-dark.svg";
import userIcon from "../images/user-icon.svg";
import userIconThemeDark from "../images/login-theme-dark.svg";
import passwordIcon from "../images/password-icon.svg";
import passwordIconThemeDark from "../images/password-icon-theme-dark.svg";
import emailIcon from "../images/email-icon.svg";
import emailIconThemeDark from "../images/email-theme-dark.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupSettings({
  isOpen,
  setOpen,
  onValidation,
  isError,
  messageError,
  onUpdateUser,
  errorUpdateUser,
  isDark,
  setDark,
}) {
  const formRef = useRef();
  const [isValidity, setValidity] = useState(true);

  const currentUser = React.useContext(CurrentUserContext);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const [updateUser, setUpdateUser] = useState(false);

  const [isPopupSkyboxOpen, setPopupSkyboxOpen] = useState(false);

  const [skybox, setSkybox] = useState("default");

  const navigate = useNavigate();

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

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      login,
      email,
    });

    setUpdateUser(true);
  }

  return (
    <div className={`popup ${isOpen && "popup_active"}`}>
      <div className={`popup__container ${isDark && `popup__container_theme_dark`}`}>
        <div>
          <button
            className={`back-button ${isDark && `back-button_theme_dark`}`}
            onClick={() => {
              setUpdateUser(false);
              setOpen(false);
            }}
          ></button>
          <h2 className={`popup__title ${isDark && `white`}`}>Настройки</h2>
          <div className={`fields ${isDark && `fields_theme_dark`}`}>
            <div className="field">
              <div className="field__container">
                <img src={isDark ? darkThemeIconThemeDark : darkThemeIcon} alt="Иконка полумесяца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Тёмная тема</p>
              </div>
              <div className={`toggle-switch ${isDark && `toggle-switch_theme_dark`}`} onClick={() => {
                    setDark(!isDark);
                  }}>
                <button
                  className={`toggle-switch__button ${
                    isDark && `toggle-switch__button_theme_dark toggle-switch__button_active`
                  }`}
                ></button>
              </div>
            </div>

            <div className="field">
              <div className="field__container">
                <img src={isDark ? skyBoxIconThemeDark : skyBoxIcon} alt="Иконка солнца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Skybox</p>
              </div>
              <div className="skybox">
                <p className={`skybox__text ${isDark && `white`}`}>{skybox}</p>
                <button
                  className={`skybox__button ${isDark && `skybox__button_theme_dark`}`}
                  onClick={() => {
                    setPopupSkyboxOpen(true);
                  }}
                ></button>
                {isPopupSkyboxOpen && (
                  <ul className={`skybox__list ${isDark && `skybox__list_theme_dark`}`}>
                    <li className="skybox__element">
                      <button
                        className={`skybox__element-button ${isDark && `white`}`}
                        onClick={() => {
                          setSkybox("Default");
                          setPopupSkyboxOpen(false);
                        }}
                      >
                        Default
                      </button>
                    </li>
                    <li className="skybox__element">
                      <button
                        className={`skybox__element-button ${isDark && `white`}`}
                        onClick={() => {
                          setSkybox("Night");
                          setPopupSkyboxOpen(false);
                        }}
                      >
                        Night
                      </button>
                    </li>
                    <li className="skybox__element">
                      <button
                        className={`skybox__element-button ${isDark && `white`}`}
                        onClick={() => {
                          setSkybox("Blue sky");
                          setPopupSkyboxOpen(false);
                        }}
                      >
                        Blue sky
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="field field_disabled">
              <div className="field__container">
                <img src={isDark ? versionIconThemeDark : versionIcon} alt="Иконка полумесяца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Версия приложения</p>
              </div>
              <p className={`field__info ${isDark && `white`}`} style={{width: '37px'}}>1.0.0</p>
            </div>

            <div
              className={`overlay ${isPopupSkyboxOpen && `overlay_active`}`}
            ></div>
          </div>
          <h3 className="popup__subtitle">Настройки аккаунта</h3>

          <form
            className={`popup__form`}
            action="#"
            name={`popup-form-settings`}
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={`fields ${isDark && `fields_theme_dark`}`}>
              <div className="field">
                <div className="field__container">
                  <img src={isDark ? userIconThemeDark : userIcon} alt="Иконка полумесяца" />
                  <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Логин</p>
                </div>

                <input
                   className={`field__input ${isDark && `white`}`}
                  type="text"
                  placeholder="Введите логин"
                  name="login"
                  value={login || ""}
                  onChange={handleChangeLogin}
                />
              </div>
              <div className="field">
                <div className="field__container">
                  <img src={isDark ? passwordIconThemeDark : passwordIcon} alt="Иконка полумесяца" />
                  <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Пароль</p>
                </div>
                <button
                  type="button"
                  className={`field__button-password ${isDark && `field__button-password_theme_dark`}`}
                ></button>
              </div>
              <div className="field field_disabled">
                <div className="field__container">
                  <img src={isDark ?  emailIconThemeDark : emailIcon} alt="Иконка полумесяца" />
                  <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Эл. почта</p>
                </div>

                <input
                  className={`field__input ${isDark && `white`}`}
                  type="text"
                  placeholder="Введите почту"
                  name="email"
                  value={email || ""}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            {updateUser && <p className={`auth__info-text ${ errorUpdateUser && `auth__success-text_type_error`}`}>{( errorUpdateUser && 'Пользователь с таким email или логинов уже есть!') || `Вы успешно изменили данные!`}</p>
            }
            <button type="submit" className={`button popup__submit-button ${isDark && `button_theme_dark white`}`}>
              Применить изменения
            </button>
          </form>
          <button type="button" className={`button popup__logout-button ${isDark && `button_theme_dark`}`} onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupSettings;
