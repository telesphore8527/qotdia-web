import "./DQCTools.css";
import { LuHeart, LuShare2 } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { useQuoteActions } from "../../hooks/useQuoteActions";
import { useState } from "react";

const DQCTools = ({ quote }) => {
  const { shareQuote, isFavorite, toggleFavorite } = useQuoteActions();
  const [favorite, setFavorite] = useState(isFavorite(quote.id))

	const handleClick = (quote)=>{
		toggleFavorite(quote)
		setFavorite((prev)=> !prev)
	}


  return (
    <div className="dqctools">
      <div className="dqc-like" onClick={() =>handleClick(quote) }>
        {favorite ? <FaHeart color="red" /> : <LuHeart />}
      </div>
      <div className="dqc-share" onClick={() => shareQuote(quote)}>
        <LuShare2 /> <p>Share</p>
      </div>
    </div>
  );
};

export default DQCTools;
