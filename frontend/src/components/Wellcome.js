import React from "react";
import logo from "../images/Logo.png"
import { Link, useNavigate } from "react-router-dom";

function Wellcome({isDark}) {
  const navigate = useNavigate();

  return (
    <div className={`wellcome ${isDark && `wellcome_theme_dark`}`}>
      <img className="logo" src={logo} alt="Логотип приложения 3DModelViewer"/>
      <h1 className={`wellcome__title ${isDark && `white`}`}>Исследуйте 3D. Без ограничений.</h1>
      <button onClick={() => navigate("/sign-up")} className={`button wellcome__button ${isDark && `button_theme_dark`}`}>Создать аккаунт</button>
      <Link to="/sign-in" className={`wellcome__link ${isDark && `white`}`}>Войти</Link>
    </div>
  );
}

export default Wellcome;