import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Wellcome from "./Wellcome";
import * as Auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import CardPage from "./CardPage";

import AuthForm from "./AuthForm";
import Main from "./Main";

function App() {
  const [isError, setError] = useState({});
  const [messageError, setMessageError] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://api.thewargas.nomoredomains.monster",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInitialInfo(), api.getInitialCards()])

        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          console.log(currentUser.email);
          // setCards(cardsData.reverse());
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  function validateInputs(e) {
    if (!e.target.validity.valid) {
      setError({
        ...isError,
        [e.target.name]: true,
      });
      setMessageError({
        ...messageError,
        [e.target.name]: e.target.validationMessage,
      });
    } else {
      setError({
        ...isError,
        [e.target.name]: false,
      });
      setMessageError({
        ...messageError,
        [e.target.name]: "",
      });
    }
  }

  function handleRegister(inputs) {
    Auth.register(inputs.email, inputs.login, inputs.password)
      .then(() => {
        setAuth(true);
        setTimeout(() => {
          navigate("/sign-in", { replace: true });
        }, 2000);
      })
      .catch((error) => {
        setAuth(false);
        console.log(error);
      });
  }

  function handleAuthorize(inputs) {
    Auth.authorize(inputs.login, inputs.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setAuth(false);
          navigate("/models", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCardClick = (card) => {
    // setSelectedCard(card);
    // setImagePopupOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        <Route
          path="/sign-up"
          element={
            <AuthForm
              onValidation={validateInputs}
              isError={isError}
              messageError={messageError}
              title={"Создать аккаунт"}
              button={"Создать аккаунт"}
              paragraph={"Уже есть аккаунт"}
              link={"Войти"}
              isAuth={isAuth}
              onSubmit={handleRegister}
              register="true"
              route={"/sign-in"}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <AuthForm
              onValidation={validateInputs}
              isError={isError}
              messageError={messageError}
              title={"Вход"}
              button={"Войти"}
              paragraph={"Нет аккаунта?"}
              link={"Зарегистрироваться"}
              isAuth={isAuth}
              onSubmit={handleAuthorize}
              register={false}
              route={"/sign-up"}
            />
          }
        />
        <Route
          path="/models"
          element={
            <Main
              cards={cards}
              onValidation={validateInputs}
              isError={isError}
              messageError={messageError}
            />
          }
        />
        {cards.map((card) => {
          return (
            <Route
              path={`/models/${card}`}
              element={<CardPage card={card} />}
            />
          );
        })}
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
