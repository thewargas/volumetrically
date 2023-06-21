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

  const [errorAuth, setErrorAuth] = useState(false);

  const [errorUpdateUser, setErrorUpdateUser] = useState(false);

  const [cards, setCards] = useState([
    {
      id: "1fffe43b-f35f-4f73-943b-a07e217bbb76",
      name: "Космический шлем",
      link: "../public-models/DamagedHelmet.glb",
      owner: "Михаил",
      fileWeight: "3,28 МБ",
      description: "Космический шлем, может пригодиться в космосе.",
      createDate: "20.06.2023",
      poster: "../public-models/DamagedHelmet-image.webp",
      skybox: "disabled",
    },
    // {
    //   id: "126b05f7-1884-42bc-952f-ada6a80feca6",
    //   name: "Санузел",
    //   link: "../public-models/bathroom.glb",
    //   owner: "Михаил",
    //   fileWeight: "6,43 МБ",
    //   description:
    //     "Ванная комната со стиральной машиной, ванной, зеркалом и раковиной.",
    //   createDate: "17.06.2023",
    //   poster: "../public-models/bathroom-image.webp",
    //   skybox: "disabled",
    // },
    {
      id: "0ab020c7-57c3-4a3e-abe4-00230ae587c0",
      name: "Плюшевый кот",
      link: "../public-models/cat.glb",
      owner: "Михаил",
      fileWeight: "9,62 МБ",
      description: "Плюшевая игрушка, очень мягкая.",
      createDate: "17.06.2023",
      poster: "../public-models/cat-image.webp",
      skybox: "disabled",
    },
    {
      id: "c07990f6-676b-49ce-9731-1bebc2cf1b52",
      name: "Космонавт",
      link: "../public-models/Astronaut.glb",
      owner: "Михаил",
      fileWeight: "2,73 МБ",
      description:
        "Человек, проводящий испытания и эксплуатацию космической техники в космическом полёте.",
      createDate: "20.06.2023",
      poster: "../public-models/Astronaut-image.webp",
      skybox: "disabled",
    },
    {
      id: "c37ac527-9962-4be9-9f8f-b25d70ff41f2",
      name: "Бумбокс",
      link: "../public-models/BoomBox.glb",
      owner: "Михаил",
      fileWeight: "10,2 МБ",
      description:
        "Портативная звуковая система, способная воспроизводить мощный звук.",
      createDate: "20.06.2023",
      poster: "../public-models/BoomBox-image.webp",
      skybox: "disabled",
    },
    {
      id: "5d948edf-c21d-4632-8579-a82080b8e05f",
      name: "Созвездие Близнецы",
      link: "../public-models/sozvezdiya-blizneci.glb",
      owner: "Михаил",
      fileWeight: "142 КБ",
      description:
        "Название «Великие Близнецы» окончательно закреплено за созвездием в текстах персидского и селевкидского периодов.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-blizneci-image.webp",
    },
    {
      id: "ef6c6374-3d21-4dee-b944-880c0b2ac3d4",
      name: "Созвездие Водолей",
      link: "../public-models/sozvezdiya-vodoley.glb",
      owner: "Михаил",
      fileWeight: "122 КБ",
      description:
        "Большое зодиакальное созвездие, находящееся между Козерогом и Рыбами.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-vodoley-image.webp",
    },
    {
      id: "f18c675d-5879-40ad-a073-b133e66e409f",
      name: "Созвездие Весы",
      link: "../public-models/sozvezdiya-vesi.glb",
      owner: "Михаил",
      fileWeight: "94,2 КБ",
      description: "Зодиакальное созвездие, лежащее между Девой и Скорпионом.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-vesi-image.webp",
    },
    {
      id: "5ab86b9a-b7d8-431e-ad05-8c4ec496b820",
      name: "Созвездие Телец",
      link: "../public-models/sozvezdiya-telec.glb",
      owner: "Михаил",
      fileWeight: "114 КБ",
      description:
        "Зодиакальное созвездие, лежащее между Близнецами и Овном, к северо-западу от Ориона.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-telec-image.webp",
    },
    {
      id: "d4e075d1-ea42-4ff3-812b-da7f3b563852",
      name: "Созвездие Стрелец",
      link: "../public-models/sozvezdiya-strelec.glb",
      owner: "Михаил",
      fileWeight: "211 КБ",
      description:
        "Зодиакальное созвездие, лежащее между Козерогом и Скорпионом.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-strelec-image.webp",
    },
    {
      id: "a2b7a689-7840-4caf-8251-d50766242074",
      name: "Созвездие Скорпион",
      link: "../public-models/sozvezdiya-scorpion.glb",
      owner: "Михаил",
      fileWeight: "139 КБ",
      description:
        "Южное зодиакальное созвездие, расположенное между Стрельцом на востоке и Весами на западе целиком в Млечном Пути.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-scorpion-image.webp",
    },
    {
      id: "cb7d826f-8d74-41a1-b8b3-c98ae23feca6",
      name: "Созвездие Рыбы",
      link: "../public-models/sozvezdiya-ribi.glb",
      owner: "Михаил",
      fileWeight: "167 КБ",
      description:
        "Большое зодиакальное созвездие, лежащее между Водолеем и Овном.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-ribi-image.webp",
    },
    {
      id: "29d47b06-247a-45fc-a79f-f321764621d9",
      name: "Созвездие Рак",
      link: "../public-models/sozvezdiya-rak.glb",
      owner: "Михаил",
      fileWeight: "57,1 КБ",
      description:
        "Самое неприметное зодиакальное созвездие, которое можно увидеть лишь в ясную ночь между созвездиями Льва и Близнецов.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-rak-image.webp",
    },
    {
      id: "ff25903e-269d-4b5d-8636-3e95b1299cc5",
      name: "Созвездие Лев",
      link: "../public-models/sozvezdiya-lev.glb",
      owner: "Михаил",
      fileWeight: "107 КБ",
      description:
        "Зодиакальное созвездие, лежащее большей частью в северном полушарии неба между Раком и Девой.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-lev-image.webp",
    },
    {
      id: "4a75de29-1f4a-41bd-aa14-ec4287137c83",
      name: "Созвездие Овен",
      link: "../public-models/sozvezdiya-oven.glb",
      owner: "Михаил",
      fileWeight: "55,6 КБ",
      description:
        "Зодиакальное созвездие. Три главные звезды — Хамаль, Шератан и Мезартим.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-oven-image.webp",
    },
    {
      id: "0f9d5f5d-26fc-403c-a504-becc4f3b52f4",
      name: "Созвездие Козерог",
      link: "../public-models/sozvezdiya-kozerog.glb",
      owner: "Михаил",
      fileWeight: "113 КБ",
      description:
        "Зодиакальное созвездие южного полушария неба, находящееся между Водолеем и Стрельцом.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-kozerog-image.webp",
    },
    {
      id: "dc602221-8d09-45c6-9345-b894cdd3ada2",
      name: "Созвездие Дева",
      link: "../public-models/sozvezdiya-deva.glb",
      owner: "Михаил",
      fileWeight: "147 КБ",
      description:
        "экваториальное зодиакальное созвездие, лежащее между Львом и Весами.",
      createDate: "17.06.2023",
      poster: "../public-models/sozvezdiya-deva-image.webp",
    },
  ]);
  const [currentUser, setCurrentUser] = useState({});

  const [modelUrl, setModelUrl] = useState("");

  const [isDark, setDark] = useState(true);
  const [skybox, setSkybox] = useState("Blue sky");

  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://api.thewargas.nomoredomains.monster",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/models", { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (error === "Ошибка: 401") {
          setErrorAuth(true);
        }
      });
  }

  function handleAddModel(file) {
    api
      .uploadFile(file)
      .then((url) => {
        setModelUrl(`https://api.thewargas.nomoredomains.monster${url}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(inputs) {
    api
      .changeUserInfo(inputs)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        setErrorUpdateUser(true);
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
        <Route path="/" element={<Wellcome isDark={isDark} />} />
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
              isDark={isDark}
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
              errorAuth={errorAuth}
              isDark={isDark}
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
              url={modelUrl}
              handleUploadFile={handleAddModel}
              onUpdateUser={handleUpdateUser}
              errorUpdateUser={errorUpdateUser}
              isDark={isDark}
              setDark={setDark}
              skybox={skybox}
              setSkybox={setSkybox}
            />
          }
        />
        {cards.map((card) => {
          return (
            <Route
              path={`/models/${card.id}`}
              element={
                <CardPage
                  key={card.id}
                  card={card}
                  skybox={skybox}
                  setSkybox={setSkybox}
                  isDark={isDark}
                  setDark={setDark}
                />
              }
            />
          );
        })}
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
