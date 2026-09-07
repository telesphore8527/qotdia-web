import "./BottomNav.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  LuHouse,
  LuSearch,
  LuSettings,
  LuHeart,
  LuSettings2,
} from "react-icons/lu";
import { FaHeart, FaHouse } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <nav className="bottomnav">
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {pathname === "/" ? (
                <FaHouse className="nav-icon" />
              ) : (
                <LuHouse className="nav-icon" />
              )}

              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/explorer"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {pathname === "/explorer" ? (
                <FaSearch className="nav-icon" />
              ) : (
                <LuSearch className="nav-icon" />
              )}
              <span>Explore</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {pathname === "/favorites" ? (
                <FaHeart className="nav-icon" />
              ) : (
                <LuHeart className="nav-icon" />
              )}
              <span>Favorites</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {pathname === "/settings" ? (
                <LuSettings2 className="nav-icon" />
              ) : (
                <LuSettings className="nav-icon" />
              )}
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BottomNav;
