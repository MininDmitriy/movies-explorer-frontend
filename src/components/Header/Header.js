import "./Header.css";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useState } from "react";
import { useResize } from "../../hooks/useResize";
import { Link, Route, Switch } from "react-router-dom";

function Header() {
  const [isActiveMenuHamburger, setIsActiveMenuHamburger] = useState(false);
  const {width} = useResize();

  console.log(width);

  const handleActivHamburgerMenu = () => {
    setIsActiveMenuHamburger(!isActiveMenuHamburger);
  };

  return (
    <header className="header page__header">
      <Switch>
        <Route exact path="/">
          <section className="header__container">
            <Link className="header__logo" to="/"></Link>
            <div className="header__registration-and-login-links-container">
              <Link className="header__registration-link" to="/signup">Регистрация</Link>
              <Link className="header__login-link" to="/signin">Войти</Link>
            </div>
          </section>
        </Route>
        <Route path="*">
          { width <= 984 ? 
            <HamburgerMenu isOpenMenu={isActiveMenuHamburger} onClick={handleActivHamburgerMenu} />
            :
            <Navigation />
          }        
        </Route>
      </Switch>
    </header>
  );
}

export default Header;

