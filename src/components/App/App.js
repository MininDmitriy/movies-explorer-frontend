import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleRegistration, 
         getInfoAboutProfile, 
         checkUserJWT, 
         handleAuthenticate 
       } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [currentUser, setCurrentUser] = useState({ userEmail: "", userName: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      getUserInfo();
    }
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    checkUserJWT(jwt)
      .then((data) => {
        if(data) {
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const getUserInfo = () => {
    getInfoAboutProfile()
      .then((userData) => {        
        setCurrentUser({ userEmail: userData.email, userName: userData.name });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onRegister = (userEmail, userPassword, userName) => {
    handleRegistration(userEmail, userPassword, userName)
      .then((data) => {
        if (data._id) {
          setPopupTitle('Успешная регистрация');
          setIsOpenPopup(true);
          onLogin(userEmail, userPassword);
        }
      })
      .catch(err => {
        setIsOpenPopup(true);
        setPopupTitle('Что-то пошло не так');
        console.log(err);
      });
  }

  const onLogin = (userEmail, userPassword) => {
    handleAuthenticate(userEmail, userPassword)
      .then((data) => {
        if(data) {
          localStorage.setItem('jwt', data.token);
          console.log(`token: ${data.token}`);
          setLoggedIn(true);
          getUserInfo();
          history.push("/movies");
        }
      })
      .catch(err => {
        setPopupTitle('Что-то пошло не так');
        setIsOpenPopup(true);
        console.log(err);
      })
  }

  const openPopup = (info) => {
    setIsOpenPopup(true);
    setPopupTitle(info);
  }

  const closePopup = () => {
    setIsOpenPopup(false);
    setPopupTitle('');
  }

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ?
        <Header loggedIn={loggedIn} isLoading={isLoading}/> : ''}

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <ProtectedRoute
          path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          isLoading={isLoading}
          openPopup={openPopup}
        />

        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          isLoading={isLoading}
          openPopup={openPopup}
        />

        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          isLoading={isLoading}
          onSignOut={onSignOut}
          openPopup={openPopup}
        />

        <Route path="/signin">
          {() =>
            isLoading ? <Preloader /> : !loggedIn ? <Login onLogin={onLogin} /> : <Redirect to="/movies" />
          }
        </Route>

        <Route path="/signup">
          { isLoading ? <Preloader /> : !loggedIn ? <Register onRegister={onRegister} /> : <Redirect to="/movies" /> }
        </Route>

        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>

      {pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" ? <Footer /> : ""}

      <InfoTooltip text={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
