import React, { useRef , useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../images/eye.svg";
import eyeHiden from "../images/eye-hiden.svg";
import loginIcon from "../images/login.svg";
import emailIcon from "../images/email.svg";
import errorIcon from "../images/error-icon.svg";

function AuthForm({ onValidation, isError, messageError, title, button, paragraph, link, isAuth, onSubmit, register, route}) {
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
    <div className="auth">
      <button className="back-button" onClick={() => navigate("/")}></button>
      <h1 className="auth__title">{title}</h1>
      <form
        className="auth__form"
        ref={formRef}
        name={`auth-form`}
        onSubmit={handleSubmit}
        noValidate
      > 
        { register && <div className="inputs-container">
          <input
            className={`input ${isError.email && "input_type_error"}`}
            type="email"
            placeholder="Эл. почта"
            name="email"
            onChange={handleChangeInput}
            required
          />
          {isError.email && <img className="input__error-image" src={errorIcon} alt="Иконка ошибки"/>}
          <img className="input__image" src={emailIcon} alt="Иконка логина"/>
          <span
          className={`auth__input-error ${
            isError.email && "auth__input-error_active"
          }`}
        >
          {isError.email && messageError.email}
          </span>
        </div>}
        <div className="inputs-container">
          <input
            className={`input ${isError.login && "input_type_error"}`}
            type="text"
            placeholder="Логин"
            name="login"
            minLength="3"
            onChange={handleChangeInput}
            required
          />
          {isError.login && <img className="input__error-image" src={errorIcon} alt="Иконка ошибки"/>}
          <img className="input__image" src={loginIcon} alt="Иконка логина"/>
          <span
          className={`auth__input-error ${
            isError.login && "auth__input-error_active"
          }`}
        >
          {isError.login && messageError.login}
          </span>
        </div>
        <div className={`inputs-container ${!register && "inputs-container_type_autorize"}`}>
          <input
            className={`input ${isError.password && "input_type_error"}`}
            type={isVisible ? "text" : "password"}
            placeholder="Пароль"
            name="password"
            minLength="3"
            onChange={handleChangeInput}
            required
          />
          {isError.password && <img className="input__error-image" src={errorIcon} alt="Иконка ошибки"/>}
          <img onClick={handleClickEye} className="input__image" src={ isVisible ? eye : eyeHiden} alt={isVisible ? "Пароль показан" : "Пароль скрыт"}/>
          <span
          className={`auth__input-error ${
            isError.password && "auth__input-error_active"
          }`}
        >
          {isError.password && messageError.password}
          </span>
        </div>
        { register && <div className={`inputs-container`}>
          <input
            className={`input ${isError.repeatPassword && "input_type_error"}`}
            type={isVisible ? "text" : "password"}
            placeholder="Повторите пароль"
            name="repeatPassword"
            minLength="3"
            onChange={handleChangeInput}
            required
          />
          {isError.repeatPassword && <img className="input__error-image" src={errorIcon} alt="Иконка ошибки"/>}
          <img onClick={handleClickEye} className="input__image" src={ isVisible ? eye : eyeHiden} alt={isVisible ? "Пароль показан" : "Пароль скрыт"}/>
          <span
          className={`auth__input-error ${
            (isError.repeatPassword || !(inputs.password === inputs.repeatPassword)) && "auth__input-error_active"
          }`}
        >
          {(isError.repeatPassword && messageError.repeatPassword) || ((!(inputs.repeatPassword === undefined) && !(inputs.password === inputs.repeatPassword)) && "Пароли не совпадают")}
          </span>
        </div>}
        {isAuth && <p className="auth__success-text">Вы успешно зарегистрировались!</p>}
        <button
          disabled={!isValidity || (!(inputs.password === inputs.repeatPassword))}
          type="submit"
          className={`button wellcome__button ${
            (!isValidity || (!(inputs.password === inputs.repeatPassword))) && "button_disabled"
          }`}
        >
          {button}
        </button>
      </form>
      <p className="auth__text">{paragraph} <Link to={route} className="auth__link">{link}</Link></p>
    </div>
  );
}

export default AuthForm;