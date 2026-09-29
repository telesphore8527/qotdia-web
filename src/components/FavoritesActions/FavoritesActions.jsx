import "./FavoritesActions.css";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import {
  FiBook,
  FiZap,
  FiAward,
  FiBookOpen,
  FiCompass,
  FiHeart,
  FiSmile,
  FiUsers,
  FiTrendingUp,
  FiUserCheck,
  FiBriefcase,
  FiSunrise,
  FiRefreshCcw,
} from "react-icons/fi";
import { getCategoryColors } from "../../config/categoryVisuals";

const FavoritesActions = ({
  favNumber,
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) => {
	const categIcons = {
    FiBook: FiBook,
    FiZap: FiZap,
    FiAward: FiAward,
    FiBookOpen: FiBookOpen,
    FiCompass: FiCompass,
    FiHeart: FiHeart,
    FiSmile: FiSmile,
    FiUsers: FiUsers,
    FiTrendingUp: FiTrendingUp,
    FiUserCheck: FiUserCheck,
    FiBriefcase: FiBriefcase,
    FiSunrise: FiSunrise,
    BsFillGrid3X3GapFill,
  };
  const [activeId, setActiveId] = useState(-1);

  const handleCategory = (category = {}) => {
    setCategory(category ? category.slug : "");
    setActiveId(category.id || -1);
  };

  return (
    <div className="favoritesactions">
      <div className="fav-title">
        <h2>My Favorites</h2>{" "}
        <div className="fav-number">{favNumber} Saved</div>{" "}
      </div>

      <p className="fav-desc">Your personal sanctuary of curated thoughts.</p>
      <section className="ExpSearchingBox">
        <LuSearch />
        <input
          type="search"
          value={search}
		  placeholder="Search trought saved quotes or authors..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="ExpCategBox">
        {
          <li
            className={activeId === -1 ? "active" : ""}
            onClick={() => handleCategory({slug: "all"})}
          >
            <BsFillGrid3X3GapFill /> All Topics
          </li>
        }
        {categories.map((c) => {
          const Icon = categIcons[getCategoryColors(c.slug).icon];
          return (
            <li
              key={c.id}
              className={activeId === c.id ? "active" : ""}
              title={c.description}
              onClick={() => handleCategory(c)}
            >
              <Icon color={getCategoryColors(c.slug).text} />
              {c.name}
            </li>
          );
        })}
      </section>
    </div>
  );
};

export default FavoritesActions;
