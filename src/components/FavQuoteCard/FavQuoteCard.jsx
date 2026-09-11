import "./FavQuoteCard.css";
import { getCategoryColors } from "../../config/categoryVisuals";
import { FaHeart } from "react-icons/fa";
import { LuHeart, LuCopy, LuShare2, LuBook } from "react-icons/lu";

const FavQuoteCard = ({ quote, isFavorite }) => {
  const categIcons = {
    LuBook: LuBook,
  };
  const iconName = getCategoryColors(quote.category.slug).icon;
  const iconColor = getCategoryColors(quote.category.slug).text;
  const iconBg = getCategoryColors(quote.category.slug).bg;
  const Icon = categIcons[iconName];

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
        <div className="favquotecard-right">
          <span> {quote.date ? quote.date : ""} </span>
          <span className="icon">
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
        <p className="favquotecard-icon"> “ </p>
        <p>{quote.content}</p>
      </section>

      <section className="favquotecard-footer">
        <div className="favquotecard-author">
          <div className="favquotecard-author-profile" style={{
            
            background: iconBg,
          }}>
            {quote.author.charAt(0)}
          </div>
          <p>{quote.author}</p>
        </div>

        <div className="favquotecard-actions">
          <div className="copy icon">
            <LuCopy></LuCopy>
          </div>
          <div className="share icon">
            <LuShare2></LuShare2>
          </div>
        </div>
      </section>
    </article>
  );
};

export default FavQuoteCard;
