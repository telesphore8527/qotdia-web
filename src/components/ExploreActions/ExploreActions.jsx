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

const ExploreActions = ({ category, search, setCategory, setSearch }) => {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (isLoading) return <ExploreLoading cardNumber={0} />;

  return (
    <div className="exploreactions">
      {!isError && (
        <section className="ExpSearchingBox">
          <FaSearch />{" "}
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search quotes, authors, themes..."
          />
        </section>
      )}

      <div className="ExpCategContainer">
        <ul className="ExpCategBox">
          {!isError && (
            <li>
              <BsFillGrid3X3GapFill /> All
            </li>
          )}
          {!isError ? (
            data.data.map((category) => {
              const Icon = categIcons[getCategoryColors(category.slug).icon];
              return (
                <li key={category.id} title={category.description}>
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
            >
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
