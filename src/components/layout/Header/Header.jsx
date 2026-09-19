import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import { LuSettings } from "react-icons/lu";
const Header = () => {
  const { pathname } = useLocation();
  const PAGE_TITLE = {
    "/": "",
    "/explorer": "Explore",
    "/favorites": "My Favorites",
    "/settings": "Settings",
  };

  return (
    <div className="header-section">
      <header className="header">
      <a href="/" className="brand">
        <div className="logo-wrap">
          <img src="logo.png" alt="logo" />
        </div>
        <div>
          <div className="brand-name">Qotdia</div>
          <span className="sub-brand">Local-First Feed</span>
        </div>
      </a>
      <h1 className="header-title">{ PAGE_TITLE[pathname] }</h1>

      <Link to="/settings" className="nav-icon" style={{marginRight: ".8rem"}}>
      <LuSettings />
      </Link>
    
    </header>
      
    </div>
  );
};

export default Header;
