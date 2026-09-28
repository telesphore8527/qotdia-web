import './EmptyState.css';
import { FaSearch } from 'react-icons/fa';
import { LuHeart } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export function EmptyCard({
  icon,
  title,
  subTitle,
  buttonValue,
  onClick,
}) {


  return (
    <section className="emptycard-section">
      <section className="emptycard">
        <div className="emptycard-logo">{icon}</div>
        <h2 className="emptycard-title">{title}</h2>
        <p className="emptycard-subtitle">{subTitle}</p>
        <button className="emptycard-button" onClick={onClick}>
          {buttonValue}
        </button>
      </section>
    </section>
  );
}


export function ExploreEmpty({ onClick }) {


  return (
	<section className="exploreempty">
	  {/* <header className="exploreempty-search">{search} </header> */}

	  <EmptyCard
		icon={<FaSearch />}
		title="No result !!"
		subTitle="Try another keyword, author or theme."
		buttonValue="Reset filters"
		onClick={onClick()}
	  />
	</section>
  );
}




export function FavoritesEmpty() {
	const navigate = useNavigate();

  return (
	<section className="favoritesempty">
	  <EmptyCard
		icon={<LuHeart />}
		title="No favorites to show !!"
		subTitle="Save the your favorites quotes and see them here."
		buttonValue="Explore quotes"
		onClick={() => navigate("/explore")}
	  />
	</section>
  );
}