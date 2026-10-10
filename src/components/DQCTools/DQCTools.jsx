import "./DQCTools.css";
import { LuHeart, LuShare2 } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { useQuoteActions } from "../../hooks/useQuoteActions";
import { useState } from "react";
import { useShareImage } from "../../hooks/useShareImage";

const DQCTools = ({ quote }) => {
  const { isFavorite, toggleFavorite } = useQuoteActions();
  const [favorite, setFavorite] = useState(isFavorite(quote.id))

	const handleClick = (quote)=>{
		toggleFavorite(quote)
		setFavorite((prev)=> !prev)
	}

  const API = import.meta.env.VITE_API_BASE_URL;

  const { share, isLoading, status } = useShareImage(
    `${API}/quotes/today/image?template=story`,
    'qotdia-story.jpg'
  );


  return (
    <div className="dqctools">
      <div className="dqc-like" onClick={() =>handleClick(quote) }>
        {favorite ? <FaHeart color="red" /> : <LuHeart />}
      </div>
      <button className="dqc-share" onClick={share} disabled={isLoading}>
        <LuShare2 /> <p>{status === 'downloaded' ? 'downloaded' : 'Share'}</p>
      </button>
    </div>
  );
};

export default DQCTools;
