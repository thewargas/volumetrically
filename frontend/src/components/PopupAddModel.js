import React, { useState, useEffect, useRef } from "react";
import errorIcon from "../images/error-icon.svg";
import nameModelIcon from "../images/name-model.svg";
import glbIcon from "../images/glb-file.svg";
import infoIcon from "../images/version.svg";

function PopupAddModel({
  isOpen,
  setOpen,
  onValidation,
  isError,
  messageError,
}) {
  const formRef = useRef();
  const inputRef = useRef(null);

  const [isValidity, setValidity] = useState(true);

  const [inputs, setInputs] = useState({});

  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isOpen, isError]);

  function handleChangeInput(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    onValidation(e);
  }

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile.name);
  };

  const handleClickUploadFile = () => {
    inputRef.current.click();
  };

  return (
    <div className={`popup ${isOpen && "popup_active"}`}>
      <div className="popup__container">
        <div>
          <button
            className="back-button"
            onClick={() => {
              setOpen(false);
            }}
          ></button>
          <h2 className="popup__title">Добавить модель</h2>
          <form
            className={`popup__form`}
            action="#"
            name={`popup-form-add-model`}
            ref={formRef}
            noValidate
          >
            <div
              className="inputs-container inputs-container_type_file"
              onClick={handleClickUploadFile}
            >
              <input
                className={`input input_type_file ${
                  isError.login && "input_type_error"
                }`}
                type="file"
                placeholder="Добавить модель"
                name="login"
                minLength="3"
                ref={inputRef}
                onChange={handleChangeFile}
                accept=".glb"
                required
              />
              <div className="inputs-container__file">
                <img
                  className="input__image input__image_type_file"
                  src={glbIcon}
                  alt="Иконка логина"
                />
                <p className="inputs-container__text">
                  {selectedFile.name || `Файл модели`}
                </p>
              </div>
            </div>
            <div className="inputs-container">
              <input
                className={`input ${isError.modelName && "input_type_error"}`}
                type="text"
                placeholder="Название модели"
                name="modelName"
                minLength="3"
                onChange={handleChangeInput}
                required
              />
              {isError.modelName && (
                <img
                  className="input__error-image"
                  src={errorIcon}
                  alt="Иконка ошибки"
                />
              )}
              <img
                className="input__image"
                src={nameModelIcon}
                alt="Иконка логина"
              />
              <span
                className={`auth__input-error ${
                  isError.modelName && "auth__input-error_active"
                }`}
              >
                {isError.modelName && messageError.modelName}
              </span>
            </div>
            <div className="inputs-container inputs-container_type_description">
              <textarea
                className={`input input_type_descriprion ${
                  isError.modelDescription && "input_type_error"
                }`}
                type="text"
                placeholder="Описание"
                name="modelDescription"
                minLength="3"
                onChange={handleChangeInput}
                required
              />
              {isError.modelDescription && (
                <img
                  className="input__error-image"
                  src={errorIcon}
                  alt="Иконка ошибки"
                />
              )}
              <img
                className="input__image"
                src={infoIcon}
                alt="Иконка логина"
              />
              <span
                className={`auth__input-error ${
                  isError.modelDescription && "auth__input-error_active"
                }`}
              >
                {isError.modelDescription && messageError.modelDescription}
              </span>
            </div>
            <button type="submit" className={`button popup__submit-button`}>
              Опубликовать
            </button>
          </form>
          <button type="button" className={`button popup__logout-button`}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupAddModel;
