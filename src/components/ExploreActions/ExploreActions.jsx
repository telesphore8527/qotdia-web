import "./ExploreActions.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useUiStore } from "../../store/useUiStore";
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
  FiGrid,
} from "react-icons/fi";
import { getCategoryColors } from "../../config/categoryVisuals";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const ExploreActions = ({categories}) => {
  const [search, setSearch] = useState("");

  const {theme} = useUiStore()

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
	BsFillGrid3X3GapFill
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="exploreactions">
      <section className="ExpSearchingBox">
        <FaSearch />{" "}
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search quotes, authors, themes..."
        />
      </section>

      <div className="ExpCategContainer">
        <ul className="ExpCategBox">
			<li> <BsFillGrid3X3GapFill /> All</li>
          {
			categories.map((category)=>{
				const Icon = categIcons[getCategoryColors(category.slug).icon]
				return <li key={category.id} title={category.description}>
						<Icon color={getCategoryColors(category.slug).text}/>
					{category.name}
				</li>
			})
		  }
        </ul>
      </div>
    </div>
  );
};

export default ExploreActions;
