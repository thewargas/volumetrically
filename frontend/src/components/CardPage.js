import React from "react";
import { useNavigate } from "react-router-dom";
import modelView from "../images/model-3d-view.svg";
import infoIcon from "../images/version.svg";
import modelSettings from "../images/settings.svg";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "../vendor/styleSpringBottomSheet.css";
import nameModelIcon from "../images/name-model.svg";
import userIcon from "../images/user-icon.svg";
import glbIcon from "../images/glb-file.svg";
import calenderIcon from "../images/calender.svg";
import darkThemeIcon from "../images/dark-theme.svg";
import skyBoxIcon from "../images/skybox.svg";
import versionIcon from "../images/version.svg";

function CardPage({ card }) {
  const navigate = useNavigate();

  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [isDark, setDark] = useState(false);

  const [skybox, setSkybox] = useState("default");

  const [isPopupSkyboxOpen, setPopupSkyboxOpen] = useState(false);

  return (
    <div className="model">
      <button
        className="back-button"
        onClick={() => {
          navigate("/models");
        }}
      ></button>
      <h2 className="popup__title">Bathroom {card}</h2>
      <model-viewer
        height="470px"
        alt=""
        src="../bathroom2.glb"
        camera-controls
        touch-action="pan-y"
        style={{ width: "100%", height: "400px" }}
      ></model-viewer>
      <nav className="model__nav-container">
        <button className="model__button">
          <img src={modelView} alt="Просмотр 3d модели в пространстве" />
        </button>
        <button
          className="model__button"
          onClick={() => {
            setInfoOpen(true);
          }}
        >
          <img src={infoIcon} alt="Просмотр 3d модели в пространстве" />
        </button>
        <button
          className="model__button"
          onClick={() => {
            setSettingsOpen(true);
          }}
        >
          <img src={modelSettings} alt="Просмотр 3d модели в пространстве" />
        </button>
      </nav>
      <BottomSheet
        open={isInfoOpen}
        onDismiss={() => {
          setInfoOpen(false);
        }}
      >
        <div className="sheet">
          <h2 className="sheet__title">Информация</h2>
          <div className="fields">
            <div className="field">
              <div className="field__container">
                <img src={nameModelIcon} alt="Иконка полумесяца" />
                <p className="field__text">Название</p>
              </div>
              <p className="field__info">Bathroom</p>
            </div>
            <div className="field">
              <div className="field__container">
                <img src={userIcon} alt="Иконка полумесяца" />
                <p className="field__text">Автор</p>
              </div>
              <p className="field__info">User1</p>
            </div>
            <div className="field">
              <div className="field__container">
                <img
                  src={infoIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className="field__text">Описание</p>
              </div>
              <p className="field__info">
                Ванная комната со стиральной машиной, ванной, зеркалом и
                раковиной.
              </p>
            </div>
            <div className="field">
              <div className="field__container">
                <img
                  src={glbIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className="field__text">Вес файла</p>
              </div>
              <p className="field__info">7,36 MB</p>
            </div>
            <div className="field">
              <div className="field__container">
                <img
                  src={calenderIcon}
                  className="field__image"
                  alt="Иконка полумесяца"
                />
                <p className="field__text">Дата публикации</p>
              </div>
              <p className="field__info">20.06.2023</p>
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
          <h2 className="sheet__title">Настройки</h2>
          <div className="fields">
            <div className="field">
              <div className="field__container">
                <img src={darkThemeIcon} alt="Иконка полумесяца" />
                <p className="field__text">Тёмная тема</p>
              </div>
              <div className="toggle-switch">
                <button
                  className={`toggle-switch__button ${
                    isDark && `toggle-switch__button_active`
                  }`}
                  onClick={() => {
                    setDark(!isDark);
                  }}
                ></button>
              </div>
            </div>

            <div className="field">
              <div className="field__container">
                <img src={skyBoxIcon} alt="Иконка солнца" />
                <p className="field__text">Skybox</p>
              </div>
              <div className="skybox">
                <p className="skybox__text">{skybox}</p>
                <button
                  className="skybox__button"
                  onClick={() => {
                    setPopupSkyboxOpen(true);
                  }}
                ></button>
                {isPopupSkyboxOpen && (
                  <ul className="skybox__list">
                    <li className="skybox__element">
                      <button
                        className="skybox__element-button"
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
                        className="skybox__element-button"
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
                        className="skybox__element-button"
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
                <img src={versionIcon} alt="Иконка полумесяца" />
                <p className="field__text">Версия приложения</p>
              </div>
              <p className="field__info">1.0.0</p>
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
