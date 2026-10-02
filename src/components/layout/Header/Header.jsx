import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import { LuSettings } from "react-icons/lu";
import { useUiStore } from "../../../store/useUiStore";
const Header = () => {
  const { theme } = useUiStore();
  const { pathname } = useLocation();
  const PAGE_TITLE = {
    "/": "Local-First Feed",
    "/explore": "Explore Topics",
    "/favorites": "Saved Favorites",
    "/settings": "Local preferencee &...",
  };

  return (
    <div className="header-section">
      <header className="header">
        <a href="/" className="brand">
          <div className="logo-wrap">
            <img src="logo.svg" alt="qotdia-logo" />
          </div>
          <div>
            <div className="brand-name">
              <div>Qotdia</div>{" "}
              <div
                className="tooltip"
                style={{
                  color:
                    theme === "dark"
                      ? "var(--color-text)"
                      : "var(--color-primary)",
                }}
              >
                PWA
              </div>
            </div>
            <span className="sub-brand">{PAGE_TITLE[pathname]}</span>
          </div>
        </a>
        {/* <h1 className="header-title">{ PAGE_TITLE[pathname] }</h1> */}

        <Link
          to="/settings"
          aria-label="Settings"
          className="nav-icon"
          style={{ marginRight: ".8rem" }}
        >
          <LuSettings />
        </Link>
      </header>
    </div>
  );
};

export default Header;
