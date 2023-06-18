import React from "react";
import { useNavigate } from "react-router-dom";
import modelView from "../images/model-3d-view.svg";
import modelViewThemeDark from "../images/model-3d-view-theme-dark.svg";
import infoIcon from "../images/version.svg";
import infoIconThemeDark from "../images/version-theme-dark.svg";
import modelSettings from "../images/settings.svg";
import modelSettingsThemeDark from "../images/setting-theme-dark.svg";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "../vendor/styleSpringBottomSheet.css";
import nameModelIcon from "../images/name-model.svg";
import nameModelIconThemeDark from "../images/name-model-theme-dark.svg";
import userIcon from "../images/user-icon.svg";
import userIconThemeDark from "../images/login-theme-dark.svg";
import glbIcon from "../images/glb-file.svg";
import glbIconThemeDark from "../images/glb-file-theme-dark.svg";
import calenderIcon from "../images/calender.svg";
import calenderIconThemeDark from "../images/calender-theme-dark.svg";
import darkThemeIcon from "../images/dark-theme.svg";
import darkThemeIconThemeDark from "../images/dark-theme-theme-dark.svg";
import skyBoxIcon from "../images/skybox.svg";
import skyBoxIconThemeDark from "../images/skybox-theme-dark.svg";
import versionIcon from "../images/version.svg";
import versionIconThemeDark from "../images/version-theme-dark.svg";

import blueSkyBox from '../images/blue-sky-box.png';

function CardPage({ card, skybox, setSkybox, isDark, setDark }) {
  const navigate = useNavigate();

  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [isPopupSkyboxOpen, setPopupSkyboxOpen] = useState(false);

  return (
    <div className={`model ${isDark && `model_theme_dark`}`}>
      <button
        className={`back-button ${(isDark || (skybox === 'Blue sky')) && `back-button_theme_dark`}`}
        onClick={() => {
          navigate("/models");
        }}
        style={((skybox === 'Blue sky') && {color: '#FFFFFF'}) || null}
      ></button>
      <h2 className={`popup__title ${(isDark || (skybox === 'Blue sky')) && `white`}`}>{card.name}</h2>
      <model-viewer
        height="470px"
        alt=""
        auto-rotate
        src={card.link}
        camera-controls
        style={{ width: "100dvw", height: "100dvh", position: 'fixed', zIndex: '0', top: '0', left: '0'}}
        skybox-image={((skybox === 'Blue sky') && blueSkyBox) || null}
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar">
          </div>
        </div>
      </model-viewer>
      <nav className="model__nav-container">
        <button className={`model__button ${isDark && `model__button_theme_dark`}`}>
          <img src={isDark ? modelViewThemeDark : modelView} alt="Просмотр 3d модели в пространстве" />
        </button>
        <button
          className={`model__button ${isDark && `model__button_theme_dark`}`}
          onClick={() => {
            setInfoOpen(true);
          }}
        >
          <img src={isDark ? infoIconThemeDark : infoIcon} alt="Просмотр 3d модели в пространстве" />
        </button>
        <button
          className={`model__button ${isDark && `model__button_theme_dark`}`}
          onClick={() => {
            setSettingsOpen(true);
          }}
        >
          <img src={isDark ? modelSettingsThemeDark : modelSettings} alt="Просмотр 3d модели в пространстве" />
        </button>
      </nav>
      <BottomSheet
        open={isInfoOpen}
        onDismiss={() => {
          setInfoOpen(false);
        }}
      >
        <div className={`sheet`}>
        <div className={`sheet__overlay ${isDark && `sheet__overlay_theme_dark`}`}>
          <div className={`sheet__stick`}></div>
        </div>
          <h2 className={`sheet__title ${isDark && `white`}`}>Информация</h2>
          <div className={`fields ${isDark && `fields_theme_dark`}`}>
            <div className="field">
              <div className="field__container">
                <img src={isDark ? nameModelIconThemeDark : nameModelIcon} alt="Иконка полумесяца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Название</p>
              </div>
              <p className={`field__info ${isDark && `white`}`}>{card.name}</p>
            </div>
            <div className="field">
              <div className="field__container">
                <img src={isDark ? userIconThemeDark : userIcon} alt="Иконка полумесяца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Автор</p>
              </div>
              <p className={`field__info ${isDark && `white`}`}>{card.owner}</p>
            </div>
            <div className="field">
              <div className="field__container">
                <img
                  src={isDark ? versionIconThemeDark : infoIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Описание</p>
              </div>
              <p className={`field__info ${isDark && `white`}`}>
                {card.description}
              </p>
            </div>
            <div className="field">
              <div className="field__container">
                <img
                  src={isDark ? glbIconThemeDark : glbIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Вес файла</p>
              </div>
              <p className={`field__info ${isDark && `white`}`}>{card.fileWeight}</p>
            </div>
            <div className="field field_disabled">
              <div className="field__container">
                <img
                  src={isDark ? calenderIconThemeDark : calenderIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Дата публикации</p>
              </div>
              <p className={`field__info ${isDark && `white`}`}>{card.createDate}</p>
            </div>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet
        open={isSettingsOpen}
        onDismiss={() => {
          setSettingsOpen(false);
        }}
      >
        <div className="sheet sheet_type_settings">
          <div className={`sheet__overlay ${isDark && `sheet__overlay_theme_dark`}`}></div>
          <h2 className={`sheet__title ${isDark && `white`}`}>Настройки</h2>
          <div className={`fields ${isDark && `fields_theme_dark`}`}>
            <div className="field">
              <div className="field__container">
                <img src={isDark ?  darkThemeIconThemeDark : darkThemeIcon} alt="Иконка полумесяца" />
                <p className={`field__text ${isDark && `field__text_theme_dark`}`}>Тёмная тема</p>
              </div>
              <div className={`toggle-switch ${isDark && `toggle-switch_theme_dark`}`}>
                <button
                  className={`toggle-switch__button ${
                    isDark && `toggle-switch__button_theme_dark toggle-switch__button_active`
                  }`}
                  onClick={() => {
                    setDark(!isDark);
                  }}
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
        </div>
      </BottomSheet>
    </div>
  );
}

export default CardPage;
