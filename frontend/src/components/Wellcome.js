import React from "react";
import logo from "../images/Logo.png"
import { Link, useNavigate } from "react-router-dom";

function Wellcome() {
  const navigate = useNavigate();

  return (
    <div className="wellcome">
      <img className="logo" src={logo} alt="Логотип приложения 3DModelViewer"/>
      <h1 className="wellcome__title">Исследуйте 3D. Без ограничений.</h1>
      <button onClick={() => navigate("/sign-up")} className="button wellcome__button">Создать аккаунт</button>
      <Link to="/sign-in" className="wellcome__link">Войти</Link>
    </div>
  );
}

export default Wellcome;