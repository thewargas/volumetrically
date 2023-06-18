import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../images/eye.svg";
import eyeThemeDark from "../images/eye-theme-dark.svg";
import eyeHiden from "../images/eye-hiden.svg";
import eyeHidenThemeDark from "../images/eye-hidden-theme-dark.svg";
import loginIcon from "../images/login.svg";
import loginIconThemeDark from "../images/login-theme-dark.svg";
import emailIcon from "../images/email.svg";
import emailIconThemeDark from "../images/email-theme-dark.svg";
import errorIcon from "../images/error-icon.svg";

function AuthForm({
  onValidation,
  isError,
  messageError,
  title,
  button,
  paragraph,
  link,
  isAuth,
  onSubmit,
  register,
  route,
  errorAuth,
  isDark
}) {
  const [isVisible, setVisible] = useState(false);

  const formRef = useRef();
  const [isValidity, setValidity] = useState(true);


  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isError]);

  const navigate = useNavigate();

  function handleChangeInput(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    onValidation(e);
  }

  function handleClickEye() {
    setVisible(!isVisible);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(inputs);
  }

  return (
    <div className={`auth ${isDark && `auth_theme_dark`}`}>
      <button className={`back-button ${isDark && `back-button_theme_dark`}`} onClick={() => navigate("/")}></button>
      <h1 className={`auth__title ${isDark && `white`}`}>{title}</h1>
      <form
        className="auth__form"
        ref={formRef}
        name={`auth-form`}
        onSubmit={handleSubmit}
        noValidate
      >
        {register && (
          <div className="inputs-container">
            <input
              className={`input ${isDark && `input_theme_dark`} ${isError.email && `input_type_error`}`}
              type="email"
              placeholder="Эл. почта"
              name="email"
              onChange={handleChangeInput}
              required
            />
            {isError.email && (
              <img
                className="input__error-image"
                src={errorIcon}
                alt="Иконка ошибки"
              />
            )}
            <img className="input__image" src={isDark ? emailIconThemeDark : emailIcon} alt="Иконка логина" />
            <span
              className={`auth__input-error ${
                isError.email && "auth__input-error_active"
              }`}
            >
              {isError.email && messageError.email}
            </span>
          </div>
        )}
        <div className="inputs-container">
          <input
            className={`input ${isDark && `input_theme_dark`} ${isError.login && "input_type_error"}`}
            type="text"
            placeholder="Логин"
            name="login"
            minLength="3"
            onChange={handleChangeInput}
            required
          />
          {isError.login && (
            <img
              className="input__error-image"
              src={errorIcon}
              alt="Иконка ошибки"
            />
          )}
          <img className="input__image" src={isDark ? loginIconThemeDark : loginIcon} alt="Иконка логина" />
          <span
            className={`auth__input-error ${
              isError.login && "auth__input-error_active"
            }`}
          >
            {isError.login && messageError.login}
          </span>
        </div>
        <div
          className={`inputs-container ${
            !register && "inputs-container_type_autorize"
          }`}
        >
          <input
            className={`input ${isDark && `input_theme_dark`} ${isError.password && "input_type_error"}`}
            type={isVisible ? "text" : "password"}
            placeholder="Пароль"
            name="password"
            minLength="3"
            onChange={handleChangeInput}
            required
          />
          {isError.password && (
            <img
              className="input__error-image"
              src={errorIcon}
              alt="Иконка ошибки"
            />
          )}
          <img
            onClick={handleClickEye}
            className="input__image"
            src={isVisible ? (isDark ? eyeThemeDark : eye) : (isDark ? eyeHidenThemeDark : eyeHiden)}
            alt={isVisible ? "Пароль показан" : "Пароль скрыт"}
          />
          <span
            className={`auth__input-error ${
              isError.password && "auth__input-error_active"
            }`}
          >
            {isError.password && messageError.password}
          </span>
        </div>
        {register && (
          <div className={`inputs-container`}>
            <input
              className={`input ${isDark && `input_theme_dark`} ${
                isError.repeatPassword && "input_type_error"
              }`}
              type={isVisible ? "text" : "password"}
              placeholder="Повторите пароль"
              name="repeatPassword"
              minLength="3"
              onChange={handleChangeInput}
              required
            />
            {isError.repeatPassword && (
              <img
                className="input__error-image"
                src={errorIcon}
                alt="Иконка ошибки"
              />
            )}
            <img
              onClick={handleClickEye}
              className="input__image"
              src={isVisible ? (isDark ? eyeThemeDark : eye) : (isDark ? eyeHidenThemeDark : eyeHiden)}
              alt={isVisible ? "Пароль показан" : "Пароль скрыт"}
            />
            <span
              className={`auth__input-error ${
                (isError.repeatPassword ||
                  !(inputs.password === inputs.repeatPassword)) &&
                "auth__input-error_active"
              }`}
            >
              {(isError.repeatPassword && messageError.repeatPassword) ||
                (!(inputs.repeatPassword === undefined) &&
                  !(inputs.password === inputs.repeatPassword) &&
                  "Пароли не совпадают")}
            </span>
          </div>
        )}
        {(isAuth || errorAuth) && (
          <p className={`auth__info-text ${ errorAuth && `auth__success-text_type_error`}`} >{(errorAuth && 'Неверный логин или пароль!') || `Вы успешно зарегистрировались!`}</p>
        )}
        <button
          disabled={
            !isValidity ||
            (register && !(inputs.password === inputs.repeatPassword))
          }
          type="submit"
          className={`button wellcome__button ${isDark && `button_theme_dark`} ${
            (!isValidity ||
              (register && !(inputs.password === inputs.repeatPassword))) &&
            "button_disabled"
          }`}
        >
          {button}
        </button>
      </form>
      <p className={`auth__text ${isDark && `white`}`}>
        {paragraph}{" "}
        <Link to={route} className="auth__link">
          {link}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
