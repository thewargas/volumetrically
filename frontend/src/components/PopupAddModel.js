import React, { useState, useEffect, useRef } from "react";
import errorIcon from "../images/error-icon.svg";
import nameModelIcon from "../images/name-model.svg";
import nameModelIconThemeDark from "../images/name-model-theme-dark.svg";
import glbIcon from "../images/glb-file.svg";
import glbIconThemeDark from "../images/glb-file-theme-dark.svg";
import infoIcon from "../images/version.svg";
import infoIconThemeDark from "../images/version-theme-dark.svg";
import axios from "axios";

function PopupAddModel({
  isOpen,
  setOpen,
  onValidation,
  isError,
  messageError,
  url,
  handleUploadFile,
  isDark,
}) {
  const formRef = useRef();
  const inputRef = useRef(null);

  const [isValidity, setValidity] = useState(true);

  const [inputs, setInputs] = useState({});

  const [selectedFile, setSelectedFile] = useState([]);
  const [urlFile, setUrlFile] = useState("");

  const instance = useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isOpen, isError]);

  function handleChangeInput(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    onValidation(e);
  }

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      const uniqueName = `${Date.now()}-${file.name}`; // Создаем уникальное имя файла
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("file", file, uniqueName); // Прикрепляем уникальное имя к файлу в FormData
      const { data } = await axios.post(
        "https://api.thewargas.nomoredomains.monster/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      console.log(
        `https://api.thewargas.nomoredomains.monster/download${data.url}`
      );
      setUrlFile(
        `https://api.thewargas.nomoredomains.monster/download${data.url}`
      );
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Указываем, что ожидаем файл в ответе
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file"); // Устанавливаем имя файла при скачивании
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла с сервера");
    }
  };

  useEffect(() => {
    // downloadFile(urlFile);
  }, [urlFile]);

  const handleClickUploadFile = () => {
    inputRef.current.click();
  };

  return (
    <div className={`popup ${isOpen && "popup_active"}`}>
      <div
        className={`popup__container ${
          isDark && `popup__container_theme_dark`
        }`}
      >
        <div>
          <button
            className={`back-button ${isDark && `back-button_theme_dark`}`}
            onClick={() => {
              setOpen(false);
            }}
          ></button>
          <h2 className={`popup__title ${isDark && `white`}`}>
            Добавить модель
          </h2>
          <form
            className={`popup__form`}
            action="#"
            name={`popup-form-add-model`}
            ref={formRef}
            noValidate
          >
            <div
              className={`inputs-container inputs-container_type_file ${
                isDark && `inputs-container_theme_dark`
              }`}
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
                  src={isDark ? glbIconThemeDark : glbIcon}
                  alt="Иконка логина"
                />
                <p className={`inputs-container__text ${isDark && `white`}`}>
                  {selectedFile.name || `Файл модели`}
                </p>
              </div>
            </div>
            <div className="inputs-container">
              <input
                className={`input ${isDark && `input_theme_dark`} ${
                  isError.modelName && "input_type_error"
                }`}
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
                src={isDark ? nameModelIconThemeDark : nameModelIcon}
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
                className={`input ${
                  isDark && `input_theme_dark`
                } input_type_descriprion ${
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
                src={isDark ? infoIconThemeDark : infoIcon}
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
            <button
              type="submit"
              className={`button popup__submit-button ${
                isDark && `button_theme_dark white`
              }`}
            >
              Опубликовать
            </button>
          </form>
          <button
            type="button"
            className={`button popup__logout-button ${
              isDark && `button_theme_dark`
            }`}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupAddModel;
