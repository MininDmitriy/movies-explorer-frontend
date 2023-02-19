import "./Header.css";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavAuth from "../NavAuth/NavAuth";
import { useState } from "react";
import { useResize } from "../../hooks/useResize";

const Header = ({ loggedIn, isLoading }) => {
  const [isActiveMenuHamburger, setIsActiveMenuHamburger] = useState(false);
  const { width } = useResize();
  
  const handleActivHamburgerMenu = () => {
    setIsActiveMenuHamburger(!isActiveMenuHamburger);
  };

  return (
    <header className="header page__header">          
      {isLoading ? '' : loggedIn ? 
        ( width <= 984 ? 
          <HamburgerMenu isOpenMenu={isActiveMenuHamburger} onClick={handleActivHamburgerMenu} />
          :
          <Navigation />
        ) : <NavAuth />}
    </header>
  );
}

export default Header;