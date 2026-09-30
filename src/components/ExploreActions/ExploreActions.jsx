import "./ExploreActions.css";
import { FaSearch } from "react-icons/fa";
import { useCategories } from "../../hooks/useCategories";
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
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ExploreLoading } from "../LoadingState/LoadingState";
import { useEffect, useState } from "react";

const ExploreActions = ({ setCategory, setSearch, setRefetchCateg }) => {
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

  const { data, isLoading, isError, refetch } = useCategories();

  
  const [activeId, setActiveId] = useState(-1);

  const [localSearch, setLocalSearch] = useState("")

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setSearch(localSearch)
    }, 400)

    return ()=> clearTimeout(timer)

  },[localSearch, setSearch])

  const handleSearch = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleCategory = (category = {}) => {
    setCategory(category? category.slug : "");
    setActiveId(category.id || -1);
  };

  if (isLoading) return <ExploreLoading cardNumber={0} />;

  return (
    <div className="exploreactions">
      {!isError && (
        <section className="ExpSearchingBox">
          <FaSearch />{" "}
          <input
            type="search"
            value={localSearch}
            onChange={handleSearch}
            placeholder="Search quotes, authors, themes..."
          />
        </section>
      )}

      <div className="ExpCategContainer">
        <ul className="ExpCategBox">
          {!isError && (
            <li className={activeId === -1 ? "active" : ""} onClick={() => handleCategory()}>
              <BsFillGrid3X3GapFill /> All
            </li>
          )}
          {!isError ? (
            data.data.map((category) => {
              const Icon = categIcons[getCategoryColors(category.slug).icon];
              return (
                <li
                  key={category.id}
                  className={activeId === category.id ? "active" : ""}
                  title={category.description}
                  onClick={() => handleCategory(category)}
                >
                  <Icon color={getCategoryColors(category.slug).text} />
                  {category.name}
                </li>
              );
            })
          ) : (
            <div
              style={{
                color: "var(--color-text-secondary)",
                fontSize: ".8rem",
              }}
            > {setRefetchCateg(()=>refetch)}
              error while loading categories.{" "}
              <button
                style={{
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  padding: ".5rem",
                  background: "none",
                }}
                onClick={refetch}
              >
                {" "}
                <FiRefreshCcw /> refetch
              </button>{" "}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExploreActions;
