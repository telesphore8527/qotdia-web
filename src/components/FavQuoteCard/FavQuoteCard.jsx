import "./FavQuoteCard.css";
import { getCategoryColors } from "../../config/categoryVisuals";
import { FaHeart } from "react-icons/fa";
import { LuHeart, LuCopy, LuShare2, LuClipboardCheck, LuQuote } from "react-icons/lu";
import { useQuoteActions } from "../../hooks/useQuoteActions";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'


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
} from "react-icons/fi";
import { useState } from "react";

const FavQuoteCard = ({ quote }) => {
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
  };
  const iconName = getCategoryColors(quote.category.slug).icon;
  const iconColor = getCategoryColors(quote.category.slug).text;
  const iconBg = getCategoryColors(quote.category.slug).bg;
  const Icon = categIcons[iconName];
  const [copied, setCopied] = useState(false)

  const {isFavorite, toggleFavorite, shareQuote, copyQuote} = useQuoteActions()
  dayjs.extend(relativeTime)

  const handleCopy = (quote) => {
    copyQuote(quote);
    setCopied(true)
    setInterval(()=>{
      setCopied(false)
    }, 1000)
  };

  return (
    <article className="favquotecard">
      <header className="favquotecard-header">
        <div
          className="favquotecard-categ"
          style={{
            color: iconColor,
            background: iconBg,
          }}
        >
          {<Icon />}
          {quote.category.name}
        </div>
        <div className="favquotecard-right" style={{gap: ".5rem"}}>
          <span style={{fontSize: ".7rem"}}> {dayjs(quote.addedAt).fromNow()} </span>
          <span className="icon" onClick={()=>toggleFavorite(quote)}>
            {" "}
            {isFavorite ? (
              <FaHeart size={26} color="red" />
            ) : (
              <LuHeart size={26} />
            )}{" "}
          </span>
        </div>
      </header>

      <section className="favquotecard-body">
        <p className="favquotecard-icon"> {<LuQuote />} </p>
        <p>{quote.content}</p>
      </section>

      <section className="favquotecard-footer">
        <div className="favquotecard-author">
          <div
            className="favquotecard-author-profile"
            style={{
              background: iconBg,
            }}
          >
            {quote.author.charAt(0)}
          </div>
          <p>{quote.author}</p>
        </div>

        <div className="favquotecard-actions">
          <div className="copy icon" onClick={()=>handleCopy(quote)}>
            {copied? <div style={{display: "flex", alignItems: "center"}}><LuClipboardCheck /> <i style={{fontSize: ".5rem"}}>copied</i></div> : <LuCopy />}
          </div>
          <div className="share icon" onClick={()=>shareQuote(quote)}>
            <LuShare2 />
          </div>
        </div>
      </section>
    </article>
  );
};

export default FavQuoteCard;
