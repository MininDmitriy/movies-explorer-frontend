import "./Header.css";
import Navigation from "../Navigation/Navigation";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavAuth from "../NavAuth/NavAuth";
import { useResize } from "../../hooks/useResize";

const Header = ({ loggedIn, isLoading, handleActivHamburgerMenu, isActiveMenuHamburger }) => {  
  const { width } = useResize();

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