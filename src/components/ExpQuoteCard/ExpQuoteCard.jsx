import "./ExpQuoteCard.css";
import { getCategoryColors } from "../../config/categoryVisuals";
import { FaHeart } from "react-icons/fa";
import { LuHeart, LuCopy, LuShare2, LuClipboardCheck } from "react-icons/lu";
import { useQuoteActions } from "../../hooks/useQuoteActions";
import { useState } from "react";

const ExpQuoteCard = ({ quote }) => {
  const iconColor = getCategoryColors(quote.category.slug).text;
  const iconBg = getCategoryColors(quote.category.slug).bg;

  const { copyQuote, shareQuote, isFavorite, toggleFavorite } =
    useQuoteActions();

  const [favorite, setFavorite] = useState(isFavorite(quote.id));
  const [copied, setCopied] = useState(false);

  const handleFavorite = (quote) => {
    toggleFavorite(quote);
    setFavorite((prev) => !prev);
  };

  const handleCopy = (quote) => {
    copyQuote(quote);
    setCopied(true)
    setInterval(()=>{
      setCopied(false)
    }, 1000)
  };

  return (
    // <div className='expquotecard'></div>

    <article className="favquotecard">
      <header className="favquotecard-header">
        <div
          className="favquotecard-categ"
          style={{
            color: iconColor,
            background: iconBg,
          }}
        >
          <div
            className="dot"
            style={{
              width: "10px",
              height: "10px",
              background: iconColor,
              borderRadius: "50%",
            }}
          ></div>
          {quote.category.name}
        </div>
        <div className="favquotecard-right">
          <p className="favquotecard-icon" style={{ fontSize: "3rem" }}>
            {" "}
            <span>“</span>{" "}
          </p>
        </div>
      </header>

      <section className="favquotecard-body">
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
          <div className="copy icon" onClick={() => handleCopy(quote)}>
            {
              copied? <div style={{display: "flex", alignItems: "center"}}><LuClipboardCheck /> <i style={{fontSize: ".5rem"}}>copied</i></div> : <LuCopy />
            }
          </div>

          <div className="share icon" onClick={() => shareQuote(quote.id)}>
            <LuShare2 />
          </div>
          <div className="like icon" onClick={() => handleFavorite(quote)}>
            {" "}
            {favorite ? (
              <FaHeart size={22} color="red" />
            ) : (
              <LuHeart size={22} />
            )}
          </div>
        </div>
      </section>
    </article>
  );
};

export default ExpQuoteCard;
